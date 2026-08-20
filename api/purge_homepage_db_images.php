<?php
require_once __DIR__ . '/config/db.php';

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

try {
    $db = getDbConnection();

    // 1. Clear all rows from hero_banners table
    $db->exec("TRUNCATE TABLE hero_banners");

    // 2. Clear homepage image settings in sitesetting table
    $db->exec("DELETE FROM sitesetting WHERE `key` LIKE '%hero%' OR `key` LIKE '%banner%' OR `key` LIKE '%homepage%' OR `key` LIKE '%image%'");

    echo json_encode([
        'status' => 'success',
        'message' => 'All homepage database image records cleared successfully from MySQL database.'
    ]);
} catch (Throwable $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error clearing database image records: ' . $e->getMessage()
    ]);
}
