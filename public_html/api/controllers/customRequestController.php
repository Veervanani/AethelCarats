<?php
/**
 * Aura Diamond Atelier — Custom Requests, Custom CAD & File Attachments Controller
 * Migrated from Node.js (customRequestController.ts) to PHP 8.3 / PDO MySQL
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function generateUuidV4Custom(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

/**
 * POST /api/v1/custom-requests
 */
function handleCreateCustomRequest(): void {
    requireStoreOpenForOrders();

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;

    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $whatsapp = $data['whatsapp'] ?? null;
    $jewelleryType = $data['jewelleryType'] ?? null;
    $description = $data['description'] ?? null;

    if (!$name || !$email || !$jewelleryType || !$description) {
        jsonError('Name, email, jewelleryType, and description are required', 400);
    }

    try {
        $pdo = getDatabaseConnection();
        $reqNum = "REQ-2026-" . rand(1000, 9999);
        $reqId = generateUuidV4Custom();

        $ins = $pdo->prepare("
            INSERT INTO `CustomRequest` (`id`, `requestNumber`, `name`, `email`, `whatsapp`, `jewelleryType`, `metal`, `diamondPreference`, `budget`, `deadline`, `description`, `status`, `createdAt`, `updatedAt`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', NOW(), NOW())
        ");
        $ins->execute([
            $reqId, $reqNum, $name, $email, $whatsapp, $jewelleryType,
            $data['metal'] ?? null, $data['diamondPreference'] ?? null,
            $data['budget'] ?? null, $data['deadline'] ?? null, $description
        ]);

        // Insert initial timeline entry
        $insTime = $pdo->prepare("
            INSERT INTO `CustomRequestTimeline` (`id`, `customRequestId`, `status`, `note`, `createdAt`)
            VALUES (?, ?, 'NEW', 'Custom request submitted by client', NOW())
        ");
        $insTime->execute([generateUuidV4Custom(), $reqId]);

        jsonResponse([
            'id'            => $reqId,
            'requestNumber' => $reqNum,
            'name'          => $name,
            'email'         => $email,
            'jewelleryType' => $jewelleryType,
            'status'        => 'NEW'
        ], 201);

    } catch (Throwable $e) {
        error_log("handleCreateCustomRequest error: " . $e->getMessage());
        jsonError('Error submitting custom request', 500);
    }
}

/**
 * GET /api/v1/admin/custom-requests
 */
function handleGetAdminCustomRequests(): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']);

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `CustomRequest` ORDER BY `createdAt` DESC");
        $requests = $stmt->fetchAll();

        $result = [];
        foreach ($requests as $r) {
            $files = [];
            try {
                $fStmt = $pdo->prepare("SELECT * FROM `CustomRequestFile` WHERE `customRequestId` = ?");
                $fStmt->execute([$r['id']]);
                $files = $fStmt->fetchAll();
            } catch (Throwable $fe) {}

            $timelines = [];
            try {
                $tStmt = $pdo->prepare("SELECT * FROM `CustomRequestTimeline` WHERE `customRequestId` = ? ORDER BY `createdAt` DESC");
                $tStmt->execute([$r['id']]);
                $timelines = $tStmt->fetchAll();
            } catch (Throwable $te) {}

            $r['files'] = $files;
            $r['timelines'] = $timelines;
            $result[] = $r;
        }

        jsonResponse($result, 200);

    } catch (Throwable $e) {
        error_log("handleGetAdminCustomRequests error: " . $e->getMessage());
        jsonError('Error fetching custom requests', 500);
    }
}
