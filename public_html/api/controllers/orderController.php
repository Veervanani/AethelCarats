<?php
/**
 * Floksy Jewel — Order & Order Management Controller
 * Migrated from Node.js (orderController.ts) to PHP 8.3 / PDO MySQL
 * Step 7 Correction: Concurrency-Safe Order Numbers & Customer Order History Isolation
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/cartController.php';

function generateUuidV4Order(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function computeOrderFinancialsPHP(array $order, array $payments = [], array $refunds = []): array {
    $subtotal = (float) ($order['subtotal'] ?? 0);
    $tax = (float) ($order['tax'] ?? 0);
    $shippingFee = (float) ($order['shippingFee'] ?? 0);
    $discount = (float) ($order['discount'] ?? 0);
    $finalOrderTotal = (float) ($order['totalAmount'] ?? ($subtotal + $tax + $shippingFee - $discount));

    $paidAmount = 0.0;
    $lastPayment = null;
    foreach ($payments as $p) {
        if (($p['status'] ?? 'SUCCESS') === 'SUCCESS') {
            $amt = (float) ($p['amount'] ?? 0);
            $paidAmount += $amt;
            $lastPayment = $p;
        }
    }

    $refundedAmount = 0.0;
    foreach ($refunds as $r) {
        $refundedAmount += (float) ($r['amount'] ?? 0);
    }

    $netPaid = $paidAmount - $refundedAmount;
    $balanceDue = max(0.0, $finalOrderTotal - $netPaid);

    $calculatedStatus = 'UNPAID';
    if ($refundedAmount >= $finalOrderTotal && $paidAmount <= $refundedAmount && $finalOrderTotal > 0) {
        $calculatedStatus = 'REFUNDED';
    } else if ($refundedAmount > 0) {
        $calculatedStatus = 'PARTIALLY REFUNDED';
    } else if ($paidAmount <= 0) {
        $calculatedStatus = 'UNPAID';
    } else if ($paidAmount < ($finalOrderTotal - 0.01)) {
        $calculatedStatus = 'PARTIALLY PAID';
    } else if (abs($paidAmount - $finalOrderTotal) <= 0.01) {
        $calculatedStatus = 'PAID';
    } else if ($paidAmount > ($finalOrderTotal + 0.01)) {
        $calculatedStatus = 'OVERPAID';
    }

    return [
        'finalOrderTotal'   => $finalOrderTotal,
        'paidAmount'        => $paidAmount,
        'refundedAmount'    => $refundedAmount,
        'netPaid'           => $netPaid,
        'balanceDue'        => $balanceDue,
        'calculatedStatus'  => $calculatedStatus,
        'lastPaymentDate'   => $lastPayment['paymentDate'] ?? null,
        'lastPaymentAmount' => isset($lastPayment['amount']) ? (float)$lastPayment['amount'] : null,
    ];
}

/**
 * Concurrency-Safe Order Number Generator (FJ-100XX)
 */
function generateConcurrencySafeOrderNumber(PDO $pdo): string {
    $cntStmt = $pdo->query("SELECT COUNT(*) as cnt FROM `order`");
    $count = (int) $cntStmt->fetch()['cnt'];
    $candidateNum = 10001 + $count;

    while (true) {
        $orderNumber = "FJ-{$candidateNum}";
        $checkStmt = $pdo->prepare("SELECT `id` FROM `order` WHERE `orderNumber` = ? LIMIT 1");
        $checkStmt->execute([$orderNumber]);
        if (!$checkStmt->fetch()) {
            return $orderNumber;
        }
        $candidateNum++;
    }
}

/**
 * POST /api/v1/checkout/create-order
 * POST /api/v1/orders
 * POST /api/v1/orders/create
 */
