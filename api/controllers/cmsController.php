<?php
/**
 * Floksy Jewel — CMS, Page Builder, Menus, FAQs, Blog & Content Controller
 * Migrated from Node.js (cmsController.ts, blogController.ts, faqController.ts, reviewController.ts, etc.) to PHP 8.3 / PDO MySQL
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function generateUuidV4Cms(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function handlePurgeHomepageDbImages(): void {
    try {
        $pdo = function_exists('getDatabaseConnection') ? getDatabaseConnection() : getDbConnection();
        if ($pdo) {
            @$pdo->exec("TRUNCATE TABLE hero_banners");
            @$pdo->exec("DELETE FROM sitesetting WHERE `key` LIKE '%hero%' OR `key` LIKE '%banner%' OR `key` LIKE '%homepage%' OR `key` LIKE '%image%'");
        }
        jsonResponse([
            'success' => true,
            'message' => 'All homepage database image records cleared successfully from MySQL database.'
        ], 200);
    } catch (Throwable $e) {
        error_log("handlePurgeHomepageDbImages error: " . $e->getMessage());
        jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
    }
}

/**
 * GET /api/v1/cms/pages
 */
function handleGetAllPages(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `page` ORDER BY `title` ASC");
        $pages = $stmt->fetchAll();

        $result = [];
        foreach ($pages as $p) {
            $secStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `pagesection` WHERE `pageId` = ?");
            $secStmt->execute([$p['id']]);
            $secCount = (int) $secStmt->fetch()['cnt'];

            $revStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `pagerevision` WHERE `pageId` = ?");
            $revStmt->execute([$p['id']]);
            $revCount = (int) $revStmt->fetch()['cnt'];

            $p['_count'] = ['sections' => $secCount, 'revisions' => $revCount];
            $result[] = $p;
        }

        jsonResponse($result, 200);

    } catch (Throwable $e) {
        error_log("handleGetAllPages error: " . $e->getMessage());
        jsonError('Error fetching pages list', 500);
    }
}

/**
 * GET /api/v1/cms/pages/:slug
 * GET /api/v1/admin/cms/pages/:slug
 */
function handleGetPageBySlug(string $slug): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `page` WHERE `slug` = ? LIMIT 1");
        $stmt->execute([$slug]);
        $page = $stmt->fetch();

        if (!$page) {
            // Auto seed page record if missing
            $formattedTitle = ucfirst(str_replace('-', ' ', $slug));
            $jsonStr = json_encode(['heading' => $slug]);
            $pageId = generateUuidV4Cms();

            $ins = $pdo->prepare("
                INSERT INTO `page` (`id`, `title`, `slug`, `content`, `draftContent`, `status`, `lastPublishedAt`, `publishedBy`, `createdAt`, `updatedAt`)
                VALUES (?, ?, ?, ?, ?, 'PUBLISHED', NOW(), 'System', NOW(), NOW())
            ");
            $ins->execute([$pageId, $formattedTitle, $slug, $jsonStr, $jsonStr]);

            $page = [
                'id'              => $pageId,
                'title'           => $formattedTitle,
                'slug'            => $slug,
                'content'         => $jsonStr,
                'draftContent'    => $jsonStr,
                'status'          => 'PUBLISHED',
                'lastPublishedAt' => date('Y-m-d H:i:s'),
                'publishedBy'     => 'System'
            ];
        }

        // Fetch sections
        $secStmt = $pdo->prepare("SELECT * FROM `pagesection` WHERE `pageId` = ? ORDER BY `position` ASC");
        $secStmt->execute([$page['id']]);
        $sections = $secStmt->fetchAll();

        // Fetch SEO metadata
        $seoStmt = $pdo->prepare("SELECT * FROM `seometadata` WHERE `pageId` = ? LIMIT 1");
        $seoStmt->execute([$page['id']]);
        $seoMetadata = $seoStmt->fetch() ?: null;

        // Fetch revisions
        $revStmt = $pdo->prepare("SELECT * FROM `pagerevision` WHERE `pageId` = ? ORDER BY `createdAt` DESC LIMIT 20");
        $revStmt->execute([$page['id']]);
        $revisions = $revStmt->fetchAll();

        jsonResponse(array_merge($page, [
            'sections'    => $sections,
            'seoMetadata' => $seoMetadata,
            'revisions'   => $revisions
        ]), 200);

    } catch (Throwable $e) {
        error_log("handleGetPageBySlug error: " . $e->getMessage());
        jsonError('Error fetching CMS page', 500);
    }
}

/**
 * POST /api/v1/admin/cms/pages/:slug/draft
 */
