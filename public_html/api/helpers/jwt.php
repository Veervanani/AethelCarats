<?php
/**
 * Floksy Jewel — Lightweight HS256 JWT Implementation
 * Fully compatible with jsonwebtoken (Express JS).
 */

function base64UrlEncode(string $data): string {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function base64UrlDecode(string $data): string {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
}

function createJwt(array $payload, ?string $secret = null, int $expiresInSeconds = 604800): string {
    $jwtSecret = $secret ?: getenv('JWT_SECRET') ?: ($_ENV['JWT_SECRET'] ?? 'floksy_jewel_super_secret_jwt_key_2026');

    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT'
    ];

    $now = time();
    $payload['iat'] = $now;
    if (!isset($payload['exp'])) {
        $payload['exp'] = $now + $expiresInSeconds;
    }

    $encodedHeader  = base64UrlEncode(json_encode($header));
    $encodedPayload = base64UrlEncode(json_encode($payload));

    $signatureData = "{$encodedHeader}.{$encodedPayload}";
    $signature     = hash_hmac('sha256', $signatureData, $jwtSecret, true);
    $encodedSig    = base64UrlEncode($signature);

    return "{$encodedHeader}.{$encodedPayload}.{$encodedSig}";
}

function verifyJwt(string $token, ?string $secret = null): ?array {
    $jwtSecret = $secret ?: getenv('JWT_SECRET') ?: ($_ENV['JWT_SECRET'] ?? 'floksy_jewel_super_secret_jwt_key_2026');

    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    list($encodedHeader, $encodedPayload, $encodedSig) = $parts;

    $signatureData = "{$encodedHeader}.{$encodedPayload}";
    $expectedSig   = base64UrlEncode(hash_hmac('sha256', $signatureData, $jwtSecret, true));

    if (!hash_equals($expectedSig, $encodedSig)) {
        return null;
    }

    $payloadJson = base64UrlDecode($encodedPayload);
    $payload     = json_decode($payloadJson, true);

    if (!is_array($payload)) {
        return null;
    }

    if (isset($payload['exp']) && time() >= $payload['exp']) {
        return null;
    }

    return $payload;
}