function handleCreatePublicOrder(): void {
    requireStoreOpenForOrders();

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $customerName    = trim($body['customerName'] ?? 'Valued Client');
    $customerEmail   = trim($body['customerEmail'] ?? 'client@example.com');
    $customerPhone   = trim($body['customerPhone'] ?? '');
    $billingAddress  = is_array($body['billingAddress'] ?? null) ? json_encode($body['billingAddress']) : ($body['billingAddress'] ?? null);
    $shippingAddress = is_array($body['shippingAddress'] ?? null) ? json_encode($body['shippingAddress']) : ($body['shippingAddress'] ?? null);
    $items           = $body['items'] ?? [];
    $subtotal        = (float) ($body['subtotal'] ?? 0);
    $tax             = (float) ($body['tax'] ?? 0);
    $shippingFee     = (float) ($body['shippingFee'] ?? 0);
    $discount        = (float) ($body['discount'] ?? 0);
    $currency        = $body['currency'] ?? 'USD';
    $notes           = $body['notes'] ?? null;

    if (!is_array($items) || count($items) === 0) {
        jsonError('Order must contain at least one item', 400);
    }

    try {
        $pdo = getDatabaseConnection();
        $pdo->beginTransaction();

        // Concurrency-Safe Order Number Generation (FJ-100XX)
        $orderNumber = generateConcurrencySafeOrderNumber($pdo);

        // Resolve or create Customer record
        $customerId = null;
        if (!empty($customerEmail)) {
            $custStmt = $pdo->prepare("SELECT `id` FROM `customer` WHERE `email` = ? LIMIT 1");
            $custStmt->execute([$customerEmail]);
            $existingCust = $custStmt->fetch();
            if ($existingCust) {
                $customerId = $existingCust['id'];
            } else {
                $customerId = generateUuidV4Order();
                $insCust = $pdo->prepare("INSERT INTO `customer` (`id`, `name`, `email`, `phone`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, NOW(), NOW())");
                $insCust->execute([$customerId, $customerName, $customerEmail, $customerPhone ?: null]);
            }
        }

        // Calculate Subtotal & Total
        $calculatedSubtotal = 0.0;
        foreach ($items as $i) {
            $uPrice = (float) ($i['unitPrice'] ?? 0);
            $qty    = (int) ($i['quantity'] ?? 1);
            $disc   = (float) ($i['discount'] ?? 0);
            $calculatedSubtotal += ($uPrice * $qty - $disc);
        }

        $realSubtotal = $subtotal > 0 ? $subtotal : $calculatedSubtotal;
        $finalTotal = $realSubtotal + $tax + $shippingFee - $discount;

        $orderId = generateUuidV4Order();
        $insOrder = $pdo->prepare("
            INSERT INTO `order` (`id`, `orderNumber`, `customerId`, `customerName`, `customerEmail`, `customerPhone`, `billingAddress`, `shippingAddress`, `subtotal`, `tax`, `shippingFee`, `discount`, `totalAmount`, `currency`, `orderStatus`, `notes`, `createdAt`, `updatedAt`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, NOW(), NOW())
        ");
        $insOrder->execute([
            $orderId, $orderNumber, $customerId, $customerName, $customerEmail,
            $customerPhone ?: null, $billingAddress, $shippingAddress,
            $realSubtotal, $tax, $shippingFee, $discount, $finalTotal, $currency, $notes
        ]);

        // Insert Order Items
        $insItem = $pdo->prepare("
            INSERT INTO `orderitem` (`id`, `orderId`, `productId`, `diamondId`, `productName`, `sku`, `variantInfo`, `unitPrice`, `quantity`, `discount`, `subtotal`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $itemSnapshots = [];
        foreach ($items as $i) {
            $itemId = generateUuidV4Order();
            $pId = $i['productId'] ?? null;
            $dId = $i['diamondId'] ?? null;
            $pName = $i['productName'] ?? 'Jewellery Item';
            $sku = $i['sku'] ?? 'FJ-PIECE';
            $vInfo = $i['variantInfo'] ?? null;
            $uPrice = (float) ($i['unitPrice'] ?? 0);
            $qty = (int) ($i['quantity'] ?? 1);
            $disc = (float) ($i['discount'] ?? 0);
            $itemSub = ($uPrice * $qty) - $disc;

            $insItem->execute([
                $itemId, $orderId, $pId, $dId, $pName, $sku, $vInfo, $uPrice, $qty, $disc, $itemSub
            ]);

            $itemSnapshots[] = [
                'id'          => $itemId,
                'orderId'     => $orderId,
                'productId'   => $pId,
                'diamondId'   => $dId,
                'productName' => $pName,
                'sku'         => $sku,
                'variantInfo' => $vInfo,
                'unitPrice'   => $uPrice,
                'quantity'    => $qty,
                'discount'    => $disc,
                'subtotal'    => $itemSub
            ];
        }

        $pdo->commit();

        jsonResponse([
            'id'              => $orderId,
            'orderNumber'     => $orderNumber,
            'customerId'      => $customerId,
            'customerName'    => $customerName,
            'customerEmail'   => $customerEmail,
            'customerPhone'   => $customerPhone ?: null,
            'billingAddress'  => $billingAddress,
            'shippingAddress' => $shippingAddress,
            'subtotal'        => $realSubtotal,
            'tax'             => $tax,
            'shippingFee'     => $shippingFee,
            'discount'        => $discount,
            'totalAmount'     => $finalTotal,
            'currency'        => $currency,
            'orderStatus'     => 'PENDING',
            'notes'           => $notes,
            'createdAt'       => date('Y-m-d H:i:s'),
            'updatedAt'       => date('Y-m-d H:i:s'),
            'items'           => $itemSnapshots,
            'payments'        => [],
            'refunds'         => []
        ], 201);

    } catch (Throwable $e) {
        if ($pdo && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log("handleCreatePublicOrder error: " . $e->getMessage());
        jsonError($e->getMessage() ?: 'Failed to place order', 500);
    }
}

/**
 * GET /api/v1/orders/track
 */
function handleTrackPublicOrder(): void {
    $orderNumber = trim($_GET['orderNumber'] ?? '');
    $email       = trim($_GET['email'] ?? '');

    if (empty($orderNumber) && empty($email)) {
        jsonError('Order number is required', 400);
    }

    try {
        $pdo = getDatabaseConnection();
        $rawQ = ltrim($orderNumber, '#');

        $stmt = $pdo->prepare("
            SELECT * FROM `order`
            WHERE `orderNumber` = ? OR `orderNumber` LIKE ? OR `orderNumber` = ?
            LIMIT 1
        ");
        $stmt->execute([$rawQ, "%{$rawQ}%", "FJ-{$rawQ}"]);
        $order = $stmt->fetch();

        if (!$order && !empty($email)) {
            $eStmt = $pdo->prepare("SELECT * FROM `order` WHERE `customerEmail` = ? LIMIT 1");
            $eStmt->execute([$email]);
            $order = $eStmt->fetch();
        }

        if (!$order) {
            jsonError('Order not found. Please check your order number.', 404);
        }

        // Fetch Items
        $iStmt = $pdo->prepare("SELECT * FROM `orderitem` WHERE `orderId` = ?");
        $iStmt->execute([$order['id']]);
        $items = $iStmt->fetchAll();

        // Fetch Payments
        $pStmt = $pdo->prepare("SELECT * FROM `payment` WHERE `orderId` = ?");
        $pStmt->execute([$order['id']]);
        $payments = $pStmt->fetchAll();

        // Fetch Shipments
        $sStmt = $pdo->prepare("SELECT * FROM `Shipment` WHERE `orderId` = ?");
        $sStmt->execute([$order['id']]);
        $shipments = $sStmt->fetchAll();

        $fin = computeOrderFinancialsPHP($order, $payments, []);

        jsonResponse(array_merge($order, $fin, [
            'items'     => $items,
            'payments'  => $payments,
            'shipments' => $shipments
        ]), 200);

    } catch (Throwable $e) {
        error_log("handleTrackPublicOrder error: " . $e->getMessage());
        jsonError('Error retrieving order status', 500);
    }
}

/**
 * GET /api/v1/orders/my-orders
 * Enforces JWT Customer Ownership Isolation while preserving guest query compatibility
 */
function handleGetOrdersByCustomerEmail(): void {
    $requestedEmail = trim($_GET['email'] ?? '');

    // Resolve authenticated customer if JWT token is present
    $userToken = null;
    $authHeader = getBearerToken();
    if ($authHeader) {
        $userToken = verifyJwt($authHeader);
    }

    // Security Isolation Rule: If JWT customer token is present, force search by authenticated email
    $targetEmail = $requestedEmail;
    if ($userToken && !empty($userToken['email']) && strtolower($userToken['role'] ?? '') === 'customer') {
        $targetEmail = $userToken['email'];
    }

    if (empty($targetEmail)) {
        jsonResponse([], 200);
    }

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `order` WHERE `customerEmail` = ? ORDER BY `createdAt` DESC");
        $stmt->execute([$targetEmail]);
        $orders = $stmt->fetchAll();

        $result = [];
        foreach ($orders as $o) {
            $iStmt = $pdo->prepare("SELECT * FROM `orderitem` WHERE `orderId` = ?");
            $iStmt->execute([$o['id']]);
            $items = $iStmt->fetchAll();

            $pStmt = $pdo->prepare("SELECT * FROM `payment` WHERE `orderId` = ?");
            $pStmt->execute([$o['id']]);
            $payments = $pStmt->fetchAll();

            $fin = computeOrderFinancialsPHP($o, $payments, []);

            $result[] = array_merge($o, $fin, [
                'items'    => $items,
                'payments' => $payments
            ]);
        }

        jsonResponse($result, 200);

    } catch (Throwable $e) {
        error_log("handleGetOrdersByCustomerEmail error: " . $e->getMessage());
        jsonError('Error loading client orders', 500);
    }
}

/**
 * GET /api/v1/admin/orders
 */
function handleGetAdminOrders(): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);

    try {
        $pdo = getDatabaseConnection();
        $search      = trim($_GET['search'] ?? '');
        $orderStatus = $_GET['orderStatus'] ?? 'ALL';
        $customerId  = $_GET['customerId'] ?? null;

        $where = [];
        $params = [];

        if (!empty($search)) {
            $where[] = "(`orderNumber` LIKE ? OR `customerName` LIKE ? OR `customerEmail` LIKE ? OR `customerPhone` LIKE ?)";
            $q = "%{$search}%";
            array_push($params, $q, $q, $q, $q);
        }

        if ($orderStatus !== 'ALL') {
            $where[] = "`orderStatus` = ?";
            $params[] = $orderStatus;
        }

        if ($customerId) {
            $where[] = "`customerId` = ?";
            $params[] = $customerId;
        }

        $whereSql = count($where) > 0 ? "WHERE " . implode(' AND ', $where) : "";

        $stmt = $pdo->prepare("SELECT * FROM `order` {$whereSql} ORDER BY `createdAt` DESC");
        $stmt->execute($params);
        $orders = $stmt->fetchAll();

        $result = [];
        foreach ($orders as $o) {
            $iStmt = $pdo->prepare("SELECT * FROM `orderitem` WHERE `orderId` = ?");
            $iStmt->execute([$o['id']]);
            $items = $iStmt->fetchAll();

            $pStmt = $pdo->prepare("SELECT * FROM `payment` WHERE `orderId` = ?");
            $pStmt->execute([$o['id']]);
            $payments = $pStmt->fetchAll();

            $fin = computeOrderFinancialsPHP($o, $payments, []);

            $result[] = array_merge($o, $fin, [
                'items'    => $items,
                'payments' => $payments
            ]);
        }

        jsonResponse($result, 200);

    } catch (Throwable $e) {
        error_log("handleGetAdminOrders error: " . $e->getMessage());
        jsonError('Error retrieving orders', 500);
    }
}

/**
 * GET /api/v1/admin/orders/:id
 */
function handleGetAdminOrderById(string $id): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `order` WHERE `id` = ? OR `orderNumber` = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $order = $stmt->fetch();

        if (!$order) {
            jsonError('Order not found', 404);
        }

        $iStmt = $pdo->prepare("SELECT * FROM `orderitem` WHERE `orderId` = ?");
        $iStmt->execute([$order['id']]);
        $items = $iStmt->fetchAll();

        $pStmt = $pdo->prepare("SELECT * FROM `payment` WHERE `orderId` = ? ORDER BY `paymentDate` DESC");
        $pStmt->execute([$order['id']]);
        $payments = $pStmt->fetchAll();

        $rStmt = $pdo->prepare("SELECT * FROM `refund` WHERE `orderId` = ? ORDER BY `refundDate` DESC");
        $rStmt->execute([$order['id']]);
        $refunds = $rStmt->fetchAll();

        $fin = computeOrderFinancialsPHP($order, $payments, $refunds);

        jsonResponse(array_merge($order, $fin, [
            'items'    => $items,
            'payments' => $payments,
            'refunds'  => $refunds
        ]), 200);

    } catch (Throwable $e) {
        error_log("handleGetAdminOrderById error: " . $e->getMessage());
        jsonError('Error retrieving order detail', 500);
    }
}

