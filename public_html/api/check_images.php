<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config/db.php';

try {
    $pdo = getDatabaseConnection();
    $stmt = $pdo->query("SELECT id, title, mainImage, secondaryImage, editorialImage FROM product");
    $products = $stmt->fetchAll();

    $stmt2 = $pdo->query("SELECT id, productId, url FROM productimage");
    $productImages = $stmt2->fetchAll();

    echo json_encode([
        'products' => $products,
        'productImages' => $productImages
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
