<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function getHeroBannerTableName($db) {
    try {
        $chk = $db->query("SHOW TABLES LIKE 'HeroBanner'")->fetch();
        if ($chk) return '`HeroBanner`';
        $chk2 = $db->query("SHOW TABLES LIKE 'hero_banners'")->fetch();
        if ($chk2) return '`hero_banners`';
    } catch (Throwable $e) {}

    try {
        $db->exec("CREATE TABLE IF NOT EXISTS `HeroBanner` (
            `id` VARCHAR(191) NOT NULL PRIMARY KEY,
            `title` VARCHAR(191) NOT NULL,
            `subtitle` VARCHAR(191) NULL,
            `description` LONGTEXT NULL,
            `primaryCtaText` VARCHAR(191) NULL,
            `primaryCtaLink` VARCHAR(191) NULL,
            `secondaryCtaText` VARCHAR(191) NULL,
            `secondaryCtaLink` VARCHAR(191) NULL,
            `productType` VARCHAR(191) NOT NULL DEFAULT 'Engagement Ring',
            `imagePath` VARCHAR(500) NOT NULL,
            `mobileImagePath` VARCHAR(500) NULL,
            `imageAlt` VARCHAR(255) NULL,
            `isActive` TINYINT(1) NOT NULL DEFAULT 1,
            `displayOrder` INT NOT NULL DEFAULT 0,
            `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
        return '`HeroBanner`';
    } catch (Throwable $e) {
        return '`hero_banners`';
    }
}

function handleGetPublicHeroBanners() {
    try {
        $db = getDbConnection();
        $table = getHeroBannerTableName($db);

        $stmt = $db->prepare("SELECT * FROM {$table} WHERE isActive = 1 ORDER BY displayOrder ASC");
        $stmt->execute();
        $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($banners)) {
            foreach ($banners as &$b) {
                if (!empty($b['imagePath'])) {
                    if (str_contains($b['imagePath'], 'Engagement Ring.png')) $b['imagePath'] = '/assets/gem_rings_cat.png';
                    else if (str_contains($b['imagePath'], 'Necklace.png')) $b['imagePath'] = '/assets/gem_necklaces_cat.png';
                    else if (str_contains($b['imagePath'], 'Earrings.png')) $b['imagePath'] = '/assets/gem_earrings_cat.png';
                    else if (str_contains($b['imagePath'], 'Bracelet.png')) $b['imagePath'] = '/assets/gem_bracelets_cat.png';
                }
                if (!empty($b['mobileImagePath'])) {
                    if (str_contains($b['mobileImagePath'], 'Ring Mobile.png')) $b['mobileImagePath'] = '/assets/gem_rings_cat.png';
                    else if (str_contains($b['mobileImagePath'], 'Necklace Mobile.png')) $b['mobileImagePath'] = '/assets/gem_necklaces_cat.png';
                    else if (str_contains($b['mobileImagePath'], 'Earrings Mobile.png')) $b['mobileImagePath'] = '/assets/gem_earrings_cat.png';
                    else if (str_contains($b['mobileImagePath'], 'Bracelet Mobile.png')) $b['mobileImagePath'] = '/assets/gem_bracelets_cat.png';
                }
            }
            sendJsonResponse(200, $banners);
            return;
        }
    } catch (Throwable $e) {
        error_log("handleGetPublicHeroBanners error: " . $e->getMessage());
    }

    $defaultSlides = [
        [
            'id' => 'hero-slide-1',
            'title' => "Handcrafted\nElegance &\nExceptional\nDiamonds",
            'subtitle' => 'THE SIGNATURE COLLECTION 2026',
            'description' => 'Immerse yourself in world-class craftsmanship, exceptional diamonds, and timeless bespoke creations.',
            'primaryCtaText' => 'EXPLORE RINGS',
            'primaryCtaLink' => '/rings',
            'secondaryCtaText' => 'THE DIAMOND VAULT →',
            'secondaryCtaLink' => '/diamonds',
            'productType' => 'Engagement Ring',
            'imagePath' => '/assets/gem_rings_cat.png',
            'mobileImagePath' => '/assets/gem_rings_cat.png',
            'imageAlt' => 'Handcrafted Solitaire Diamond Engagement Ring',
            'isActive' => 1,
            'displayOrder' => 1
        ],
        [
            'id' => 'hero-slide-2',
            'title' => "Timeless\nDiamonds,\nRefined\nForever",
            'subtitle' => 'THE ART OF HIGH JEWELRY',
            'description' => 'Discover exquisite diamond necklaces crafted with precision, elegance, and an uncompromising eye for detail.',
            'primaryCtaText' => 'EXPLORE NECKLACES',
            'primaryCtaLink' => '/necklaces',
            'secondaryCtaText' => 'VIEW COLLECTION →',
            'secondaryCtaLink' => '/collections/signature-collection',
            'productType' => 'Necklace',
            'imagePath' => '/assets/gem_necklaces_cat.png',
            'mobileImagePath' => '/assets/gem_necklaces_cat.png',
            'imageAlt' => 'Haute Joaillerie Diamond Necklace',
            'isActive' => 1,
            'displayOrder' => 2
        ],
        [
            'id' => 'hero-slide-3',
            'title' => "Brilliance\nDesigned to\nBe Remembered",
            'subtitle' => 'THE SIGNATURE COLLECTION',
            'description' => 'Exceptional diamond earrings, thoughtfully crafted to bring understated brilliance to every occasion.',
            'primaryCtaText' => 'EXPLORE EARRINGS',
            'primaryCtaLink' => '/earrings',
            'secondaryCtaText' => 'DISCOVER DIAMONDS →',
            'secondaryCtaLink' => '/diamonds',
            'productType' => 'Earrings',
            'imagePath' => '/assets/gem_earrings_cat.png',
            'mobileImagePath' => '/assets/gem_earrings_cat.png',
            'imageAlt' => 'Brilliant Diamond Earrings',
            'isActive' => 1,
            'displayOrder' => 3
        ],
        [
            'id' => 'hero-slide-4',
            'title' => "Exceptional\nCraftsmanship,\nWorn Forever",
            'subtitle' => 'BESPOKE DIAMOND JEWELRY',
            'description' => 'Discover refined diamond bracelets created with precision, timeless design, and exceptional craftsmanship.',
            'primaryCtaText' => 'EXPLORE BRACELETS',
            'primaryCtaLink' => '/bracelets',
            'secondaryCtaText' => 'CREATE YOUR OWN →',
            'secondaryCtaLink' => '/custom-jewellery',
            'productType' => 'Bracelet',
            'imagePath' => '/assets/gem_bracelets_cat.png',
            'mobileImagePath' => '/assets/gem_bracelets_cat.png',
            'imageAlt' => 'Bespoke Diamond Bracelet',
            'isActive' => 1,
            'displayOrder' => 4
        ]
    ];

    sendJsonResponse(200, $defaultSlides);
}

function handleGetAdminHeroBanners() {
    requireAdminToken();
    $db = getDbConnection();
    $table = getHeroBannerTableName($db);

    $stmt = $db->prepare("SELECT * FROM {$table} ORDER BY displayOrder ASC");
    $stmt->execute();
    $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendJsonResponse(200, $banners);
}

function handleSaveUploadedFile($fileKey, $prefix = 'hero') {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $file = $_FILES[$fileKey];
    $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExts = ['jpg', 'jpeg', 'png', 'webp'];

    if (!in_array($mime, $allowedMimes) && !in_array($ext, $allowedExts)) {
        sendJsonResponse(400, ['message' => 'Invalid image format. Supported formats: JPG, JPEG, PNG, WEBP.']);
        exit;
    }

    if ($file['size'] > 25 * 1024 * 1024) {
        sendJsonResponse(400, ['message' => 'File size exceeds 25MB limit.']);
        exit;
    }

    $targetDirs = [
        __DIR__ . '/../../uploads/hero-banners/',
        __DIR__ . '/../../../public_html/uploads/hero-banners/',
    ];

    $safeName = $prefix . '_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . ($ext ?: 'jpg');
    $saved = false;

    foreach ($targetDirs as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
        $targetPath = $dir . $safeName;
        if (!$saved) {
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                $saved = true;
            }
        } else {
            @copy($targetDirs[0] . $safeName, $targetPath);
        }
    }

    if ($saved) {
        return '/uploads/hero-banners/' . $safeName;
    }

    return null;
}

function handleUploadHeroBannerImage() {
    requireAdminToken();
    $fileKey = isset($_FILES['file']) ? 'file' : (isset($_FILES['files']) ? 'files' : (isset($_FILES['desktopImage']) ? 'desktopImage' : 'mobileImage'));
    $path = handleSaveUploadedFile($fileKey, 'hero_img');
    if (!$path) {
        sendJsonResponse(400, ['message' => 'No valid image file uploaded']);
        return;
    }
    sendJsonResponse(200, ['url' => $path, 'path' => $path]);
}

function handleCreateHeroBanner() {
    requireAdminToken();
    $db = getDbConnection();
    $table = getHeroBannerTableName($db);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $title = $body['title'] ?? 'Timeless Luxury Fine Jewellery';
    $subtitle = $body['subtitle'] ?? 'AETHELCARATS HAUTE JOAILLERIE';
    $description = $body['description'] ?? '';
    $primaryCtaText = $body['primaryCtaText'] ?? 'EXPLORE COLLECTION';
    $primaryCtaLink = $body['primaryCtaLink'] ?? '/rings';
    $secondaryCtaText = $body['secondaryCtaText'] ?? '';
    $secondaryCtaLink = $body['secondaryCtaLink'] ?? '';
    $productType = $body['productType'] ?? 'Engagement Ring';
    $imageAlt = $body['imageAlt'] ?? $title;
    $isActive = isset($body['isActive']) ? (($body['isActive'] === 'true' || $body['isActive'] === '1' || $body['isActive'] === 1 || $body['isActive'] === true) ? 1 : 0) : 1;

    $imagePath = handleSaveUploadedFile('desktopImage', 'desktop') ?? ($body['imagePath'] ?? '');
    $mobileImagePath = handleSaveUploadedFile('mobileImage', 'mobile') ?? ($body['mobileImagePath'] ?? null);

    if (empty($imagePath)) {
        sendJsonResponse(400, ['message' => 'Desktop hero image is required']);
        return;
    }

    $countStmt = $db->query("SELECT COUNT(*) FROM {$table}");
    $displayOrder = isset($body['displayOrder']) ? (int)$body['displayOrder'] : ((int)$countStmt->fetchColumn() + 1);

    $id = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );

    $stmt = $db->prepare("INSERT INTO {$table} (id, title, subtitle, description, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, productType, imagePath, mobileImagePath, imageAlt, isActive, displayOrder)
        VALUES (:id, :title, :subtitle, :description, :pText, :pLink, :sText, :sLink, :type, :img, :mImg, :alt, :active, :order)");
    
    $stmt->execute([
        ':id' => $id,
        ':title' => $title,
        ':subtitle' => $subtitle,
        ':description' => $description,
        ':pText' => $primaryCtaText,
        ':pLink' => $primaryCtaLink,
        ':sText' => $secondaryCtaText,
        ':sLink' => $secondaryCtaLink,
        ':type' => $productType,
        ':img' => $imagePath,
        ':mImg' => $mobileImagePath,
        ':alt' => $imageAlt,
        ':active' => $isActive,
        ':order' => $displayOrder
    ]);

    $fetch = $db->prepare("SELECT * FROM {$table} WHERE id = ?");
    $fetch->execute([$id]);
    sendJsonResponse(201, $fetch->fetch(PDO::FETCH_ASSOC));
}

function handleUpdateHeroBanner($id) {
    requireAdminToken();
    $db = getDbConnection();
    $table = getHeroBannerTableName($db);

    $stmt = $db->prepare("SELECT * FROM {$table} WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existing) {
        sendJsonResponse(404, ['message' => 'Hero banner not found']);
        return;
    }

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $title = $body['title'] ?? $existing['title'];
    $subtitle = $body['subtitle'] ?? $existing['subtitle'];
    $description = $body['description'] ?? $existing['description'];
    $primaryCtaText = $body['primaryCtaText'] ?? $existing['primaryCtaText'];
    $primaryCtaLink = $body['primaryCtaLink'] ?? $existing['primaryCtaLink'];
    $secondaryCtaText = $body['secondaryCtaText'] ?? $existing['secondaryCtaText'];
    $secondaryCtaLink = $body['secondaryCtaLink'] ?? $existing['secondaryCtaLink'];
    $productType = $body['productType'] ?? $existing['productType'];
    $imageAlt = $body['imageAlt'] ?? $existing['imageAlt'];
    $isActive = isset($body['isActive']) ? (($body['isActive'] === 'true' || $body['isActive'] === '1' || $body['isActive'] === 1 || $body['isActive'] === true) ? 1 : 0) : $existing['isActive'];
    $displayOrder = isset($body['displayOrder']) ? (int)$body['displayOrder'] : $existing['displayOrder'];

    $uploadedDesktop = handleSaveUploadedFile('desktopImage', 'desktop');
    $uploadedMobile = handleSaveUploadedFile('mobileImage', 'mobile');

    $imagePath = $uploadedDesktop ?? ($body['imagePath'] ?? $existing['imagePath']);
    $mobileImagePath = $uploadedMobile ?? ($body['mobileImagePath'] ?? $existing['mobileImagePath']);

    $update = $db->prepare("UPDATE {$table} SET title = :title, subtitle = :subtitle, description = :description, primaryCtaText = :pText, primaryCtaLink = :pLink, secondaryCtaText = :sText, secondaryCtaLink = :sLink, productType = :type, imagePath = :img, mobileImagePath = :mImg, imageAlt = :alt, isActive = :active, displayOrder = :order WHERE id = :id");

    $update->execute([
        ':title' => $title,
        ':subtitle' => $subtitle,
        ':description' => $description,
        ':pText' => $primaryCtaText,
        ':pLink' => $primaryCtaLink,
        ':sText' => $secondaryCtaText,
        ':sLink' => $secondaryCtaLink,
        ':type' => $productType,
        ':img' => $imagePath,
        ':mImg' => $mobileImagePath,
        ':alt' => $imageAlt,
        ':active' => $isActive,
        ':order' => $displayOrder,
        ':id' => $id
    ]);

    $fetch = $db->prepare("SELECT * FROM {$table} WHERE id = ?");
    $fetch->execute([$id]);
    sendJsonResponse(200, $fetch->fetch(PDO::FETCH_ASSOC));
}

function handleDeleteHeroBanner($id) {
    requireAdminToken();
    $db = getDbConnection();
    $table = getHeroBannerTableName($db);

    $stmt = $db->prepare("DELETE FROM {$table} WHERE id = ?");
    $stmt->execute([$id]);

    sendJsonResponse(200, ['message' => 'Hero banner deleted successfully', 'deletedId' => $id]);
}

function handleReorderHeroBanners() {
    requireAdminToken();
    $db = getDbConnection();
    $table = getHeroBannerTableName($db);

    $input = json_decode(file_get_contents('php://input'), true);
    $orderedIds = $input['orderedIds'] ?? [];

    if (!is_array($orderedIds)) {
        sendJsonResponse(400, ['message' => 'orderedIds array is required']);
        return;
    }

    $stmt = $db->prepare("UPDATE {$table} SET displayOrder = ? WHERE id = ?");
    foreach ($orderedIds as $index => $id) {
        $stmt->execute([$index + 1, $id]);
    }

    sendJsonResponse(200, ['message' => 'Hero banners reordered successfully']);
}