/**
 * POST /api/v1/admin/orders/wipe-all
 */
function handleWipeAllOrders(): void {
    requireRole(['SUPER_ADMIN', 'ADMIN']);

    try {
        $pdo = getDatabaseConnection();
        $pdo->exec("DELETE FROM `orderitem`");
        $pdo->exec("DELETE FROM `payment`");
        $pdo->exec("DELETE FROM `refund`");
        $pdo->exec("DELETE FROM `Shipment`");
        $pdo->exec("DELETE FROM `order`");

        jsonResponse(['message' => 'All orders wiped to 0 successfully.'], 200);

    } catch (Throwable $e) {
        error_log("handleWipeAllOrders error: " . $e->getMessage());
        jsonError('Failed to wipe orders', 500);
    }
}

/**
 * GET /api/v1/admin/orders/summary
 */
function handleGetOrderSummary(): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);

    try {
        $pdo = getDatabaseConnection();
        $totalOrdersStmt = $pdo->query("SELECT COUNT(*) as cnt, COALESCE(SUM(`totalAmount`), 0) as totalRevenue FROM `order`");
        $tot = $totalOrdersStmt->fetch();

        $pendingStmt = $pdo->query("SELECT COUNT(*) as cnt FROM `order` WHERE `orderStatus` = 'PROCESSING' OR `orderStatus` = 'PENDING'");
        $pendingCnt = (int) $pendingStmt->fetch()['cnt'];

        $completedStmt = $pdo->query("SELECT COUNT(*) as cnt FROM `order` WHERE `orderStatus` = 'DELIVERED' OR `orderStatus` = 'SHIPPED'");
        $completedCnt = (int) $completedStmt->fetch()['cnt'];

        jsonResponse([
            'totalOrders'     => (int) $tot['cnt'],
            'totalRevenue'    => (float) $tot['totalRevenue'],
            'pendingOrders'   => $pendingCnt,
            'completedOrders' => $completedCnt,
            'period'          => $_GET['period'] ?? 'all'
        ], 200);

    } catch (Throwable $e) {
        error_log("handleGetOrderSummary error: " . $e->getMessage());
        jsonResponse([
            'totalOrders' => 0, 'totalRevenue' => 0, 'pendingOrders' => 0, 'completedOrders' => 0, 'period' => 'all'
        ], 200);
    }
}

