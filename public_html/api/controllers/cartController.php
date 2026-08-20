<?php
/**
 * Floksy Jewel — Cart & Checkout Preparation Controller
 * Migrated from Node.js (holidayMode.ts, cart models) to PHP 8.3 / PDO MySQL
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/productController.php';

function generateUuidV4Cart(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

/**
 * Holiday / Store Closure Verification Middleware
 */
function checkIsHolidayModeActive(PDO $pdo): array {
    try {
        $stmt = $pdo->query("SELECT `key`, `value` FROM `sitesetting` WHERE `key` LIKE 'holiday%' OR `key` IN ('holiday_mode', 'holiday_mode_enabled', 'active', 'site_settings')");
        $rows = $stmt->fetchAll();

        $configObj = [];
        $directKeys = [];

        // Pass 1: Unpack composite JSON objects
        foreach ($rows as $r) {
            $val = $r['value'];
            $decoded = json_decode($val, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $configObj = array_merge($configObj, $decoded);
            } else {
                $directKeys[$r['key']] = $val;
            }
        }

        // Pass 2: Direct scalar keys override composite values
        foreach ($directKeys as $k => $v) {
            $configObj[$k] = $v;
        }

        $enabledVal = $directKeys['holiday_mode_enabled'] ?? ($directKeys['holiday_mode'] ?? ($directKeys['active'] ?? ($configObj['holiday_mode_enabled'] ?? ($configObj['holiday_mode'] ?? false))));
        if (is_array($enabledVal)) {
            $enabledVal = $enabledVal['holiday_mode_enabled'] ?? ($enabledVal['active'] ?? ($enabledVal['enabled'] ?? false));
        }

        $isManualEnabled = ($enabledVal === true || $enabledVal === 'true' || $enabledVal === 1 || $enabledVal === '1' || $enabledVal === 'ON' || $enabledVal === 'yes');

        $now = time();
        $isScheduleActive = false;
        $startStr = $configObj['holiday_mode_start'] ?? ($configObj['holiday_start_date'] ?? '');
        $endStr   = $configObj['holiday_mode_end'] ?? ($configObj['holiday_end_date'] ?? '');

        if (!empty($startStr) && !empty($endStr)) {
            $start = strtotime($startStr);
            $end   = strtotime($endStr);
            if ($start && $end && $now >= $start && $now <= $end) {
                $isScheduleActive = true;
            }
        }

        $isActive = ($isManualEnabled || $isScheduleActive);

        return ['active' => $isActive, 'config' => $configObj];

    } catch (Throwable $e) {
        error_log("checkIsHolidayModeActive error: " . $e->getMessage());
        return ['active' => false, 'config' => null];
    }
}

function requireStoreOpenForOrders(): void {
    $pdo = getDatabaseConnection();
    $status = checkIsHolidayModeActive($pdo);
    if ($status['active']) {
        $closureMsg = $status['config']['holiday_mode_message'] ?? 'Our online store is temporarily closed for a scheduled holiday break. We appreciate your understanding.';
        jsonResponse([
            'success'          => false,
            'code'             => 'STORE_CLOSED',
            'message'          => $closureMsg,
            'reopeningMessage' => $status['config']['holiday_mode_reopening_message'] ?? null
        ], 503);
    }
}

/**
 * GET /api/v1/settings/holiday-mode
 * GET /api/v1/admin/settings/holiday-mode
 */
function handleGetHolidayModeStatus(): void {
    try {
        $pdo = getDatabaseConnection();
        $status = checkIsHolidayModeActive($pdo);
        $cfg = $status['config'] ?? [];

        jsonResponse(array_merge($cfg, [
            'active'                => (bool)$status['active'],
            'manualOn'              => (bool)$status['active'],
            'isHolidayModeActive'   => (bool)$status['active'],
            'holiday_mode_enabled'  => (bool)$status['active'],
            'holiday_mode_message'  => $cfg['holiday_mode_message'] ?? ($cfg['holiday_message'] ?? 'Orders are temporarily unavailable while we are away.'),
            'holiday_mode_start'    => $cfg['holiday_mode_start'] ?? ($cfg['holiday_start_date'] ?? ''),
            'holiday_mode_end'      => $cfg['holiday_mode_end'] ?? ($cfg['holiday_end_date'] ?? ''),
            'startDate'             => $cfg['holiday_mode_start'] ?? ($cfg['holiday_start_date'] ?? ''),
            'endDate'               => $cfg['holiday_mode_end'] ?? ($cfg['holiday_end_date'] ?? ''),
            'holiday_mode'          => $cfg
        ]), 200);
    } catch (Throwable $e) {
        error_log("handleGetHolidayModeStatus error: " . $e->getMessage());
        jsonResponse(['active' => false, 'manualOn' => false, 'isHolidayModeActive' => false], 200);
    }
}

/**
 * Helper: Resolve active Cart record for user or session
 */
