import { cleanupDatabaseSiteSettings } from './cleanupDatabaseSiteSettings';
cleanupDatabaseSiteSettings().catch(console.error);

import prisma from './prisma';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { authenticateToken, requireRole } from './middleware/auth';

import { loginAdmin, googleAuth, registerUser, getCurrentUser, getActivityLogs, getAdminUsers, updateUserRole, ensureDefaultAdminUsersExist } from './controllers/authController';
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
  getAllMedia,
  uploadMedia,
  deleteMedia,
} from './controllers/mediaController';
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
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

const upload = multer({ storage: multer.memoryStorage() });

// Serve local PC uploads and public assets statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));

// Health Check Endpoints for Cloud Run & Load Balancers
app.get(['/healthz', '/_health', '/ping'], (req, res) => {
  res.status(200).send('OK');
});

// Public Storefront & Admin Endpoints
app.get('/api/v1/hero-banners', getPublicHeroBanners);
app.get('/api/v1/admin/hero-banners', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), getAdminHeroBanners);
app.post('/api/v1/admin/hero-banners', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]), createHeroBanner);
app.put('/api/v1/admin/hero-banners/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]), updateHeroBanner);
app.delete('/api/v1/admin/hero-banners/:id', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), deleteHeroBanner);
app.post('/api/v1/admin/hero-banners/reorder', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), reorderHeroBanners);
app.post('/api/v1/admin/hero-banners/upload-image', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']), upload.single('file'), uploadHeroBannerImage);

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
app.post('/api/v1/auth/google', googleAuth);
app.post('/api/v1/admin/auth/google', googleAuth);
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
app.post('/api/v1/admin/media/upload', authenticateToken, requireRole(['PRODUCT_MANAGER', 'ADMIN', 'CONTENT_MANAGER', 'SUPER_ADMIN']), upload.array('files'), uploadMediaFromPc);

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

// Admin CMS & Page Builder
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
app.post('/api/v1/admin/site-settings', authenticateToken, requireRole(['CONTENT_MANAGER', 'ADMIN']), updateSiteSetting);

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

// Real-Time Database Connection Diagnostic Endpoint
app.get('/api/v1/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const diamondCount = await prisma.diamond.count();
    const productCount = await prisma.product.count();
    res.json({
      status: 'ok',
      database: 'connected',
      engine: 'MySQL / MariaDB',
      host: process.env.DB_HOST || 'localhost',
      dbName: process.env.DB_NAME || 'u657751653_floksyjewel_db',
      userCount,
      diamondCount,
      productCount,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message || String(err),
      timestamp: new Date().toISOString(),
    });
  }
});

export { app };

const isDirectRun = process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server.ts'));
if (process.env.NODE_ENV !== 'production' && isDirectRun) {
  app.listen(PORT, () => {
    console.log(`✨ Floksy Jewel REST API running on port ${PORT}`);
  });
}