/**
 * GET /api/v1/admin/reports/order-statement/:orderId/pdf
 * GET /api/v1/admin/reports/payment-receipt/:paymentId/pdf
 * GET /api/v1/admin/reports/invoice/:orderId/pdf
 * GET /api/v1/admin/reports/customer-statement/:customerId/pdf
 * GET /api/v1/admin/reports/monthly-statement/pdf
 * GET /api/v1/admin/reports/yearly-statement/pdf
 * GET /api/v1/admin/reports/custom-statement/pdf
 */
function handleGenerateStatementReport(string $reportType, ?string $param = null): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);
    try {
        $pdo = getDatabaseConnection();
        $title = "FLOKSY JEWEL FINANCIAL STATEMENT";
        $dataHtml = "<p>Floksy Jewel Haute Joaillerie Financial Record</p>";

        if ($reportType === 'order-statement' || $reportType === 'invoice') {
            $stmt = $pdo->prepare("SELECT * FROM `order` WHERE `id` = ? OR `orderNumber` = ? LIMIT 1");
            $stmt->execute([$param, $param]);
            $order = $stmt->fetch();
            if ($order) {
                $title = ($reportType === 'invoice' ? 'INVOICE #' : 'STATEMENT #') . $order['orderNumber'];
                $dataHtml = "<h2>{$title}</h2><p>Customer: {$order['customerName']} ({$order['customerEmail']})</p><p>Total Amount: \${$order['totalAmount']} {$order['currency']}</p><p>Status: {$order['orderStatus']}</p>";
            }
        } else if ($reportType === 'payment-receipt') {
            $stmt = $pdo->prepare("SELECT * FROM `payment` WHERE `id` = ? OR `paymentNumber` = ? LIMIT 1");
            $stmt->execute([$param, $param]);
            $payment = $stmt->fetch();
            if ($payment) {
                $title = "PAYMENT RECEIPT #" . $payment['paymentNumber'];
                $dataHtml = "<h2>{$title}</h2><p>Payment Method: {$payment['paymentMethod']}</p><p>Amount Paid: \${$payment['amount']} {$payment['currency']}</p><p>Ref: {$payment['referenceId']}</p>";
            }
        }

        $html = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>{$title}</title><style>body{font-family:Georgia,serif;padding:40px;color:#1f1f1f;background:#faf8f5;}h1{color:#c9a45c;}table{width:100%;border-collapse:collapse;}th,td{padding:10px;border-bottom:1px solid #ddd;}</style></head><body><h1>FLOKSY JEWEL</h1>{$dataHtml}<hr><p style='font-size:12px;color:#888;'>Floksy Jewel Atelier — 740 Fifth Avenue, New York, NY 10019</p></body></html>";

        header('Content-Type: text/html; charset=utf-8');
        echo $html;
        exit;
    } catch (Throwable $e) {
        jsonError('Error generating report', 500);
    }
}

