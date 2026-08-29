<?php
/**
 * Floksy Jewel — Business Hub & Operations Controller (PHP / MySQL PDO)
 * Handles Dashboard, Employees, Attendance, 46-column Sales Tracker, Commissions,
 * Targets, Customers, Suppliers, Excel Migration & Audit Trail on Hostinger / Apache.
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function ensureBusinessTablesExist(PDO $pdo): void {
    // 1. Employee
    $pdo->exec("CREATE TABLE IF NOT EXISTS `employee` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeCode` VARCHAR(50) UNIQUE NOT NULL,
        `name` VARCHAR(191) NOT NULL,
        `email` VARCHAR(191) UNIQUE NOT NULL,
        `phone` VARCHAR(50) NULL,
        `department` VARCHAR(100) NOT NULL DEFAULT 'Sales',
        `designation` VARCHAR(100) NOT NULL DEFAULT 'Sales Executive',
        `role` VARCHAR(50) NOT NULL DEFAULT 'SALES_EMPLOYEE',
        `joiningDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        `monthlyTarget` DOUBLE NOT NULL DEFAULT 0,
        `commissionPlanId` VARCHAR(191) NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 2. Attendance
    $pdo->exec("CREATE TABLE IF NOT EXISTS `attendance` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeId` VARCHAR(191) NOT NULL,
        `date` VARCHAR(20) NOT NULL,
        `checkIn` DATETIME NULL,
        `checkOut` DATETIME NULL,
        `hoursWorked` DOUBLE NOT NULL DEFAULT 0,
        `status` VARCHAR(20) NOT NULL DEFAULT 'PRESENT',
        `lateStatus` VARCHAR(20) NOT NULL DEFAULT 'ON_TIME',
        `isManualEntry` TINYINT(1) NOT NULL DEFAULT 0,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY `emp_date_unique` (`employeeId`, `date`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 3. CommissionPlan & CommissionRule
    $pdo->exec("CREATE TABLE IF NOT EXISTS `commissionplan` (
        `id` VARCHAR(191) PRIMARY KEY,
        `name` VARCHAR(191) NOT NULL,
        `description` TEXT NULL,
        `defaultRate` DOUBLE NOT NULL DEFAULT 0.05,
        `basis` VARCHAR(50) NOT NULL DEFAULT 'NET_PROFIT',
        `minAmount` DOUBLE NOT NULL DEFAULT 0,
        `maxAmount` DOUBLE NULL,
        `isActive` TINYINT(1) NOT NULL DEFAULT 1,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 4. Supplier
    $pdo->exec("CREATE TABLE IF NOT EXISTS `supplier` (
        `id` VARCHAR(191) PRIMARY KEY,
        `name` VARCHAR(191) NOT NULL,
        `companyName` VARCHAR(191) NULL,
        `email` VARCHAR(191) NULL,
        `phone` VARCHAR(50) NULL,
        `country` VARCHAR(100) NULL,
        `address` TEXT NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 5. InternalSale (46 Columns matching Excel)
    $pdo->exec("CREATE TABLE IF NOT EXISTS `internalsale` (
        `id` VARCHAR(191) PRIMARY KEY,
        `invoiceNo` VARCHAR(100) UNIQUE NOT NULL,
        `saleDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `customerName` VARCHAR(191) NOT NULL,
        `customerCountry` VARCHAR(100) NULL,
        `customerId` VARCHAR(191) NULL,
        `productType` VARCHAR(50) NOT NULL DEFAULT 'Diamond',
        `productDescription` TEXT NULL,
        `stoneType` VARCHAR(50) NULL,
        `shape` VARCHAR(50) NULL,
        `diamondColor` VARCHAR(50) NULL,
        `clarity` VARCHAR(50) NULL,
        `cut` VARCHAR(50) NULL,
        `polish` VARCHAR(50) NULL,
        `symmetry` VARCHAR(50) NULL,
        `fluorescence` VARCHAR(50) NULL,
        `measurement` VARCHAR(100) NULL,
        `pricePerCarat` DOUBLE NULL,
        `caratWeight` DOUBLE NULL,
        `quantity` DOUBLE NOT NULL DEFAULT 1,
        `certificate` VARCHAR(50) NULL,
        `certificateNo` VARCHAR(100) NULL,
        `supplierName` VARCHAR(191) NULL,
        `supplierId` VARCHAR(191) NULL,
        `purchasePrice` DOUBLE NOT NULL DEFAULT 0,
        `sellingPrice` DOUBLE NOT NULL DEFAULT 0,
        `discount` DOUBLE NOT NULL DEFAULT 0,
        `finalSaleAmount` DOUBLE NOT NULL DEFAULT 0,
        `shippingCost` DOUBLE NOT NULL DEFAULT 0,
        `gstPercent` DOUBLE NOT NULL DEFAULT 0,
        `gstAmount` DOUBLE NOT NULL DEFAULT 0,
        `finalPurchasePrice` DOUBLE NOT NULL DEFAULT 0,
        `paymentStatus` VARCHAR(50) NOT NULL DEFAULT 'Pending',
        `paymentMethod` VARCHAR(50) NULL,
        `amountReceived` DOUBLE NOT NULL DEFAULT 0,
        `pendingAmount` DOUBLE NOT NULL DEFAULT 0,
        `grossProfit` DOUBLE NOT NULL DEFAULT 0,
        `netProfit` DOUBLE NOT NULL DEFAULT 0,
        `salesPersonName` VARCHAR(191) NULL,
        `employeeId` VARCHAR(191) NULL,
        `commissionPercent` DOUBLE NOT NULL DEFAULT 0,
        `commissionAmount` DOUBLE NOT NULL DEFAULT 0,
        `profitAfterCommission` DOUBLE NOT NULL DEFAULT 0,
        `markupPercent` DOUBLE NOT NULL DEFAULT 0,
        `finalProfitPercent` DOUBLE NOT NULL DEFAULT 0,
        `orderStatus` VARCHAR(50) NOT NULL DEFAULT 'Delivered',
        `trackingNumber` VARCHAR(100) NULL,
        `trackingLink` TEXT NULL,
        `dollarRate` DOUBLE NULL,
        `saleMonth` VARCHAR(50) NULL,
        `isImported` TINYINT(1) NOT NULL DEFAULT 0,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 6. Commission
    $pdo->exec("CREATE TABLE IF NOT EXISTS `commission` (
        `id` VARCHAR(191) PRIMARY KEY,
        `saleId` VARCHAR(191) UNIQUE NOT NULL,
        `employeeId` VARCHAR(191) NOT NULL,
        `rateSnapshot` DOUBLE NOT NULL DEFAULT 0,
        `amount` DOUBLE NOT NULL DEFAULT 0,
        `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
        `approvedBy` VARCHAR(191) NULL,
        `approvedAt` DATETIME NULL,
        `paidBy` VARCHAR(191) NULL,
        `paidAt` DATETIME NULL,
        `paymentReference` VARCHAR(191) NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 7. SalesTarget
    $pdo->exec("CREATE TABLE IF NOT EXISTS `salestarget` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeId` VARCHAR(191) NOT NULL,
        `year` INT NOT NULL,
        `month` INT NULL,
        `quarter` INT NULL,
        `targetAmount` DOUBLE NOT NULL DEFAULT 0,
        `actualSales` DOUBLE NOT NULL DEFAULT 0,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 8. Seed initial requested employees: Rutu (Sales Manager), Jyoti (Sales Employee), Twinkle (Sales Employee)
    $employeesToSeed = [
        [
            'id' => 'emp-rutu-001',
            'employeeCode' => 'EMP-1001',
            'name' => 'Rutu',
            'email' => 'rutu@floksyjewel.com',
            'phone' => '+91 98765 43210',
            'department' => 'Sales',
            'designation' => 'Sales Manager',
            'role' => 'SALES_MANAGER',
            'status' => 'ACTIVE',
            'monthlyTarget' => 150000,
            'notes' => 'Sales Manager leading retail and high jewellery sales'
        ],
        [
            'id' => 'emp-jyoti-002',
            'employeeCode' => 'EMP-1002',
            'name' => 'Jyoti',
            'email' => 'jyoti@floksyjewel.com',
            'phone' => '+91 98765 43211',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive specializing in diamond and custom jewelry'
        ],
        [
            'id' => 'emp-twinkle-003',
            'employeeCode' => 'EMP-1003',
            'name' => 'Twinkle',
            'email' => 'twinkle@floksyjewel.com',
            'phone' => '+91 98765 43212',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive handling fine jewellery and solitaire sales'
        ]
    ];

    $seedStmt = $pdo->prepare("INSERT INTO `employee` (`id`, `employeeCode`, `name`, `email`, `phone`, `department`, `designation`, `role`, `status`, `monthlyTarget`, `notes`, `createdAt`, `updatedAt`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()) 
        ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `designation` = VALUES(`designation`), `monthlyTarget` = VALUES(`monthlyTarget`)");

    foreach ($employeesToSeed as $e) {
        $seedStmt->execute([
            $e['id'],
            $e['employeeCode'],
            $e['name'],
            $e['email'],
            $e['phone'],
            $e['department'],
            $e['designation'],
            $e['role'],
            $e['status'],
            $e['monthlyTarget'],
            $e['notes']
        ]);
    }
}

function computePhpFinancials(array $d): array {
    $sellingPrice = (float)($d['sellingPrice'] ?? 0);
    $discount = (float)($d['discount'] ?? 0);
    $finalSaleAmount = max(0, $sellingPrice - $discount);

    $purchasePrice = (float)($d['purchasePrice'] ?? 0);
    $gstPercent = (float)($d['gstPercent'] ?? 0);
    $gstAmount = $purchasePrice * $gstPercent;
    $finalPurchasePrice = $purchasePrice + $gstAmount;

    $shippingCost = (float)($d['shippingCost'] ?? 0);
    $grossProfit = $finalSaleAmount - $finalPurchasePrice;
    $netProfit = $grossProfit - $shippingCost;

    $commissionPercent = (float)($d['commissionPercent'] ?? 0);
    $commissionAmount = $netProfit > 0 ? ($netProfit * $commissionPercent) : 0;
    $profitAfterCommission = $netProfit - $commissionAmount;

    $markupPercent = $finalPurchasePrice > 0 ? ($netProfit / $finalPurchasePrice) : 0;
    $finalProfitPercent = $finalPurchasePrice > 0 ? ($profitAfterCommission / $finalPurchasePrice) : 0;

    $paymentStatus = $d['paymentStatus'] ?? 'Pending';
    $amountReceived = (float)($d['amountReceived'] ?? 0);
    if ($paymentStatus === 'Paid' && $amountReceived == 0) {
        $amountReceived = $finalSaleAmount;
    }
    $pendingAmount = ($paymentStatus === 'Paid') ? 0 : max(0, $finalSaleAmount - $amountReceived);

    return [
        'sellingPrice' => $sellingPrice,
        'discount' => $discount,
        'finalSaleAmount' => round($finalSaleAmount, 2),
        'purchasePrice' => $purchasePrice,
        'gstPercent' => $gstPercent,
        'gstAmount' => round($gstAmount, 4),
        'finalPurchasePrice' => round($finalPurchasePrice, 4),
        'shippingCost' => $shippingCost,
        'grossProfit' => round($grossProfit, 4),
        'netProfit' => round($netProfit, 4),
        'commissionPercent' => $commissionPercent,
        'commissionAmount' => round($commissionAmount, 4),
        'profitAfterCommission' => round($profitAfterCommission, 4),
        'markupPercent' => round($markupPercent, 6),
        'finalProfitPercent' => round($finalProfitPercent, 6),
        'amountReceived' => round($amountReceived, 2),
        'pendingAmount' => round($pendingAmount, 2),
        'paymentStatus' => $paymentStatus
    ];
}

// -------------------------------------------------------------
// CONTROLLER HANDLERS
// -------------------------------------------------------------

function handleGetBusinessDashboard(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $stmt = $pdo->query("SELECT 
        COUNT(*) as totalOrders,
        COALESCE(SUM(finalSaleAmount), 0) as totalRevenue,
        COALESCE(SUM(finalPurchasePrice), 0) as totalPurchaseCost,
        COALESCE(SUM(grossProfit), 0) as totalGrossProfit,
        COALESCE(SUM(netProfit), 0) as totalNetProfit,
        COALESCE(SUM(commissionAmount), 0) as totalCommission,
        COALESCE(SUM(profitAfterCommission), 0) as totalProfitAfterCommission,
        COALESCE(SUM(gstAmount), 0) as totalGST,
        COALESCE(SUM(pendingAmount), 0) as totalPendingReceivables
    FROM `internalsale`");
    $metrics = $stmt->fetch(PDO::FETCH_ASSOC);

    $dollarRate = 94.55;
    $metrics['dollarRate'] = $dollarRate;
    $metrics['totalNetProfitINR'] = round($metrics['totalNetProfit'] * $dollarRate, 2);
    $metrics['totalCommissionINR'] = round($metrics['totalCommission'] * $dollarRate, 2);
    $metrics['profitAfterCommissionINR'] = round($metrics['totalProfitAfterCommission'] * $dollarRate, 2);

    // SalesPerson Performance
    $spStmt = $pdo->query("SELECT 
        COALESCE(salesPersonName, 'Unassigned') as name,
        COUNT(*) as orders,
        COALESCE(SUM(finalSaleAmount), 0) as revenue,
        COALESCE(SUM(netProfit), 0) as netProfitUSD,
        COALESCE(SUM(commissionAmount), 0) as commissionUSD
    FROM `internalsale`
    GROUP BY salesPersonName
    ORDER BY revenue DESC");
    $salesPersonPerformance = [];
    while ($r = $spStmt->fetch(PDO::FETCH_ASSOC)) {
        $r['netProfitINR'] = round($r['netProfitUSD'] * $dollarRate, 2);
        $r['commissionINR'] = round($r['commissionUSD'] * $dollarRate, 2);
        $salesPersonPerformance[] = $r;
    }

    // Product Distribution
    $pStmt = $pdo->query("SELECT 
        productType,
        COUNT(*) as orders,
        COALESCE(SUM(finalSaleAmount), 0) as revenue,
        COALESCE(SUM(netProfit), 0) as netProfit
    FROM `internalsale`
    GROUP BY productType");
    $productDistribution = [
        'diamond' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0],
        'jewelry' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0]
    ];
    while ($p = $pStmt->fetch(PDO::FETCH_ASSOC)) {
        $k = strtolower($p['productType']) === 'diamond' ? 'diamond' : 'jewelry';
        $productDistribution[$k] = [
            'orders' => (int)$p['orders'],
            'revenue' => (float)$p['revenue'],
            'netProfit' => (float)$p['netProfit']
        ];
    }

    // Attendance stats
    $today = date('Y-m-d');
    $attStmt = $pdo->prepare("SELECT status, COUNT(*) as cnt FROM `attendance` WHERE `date` = ? GROUP BY status");
    $attStmt->execute([$today]);
    $attendanceToday = ['present' => 0, 'absent' => 0, 'late' => 0, 'onLeave' => 0, 'total' => 0];
    while ($a = $attStmt->fetch(PDO::FETCH_ASSOC)) {
        $st = strtolower($a['status']);
        if ($st === 'present') $attendanceToday['present'] += (int)$a['cnt'];
        else if ($st === 'absent') $attendanceToday['absent'] += (int)$a['cnt'];
        else if ($st === 'leave') $attendanceToday['onLeave'] += (int)$a['cnt'];
    }
    $totalEmpStmt = $pdo->query("SELECT COUNT(*) FROM `employee` WHERE `status` = 'ACTIVE'");
    $attendanceToday['total'] = (int)$totalEmpStmt->fetchColumn();

    jsonResponse([
        'metrics' => $metrics,
        'salesPersonPerformance' => $salesPersonPerformance,
        'productDistribution' => $productDistribution,
        'attendanceToday' => $attendanceToday,
        'salesTargetOverall' => ['target' => 100000, 'actual' => (float)$metrics['totalRevenue'], 'achievementPercent' => 0]
    ]);
}

function handleGetBusinessSales(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(500, max(10, (int)($_GET['limit'] ?? 50)));
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if (!empty($_GET['search'])) {
        $s = '%' . trim($_GET['search']) . '%';
        $where[] = "(`invoiceNo` LIKE ? OR `customerName` LIKE ? OR `productDescription` LIKE ? OR `certificateNo` LIKE ?)";
        $params = array_merge($params, [$s, $s, $s, $s]);
    }
    if (!empty($_GET['productType'])) {
        $where[] = "`productType` = ?";
        $params[] = $_GET['productType'];
    }
    if (!empty($_GET['paymentStatus'])) {
        $where[] = "`paymentStatus` = ?";
        $params[] = $_GET['paymentStatus'];
    }
    if (!empty($_GET['orderStatus'])) {
        $where[] = "`orderStatus` = ?";
        $params[] = $_GET['orderStatus'];
    }

    $whereSql = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM `internalsale` {$whereSql}");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    $sumStmt = $pdo->prepare("SELECT 
        COUNT(*) as totalOrders,
        COALESCE(SUM(finalSaleAmount), 0) as totalRevenue,
        COALESCE(SUM(finalPurchasePrice), 0) as totalPurchaseCost,
        COALESCE(SUM(grossProfit), 0) as totalGrossProfit,
        COALESCE(SUM(netProfit), 0) as totalNetProfit,
        COALESCE(SUM(commissionAmount), 0) as totalCommission,
        COALESCE(SUM(profitAfterCommission), 0) as totalProfitAfterCommission
    FROM `internalsale` {$whereSql}");
    $sumStmt->execute($params);
    $summary = $sumStmt->fetch(PDO::FETCH_ASSOC);

    $dataStmt = $pdo->prepare("SELECT * FROM `internalsale` {$whereSql} ORDER BY `saleDate` DESC, `createdAt` DESC LIMIT {$limit} OFFSET {$offset}");
    $dataStmt->execute($params);
    $sales = $dataStmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse([
        'sales' => $sales,
        'total' => $total,
        'page' => $page,
        'limit' => $limit,
        'summary' => $summary
    ]);
}

function handleCreateBusinessSale(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    if (empty($body['invoiceNo']) || empty($body['customerName'])) {
        jsonError('Invoice No and Customer Name are required', 400);
    }

    $fin = computePhpFinancials($body);
    $id = generateUuidV4();

    $stmt = $pdo->prepare("INSERT INTO `internalsale` (
        `id`, `invoiceNo`, `saleDate`, `customerName`, `customerCountry`, `customerId`, `productType`,
        `productDescription`, `stoneType`, `shape`, `diamondColor`, `clarity`, `cut`, `polish`,
        `symmetry`, `fluorescence`, `measurement`, `pricePerCarat`, `caratWeight`, `quantity`,
        `certificate`, `certificateNo`, `supplierName`, `supplierId`, `purchasePrice`, `sellingPrice`,
        `discount`, `finalSaleAmount`, `shippingCost`, `gstPercent`, `gstAmount`, `finalPurchasePrice`,
        `paymentStatus`, `paymentMethod`, `amountReceived`, `pendingAmount`, `grossProfit`, `netProfit`,
        `salesPersonName`, `employeeId`, `commissionPercent`, `commissionAmount`, `profitAfterCommission`,
        `markupPercent`, `finalProfitPercent`, `orderStatus`, `trackingNumber`, `trackingLink`, `dollarRate`,
        `saleMonth`, `createdAt`, `updatedAt`
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
    )");

    $saleDate = !empty($body['saleDate']) ? date('Y-m-d H:i:s', strtotime($body['saleDate'])) : date('Y-m-d H:i:s');
    $saleMonth = !empty($body['saleMonth']) ? $body['saleMonth'] : date('F', strtotime($saleDate));

    $stmt->execute([
        $id,
        $body['invoiceNo'],
        $saleDate,
        $body['customerName'],
        $body['customerCountry'] ?? null,
        $body['customerId'] ?? null,
        $body['productType'] ?? 'Diamond',
        $body['productDescription'] ?? null,
        $body['stoneType'] ?? null,
        $body['shape'] ?? null,
        $body['diamondColor'] ?? null,
        $body['clarity'] ?? null,
        $body['cut'] ?? null,
        $body['polish'] ?? null,
        $body['symmetry'] ?? null,
        $body['fluorescence'] ?? null,
        $body['measurement'] ?? null,
        $body['pricePerCarat'] ?? null,
        $body['caratWeight'] ?? null,
        $body['quantity'] ?? 1,
        $body['certificate'] ?? null,
        $body['certificateNo'] ?? null,
        $body['supplierName'] ?? null,
        $body['supplierId'] ?? null,
        $fin['purchasePrice'],
        $fin['sellingPrice'],
        $fin['discount'],
        $fin['finalSaleAmount'],
        $fin['shippingCost'],
        $fin['gstPercent'],
        $fin['gstAmount'],
        $fin['finalPurchasePrice'],
        $fin['paymentStatus'],
        $body['paymentMethod'] ?? null,
        $fin['amountReceived'],
        $fin['pendingAmount'],
        $fin['grossProfit'],
        $fin['netProfit'],
        $body['salesPersonName'] ?? null,
        $body['employeeId'] ?? null,
        $fin['commissionPercent'],
        $fin['commissionAmount'],
        $fin['profitAfterCommission'],
        $fin['markupPercent'],
        $fin['finalProfitPercent'],
        $body['orderStatus'] ?? 'Delivered',
        $body['trackingNumber'] ?? null,
        $body['trackingLink'] ?? null,
        $body['dollarRate'] ?? 94.55,
        $saleMonth
    ]);

    jsonResponse(['message' => 'Sale created successfully', 'id' => $id], 201);
}

function handleExecuteSalesImport(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];
    $rows = $body['rows'] ?? [];
    $skipDuplicates = !empty($body['skipDuplicates']);

    if (empty($rows)) {
        jsonError('No rows provided for import', 400);
    }

    $importedCount = 0;
    $skippedCount = 0;

    $checkStmt = $pdo->prepare("SELECT id FROM `internalsale` WHERE `invoiceNo` = ? LIMIT 1");

    foreach ($rows as $r) {
        $inv = trim($r['invoiceNo'] ?? '');
        if (empty($inv)) continue;

        $checkStmt->execute([$inv]);
        if ($checkStmt->fetch()) {
            if ($skipDuplicates) {
                $skippedCount++;
                continue;
            }
        }

        $id = generateUuidV4();
        $stmt = $pdo->prepare("INSERT INTO `internalsale` (
            `id`, `invoiceNo`, `saleDate`, `customerName`, `customerCountry`, `productType`,
            `productDescription`, `stoneType`, `shape`, `diamondColor`, `clarity`, `cut`, `polish`,
            `symmetry`, `fluorescence`, `measurement`, `pricePerCarat`, `caratWeight`, `quantity`,
            `certificate`, `certificateNo`, `supplierName`, `purchasePrice`, `sellingPrice`,
            `discount`, `finalSaleAmount`, `shippingCost`, `gstPercent`, `gstAmount`, `finalPurchasePrice`,
            `paymentStatus`, `paymentMethod`, `amountReceived`, `pendingAmount`, `grossProfit`, `netProfit`,
            `salesPersonName`, `commissionPercent`, `commissionAmount`, `profitAfterCommission`,
            `markupPercent`, `finalProfitPercent`, `orderStatus`, `trackingNumber`, `trackingLink`, `dollarRate`,
            `saleMonth`, `isImported`, `createdAt`, `updatedAt`
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW()
        )");

        $saleDate = !empty($r['saleDate']) ? date('Y-m-d H:i:s', strtotime($r['saleDate'])) : date('Y-m-d H:i:s');
        $saleMonth = !empty($r['saleMonth']) ? $r['saleMonth'] : date('F', strtotime($saleDate));

        $stmt->execute([
            $id,
            $inv,
            $saleDate,
            $r['customerName'] ?? 'Walk-in Client',
            $r['customerCountry'] ?? null,
            $r['productType'] ?? 'Diamond',
            $r['productDescription'] ?? null,
            $r['stoneType'] ?? null,
            $r['shape'] ?? null,
            $r['diamondColor'] ?? null,
            $r['clarity'] ?? null,
            $r['cut'] ?? null,
            $r['polish'] ?? null,
            $r['symmetry'] ?? null,
            $r['fluorescence'] ?? null,
            $r['measurement'] ?? null,
            $r['pricePerCarat'] ?? null,
            $r['caratWeight'] ?? null,
            $r['quantity'] ?? 1,
            $r['certificate'] ?? null,
            $r['certificateNo'] ?? null,
            $r['supplierName'] ?? null,
            (float)($r['purchasePrice'] ?? 0),
            (float)($r['sellingPrice'] ?? 0),
            (float)($r['discount'] ?? 0),
            (float)($r['finalSaleAmount'] ?? 0),
            (float)($r['shippingCost'] ?? 0),
            (float)($r['gstPercent'] ?? 0),
            (float)($r['gstAmount'] ?? 0),
            (float)($r['finalPurchasePrice'] ?? 0),
            $r['paymentStatus'] ?? 'Paid',
            $r['paymentMethod'] ?? null,
            (float)($r['amountReceived'] ?? 0),
            (float)($r['pendingAmount'] ?? 0),
            (float)($r['grossProfit'] ?? 0),
            (float)($r['netProfit'] ?? 0),
            $r['salesPersonName'] ?? null,
            (float)($r['commissionPercent'] ?? 0),
            (float)($r['commissionAmount'] ?? 0),
            (float)($r['profitAfterCommission'] ?? 0),
            (float)($r['markupPercent'] ?? 0),
            (float)($r['finalProfitPercent'] ?? 0),
            $r['orderStatus'] ?? 'Delivered',
            $r['trackingNumber'] ?? null,
            $r['trackingLink'] ?? null,
            $r['dollarRate'] ?? 94.55,
            $saleMonth
        ]);

        $importedCount++;
    }

    jsonResponse([
        'message' => 'Import executed successfully',
        'importedCount' => $importedCount,
        'skippedCount' => $skippedCount,
        'totalCount' => count($rows)
    ]);
}

function handleGetBusinessEmployees(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT * FROM `employee` ORDER BY `name` ASC");
    jsonResponse(['employees' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessAttendance(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $date = $_GET['date'] ?? date('Y-m-d');
    $stmt = $pdo->prepare("SELECT a.*, e.name as employeeName, e.employeeCode, e.department 
        FROM `attendance` a 
        JOIN `employee` e ON a.employeeId = e.id 
        WHERE a.date = ?");
    $stmt->execute([$date]);
    jsonResponse(['attendance' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessCustomers(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT * FROM `customer` ORDER BY `createdAt` DESC LIMIT 100");
    jsonResponse(['customers' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessSuppliers(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT * FROM `supplier` ORDER BY `name` ASC");
    jsonResponse(['suppliers' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessCommissions(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT c.*, s.invoiceNo, s.customerName, s.finalSaleAmount, s.netProfit 
        FROM `commission` c 
        JOIN `internalsale` s ON c.saleId = s.id 
        ORDER BY c.createdAt DESC");
    jsonResponse(['commissions' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessTargets(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT t.*, e.name as employeeName FROM `salestarget` t JOIN `employee` e ON t.employeeId = e.id");
    jsonResponse(['targets' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessAuditLogs(): void {
    $pdo = getDatabaseConnection();
    $stmt = $pdo->query("SELECT * FROM `activitylog` ORDER BY `createdAt` DESC LIMIT 100");
    jsonResponse(['logs' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}