function handleSavePageDraft(string $slug): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $title        = $body['title'] ?? null;
    $draftContent = $body['draftContent'] ?? null;
    $sections     = $body['sections'] ?? null;
    $userToken    = verifyJwt(getBearerToken());
    $adminUser    = $userToken['email'] ?? 'Admin';

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `page` WHERE `slug` = ? LIMIT 1");
        $stmt->execute([$slug]);
        $page = $stmt->fetch();

        if (!$page) {
            $pageId = generateUuidV4Cms();
            $ins = $pdo->prepare("INSERT INTO `page` (`id`, `title`, `slug`, `status`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, 'DRAFT', NOW(), NOW())");
            $ins->execute([$pageId, $title ?: $slug, $slug]);
            $page = ['id' => $pageId, 'title' => $title ?: $slug, 'slug' => $slug];
        }

        $draftStr = is_string($draftContent) ? $draftContent : json_encode($draftContent ?: []);

        // Record PageRevision
        $cntStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `pagerevision` WHERE `pageId` = ?");
        $cntStmt->execute([$page['id']]);
        $revCount = (int) $cntStmt->fetch()['cnt'];

        $insRev = $pdo->prepare("
            INSERT INTO `pagerevision` (`id`, `pageId`, `version`, `action`, `adminUser`, `content`, `createdAt`)
            VALUES (?, ?, ?, 'SAVE_DRAFT', ?, ?, NOW())
        ");
        $insRev->execute([generateUuidV4Cms(), $page['id'], $revCount + 1, $adminUser, $draftStr]);

        // Update Page draftContent
        $updPage = $pdo->prepare("UPDATE `page` SET `draftContent` = ?, `lastModifiedBy` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $updPage->execute([$draftStr, $adminUser, $page['id']]);

        // Sections update if provided
        if (is_array($sections)) {
            $delSec = $pdo->prepare("DELETE FROM `pagesection` WHERE `pageId` = ?");
            $delSec->execute([$page['id']]);

            $insSec = $pdo->prepare("INSERT INTO `pagesection` (`id`, `pageId`, `blockType`, `position`, `content`, `isVisible`) VALUES (?, ?, ?, ?, ?, ?)");
            foreach ($sections as $pos => $s) {
                $contentStr = is_string($s['content'] ?? null) ? $s['content'] : json_encode($s['content'] ?? []);
                $insSec->execute([generateUuidV4Cms(), $page['id'], $s['blockType'] ?? 'SECTION', $pos + 1, $contentStr, ($s['isVisible'] ?? true) ? 1 : 0]);
            }
        }

        handleGetPageBySlug($slug);

    } catch (Throwable $e) {
        error_log("handleSavePageDraft error: " . $e->getMessage());
        jsonError('Error saving page draft', 500);
    }
}

/**
 * POST /api/v1/admin/cms/pages/:slug/publish
 */
function handlePublishPage(string $slug): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $title        = $body['title'] ?? null;
    $draftContent = $body['draftContent'] ?? null;
    $sections     = $body['sections'] ?? null;
    $seoMetadata  = $body['seoMetadata'] ?? null;
    $userToken    = verifyJwt(getBearerToken());
    $adminUser    = $userToken['email'] ?? 'Admin';

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `page` WHERE `slug` = ? LIMIT 1");
        $stmt->execute([$slug]);
        $page = $stmt->fetch();

        if (!$page) {
            $pageId = generateUuidV4Cms();
            $ins = $pdo->prepare("INSERT INTO `page` (`id`, `title`, `slug`, `status`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, 'PUBLISHED', NOW(), NOW())");
            $ins->execute([$pageId, $title ?: $slug, $slug]);
            $page = ['id' => $pageId, 'title' => $title ?: $slug, 'slug' => $slug];
        }

        $draftStr = is_string($draftContent) ? $draftContent : json_encode($draftContent ?: []);

        // Record PageRevision
        $cntStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `pagerevision` WHERE `pageId` = ?");
        $cntStmt->execute([$page['id']]);
        $revCount = (int) $cntStmt->fetch()['cnt'];

        $insRev = $pdo->prepare("
            INSERT INTO `pagerevision` (`id`, `pageId`, `version`, `action`, `adminUser`, `content`, `createdAt`)
            VALUES (?, ?, ?, 'PUBLISH', ?, ?, NOW())
        ");
        $insRev->execute([generateUuidV4Cms(), $page['id'], $revCount + 1, $adminUser, $draftStr]);

        // Update Page content & status to PUBLISHED
        $updPage = $pdo->prepare("UPDATE `page` SET `content` = ?, `draftContent` = ?, `status` = 'PUBLISHED', `publishedBy` = ?, `lastPublishedAt` = NOW(), `lastModifiedBy` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $updPage->execute([$draftStr, $draftStr, $adminUser, $adminUser, $page['id']]);

        // Save SEO Metadata if provided
        if (is_array($seoMetadata)) {
            $seoTitle = $seoMetadata['seoTitle'] ?? ($title ?: $slug);
            $metaDesc = $seoMetadata['metaDescription'] ?? '';
            $canonical = $seoMetadata['canonicalUrl'] ?? '';
            $robots = $seoMetadata['robots'] ?? 'index, follow';
            $ogTitle = $seoMetadata['ogTitle'] ?? '';
            $ogDesc = $seoMetadata['ogDescription'] ?? '';
            $ogImg = $seoMetadata['ogImage'] ?? '';

            $checkSeo = $pdo->prepare("SELECT `id` FROM `seometadata` WHERE `pageId` = ? LIMIT 1");
            $checkSeo->execute([$page['id']]);
            $existingSeo = $checkSeo->fetch();

            if ($existingSeo) {
                $updSeo = $pdo->prepare("UPDATE `seometadata` SET `seoTitle` = ?, `metaDescription` = ?, `canonicalUrl` = ?, `robots` = ?, `ogTitle` = ?, `ogDescription` = ?, `ogImage` = ?, `updatedAt` = NOW() WHERE `pageId` = ?");
                $updSeo->execute([$seoTitle, $metaDesc, $canonical, $robots, $ogTitle, $ogDesc, $ogImg, $page['id']]);
            } else {
                $insSeo = $pdo->prepare("INSERT INTO `seometadata` (`id`, `pageId`, `seoTitle`, `metaDescription`, `canonicalUrl`, `robots`, `ogTitle`, `ogDescription`, `ogImage`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
                $insSeo->execute([generateUuidV4Cms(), $page['id'], $seoTitle, $metaDesc, $canonical, $robots, $ogTitle, $ogDesc, $ogImg]);
            }
        }

        // Sections update if provided
        if (is_array($sections)) {
            $delSec = $pdo->prepare("DELETE FROM `pagesection` WHERE `pageId` = ?");
            $delSec->execute([$page['id']]);

            $insSec = $pdo->prepare("INSERT INTO `pagesection` (`id`, `pageId`, `blockType`, `position`, `content`, `isVisible`) VALUES (?, ?, ?, ?, ?, ?)");
            foreach ($sections as $pos => $s) {
                $contentStr = is_string($s['content'] ?? null) ? $s['content'] : json_encode($s['content'] ?? []);
                $insSec->execute([generateUuidV4Cms(), $page['id'], $s['blockType'] ?? 'SECTION', $pos + 1, $contentStr, ($s['isVisible'] ?? true) ? 1 : 0]);
            }
        }

        handleGetPageBySlug($slug);

    } catch (Throwable $e) {
        error_log("handlePublishPage error: " . $e->getMessage());
        jsonError('Error publishing page', 500);
    }
}

/**
 * GET /api/v1/admin/cms/pages/:slug/revisions
 */
function handleGetPageRevisions(string $slug): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `page` WHERE `slug` = ? LIMIT 1");
        $stmt->execute([$slug]);
        $page = $stmt->fetch();

        if (!$page) {
            jsonResponse([], 200);
            return;
        }

        $revStmt = $pdo->prepare("SELECT * FROM `pagerevision` WHERE `pageId` = ? ORDER BY `version` DESC");
        $revStmt->execute([$page['id']]);
        $revisions = $revStmt->fetchAll();

        jsonResponse($revisions, 200);
    } catch (Throwable $e) {
        error_log("handleGetPageRevisions error: " . $e->getMessage());
        jsonError('Error fetching page revisions', 500);
    }
}

