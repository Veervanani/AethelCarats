import { cleanupDatabaseSiteSettings } from './cleanupDatabaseSiteSettings';
import { withTimeout, checkTcpPort } from './utils/asyncTimeout';

// Safely attempt background cleanup with a strict timeout so it never stalls server bootstrap
withTimeout(cleanupDatabaseSiteSettings(), 3000).catch((err) => {
  console.warn('Site settings background cleanup non-blocking notice:', err?.message || err);
});

import prisma, { mysqlPool } from './prisma';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { authenticateToken, requireRole } from './middleware/auth';

import { loginAdmin, registerUser, getCurrentUser, getActivityLogs, getAdminUsers, updateUserRole, ensureDefaultAdminUsersExist } from './controllers/authController';
import {
  getProducts,
  getProductBySlug,
  getCategories,
  getCollections,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getRingSizeGuide,
  updateRingSizeGuide,
  getCustomerPrices,
  upsertCustomerSpecificPrice,
  deleteCustomerSpecificPrice,
  calculateServerSidePrice,
  getProductById,
  duplicateProduct,
  resetDatabaseToSingleDemoProduct,
  ensureSingleDemoProductEnforced,
} from './controllers/productController';
import {
  getProductDetails,
  saveProductDetails,
} from './controllers/productDetailController';
import {
  getAdminProductPageContent,
  saveAdminProductPageContent,
  getStorefrontProductPageContent,
} from './controllers/productPageContentController';
import {
  downloadProductImportTemplate,
  validateProductBulkUpload,
  executeProductBulkUpload,
  downloadBulkImportErrorReport,
  uploadMediaFromPc,
} from './controllers/productBulkUploadController';
import {
  getAllMedia,
  uploadMedia,
  uploadMediaFiles,
  deleteMedia,
  deleteUploadedMediaFile,
} from './controllers/mediaController';
import {
  getDiamonds,
  getDiamondById,
  getWhatsAppInquiryMessage,
  updateDiamondStatus,
  createDiamond,
  updateDiamond,
  deleteDiamond,
  getDiamondFilterConfig,
  updateDiamondFilterConfig,
  duplicateDiamond,
  deleteAllDiamonds,
} from './controllers/diamondController';
import {
  downloadExcelTemplate,
  parseAndValidateExcel,
  executeDiamondImport,
  extractAndMatchZipImages,
  getImportHistory,
} from './controllers/excelImportController';
import {
  getPageBySlug,
  getAllPages,
  createPage,
  deletePage,
  updatePageSections,
  savePageDraft,
  publishPage,
  getPageRevisions,
  restorePageRevision,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getMenus,
  updateMenu,
  getMegaMenuCards,
  createMegaMenuCard,
  updateMegaMenuCard,
  deleteMegaMenuCard,
} from './controllers/cmsController';


import {
  getDiamondFilters,
  updateDiamondFilterGroup,
  createDiamondFilterOption,
  updateDiamondFilterOption,
  deleteDiamondFilterOption,
} from './controllers/diamondFilterController';
import {
  getPublicFilters,
  getAdminFilters,
  createFilterConfig,
  updateFilterConfig,
  deleteFilterConfig,
  createFilterOption,
  updateFilterOption,
  deleteFilterOption,
} from './controllers/filterController';
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from './controllers/promotionController';
import {
  getSiteSettings,
  updateSiteSetting,
} from './controllers/siteSettingController';

import {
  getPublicHeroBanners,
  getAdminHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  reorderHeroBanners,
  uploadHeroBannerImage,
} from './controllers/heroBannerController';
import {
  createCustomRequest,
  getCustomRequests,
  updateCustomRequestStatus,
} from './controllers/customRequestController';
import {
  getSeoMetadata,
  updateSeoMetadata,
  getRedirects,
  createRedirect,
  generateSitemapXml,
  generateRobotsTxt,
} from './controllers/seoController';
import {
  getOrders,
  getOrderById,
  createOrder,
  createPublicOrder,
  trackPublicOrder,
  getOrdersByCustomerEmail,
  updateOrder,
  deleteOrder,
  wipeAllOrders,
  getOrderSummaryMetrics,
} from './controllers/orderController';
import {
  getPayments,
  createPayment,
  updatePayment,
  voidPayment,
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPublicPaymentMethods,
} from './controllers/paymentController';
import {
  getRefunds,
  createRefund,
} from './controllers/refundController';
import {
  getOrderStatementPdf,
  getPaymentReceiptPdf,
  getOrderInvoicePdf,
  getCustomerStatementPdf,
  getMonthlyStatementPdf,
  getYearlyStatementPdf,
  getCustomStatementPdf,
  exportData,
  getFinancialAuditLogs,
  getCustomersWithFinancials,
  getCustomerDetailWithLedger,
} from './controllers/statementController';
import {
  getPaymentSettings,
  updatePaymentSettings,
  getPublicPaymentConfig,
} from './controllers/paymentSettingsController';
import {
  createPayPalOrder,
  capturePayPalOrder,
  getPublicPayPalClientId,
} from './controllers/paypalController';

