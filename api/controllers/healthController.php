<?php
/**
 * Floksy Jewel — Health Controller
 * Real-Time Database Connection & Health Diagnostic Endpoint
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/response.php';

function handleHealthCheck(): void {
    try {
        $pdo = getDatabaseConnection();

        // Safe, harmless read-only count queries
        $userStmt = $pdo->query("SELECT COUNT(*) as count FROM `user`");
        $userCount = (int) $userStmt->fetch()['count'];

        $diamondStmt = $pdo->query("SELECT COUNT(*) as count FROM `diamond`");
        $diamondCount = (int) $diamondStmt->fetch()['count'];

        $productStmt = $pdo->query("SELECT COUNT(*) as count FROM `product`");
        $productCount = (int) $productStmt->fetch()['count'];

        $dbName = $pdo->query("SELECT DATABASE()")->fetchColumn() ?: 'u657751653_floksyjewel';
        $tableStmt = $pdo->prepare("SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?");
        $tableStmt->execute([$dbName]);
        $tableCount = (int) $tableStmt->fetch()['count'];

        jsonResponse([
            'status'       => 'ok',
            'database'     => 'connected',
            'engine'       => 'PHP 8.3 / PDO MySQL',
            'host'         => getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? '127.0.0.1'),
            'databaseName' => $dbName,
            'tableCount'   => $tableCount,
            'userCount'    => $userCount,
            'diamondCount' => $diamondCount,
            'productCount' => $productCount,
            'timestamp'    => date('c')
        ], 200);

    } catch (Throwable $e) {
        error_log("Health Check Failed: " . $e->getMessage());
        jsonResponse([
            'status'    => 'error',
            'database'  => 'disconnected',
            'error'     => $e->getMessage(),
            'timestamp' => date('c')
        ], 500);
    }
}