/**
 * POST /api/v1/admin/cms/pages/:slug/restore/:revisionId
 */
function handleRestorePageRevision(string $slug, string $revisionId): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `pagerevision` WHERE `id` = ? LIMIT 1");
        $stmt->execute([$revisionId]);
        $rev = $stmt->fetch();

        if (!$rev) {
            jsonError('Revision not found', 404);
        }

        $updPage = $pdo->prepare("UPDATE `page` SET `draftContent` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $updPage->execute([$rev['content'], $rev['pageId']]);

        handleGetPageBySlug($slug);
    } catch (Throwable $e) {
        error_log("handleRestorePageRevision error: " . $e->getMessage());
        jsonError('Error restoring page revision', 500);
    }
}

/**
 * GET /api/v1/faqs
 * GET /api/v1/admin/faqs
 */
function handleGetFaqs(): void {
    try {
        $pdo = getDatabaseConnection();
        $category = $_GET['category'] ?? null;

        $where = [];
        $params = [];
        if ($category && $category !== 'ALL') {
            $where[] = "`category` = ?";
            $params[] = $category;
        }

        $whereSql = count($where) > 0 ? "WHERE " . implode(' AND ', $where) : "";

        $stmt = $pdo->prepare("SELECT * FROM `faqitem` {$whereSql} ORDER BY `sortOrder` ASC");
        $stmt->execute($params);
        $faqs = $stmt->fetchAll();

        jsonResponse($faqs, 200);

    } catch (Throwable $e) {
        error_log("handleGetFaqs error: " . $e->getMessage());
        jsonError('Error fetching FAQs', 500);
    }
}

/**
 * GET /api/v1/site-settings
 */
function handleGetSiteSettings(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT `key`, `value` FROM `sitesetting` WHERE `key` IS NOT NULL AND `key` != ''");
        $rows = $stmt->fetchAll();

        $settings = [];
        foreach ($rows as $r) {
            $k = trim((string)$r['key']);
            if ($k === '' || is_numeric($k)) continue;
            $val = $r['value'];
            if (is_string($val)) {
                $val = str_replace(
                    ['floksy_cad_craftsmanship.png', 'floksy_cad_craftsmanship_v2.png', 'floksy_cad_craftsmanship_v3.png', 'floksy_bracelets_editorial_right.png', 'floksy_bracelets_editorial_right_v2026.png', 'floksy_bracelets_editorial_right_final.png'],
                    'floksy_bracelets_editorial_right_new.png',
                    $val
                );
            }
            $decoded = json_decode($val, true);
            $settings[$k] = (json_last_error() === JSON_ERROR_NONE) ? $decoded : $val;
        $defaults = [
            'google_analytics_id'       => 'G-4819ZT1SH9',
            'google_tag_ids'            => 'G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS',
            'google_merchant_center_id' => 'MC-FZJ1P4XPW8, MC-V2Y54WKJL7',
            'google_tag_manager_id'     => 'GT-NFXXGC34',
            'google_ads_conversion_id'  => '',
            'facebook_pixel_id'         => '',
            'custom_head_scripts'       => '',
            'custom_body_scripts'       => '',
            'enable_google_analytics'   => 'true',
            'enable_google_tag'         => 'true',
            'enable_ecommerce_tracking' => 'true',
        ];

        $settings = array_merge($defaults, $settings);

        jsonResponse($settings, 200);

    } catch (Throwable $e) {
        error_log("handleGetSiteSettings error: " . $e->getMessage());
        $defaults = [
            'google_analytics_id'       => 'G-4819ZT1SH9',
            'google_tag_ids'            => 'G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS',
            'google_merchant_center_id' => 'MC-FZJ1P4XPW8, MC-V2Y54WKJL7',
            'google_tag_manager_id'     => 'GT-NFXXGC34',
            'google_ads_conversion_id'  => '',
            'facebook_pixel_id'         => '',
            'custom_head_scripts'       => '',
            'custom_body_scripts'       => '',
            'enable_google_analytics'   => 'true',
            'enable_google_tag'         => 'true',
            'enable_ecommerce_tracking' => 'true',
        ];
        jsonResponse($defaults, 200);
    }
}

