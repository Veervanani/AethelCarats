<?php
/**
 * Floksy Jewel — Central PHP Front Controller & Router
 * Step 10 Custom Requests, Media, Files, SEO & Remaining API Entrypoint
 */

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// PHP Built-in Dev Server Router Support
if (php_sapi_name() === 'cli-server') {
    $urlPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if (str_starts_with($urlPath, '/uploads/')) {
        $filePath = __DIR__ . '/..' . $urlPath;
        if (file_exists($filePath) && is_file($filePath)) {
            $mime = mime_content_type($filePath) ?: 'image/png';
            header("Content-Type: {$mime}");
            header("Content-Length: " . filesize($filePath));
            readfile($filePath);
            exit;
        }
    }
    $filePath = __DIR__ . '/..' . $urlPath;
    if ($urlPath !== '/' && is_file($filePath)) {
        return false;
    }
}

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/controllers/healthController.php';
require_once __DIR__ . '/controllers/authController.php';
require_once __DIR__ . '/controllers/productController.php';
require_once __DIR__ . '/controllers/diamondController.php';
require_once __DIR__ . '/controllers/cartController.php';
require_once __DIR__ . '/controllers/orderController.php';
require_once __DIR__ . '/controllers/paymentController.php';
require_once __DIR__ . '/controllers/cmsController.php';
require_once __DIR__ . '/controllers/customRequestController.php';
require_once __DIR__ . '/controllers/seoController.php';
require_once __DIR__ . '/controllers/heroBannerController.php';
require_once __DIR__ . '/controllers/businessController.php';

// CORS Security Headers with Dynamic Origin Validation
$httpOrigin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if (!empty($httpOrigin)) {
    // Strip trailing path if referer was used
    $parsed = parse_url($httpOrigin);
    if (!empty($parsed['scheme']) && !empty($parsed['host'])) {
        $portStr = !empty($parsed['port']) ? (':' . $parsed['port']) : '';
        $httpOrigin = $parsed['scheme'] . '://' . $parsed['host'] . $portStr;
    }
}

$corsOrigin = !empty($httpOrigin) ? $httpOrigin : '*';

header("Access-Control-Allow-Origin: {$corsOrigin}");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, Accept, Origin");
header("Cross-Origin-Opener-Policy: same-origin-allow-popups");

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') {
    header("Access-Control-Max-Age: 86400");
    http_response_code(204);
    exit;
}

// Normalize URI path
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if (!empty($_GET['route'])) {
    $requestUri = $_GET['route'];
} else if (!empty($_SERVER['PATH_INFO'])) {
    $requestUri = '/api' . $_SERVER['PATH_INFO'];
} else if (str_starts_with($requestUri, '/api/index.php')) {
    $sub = substr($requestUri, 14);
    if (!empty($sub) && $sub !== '/') {
        $requestUri = '/api' . $sub;
    }
}
$path = rtrim($requestUri, '/');
if (empty($_GET['route']) && ($path === '' || $path === '/api' || $path === '/api/index.php')) {
    $path = '/api/v1/health';
}

if ($path === '/sitemap.xml') {
    handleGenerateSitemapXml();
    exit;
}

if (str_contains($path, 'generate_random_reviews') || str_contains($path, 'generate_10_reviews') || str_contains($path, 'generate-random')) {
    require_once __DIR__ . '/generate_random_reviews.php';
    exit;
}

if (str_contains($path, 'check_images')) {
    require_once __DIR__ . '/check_images.php';
    exit;
}

if ($path === '/robots.txt') {
    header('Content-Type: text/plain; charset=UTF-8');
    echo "User-agent: *\nDisallow: /admin/\nDisallow: /api/\nSitemap: /sitemap.xml\n";
    exit;
}

// Static Uploads Serving
if (str_starts_with($path, '/uploads/')) {
    $filePath = __DIR__ . '/..' . $path;
    if (file_exists($filePath) && is_file($filePath)) {
        $mime = mime_content_type($filePath) ?: 'image/png';
        header("Content-Type: {$mime}");
        header("Content-Length: " . filesize($filePath));
        readfile($filePath);
        exit;
    }
}

