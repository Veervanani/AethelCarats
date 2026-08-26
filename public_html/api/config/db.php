<?php
/**
 * Floksy Jewel — PDO Database Connection Helper
 * Reads connection settings safely from environment variables.
 * Safe, prepared-statement enabled PDO configuration for Hostinger MySQL.
 */

function getDatabaseConnection(): PDO {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? '127.0.0.1');
    $port = getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? '3306');
    $db   = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'u657751653_floksyjewel');
    $user = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'u657751653_floksyjewels');
    $pass = getenv('DB_PASSWORD') !== false ? getenv('DB_PASSWORD') : (getenv('DB_PASS') ?: ($_ENV['DB_PASSWORD'] ?? 'FloksyJewel@2026!'));

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $connectionProfiles = [
        ['dsn' => "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4", 'user' => $user, 'pass' => $pass],
        ['dsn' => "mysql:host=127.0.0.1;port={$port};dbname={$db};charset=utf8mb4", 'user' => $user, 'pass' => $pass],
        ['dsn' => "mysql:host=localhost;port={$port};dbname={$db};charset=utf8mb4", 'user' => $user, 'pass' => $pass],
        // Local Dev Fallbacks (XAMPP / WAMP / Local MySQL)
        ['dsn' => "mysql:host=127.0.0.1;port=3306;dbname=floksyjewel;charset=utf8mb4", 'user' => 'root', 'pass' => ''],
        ['dsn' => "mysql:host=localhost;port=3306;dbname=floksyjewel;charset=utf8mb4", 'user' => 'root', 'pass' => ''],
        ['dsn' => "mysql:host=127.0.0.1;port=3306;dbname=floksyjewel;charset=utf8mb4", 'user' => 'root', 'pass' => 'root'],
    ];

    $lastError = null;
    foreach ($connectionProfiles as $profile) {
        try {
            $pdo = new PDO($profile['dsn'], $profile['user'], $profile['pass'], $options);
            return $pdo;
        } catch (PDOException $e) {
            $lastError = $e->getMessage();
        }
    }

    error_log("PDO Connection Failure: " . $lastError);
    throw new Exception("Database connection failed: " . $lastError);
}

if (!function_exists('getDbConnection')) {
    function getDbConnection(): PDO {
        return getDatabaseConnection();
    }
}
