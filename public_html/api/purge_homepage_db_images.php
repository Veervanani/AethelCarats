<?php
require_once __DIR__ . '/config/db.php';

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

try {
    $db = getDbConnection();

    // 1. Truncate all image tables
    $db->exec("TRUNCATE TABLE `HeroBanner`");
    $db->exec("TRUNCATE TABLE `Media`");
    $db->exec("TRUNCATE TABLE `ProductImage`");

    // 2. Clear image fields from all content tables
    $db->exec("UPDATE `Product` SET `mainImage` = NULL, `secondaryImage` = NULL");
    $db->exec("UPDATE `Category` SET `image` = NULL, `bannerImage` = NULL");
    $db->exec("UPDATE `MegaMenuCard` SET `imageUrl` = NULL");
    $db->exec("UPDATE `Promotion` SET `imageUrl` = NULL");
    $db->exec("UPDATE `ProductPageContent` SET `craftsmanshipImage` = NULL, `packagingImageUrl` = NULL");
    $db->exec("DELETE FROM `SiteSetting` WHERE `key` = 'homepage_config' OR `key` LIKE '%hero%' OR `key` LIKE '%banner%' OR `key` LIKE '%image%' OR `value` LIKE '%uploads/%' OR `value` LIKE '%.png%' OR `value` LIKE '%.jpg%'");

    // 2b. Clean image fields inside PageSection JSON content
    $sections = $db->query("SELECT `id`, `content` FROM `PageSection`")->fetchAll(PDO::FETCH_ASSOC);
    $updateStmt = $db->prepare("UPDATE `PageSection` SET `content` = ? WHERE `id` = ?");
    foreach ($sections as $s) {
        $c = json_decode($s['content'], true);
        if (is_array($c)) {
            $changed = false;
            $imgKeys = ['desktopImage', 'tabletImage', 'mobileImage', 'image', 'leftImage', 'rightImage', 'craftsmanshipImage', 'packagingImageUrl'];
            foreach ($imgKeys as $k) {
                if (isset($c[$k]) && $c[$k] !== '') {
                    $c[$k] = '';
                    $changed = true;
                }
            }
            if ($changed) {
                $updateStmt->execute([json_encode($c), $s['id']]);
            }
        }
    }

    // 3. Delete physical files from all candidate upload directories on Hostinger disk
    $deletedFiles = 0;
    $candidateDirs = [
        __DIR__ . '/../uploads/media',
        __DIR__ . '/../uploads/hero-banners',
        __DIR__ . '/../uploads',
        __DIR__ . '/../public_html/uploads/media',
        __DIR__ . '/../public_html/uploads/hero-banners',
        __DIR__ . '/../public_html/uploads',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/uploads/media',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/uploads/hero-banners',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/uploads',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/public_html/uploads/media',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/public_html/uploads/hero-banners',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/public_html/uploads',
    ];

    foreach ($candidateDirs as $dir) {
        if (!empty($dir) && is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $f) {
                if ($f === '.' || $f === '..') continue;
                $p = $dir . '/' . $f;
                if (is_file($p)) {
                    @unlink($p);
                    $deletedFiles++;
                }
            }
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'All database images and physical disk uploads permanently purged.',
        'deletedDiskFiles' => $deletedFiles,
    ]);
} catch (Throwable $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error purging images: ' . $e->getMessage()
    ]);
}
