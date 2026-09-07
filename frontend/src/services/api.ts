import axios from 'axios';
import { Product, Diamond, Category, PageSection, MenuItem, CustomRequest, User, HeroBanner } from '../types';

const getBaseURL = () => {
  if ((import.meta as any).env?.VITE_API_URL && !(import.meta as any).env?.VITE_API_URL.includes('.php')) {
    return (import.meta as any).env.VITE_API_URL;
  }
  return '/api/v1';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_session_token') || localStorage.getItem('app_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    const contentType = String(response.headers?.['content-type'] || '');
    if (typeof response.data === 'string' && (response.data.trim().startsWith('<!DOCTYPE') || contentType.includes('text/html'))) {
      const customError: any = new Error('Server returned HTML instead of JSON API response.');
      customError.isHtmlFallback = true;
      customError.config = response.config;
      return Promise.reject(customError);
    }
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (
      originalConfig &&
      !originalConfig._retriedDirectPhp &&
      (error.isHtmlFallback || (error.response && (error.response.status === 404 || error.response.status === 405)))
    ) {
      originalConfig._retriedDirectPhp = true;
      const originalUrl = originalConfig.url || '';
      const endpoint = cleanEndpoint(originalUrl);
      originalConfig.baseURL = typeof window !== 'undefined' ? `${window.location.origin}/api/index.php/v1` : '/api/index.php/v1';
      originalConfig.url = endpoint;
      try {
        return await API.request(originalConfig);
      } catch (retryErr) {
        return Promise.reject(retryErr);
      }
    }

    if (error.response && error.response.status === 401) {
      if (window.location.pathname.includes('/vault-mgmt-k8m3x9q2v7') && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_profile');
        window.location.href = '/vault-mgmt-k8m3x9q2v7/login';
      }
    }
    return Promise.reject(error);
  }
);

const cleanEndpoint = (url: string) => {
  if (url.startsWith('/api/index.php/v1/')) {
    return url.substring(18);
  }
  if (url.startsWith('api/index.php/v1/')) {
    return url.substring(17);
  }
  if (url.startsWith('/api/v1/')) {
    return url.substring(7);
  }
  if (url.startsWith('api/v1/')) {
    return url.substring(6);
  }
  return url;
};