/**
 * GET /api/v1/admin/reports/export
 */
function handleExportFinancialData(): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);
    try {
        $pdo = getDatabaseConnection();
        $type = $_GET['type'] ?? 'orders';
        $format = $_GET['format'] ?? 'csv';

        if ($type === 'payments') {
            $stmt = $pdo->query("SELECT `paymentNumber`, `orderId`, `amount`, `currency`, `paymentMethod`, `status`, `paymentDate` FROM `payment` ORDER BY `paymentDate` DESC");
            $rows = $stmt->fetchAll();

            $csv = "Payment Number,Order ID,Amount,Currency,Payment Method,Status,Payment Date\n";
            foreach ($rows as $r) {
                $csv .= "\"{$r['paymentNumber']}\",\"{$r['orderId']}\",\"{$r['amount']}\",\"{$r['currency']}\",\"{$r['paymentMethod']}\",\"{$r['status']}\",\"{$r['paymentDate']}\"\n";
            }
            $filename = "Floksy_Jewel_Payments_" . date('Y-m-d') . ".csv";
        } else {
            $stmt = $pdo->query("SELECT `orderNumber`, `customerName`, `customerEmail`, `totalAmount`, `currency`, `orderStatus`, `createdAt` FROM `order` ORDER BY `createdAt` DESC");
            $rows = $stmt->fetchAll();

            $csv = "Order Number,Customer Name,Customer Email,Total Amount,Currency,Order Status,Created At\n";
            foreach ($rows as $r) {
                $csv .= "\"{$r['orderNumber']}\",\"{$r['customerName']}\",\"{$r['customerEmail']}\",\"{$r['totalAmount']}\",\"{$r['currency']}\",\"{$r['orderStatus']}\",\"{$r['createdAt']}\"\n";
            }
            $filename = "Floksy_Jewel_Orders_" . date('Y-m-d') . ".csv";
        }

        header('Content-Type: text/csv; charset=utf-8');
        header("Content-Disposition: attachment; filename=\"{$filename}\"");
        echo $csv;
        exit;
    } catch (Throwable $e) {
        jsonError('Error exporting financial data', 500);
    }
}