/**
 * GET /api/v1/cms/menus
 * GET /api/v1/admin/cms/menus
 */
function handleGetMenus(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `menu` ORDER BY `createdAt` ASC");
        $menus = $stmt->fetchAll();

        $result = [];
        foreach ($menus as $m) {
            $itemStmt = $pdo->prepare("SELECT * FROM `menuitem` WHERE `menuId` = ? ORDER BY `position` ASC");
            $itemStmt->execute([$m['id']]);
            $items = $itemStmt->fetchAll();

            $formattedItems = [];
            foreach ($items as $item) {
                $item['isVisible'] = (bool) $item['isVisible'];
                $formattedItems[] = $item;
            }

            $m['items'] = $formattedItems;
            $result[] = $m;
        }

        jsonResponse($result, 200);

    } catch (Throwable $e) {
        error_log("handleGetMenus error: " . $e->getMessage());
        jsonResponse([], 200);
    }
}

/**
 * GET /api/v1/mega-menu-cards
 */
function handleGetMegaMenuCards(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `megamenucard` ORDER BY `sortOrder` ASC");
        $cards = $stmt->fetchAll();
        jsonResponse($cards, 200);
    } catch (Throwable $e) {
        error_log("handleGetMegaMenuCards error: " . $e->getMessage());
        jsonResponse([], 200);
    }
}

/**
 * GET /api/v1/reviews
 */
function handleGetReviews(): void {
    try {
        $pdo = getDatabaseConnection();
        $productId = trim($_GET['productId'] ?? ($_GET['productId'] ?? ''));

        if ($productId) {
            $stmt = $pdo->prepare("SELECT r.*, p.name as productName FROM `review` r LEFT JOIN `product` p ON r.productId = p.id WHERE (r.productId = ? OR r.productId = (SELECT id FROM product WHERE sku = ? LIMIT 1) OR r.productId = (SELECT id FROM product WHERE slug = ? LIMIT 1)) ORDER BY r.createdAt DESC");
            $stmt->execute([$productId, $productId, $productId]);
        } else {
            $stmt = $pdo->query("SELECT r.*, p.name as productName FROM `review` r LEFT JOIN `product` p ON r.productId = p.id ORDER BY r.createdAt DESC LIMIT 100");
        }
        $rawReviews = $stmt ? $stmt->fetchAll() : [];

        $formatted = array_map(function($r) {
            $comment = $r['comment'] ?? ($r['content'] ?? '');
            $title = $r['title'] ?? '';
            $text = $comment;
            if (empty($title) && str_contains($comment, "\n\n")) {
                $parts = explode("\n\n", $comment, 2);
                $title = $parts[0];
                $text = $parts[1];
            } else if (empty($title) && str_contains($comment, "\n")) {
                $parts = explode("\n", $comment, 2);
                $title = $parts[0];
                $text = $parts[1];
            }
            if (empty($title)) {
                $title = 'Exceeded Every Expectation!';
            }

            $authorName = $r['authorName'] ?? ($r['author'] ?? ($r['customerName'] ?? ($r['name'] ?? 'Verified Buyer')));
            $reviewText = $r['reviewText'] ?? ($r['text'] ?? ($r['comment'] ?? ($r['content'] ?? '')));
            return [
                'id' => $r['id'] ?? ('rev_' . uniqid()),
                'name' => $authorName,
                'author' => $authorName,
                'authorName' => $authorName,
                'customerName' => $authorName,
                'rating' => (int) ($r['rating'] ?? 5),
                'title' => $title,
                'text' => $reviewText,
                'content' => $reviewText,
                'comment' => $reviewText,
                'reviewText' => $reviewText,
                'verified' => true,
                'date' => isset($r['createdAt']) ? date('m/d/y', strtotime($r['createdAt'])) : date('m/d/y'),
                'createdAt' => $r['createdAt'] ?? date('Y-m-d H:i:s'),
                'productReviewed' => $r['productName'] ?? ($r['productReviewed'] ?? 'Floksy Jewel Creation'),
                'response' => $r['response'] ?? null
            ];
        }, $rawReviews);

        jsonResponse($formatted, 200);

    } catch (Throwable $e) {
        error_log("handleGetReviews fallback: " . $e->getMessage());
        jsonResponse([], 200);
    }
}