export const api = {
  // Generic Axios Wrappers
  get: async (url: string, config?: any) => {
    return API.get(cleanEndpoint(url), config);
  },
  post: async (url: string, data?: any, config?: any) => {
    return API.post(cleanEndpoint(url), data, config);
  },
  put: async (url: string, data?: any, config?: any) => {
    return API.put(cleanEndpoint(url), data, config);
  },
  delete: async (url: string, config?: any) => {
    return API.delete(cleanEndpoint(url), config);
  },

  // Auth APIs

  getCurrentUser: async () => {
    const res = await API.get<User>('/auth/me');
    return res.data;
  },

  googleAuth: async (payload: { credential?: string; token?: string; accessToken?: string; userInfo?: any }) => {
    const res = await API.post<{ token: string; user?: User }>('/auth/google', payload);
    return res.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const res = await API.post<{ token: string; user?: User }>('/auth/login', credentials);
    return res.data;
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const res = await API.post<{ token: string; user?: User }>('/auth/register', data);
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await API.post<{ message: string }>('/auth/forgot-password', { email });
    return res.data;
  },

  adminLogin: async (credentials: { email: string; password: string }) => {
    const res = await API.post<{ token: string; user?: User }>('/admin/auth/login', credentials);
    return res.data;
  },

  // Public Storefront APIs
  getProducts: async (params?: Record<string, any>) => {
    const res = await API.get<{ products: Product[]; pagination: any }>('/products', { params });
    return res.data;
  },

  getProductBySlug: async (slug: string) => {
    const rawSlug = typeof slug === 'string' ? slug.trim() : '';
    const cleanSlug = encodeURIComponent(decodeURIComponent(rawSlug));
    const res = await API.get<{ product: Product; relatedProducts: Product[] }>(`/products/${cleanSlug}`);
    return res.data;
  },

  getCategories: async () => {
    const res = await API.get<any[]>('/categories');
    return res.data;
  },

  getCollections: async () => {
    const res = await API.get<any[]>('/collections');
    return res.data;
  },

  // Diamond Vault APIs
  getDiamonds: async (params?: Record<string, any>) => {
    const res = await API.get<{ diamonds: Diamond[]; pagination: any }>('/diamonds', { params });
    return res.data;
  },

  getDiamondById: async (id: string) => {
    const res = await API.get<Diamond>(`/diamonds/${id}`);
    return res.data;
  },

  getWhatsAppInquiryMessage: async (id: string) => {
    const res = await API.get<{ messageText: string; whatsappUrl: string }>(`/diamonds/${id}/whatsapp`);
    return res.data;
  },

  getDiamondFilterConfig: async () => {
    try {
      const res = await API.get<any>('/diamonds/filters/config');
      return res.data;
    } catch (e) {
      console.warn('getDiamondFilterConfig fallback:', e);
      return null;
    }
  },

  updateDiamondFilterConfig: async (configData: any) => {
    const res = await API.post<any>('/admin/diamonds/filters/config', configData);
    return res.data;
  },

  bulkPriceAdjust: async (payload: { action: 'INCREASE' | 'DECREASE'; type: 'PERCENTAGE' | 'FIXED_AMOUNT'; value: number; scope: 'ALL' | 'WHITE' | 'FANCY' | 'LAB_GROWN' | 'NATURAL' }) => {
    const res = await API.post<{ success: boolean; message: string; affectedRows: number; rule: any }>('/admin/diamonds/bulk-price-adjust', payload);
    return res.data;
  },

  getBulkPriceRule: async () => {
    const res = await API.get<any>('/admin/diamonds/bulk-price-rule');
    return res.data;
  },

  createDiamond: async (data: any) => {
    const res = await API.post<Diamond>('/admin/diamonds', data);
    return res.data;
  },

  updateDiamond: async (id: string, data: any) => {
    const res = await API.put<Diamond>(`/admin/diamonds/${id}`, data);
    return res.data;
  },

  duplicateDiamond: async (id: string) => {
    const res = await API.post<Diamond>(`/admin/diamonds/${id}/duplicate`);
    return res.data;
  },

  deleteDiamond: async (id: string) => {
    const res = await API.delete(`/admin/diamonds/${id}`);
    return res.data;
  },

  deleteAllDiamonds: async () => {
    try {
      const res = await API.delete<{ message: string; count: number }>('/admin/diamonds/all');
      return res.data;
    } catch (err) {
      const res = await API.post<{ message: string; count: number }>('/admin/diamonds/wipe-all');
      return res.data;
    }
  },

  // CMS & Page Builder APIs
  getAllPages: async () => {
    try {
      const res = await API.get<any[]>('/cms/pages');
      return res.data;
    } catch (err) {
      console.warn('getAllPages fallback:', err);
      return [{ title: 'Homepage', slug: 'home', sections: [] }];
    }
  },

  getPageBySlug: async (slug: string) => {
    try {
      const res = await API.get<any>(`/cms/pages/${slug}`);
      return res.data;
    } catch (err) {
      console.warn(`getPageBySlug fallback for ${slug}:`, err);
      return { title: slug, slug, sections: [] };
    }
  },

  savePageDraft: async (slug: string, data: any) => {
    const res = await API.post(`/admin/cms/pages/${slug}/draft`, data);
    return res.data;
  },

  publishPage: async (slug: string, data: any) => {
    const res = await API.post(`/admin/cms/pages/${slug}/publish`, data);
    return res.data;
  },

  getPageRevisions: async (slug: string) => {
    const res = await API.get<any[]>(`/admin/cms/pages/${slug}/revisions`);
    return res.data;
  },

  restorePageRevision: async (slug: string, revisionId: string) => {
    const res = await API.post(`/admin/cms/pages/${slug}/restore/${revisionId}`);
    return res.data;
  },

  // FAQ APIs
  getFaqs: async (category?: string) => {
    const res = await API.get<any[]>('/faqs', { params: { category } });
    return res.data;
  },
  createFaq: async (data: any) => {
    const res = await API.post('/admin/faqs', data);
    return res.data;
  },
  updateFaq: async (id: string, data: any) => {
    const res = await API.put(`/admin/faqs/${id}`, data);
    return res.data;
  },
  deleteFaq: async (id: string) => {
    const res = await API.delete(`/admin/faqs/${id}`);
    return res.data;
  },

  // Blog APIs
  getBlogPosts: async () => {
    const res = await API.get<any[]>('/blog');
    return res.data;
  },
  getBlogPostBySlug: async (slug: string) => {
    const res = await API.get<any>(`/blog/${slug}`);
    return res.data;
  },
  createBlogPost: async (data: any) => {
    const res = await API.post('/admin/blog', data);
    return res.data;
  },
  updateBlogPost: async (id: string, data: any) => {
    const res = await API.put(`/admin/blog/${id}`, data);
    return res.data;
  },
  deleteBlogPost: async (id: string) => {
    const res = await API.delete(`/admin/blog/${id}`);
    return res.data;
  },

  createPage: async (data: { title: string; slug: string; status?: string }) => {
    const res = await API.post('/admin/cms/pages-create', data);
    return res.data;
  },

  deletePage: async (slug: string) => {
    const res = await API.delete(`/admin/cms/pages/${slug}`);
    return res.data;
  },

  getMenus: async () => {
    try {
      const res = await API.get<any>('/cms/menus');
      const data = res.data;
      // Normalize responses: ensure callers always receive an array of menus
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.menus)) return data.menus;
      // If API returned an object or unexpected shape, return empty array to avoid runtime .find/.map errors
      return [];
    } catch (err) {
      console.warn('getMenus fallback:', err);
      return [];
    }
  },

  updateMenuByLocation: async (location: string, data: { items: any[] }) => {
    const res = await API.post(`/admin/cms/menus/${location}`, data);
    return res.data;
  },

  submitCustomRequest: async (data: any) => {
    const res = await API.post<CustomRequest>('/custom-requests', data);
    return res.data;
  },

  createCustomRequest: async (data: any) => {
    const res = await API.post('/custom-requests', data);
    return res.data;
  },

  getCustomRequests: async () => {
    const res = await API.get<CustomRequest[]>('/admin/custom-requests');
    return res.data;
  },

  updateCustomRequestStatus: async (id: string, data: { status: string; note?: string; cadFileUrl?: string; adminNotes?: string }) => {
    const res = await API.patch<CustomRequest>(`/admin/custom-requests/${id}`, data);
    return res.data;
  },

  // SEO & Redirect APIs
  getSeoMetadata: async (params?: Record<string, any>) => {
    const res = await API.get<any>('/seo', { params });
    return res.data;
  },

  updateSeoMetadata: async (data: any) => {
    const res = await API.post<any>('/admin/seo', data);
    return res.data;
  },

  getRedirects: async () => {
    const res = await API.get<any[]>('/admin/redirects');
    return res.data;
  },

  createRedirect: async (data: { oldUrl: string; newUrl: string; statusCode?: number }) => {
    const res = await API.post<any>('/admin/redirects', data);
    return res.data;
  },

  // Admin APIs
  loginAdmin: async (credentials: { username?: string; email?: string; password: string }) => {
    const res = await API.post<{ token: string; user: User }>('/admin/auth/login', credentials);
    return res.data;
  },

  getAdminProfile: async () => {
    const res = await API.get<User>('/admin/auth/me');
    return res.data;
  },

  getAdminLogs: async () => {
    const res = await API.get<any[]>('/admin/logs');
    return res.data;
  },

  // Excel Diamond Import APIs
  downloadExcelTemplate: () => {
    window.open('/api/v1/admin/diamonds/excel-template', '_blank');
  },

  parseExcelFile: async (formData: FormData) => {
    const res = await API.post('/admin/diamonds/excel-parse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  executeDiamondImport: async (payload: { diamonds: any[]; mode: string; fileName?: string }) => {
    const res = await API.post('/admin/diamonds/excel-import', payload);
    return res.data;
  },

  uploadZipImages: async (formData: FormData) => {
    const res = await API.post('/admin/diamonds/zip-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  getImportHistory: async () => {
    const res = await API.get<any[]>('/admin/diamonds/import-history');
    return res.data;
  },

  updateDiamondStatus: async (id: string, data: { status?: string; price?: number }) => {
    const res = await API.patch<Diamond>(`/admin/diamonds/${id}`, data);
    return res.data;
  },

  updatePageSections: async (slug: string, data: { sections: any[]; title?: string; status?: string }) => {
    const res = await API.post(`/admin/cms/pages/${slug}`, data);
    return res.data;
  },

  updateMenu: async (location: string, items: any[]) => {
    const res = await API.post(`/admin/cms/menus/${location}`, { items });
    return res.data;
  },

  // Admin Product & Category Management
  createProduct: async (data: Partial<Product>) => {
    const res = await API.post<Product>('/admin/products', data);
    return res.data;
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    const res = await API.put<Product>(`/admin/products/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id: string) => {
    const res = await API.delete<{ message: string; deletedId: string }>(`/admin/products/${id}`);
    return res.data;
  },

  createCategory: async (data: Partial<Category>) => {
    const res = await API.post<Category>('/admin/categories', data);
    return res.data;
  },

  updateCategory: async (id: string, data: Partial<Category>) => {
    const res = await API.put<Category>(`/admin/categories/${id}`, data);
    return res.data;
  },

  deleteCategory: async (id: string) => {
    const res = await API.delete<{ message: string; deletedId: string }>(`/admin/categories/${id}`);
    return res.data;
  },

  // Auth Profile & User Management
  getAdminUsers: async (params?: { search?: string; role?: string }) => {
    const res = await API.get('/admin/users', { params });
    return res.data;
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await API.patch(`/admin/users/${userId}/role`, { role });
    return res.data;
  },

  // Dynamic Filters & Attributes APIs
  getFilterGroups: async (params?: { category?: string; targetType?: string; includeDisabled?: boolean }) => {
    const res = await API.get('/filters', { params });
    return res.data;
  },

  // Promotions & Banners APIs
  getPromotions: async (params?: { type?: string; includeInactive?: boolean }) => {
    const res = await API.get('/promotions', { params });
    return res.data;
  },

  createPromotion: async (data: any) => {
    const res = await API.post('/admin/promotions', data);
    return res.data;
  },

  updatePromotion: async (id: string, data: any) => {
    const res = await API.put(`/admin/promotions/${id}`, data);
    return res.data;
  },

  deletePromotion: async (id: string) => {
    const res = await API.delete(`/admin/promotions/${id}`);
    return res.data;
  },

  // Reviews APIs
  getPublicReviews: async () => {
    const res = await API.get('/reviews');
      try {
        const res = await API.get<any>('/reviews');
        const data = res.data;
        if (Array.isArray(data)) return data;
        // some backends may return { reviews: [...] }
        if (data && Array.isArray(data.reviews)) return data.reviews;
        return [];
      } catch (err) {
        console.warn('getPublicReviews fallback:', err);
        return [];
      }
  },

  getAdminReviews: async () => {
    const res = await API.get('/admin/reviews');
    return res.data;
  },

  createReview: async (data: any) => {
    const res = await API.post('/admin/reviews', data);
    return res.data;
  },

  updateReview: async (id: string, data: any) => {
    const res = await API.put(`/admin/reviews/${id}`, data);
    return res.data;
  },

  deleteReview: async (id: string) => {
    const res = await API.delete(`/admin/reviews/${id}`);
    return res.data;
  },

  // Site Settings APIs (Header, Footer, Theme, Labels, Contact Info)
  getSiteSettings: async (keys?: string) => {
    const res = await API.get('/site-settings', { params: { keys } });
    return res.data;
  },

  updateSiteSetting: async (key: string, value: any) => {
    const res = await API.post('/admin/site-settings', { key, value });
    return res.data;
  },

  updateSiteSettings: async (settings: Record<string, any>) => {
    const res = await API.post('/admin/site-settings', { key: 'site_settings', value: settings });
    return res.data;
  },

  // Holiday Mode & Store Status APIs
  getHolidayModeStatus: async () => {
    const res = await API.get('/settings/holiday-mode');
    return res.data;
  },

  getHolidayModeSettings: async () => {
    const res = await API.get('/settings/holiday-mode');
    return res.data;
  },

  updateHolidayModeSettings: async (settings: any) => {
    const isEnabled = Boolean(settings.holiday_mode_enabled ?? settings.active ?? false);
    const msg = settings.holiday_mode_message || settings.message || settings.holiday_message || '';
    const reopenMsg = settings.holiday_mode_reopening_message || settings.reopeningMessage || '';
    const bText = settings.holiday_mode_banner_text || settings.bannerText || '';
    const sBanner = Boolean(settings.holiday_mode_show_banner ?? settings.showBanner ?? true);
    const start = settings.holiday_mode_start || settings.startDate || '';
    const end = settings.holiday_mode_end || settings.endDate || '';

    const res = await API.put('/admin/settings/holiday-mode', {
      holiday_mode_enabled: isEnabled,
      holiday_mode: isEnabled,
      active: isEnabled,
      holiday_mode_message: msg,
      message: msg,
      holiday_message: msg,
      holiday_mode_reopening_message: reopenMsg,
      reopeningMessage: reopenMsg,
      holiday_mode_banner_text: bText,
      bannerText: bText,
      holiday_mode_show_banner: sBanner,
      showBanner: sBanner,
      holiday_mode_start: start,
      startDate: start,
      holiday_mode_end: end,
      endDate: end,
    });
    return res.data;
  },

  // Central Media Library APIs
  getAllMedia: async (search?: string) => {
    const res = await API.get('/media', { params: { search } });
    return res.data;
  },

  uploadMedia: async (data: any) => {
    const res = await API.post('/admin/media', data);
    return res.data;
  },

  deleteMedia: async (id: string) => {
    const res = await API.delete(`/admin/media/${id}`);
    return res.data;
  },

  deleteUploadedFile: async (url: string) => {
    if (!url || typeof url !== 'string' || !url.startsWith('/uploads/')) {
      return { deleted: false };
    }
    try {
      const res = await API.post('/admin/media/delete-file', { url });
      return res.data;
    } catch (e) {
      console.warn('Notice: deleteUploadedFile error:', e);
      return { deleted: false };
    }
  },

  // Centralized Global Product Filter APIs
  getPublicFilters: async (params?: { category?: string; jewelleryType?: string }) => {
    const res = await API.get('/filters', { params });
    return res.data;
  },

  getAdminFilters: async () => {
    const res = await API.get('/admin/filters');
    return res.data;
  },

  createFilterConfig: async (data: any) => {
    const res = await API.post('/admin/filters', data);
    return res.data;
  },

  updateFilterConfig: async (id: string, data: any) => {
    const res = await API.put(`/admin/filters/${id}`, data);
    return res.data;
  },

  deleteFilterConfig: async (id: string) => {
    const res = await API.delete(`/admin/filters/${id}`);
    return res.data;
  },

  createFilterOption: async (filterId: string, data: any) => {
    const res = await API.post(`/admin/filters/${filterId}/options`, data);
    return res.data;
  },

  updateFilterOption: async (optionId: string, data: any) => {
    const res = await API.put(`/admin/filters/options/${optionId}`, data);
    return res.data;
  },

  deleteFilterOption: async (optionId: string) => {
    const res = await API.delete(`/admin/filters/options/${optionId}`);
    return res.data;
  },

  // Dedicated Diamond Filter APIs
  getDiamondFilters: async (params?: { includeDisabled?: boolean }) => {
    const res = await API.get('/diamond-filters', { params });
    return res.data;
  },

  updateDiamondFilterGroup: async (id: string, data: any) => {
    const res = await API.put(`/admin/diamond-filters/${id}`, data);
    return res.data;
  },

  createDiamondFilterOption: async (data: any) => {
    const res = await API.post('/admin/diamond-filter-options', data);
    return res.data;
  },

  updateDiamondFilterOption: async (id: string, data: any) => {
    const res = await API.put(`/admin/diamond-filter-options/${id}`, data);
    return res.data;
  },

  deleteDiamondFilterOption: async (id: string) => {
    const res = await API.delete(`/admin/diamond-filter-options/${id}`);
    return res.data;
  },

  // Mega Menu Cards APIs
  getMegaMenuCards: async (params?: { category?: string; includeDisabled?: boolean }) => {
    const res = await API.get('/mega-menu-cards', { params });
    return res.data;
  },

  createMegaMenuCard: async (data: any) => {
    const res = await API.post('/admin/mega-menu-cards', data);
    return res.data;
  },

  updateMegaMenuCard: async (id: string, data: any) => {
    const res = await API.put(`/admin/mega-menu-cards/${id}`, data);
    return res.data;
  },

  deleteMegaMenuCard: async (id: string) => {
    const res = await API.delete(`/admin/mega-menu-cards/${id}`);
    return res.data;
  },

  // Orders & Financial APIs
  getOrders: async (params?: { status?: string; search?: string; dateFrom?: string; dateTo?: string }) => {
    const res = await API.get('/admin/orders', { params });
    return res.data;
  },

  getOrderById: async (id: string) => {
    const res = await API.get(`/admin/orders/${id}`);
    return res.data;
  },

  createOrder: async (data: any) => {
    const res = await API.post('/admin/orders', data);
    return res.data;
  },

  createPublicOrder: async (data: any) => {
    const res = await API.post('/checkout/create-order', data);
    return res.data;
  },

  trackPublicOrder: async (orderNumber: string, email?: string) => {
    const res = await API.get('/orders/track', { params: { orderNumber, email } });
    return res.data;
  },

  getMyOrders: async (email: string) => {
    const res = await API.get('/orders/my-orders', { params: { email } });
    return res.data;
  },

  updateOrder: async (id: string, data: any) => {
    const res = await API.put(`/admin/orders/${id}`, data);
    return res.data;
  },

  getPayments: async (params?: { search?: string; method?: string; status?: string }) => {
    const res = await API.get('/admin/payments', { params });
    return res.data;
  },

  createPayment: async (data: any) => {
    const res = await API.post('/admin/payments', data);
    return res.data;
  },

  voidPayment: async (id: string, reason: string) => {
    const res = await API.post(`/admin/payments/${id}/void`, { reason });
    return res.data;
  },

  createRefund: async (data: any) => {
    const res = await API.post('/admin/refunds', data);
    return res.data;
  },

  getPaymentMethods: async () => {
    const res = await API.get('/admin/payment-methods');
    return res.data;
  },

  createPaymentMethod: async (data: any) => {
    const res = await API.post('/admin/payment-methods', data);
    return res.data;
  },

  updatePaymentMethod: async (id: string, data: any) => {
    const res = await API.put(`/admin/payment-methods/${id}`, data);
    return res.data;
  },

  getFinancialStatementData: async (params?: { type?: string; fromDate?: string; toDate?: string; customerEmail?: string; orderId?: string }) => {
    const res = await API.get('/admin/reports/statements', { params });
    return res.data;
  },

  createPayPalOrder: async (data: { amount: number; currency?: string; description?: string }) => {
    const res = await API.post('/payments/paypal/create-order', data);
    return res.data;
  },

  capturePayPalOrder: async (data: { paypalOrderId: string; dbOrderId?: string }) => {
    const res = await API.post('/payments/paypal/capture-order', data);
    return res.data;
  },

  getPayPalClientId: async () => {
    const res = await API.get('/payments/paypal/client-id');
    return res.data;
  },

  // Hero Banner APIs
  getPublicHeroBanners: async () => {
    const res = await API.get<HeroBanner[]>('/hero-banners');
    return res.data;
  },

  getAdminHeroBanners: async () => {
    const res = await API.get<HeroBanner[]>('/admin/hero-banners');
    return res.data;
  },

  createHeroBanner: async (formData: FormData) => {
    const res = await API.post<HeroBanner>('/admin/hero-banners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateHeroBanner: async (id: string, formData: FormData) => {
    const res = await API.put<HeroBanner>(`/admin/hero-banners/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteHeroBanner: async (id: string) => {
    const res = await API.delete<{ message: string }>(`/admin/hero-banners/${id}`);
    return res.data;
  },

  reorderHeroBanners: async (orderedIds: string[]) => {
    const res = await API.post<{ message: string }>('/admin/hero-banners/reorder', { orderedIds });
    return res.data;
  },

  uploadHeroBannerImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await API.post<{ url: string; path: string }>('/admin/hero-banners/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};
