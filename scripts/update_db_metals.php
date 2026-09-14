<?php
require_once 'D:/AethelCarats/api/config/db.php';
require_once 'D:/AethelCarats/api/controllers/productController.php';

try {
    $pdo = getDatabaseConnection();
    $stmt = $pdo->query("SELECT id, name, slug, metalsConfig, variationsJson FROM Product");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Found " . count($products) . " products to process.\n";

    $updateStmt = $pdo->prepare("UPDATE Product SET metalsConfig = :metalsConfig, variationsJson = :variationsJson WHERE id = :id");

    foreach ($products as $p) {
        $pId = $p['id'];
        $pName = $p['name'] ?? $p['slug'];
        echo "Processing: {$pName} (ID: {$pId})\n";

        $metals = json_decode($p['metalsConfig'] ?? '[]', true);
        if (is_array($metals) && count($metals) > 0) {
            usort($metals, function($a, $b) {
                $lblA = is_array($a) ? ($a['label'] ?? $a['name'] ?? '') : (string)$a;
                $lblB = is_array($b) ? ($b['label'] ?? $b['name'] ?? '') : (string)$b;
                return getMetalSortRankPhp($lblA) - getMetalSortRankPhp($lblB);
            });
            $newMetalsJson = json_encode($metals, JSON_UNESCAPED_SLASHES);
        } else {
            $newMetalsJson = $p['metalsConfig'];
        }

        $vars = json_decode($p['variationsJson'] ?? '[]', true);
        if (is_array($vars) && count($vars) > 0) {
            usort($vars, function($a, $b) {
                $lblA = is_array($a) ? ($a['metal'] ?? '') : '';
                $lblB = is_array($b) ? ($b['metal'] ?? '') : '';
                return getMetalSortRankPhp($lblA) - getMetalSortRankPhp($lblB);
            });
            $newVarsJson = json_encode($vars, JSON_UNESCAPED_SLASHES);
        } else {
            $newVarsJson = $p['variationsJson'];
        }

        $updateStmt->execute([
            ':metalsConfig' => $newMetalsJson,
            ':variationsJson' => $newVarsJson,
            ':id' => $pId
        ]);

        echo "Updated {$pName} metalsConfig order:\n";
        foreach ($metals as $idx => $m) {
            $lbl = $m['label'] ?? $m['name'] ?? $m;
            echo "  " . ($idx + 1) . ". {$lbl}\n";
        }
    }

    echo "\nAll products in database updated successfully!\n";
} catch (Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
