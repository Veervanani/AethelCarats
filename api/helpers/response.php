<?php
/**
 * Aura Diamond Atelier — Response Helper
 * Provides standardized JSON response formatting and HTTP status codes.
 */

function utf8ize(mixed $mixed): mixed {
    if (is_string($mixed)) {
        return mb_convert_encoding($mixed, 'UTF-8', 'UTF-8');
    }
    if (is_array($mixed)) {
        foreach ($mixed as $key => $value) {
            $mixed[$key] = utf8ize($value);
        }
    }
    return $mixed;
}

function jsonResponse(mixed $data, int $statusCode = 200): void {
    if (!headers_sent()) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
    }
    $encoded = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    if ($encoded === false) {
        $encoded = json_encode(utf8ize($data), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
    echo $encoded;
    exit;
}

function jsonError(string $message, int $statusCode = 500, mixed $details = null): void {
    $payload = ['error' => $message];
    if ($details !== null) {
        $payload['details'] = $details;
    }
    jsonResponse($payload, $statusCode);
}

if (!function_exists('sendJsonResponse')) {
    function sendJsonResponse(int $statusCode, mixed $data): void {
        jsonResponse($data, $statusCode);
    }
}
