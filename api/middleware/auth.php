<?php
/**
 * Floksy Jewel — Authentication & Authorization Middleware
 * Verifies JWT tokens and enforces role-based access control.
 */

require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../config/db.php';

function getBearerToken(): ?string {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } else if (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_change_key_case($requestHeaders, CASE_LOWER);
        if (isset($requestHeaders['authorization'])) {
            $headers = trim($requestHeaders['authorization']);
        }
    }

    if (!empty($headers) && preg_match('/Bearer\s(\S+)/i', $headers, $matches)) {
        return $matches[1];
    }
    return null;
}

function authenticateToken(): array {
    $token = getBearerToken();
    if (!$token) {
        jsonError('Authentication required', 401);
    }

    $decoded = verifyJwt($token);
    if (!$decoded) {
        jsonError('Invalid or expired token. Please sign in again.', 401);
    }

    return $decoded;
}

function requireRole(array $allowedRoles): array {
    $user = authenticateToken();
    $role = strtoupper($user['role'] ?? 'CUSTOMER');

    if ($role === 'SUPER_ADMIN' || $role === 'ADMIN') {
        return $user;
    }

    if (!in_array($role, $allowedRoles, true)) {
        jsonError('Access denied: insufficient permissions', 403);
    }

    return $user;
}

function requireBusinessAccess(?array $allowedRoles = null): array {
    $user = authenticateToken();
    $role = strtoupper($user['role'] ?? 'CUSTOMER');

    // Super Admin & Admin have full access
    if ($role === 'SUPER_ADMIN' || $role === 'ADMIN') {
        return $user;
    }

    if ($allowedRoles === null) {
        $allowedRoles = ['SALES_HR_MANAGER', 'SALES_MANAGER', 'SALES_EMPLOYEE', 'ACCOUNTANT'];
    }

    if (in_array($role, $allowedRoles, true)) {
        return $user;
    }

    jsonError('Access denied: insufficient permissions for business operations', 403);
}

function requireAdminOnly(): array {
    $user = authenticateToken();
    $role = strtoupper($user['role'] ?? 'CUSTOMER');

    if ($role === 'SUPER_ADMIN' || $role === 'ADMIN') {
        return $user;
    }

    jsonError('Access denied: Administrator privileges required', 403);
}