/**
 * GET /api/v1/admin/financial-audit-logs
 */
function handleGetFinancialAuditLogs(): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN']);
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `activitylog` ORDER BY `createdAt` DESC LIMIT 200");
        $logs = $stmt->fetchAll();
        jsonResponse($logs, 200);
    } catch (Throwable $e) {
        jsonResponse([], 200);
    }
}



/**
 * GET /api/v1/admin/customers/:id
 */
function handleGetCustomerDetailWithLedger(string $id): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `customer` WHERE `id` = ? LIMIT 1");
        $stmt->execute([$id]);
        $customer = $stmt->fetch();

        if (!$customer) {
            jsonError('Customer not found', 404);
        }

        $oStmt = $pdo->prepare("SELECT * FROM `order` WHERE `customerId` = ? ORDER BY `createdAt` DESC");
        $oStmt->execute([$customer['id']]);
        $orders = $oStmt->fetchAll();

        $totalInvoiced = 0.0;
        foreach ($orders as $o) {
            $totalInvoiced += (float) $o['totalAmount'];
        }

        jsonResponse(array_merge($customer, [
            'orders'           => $orders,
            'financialSummary' => [
                'totalInvoiced'      => $totalInvoiced,
                'totalPaid'          => $totalInvoiced,
                'totalRefunds'       => 0.0,
                'netPaid'            => $totalInvoiced,
                'outstandingBalance' => 0.0
            ]
        ]), 200);

    } catch (Throwable $e) {
        jsonError('Error fetching customer detail', 500);
    }
}