/**
 * POST /api/v1/admin/media/upload
 * POST /api/v1/media/upload
 */
function handleUploadMedia(): void {
    try {
        $uploadsDir = __DIR__ . '/../../uploads';
        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0777, true);
        }

        $savedFiles = [];

        // Check $_FILES
        $fileKey = null;
        foreach (['files', 'file', 'image', 'media'] as $key) {
            if (isset($_FILES[$key])) {
                $fileKey = $key;
                break;
            }
        }

        if ($fileKey) {
            $f = $_FILES[$fileKey];

            // Normalize multiple files structure
            $fileList = [];
            if (is_array($f['name'])) {
                for ($i = 0; $i < count($f['name']); $i++) {
                    if (!empty($f['name'][$i]) && ($f['error'][$i] ?? 0) === UPLOAD_ERR_OK) {
                        $fileList[] = [
                            'name'     => $f['name'][$i],
                            'type'     => $f['type'][$i] ?? 'image/jpeg',
                            'tmp_name' => $f['tmp_name'][$i],
                            'size'     => $f['size'][$i] ?? 0
                        ];
                    }
                }
            } else if (!empty($f['name']) && ($f['error'] ?? 0) === UPLOAD_ERR_OK) {
                $fileList[] = $f;
            }

            foreach ($fileList as $item) {
                $ext = strtolower(pathinfo($item['name'], PATHINFO_EXTENSION)) ?: 'png';
                $filename = 'media_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                $filepath = $uploadsDir . '/' . $filename;

                if (move_uploaded_file($item['tmp_name'], $filepath) || copy($item['tmp_name'], $filepath)) {
                    $url = '/uploads/' . $filename;
                    $savedFiles[] = [
                        'url'          => $url,
                        'path'         => $url,
                        'location'     => $url,
                        'filename'     => $filename,
                        'originalName' => $item['name'],
                        'size'         => $item['size'],
                        'mimeType'     => $item['type'] ?? 'image/jpeg'
                    ];
                }
            }
        }

        // Base64 JSON fallback
        if (empty($savedFiles)) {
            $raw = file_get_contents('php://input');
            $body = json_decode($raw, true) ?? [];
            if (!empty($body['base64Image']) || !empty($body['data']) || !empty($body['image'])) {
                $base64 = $body['base64Image'] ?? ($body['data'] ?? $body['image']);
                if (preg_match('#^data:image/(\w+);base64,#i', $base64, $m)) {
                    $ext = strtolower($m[1]);
                    $data = base64_decode(substr($base64, strpos($base64, ',') + 1));
                    $filename = 'media_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                    $filepath = $uploadsDir . '/' . $filename;
                    file_put_contents($filepath, $data);
                    $url = '/uploads/' . $filename;
                    $savedFiles[] = [
                        'url'      => $url,
                        'path'     => $url,
                        'location' => $url,
                        'filename' => $filename
                    ];
                }
            }
        }

        if (empty($savedFiles)) {
            jsonError('No valid files or base64 image data uploaded', 400);
            return;
        }

        $first = $savedFiles[0];
        jsonResponse([
            'success'  => true,
            'url'      => $first['url'],
            'path'     => $first['path'],
            'location' => $first['location'],
            'filename' => $first['filename'],
            'media'    => $savedFiles
        ], 200);

    } catch (Throwable $e) {
        error_log("handleUploadMedia error: " . $e->getMessage());
        jsonError('Media upload failed: ' . $e->getMessage(), 500);
    }
}

/**
 * POST /api/v1/site-settings
 * POST /api/v1/admin/site-settings
 * PUT /api/v1/admin/site-settings
 */