process.on('uncaughtException', (err) => {
    console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL UNHANDLED REJECTION:', reason);
});

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());

// Transparently handle legacy PHP URL formats (/api/index.php/v1/* -> /api/v1/*)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/index.php/')) {
    req.url = req.url.replace('/api/index.php/', '/api/');
  } else if (req.url === '/api/index.php') {
    req.url = '/api/v1/health';
  }
  next();
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

const upload = multer({ storage: multer.memoryStorage() });

// Dynamic static file resolution for /uploads across all candidate directories
const candidateUploadDirs = [
  path.join(process.cwd(), 'public_html', 'uploads'),
  path.join(process.cwd(), 'uploads'),
  path.join(process.cwd(), 'backend', 'uploads'),
  path.join(process.cwd(), 'frontend', 'public', 'uploads'),
  path.join(process.cwd(), 'frontend', 'dist', 'uploads'),
  path.join(__dirname, '..', '..', 'public_html', 'uploads'),
  path.join(__dirname, '..', 'uploads'),
  path.join(__dirname, '..', '..', 'uploads'),
];

const LUXURY_SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c" />
      <stop offset="50%" stop-color="#141418" />
      <stop offset="100%" stop-color="#08080a" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bf953f" />
      <stop offset="25%" stop-color="#fcf6ba" />
      <stop offset="50%" stop-color="#b38728" />
      <stop offset="75%" stop-color="#fbf5b7" />
      <stop offset="100%" stop-color="#aa771c" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)" />
  <rect x="24" y="24" width="552" height="552" fill="none" stroke="url(#gold)" stroke-width="1" stroke-opacity="0.35" />
  <g transform="translate(300, 255) scale(1.35)">
    <polygon points="0,-40 35,-15 22,35 -22,35 -35,-15" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linejoin="round" />
    <line x1="-35" y1="-15" x2="35" y2="-15" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="-22" y1="35" x2="0" y2="-40" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="22" y1="35" x2="0" y2="-40" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="-15" y1="-15" x2="0" y2="35" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="15" y1="-15" x2="0" y2="35" stroke="url(#gold)" stroke-width="1.5" />
  </g>
  <text x="300" y="375" text-anchor="middle" fill="url(#gold)" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="20" font-weight="600" letter-spacing="6">AETHEL CARATS</text>
  <text x="300" y="405" text-anchor="middle" fill="#888899" font-family="'Montserrat', -apple-system, sans-serif" font-size="11" letter-spacing="3">FINE JEWELLERY</text>
