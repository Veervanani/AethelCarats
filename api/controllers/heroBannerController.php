<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function ensureHeroBannersTableExists($db) {
    $sql = "CREATE TABLE IF NOT EXISTS hero_banners (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NULL,
        description TEXT NULL,
        primaryCtaText VARCHAR(100) NULL,
        primaryCtaLink VARCHAR(255) NULL,
        secondaryCtaText VARCHAR(100) NULL,
        secondaryCtaLink VARCHAR(255) NULL,
        productType VARCHAR(100) NOT NULL DEFAULT 'Engagement Ring',
        imagePath VARCHAR(500) NOT NULL,
        mobileImagePath VARCHAR(500) NULL,
        imageAlt VARCHAR(255) NULL,
        isActive TINYINT(1) NOT NULL DEFAULT 1,
        displayOrder INT NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $db->exec($sql);
}

function handleGetPublicHeroBanners() {
    try {
        $db = getDbConnection();
        ensureHeroBannersTableExists($db);

        $stmt = $db->prepare("SELECT * FROM hero_banners WHERE isActive = 1 ORDER BY displayOrder ASC");
        $stmt->execute();
        $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($banners)) {
            foreach ($banners as &$b) {
                $type = strtolower($b['productType'] ?? '');
                $title = strtolower($b['title'] ?? '');
                $img = strtolower($b['imagePath'] ?? '');
                $m = strtolower($b['mobileImagePath'] ?? '');

                if (str_contains($type, 'ring') || str_contains($title, 'ring') || str_contains($img, 'ring') || str_contains($m, 'ring')) {
                    $b['mobileImagePath'] = '/assets/floksy_hero_ring_mobile.png';
                } else if (str_contains($type, 'necklace') || str_contains($title, 'necklace') || str_contains($img, 'necklace') || str_contains($m, 'necklace')) {
                    $b['mobileImagePath'] = '/assets/floksy_hero_necklace_mobile.png';
                } else if (str_contains($type, 'earring') || str_contains($title, 'earring') || str_contains($img, 'earring') || str_contains($m, 'earring')) {
                    $b['mobileImagePath'] = '/assets/floksy_hero_earrings_mobile.png';
                } else if (str_contains($type, 'bracelet') || str_contains($title, 'bracelet') || str_contains($img, 'bracelet') || str_contains($m, 'bracelet')) {
                    $b['mobileImagePath'] = '/assets/floksy_bracelets_mobile.png';
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
            'imagePath' => '/assets/Engagement Ring.png',
            'mobileImagePath' => '/assets/floksy_hero_ring_mobile.png',
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
            'imagePath' => '/assets/Necklace.png',
            'mobileImagePath' => '/assets/floksy_hero_necklace_mobile.png',
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
            'imagePath' => '/assets/Earrings.png',
            'mobileImagePath' => '/assets/floksy_hero_earrings_mobile.png',
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
            'imagePath' => '/assets/Bracelet.png',
            'mobileImagePath' => '/assets/floksy_bracelets_mobile.png',
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
    ensureHeroBannersTableExists($db);

    $stmt = $db->prepare("SELECT * FROM hero_banners ORDER BY displayOrder ASC");
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

    $uploadDir = __DIR__ . '/../../uploads/hero-banners/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $safeName = $prefix . '_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . ($ext ?: 'jpg');
    $targetPath = $uploadDir . $safeName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return '/uploads/hero-banners/' . $safeName;
    }

    return null;
}

function handleCreateHeroBanner() {
    requireAdminToken();
    $db = getDbConnection();
    ensureHeroBannersTableExists($db);

    $title = $_POST['title'] ?? 'Timeless Luxury Fine Jewellery';
    $subtitle = $_POST['subtitle'] ?? 'FLOKSY JEWEL ATELIER';
    $description = $_POST['description'] ?? '';
    $primaryCtaText = $_POST['primaryCtaText'] ?? 'EXPLORE COLLECTION';
    $primaryCtaLink = $_POST['primaryCtaLink'] ?? '/rings';
    $secondaryCtaText = $_POST['secondaryCtaText'] ?? '';
    $secondaryCtaLink = $_POST['secondaryCtaLink'] ?? '';
    $productType = $_POST['productType'] ?? 'Engagement Ring';
    $imageAlt = $_POST['imageAlt'] ?? $title;
    $isActive = isset($_POST['isActive']) ? (($_POST['isActive'] === 'true' || $_POST['isActive'] === '1' || $_POST['isActive'] === true) ? 1 : 0) : 1;

    $imagePath = handleSaveUploadedFile('desktopImage', 'desktop') ?? ($_POST['imagePath'] ?? '');
    $mobileImagePath = handleSaveUploadedFile('mobileImage', 'mobile') ?? ($_POST['mobileImagePath'] ?? null);

    if (empty($imagePath)) {
        sendJsonResponse(400, ['message' => 'Desktop hero image is required']);
        return;
    }

    $countStmt = $db->query("SELECT COUNT(*) FROM hero_banners");
    $displayOrder = isset($_POST['displayOrder']) ? (int)$_POST['displayOrder'] : ((int)$countStmt->fetchColumn() + 1);

    $id = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );

    $stmt = $db->prepare("INSERT INTO hero_banners (id, title, subtitle, description, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, productType, imagePath, mobileImagePath, imageAlt, isActive, displayOrder)
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

    $fetch = $db->prepare("SELECT * FROM hero_banners WHERE id = ?");
    $fetch->execute([$id]);
    sendJsonResponse(201, $fetch->fetch(PDO::FETCH_ASSOC));
}

function handleUpdateHeroBanner($id) {
    requireAdminToken();
    $db = getDbConnection();
    ensureHeroBannersTableExists($db);

    $stmt = $db->prepare("SELECT * FROM hero_banners WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existing) {
        sendJsonResponse(404, ['message' => 'Hero banner not found']);
        return;
    }

    $title = $_POST['title'] ?? $existing['title'];
    $subtitle = $_POST['subtitle'] ?? $existing['subtitle'];
    $description = $_POST['description'] ?? $existing['description'];
    $primaryCtaText = $_POST['primaryCtaText'] ?? $existing['primaryCtaText'];
    $primaryCtaLink = $_POST['primaryCtaLink'] ?? $existing['primaryCtaLink'];
    $secondaryCtaText = $_POST['secondaryCtaText'] ?? $existing['secondaryCtaText'];
    $secondaryCtaLink = $_POST['secondaryCtaLink'] ?? $existing['secondaryCtaLink'];
    $productType = $_POST['productType'] ?? $existing['productType'];
    $imageAlt = $_POST['imageAlt'] ?? $existing['imageAlt'];
    $isActive = isset($_POST['isActive']) ? (($_POST['isActive'] === 'true' || $_POST['isActive'] === '1' || $_POST['isActive'] === true) ? 1 : 0) : $existing['isActive'];
    $displayOrder = isset($_POST['displayOrder']) ? (int)$_POST['displayOrder'] : $existing['displayOrder'];

    $imagePath = handleSaveUploadedFile('desktopImage', 'desktop') ?? ($_POST['imagePath'] ?? $existing['imagePath']);
    $mobileImagePath = handleSaveUploadedFile('mobileImage', 'mobile') ?? ($_POST['mobileImagePath'] ?? $existing['mobileImagePath']);

    $update = $db->prepare("UPDATE hero_banners SET title = :title, subtitle = :subtitle, description = :description, primaryCtaText = :pText, primaryCtaLink = :pLink, secondaryCtaText = :sText, secondaryCtaLink = :sLink, productType = :type, imagePath = :img, mobileImagePath = :mImg, imageAlt = :alt, isActive = :active, displayOrder = :order WHERE id = :id");

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

    $stmt->execute([$id]);
    sendJsonResponse(200, $stmt->fetch(PDO::FETCH_ASSOC));
}

function handleDeleteHeroBanner($id) {
    requireAdminToken();
    $db = getDbConnection();
    ensureHeroBannersTableExists($db);

    $stmt = $db->prepare("DELETE FROM hero_banners WHERE id = ?");
    $stmt->execute([$id]);

    sendJsonResponse(200, ['message' => 'Hero banner deleted successfully']);
}

function handleReorderHeroBanners() {
    requireAdminToken();
    $db = getDbConnection();
    ensureHeroBannersTableExists($db);

    $input = json_decode(file_get_contents('php://input'), true);
    $orderedIds = $input['orderedIds'] ?? [];

    if (!is_array($orderedIds)) {
        sendJsonResponse(400, ['message' => 'orderedIds array is required']);
        return;
    }

    $stmt = $db->prepare("UPDATE hero_banners SET displayOrder = ? WHERE id = ?");
    foreach ($orderedIds as $index => $id) {
        $stmt->execute([$index + 1, $id]);
    }

    sendJsonResponse(200, ['message' => 'Hero banners reordered successfully']);
}