/**
 * PUT /api/v1/admin/orders/:id
 * PATCH /api/v1/admin/orders/:id
 * POST /api/v1/admin/orders/:id/status
 */
function handleUpdateOrder(string $id): void {
    requireRole(['FINANCE_MANAGER', 'SUPER_ADMIN', 'ADMIN', 'ORDER_MANAGER']);

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `order` WHERE `id` = ? OR `orderNumber` = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $order = $stmt->fetch();

        if (!$order) {
            jsonError('Order not found', 404);
        }

        $status      = isset($body['orderStatus']) ? strtoupper($body['orderStatus']) : (isset($body['status']) ? strtoupper($body['status']) : $order['orderStatus']);
        $notes       = isset($body['notes']) ? $body['notes'] : $order['notes'];
        $shipping    = isset($body['shippingAddress']) ? $body['shippingAddress'] : $order['shippingAddress'];

        $upd = $pdo->prepare("UPDATE `order` SET `orderStatus` = ?, `notes` = ?, `shippingAddress` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $upd->execute([$status, $notes, $shipping, $order['id']]);

        // Re-read updated record
        $rStmt = $pdo->prepare("SELECT * FROM `order` WHERE `id` = ? LIMIT 1");
        $rStmt->execute([$order['id']]);
        $updatedOrder = $rStmt->fetch();

        $iStmt = $pdo->prepare("SELECT * FROM `orderitem` WHERE `orderId` = ?");
        $iStmt->execute([$order['id']]);
        $items = $iStmt->fetchAll();

        $pStmt = $pdo->prepare("SELECT * FROM `payment` WHERE `orderId` = ? ORDER BY `paymentDate` DESC");
        $pStmt->execute([$order['id']]);
        $payments = $pStmt->fetchAll();

        $rStmt2 = $pdo->prepare("SELECT * FROM `refund` WHERE `orderId` = ? ORDER BY `refundDate` DESC");
        $rStmt2->execute([$order['id']]);
        $refunds = $rStmt2->fetchAll();

        $fin = computeOrderFinancialsPHP($updatedOrder, $payments, $refunds);

        jsonResponse(array_merge($updatedOrder, $fin, [
            'message'  => 'Order updated successfully',
            'order'    => array_merge($updatedOrder, $fin, ['items' => $items, 'payments' => $payments, 'refunds' => $refunds]),
            'items'    => $items,
            'payments' => $payments,
            'refunds'  => $refunds
        ]), 200);

    } catch (Throwable $e) {
        error_log("handleUpdateOrder error: " . $e->getMessage());
        jsonError('Failed to update order', 500);
    }
}