function getOrCreateCart(PDO $pdo, ?string $customerId = null, ?string $sessionId = null): array {
    if ($customerId) {
        $stmt = $pdo->prepare("SELECT * FROM `cart` WHERE `customerId` = ? LIMIT 1");
        $stmt->execute([$customerId]);
        $cart = $stmt->fetch();
        if ($cart) return $cart;
    }

    if ($sessionId) {
        $stmt = $pdo->prepare("SELECT * FROM `cart` WHERE `sessionId` = ? LIMIT 1");
        $stmt->execute([$sessionId]);
        $cart = $stmt->fetch();
        if ($cart) return $cart;
    }

    $cartId = generateUuidV4Cart();
    $inst = $pdo->prepare("INSERT INTO `cart` (`id`, `customerId`, `sessionId`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, NOW(), NOW())");
    $inst->execute([$cartId, $customerId, $sessionId]);

    return [
        'id'         => $cartId,
        'customerId' => $customerId,
        'sessionId'  => $sessionId,
        'createdAt'  => date('Y-m-d H:i:s'),
        'updatedAt'  => date('Y-m-d H:i:s')
    ];
}

/**
 * GET /api/v1/cart
 */
function handleGetCart(): void {
    $userToken = null;
    $authHeader = getBearerToken();
    if ($authHeader) {
        $userToken = verifyJwt($authHeader);
    }

    $customerId = $userToken['id'] ?? ($_GET['customerId'] ?? null);
    $sessionId  = $_GET['sessionId'] ?? null;

    try {
        $pdo = getDatabaseConnection();
        $cart = getOrCreateCart($pdo, $customerId, $sessionId);

        $stmt = $pdo->prepare("
            SELECT `ci`.*, `p`.`name` as `product_name`, `p`.`price` as `product_price`, `p`.`mainImage` as `product_image`, `p`.`sku` as `product_sku`
            FROM `cartitem` `ci`
            LEFT JOIN `product` `p` ON `ci`.`productId` = `p`.`id`
            WHERE `ci`.`cartId` = ?
        ");
        $stmt->execute([$cart['id']]);
        $rawItems = $stmt->fetchAll();

        $subtotal = 0.0;
        $items = [];

        foreach ($rawItems as $item) {
            $unitPrice = (float) ($item['product_price'] ?? 0);
            $qty = (int) ($item['quantity'] ?? 1);
            $itemSubtotal = $unitPrice * $qty;
            $subtotal += $itemSubtotal;

            $items[] = [
                'id'            => $item['id'],
                'cartId'        => $item['cartId'],
                'productId'     => $item['productId'],
                'diamondId'     => $item['diamondId'],
                'quantity'      => $qty,
                'metal'         => $item['metal'],
                'goldColor'     => $item['goldColor'],
                'size'          => $item['size'],
                'unitPrice'     => $unitPrice,
                'itemSubtotal'  => $itemSubtotal,
                'product'       => [
                    'id'        => $item['productId'],
                    'name'      => $item['product_name'],
                    'price'     => $unitPrice,
                    'mainImage' => $item['product_image'],
                    'sku'       => $item['product_sku']
                ]
            ];
        }

        jsonResponse([
            'cart' => [
                'id'         => $cart['id'],
                'customerId' => $cart['customerId'],
                'sessionId'  => $cart['sessionId'],
                'subtotal'   => $subtotal,
                'totalAmount'=> $subtotal,
                'currency'   => 'USD',
                'itemsCount' => count($items),
                'items'      => $items
            ]
        ], 200);

    } catch (Throwable $e) {
        error_log("handleGetCart error: " . $e->getMessage());
        jsonError('Error retrieving cart', 500);
    }
}

/**
 * POST /api/v1/cart/items
 */
function handleAddToCart(): void {
    $userToken = null;
    $authHeader = getBearerToken();
    if ($authHeader) {
        $userToken = verifyJwt($authHeader);
    }

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $productId  = $body['productId'] ?? null;
    $diamondId  = $body['diamondId'] ?? null;
    $quantity   = max(1, (int) ($body['quantity'] ?? 1));
    $metal      = $body['metal'] ?? null;
    $goldColor  = $body['goldColor'] ?? null;
    $size       = $body['size'] ?? null;
    $customerId = $userToken['id'] ?? ($body['customerId'] ?? null);
    $sessionId  = $body['sessionId'] ?? null;

    if (!$productId && !$diamondId) {
        jsonError('productId or diamondId is required', 400);
    }

    try {
        $pdo = getDatabaseConnection();
        $pdo->beginTransaction();

        $cart = getOrCreateCart($pdo, $customerId, $sessionId);

        // Check if matching cart item exists
        $checkStmt = $pdo->prepare("SELECT * FROM `cartitem` WHERE `cartId` = ? AND `productId` <=> ? AND `diamondId` <=> ? AND `metal` <=> ? AND `size` <=> ? LIMIT 1");
        $checkStmt->execute([$cart['id'], $productId, $diamondId, $metal, $size]);
        $existingItem = $checkStmt->fetch();

        if ($existingItem) {
            $newQty = $existingItem['quantity'] + $quantity;
            $upd = $pdo->prepare("UPDATE `cartitem` SET `quantity` = ? WHERE `id` = ?");
            $upd->execute([$newQty, $existingItem['id']]);
            $itemId = $existingItem['id'];
        } else {
            $itemId = generateUuidV4Cart();
            $inst = $pdo->prepare("INSERT INTO `cartitem` (`id`, `cartId`, `productId`, `diamondId`, `quantity`, `metal`, `goldColor`, `size`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $inst->execute([$itemId, $cart['id'], $productId, $diamondId, $quantity, $metal, $goldColor, $size]);
        }

        $pdo->commit();

        jsonResponse([
            'success' => true,
            'cartId'  => $cart['id'],
            'itemId'  => $itemId,
            'message' => 'Item added to cart successfully'
        ], 200);

    } catch (Throwable $e) {
        if ($pdo && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log("handleAddToCart error: " . $e->getMessage());
        jsonError('Error adding item to cart', 500);
    }
}

/**
 * PUT /api/v1/cart/items/:id
 * PATCH /api/v1/cart/items/:id
 */
function handleUpdateCartItem(string $itemId): void {
    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;
    $quantity = (int) ($body['quantity'] ?? 1);

    try {
        $pdo = getDatabaseConnection();

        if ($quantity <= 0) {
            $del = $pdo->prepare("DELETE FROM `cartitem` WHERE `id` = ?");
            $del->execute([$itemId]);
            jsonResponse(['success' => true, 'message' => 'Item removed from cart'], 200);
        }

        $upd = $pdo->prepare("UPDATE `cartitem` SET `quantity` = ? WHERE `id` = ?");
        $upd->execute([$quantity, $itemId]);

        jsonResponse(['success' => true, 'message' => 'Cart item updated'], 200);

    } catch (Throwable $e) {
        error_log("handleUpdateCartItem error: " . $e->getMessage());
        jsonError('Error updating cart item', 500);
    }
}

/**
 * DELETE /api/v1/cart/items/:id
 */
function handleRemoveCartItem(string $itemId): void {
    try {
        $pdo = getDatabaseConnection();
        $del = $pdo->prepare("DELETE FROM `cartitem` WHERE `id` = ?");
        $del->execute([$itemId]);

        jsonResponse(['success' => true, 'message' => 'Cart item removed'], 200);

    } catch (Throwable $e) {
        error_log("handleRemoveCartItem error: " . $e->getMessage());
        jsonError('Error removing cart item', 500);
    }
}

/**
 * DELETE /api/v1/cart/clear
 */
function handleClearCart(): void {
    $userToken = null;
    $authHeader = getBearerToken();
    if ($authHeader) {
        $userToken = verifyJwt($authHeader);
    }

    $customerId = $userToken['id'] ?? ($_GET['customerId'] ?? null);
    $sessionId  = $_GET['sessionId'] ?? null;

    try {
        $pdo = getDatabaseConnection();
        $cart = getOrCreateCart($pdo, $customerId, $sessionId);

        $del = $pdo->prepare("DELETE FROM `cartitem` WHERE `cartId` = ?");
        $del->execute([$cart['id']]);

        jsonResponse(['success' => true, 'message' => 'Cart cleared successfully'], 200);

    } catch (Throwable $e) {
        error_log("handleClearCart error: " . $e->getMessage());
        jsonError('Error clearing cart', 500);
    }
}

/**
 * POST /api/v1/checkout (Checkout Preparation & Validation)
 */
function handleCheckoutValidation(): void {
    // 1. Enforce Store Status / Holiday Mode
    requireStoreOpenForOrders();

    $userToken = null;
    $authHeader = getBearerToken();
    if ($authHeader) {
        $userToken = verifyJwt($authHeader);
    }

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $customerId = $userToken['id'] ?? ($body['customerId'] ?? null);
    $sessionId  = $body['sessionId'] ?? null;

    try {
        $pdo = getDatabaseConnection();
        $cart = getOrCreateCart($pdo, $customerId, $sessionId);

        $stmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `cartitem` WHERE `cartId` = ?");
        $stmt->execute([$cart['id']]);
        $count = (int) $stmt->fetch()['cnt'];

        jsonResponse([
            'valid'       => true,
            'storeOpen'   => true,
            'cartId'      => $cart['id'],
            'itemsCount'  => $count,
            'message'     => 'Checkout validation successful'
        ], 200);

    } catch (Throwable $e) {
        error_log("handleCheckoutValidation error: " . $e->getMessage());
        jsonError('Checkout validation error', 500);
    }
}
