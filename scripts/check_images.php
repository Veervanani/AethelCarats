<?php
require_once __DIR__ . '/../api/config/db.php';

try {
    $pdo = getDatabaseConnection();
    echo "Product Main Images:\n";
    $stmt = $pdo->query("SELECT id, title, mainImage, secondaryImage, editorialImage FROM product WHERE mainImage LIKE '%floksy%' OR secondaryImage LIKE '%floksy%' OR editorialImage LIKE '%floksy%'");
    $rows = $stmt->fetchAll();
    foreach ($rows as $r) {
        echo "ID: {$r['id']} | Title: {$r['title']}\n";
        echo "  mainImage: {$r['mainImage']}\n";
        echo "  secondaryImage: {$r['secondaryImage']}\n";
        echo "  editorialImage: {$r['editorialImage']}\n\n";
    }

    echo "ProductImage table:\n";
    $stmt2 = $pdo->query("SELECT id, productId, url FROM productimage WHERE url LIKE '%floksy%' OR url LIKE '%editorial%' OR url LIKE '%solitaire%'");
    $rows2 = $stmt2->fetchAll();
    foreach ($rows2 as $r) {
        echo "ID: {$r['id']} | ProdID: {$r['productId']} | URL: {$r['url']}\n";
    }

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
