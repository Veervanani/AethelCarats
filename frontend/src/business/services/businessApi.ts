import axios from 'axios';
import {
  Employee,
  AttendanceRecord,
  InternalSale,
  CommissionRecord,
  CommissionPlan,
  SalesTarget,
  Supplier,
  BusinessCustomer,
  BusinessDashboardMetrics,
} from '../types';

const getBaseURL = () => {
  if ((import.meta as any).env?.VITE_API_URL) {
    const raw = (import.meta as any).env.VITE_API_URL;
    return raw.endsWith('/v1') ? raw : `${raw}/v1`;
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api/v1';
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/v1`;
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
  const token = localStorage.getItem('fj_admin_token') || localStorage.getItem('floksy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const businessApi = {
  // Dashboard
  getDashboardMetrics: async (params?: Record<string, any>) => {
    const res = await API.get<BusinessDashboardMetrics>('/business/dashboard', { params });
    return res.data;
  },

  // Employees
  getEmployees: async (params?: Record<string, any>) => {
    const res = await API.get<{ employees: Employee[]; pagination: any }>('/business/employees', { params });
    return res.data;
  },

  getEmployeeById: async (id: string) => {
    const res = await API.get<{ employee: Employee; stats: any }>(`/business/employees/${id}`);
    return res.data;
  },

  createEmployee: async (data: any) => {
    const res = await API.post<Employee>('/business/employees', data);
    return res.data;
  },

  updateEmployee: async (id: string, data: any) => {
    const res = await API.put<Employee>(`/business/employees/${id}`, data);
    return res.data;
  },

  toggleEmployeeStatus: async (id: string) => {
    const res = await API.patch<Employee>(`/business/employees/${id}/status`);
    return res.data;
  },

  // Attendance
  getAttendance: async (params?: Record<string, any>) => {
    const res = await API.get<{ records: AttendanceRecord[]; pagination: any }>('/business/attendance', { params });
    return res.data;
  },

  getTodayAttendanceSummary: async () => {
    const res = await API.get<any>('/business/attendance/today');
    return res.data;
  },

  checkIn: async (data?: { employeeId?: string; notes?: string }) => {
    const res = await API.post('/business/attendance/check-in', data || {});
    return res.data;
  },

  checkOut: async (data?: { employeeId?: string; notes?: string }) => {
    const res = await API.post('/business/attendance/check-out', data || {});
    return res.data;
  },

  manualAttendanceEntry: async (data: any) => {
    const res = await API.post('/business/attendance/manual', data);
    return res.data;
  },

  getMonthlyAttendanceReport: async (month?: string) => {
    const res = await API.get<any>('/business/attendance/report', { params: { month } });
    return res.data;
  },

  markAllEmployeesPresentForMonth: async (month?: string) => {
    const res = await API.post<any>('/business/attendance/mark-all-present', { month });
    return res.data;
  },

  deleteEmployee: async (id: string) => {
    const res = await API.delete<any>(`/business/employees/${id}`);
    return res.data;
  },

  deleteEmployeesBatch: async (ids: string[]) => {
    const res = await API.post<any>('/business/employees/batch', { ids });
    return res.data;
  },

  // Sales
  getSales: async (params?: Record<string, any>) => {
    const res = await API.get<{ sales: InternalSale[]; summary: any; pagination: any }>('/business/sales', { params });
    return res.data;
  },

  getSaleById: async (id: string) => {
    const res = await API.get<InternalSale>(`/business/sales/${id}`);
    return res.data;
  },

  createSale: async (data: any) => {
    const res = await API.post<InternalSale>('/business/sales', data);
    return res.data;
  },

  updateSale: async (id: string, data: any) => {
    const res = await API.put<InternalSale>(`/business/sales/${id}`, data);
    return res.data;
  },

  updateDollarRate: async (id: string, dollarRate: number) => {
    const res = await API.patch<any>(`/business/sales/${id}`, { dollarRate });
    return res.data;
  },

  deleteSale: async (id: string) => {
    const res = await API.delete<{ message: string; deletedId: string }>(`/business/sales/${id}`);
    return res.data;
  },

  deleteSalesBatch: async (ids: string[]) => {
    const res = await API.post<{ message: string }>('/business/sales/batch', { ids });
    return res.data;
  },

  bulkUpdateSales: async (ids: string[], updates: Record<string, any>) => {
    const res = await API.post<{ message: string; updatedCount: number }>('/business/sales/bulk-update', { ids, updates });
    return res.data;
  },

  deleteAllSales: async () => {
    const res = await API.post<{ message: string }>('/business/sales/delete-all');
    return res.data;
  },

  calculateSalesPreview: async (data: any) => {
    const res = await API.post('/business/sales/calculate-preview', data);
    return res.data;
  },

  // Commissions
  getCommissions: async (params?: Record<string, any>) => {
    const res = await API.get<{ commissions: CommissionRecord[]; stats: any; pagination: any }>('/business/commissions', { params });
    return res.data;
  },

  approveCommission: async (id: string, notes?: string) => {
    const res = await API.post(`/business/commissions/${id}/approve`, { notes });
    return res.data;
  },

  payCommission: async (id: string, paymentReference?: string, notes?: string) => {
    const res = await API.post(`/business/commissions/${id}/pay`, { paymentReference, notes });
    return res.data;
  },

  getCommissionPlans: async () => {
    const res = await API.get<CommissionPlan[]>('/business/commission-plans');
    return res.data;
  },

  createCommissionPlan: async (data: any) => {
    const res = await API.post<CommissionPlan>('/business/commission-plans', data);
    return res.data;
  },

  updateCommissionPlan: async (id: string, data: any) => {
    const res = await API.put<CommissionPlan>(`/business/commission-plans/${id}`, data);
    return res.data;
  },

  // Targets
  getTargets: async (params?: Record<string, any>) => {
    const res = await API.get<SalesTarget[]>('/business/targets', { params });
    return res.data;
  },

  createTarget: async (data: any) => {
    const res = await API.post<SalesTarget>('/business/targets', data);
    return res.data;
  },

  updateTarget: async (id: string, data: any) => {
    const res = await API.put<SalesTarget>(`/business/targets/${id}`, data);
    return res.data;
  },

  deleteTarget: async (id: string) => {
    const res = await API.delete<any>(`/business/targets/${id}`);
    return res.data;
  },

  // Suppliers
  getSuppliers: async (params?: Record<string, any>) => {
    const res = await API.get<Supplier[]>('/business/suppliers', { params });
    return res.data;
  },

  createSupplier: async (data: any) => {
    const res = await API.post<Supplier>('/business/suppliers', data);
    return res.data;
  },

  updateSupplier: async (id: string, data: any) => {
    const res = await API.put<Supplier>(`/business/suppliers/${id}`, data);
    return res.data;
  },

  // Customers
  getCustomers: async (params?: Record<string, any>) => {
    const res = await API.get<{ customers: BusinessCustomer[]; pagination: any }>('/business/customers', { params });
    return res.data;
  },

  checkDuplicateCustomer: async (data: { name?: string; email?: string; phone?: string }) => {
    const res = await API.post<{ matches: Array<{ customer: any; reason: string }> }>('/business/customers/check-duplicate', data);
    return res.data;
  },

  createCustomer: async (data: any) => {
    const res = await API.post<BusinessCustomer>('/business/customers', data);
    return res.data;
  },

  deleteCustomer: async (id: string) => {
    const res = await API.delete<any>(`/business/customers/${id}`);
    return res.data;
  },

  deleteCustomersBatch: async (ids: string[]) => {
    const res = await API.post<any>('/business/customers/batch', { ids });
    return res.data;
  },

  deleteAllCustomers: async () => {
    const res = await API.post<any>('/business/customers/delete-all');
    return res.data;
  },

  // Excel Sales Import
  validateSalesImport: async (formData: FormData) => {
    const res = await API.post('/business/import/validate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  executeSalesImport: async (payload: { rows: any[]; skipDuplicates?: boolean }) => {
    const res = await API.post('/business/import/execute', payload);
    return res.data;
  },

  // Audit Logs
  getAuditLogs: async (params?: Record<string, any>) => {
    const res = await API.get<{ logs: any[]; pagination: any }>('/business/audit-logs', { params });
    return res.data;
  },

  // Backups
  getBackups: async () => {
    const res = await API.get<{ backups: any[] }>('/business/backups');
    return res.data;
  },

  createManualBackup: async () => {
    const res = await API.post<{ message: string; backupId: string; success: boolean }>('/business/backups/create');
    return res.data;
  },

  deleteBackup: async (id: string) => {
    const res = await API.delete<{ message: string; success: boolean }>(`/business/backups/${id}`);
    return res.data;
  },

  downloadBackup: async (id: string, backupName?: string) => {
    const res = await API.get(`/business/backups/${id}/download?format=json`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(backupName || 'database_backup').replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