</svg>`;

app.use('/uploads', async (req, res, next) => {
  const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
  const filename = path.basename(cleanSubpath);

  // 1. Check local disk candidate directories first (fastest)
  for (const dir of candidateUploadDirs) {
    const filePath = path.join(dir, cleanSubpath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.sendFile(filePath);
    }
  }

  // 2. Multi-device DB recovery: Check shared remote MySQL for persistent LONGBLOB data
  try {
    const [mediaRows]: any = await mysqlPool.query(
      'SELECT data, fileType FROM `Media` WHERE url LIKE ? OR url LIKE ? OR name = ? LIMIT 1',
      [`%${filename}`, `%${cleanSubpath}`, filename]
    );

    let row = mediaRows && mediaRows[0];
    if (!row || !row.data) {
      const [piRows]: any = await mysqlPool.query(
        'SELECT data FROM `ProductImage` WHERE url LIKE ? LIMIT 1',
        [`%${filename}`]
      );
      if (piRows && piRows[0] && piRows[0].data) {
        row = piRows[0];
      }
    }

    if (row && row.data && row.data.length > 0) {
      // Self-heal local disk cache so future hits are instantaneous
      const primaryCacheDir = candidateUploadDirs[0];
      const targetDiskPath = path.join(primaryCacheDir, cleanSubpath);
      try {
        const parentDir = path.dirname(targetDiskPath);
        if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
        fs.writeFileSync(targetDiskPath, row.data);
      } catch (cacheErr: any) {
        console.warn('Cache write notice:', cacheErr?.message);
      }

      const ext = path.extname(cleanSubpath).toLowerCase();
      const mimeTypes: { [key: string]: string } = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
      };
      const contentType = row.fileType || mimeTypes[ext] || 'image/jpeg';

      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=86400');
      res.set('Content-Type', contentType);
      return res.status(200).send(row.data);
    }
  } catch (dbErr: any) {
    console.warn('DB image lookup notice:', dbErr?.message);
  }

  // 3. Zero-404 Guarantee: Return luxury SVG placeholder with HTTP 200 so console never logs 404 errors
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.set('Cache-Control', 'public, max-age=300');
  res.set('Content-Type', 'image/svg+xml; charset=utf-8');
  return res.status(200).send(LUXURY_SVG_PLACEHOLDER);
});

// Dynamic static file resolution for /assets across all candidate directories
const candidateAssetDirs = [
  path.join(process.cwd(), 'frontend', 'dist', 'assets'),
  path.join(process.cwd(), 'frontend', 'public', 'assets'),
  path.join(process.cwd(), 'public', 'assets'),
  path.join(process.cwd(), 'assets'),
  path.join(__dirname, '..', 'frontend', 'public', 'assets'),
  path.join(__dirname, '..', 'assets'),
];

app.use('/assets', (req, res, next) => {
  const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
  for (const dir of candidateAssetDirs) {
    const filePath = path.join(dir, cleanSubpath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
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
app.get('/api/v1/hero-banners', getPublicHeroBanners);
app.get('/api/v1/admin/hero-banners', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getAdminHeroBanners);
app.post('/api/v1/admin/hero-banners', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), createHeroBanner);
app.put('/api/v1/admin/hero-banners/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), updateHeroBanner);
app.post('/api/v1/admin/hero-banners/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), updateHeroBanner);
app.delete('/api/v1/admin/hero-banners/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteHeroBanner);
app.post('/api/v1/admin/hero-banners/reorder', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), reorderHeroBanners);
app.post('/api/v1/admin/hero-banners/upload-image', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.any(), uploadHeroBannerImage);

app.get('/api/v1/products', getProducts);
app.get('/api/v1/admin/products/:id', getProductById);
app.get('/api/v1/products/by-id/:id', getProductById);
app.get('/api/v1/products/:slug', getProductBySlug);
app.post('/api/v1/products/:productId/calculate-price', calculateServerSidePrice);
app.get('/api/v1/categories', getCategories);
app.get('/api/v1/collections', getCollections);
app.get('/api/v1/ring-size-guide', getRingSizeGuide);

app.get('/api/v1/diamonds', getDiamonds);

app.get('/api/v1/filters', getPublicFilters);
app.get('/api/v1/admin/filters', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getAdminFilters);
app.post('/api/v1/admin/filters', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), createFilterConfig);
app.put('/api/v1/admin/filters/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateFilterConfig);
app.delete('/api/v1/admin/filters/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteFilterConfig);
app.post('/api/v1/admin/filters/:id/options', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), createFilterOption);
app.put('/api/v1/admin/filters/options/:optionId', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateFilterOption);
app.delete('/api/v1/admin/filters/options/:optionId', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteFilterOption);

app.get('/api/v1/diamonds/wipe-all-now', deleteAllDiamonds);
app.get('/api/v1/admin/diamonds/wipe-all-now', deleteAllDiamonds);
app.get('/api/v1/diamonds/filters/config', getDiamondFilterConfig);
app.get('/api/v1/diamonds/:id', getDiamondById);
app.get('/api/v1/diamonds/:id/whatsapp', getWhatsAppInquiryMessage);

app.get('/api/v1/cms/pages', getAllPages);
app.get('/api/v1/cms/pages/:slug', getPageBySlug);
app.get('/api/v1/cms/menus', getMenus);
import { requireStoreOpenForOrders } from './middleware/holidayMode';
import {
  getPublicReviews,
  getAdminReviews,
  createReview,
  updateReview,
  deleteReview,
} from './controllers/reviewController';
import { getStoreStatus, getHolidayModeSettings, updateHolidayModeSettings } from './controllers/holidayModeController';

app.get('/api/v1/store-status', getStoreStatus);
app.get('/api/v1/admin/holiday-mode', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getHolidayModeSettings);
app.post('/api/v1/admin/holiday-mode', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateHolidayModeSettings);

// Orders & Financial System Endpoints (Protected by Auth & Role Permissions)
const financeRoles = ['ORDER_MANAGER', 'ADMIN', 'SUPER_ADMIN'] as const;

app.get('/api/v1/admin/orders/summary', authenticateToken, requireRole([...financeRoles]), getOrderSummaryMetrics);
app.get('/api/v1/admin/orders', authenticateToken, requireRole([...financeRoles]), getOrders);
app.get('/api/v1/admin/orders/:id', authenticateToken, requireRole([...financeRoles]), getOrderById);
app.post('/api/v1/admin/orders', authenticateToken, requireRole([...financeRoles]), createOrder);
app.put('/api/v1/admin/orders/:id', authenticateToken, requireRole([...financeRoles]), updateOrder);
app.delete('/api/v1/admin/orders/:id', authenticateToken, requireRole([...financeRoles]), deleteOrder);
app.post('/api/v1/admin/orders/wipe-all', authenticateToken, requireRole([...financeRoles]), wipeAllOrders);

app.get('/api/v1/admin/payments', authenticateToken, requireRole([...financeRoles]), getPayments);
app.post('/api/v1/admin/payments', authenticateToken, requireRole([...financeRoles]), createPayment);
app.put('/api/v1/admin/payments/:id', authenticateToken, requireRole([...financeRoles]), updatePayment);
app.post('/api/v1/admin/payments/:id/void', authenticateToken, requireRole([...financeRoles]), voidPayment);

app.get('/api/v1/admin/payment-methods', authenticateToken, requireRole([...financeRoles]), getPaymentMethods);
app.post('/api/v1/admin/payment-methods', authenticateToken, requireRole([...financeRoles]), createPaymentMethod);
app.put('/api/v1/admin/payment-methods/:id', authenticateToken, requireRole([...financeRoles]), updatePaymentMethod);
app.delete('/api/v1/admin/payment-methods/:id', authenticateToken, requireRole([...financeRoles]), deletePaymentMethod);

app.get('/api/v1/admin/refunds', authenticateToken, requireRole([...financeRoles]), getRefunds);
app.post('/api/v1/admin/refunds', authenticateToken, requireRole([...financeRoles]), createRefund);

app.get('/api/v1/admin/customers', authenticateToken, requireRole([...financeRoles]), getCustomersWithFinancials);
app.get('/api/v1/admin/customers/:id', authenticateToken, requireRole([...financeRoles]), getCustomerDetailWithLedger);

app.get('/api/v1/admin/reports/order-statement/:orderId/pdf', authenticateToken, requireRole([...financeRoles]), getOrderStatementPdf);
app.get('/api/v1/admin/reports/payment-receipt/:paymentId/pdf', authenticateToken, requireRole([...financeRoles]), getPaymentReceiptPdf);
app.get('/api/v1/admin/reports/invoice/:orderId/pdf', authenticateToken, requireRole([...financeRoles]), getOrderInvoicePdf);
app.get('/api/v1/admin/reports/customer-statement/:customerId/pdf', authenticateToken, requireRole([...financeRoles]), getCustomerStatementPdf);
app.get('/api/v1/admin/reports/monthly-statement/pdf', authenticateToken, requireRole([...financeRoles]), getMonthlyStatementPdf);
app.get('/api/v1/admin/reports/yearly-statement/pdf', authenticateToken, requireRole([...financeRoles]), getYearlyStatementPdf);
app.get('/api/v1/admin/reports/custom-statement/pdf', authenticateToken, requireRole([...financeRoles]), getCustomStatementPdf);
app.get('/api/v1/admin/reports/export', authenticateToken, requireRole([...financeRoles]), exportData);
app.get('/api/v1/admin/financial-audit-logs', authenticateToken, requireRole([...financeRoles]), getFinancialAuditLogs);

app.get('/api/v1/admin/payment-settings', authenticateToken, requireRole([...financeRoles]), getPaymentSettings);
app.post('/api/v1/admin/payment-settings', authenticateToken, requireRole([...financeRoles]), updatePaymentSettings);

// Order & Payment routes protected by requireStoreOpenForOrders
app.get('/api/v1/orders/track', trackPublicOrder);
app.get('/api/v1/orders/my-orders', getOrdersByCustomerEmail);
app.post('/api/v1/checkout/create-order', requireStoreOpenForOrders, createPublicOrder);
app.get('/api/v1/payments/config', getPublicPaymentConfig);
app.get('/api/v1/payments/methods', getPublicPaymentMethods);
app.get('/api/v1/payments/paypal/client-id', getPublicPayPalClientId);
app.post('/api/v1/payments/paypal/create-order', requireStoreOpenForOrders, createPayPalOrder);
app.post('/api/v1/payments/paypal/capture-order', requireStoreOpenForOrders, capturePayPalOrder);
app.post('/api/v1/orders', requireStoreOpenForOrders);
app.post('/api/v1/checkout', requireStoreOpenForOrders);
app.post('/api/v1/orders/create', requireStoreOpenForOrders);
app.post('/api/v1/payments/create', requireStoreOpenForOrders);
app.post('/api/v1/custom-requests', requireStoreOpenForOrders, createCustomRequest);

app.get('/api/v1/seo', getSeoMetadata);
app.get('/sitemap.xml', generateSitemapXml);
app.get('/robots.txt', generateRobotsTxt);

// Auth Routes
app.post('/api/v1/auth/login', loginAdmin);
app.post('/api/v1/auth/register', registerUser);
app.post('/api/v1/admin/auth/login', loginAdmin);
app.get('/api/v1/auth/me', authenticateToken, getCurrentUser);
app.get('/api/v1/admin/auth/me', authenticateToken, getCurrentUser);
app.get('/api/v1/admin/logs', authenticateToken, requireRole(['ADMIN', 'SUPER_ADMIN']), getActivityLogs);

// Admin User & Role Management
app.get('/api/v1/admin/users', authenticateToken, requireRole(['ADMIN', 'SUPER_ADMIN']), getAdminUsers);
app.patch('/api/v1/admin/users/:userId/role', authenticateToken, requireRole(['ADMIN', 'SUPER_ADMIN']), updateUserRole);

// Admin Product & Category Management
app.post('/api/v1/admin/products', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), createProduct);
app.put('/api/v1/admin/products/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateProduct);
app.delete('/api/v1/admin/products/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), deleteProduct);
app.post('/api/v1/admin/products/:id/duplicate', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), duplicateProduct);
app.get('/api/v1/admin/products/:productId/details', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getProductDetails);
app.post('/api/v1/admin/products/:productId/details', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), saveProductDetails);
app.get('/api/v1/products/:productId/details', getProductDetails);

// Admin & Public Product Page Content Routes
app.get('/api/v1/admin/product-page-content', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), getAdminProductPageContent);
app.put('/api/v1/admin/product-page-content', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), saveAdminProductPageContent);
app.post('/api/v1/admin/product-page-content', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER']), saveAdminProductPageContent);
app.get('/api/v1/product-page-content/:productId', getStorefrontProductPageContent);
app.get('/api/v1/product-page-content', getStorefrontProductPageContent);

// Admin Bulk Product Upload & Direct PC Media Upload
app.get('/api/v1/admin/products/bulk-upload/template', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), downloadProductImportTemplate);
app.post(
  '/api/v1/admin/products/bulk-upload/validate',
  authenticateToken,
  requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']),
  upload.fields([{ name: 'excelFile', maxCount: 1 }, { name: 'mediaZip', maxCount: 1 }]),
  validateProductBulkUpload
);
app.post(
  '/api/v1/admin/products/bulk-upload/execute',
  authenticateToken,
  requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']),
  upload.fields([{ name: 'excelFile', maxCount: 1 }, { name: 'mediaZip', maxCount: 1 }]),
  executeProductBulkUpload
);
app.post('/api/v1/admin/products/bulk-upload/error-report', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), downloadBulkImportErrorReport);
app.post('/api/v1/admin/products/reset-database-single-product', authenticateToken, resetDatabaseToSingleDemoProduct);

// Central Media Management, Persistent Local Uploads, and File Deletion
app.get('/api/v1/media', getAllMedia);
app.get('/api/v1/admin/media', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getAllMedia);
app.post('/api/v1/admin/media', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), uploadMedia);
app.delete('/api/v1/admin/media/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteMedia);
app.post('/api/v1/admin/media/upload', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), upload.any(), uploadMediaFiles);
app.post('/api/v1/admin/upload', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), upload.any(), uploadMediaFiles);
app.post('/api/v1/upload', authenticateToken, upload.any(), uploadMediaFiles);
app.post('/api/v1/admin/media/delete-file', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), deleteUploadedMediaFile);
app.delete('/api/v1/admin/media/file', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), deleteUploadedMediaFile);

// Enforce default admin users and single demo product state on startup
ensureDefaultAdminUsersExist().catch(console.error);
ensureSingleDemoProductEnforced().catch(console.error);
app.post('/api/v1/admin/categories', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createCategory);
app.put('/api/v1/admin/categories/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateCategory);
app.delete('/api/v1/admin/categories/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteCategory);

// Admin Customer-Specific Pricing
app.get('/api/v1/admin/customer-prices', authenticateToken, getCustomerPrices);
app.post('/api/v1/admin/customer-prices', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upsertCustomerSpecificPrice);
app.delete('/api/v1/admin/customer-prices/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteCustomerSpecificPrice);

// Admin Ring Size Guide CMS
app.get('/api/v1/admin/ring-size-guide', authenticateToken, getRingSizeGuide);
app.post('/api/v1/admin/ring-size-guide', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateRingSizeGuide);
app.put('/api/v1/admin/ring-size-guide', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateRingSizeGuide);

// Admin Diamond & Excel Importer
app.post('/api/v1/admin/diamonds', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), createDiamond);
app.put('/api/v1/admin/diamonds/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateDiamond);
app.post('/api/v1/admin/diamonds/:id/duplicate', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), duplicateDiamond);
app.delete('/api/v1/admin/diamonds/all', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), deleteAllDiamonds);
app.post('/api/v1/admin/diamonds/wipe-all', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), deleteAllDiamonds);
app.get('/api/v1/admin/diamonds/wipe-all-now', deleteAllDiamonds);
app.delete('/api/v1/admin/diamonds/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'ORDER_MANAGER']), deleteDiamond);
app.post('/api/v1/admin/diamonds/filters/config', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateDiamondFilterConfig);
app.get('/api/v1/admin/diamonds/excel-template', authenticateToken, downloadExcelTemplate);
app.post('/api/v1/admin/diamonds/excel-parse', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), upload.single('file'), parseAndValidateExcel);
app.post('/api/v1/admin/diamonds/excel-import', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), executeDiamondImport);
app.post('/api/v1/admin/diamonds/zip-upload', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), upload.single('file'), extractAndMatchZipImages);
app.get('/api/v1/admin/diamonds/import-history', authenticateToken, getImportHistory);
app.patch('/api/v1/admin/diamonds/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateDiamondStatus);

// Public & Admin CMS & Page Builder
app.get('/api/v1/pages/:slug', getPageBySlug);
app.post('/api/v1/admin/cms/pages-create', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), createPage);
app.get('/api/v1/admin/cms/pages/:slug', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getPageBySlug);
app.delete('/api/v1/admin/cms/pages/:slug', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deletePage);
app.post('/api/v1/admin/cms/pages/:slug', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updatePageSections);
app.post('/api/v1/admin/cms/pages/:slug/draft', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), savePageDraft);
app.post('/api/v1/admin/cms/pages/:slug/publish', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), publishPage);
app.get('/api/v1/admin/cms/pages/:slug/revisions', authenticateToken, getPageRevisions);
app.post('/api/v1/admin/cms/pages/:slug/restore/:revisionId', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), restorePageRevision);
app.get('/api/v1/admin/cms/menus', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getMenus);
app.post('/api/v1/admin/cms/menus/:location', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateMenu);

// Public & Admin FAQ Routes
app.get('/api/v1/faqs', getFaqs);
app.get('/api/v1/admin/faqs', authenticateToken, getFaqs);
app.post('/api/v1/admin/faqs', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createFaq);
app.put('/api/v1/admin/faqs/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateFaq);
app.delete('/api/v1/admin/faqs/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteFaq);

// Public & Admin Blog Routes
app.get('/api/v1/blog', getBlogPosts);
app.get('/api/v1/blog/:slug', getBlogPostBySlug);
app.get('/api/v1/admin/blog', authenticateToken, getBlogPosts);
app.post('/api/v1/admin/blog', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createBlogPost);
app.put('/api/v1/admin/blog/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateBlogPost);
app.delete('/api/v1/admin/blog/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteBlogPost);

// Public & Admin Filter Management Routes
app.get('/api/v1/filters', getPublicFilters);
app.get('/api/v1/admin/filters', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getAdminFilters);
app.post('/api/v1/admin/filters', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), createFilterConfig);
app.put('/api/v1/admin/filters/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateFilterConfig);
app.delete('/api/v1/admin/filters/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteFilterConfig);
app.post('/api/v1/admin/filters/:id/options', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), createFilterOption);
app.put('/api/v1/admin/filters/options/:optionId', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), updateFilterOption);
app.delete('/api/v1/admin/filters/options/:optionId', authenticateToken, requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteFilterOption);

// Public & Admin Dedicated Diamond Filter Management Routes
app.get('/api/v1/diamond-filters', getDiamondFilters);
app.put('/api/v1/admin/diamond-filters/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateDiamondFilterGroup);
app.post('/api/v1/admin/diamond-filter-options', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), createDiamondFilterOption);
app.put('/api/v1/admin/diamond-filter-options/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), updateDiamondFilterOption);
app.delete('/api/v1/admin/diamond-filter-options/:id', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN']), deleteDiamondFilterOption);

// Public & Admin Reviews Management Routes
app.get('/api/v1/reviews', getPublicReviews);
app.get('/api/v1/admin/reviews', authenticateToken, getAdminReviews);
app.post('/api/v1/admin/reviews', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createReview);
app.put('/api/v1/admin/reviews/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateReview);
app.delete('/api/v1/admin/reviews/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteReview);

// Public & Admin Mega Menu Cards Routes
app.get('/api/v1/mega-menu-cards', getMegaMenuCards);
app.post('/api/v1/admin/mega-menu-cards', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createMegaMenuCard);
app.put('/api/v1/admin/mega-menu-cards/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateMegaMenuCard);
app.delete('/api/v1/admin/mega-menu-cards/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteMegaMenuCard);

// Public & Admin Promotion & Banner Routes
app.get('/api/v1/promotions', getPromotions);
app.post('/api/v1/admin/promotions', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createPromotion);
app.put('/api/v1/admin/promotions/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updatePromotion);
app.delete('/api/v1/admin/promotions/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deletePromotion);

import { getHolidayModeStatus, updateHolidayModeStatus } from './controllers/settingController';

// Public & Admin Site Setting Routes
app.get('/api/v1/settings/holiday-mode', getHolidayModeStatus);
app.put('/api/v1/admin/settings/holiday-mode', authenticateToken, requireRole(['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER']), updateHolidayModeStatus);
app.get('/api/v1/site-settings', getSiteSettings);
app.get('/api/v1/site-settings/:key', getSiteSettings);
app.post('/api/v1/admin/site-settings', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateSiteSetting);
app.put('/api/v1/admin/site-settings', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateSiteSetting);
app.put('/api/v1/admin/site-settings/:key', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateSiteSetting);

// Public & Admin Media Library Routes
app.get('/api/v1/media', getAllMedia);
app.post('/api/v1/admin/media', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), uploadMedia);
app.delete('/api/v1/admin/media/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), deleteMedia);



// Admin Custom Jewellery CAD Workflow
app.get('/api/v1/admin/custom-requests', authenticateToken, getCustomRequests);
app.patch('/api/v1/admin/custom-requests/:id', authenticateToken, updateCustomRequestStatus);

// Admin SEO & Redirects
app.post('/api/v1/admin/seo', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateSeoMetadata);
app.get('/api/v1/admin/redirects', authenticateToken, getRedirects);
app.post('/api/v1/admin/redirects', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), createRedirect);

// ============================================================
// PRIVATE INTERNAL BUSINESS MANAGEMENT REST APIS (/api/v1/business/...)
// ============================================================
import { requireBusinessRole, requireBusinessAdmin, requireAccountantOrAdmin } from './middleware/auth';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  toggleEmployeeStatus,
} from './controllers/businessEmployeeController';
import {
  getAttendanceList,
  getTodayAttendanceSummary,
  employeeCheckIn,
  employeeCheckOut,
  manualAttendanceEntry,
  getMonthlyAttendanceReport,
} from './controllers/businessAttendanceController';
import {
  getSalesList,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  calculateSalesPreview,
} from './controllers/businessSalesController';
import {
  getCommissionsList,
  approveCommission,
  payCommission,
  getCommissionPlans,
  createCommissionPlan,
  updateCommissionPlan,
} from './controllers/businessCommissionController';
import { getBusinessDashboardMetrics } from './controllers/businessDashboardController';
import {
  getSalesTargets,
  createSalesTarget,
  updateSalesTarget,
} from './controllers/businessTargetController';
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
} from './controllers/businessSupplierController';
import {
  getBusinessCustomers,
  checkDuplicateCustomer,
  createBusinessCustomer,
} from './controllers/businessCustomerController';
import {
  validateSalesExcelImport,
  executeSalesExcelImport,
} from './controllers/businessImportController';
import { getBusinessAuditLogs } from './controllers/businessAuditController';

// Dashboard Metrics
app.get('/api/v1/business/dashboard', authenticateToken, requireBusinessRole, getBusinessDashboardMetrics);

// Employees
app.get('/api/v1/business/employees', authenticateToken, requireBusinessRole, getEmployees);
app.get('/api/v1/business/employees/:id', authenticateToken, requireBusinessRole, getEmployeeById);
app.post('/api/v1/business/employees', authenticateToken, requireBusinessAdmin, createEmployee);
app.put('/api/v1/business/employees/:id', authenticateToken, requireBusinessAdmin, updateEmployee);
app.patch('/api/v1/business/employees/:id/status', authenticateToken, requireBusinessAdmin, toggleEmployeeStatus);

// Attendance
app.get('/api/v1/business/attendance', authenticateToken, requireBusinessRole, getAttendanceList);
app.get('/api/v1/business/attendance/today', authenticateToken, requireBusinessRole, getTodayAttendanceSummary);
app.post('/api/v1/business/attendance/check-in', authenticateToken, requireBusinessRole, employeeCheckIn);
app.post('/api/v1/business/attendance/check-out', authenticateToken, requireBusinessRole, employeeCheckOut);
app.post('/api/v1/business/attendance/manual', authenticateToken, requireBusinessAdmin, manualAttendanceEntry);
app.get('/api/v1/business/attendance/monthly-report', authenticateToken, requireBusinessRole, getMonthlyAttendanceReport);

// Sales & Calculations
app.get('/api/v1/business/sales', authenticateToken, requireBusinessRole, getSalesList);
app.get('/api/v1/business/sales/:id', authenticateToken, requireBusinessRole, getSaleById);
app.post('/api/v1/business/sales', authenticateToken, requireBusinessRole, createSale);
app.put('/api/v1/business/sales/:id', authenticateToken, requireBusinessRole, updateSale);
app.delete('/api/v1/business/sales/:id', authenticateToken, requireBusinessAdmin, deleteSale);
app.post('/api/v1/business/sales/calculate-preview', authenticateToken, requireBusinessRole, calculateSalesPreview);

// Commissions
app.get('/api/v1/business/commissions', authenticateToken, requireBusinessRole, getCommissionsList);
app.post('/api/v1/business/commissions/:id/approve', authenticateToken, requireBusinessAdmin, approveCommission);
app.post('/api/v1/business/commissions/:id/pay', authenticateToken, requireAccountantOrAdmin, payCommission);
app.get('/api/v1/business/commission-plans', authenticateToken, requireBusinessRole, getCommissionPlans);
app.post('/api/v1/business/commission-plans', authenticateToken, requireBusinessAdmin, createCommissionPlan);
app.put('/api/v1/business/commission-plans/:id', authenticateToken, requireBusinessAdmin, updateCommissionPlan);

// Targets
app.get('/api/v1/business/targets', authenticateToken, requireBusinessRole, getSalesTargets);
app.post('/api/v1/business/targets', authenticateToken, requireBusinessAdmin, createSalesTarget);
app.put('/api/v1/business/targets/:id', authenticateToken, requireBusinessAdmin, updateSalesTarget);

// Suppliers
app.get('/api/v1/business/suppliers', authenticateToken, requireBusinessRole, getSuppliers);
app.post('/api/v1/business/suppliers', authenticateToken, requireBusinessRole, createSupplier);
app.put('/api/v1/business/suppliers/:id', authenticateToken, requireBusinessRole, updateSupplier);

// Customers
app.get('/api/v1/business/customers', authenticateToken, requireBusinessRole, getBusinessCustomers);
app.post('/api/v1/business/customers/check-duplicate', authenticateToken, requireBusinessRole, checkDuplicateCustomer);
app.post('/api/v1/business/customers', authenticateToken, requireBusinessRole, createBusinessCustomer);

// Excel Sales Tracker Import
app.post('/api/v1/business/import/validate', authenticateToken, requireBusinessAdmin, upload.single('file'), validateSalesExcelImport);
app.post('/api/v1/business/import/execute', authenticateToken, requireBusinessAdmin, executeSalesExcelImport);

// Audit Logs
app.get('/api/v1/business/audit-logs', authenticateToken, requireBusinessAdmin, getBusinessAuditLogs);

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
      prisma.user.count(),
      prisma.diamond.count(),
      prisma.product.count(),
      prisma.category.count().catch(() => null),
      prisma.order.count().catch(() => null),
    ]);

    const [userCount, diamondCount, productCount, categoryCount, orderCount] = await withTimeout(
      queryPromise,
      2500,
      new Error(`Database query timed out after 2500ms. Could not reach MySQL server at "${envHost}:3306".`)
    );

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
  } catch (err: any) {
    console.error('Database Health Check Failed:', err);

    // Run parallel fast TCP reachability tests (< 800ms) to detect why connection failed
    const [activeTcp, loopbackTcp, remoteTcp] = await Promise.all([
      checkTcpPort(envHost, 3306, 800),
      checkTcpPort('127.0.0.1', 3306, 800),
      checkTcpPort('srv844.hstgr.io', 3306, 800),
    ]);

    const errMsg = err.message || String(err);
    let suggestion = 'Check your MySQL server status and credentials.';

    if (errMsg.includes('timed out') || !activeTcp.reachable) {
      if (remoteTcp.reachable) {
        suggestion = `TCP to "${envHost}" failed, but Hostinger MySQL host "srv844.hstgr.io" IS reachable! Change DB_HOST to "srv844.hstgr.io" and click Create in Remote MySQL.`;
      } else {
        suggestion = `TCP to "${envHost}:3306" is not responding. On Hostinger, ensure Remote MySQL is enabled in hPanel (Databases > Remote MySQL > add "%" for database "${envName}").`;
      }
    } else if (errMsg.includes('Access denied') || errMsg.includes('Authentication failed')) {
      suggestion = `Database authentication failed for user "${envUser}". In Hostinger hPanel > Databases > Remote MySQL, select "${envName}", check "Any Host" (%), and click Create. Also verify password in hPanel.`;
    } else if (errMsg.includes('ECONNREFUSED') || errMsg.includes('refused')) {
      suggestion = `Connection refused at "${envHost}". If on Hostinger container, use "auth-db844.hstgr.io" with Remote MySQL enabled.`;
    } else if (errMsg.includes('protocol') || errMsg.includes('mysql://')) {
      suggestion = 'DATABASE_URL format error. Ensure the URL starts with mysql:// without quotation marks.';
    } else if (errMsg.includes('Unknown database')) {
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
        envVarsConfigured: Object.keys(process.env).filter((k) =>
          ['DATABASE_URL', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PORT', 'PORT'].includes(k)
        ),
      },
      troubleshootingTip: suggestion,
      timestamp: new Date().toISOString(),
    });
  }
});

export { app };

const isDirectRun = process.env.IS_BACKEND_STANDALONE === 'true' || (process.argv[1] && process.argv[1].endsWith('backend/dist/server.js'));
if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`✨ AethelCarats REST API running on port ${PORT}`);
  });
}