// Media Upload Routes
if ($path === '/api/v1/media/upload' || $path === '/api/v1/admin/media/upload') {
    if ($method === 'POST') {
        handleUploadMedia();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

if ($path === '/api/v1/purge_homepage_db_images' || $path === '/api/index.php/v1/purge_homepage_db_images') {
    handlePurgeHomepageDbImages();
}

// 1. Health Diagnostics (Step 2)
if ($path === '/api/v1/health' || $path === '/healthz' || $path === '/_health' || $path === '/ping') {
    if ($method === 'GET') {
        handleHealthCheck();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 2. Sitemap & Robots.txt (Step 10)
if ($path === '/sitemap.xml') {
    if ($method === 'GET') {
        handleGenerateSitemapXml();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/robots.txt') {
    if ($method === 'GET') {
        handleGenerateRobotsTxt();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// Hero Banners Routes
if ($path === '/api/v1/hero-banners') {
    if ($method === 'GET') {
        handleGetPublicHeroBanners();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/hero-banners') {
    if ($method === 'GET') {
        handleGetAdminHeroBanners();
    } else if ($method === 'POST') {
        handleCreateHeroBanner();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/hero-banners/reorder') {
    if ($method === 'POST') {
        handleReorderHeroBanners();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if (str_starts_with($path, '/api/v1/admin/hero-banners/')) {
    $id = substr($path, 27);
    if ($method === 'PUT' || $method === 'POST') {
        handleUpdateHeroBanner($id);
    } else if ($method === 'DELETE') {
        handleDeleteHeroBanner($id);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 3. Authentication & User Management Routes (Step 3)
if ($path === '/api/v1/auth/login' || $path === '/api/v1/admin/auth/login') {
    if ($method === 'POST') {
        handleLogin();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/auth/google' || $path === '/api/v1/admin/auth/google') {
    if ($method === 'POST') {
        handleGoogleAuth();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/auth/me') {
    if ($method === 'GET') {
        handleGetMe(false);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/logs' || $path === '/api/v1/admin/activity-logs') {
    if ($method === 'GET') {
        handleGetAdminLogs();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/users') {
    if ($method === 'GET') {
        handleGetAdminUsers();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/customers' || str_starts_with($path, '/api/v1/admin/customers/')) {
    if ($method === 'GET') {
        if (preg_match('#^/api/v1/admin/customers/([^/]+)$#', $path, $m)) {
            handleGetCustomerDetailWithLedger($m[1]);
        } else {
            handleGetCustomers();
        }
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/customer-prices') {
    if ($method === 'GET') {
        handleGetCustomerPrices();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 4. Products & Catalog Routes (Step 4)
if (str_starts_with($path, '/api/v1/admin/products/bulk-upload/')) {
    if ($path === '/api/v1/admin/products/bulk-upload/template' && $method === 'GET') {
        handleDownloadProductImportTemplate();
    } else if ($path === '/api/v1/admin/products/bulk-upload/validate' && $method === 'POST') {
        handleValidateProductBulkUpload();
    } else if ($path === '/api/v1/admin/products/bulk-upload/execute' && $method === 'POST') {
        handleExecuteProductBulkUpload();
    } else if ($path === '/api/v1/admin/products/bulk-upload/error-report' && $method === 'POST') {
        handleDownloadBulkImportErrorReport();
    } else {
        jsonError('Route Not Found', 404);
    }
}

if ($path === '/api/v1/search' || $path === '/api/v1/search/products') {
    if ($method === 'GET') {
        handleGetProducts();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

if ($path === '/api/v1/products' || str_starts_with($path, '/api/v1/products/') || $path === '/api/v1/admin/products' || str_starts_with($path, '/api/v1/admin/products/')) {
    if ($path === '/api/v1/admin/products/bulk-sale-update' && $method === 'POST') {
        handleBulkSaleUpdate();
    } else if ($path === '/api/v1/admin/products/bulk-price-update' && $method === 'POST') {
        handleBulkPriceUpdate();
    } else if (preg_match('#^/api/v1/admin/products/([^/]+)/sale-price$#', $path, $m) && ($method === 'PUT' || $method === 'POST')) {
        handleInlineProductSaleUpdate($m[1]);
    } else if (($path === '/api/v1/admin/products/reset-database-single-product' || $path === '/api/v1/admin/products/purge-all' || $path === '/api/v1/admin/products/delete-all') && $method === 'POST') {
        handleResetDatabaseToSingleDemoProduct();
    } else if (preg_match('#^/api/v1/(?:admin/)?products/([^/]+)/details$#', $path, $m)) {
        handleProductDetailsRoute($m[1]);
    } else if ($method === 'DELETE' && preg_match('#^/api/v1/(?:admin/)?products/([^/]+)$#', $path, $m)) {
        handleDeleteProduct($m[1]);
    } else if ($method === 'GET') {
        if ($path === '/api/v1/products' || $path === '/api/v1/admin/products') {
            handleGetProducts();
        } else if (preg_match('#^/api/v1/(?:admin/)?products/([^/]+)$#', $path, $m)) {
            handleGetProductBySlug($m[1]);
        } else {
            jsonError('API Route Not Found', 404);
        }
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveProduct();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/ring-size-guide' || $path === '/api/v1/admin/ring-size-guide') {
    if ($method === 'GET') {
        handleGetRingSizeGuide();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        jsonResponse(['message' => 'Ring size guide saved successfully'], 200);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/product-page-content' || str_starts_with($path, '/api/v1/product-page-content/') || $path === '/api/v1/admin/product-page-content' || str_starts_with($path, '/api/v1/admin/product-page-content/')) {
    if ($method === 'GET' || $method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleAdminProductPageContent();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/categories' || $path === '/api/v1/admin/categories') {
    if ($method === 'GET') {
        handleGetCategories();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/filters' || $path === '/api/v1/admin/filters') {
    if ($method === 'GET') {
        handleGetFilters(false);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/collections') {
    if ($method === 'GET') {
        handleGetCollections();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 5. Diamonds & Diamond Vault Routes (Step 5)
if ($path === '/api/v1/diamonds' || str_starts_with($path, '/api/v1/diamonds/') || $path === '/api/v1/admin/diamonds' || str_starts_with($path, '/api/v1/admin/diamonds/')) {
    if ($method === 'GET') {
        if ($path === '/api/v1/admin/diamonds/excel-template') {
            handleDownloadExcelTemplate();
        } else if ($path === '/api/v1/diamonds' || $path === '/api/v1/admin/diamonds') {
            handleGetDiamonds();
        } else if ($path === '/api/v1/diamonds/filters/config' || $path === '/api/v1/admin/diamonds/filters/config') {
            handleGetDiamondFilterConfig();
        } else if ($path === '/api/v1/admin/diamonds/bulk-price-rule') {
            handleGetBulkPriceRule();
        } else if (preg_match('#^/api/v1/(?:admin/)?diamonds/([^/]+)/whatsapp$#', $path, $m)) {
            handleGetWhatsAppInquiry($m[1]);
        } else if ($path === '/api/v1/admin/diamonds/import-history') {
            handleGetImportHistory();
        } else if (preg_match('#^/api/v1/(?:admin/)?diamonds/([^/]+)$#', $path, $m)) {
            handleGetDiamondById($m[1]);
        } else {
            jsonError('API Route Not Found', 404);
        }
    } else if ($method === 'POST') {
        if ($path === '/api/v1/admin/diamonds/bulk-price-adjust') {
            handleBulkPriceAdjustment();
        } else if (str_contains($path, 'excel-parse')) {
            handleParseExcelDiamonds();
        } else if (str_contains($path, 'excel-import')) {
            handleExecuteDiamondImport();
        } else if (str_contains($path, 'zip-upload')) {
            jsonResponse(['message' => 'Images matched successfully', 'matchedCount' => 0], 200);
        } else if (str_contains($path, 'wipe-all') || str_contains($path, 'clear-all')) {
            handleDeleteAllDiamonds();
        } else {
            handleSaveDiamond();
        }
    } else if ($method === 'PUT' || $method === 'PATCH') {
        handleSaveDiamond();
    } else if ($method === 'DELETE') {
        if (str_contains($path, 'clear-all') || str_contains($path, 'wipe-all') || $path === '/api/v1/admin/diamonds/all') {
            handleDeleteAllDiamonds();
        } else if (preg_match('#^/api/v1/(?:admin/)?diamonds/([^/]+)$#', $path, $m)) {
            handleDeleteDiamondById($m[1]);
        } else {
            handleDeleteAllDiamonds();
        }
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 6. Cart & Checkout Routes (Step 6)
if ($path === '/api/v1/cart') {
    if ($method === 'GET') {
        handleGetCart();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 7. Orders & Order Management Routes (Step 7)
if ($path === '/api/v1/checkout/create-order' || $path === '/api/v1/orders' || $path === '/api/v1/orders/create') {
    if ($method === 'POST') {
        handleCreatePublicOrder();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/orders' || str_starts_with($path, '/api/v1/admin/orders/')) {
    if ($path === '/api/v1/admin/orders/summary' && $method === 'GET') {
        handleGetOrderSummary();
    } else if ($path === '/api/v1/admin/orders/wipe-all' && $method === 'POST') {
        handleWipeAllOrders();
    } else if ($path === '/api/v1/admin/orders' && $method === 'GET') {
        handleGetAdminOrders();
    } else if (preg_match('#^/api/v1/admin/orders/([^/]+)(?:/status)?$#', $path, $m)) {
        if ($method === 'GET') {
            handleGetAdminOrderById($m[1]);
        } else if ($method === 'PUT' || $method === 'PATCH' || $method === 'POST') {
            handleUpdateOrder($m[1]);
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if (str_starts_with($path, '/api/v1/admin/reports/')) {
    if ($path === '/api/v1/admin/reports/export') {
        handleExportFinancialData();
    } else if (preg_match('#^/api/v1/admin/reports/order-statement/([^/]+)/pdf$#', $path, $m)) {
        handleGenerateStatementReport('order-statement', $m[1]);
    } else if (preg_match('#^/api/v1/admin/reports/payment-receipt/([^/]+)/pdf$#', $path, $m)) {
        handleGenerateStatementReport('payment-receipt', $m[1]);
    } else if (preg_match('#^/api/v1/admin/reports/invoice/([^/]+)/pdf$#', $path, $m)) {
        handleGenerateStatementReport('invoice', $m[1]);
    } else if (preg_match('#^/api/v1/admin/reports/customer-statement/([^/]+)/pdf$#', $path, $m)) {
        handleGenerateStatementReport('customer-statement', $m[1]);
    } else if ($path === '/api/v1/admin/reports/monthly-statement/pdf') {
        handleGenerateStatementReport('monthly-statement');
    } else if ($path === '/api/v1/admin/reports/yearly-statement/pdf') {
        handleGenerateStatementReport('yearly-statement');
    } else if ($path === '/api/v1/admin/reports/custom-statement/pdf') {
        handleGenerateStatementReport('custom-statement');
    } else {
        jsonError('Report Route Not Found', 404);
    }
}
if ($path === '/api/v1/admin/financial-audit-logs') {
    if ($method === 'GET') {
        handleGetFinancialAuditLogs();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}


// 8. Payments, PayPal & Financial Routes (Step 8)
if ($path === '/api/v1/payments/paypal/client-id') {
    if ($method === 'GET') {
        handleGetPublicPayPalClientId();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/payments/paypal/create-order') {
    if ($method === 'POST') {
        handleCreatePayPalOrder();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/payments/paypal/capture-order') {
    if ($method === 'POST') {
        handleCapturePayPalOrder();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/payment-methods') {
    if ($method === 'GET') {
        handleGetPaymentMethods();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/admin/payment-settings') {
    if ($method === 'GET') {
        handleGetPaymentSettings();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveSiteSettings();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 9. CMS & Content Management Routes (Step 9)
if ($path === '/api/v1/cms/pages' || str_starts_with($path, '/api/v1/cms/pages/') || $path === '/api/v1/admin/cms/pages' || str_starts_with($path, '/api/v1/admin/cms/pages/')) {
    if (preg_match('#^/api/v1/(?:admin/)?cms/pages/([^/]+)/draft$#', $path, $m)) {
        if ($method === 'POST' || $method === 'PUT') {
            handleSavePageDraft($m[1]);
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else if (preg_match('#^/api/v1/(?:admin/)?cms/pages/([^/]+)/publish$#', $path, $m)) {
        if ($method === 'POST' || $method === 'PUT') {
            handlePublishPage($m[1]);
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else if (preg_match('#^/api/v1/(?:admin/)?cms/pages/([^/]+)/revisions$#', $path, $m)) {
        if ($method === 'GET') {
            handleGetPageRevisions($m[1]);
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else if (preg_match('#^/api/v1/(?:admin/)?cms/pages/([^/]+)/restore/([^/]+)$#', $path, $m)) {
        if ($method === 'POST' || $method === 'PUT') {
            handleRestorePageRevision($m[1], $m[2]);
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else if ($method === 'GET') {
        if ($path === '/api/v1/cms/pages' || $path === '/api/v1/admin/cms/pages') {
            handleGetAllPages();
        } else if (preg_match('#^/api/v1/(?:admin/)?cms/pages/([^/]+)$#', $path, $m)) {
            handleGetPageBySlug($m[1]);
        } else {
            jsonError('API Route Not Found', 404);
        }
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSavePage();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/reviews' || str_starts_with($path, '/api/v1/reviews/') || $path === '/api/v1/admin/reviews' || str_starts_with($path, '/api/v1/admin/reviews/')) {
    if (($path === '/api/v1/admin/reviews/generate-random' || $path === '/api/v1/reviews/generate-random')) {
        handleGenerateRandomReviewsPerProduct();
    } else if ($path === '/api/v1/admin/reviews/delete-all' && $method === 'POST') {
        handleDeleteAllReviews();
    } else if ($method === 'DELETE' && preg_match('#^/api/v1/admin/reviews/([^/]+)$#', $path, $m)) {
        handleDeleteReview($m[1]);
    } else if ($method === 'GET') {
        if ($path === '/api/v1/admin/reviews') {
            handleGetAdminReviews();
        } else {
            handleGetReviews();
        }
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveReview();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/cms/menus' || $path === '/api/v1/admin/cms/menus') {
    if ($method === 'GET') {
        handleGetMenus();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        jsonResponse(['message' => 'Menu saved successfully'], 200);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/mega-menu-cards' || $path === '/api/v1/admin/mega-menu-cards') {
    if ($method === 'GET') {
        handleGetMegaMenuCards();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        jsonResponse(['message' => 'Mega menu cards updated successfully'], 200);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

if ($path === '/api/v1/settings/holiday-mode' || $path === '/api/v1/admin/settings/holiday-mode') {
    if ($method === 'GET') {
        handleGetHolidayModeStatus();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveSiteSettings();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

if ($path === '/api/v1/site-settings' || $path === '/api/v1/admin/site-settings') {
    if ($method === 'GET') {
        handleGetSiteSettings();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveSiteSettings();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

if ($path === '/api/v1/diamonds/filters/config' || $path === '/api/v1/admin/diamonds/filters/config') {
    if ($method === 'GET') {
        handleGetDiamondFilterConfig();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        handleSaveSiteSettings();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 10. Custom Requests & SEO Routes (Step 10)
if ($path === '/sitemap.xml') {
    handleGenerateSitemapXml();
}

if ($path === '/robots.txt') {
    header('Content-Type: text/plain; charset=UTF-8');
    echo "User-agent: *\nDisallow: /admin/\nDisallow: /api/\nSitemap: /sitemap.xml\n";
    exit;
}

if ($path === '/api/v1/custom-requests' || $path === '/api/v1/admin/custom-requests') {
    if ($method === 'POST') {
        handleCreateCustomRequest();
    } else if ($method === 'GET') {
        handleGetAdminCustomRequests();
    } else {
        jsonError('Method Not Allowed', 405);
    }
}
if ($path === '/api/v1/seo' || $path === '/api/v1/admin/seo') {
    if ($method === 'GET') {
        handleGenerateSitemapXml();
    } else if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        jsonResponse(['message' => 'SEO settings updated'], 200);
    } else {
        jsonError('Method Not Allowed', 405);
    }
}

// 11. Private Business Operations & ERP Hub API Routes
if (str_starts_with($path, '/api/v1/business/')) {
    if ($path === '/api/v1/business/dashboard' && $method === 'GET') {
        handleGetBusinessDashboard();
    } else if ($path === '/api/v1/business/sales') {
        if ($method === 'GET') {
            handleGetBusinessSales();
        } else if ($method === 'POST') {
            handleCreateBusinessSale();
        } else {
            jsonError('Method Not Allowed', 405);
        }
    } else if (($path === '/api/v1/business/sales/delete-all' || $path === '/api/v1/business/sales/clear') && ($method === 'POST' || $method === 'DELETE' || $method === 'GET')) {
        handleDeleteAllSales();
    } else if ($path === '/api/v1/business/sales/bulk-update' && ($method === 'POST' || $method === 'PUT' || $method === 'PATCH')) {
        handleBulkUpdateBusinessSales();
    } else if ($path === '/api/v1/business/sales/batch' && ($method === 'POST' || $method === 'DELETE')) {
        handleDeleteSalesBatch();
    } else if (preg_match('#^/api/v1/business/sales/([^/]+)$#', $path, $saleMatches)) {
        $saleId = urldecode($saleMatches[1]);
        if ($method === 'DELETE') {
            handleDeleteSaleById($saleId);
        } else if ($method === 'PUT' || $method === 'PATCH' || ($method === 'POST' && isset($_GET['_method']) && in_array(strtoupper($_GET['_method']), ['PUT', 'PATCH']))) {
            handleUpdateBusinessSale($saleId);
        } else {
            handleGetBusinessSaleDetail($saleId);
        }
    } else if ($path === '/api/v1/business/import/execute' && $method === 'POST') {
        handleExecuteSalesImport();
    } else if ($path === '/api/v1/business/employees' && $method === 'GET') {
        handleGetBusinessEmployees();
    } else if ($path === '/api/v1/business/employees' && $method === 'POST') {
        handleCreateBusinessEmployee();
    } else if ($path === '/api/v1/business/employees/batch' && ($method === 'POST' || $method === 'DELETE')) {
        handleDeleteEmployeesBatch();
    } else if (preg_match('#^/api/v1/business/employees/([^/]+)/status$#', $path, $empStatMatches) && ($method === 'PATCH' || $method === 'POST')) {
        handleToggleEmployeeStatus(urldecode($empStatMatches[1]));
    } else if (preg_match('#^/api/v1/business/employees/([^/]+)$#', $path, $empMatches)) {
        $empId = urldecode($empMatches[1]);
        if ($method === 'DELETE') {
            handleDeleteEmployeeById($empId);
        } else if ($method === 'PUT' || $method === 'PATCH' || ($method === 'POST' && isset($_GET['_method']) && in_array(strtoupper($_GET['_method']), ['PUT', 'PATCH']))) {
            handleUpdateBusinessEmployee($empId);
        } else {
            handleGetBusinessEmployeeDetail($empId);
        }
    } else if ($path === '/api/v1/business/attendance' && $method === 'GET') {
        handleGetBusinessAttendance();
    } else if ($path === '/api/v1/business/attendance/today' && $method === 'GET') {
        handleGetBusinessAttendanceToday();
    } else if (($path === '/api/v1/business/attendance/report' || $path === '/api/v1/business/attendance/monthly-report') && $method === 'GET') {
        handleGetBusinessAttendanceReport();
    } else if ($path === '/api/v1/business/attendance/mark-all-present' && ($method === 'POST' || $method === 'GET')) {
        handleMarkAllEmployeesPresentForMonth();
    } else if ($path === '/api/v1/business/attendance/check-in' && $method === 'POST') {
        handleBusinessCheckIn();
    } else if ($path === '/api/v1/business/attendance/check-out' && $method === 'POST') {
        handleBusinessCheckOut();
    } else if ($path === '/api/v1/business/attendance/manual' && $method === 'POST') {
        handleBusinessManualAttendance();
    } else if (($path === '/api/v1/business/customers/delete-all' || $path === '/api/v1/business/customers/clear') && ($method === 'POST' || $method === 'DELETE' || $method === 'GET')) {
        handleDeleteAllCustomers();
    } else if ($path === '/api/v1/business/customers/batch' && ($method === 'POST' || $method === 'DELETE')) {
        handleDeleteCustomersBatch();
    } else if (preg_match('#^/api/v1/business/customers/([^/]+)/orders$#', $path, $custOrderMatches) && $method === 'GET') {
        handleGetBusinessCustomerOrders(urldecode($custOrderMatches[1]));
    } else if (preg_match('#^/api/v1/business/customers/([^/]+)$#', $path, $custMatches) && ($method === 'DELETE' || $method === 'POST')) {
        handleDeleteCustomerById(urldecode($custMatches[1]));
    } else if ($path === '/api/v1/business/customers' && $method === 'GET') {
        handleGetBusinessCustomers();
    } else if ($path === '/api/v1/business/customers' && $method === 'POST') {
        handleCreateBusinessCustomer();
    } else if ($path === '/api/v1/business/commission-plans' && $method === 'GET') {
        handleGetBusinessCommissionPlans();
    } else if ($path === '/api/v1/business/suppliers' && $method === 'GET') {
        handleGetBusinessSuppliers();
    } else if ($path === '/api/v1/business/suppliers' && $method === 'POST') {
        handleCreateBusinessSupplier();
    } else if ($path === '/api/v1/business/commissions' && $method === 'GET') {
        handleGetBusinessCommissions();
    } else if ($path === '/api/v1/business/targets' && $method === 'GET') {
        handleGetBusinessTargets();
    } else if ($path === '/api/v1/business/targets' && $method === 'POST') {
        handleCreateBusinessTarget();
    } else if (preg_match('#^/api/v1/business/targets/([^/]+)$#', $path, $tgtMatches) && ($method === 'DELETE' || $method === 'POST')) {
        handleDeleteBusinessTarget(urldecode($tgtMatches[1]));
    } else if (($path === '/api/v1/business/audit-logs' || $path === '/api/v1/business/audit') && $method === 'GET') {
        handleGetBusinessAuditLogs();
    } else if ($path === '/api/v1/business/backups' && $method === 'GET') {
        handleGetBusinessBackups();
    } else if ($path === '/api/v1/business/backups/create' && $method === 'POST') {
        handleCreateManualBackup();
    } else if (preg_match('#^/api/v1/business/backups/([^/]+)/download$#', $path, $bkMatches) && $method === 'GET') {
        handleDownloadBusinessBackup(urldecode($bkMatches[1]));
    } else if (preg_match('#^/api/v1/business/backups/([^/]+)$#', $path, $bkMatches) && ($method === 'DELETE' || $method === 'POST')) {
        handleDeleteBusinessBackup(urldecode($bkMatches[1]));
    } else if ($path === '/api/v1/business/settings' && $method === 'GET') {
        handleGetBusinessSettings();
    } else if ($path === '/api/v1/business/settings' && ($method === 'POST' || $method === 'PUT' || $method === 'PATCH')) {
        handleUpdateBusinessSettings();
    } else if (($path === '/api/v1/business/reset' || $path === '/api/v1/business/reset-all') && ($method === 'POST' || $method === 'GET')) {
        handleResetBusinessData();
    } else {
        jsonError('Business Endpoint Not Found', 404);
    }
}

// Fallback 404 for non-existent API endpoints
if (str_starts_with($path, '/api/v1/')) {
    jsonError('API Route Not Found', 404);
}

// Non-API route fallback
jsonError('Not Found', 404);