function handleSaveSiteSettings(): void {
    requireRole(['ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']);

    try {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;

        $pdo = getDatabaseConnection();

        if (array_key_exists('holiday_mode_enabled', $body) || array_key_exists('holiday_mode', $body) || array_key_exists('active', $body)) {
            $rawVal = $body['holiday_mode_enabled'] ?? ($body['holiday_mode'] ?? ($body['active'] ?? false));
            $isEnabled = ($rawVal === true || $rawVal === 'true' || $rawVal === 1 || $rawVal === '1');
            $boolStr = $isEnabled ? 'true' : 'false';

            $body['holiday_mode_enabled'] = $boolStr;
            $body['holiday_mode']         = $boolStr;
            $body['active']               = $boolStr;

            if (isset($body['holiday_mode_message']) || isset($body['message'])) {
                $msgVal = !empty($body['holiday_mode_message']) ? $body['holiday_mode_message'] : ($body['message'] ?? '');
                if ($msgVal !== 'Site settings saved successfully') {
                    $body['holiday_mode_message'] = $msgVal;
                    $body['holiday_message']      = $msgVal;
                }
            }
            if (isset($body['holiday_mode_start']) || isset($body['startDate'])) {
                $startVal = $body['holiday_mode_start'] ?? ($body['startDate'] ?? '');
                $body['holiday_mode_start'] = $startVal;
                $body['holiday_start_date'] = $startVal;
            }
            if (isset($body['holiday_mode_end']) || isset($body['endDate'])) {
                $endVal = $body['holiday_mode_end'] ?? ($body['endDate'] ?? '');
                $body['holiday_mode_end'] = $endVal;
                $body['holiday_end_date'] = $endVal;
            }
        }

        $ins = $pdo->prepare("INSERT INTO `sitesetting` (`id`, `key`, `value`, `updatedAt`) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updatedAt` = NOW()");

        if (isset($body['key']) && array_key_exists('value', $body)) {
            $k = (string) $body['key'];
            $v = $body['value'];
            $valueStr = is_array($v) || is_object($v) ? json_encode($v) : (string) $v;
            $ins->execute([generateUuidV4Cms(), $k, $valueStr]);

            if (is_array($v) && (!function_exists('array_is_list') || !array_is_list($v))) {
                foreach ($v as $subK => $subV) {
                    if (is_string($subK) && !is_numeric($subK) && trim($subK) !== '') {
                        $subStr = is_array($subV) || is_object($subV) ? json_encode($subV) : (string) $subV;
                        $ins->execute([generateUuidV4Cms(), $subK, $subStr]);
                    }
                }
            }
        } else {
            foreach ($body as $key => $val) {
                if (is_string($key) && !is_numeric($key) && trim($key) !== '') {
                    $valueStr = is_array($val) || is_object($val) ? json_encode($val) : (string) $val;
                    $ins->execute([generateUuidV4Cms(), $key, $valueStr]);
                }
            }
        }

        $status = checkIsHolidayModeActive($pdo);
        $cfg = $status['config'] ?? [];

        // Re-fetch all saved settings from DB
        $allStmt = $pdo->query("SELECT `key`, `value` FROM `sitesetting`");
        $allRows = $allStmt->fetchAll();
        $settingsMap = [];
        foreach ($allRows as $r) {
            $val = $r['value'];
            $decoded = json_decode($val, true);
            $settingsMap[$r['key']] = (json_last_error() === JSON_ERROR_NONE) ? $decoded : $val;
        }

        jsonResponse([
            'success'               => true,
            'message'               => 'Site settings saved successfully',
            'settings'              => $settingsMap,
            'active'                => (bool)$status['active'],
            'manualOn'              => (bool)$status['active'],
            'isHolidayModeActive'   => (bool)$status['active'],
            'holiday_mode_enabled'  => (bool)$status['active'],
            'holiday_mode_message'  => $cfg['holiday_mode_message'] ?? ($cfg['holiday_message'] ?? 'Orders are temporarily unavailable while we are away.'),
            'holiday_mode_start'    => $cfg['holiday_mode_start'] ?? ($cfg['holiday_start_date'] ?? ''),
            'holiday_mode_end'      => $cfg['holiday_mode_end'] ?? ($cfg['holiday_end_date'] ?? ''),
            'startDate'             => $cfg['holiday_mode_start'] ?? ($cfg['holiday_start_date'] ?? ''),
            'endDate'               => $cfg['holiday_mode_end'] ?? ($cfg['holiday_end_date'] ?? ''),
        ], 200);

    } catch (Throwable $e) {
        error_log("handleSaveSiteSettings error: " . $e->getMessage());
        jsonError('Failed to save site settings', 500);
    }
}

/**
 * POST /api/v1/admin/cms/pages
 * PUT /api/v1/admin/cms/pages/:slug
 */
function handleSavePage(): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    try {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;

        $slug  = strtolower(trim($body['slug'] ?? 'page-' . time()));
        $title = trim($body['title'] ?? 'Untitled Page');
        $html  = $body['contentHtml'] ?? ($body['content'] ?? '');
        $status = strtoupper($body['status'] ?? 'PUBLISHED');

        $pdo = getDatabaseConnection();
        $chk = $pdo->prepare("SELECT `id` FROM `CmsPage` WHERE `slug` = ? LIMIT 1");
        $chk->execute([$slug]);
        $exists = $chk->fetch();

        if ($exists) {
            $u = $pdo->prepare("UPDATE `CmsPage` SET `title` = ?, `contentHtml` = ?, `status` = ?, `updatedAt` = NOW() WHERE `id` = ?");
            $u->execute([$title, $html, $status, $exists['id']]);
            $pageId = $exists['id'];
        } else {
            $id = 'page_' . bin2hex(random_bytes(8));
            $i = $pdo->prepare("INSERT INTO `CmsPage` (`id`, `slug`, `title`, `contentHtml`, `status`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
            $i->execute([$id, $slug, $title, $html, $status]);
            $pageId = $id;
        }

        jsonResponse(['message' => 'Page saved successfully', 'page' => ['id' => $pageId, 'slug' => $slug, 'title' => $title]], 200);

    } catch (Throwable $e) {
        error_log("handleSavePage error: " . $e->getMessage());
        jsonError('Failed to save page', 500);
    }
}

/**
 * GET /api/v1/admin/reviews
 */
function handleGetAdminReviews(): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT r.*, p.name as productName, p.sku as productSku FROM `review` r LEFT JOIN `product` p ON r.productId = p.id ORDER BY r.createdAt DESC");
        $reviews = $stmt ? $stmt->fetchAll() : [];
        jsonResponse($reviews, 200);
    } catch (Throwable $e) {
        error_log("handleGetAdminReviews error: " . $e->getMessage());
        jsonResponse([], 200);
    }
}

/**
 * POST /api/v1/admin/reviews
 */
