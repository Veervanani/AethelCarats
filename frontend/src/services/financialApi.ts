import axios from 'axios';

const getBaseURL = () => {
  if ((import.meta as any).env?.VITE_API_URL) {
    return (import.meta as any).env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://127.0.0.1:8000/api/v1';
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/index.php/v1`;
  }
  return '/api/index.php/v1';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fj_admin_token') || localStorage.getItem('floksy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const financialApi = {
  // ORDERS
  getOrders: async (params?: Record<string, any>) => {
    const res = await API.get('/admin/orders', { params });
    return res.data;
  },

  getOrderSummaryMetrics: async (params?: Record<string, any>) => {
    const res = await API.get('/admin/orders/summary', { params });
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

  updateOrder: async (id: string, data: any) => {
    const res = await API.put(`/admin/orders/${id}`, data);
    return res.data;
  },

  deleteOrder: async (id: string) => {
    const res = await API.delete(`/admin/orders/${id}`);
    return res.data;
  },

  wipeAllOrders: async () => {
    const res = await API.post('/admin/orders/wipe-all');
    return res.data;
  },

  // PAYMENTS
  getPayments: async (params?: Record<string, any>) => {
    const res = await API.get('/admin/payments', { params });
    return res.data;
  },

  createPayment: async (data: any) => {
    const res = await API.post('/admin/payments', data);
    return res.data;
  },

  updatePayment: async (id: string, data: any) => {
    const res = await API.put(`/admin/payments/${id}`, data);
    return res.data;
  },

  voidPayment: async (id: string, reason: string) => {
    const res = await API.post(`/admin/payments/${id}/void`, { reason });
    return res.data;
  },

  // PAYMENT METHODS
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

  // REFUNDS
  getRefunds: async (params?: Record<string, any>) => {
    const res = await API.get('/admin/refunds', { params });
    return res.data;
  },

  createRefund: async (data: any) => {
    const res = await API.post('/admin/refunds', data);
    return res.data;
  },

  // CUSTOMERS
  getCustomers: async (params?: Record<string, any>) => {
    const res = await API.get('/admin/customers', { params });
    return res.data;
  },

  getCustomerDetail: async (id: string) => {
    const res = await API.get(`/admin/customers/${id}`);
    return res.data;
  },

  // PDF DOWNLOAD & PREVIEW HELPERS
  getOrderStatementPdfUrl: (orderId: string) => {
    return `${API.defaults.baseURL}/admin/reports/order-statement/${orderId}/pdf`;
  },

  getPaymentReceiptPdfUrl: (paymentId: string) => {
    return `${API.defaults.baseURL}/admin/reports/payment-receipt/${paymentId}/pdf`;
  },

  getInvoicePdfUrl: (orderId: string) => {
    return `${API.defaults.baseURL}/admin/reports/invoice/${orderId}/pdf`;
  },

  getCustomerStatementPdfUrl: (customerId: string, fromDate?: string, toDate?: string) => {
    let url = `${API.defaults.baseURL}/admin/reports/customer-statement/${customerId}/pdf`;
    const query = new URLSearchParams();
    if (fromDate) query.append('fromDate', fromDate);
    if (toDate) query.append('toDate', toDate);
    if (query.toString()) url += `?${query.toString()}`;
    return url;
  },

  getMonthlyStatementPdfUrl: (month: number, year: number) => {
    return `${API.defaults.baseURL}/admin/reports/monthly-statement/pdf?month=${month}&year=${year}`;
  },

  getYearlyStatementPdfUrl: (year: number) => {
    return `${API.defaults.baseURL}/admin/reports/yearly-statement/pdf?year=${year}`;
  },

  getCustomStatementPdfUrl: (fromDate: string, toDate: string, orderStatus = 'ALL', paymentStatus = 'ALL') => {
    return `${API.defaults.baseURL}/admin/reports/custom-statement/pdf?fromDate=${fromDate}&toDate=${toDate}&orderStatus=${orderStatus}&paymentStatus=${paymentStatus}`;
  },

  // DATA EXPORT (EXCEL & CSV)
  downloadExportFile: async (format: 'excel' | 'csv', type = 'orders', fromDate?: string, toDate?: string) => {
    const token = localStorage.getItem('fj_admin_token') || localStorage.getItem('floksy_token');
    const params: any = { format, type };
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    const response = await API.get('/admin/reports/export', {
      params,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([response.data], {
      type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    const ext = format === 'csv' ? 'csv' : 'xlsx';
    link.setAttribute('download', `Floksy_Jewel_${type}_${new Date().toISOString().split('T')[0]}.${ext}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // AUTHENTICATED PDF DOWNLOAD TRIGGER
  downloadPdfBlob: async (url: string, filename: string) => {
    const token = localStorage.getItem('fj_admin_token') || localStorage.getItem('floksy_token');
    const response = await axios.get(url, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // FINANCIAL AUDIT LOGS
  getFinancialAuditLogs: async () => {
    const res = await API.get('/admin/financial-audit-logs');
    return res.data;
  },

  // PAYMENT SETTINGS
  getPaymentSettings: async () => {
    const res = await API.get('/admin/payment-settings');
    return res.data;
  },

  updatePaymentSettings: async (data: Record<string, string>) => {
    const res = await API.post('/admin/payment-settings', data);
    return res.data;
  },
};
