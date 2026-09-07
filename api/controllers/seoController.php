<?php
/**
 * Aura Diamond Atelier — SEO Metadata, Redirects, Sitemap & Robots.txt Controller
 * Migrated from Node.js (seoController.ts) to PHP 8.3 / PDO MySQL
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

/**
 * GET /api/v1/seo
 */
function handleGetSeoMetadata(): void {
    try {
        $pdo = getDatabaseConnection();
        $pageSlug = $_GET['pageSlug'] ?? null;
        $entityType = $_GET['entityType'] ?? null;
        $entityId = $_GET['entityId'] ?? null;

        $seo = null;
        if ($pageSlug) {
            $pStmt = $pdo->prepare("SELECT `id` FROM `page` WHERE `slug` = ? LIMIT 1");
            $pStmt->execute([$pageSlug]);
            $page = $pStmt->fetch();
            if ($page) {
                $sStmt = $pdo->prepare("SELECT * FROM `seometadata` WHERE `pageId` = ? LIMIT 1");
                $sStmt->execute([$page['id']]);
                $seo = $sStmt->fetch();
            }
        } else if ($entityType && $entityId) {
            $sStmt = $pdo->prepare("SELECT * FROM `seometadata` WHERE `entityType` = ? AND `entityId` = ? LIMIT 1");
            $sStmt->execute([$entityType, $entityId]);
            $seo = $sStmt->fetch();
        }

        if ($seo) {
            jsonResponse($seo, 200);
        } else {
            jsonResponse([
                'seoTitle'        => 'AURA DIAMOND ATELIER | High Jewellery & Natural Diamond Vault',
                'metaDescription' => 'Discover Aura Diamond Atelier bespoke fine jewellery collections and certified loose diamonds in The Diamond Vault.',
                'canonicalUrl'    => 'https://auroradiamonds.com',
                'robots'          => 'index, follow',
                'ogTitle'         => 'AURA DIAMOND ATELIER | International Luxury Fine Jewellery',
                'ogDescription'   => 'Certified natural & lab-grown diamonds, engagement rings, bespoke craftsmanship.',
                'ogImage'         => '/assets/gem_hero_desktop.png'
            ], 200);
        }

    } catch (Throwable $e) {
        error_log("handleGetSeoMetadata error: " . $e->getMessage());
        jsonError('Error fetching SEO metadata', 500);
    }
}

/**
 * GET /sitemap.xml
 */
function handleGenerateSitemapXml(): void {
    try {
        $baseUrl = getenv('PUBLIC_SITE_URL') ?: 'https://auroradiamonds.com';
        $pdo = getDatabaseConnection();

        $prodStmt = $pdo->query("SELECT `slug`, `updatedAt` FROM `product` WHERE `status` = 'ACTIVE'");
        $products = $prodStmt->fetchAll();

        $diaStmt = $pdo->query("SELECT `diamondId`, `updatedAt` FROM `diamond` WHERE `status` = 'AVAILABLE'");
        $diamonds = $diaStmt->fetchAll();

        $colStmt = $pdo->query("SELECT `slug`, `updatedAt` FROM `collection`");
        $collections = $colStmt->fetchAll();

        $pageStmt = $pdo->query("SELECT `slug`, `updatedAt` FROM `page` WHERE `status` = 'PUBLISHED'");
        $pages = $pageStmt->fetchAll();

        $urls = [
            ['loc' => "{$baseUrl}/", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/rings", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/earrings", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/necklaces", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/bracelets", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/pendants", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/diamonds", 'lastmod' => date('Y-m-d')],
            ['loc' => "{$baseUrl}/custom-jewellery", 'lastmod' => date('Y-m-d')]
        ];

        foreach ($products as $p) {
            $urls[] = ['loc' => "{$baseUrl}/rings/{$p['slug']}", 'lastmod' => substr($p['updatedAt'] ?? date('Y-m-d'), 0, 10)];
        }
        foreach ($diamonds as $d) {
            $urls[] = ['loc' => "{$baseUrl}/diamonds/{$d['diamondId']}", 'lastmod' => substr($d['updatedAt'] ?? date('Y-m-d'), 0, 10)];
        }
        foreach ($collections as $c) {
            $urls[] = ['loc' => "{$baseUrl}/collections/{$c['slug']}", 'lastmod' => substr($c['updatedAt'] ?? date('Y-m-d'), 0, 10)];
        }
        foreach ($pages as $pg) {
            if ($pg['slug'] !== 'home') {
                $urls[] = ['loc' => "{$baseUrl}/{$pg['slug']}", 'lastmod' => substr($pg['updatedAt'] ?? date('Y-m-d'), 0, 10)];
            }
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$u['loc']}</loc>\n";
            $xml .= "    <lastmod>{$u['lastmod']}</lastmod>\n";
            $xml .= "    <changefreq>daily</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }
        $xml .= '</urlset>';

        header("Content-Type: application/xml; charset=utf-8");
        echo $xml;
        exit;

    } catch (Throwable $e) {
        error_log("handleGenerateSitemapXml error: " . $e->getMessage());
        http_response_code(500);
        echo "Error generating sitemap.xml";
        exit;
    }
}

/**
 * GET /robots.txt
 */
function handleGenerateRobotsTxt(): void {
    $baseUrl = getenv('PUBLIC_SITE_URL') ?: 'https://auroradiamonds.com';
    $txt = "User-agent: *\n";
    $txt .= "Disallow: /admin/\n";
    $txt .= "Disallow: /account/\n";
    $txt .= "Disallow: /api/\n\n";
    $txt .= "Sitemap: {$baseUrl}/sitemap.xml";

    header("Content-Type: text/plain; charset=utf-8");
    echo $txt;
    exit;
}