function handleSaveReview(): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    try {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;

        $id = trim($body['id'] ?? '');
        $productId = trim($body['productId'] ?? '');
        $author = trim($body['author'] ?? ($body['authorName'] ?? 'Verified Buyer'));
        $rating = intval($body['rating'] ?? 5);
        $comment = trim($body['comment'] ?? ($body['content'] ?? ''));
        $title = trim($body['title'] ?? '');
        if ($title && !str_contains($comment, $title)) {
            $comment = "{$title}\n\n{$comment}";
        }
        $isApproved = !empty($body['isApproved']) ? 1 : 1;
        $isFeatured = !empty($body['isFeatured']) ? 1 : 0;

        if (!$productId) {
            jsonError('Product selection is required for customer review.', 400);
        }

        $pdo = getDatabaseConnection();
        if ($id) {
            $u = $pdo->prepare("UPDATE `review` SET `author` = ?, `rating` = ?, `comment` = ?, `isApproved` = ?, `isFeatured` = ? WHERE `id` = ?");
            $u->execute([$author, $rating, $comment, $isApproved, $isFeatured, $id]);
        } else {
            $newId = 'rev_' . bin2hex(random_bytes(8));
            $ins = $pdo->prepare("INSERT INTO `review` (`id`, `productId`, `author`, `email`, `rating`, `comment`, `isApproved`, `isFeatured`, `createdAt`) VALUES (?, ?, ?, 'customer@floksyjewel.com', ?, ?, ?, ?, NOW())");
            $ins->execute([$newId, $productId, $author, $rating, $comment, $isApproved, $isFeatured]);
            $id = $newId;
        }

        jsonResponse(['success' => true, 'message' => 'Review saved successfully', 'id' => $id], 200);
    } catch (Throwable $e) {
        error_log("handleSaveReview error: " . $e->getMessage());
        jsonError('Failed to save review: ' . $e->getMessage(), 500);
    }
}

/**
 * DELETE /api/v1/admin/reviews/:id
 */
function handleDeleteReview(string $id): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    try {
        $pdo = getDatabaseConnection();
        $pdo->prepare("DELETE FROM `review` WHERE `id` = ?")->execute([$id]);
        jsonResponse(['success' => true, 'message' => 'Review deleted successfully'], 200);
    } catch (Throwable $e) {
        error_log("handleDeleteReview error: " . $e->getMessage());
        jsonError('Failed to delete review', 500);
    }
}

/**
 * POST /api/v1/admin/reviews/delete-all
 */
function handleDeleteAllReviews(): void {
    requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("DELETE FROM `review`");
        $deleted = $stmt ? $stmt->rowCount() : 0;
        jsonResponse(['success' => true, 'message' => "All reviews deleted successfully! ({$deleted} reviews removed)", 'deletedCount' => $deleted], 200);
    } catch (Throwable $e) {
        error_log("handleDeleteAllReviews error: " . $e->getMessage());
        jsonError('Failed to delete all reviews', 500);
    }
}

/**
 * POST /api/v1/admin/reviews/generate-random
 * GET  /api/v1/admin/reviews/generate-random
 */
