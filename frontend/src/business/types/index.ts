export interface Employee {
  id: string;
  employeeCode: string;
  userId?: string | null;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  fullName: string;
  email: string;
  phone?: string | null;
  department: string;
  designation: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  joiningDate?: string | null;
  commissionPlanId?: string | null;
  commissionPlan?: {
    id: string;
    name: string;
  } | null;
  monthlySalesTarget: number;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    sales: number;
    attendances: number;
    commissions: number;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employee?: {
    id: string;
    employeeCode: string;
    fullName: string;
    email?: string;
    department?: string;
    designation?: string;
  };
  date: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  workingHours?: number;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE' | 'HOLIDAY';
  lateStatus: boolean;
  notes?: string | null;
  isManualEntry: boolean;
  modifiedByUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalSale {
  id: string;
  invoiceNo: string;
  saleDate: string;
  customerId?: string | null;
  customerName: string;
  customerCountry?: string | null;
  customer?: {
    id: string;
    name: string;
    country?: string | null;
    email?: string;
  } | null;
  productType: 'Diamond' | 'Jewelry';
  productDescription?: string | null;
  stoneType?: string | null;
  shape?: string | null;
  diamondColor?: string | null;
  clarity?: string | null;
  cut?: string | null;
  polish?: string | null;
  symmetry?: string | null;
  fluorescence?: string | null;
  measurement?: string | null;
  pricePerCarat?: number | null;
  caratWeight?: number | null;
  quantity?: number;
  certificate?: string | null;
  certificateNo?: string | null;
  supplierId?: string | null;
  supplierName?: string | null;
  supplier?: {
    id: string;
    name: string;
  } | null;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  finalSaleAmount: number;
  shippingCost: number;
  gstPercent: number;
  gstAmount: number;
  finalPurchasePrice: number;
  paymentStatus: 'Paid' | 'Partial' | 'Pending' | 'Unpaid';
  paymentMethod: string;
  amountReceived: number;
  pendingAmount: number;
  grossProfit: number;
  netProfit: number;
  employeeId?: string | null;
  salesPersonName?: string | null;
  employee?: {
    id: string;
    fullName: string;
    employeeCode: string;
  } | null;
  commissionPercent: number;
  commissionAmount: number;
  profitAfterCommission: number;
  markupPercent: number;
  finalProfitPercent: number;
  orderStatus: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  trackingNumber?: string | null;
  trackingLink?: string | null;
  dollarRate?: number | null;
  saleMonth?: string | null;
  notes?: string | null;
  isImported?: boolean;
  commission?: CommissionRecord | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionRecord {
  id: string;
  saleId: string;
  employeeId: string;
  employee?: {
    id: string;
    fullName: string;
    employeeCode: string;
    department: string;
  };
  sale?: {
    id: string;
    invoiceNo: string;
    customerName: string;
    finalSaleAmount: number;
    netProfit: number;
    saleDate: string;
    productType: string;
  };
  commissionBasis: 'NET_PROFIT' | 'SALE_AMOUNT' | 'FIXED_AMOUNT';
  commissionRate: number;
  commissionAmount: number;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED';
  approvedBy?: string | null;
  approvedAt?: string | null;
  paidBy?: string | null;
  paidAt?: string | null;
  paymentReference?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionPlan {
  id: string;
  name: string;
  description?: string | null;
  isDefault: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  rules: CommissionRule[];
  _count?: {
    employees: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CommissionRule {
  id: string;
  planId?: string | null;
  employeeId?: string | null;
  productType: string;
  commissionBasis: 'NET_PROFIT' | 'SALE_AMOUNT' | 'FIXED_AMOUNT';
  commissionRate: number;
  minAmount?: number | null;
  maxAmount?: number | null;
  status: string;
  notes?: string | null;
}

export interface SalesTarget {
  id: string;
  employeeId: string;
  employee?: {
    id: string;
    fullName: string;
    employeeCode: string;
    department: string;
  };
  periodType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  periodYear: number;
  periodMonth?: number | null;
  periodQuarter?: number | null;
  targetAmount: number;
  actualSales?: number;
  orderCount?: number;
  achievementPercent?: number;
  remaining?: number;
  startDate: string;
  endDate: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  notes?: string | null;
  status: string;
  _count?: {
    sales: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BusinessCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  company?: string | null;
  address?: string | null;
  assignedEmployeeId?: string | null;
  assignedEmployee?: {
    id: string;
    fullName: string;
  } | null;
  totalSales?: number;
  totalNetProfit?: number;
  lastSaleDate?: string | null;
  notes?: string | null;
  _count?: {
    internalSales: number;
    orders: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BusinessDashboardMetrics {
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    totalPurchaseCost: number;
    totalGrossProfit: number;
    totalNetProfit: number;
    totalCommission: number;
    totalProfitAfterCommission: number;
    averageMarkupPercent: number;
    totalGst: number;
    pendingReceivables: number;
    totalNetProfitINR: number;
    totalCommissionINR: number;
    profitAfterCommissionINR: number;
    dollarRate: number;
  };
  productDistribution: {
    diamond: { orders: number; revenue: number; netProfit: number };
    jewelry: { orders: number; revenue: number; netProfit: number };
  };
  orderStatusCounts: Record<string, number>;
  paymentStatusCounts: Record<string, number>;
  salesPersonPerformance: Array<{
    name: string;
    employeeId?: string;
    orders: number;
    revenue: number;
    netProfitUSD: number;
    commissionUSD: number;
    netProfitINR: number;
    commissionINR: number;
    profitAfterCommission: number;
  }>;
  topCustomers: Array<{ name: string; country?: string; orders: number; revenue: number }>;
  countryDistribution: Array<{ country: string; orders: number; revenue: number }>;
  attendance: {
    totalEmployees: number;
    present: number;
    absent: number;
    late: number;
    onLeave: number;
  };
  targets: {
    totalTarget: number;
    actualSales: number;
    achievementPercent: number;
    remaining: number;
  };
}
