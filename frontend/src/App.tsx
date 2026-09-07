import React, { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { GoogleAnalyticsTracker } from './components/common/GoogleAnalyticsTracker';

const ScrollToTop: React.FC = () => {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const root = document.getElementById('root');
      if (root) root.scrollTop = 0;
    };

    resetScroll();

    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    const timerId = setTimeout(() => {
      resetScroll();
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [pathname]);

  return null;
};

// Layouts
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';

// Storefront Pages
import { HomePage } from './pages/storefront/HomePage';
const ProductListPage = lazy(() => import('./pages/storefront/ProductListPage').then(m => ({ default: m.ProductListPage })));
const ProductDetailPage = lazy(() => import('./pages/storefront/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const DiamondVaultPage = lazy(() => import('./pages/storefront/DiamondVaultPage').then(m => ({ default: m.DiamondVaultPage })));
const DiamondDetailPage = lazy(() => import('./pages/storefront/DiamondDetailPage').then(m => ({ default: m.DiamondDetailPage })));
const CustomJewelleryPage = lazy(() => import('./pages/storefront/CustomJewelleryPage').then(m => ({ default: m.CustomJewelleryPage })));
const CMSPage = lazy(() => import('./pages/storefront/CMSPage').then(m => ({ default: m.CMSPage })));
const WishlistPage = lazy(() => import('./pages/storefront/WishlistPage').then(m => ({ default: m.WishlistPage })));
const CartPage = lazy(() => import('./pages/storefront/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/storefront/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const LoginPage = lazy(() => import('./pages/storefront/LoginPage').then(m => ({ default: m.LoginPage })));
const AccountPage = lazy(() => import('./pages/storefront/AccountPage').then(m => ({ default: m.AccountPage })));
const ContactUsPage = lazy(() => import('./pages/storefront/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const FAQPage = lazy(() => import('./pages/storefront/FAQPage').then(m => ({ default: m.FAQPage })));
const ReturnsRefundsPage = lazy(() => import('./pages/storefront/ReturnsRefundsPage').then(m => ({ default: m.ReturnsRefundsPage })));
const SustainabilityPage = lazy(() => import('./pages/storefront/SustainabilityPage').then(m => ({ default: m.SustainabilityPage })));
const PriceMatchPage = lazy(() => import('./pages/storefront/PriceMatchPage').then(m => ({ default: m.PriceMatchPage })));
const LifetimeWarrantyPage = lazy(() => import('./pages/storefront/LifetimeWarrantyPage').then(m => ({ default: m.LifetimeWarrantyPage })));
const ShippingDeliveryPage = lazy(() => import('./pages/storefront/ShippingDeliveryPage').then(m => ({ default: m.ShippingDeliveryPage })));
const InsurancePage = lazy(() => import('./pages/storefront/InsurancePage').then(m => ({ default: m.InsurancePage })));
const AboutUsPage = lazy(() => import('./pages/storefront/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const BlogPage = lazy(() => import('./pages/storefront/BlogPage').then(m => ({ default: m.BlogPage })));
const SaleExclusionsPage = lazy(() => import('./pages/storefront/SaleExclusionsPage').then(m => ({ default: m.SaleExclusionsPage })));
const SitemapPage = lazy(() => import('./pages/storefront/SitemapPage').then(m => ({ default: m.SitemapPage })));
const FindYourRingSizePage = lazy(() => import('./pages/storefront/FindYourRingSizePage').then(m => ({ default: m.FindYourRingSizePage })));

// Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminProductManagerPage = lazy(() => import('./pages/admin/AdminProductManagerPage').then(m => ({ default: m.AdminProductManagerPage })));
const AdminCategoryManagerPage = lazy(() => import('./pages/admin/AdminCategoryManagerPage').then(m => ({ default: m.AdminCategoryManagerPage })));
const AdminDiamondManagerPage = lazy(() => import('./pages/admin/AdminDiamondManagerPage').then(m => ({ default: m.AdminDiamondManagerPage })));
const AdminExcelImportPage = lazy(() => import('./pages/admin/AdminExcelImportPage').then(m => ({ default: m.AdminExcelImportPage })));
const AdminCustomRequestsPage = lazy(() => import('./pages/admin/AdminCustomRequestsPage').then(m => ({ default: m.AdminCustomRequestsPage })));
const AdminPagesDashboardPage = lazy(() => import('./pages/admin/AdminPagesDashboardPage').then(m => ({ default: m.AdminPagesDashboardPage })));
const AdminPageEditorPage = lazy(() => import('./pages/admin/AdminPageEditorPage').then(m => ({ default: m.AdminPageEditorPage })));
const AdminPageBuilderPage = lazy(() => import('./pages/admin/AdminPageBuilderPage').then(m => ({ default: m.AdminPageBuilderPage })));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage').then(m => ({ default: m.AdminOrdersPage })));
const AdminOrderDetailPage = lazy(() => import('./pages/admin/AdminOrderDetailPage').then(m => ({ default: m.AdminOrderDetailPage })));
const AdminPaymentsPage = lazy(() => import('./pages/admin/AdminPaymentsPage').then(m => ({ default: m.AdminPaymentsPage })));
const AdminCustomersPage = lazy(() => import('./pages/admin/AdminCustomersPage').then(m => ({ default: m.AdminCustomersPage })));
const AdminStatementsPage = lazy(() => import('./pages/admin/AdminStatementsPage').then(m => ({ default: m.AdminStatementsPage })));
const AdminPaymentMethodsPage = lazy(() => import('./pages/admin/AdminPaymentMethodsPage').then(m => ({ default: m.AdminPaymentMethodsPage })));
const AdminPaymentSettingsPage = lazy(() => import('./pages/admin/AdminPaymentSettingsPage').then(m => ({ default: m.AdminPaymentSettingsPage })));
const AdminSeoPage = lazy(() => import('./pages/admin/AdminSeoPage').then(m => ({ default: m.AdminSeoPage })));
const AdminLogsPage = lazy(() => import('./pages/admin/AdminLogsPage').then(m => ({ default: m.AdminLogsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));
const AdminMediaLibraryPage = lazy(() => import('./pages/admin/AdminMediaLibraryPage').then(m => ({ default: m.AdminMediaLibraryPage })));
const AdminUserManagementPage = lazy(() => import('./pages/admin/AdminUserManagementPage').then(m => ({ default: m.AdminUserManagementPage })));
const AdminHeaderManagerPage = lazy(() => import('./pages/admin/AdminHeaderManagerPage').then(m => ({ default: m.AdminHeaderManagerPage })));
const AdminMegaMenuManagerPage = lazy(() => import('./pages/admin/AdminMegaMenuManagerPage').then(m => ({ default: m.AdminMegaMenuManagerPage })));
const AdminFooterManagerPage = lazy(() => import('./pages/admin/AdminFooterManagerPage').then(m => ({ default: m.AdminFooterManagerPage })));
const AdminFilterManagerPage = lazy(() => import('./pages/admin/AdminFilterManagerPage').then(m => ({ default: m.AdminFilterManagerPage })));
const AdminDiamondFilterManagerPage = lazy(() => import('./pages/admin/AdminDiamondFilterManagerPage').then(m => ({ default: m.AdminDiamondFilterManagerPage })));
const AdminPromotionsPage = lazy(() => import('./pages/admin/AdminPromotionsPage').then(m => ({ default: m.AdminPromotionsPage })));
const AdminThemeSettingsPage = lazy(() => import('./pages/admin/AdminThemeSettingsPage').then(m => ({ default: m.AdminThemeSettingsPage })));
const AdminTextLabelsPage = lazy(() => import('./pages/admin/AdminTextLabelsPage').then(m => ({ default: m.AdminTextLabelsPage })));
const AdminHolidayModePage = lazy(() => import('./pages/admin/AdminHolidayModePage').then(m => ({ default: m.AdminHolidayModePage })));
const AdminHomepageManagerPage = lazy(() => import('./pages/admin/AdminHomepageManagerPage').then(m => ({ default: m.AdminHomepageManagerPage })));
const AdminReviewsManagerPage = lazy(() => import('./pages/admin/AdminReviewsManagerPage').then(m => ({ default: m.AdminReviewsManagerPage })));
const AdminRingSizeGuidePage = lazy(() => import('./pages/admin/AdminRingSizeGuidePage').then(m => ({ default: m.AdminRingSizeGuidePage })));
const AdminCustomerPricingPage = lazy(() => import('./pages/admin/AdminCustomerPricingPage').then(m => ({ default: m.AdminCustomerPricingPage })));
const AdminBulkSaleManagerPage = lazy(() => import('./pages/admin/AdminBulkSaleManagerPage').then(m => ({ default: m.AdminBulkSaleManagerPage })));
const AdminBulkPriceManagerPage = lazy(() => import('./pages/admin/AdminBulkPriceManagerPage').then(m => ({ default: m.AdminBulkPriceManagerPage })));
const AdminFullProductEditorPage = lazy(() => import('./pages/admin/AdminFullProductEditorPage').then(m => ({ default: m.AdminFullProductEditorPage })));
const AdminBulkProductUploadPage = lazy(() => import('./pages/admin/AdminBulkProductUploadPage').then(m => ({ default: m.AdminBulkProductUploadPage })));
const AdminSectionEditorPage = lazy(() => import('./pages/admin/AdminSectionEditorPage').then(m => ({ default: m.AdminSectionEditorPage })));
const AdminProductDetailsManagerPage = lazy(() => import('./pages/admin/AdminProductDetailsManagerPage').then(m => ({ default: m.AdminProductDetailsManagerPage })));
const AdminProductPageContentPage = lazy(() => import('./pages/admin/AdminProductPageContentPage').then(m => ({ default: m.AdminProductPageContentPage })));

// Private Business ERP & Operations Pages
export const PRIVATE_BUSINESS_PATH = '/enterprise-hub-m7k4p9v2x1n8';

const BusinessLayout = lazy(() => import('./business/layout/BusinessLayout').then(m => ({ default: m.BusinessLayout })));
const BusinessDashboardPage = lazy(() => import('./business/pages/BusinessDashboardPage').then(m => ({ default: m.BusinessDashboardPage })));
const BusinessEmployeesPage = lazy(() => import('./business/pages/BusinessEmployeesPage').then(m => ({ default: m.BusinessEmployeesPage })));
const BusinessEmployeeDetailPage = lazy(() => import('./business/pages/BusinessEmployeeDetailPage').then(m => ({ default: m.BusinessEmployeeDetailPage })));
const BusinessAttendancePage = lazy(() => import('./business/pages/BusinessAttendancePage').then(m => ({ default: m.BusinessAttendancePage })));
const BusinessAttendanceReportPage = lazy(() => import('./business/pages/BusinessAttendanceReportPage').then(m => ({ default: m.BusinessAttendanceReportPage })));
const BusinessSalesListPage = lazy(() => import('./business/pages/BusinessSalesListPage').then(m => ({ default: m.BusinessSalesListPage })));
const BusinessNewSalePage = lazy(() => import('./business/pages/BusinessNewSalePage').then(m => ({ default: m.BusinessNewSalePage })));
const BusinessSaleDetailPage = lazy(() => import('./business/pages/BusinessSaleDetailPage').then(m => ({ default: m.BusinessSaleDetailPage })));
const BusinessCommissionPage = lazy(() => import('./business/pages/BusinessCommissionPage').then(m => ({ default: m.BusinessCommissionPage })));
const BusinessCommissionPlansPage = lazy(() => import('./business/pages/BusinessCommissionPlansPage').then(m => ({ default: m.BusinessCommissionPlansPage })));
const BusinessSalesTargetsPage = lazy(() => import('./business/pages/BusinessSalesTargetsPage').then(m => ({ default: m.BusinessSalesTargetsPage })));
const BusinessCustomersPage = lazy(() => import('./business/pages/BusinessCustomersPage').then(m => ({ default: m.BusinessCustomersPage })));
const BusinessSuppliersPage = lazy(() => import('./business/pages/BusinessSuppliersPage').then(m => ({ default: m.BusinessSuppliersPage })));
const BusinessReportsPage = lazy(() => import('./business/pages/BusinessReportsPage').then(m => ({ default: m.BusinessReportsPage })));
const BusinessExcelImportPage = lazy(() => import('./business/pages/BusinessExcelImportPage').then(m => ({ default: m.BusinessExcelImportPage })));
const BusinessAuditLogsPage = lazy(() => import('./business/pages/BusinessAuditLogsPage').then(m => ({ default: m.BusinessAuditLogsPage })));
const BusinessSettingsPage = lazy(() => import('./business/pages/BusinessSettingsPage').then(m => ({ default: m.BusinessSettingsPage })));

const ProtectedBusinessLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const token = localStorage.getItem('app_auth_token') || localStorage.getItem('admin_session_token');

  if (isLoading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: '#0d1319' }}>
        AUTHENTICATING ENTERPRISE OPERATIONS HUB...
      </div>
    );
  }

  if (!token || !isAuthenticated) {
    return <AdminLoginPage onSuccess={() => window.location.reload()} />;
  }

  const allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'SALES_HR_MANAGER', 'SALES_MANAGER', 'SALES_EMPLOYEE', 'ACCOUNTANT'];
  if (user && (!user.role || !allowedRoles.includes(user.role as string))) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '48px 32px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', boxShadow: '0 12px 36px rgba(15,23,42,0.08)' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          403 — ACCESS DENIED
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
          Business Operations permissions are required to access this system. Your account ({user.email}) is currently assigned the role of <strong>{user.role}</strong>.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          style={{ padding: '12px 24px', backgroundColor: '#0d1319', color: '#fff', fontSize: '0.82rem', fontWeight: 700, borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
          RETURN TO MAIN SITE
        </button>
      </div>
    );
  }

  return <BusinessLayout />;
};

const PageLoadingSpinner: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', width: '100%' }}>
    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#C9A96E', letterSpacing: '0.14em', fontWeight: 600 }}>
      LOADING AETHELCARATS ATELIER...
    </div>
  </div>
);

export const PRIVATE_ADMIN_PATH = '/vault-mgmt-k8m3x9q2v7';

const ProtectedAdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, openAuthModal } = useAuth();
  const token = localStorage.getItem('app_auth_token') || localStorage.getItem('admin_session_token');

  if (isLoading) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9A96E' }}>
        AUTHENTICATING ATELIER ACCESS...
      </div>
    );
  }

  if (!token || !isAuthenticated) {
    return <AdminLoginPage onSuccess={() => window.location.reload()} />;
  }

  if (user && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '48px 32px', background: '#151515', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: '8px', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F5F1E8', marginBottom: '16px' }}>
          ACCESS DENIED
        </h2>
        <p style={{ color: '#D8D2C5', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
          Administrator privileges are required to access the AethelCarats Management Portal. Your account ({user.email}) is currently assigned the role of <strong style={{ color: '#C9A96E' }}>{user.role}</strong>.
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          style={{ padding: '14px 28px', backgroundColor: '#C9A96E', color: '#0B0B0B', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          RETURN TO STOREFRONT
        </button>
      </div>
    );
  }

  return <AdminLayout />;
};

import { useScrollReveal } from './components/motion/useScrollReveal';
import { PageTransition } from './components/motion/PageTransition';

const StorefrontLayout: React.FC = () => {
  useScrollReveal();
  const location = useLocation();

  return (
    <>
      <Header />
      <Suspense fallback={<PageLoadingSpinner />}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<ProductListPage />} />
            <Route path="/rings" element={<ProductListPage />} />
            <Route path="/earrings" element={<ProductListPage />} />
            <Route path="/necklaces" element={<ProductListPage />} />
            <Route path="/bracelets" element={<ProductListPage />} />
            <Route path="/pendants" element={<ProductListPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/collections/:slug" element={<ProductDetailPage />} />
            <Route path="/rings/:slug" element={<ProductDetailPage />} />
            <Route path="/earrings/:slug" element={<ProductDetailPage />} />
            <Route path="/necklaces/:slug" element={<ProductDetailPage />} />
            <Route path="/bracelets/:slug" element={<ProductDetailPage />} />
            <Route path="/pendants/:slug" element={<ProductDetailPage />} />

            <Route path="/diamonds" element={<DiamondVaultPage />} />
            <Route path="/diamonds/:id" element={<DiamondDetailPage />} />

            <Route path="/custom-jewellery" element={<CustomJewelleryPage />} />
            <Route path="/customise" element={<CustomJewelleryPage />} />

            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shopping-cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* CMS & Dedicated Brand Pages */}
            <Route path="/education/rings/find-your-ring-size" element={<FindYourRingSizePage />} />
            <Route path="/ring-size-guide" element={<FindYourRingSizePage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/price-match" element={<PriceMatchPage />} />
            <Route path="/lifetime-warranty" element={<LifetimeWarrantyPage />} />
            <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/sale-exclusions" element={<SaleExclusionsPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/bespoke-service" element={<CMSPage />} />
            <Route path="/jewellery-care" element={<CMSPage />} />
            <Route path="/privacy-policy" element={<CMSPage />} />
            <Route path="/terms-of-service" element={<CMSPage />} />
            <Route path="/billing-terms-conditions" element={<CMSPage />} />
            <Route path="/pages/*" element={<CMSPage />} />
            <Route path="/policies/*" element={<CMSPage />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <Footer />
      <WhatsAppFloatingButton />
      <QuickViewModal />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <QuickViewProvider>
                  <GlobalStyle />
                  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <ScrollToTop />
                    <GoogleAnalyticsTracker />
                    <Suspense fallback={<PageLoadingSpinner />}>
                      <Routes>
                        {/* Private Admin Routes */}
                        <Route path={`${PRIVATE_ADMIN_PATH}/login`} element={<AdminLoginPage />} />
                        <Route path={PRIVATE_ADMIN_PATH} element={<ProtectedAdminLayout />}>
                          <Route index element={<AdminPageBuilderPage />} />
                          <Route path="dashboard" element={<AdminDashboardPage />} />
                          <Route path="products" element={<AdminProductManagerPage />} />
                          <Route path="products/new" element={<AdminFullProductEditorPage />} />
                          <Route path="products/bulk-sale" element={<AdminBulkSaleManagerPage />} />
                          <Route path="products/bulk-price" element={<AdminBulkPriceManagerPage />} />
                          <Route path="products/details" element={<AdminProductDetailsManagerPage />} />
                          <Route path="product-page-content" element={<AdminProductPageContentPage />} />
                          <Route path="products/bulk-upload" element={<AdminBulkProductUploadPage />} />
                          <Route path="products/:id/edit" element={<AdminFullProductEditorPage />} />
                          <Route path="categories" element={<AdminCategoryManagerPage />} />
                          <Route path="diamonds" element={<AdminDiamondManagerPage />} />
                          <Route path="excel-import" element={<AdminExcelImportPage />} />
                          <Route path="custom-requests" element={<AdminCustomRequestsPage />} />
                          <Route path="orders" element={<AdminOrdersPage />} />
                          <Route path="orders/:id" element={<AdminOrderDetailPage />} />
                          <Route path="payments" element={<AdminPaymentsPage />} />
                          <Route path="customers" element={<AdminCustomersPage />} />
                          <Route path="statements" element={<AdminStatementsPage />} />
                          <Route path="payment-methods" element={<AdminPaymentMethodsPage />} />
                          <Route path="payment-settings" element={<AdminPaymentSettingsPage />} />
                          <Route path="homepage-manager" element={<AdminHomepageManagerPage />} />
                          <Route path="reviews" element={<AdminReviewsManagerPage />} />
                          <Route path="pages" element={<AdminPagesDashboardPage />} />
                          <Route path="pages/:slug/edit" element={<AdminPageEditorPage />} />
                          <Route path="ring-size-guide" element={<AdminRingSizeGuidePage />} />
                          <Route path="customer-pricing" element={<AdminCustomerPricingPage />} />
                          <Route path="cms/page-builder" element={<AdminPageBuilderPage />} />
                          <Route path="cms/pages/:slug/sections/:sectionId/edit" element={<AdminSectionEditorPage />} />
                          <Route path="cms/sections/:sectionId/edit" element={<AdminSectionEditorPage />} />
                          <Route path="cms/menu-manager" element={<AdminMegaMenuManagerPage />} />
                          <Route path="header-manager" element={<AdminHeaderManagerPage />} />
                          <Route path="megamenu-manager" element={<AdminMegaMenuManagerPage />} />
                          <Route path="footer-manager" element={<AdminFooterManagerPage />} />
                          <Route path="filters" element={<AdminFilterManagerPage />} />
                          <Route path="diamond-filters" element={<AdminDiamondFilterManagerPage />} />
                          <Route path="promotions" element={<AdminPromotionsPage />} />
                          <Route path="seo" element={<AdminSeoPage />} />
                          <Route path="media" element={<AdminMediaLibraryPage />} />
                          <Route path="theme" element={<AdminThemeSettingsPage />} />
                          <Route path="text-labels" element={<AdminTextLabelsPage />} />
                          <Route path="holiday-mode" element={<AdminHolidayModePage />} />
                          <Route path="settings" element={<AdminSettingsPage />} />
                          <Route path="users" element={<AdminUserManagementPage />} />
                          <Route path="activity-logs" element={<AdminLogsPage />} />
                        </Route>
                        {/* Convenient Admin Aliases */}
                        <Route path="/admin" element={<Navigate to={PRIVATE_ADMIN_PATH} replace />} />
                        <Route path="/admin/login" element={<Navigate to={`${PRIVATE_ADMIN_PATH}/login`} replace />} />
                        <Route path="/admin/product-page-content" element={<ProtectedAdminLayout />}>
                          <Route index element={<AdminProductPageContentPage />} />
                        </Route>

                        {/* PRIVATE INTERNAL BUSINESS & SALES ERP SYSTEM */}
                        <Route path={PRIVATE_BUSINESS_PATH} element={<ProtectedBusinessLayout />}>
                          <Route index element={<Navigate to={`${PRIVATE_BUSINESS_PATH}/dashboard`} replace />} />
                          <Route path="dashboard" element={<BusinessDashboardPage />} />
                          <Route path="employees" element={<BusinessEmployeesPage />} />
                          <Route path="employees/new" element={<BusinessEmployeesPage />} />
                          <Route path="employees/:id" element={<BusinessEmployeeDetailPage />} />
                          <Route path="attendance" element={<BusinessAttendancePage />} />
                          <Route path="attendance/report" element={<BusinessAttendanceReportPage />} />
                          <Route path="sales" element={<BusinessSalesListPage />} />
                          <Route path="sales/new" element={<BusinessNewSalePage />} />
                          <Route path="sales/:id" element={<BusinessSaleDetailPage />} />
                          <Route path="commissions" element={<BusinessCommissionPage />} />
                          <Route path="commission-plans" element={<BusinessCommissionPlansPage />} />
                          <Route path="targets" element={<BusinessSalesTargetsPage />} />
                          <Route path="customers" element={<BusinessCustomersPage />} />
                          <Route path="suppliers" element={<BusinessSuppliersPage />} />
                          <Route path="reports" element={<BusinessReportsPage />} />
                          <Route path="import" element={<BusinessExcelImportPage />} />
                          <Route path="audit-logs" element={<BusinessAuditLogsPage />} />
                          <Route path="settings" element={<BusinessSettingsPage />} />
                        </Route>

                        {/* Storefront Routes */}
                        <Route path="*" element={<StorefrontLayout />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </QuickViewProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