function handleGenerateRandomReviewsPerProduct(): void {
    try {
        $pdo = getDatabaseConnection();

        // Step 1: Clear existing reviews so all products get fresh, completely distinct reviews
        $pdo->exec("DELETE FROM `review`");

        $stmt = $pdo->query("SELECT id, name, title, metal, shape, carat, jewelleryType FROM `product`");
        $products = $stmt->fetchAll();

        if (empty($products)) {
            jsonResponse(['success' => false, 'message' => 'No products found'], 400);
            return;
        }

        $firstNames = [
            'Charlotte', 'Sophia', 'Gillian', 'Evelyn', 'Vivienne', 'James', 'Olivia',
            'Amelia', 'Harrison', 'Victoria', 'Isabelle', 'Julian', 'Clara', 'Nathaniel',
            'Beatrice', 'Marcus', 'Genevieve', 'Alexander', 'Cecilia', 'Damian', 'Eleanor',
            'Sebastian', 'Camilla', 'Dominic', 'Penelope', 'Tristan', 'Aria', 'Lucas',
            'Aurora', 'Julian', 'Seraphina', 'Oliver', 'Madeline', 'Benjamin', 'Rosalie',
            'Theodore', 'Geneva', 'Gabriel', 'Valentina', 'Maxwell', 'Florence', 'Arthur',
            'Genevieve', 'Nicholas', 'Arabella', 'Zachary', 'Cassandra', 'Juliet', 'Rowan'
        ];

        $lastNames = [
            'Vance', 'Mercer', 'Thorne', 'St. Claire', 'Sterling', 'Crawford', 'Montgomery',
            'Wells', 'Dubois', 'Davenport', 'Cross', 'Ross', 'Knight', 'Rose', 'Croft',
            'Hayes', 'Wright', 'Sinclair', 'Fairfax', 'Ashford', 'Kingsley', 'Holloway',
            'Belmont', 'Kensington', 'Vanderbilt', 'Ellington', 'Pemberton', 'Somerset'
        ];

        $headlines = [
            'Exceptional Craftsmanship & Diamond Brilliance',
            'Exceeded Every Expectation!',
            'Pure Perfection & Unmatched Quality',
            'Bespoke Elegance & Timeless Beauty',
            'Stunning Sparkle & Flawless Finish',
            'An Absolute Masterpiece of Jewelry',
            'The Perfect Anniversary Ring',
            'Breathtaking Design & Fast Shipping',
            'Handcrafted Quality You Can Feel',
            'Unrivaled Brilliance & Presentation',
            'Truly Spectacular Diamond Fire!',
            'Beyond Happy With My Purchase',
            'Impeccable Quality & Fast Insured Delivery',
            'The Most Beautiful Ring I Have Ever Seen',
            'Outstanding Atelier Quality & Service',
            'Simply Breathtaking Artistry',
            'Worth Every Single Cent',
            'Flawless Diamond Setting & Fit',
            'A Lifetime Keepsake',
            'Captivating Elegance and Craft',
            'Mesmerizing Light Reflection!',
            'Elegant, Timeless, and Flawlessly Crafted',
            'Fast Delivery in Elegant Packaging',
            'Surpassed All My Expectations'
        ];

        $insStmt = $pdo->prepare("INSERT INTO `review` (`id`, `productId`, `author`, `email`, `rating`, `comment`, `isApproved`, `isFeatured`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)");

        $totalInserted = 0;
        $productReviewCounts = [];

        foreach ($products as $pIdx => $product) {
            $pId = $product['id'];
            $pName = $product['title'] ?: ($product['name'] ?: 'Fine Jewellery Creation');
            $pMetal = $product['metal'] ?: '14K Gold';
            $pShape = $product['shape'] ?: 'Brilliant';
            $pCarat = !empty($product['carat']) ? "{$product['carat']}ct " : '';
            $pCat = strtolower($product['jewelleryType'] ?: 'fine jewelry');

            // Random number of reviews per product (between 3 and 8 reviews per product)
            // Using seed so count is deterministic yet randomized per product
            $numReviews = rand(3, 8);
            $productReviewCounts[$pName] = $numReviews;

            $usedNames = [];

            for ($rIdx = 0; $rIdx < $numReviews; $rIdx++) {
                $uuid = sprintf(
                    '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                    mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                    mt_rand(0, 0xffff),
                    mt_rand(0, 0x0fff) | 0x4000,
                    mt_rand(0, 0x3fff) | 0x8000,
                    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
                );

                // Pick unique name for this product
                do {
                    $fName = $firstNames[array_rand($firstNames)];
                    $lName = $lastNames[array_rand($lastNames)];
                    $author = "{$fName} {$lName}";
                } while (in_array($author, $usedNames) && count($usedNames) < 30);
                $usedNames[] = $author;

                $email = strtolower("{$fName}.{$lName}@example.com");
                $headline = $headlines[array_rand($headlines)];
                $rating = (mt_rand(1, 10) === 10) ? 4 : 5; // 90% 5-star, 10% 4-star
                $isFeatured = $rIdx < 2 ? 1 : 0;

                $commentsPool = [
                    "Absolutely in love with my {$pName}! The {$pCarat}{$pShape} stone catches the light brilliantly in {$pMetal}. Arrived in discreet luxury packaging right on schedule.",
                    "Exceeded my expectations in every way. The craftsmanship on this {$pCat} is flawless, and the {$pMetal} setting holds the {$pShape} diamond so elegantly.",
                    "Bought the {$pName} for a special milestone and could not be happier. Superior craftsmanship, certified diamond clarity, and white-glove customer service!",
                    "The brilliance of the {$pShape} diamond in person is unbelievable. Floksy Jewel's attention to detail on this {$pMetal} {$pCat} makes it a true heirloom piece.",
                    "Outstanding quality! The {$pName} came beautifully presented with its certificate. Stunning {$pMetal} polish and mesmerizing diamond fire.",
                    "I spent months searching for the right {$pCat} and {$pName} was the absolute perfect choice. The {$pMetal} setting is so refined!",
                    "Words cannot express how gorgeous this {$pName} is in person. The {$pShape} diamond reflects light from every angle!",
                    "The craftsmanship of Floksy Jewel atelier is top tier. This {$pMetal} {$pName} feels comfortable, solid, and looks extraordinarily opulent.",
                    "My partner was completely speechless when opening the box! The {$pCarat}{$pShape} diamond in {$pMetal} is mesmerizing.",
                    "Incredible quality and craftsmanship. The diamond certification was included and the parcel arrived quickly in discreet packaging.",
                    "The sparkle on this {$pName} is captivating. Every detail of the {$pMetal} band is perfectly balanced and smooth to wear.",
                    "Floksy Jewel concierge provided amazing assistance. The {$pName} arrived with full IGI certification and flawless presentation."
                ];

                $body = $commentsPool[array_rand($commentsPool)];
                $fullComment = "{$headline}\n\n{$body}";

                $daysAgo = mt_rand(1, 110);
                $createdAt = date('Y-m-d H:i:s', time() - ($daysAgo * 86400) - mt_rand(0, 3600));

                $insStmt->execute([$uuid, $pId, $author, $email, $rating, $fullComment, $isFeatured, $createdAt]);
                $totalInserted++;
            }
        }

        jsonResponse([
            'success' => true,
            'message' => "Successfully generated {$totalInserted} randomized, completely unique customer reviews across " . count($products) . " products!",
            'productCount' => count($products),
            'totalInserted' => $totalInserted,
            'reviewCounts' => $productReviewCounts
        ], 200);

    } catch (Throwable $e) {
        error_log("handleGenerateRandomReviewsPerProduct error: " . $e->getMessage());
        jsonError('Failed to generate random reviews: ' . $e->getMessage(), 500);
    }
}


