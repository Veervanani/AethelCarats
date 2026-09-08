"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cleanupDatabaseSiteSettings_1 = require("./cleanupDatabaseSiteSettings");
const asyncTimeout_1 = require("./utils/asyncTimeout");
// Safely attempt background cleanup with a strict timeout so it never stalls server bootstrap
(0, asyncTimeout_1.withTimeout)((0, cleanupDatabaseSiteSettings_1.cleanupDatabaseSiteSettings)(), 3000).catch((err) => {
    console.warn('Site settings background cleanup non-blocking notice:', err?.message || err);
});
const prisma_1 = __importDefault(require("./prisma"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("./middleware/auth");
const authController_1 = require("./controllers/authController");
const productController_1 = require("./controllers/productController");
const productDetailController_1 = require("./controllers/productDetailController");
const productPageContentController_1 = require("./controllers/productPageContentController");
const productBulkUploadController_1 = require("./controllers/productBulkUploadController");
const mediaController_1 = require("./controllers/mediaController");
const diamondController_1 = require("./controllers/diamondController");
const excelImportController_1 = require("./controllers/excelImportController");
const cmsController_1 = require("./controllers/cmsController");
const diamondFilterController_1 = require("./controllers/diamondFilterController");
const filterController_1 = require("./controllers/filterController");
const promotionController_1 = require("./controllers/promotionController");
const siteSettingController_1 = require("./controllers/siteSettingController");
const heroBannerController_1 = require("./controllers/heroBannerController");
const customRequestController_1 = require("./controllers/customRequestController");
const seoController_1 = require("./controllers/seoController");
const orderController_1 = require("./controllers/orderController");
const paymentController_1 = require("./controllers/paymentController");
const refundController_1 = require("./controllers/refundController");
const statementController_1 = require("./controllers/statementController");
const paymentSettingsController_1 = require("./controllers/paymentSettingsController");
const paypalController_1 = require("./controllers/paypalController");
process.on('uncaughtException', (err) => {
    console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL UNHANDLED REJECTION:', reason);
});
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cors_1.default)());
// Transparently handle legacy PHP URL formats (/api/index.php/v1/* -> /api/v1/*)
app.use((req, res, next) => {
    if (req.url.startsWith('/api/index.php/')) {
        req.url = req.url.replace('/api/index.php/', '/api/');
    }
    else if (req.url === '/api/index.php') {
        req.url = '/api/v1/health';
    }
    next();
});
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '100mb' }));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Dynamic static file resolution for /uploads across all candidate directories
const candidateUploadDirs = [
    path_1.default.join(process.cwd(), 'uploads'),
    path_1.default.join(process.cwd(), 'backend', 'uploads'),
    path_1.default.join(process.cwd(), 'frontend', 'public', 'uploads'),
    path_1.default.join(process.cwd(), 'frontend', 'dist', 'uploads'),
    path_1.default.join(__dirname, '..', 'uploads'),
    path_1.default.join(__dirname, '..', '..', 'uploads'),
];
app.use('/uploads', (req, res, next) => {
    const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
    for (const dir of candidateUploadDirs) {
        const filePath = path_1.default.join(dir, cleanSubpath);
        if (fs_1.default.existsSync(filePath) && fs_1.default.statSync(filePath).isFile()) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            res.set('Cache-Control', 'public, max-age=86400');
            return res.sendFile(filePath);
        }
    }
    return next();
});
// Dynamic static file resolution for /assets across all candidate directories
const candidateAssetDirs = [
    path_1.default.join(process.cwd(), 'frontend', 'dist', 'assets'),
    path_1.default.join(process.cwd(), 'frontend', 'public', 'assets'),
    path_1.default.join(process.cwd(), 'public', 'assets'),
    path_1.default.join(process.cwd(), 'assets'),
    path_1.default.join(__dirname, '..', 'frontend', 'public', 'assets'),
    path_1.default.join(__dirname, '..', 'assets'),
];
app.use('/assets', (req, res, next) => {
    const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
    for (const dir of candidateAssetDirs) {
        const filePath = path_1.default.join(dir, cleanSubpath);
        if (fs_1.default.existsSync(filePath) && fs_1.default.statSync(filePath).isFile()) {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            res.set('Cache-Control', 'public, max-age=604800');
            return res.sendFile(filePath);
        }
    }
    return next();
});
// Health Check Endpoints for Cloud Run & Load Balancers
app.get(['/healthz', '/_health', '/ping'], (req, res) => {
    res.status(200).send('OK');
});
// Public Storefront & Admin Endpoints
app.get('/api/v1/hero-banners', heroBannerController_1.getPublicHeroBanners);
app.get('/api/v1/admin/hero-banners', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), heroBannerController_1.getAdminHeroBanners);
app.post('/api/v1/admin/hero-banners', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), heroBannerController_1.createHeroBanner);
app.put('/api/v1/admin/hero-banners/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), heroBannerController_1.updateHeroBanner);
app.delete('/api/v1/admin/hero-banners/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), heroBannerController_1.deleteHeroBanner);
app.post('/api/v1/admin/hero-banners/reorder', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), heroBannerController_1.reorderHeroBanners);
app.post('/api/v1/admin/hero-banners/upload-image', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), heroBannerController_1.uploadHeroBannerImage);
app.get('/api/v1/products', productController_1.getProducts);
app.get('/api/v1/admin/products/:id', productController_1.getProductById);
app.get('/api/v1/products/by-id/:id', productController_1.getProductById);
app.get('/api/v1/products/:slug', productController_1.getProductBySlug);
app.post('/api/v1/products/:productId/calculate-price', productController_1.calculateServerSidePrice);
app.get('/api/v1/categories', productController_1.getCategories);
app.get('/api/v1/collections', productController_1.getCollections);
app.get('/api/v1/ring-size-guide', productController_1.getRingSizeGuide);
app.get('/api/v1/diamonds', diamondController_1.getDiamonds);
app.get('/api/v1/filters', filterController_1.getPublicFilters);
app.get('/api/v1/admin/filters', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.getAdminFilters);
app.post('/api/v1/admin/filters', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.createFilterConfig);
app.put('/api/v1/admin/filters/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.updateFilterConfig);
app.delete('/api/v1/admin/filters/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.deleteFilterConfig);
app.post('/api/v1/admin/filters/:id/options', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.createFilterOption);
app.put('/api/v1/admin/filters/options/:optionId', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.updateFilterOption);
app.delete('/api/v1/admin/filters/options/:optionId', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.deleteFilterOption);
app.get('/api/v1/diamonds/wipe-all-now', diamondController_1.deleteAllDiamonds);
app.get('/api/v1/admin/diamonds/wipe-all-now', diamondController_1.deleteAllDiamonds);
app.get('/api/v1/diamonds/filters/config', diamondController_1.getDiamondFilterConfig);
app.get('/api/v1/diamonds/:id', diamondController_1.getDiamondById);
app.get('/api/v1/diamonds/:id/whatsapp', diamondController_1.getWhatsAppInquiryMessage);
app.get('/api/v1/cms/pages', cmsController_1.getAllPages);
app.get('/api/v1/cms/pages/:slug', cmsController_1.getPageBySlug);
app.get('/api/v1/cms/menus', cmsController_1.getMenus);
const holidayMode_1 = require("./middleware/holidayMode");
const reviewController_1 = require("./controllers/reviewController");
const holidayModeController_1 = require("./controllers/holidayModeController");
app.get('/api/v1/store-status', holidayModeController_1.getStoreStatus);
app.get('/api/v1/admin/holiday-mode', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), holidayModeController_1.getHolidayModeSettings);
app.post('/api/v1/admin/holiday-mode', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), holidayModeController_1.updateHolidayModeSettings);
// Orders & Financial System Endpoints (Protected by Auth & Role Permissions)
const financeRoles = ['ORDER_MANAGER', 'ADMIN', 'SUPER_ADMIN'];
app.get('/api/v1/admin/orders/summary', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.getOrderSummaryMetrics);
app.get('/api/v1/admin/orders', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.getOrders);
app.get('/api/v1/admin/orders/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.getOrderById);
app.post('/api/v1/admin/orders', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.createOrder);
app.put('/api/v1/admin/orders/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.updateOrder);
app.delete('/api/v1/admin/orders/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.deleteOrder);
app.post('/api/v1/admin/orders/wipe-all', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), orderController_1.wipeAllOrders);
app.get('/api/v1/admin/payments', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.getPayments);
app.post('/api/v1/admin/payments', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.createPayment);
app.put('/api/v1/admin/payments/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.updatePayment);
app.post('/api/v1/admin/payments/:id/void', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.voidPayment);
app.get('/api/v1/admin/payment-methods', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.getPaymentMethods);
app.post('/api/v1/admin/payment-methods', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.createPaymentMethod);
app.put('/api/v1/admin/payment-methods/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.updatePaymentMethod);
app.delete('/api/v1/admin/payment-methods/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentController_1.deletePaymentMethod);
app.get('/api/v1/admin/refunds', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), refundController_1.getRefunds);
app.post('/api/v1/admin/refunds', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), refundController_1.createRefund);
app.get('/api/v1/admin/customers', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getCustomersWithFinancials);
app.get('/api/v1/admin/customers/:id', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getCustomerDetailWithLedger);
app.get('/api/v1/admin/reports/order-statement/:orderId/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getOrderStatementPdf);
app.get('/api/v1/admin/reports/payment-receipt/:paymentId/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getPaymentReceiptPdf);
app.get('/api/v1/admin/reports/invoice/:orderId/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getOrderInvoicePdf);
app.get('/api/v1/admin/reports/customer-statement/:customerId/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getCustomerStatementPdf);
app.get('/api/v1/admin/reports/monthly-statement/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getMonthlyStatementPdf);
app.get('/api/v1/admin/reports/yearly-statement/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getYearlyStatementPdf);
app.get('/api/v1/admin/reports/custom-statement/pdf', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getCustomStatementPdf);
app.get('/api/v1/admin/reports/export', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.exportData);
app.get('/api/v1/admin/financial-audit-logs', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), statementController_1.getFinancialAuditLogs);
app.get('/api/v1/admin/payment-settings', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentSettingsController_1.getPaymentSettings);
app.post('/api/v1/admin/payment-settings', auth_1.authenticateToken, (0, auth_1.requireRole)([...financeRoles]), paymentSettingsController_1.updatePaymentSettings);
// Order & Payment routes protected by requireStoreOpenForOrders
app.get('/api/v1/orders/track', orderController_1.trackPublicOrder);
app.get('/api/v1/orders/my-orders', orderController_1.getOrdersByCustomerEmail);
app.post('/api/v1/checkout/create-order', holidayMode_1.requireStoreOpenForOrders, orderController_1.createPublicOrder);
app.get('/api/v1/payments/config', paymentSettingsController_1.getPublicPaymentConfig);
app.get('/api/v1/payments/methods', paymentController_1.getPublicPaymentMethods);
app.get('/api/v1/payments/paypal/client-id', paypalController_1.getPublicPayPalClientId);
app.post('/api/v1/payments/paypal/create-order', holidayMode_1.requireStoreOpenForOrders, paypalController_1.createPayPalOrder);
app.post('/api/v1/payments/paypal/capture-order', holidayMode_1.requireStoreOpenForOrders, paypalController_1.capturePayPalOrder);
app.post('/api/v1/orders', holidayMode_1.requireStoreOpenForOrders);
app.post('/api/v1/checkout', holidayMode_1.requireStoreOpenForOrders);
app.post('/api/v1/orders/create', holidayMode_1.requireStoreOpenForOrders);
app.post('/api/v1/payments/create', holidayMode_1.requireStoreOpenForOrders);
app.post('/api/v1/custom-requests', holidayMode_1.requireStoreOpenForOrders, customRequestController_1.createCustomRequest);
app.get('/api/v1/seo', seoController_1.getSeoMetadata);
app.get('/sitemap.xml', seoController_1.generateSitemapXml);
app.get('/robots.txt', seoController_1.generateRobotsTxt);
// Auth Routes
app.post('/api/v1/auth/login', authController_1.loginAdmin);
app.post('/api/v1/auth/register', authController_1.registerUser);
app.post('/api/v1/admin/auth/login', authController_1.loginAdmin);
app.get('/api/v1/auth/me', auth_1.authenticateToken, authController_1.getCurrentUser);
app.get('/api/v1/admin/auth/me', auth_1.authenticateToken, authController_1.getCurrentUser);
app.get('/api/v1/admin/logs', auth_1.authenticateToken, (0, auth_1.requireRole)(['ADMIN', 'SUPER_ADMIN']), authController_1.getActivityLogs);
// Admin User & Role Management
app.get('/api/v1/admin/users', auth_1.authenticateToken, (0, auth_1.requireRole)(['ADMIN', 'SUPER_ADMIN']), authController_1.getAdminUsers);
app.patch('/api/v1/admin/users/:userId/role', auth_1.authenticateToken, (0, auth_1.requireRole)(['ADMIN', 'SUPER_ADMIN']), authController_1.updateUserRole);
// Admin Product & Category Management
app.post('/api/v1/admin/products', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), productController_1.createProduct);
app.put('/api/v1/admin/products/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), productController_1.updateProduct);
app.delete('/api/v1/admin/products/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), productController_1.deleteProduct);
app.post('/api/v1/admin/products/:id/duplicate', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), productController_1.duplicateProduct);
app.get('/api/v1/admin/products/:productId/details', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productDetailController_1.getProductDetails);
app.post('/api/v1/admin/products/:productId/details', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productDetailController_1.saveProductDetails);
app.get('/api/v1/products/:productId/details', productDetailController_1.getProductDetails);
// Admin & Public Product Page Content Routes
app.get('/api/v1/admin/product-page-content', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), productPageContentController_1.getAdminProductPageContent);
app.put('/api/v1/admin/product-page-content', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), productPageContentController_1.saveAdminProductPageContent);
app.post('/api/v1/admin/product-page-content', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), productPageContentController_1.saveAdminProductPageContent);
app.get('/api/v1/product-page-content/:productId', productPageContentController_1.getStorefrontProductPageContent);
app.get('/api/v1/product-page-content', productPageContentController_1.getStorefrontProductPageContent);
// Admin Bulk Product Upload & Direct PC Media Upload
app.get('/api/v1/admin/products/bulk-upload/template', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productBulkUploadController_1.downloadProductImportTemplate);
app.post('/api/v1/admin/products/bulk-upload/validate', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.fields([{ name: 'excelFile', maxCount: 1 }, { name: 'mediaZip', maxCount: 1 }]), productBulkUploadController_1.validateProductBulkUpload);
app.post('/api/v1/admin/products/bulk-upload/execute', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.fields([{ name: 'excelFile', maxCount: 1 }, { name: 'mediaZip', maxCount: 1 }]), productBulkUploadController_1.executeProductBulkUpload);
app.post('/api/v1/admin/products/bulk-upload/error-report', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productBulkUploadController_1.downloadBulkImportErrorReport);
app.post('/api/v1/admin/products/reset-database-single-product', auth_1.authenticateToken, productController_1.resetDatabaseToSingleDemoProduct);
// Central Media Management, Persistent Local Uploads, and File Deletion
app.get('/api/v1/media', mediaController_1.getAllMedia);
app.get('/api/v1/admin/media', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), mediaController_1.getAllMedia);
app.post('/api/v1/admin/media', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), mediaController_1.uploadMedia);
app.delete('/api/v1/admin/media/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), mediaController_1.deleteMedia);
app.post('/api/v1/admin/media/upload', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), upload.any(), mediaController_1.uploadMediaFiles);
app.post('/api/v1/admin/upload', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), upload.any(), mediaController_1.uploadMediaFiles);
app.post('/api/v1/upload', auth_1.authenticateToken, upload.any(), mediaController_1.uploadMediaFiles);
app.post('/api/v1/admin/media/delete-file', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), mediaController_1.deleteUploadedMediaFile);
app.delete('/api/v1/admin/media/file', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), mediaController_1.deleteUploadedMediaFile);
// Enforce default admin users and single demo product state on startup
(0, authController_1.ensureDefaultAdminUsersExist)().catch(console.error);
(0, productController_1.ensureSingleDemoProductEnforced)().catch(console.error);
app.post('/api/v1/admin/categories', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), productController_1.createCategory);
app.put('/api/v1/admin/categories/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), productController_1.updateCategory);
app.delete('/api/v1/admin/categories/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), productController_1.deleteCategory);
// Admin Customer-Specific Pricing
app.get('/api/v1/admin/customer-prices', auth_1.authenticateToken, productController_1.getCustomerPrices);
app.post('/api/v1/admin/customer-prices', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productController_1.upsertCustomerSpecificPrice);
app.delete('/api/v1/admin/customer-prices/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productController_1.deleteCustomerSpecificPrice);
// Admin Ring Size Guide CMS
app.get('/api/v1/admin/ring-size-guide', auth_1.authenticateToken, productController_1.getRingSizeGuide);
app.post('/api/v1/admin/ring-size-guide', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productController_1.updateRingSizeGuide);
app.put('/api/v1/admin/ring-size-guide', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), productController_1.updateRingSizeGuide);
// Admin Diamond & Excel Importer
app.post('/api/v1/admin/diamonds', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondController_1.createDiamond);
app.put('/api/v1/admin/diamonds/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondController_1.updateDiamond);
app.post('/api/v1/admin/diamonds/:id/duplicate', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondController_1.duplicateDiamond);
app.delete('/api/v1/admin/diamonds/all', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), diamondController_1.deleteAllDiamonds);
app.post('/api/v1/admin/diamonds/wipe-all', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), diamondController_1.deleteAllDiamonds);
app.get('/api/v1/admin/diamonds/wipe-all-now', diamondController_1.deleteAllDiamonds);
app.delete('/api/v1/admin/diamonds/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), diamondController_1.deleteDiamond);
app.post('/api/v1/admin/diamonds/filters/config', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondController_1.updateDiamondFilterConfig);
app.get('/api/v1/admin/diamonds/excel-template', auth_1.authenticateToken, excelImportController_1.downloadExcelTemplate);
app.post('/api/v1/admin/diamonds/excel-parse', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), upload.single('file'), excelImportController_1.parseAndValidateExcel);
app.post('/api/v1/admin/diamonds/excel-import', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), excelImportController_1.executeDiamondImport);
app.post('/api/v1/admin/diamonds/zip-upload', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), upload.single('file'), excelImportController_1.extractAndMatchZipImages);
app.get('/api/v1/admin/diamonds/import-history', auth_1.authenticateToken, excelImportController_1.getImportHistory);
app.patch('/api/v1/admin/diamonds/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondController_1.updateDiamondStatus);
// Public & Admin CMS & Page Builder
app.get('/api/v1/pages/:slug', cmsController_1.getPageBySlug);
app.post('/api/v1/admin/cms/pages-create', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.createPage);
app.get('/api/v1/admin/cms/pages/:slug', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.getPageBySlug);
app.delete('/api/v1/admin/cms/pages/:slug', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.deletePage);
app.post('/api/v1/admin/cms/pages/:slug', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.updatePageSections);
app.post('/api/v1/admin/cms/pages/:slug/draft', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.savePageDraft);
app.post('/api/v1/admin/cms/pages/:slug/publish', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.publishPage);
app.get('/api/v1/admin/cms/pages/:slug/revisions', auth_1.authenticateToken, cmsController_1.getPageRevisions);
app.post('/api/v1/admin/cms/pages/:slug/restore/:revisionId', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.restorePageRevision);
app.get('/api/v1/admin/cms/menus', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.getMenus);
app.post('/api/v1/admin/cms/menus/:location', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), cmsController_1.updateMenu);
// Public & Admin FAQ Routes
app.get('/api/v1/faqs', cmsController_1.getFaqs);
app.get('/api/v1/admin/faqs', auth_1.authenticateToken, cmsController_1.getFaqs);
app.post('/api/v1/admin/faqs', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.createFaq);
app.put('/api/v1/admin/faqs/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.updateFaq);
app.delete('/api/v1/admin/faqs/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.deleteFaq);
// Public & Admin Blog Routes
app.get('/api/v1/blog', cmsController_1.getBlogPosts);
app.get('/api/v1/blog/:slug', cmsController_1.getBlogPostBySlug);
app.get('/api/v1/admin/blog', auth_1.authenticateToken, cmsController_1.getBlogPosts);
app.post('/api/v1/admin/blog', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.createBlogPost);
app.put('/api/v1/admin/blog/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.updateBlogPost);
app.delete('/api/v1/admin/blog/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.deleteBlogPost);
// Public & Admin Filter Management Routes
app.get('/api/v1/filters', filterController_1.getPublicFilters);
app.get('/api/v1/admin/filters', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.getAdminFilters);
app.post('/api/v1/admin/filters', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.createFilterConfig);
app.put('/api/v1/admin/filters/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.updateFilterConfig);
app.delete('/api/v1/admin/filters/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.deleteFilterConfig);
app.post('/api/v1/admin/filters/:id/options', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.createFilterOption);
app.put('/api/v1/admin/filters/options/:optionId', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.updateFilterOption);
app.delete('/api/v1/admin/filters/options/:optionId', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), filterController_1.deleteFilterOption);
// Public & Admin Dedicated Diamond Filter Management Routes
app.get('/api/v1/diamond-filters', diamondFilterController_1.getDiamondFilters);
app.put('/api/v1/admin/diamond-filters/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondFilterController_1.updateDiamondFilterGroup);
app.post('/api/v1/admin/diamond-filter-options', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondFilterController_1.createDiamondFilterOption);
app.put('/api/v1/admin/diamond-filter-options/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondFilterController_1.updateDiamondFilterOption);
app.delete('/api/v1/admin/diamond-filter-options/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['PRODUCT_MANAGER', 'ADMIN']), diamondFilterController_1.deleteDiamondFilterOption);
// Public & Admin Reviews Management Routes
app.get('/api/v1/reviews', reviewController_1.getPublicReviews);
app.get('/api/v1/admin/reviews', auth_1.authenticateToken, reviewController_1.getAdminReviews);
app.post('/api/v1/admin/reviews', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), reviewController_1.createReview);
app.put('/api/v1/admin/reviews/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), reviewController_1.updateReview);
app.delete('/api/v1/admin/reviews/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), reviewController_1.deleteReview);
// Public & Admin Mega Menu Cards Routes
app.get('/api/v1/mega-menu-cards', cmsController_1.getMegaMenuCards);
app.post('/api/v1/admin/mega-menu-cards', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.createMegaMenuCard);
app.put('/api/v1/admin/mega-menu-cards/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.updateMegaMenuCard);
app.delete('/api/v1/admin/mega-menu-cards/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), cmsController_1.deleteMegaMenuCard);
// Public & Admin Promotion & Banner Routes
app.get('/api/v1/promotions', promotionController_1.getPromotions);
app.post('/api/v1/admin/promotions', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), promotionController_1.createPromotion);
app.put('/api/v1/admin/promotions/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), promotionController_1.updatePromotion);
app.delete('/api/v1/admin/promotions/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), promotionController_1.deletePromotion);
const settingController_1 = require("./controllers/settingController");
// Public & Admin Site Setting Routes
app.get('/api/v1/settings/holiday-mode', settingController_1.getHolidayModeStatus);
app.put('/api/v1/admin/settings/holiday-mode', auth_1.authenticateToken, (0, auth_1.requireRole)(['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER']), settingController_1.updateHolidayModeStatus);
app.get('/api/v1/site-settings', siteSettingController_1.getSiteSettings);
app.get('/api/v1/site-settings/:key', siteSettingController_1.getSiteSettings);
app.post('/api/v1/admin/site-settings', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), siteSettingController_1.updateSiteSetting);
app.put('/api/v1/admin/site-settings', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), siteSettingController_1.updateSiteSetting);
app.put('/api/v1/admin/site-settings/:key', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), siteSettingController_1.updateSiteSetting);
// Public & Admin Media Library Routes
app.get('/api/v1/media', mediaController_1.getAllMedia);
app.post('/api/v1/admin/media', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), mediaController_1.uploadMedia);
app.delete('/api/v1/admin/media/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), mediaController_1.deleteMedia);
// Admin Custom Jewellery CAD Workflow
app.get('/api/v1/admin/custom-requests', auth_1.authenticateToken, customRequestController_1.getCustomRequests);
app.patch('/api/v1/admin/custom-requests/:id', auth_1.authenticateToken, customRequestController_1.updateCustomRequestStatus);
// Admin SEO & Redirects
app.post('/api/v1/admin/seo', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), seoController_1.updateSeoMetadata);
app.get('/api/v1/admin/redirects', auth_1.authenticateToken, seoController_1.getRedirects);
app.post('/api/v1/admin/redirects', auth_1.authenticateToken, (0, auth_1.requireRole)(['CONTENT_MANAGER', 'ADMIN']), seoController_1.createRedirect);
// ============================================================
// PRIVATE INTERNAL BUSINESS MANAGEMENT REST APIS (/api/v1/business/...)
// ============================================================
const auth_2 = require("./middleware/auth");
const businessEmployeeController_1 = require("./controllers/businessEmployeeController");
const businessAttendanceController_1 = require("./controllers/businessAttendanceController");
const businessSalesController_1 = require("./controllers/businessSalesController");
const businessCommissionController_1 = require("./controllers/businessCommissionController");
const businessDashboardController_1 = require("./controllers/businessDashboardController");
const businessTargetController_1 = require("./controllers/businessTargetController");
const businessSupplierController_1 = require("./controllers/businessSupplierController");
const businessCustomerController_1 = require("./controllers/businessCustomerController");
const businessImportController_1 = require("./controllers/businessImportController");
const businessAuditController_1 = require("./controllers/businessAuditController");
// Dashboard Metrics
app.get('/api/v1/business/dashboard', auth_1.authenticateToken, auth_2.requireBusinessRole, businessDashboardController_1.getBusinessDashboardMetrics);
// Employees
app.get('/api/v1/business/employees', auth_1.authenticateToken, auth_2.requireBusinessRole, businessEmployeeController_1.getEmployees);
app.get('/api/v1/business/employees/:id', auth_1.authenticateToken, auth_2.requireBusinessRole, businessEmployeeController_1.getEmployeeById);
app.post('/api/v1/business/employees', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessEmployeeController_1.createEmployee);
app.put('/api/v1/business/employees/:id', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessEmployeeController_1.updateEmployee);
app.patch('/api/v1/business/employees/:id/status', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessEmployeeController_1.toggleEmployeeStatus);
// Attendance
app.get('/api/v1/business/attendance', auth_1.authenticateToken, auth_2.requireBusinessRole, businessAttendanceController_1.getAttendanceList);
app.get('/api/v1/business/attendance/today', auth_1.authenticateToken, auth_2.requireBusinessRole, businessAttendanceController_1.getTodayAttendanceSummary);
app.post('/api/v1/business/attendance/check-in', auth_1.authenticateToken, auth_2.requireBusinessRole, businessAttendanceController_1.employeeCheckIn);
app.post('/api/v1/business/attendance/check-out', auth_1.authenticateToken, auth_2.requireBusinessRole, businessAttendanceController_1.employeeCheckOut);
app.post('/api/v1/business/attendance/manual', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessAttendanceController_1.manualAttendanceEntry);
app.get('/api/v1/business/attendance/monthly-report', auth_1.authenticateToken, auth_2.requireBusinessRole, businessAttendanceController_1.getMonthlyAttendanceReport);
// Sales & Calculations
app.get('/api/v1/business/sales', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSalesController_1.getSalesList);
app.get('/api/v1/business/sales/:id', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSalesController_1.getSaleById);
app.post('/api/v1/business/sales', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSalesController_1.createSale);
app.put('/api/v1/business/sales/:id', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSalesController_1.updateSale);
app.delete('/api/v1/business/sales/:id', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessSalesController_1.deleteSale);
app.post('/api/v1/business/sales/calculate-preview', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSalesController_1.calculateSalesPreview);
// Commissions
app.get('/api/v1/business/commissions', auth_1.authenticateToken, auth_2.requireBusinessRole, businessCommissionController_1.getCommissionsList);
app.post('/api/v1/business/commissions/:id/approve', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessCommissionController_1.approveCommission);
app.post('/api/v1/business/commissions/:id/pay', auth_1.authenticateToken, auth_2.requireAccountantOrAdmin, businessCommissionController_1.payCommission);
app.get('/api/v1/business/commission-plans', auth_1.authenticateToken, auth_2.requireBusinessRole, businessCommissionController_1.getCommissionPlans);
app.post('/api/v1/business/commission-plans', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessCommissionController_1.createCommissionPlan);
app.put('/api/v1/business/commission-plans/:id', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessCommissionController_1.updateCommissionPlan);
// Targets
app.get('/api/v1/business/targets', auth_1.authenticateToken, auth_2.requireBusinessRole, businessTargetController_1.getSalesTargets);
app.post('/api/v1/business/targets', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessTargetController_1.createSalesTarget);
app.put('/api/v1/business/targets/:id', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessTargetController_1.updateSalesTarget);
// Suppliers
app.get('/api/v1/business/suppliers', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSupplierController_1.getSuppliers);
app.post('/api/v1/business/suppliers', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSupplierController_1.createSupplier);
app.put('/api/v1/business/suppliers/:id', auth_1.authenticateToken, auth_2.requireBusinessRole, businessSupplierController_1.updateSupplier);
// Customers
app.get('/api/v1/business/customers', auth_1.authenticateToken, auth_2.requireBusinessRole, businessCustomerController_1.getBusinessCustomers);
app.post('/api/v1/business/customers/check-duplicate', auth_1.authenticateToken, auth_2.requireBusinessRole, businessCustomerController_1.checkDuplicateCustomer);
app.post('/api/v1/business/customers', auth_1.authenticateToken, auth_2.requireBusinessRole, businessCustomerController_1.createBusinessCustomer);
// Excel Sales Tracker Import
app.post('/api/v1/business/import/validate', auth_1.authenticateToken, auth_2.requireBusinessAdmin, upload.single('file'), businessImportController_1.validateSalesExcelImport);
app.post('/api/v1/business/import/execute', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessImportController_1.executeSalesExcelImport);
// Audit Logs
app.get('/api/v1/business/audit-logs', auth_1.authenticateToken, auth_2.requireBusinessAdmin, businessAuditController_1.getBusinessAuditLogs);
// Real-Time Database Connection Diagnostic Endpoint
app.get('/api/v1/health', async (req, res) => {
    const rawDbUrl = (process.env.DATABASE_URL || '').trim();
    const maskedDbUrl = rawDbUrl.replace(/:([^:@]+)@/, ':****@');
    const envHost = process.env.DB_HOST || (process.platform === 'linux' ? '127.0.0.1' : 'srv844.hstgr.io');
    const envName = process.env.DB_NAME || 'u707945653_aethelcarats';
    const envUser = process.env.DB_USER || 'u707945653_admin';
    try {
        // Enforce strict 2500ms timeout on DB queries so Nginx 504 Gateway Timeout NEVER occurs
        const queryPromise = Promise.all([
            prisma_1.default.user.count(),
            prisma_1.default.diamond.count(),
            prisma_1.default.product.count(),
            prisma_1.default.category.count().catch(() => null),
            prisma_1.default.order.count().catch(() => null),
        ]);
        const [userCount, diamondCount, productCount, categoryCount, orderCount] = await (0, asyncTimeout_1.withTimeout)(queryPromise, 2500, new Error(`Database query timed out after 2500ms. Could not reach MySQL server at "${envHost}:3306".`));
        res.json({
            status: 'ok',
            database: 'connected',
            engine: 'Node.js Express + Native Pure JS MySQL2 Pool / MySQL',
            nodeVersion: process.version,
            connection: {
                host: envHost,
                databaseName: envName,
                user: envUser,
                activeUrl: maskedDbUrl,
            },
            catalogSummary: {
                userCount,
                diamondCount,
                productCount,
                categoryCount,
                orderCount,
            },
            message: 'Database connection is verified and healthy!',
            timestamp: new Date().toISOString(),
        });
    }
    catch (err) {
        console.error('Database Health Check Failed:', err);
        // Run parallel fast TCP reachability tests (< 800ms) to detect why connection failed
        const [activeTcp, loopbackTcp, remoteTcp] = await Promise.all([
            (0, asyncTimeout_1.checkTcpPort)(envHost, 3306, 800),
            (0, asyncTimeout_1.checkTcpPort)('127.0.0.1', 3306, 800),
            (0, asyncTimeout_1.checkTcpPort)('srv844.hstgr.io', 3306, 800),
        ]);
        const errMsg = err.message || String(err);
        let suggestion = 'Check your MySQL server status and credentials.';
        if (errMsg.includes('timed out') || !activeTcp.reachable) {
            if (remoteTcp.reachable) {
                suggestion = `TCP to "${envHost}" failed, but Hostinger MySQL host "srv844.hstgr.io" IS reachable! Change DB_HOST to "srv844.hstgr.io" and click Create in Remote MySQL.`;
            }
            else {
                suggestion = `TCP to "${envHost}:3306" is not responding. On Hostinger, ensure Remote MySQL is enabled in hPanel (Databases > Remote MySQL > add "%" for database "${envName}").`;
            }
        }
        else if (errMsg.includes('Access denied') || errMsg.includes('Authentication failed')) {
            suggestion = `Database authentication failed for user "${envUser}". In Hostinger hPanel > Databases > Remote MySQL, select "${envName}", check "Any Host" (%), and click Create. Also verify password in hPanel.`;
        }
        else if (errMsg.includes('ECONNREFUSED') || errMsg.includes('refused')) {
            suggestion = `Connection refused at "${envHost}". If on Hostinger container, use "auth-db844.hstgr.io" with Remote MySQL enabled.`;
        }
        else if (errMsg.includes('protocol') || errMsg.includes('mysql://')) {
            suggestion = 'DATABASE_URL format error. Ensure the URL starts with mysql:// without quotation marks.';
        }
        else if (errMsg.includes('Unknown database')) {
            suggestion = `Database "${envName}" does not exist. Verify the database name in Hostinger MySQL management.`;
        }
        // Return HTTP 200 with status: "error" so Nginx NEVER intercepts or returns a 504 page
        res.status(200).json({
            status: 'error',
            database: 'disconnected',
            error: errMsg,
            errorCode: err.code || err.name || (errMsg.includes('timed out') ? 'CONNECTION_TIMEOUT' : 'UNKNOWN_ERROR'),
            diagnostics: {
                attemptedHost: envHost,
                attemptedDatabase: envName,
                attemptedUser: envUser,
                maskedUrl: maskedDbUrl,
                nodeVersion: process.version,
                tcpProbes: {
                    configuredHost: activeTcp,
                    loopback127: loopbackTcp,
                    hostingerRemoteHost: remoteTcp,
                },
                envVarsConfigured: Object.keys(process.env).filter((k) => ['DATABASE_URL', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PORT', 'PORT'].includes(k)),
            },
            troubleshootingTip: suggestion,
            timestamp: new Date().toISOString(),
        });
    }
});
const isDirectRun = process.env.IS_BACKEND_STANDALONE === 'true' || (process.argv[1] && process.argv[1].endsWith('backend/dist/server.js'));
if (isDirectRun) {
    app.listen(PORT, () => {
        console.log(`✨ AethelCarats REST API running on port ${PORT}`);
    });
}
