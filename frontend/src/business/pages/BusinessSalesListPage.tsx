import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import * as XLSX from 'xlsx';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { InternalSale } from '../types';
import { BusinessEditSaleModal } from './BusinessEditSaleModal';
import {
  Plus,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  UploadCloud,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Check,
  Receipt,
  DollarSign,
  Wallet,
  Sparkles,
  Award,
  ShieldCheck,
  X,
  RefreshCw,
  Gem,
  Package,
} from 'lucide-react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .title-group {
    h1 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;

      .badge-tag {
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: #f1f5f9;
        color: #475569;
        padding: 3px 8px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
      }
    }

    p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 4px 0 0 0;
    }
  }

  .action-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: #0d1319;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(13, 19, 25, 0.15);
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #1e293b;
    box-shadow: 0 4px 8px rgba(13, 19, 25, 0.2);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button<{ $variant?: 'danger' | 'success' | 'default' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  background: #ffffff;

  ${({ $variant }) => {
    switch ($variant) {
      case 'danger':
        return `
          border: 1px solid #fecaca;
          color: #b91c1c;
          background: #fff5f5;
          &:hover {
            background: #fee2e2;
            border-color: #f87171;
          }
        `;
      case 'success':
        return `
          border: 1px solid #bbf7d0;
          color: #15803d;
          &:hover {
            background: #f0fdf4;
            border-color: #86efac;
          }
        `;
      default:
        return `
          border: 1px solid #cbd5e1;
          color: #334155;
          &:hover {
            background: #f8fafc;
            border-color: #94a3b8;
          }
        `;
    }
  }}
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  text-decoration: none;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

const KpiCard = styled.div<{ $highlight?: 'revenue' | 'profit' | 'warning' | 'retained' }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #64748b;
    }

    .icon-wrap {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      color: #64748b;
    }
  }

  .val {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ $highlight }) =>
      $highlight === 'profit'
        ? '#16a34a'
        : $highlight === 'warning'
        ? '#d97706'
        : $highlight === 'retained'
        ? '#2563eb'
        : '#0f172a'};
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .subtitle {
    font-size: 0.68rem;
    color: #94a3b8;
    margin-top: 4px;
  }
`;

const SkeletonKpi = styled.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  height: 86px;
  animation: ${pulse} 1.5s infinite;
`;

const FilterToolbar = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 6px 12px;
    flex: 1;
    min-width: 240px;
    transition: all 0.15s ease;

    &:focus-within {
      border-color: #0d1319;
      background: #ffffff;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.08);
    }

    input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.82rem;
      color: #0f172a;
      width: 100%;

      &::placeholder {
        color: #94a3b8;
      }
    }

    .clear-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 0;
      display: flex;
      align-items: center;

      &:hover {
        color: #475569;
      }
    }
  }

  .filter-select {
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 0.82rem;
    font-weight: 500;
    color: #334155;
    background: #ffffff;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s ease;

    &:focus {
      border-color: #0d1319;
    }
  }

  .results-pill {
    font-size: 0.76rem;
    font-weight: 600;
    color: #64748b;
    padding: 4px 10px;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin-left: auto;
  }
`;

const SelectionBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #166534;
  animation: fadeIn 0.2s ease;

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const CustomCheckbox = styled.label<{ $checked?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked }) => ($checked ? '#0d1319' : '#cbd5e1')};
  background: ${({ $checked }) => ($checked ? '#0d1319' : '#ffffff')};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  vertical-align: middle;

  &:hover {
    border-color: #0d1319;
    box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.12);
  }

  input {
    display: none;
  }
`;

const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #f8fafc;
    padding: 11px 12px;
    font-weight: 600;
    text-align: left;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    position: sticky;
    top: 0;
    z-index: 10;
    letter-spacing: 0.01em;
  }

  td {
    padding: 9px 12px;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f1f5f9;
    color: #1e293b;
    font-variant-numeric: tabular-nums;
  }

  tr:hover td {
    background: #f8fafc;
  }

  th.sticky-col-chk {
    position: sticky;
    left: 0;
    width: 44px;
    min-width: 44px;
    max-width: 44px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    text-align: center;
  }

  td.sticky-col-chk {
    position: sticky;
    left: 0;
    width: 44px;
    min-width: 44px;
    max-width: 44px;
    background: #ffffff;
    z-index: 20;
    text-align: center;
  }

  th.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 125px;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 30;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.12);
  }

  td.sticky-col-inv {
    position: sticky;
    left: 44px;
    min-width: 125px;
    background: #ffffff;
    z-index: 20;
    font-weight: 700;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.04);
  }

  tr:hover td.sticky-col-chk,
  tr:hover td.sticky-col-inv {
    background: #f8fafc;
  }
`;

const Badge = styled.span<{ $type?: string }>`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 0.02em;

  ${({ $type }) => {
    switch ($type) {
      case 'Paid':
        return 'background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;';
      case 'Partial':
        return 'background: #fff9db; color: #f59f00; border: 1px solid #ffe066;';
      case 'Pending':
      case 'Unpaid':
        return 'background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;';
      case 'Delivered':
        return 'background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;';
      case 'Shipped':
        return 'background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;';
      case 'Processing':
        return 'background: #fff4e6; color: #d9480f; border: 1px solid #ffd8a8;';
      case 'Diamond':
        return 'background: #fff3bf; color: #b45309; border: 1px solid #fde68a;';
      case 'Jewelry':
        return 'background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;';
      default:
        return 'background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;';
    }
  }}
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;

  .icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.84rem;
    color: #64748b;
    max-width: 420px;
    margin: 0 0 20px 0;
    line-height: 1.4;
  }

  .cta-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const fmt = (num: any) => (Number(num) || 0).toLocaleString();

export const BusinessSalesListPage: React.FC = () => {
  const [sales, setSales] = useState<InternalSale[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [productType, setProductType] = useState('ALL');
  const [paymentStatus, setPaymentStatus] = useState('ALL');
  const [orderStatus, setOrderStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingSale, setEditingSale] = useState<InternalSale | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchSales = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await businessApi.getSales({
        search: search || undefined,
        productType: productType !== 'ALL' ? productType : undefined,
        paymentStatus: paymentStatus !== 'ALL' ? paymentStatus : undefined,
        orderStatus: orderStatus !== 'ALL' ? orderStatus : undefined,
        page,
        limit: 50,
      });
      setSales(res.sales || []);
      setSummary(res.summary);
      setPagination(res.pagination);
    } catch (e: any) {
      console.error(e);
      setFetchError('Unable to load sales data. Please check your connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [search, productType, paymentStatus, orderStatus, page]);

  const toggleSelectAll = () => {
    if (selectedIds.size === sales.length && sales.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sales.map((s) => s.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = async (id: string, inv: string) => {
    if (!window.confirm(`⚠️ Are you sure you want to delete invoice ${inv}?`)) return;
    try {
      await businessApi.deleteSale(id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      await fetchSales();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`⚠️ Are you sure you want to permanently delete the ${selectedIds.size} selected sales?`)) return;
    try {
      await businessApi.deleteSalesBatch(Array.from(selectedIds));
      setSelectedIds(new Set());
      await fetchSales();
      alert(`✅ Selected sales deleted successfully.`);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Delete batch failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('⚠️ WARNING: Are you sure you want to permanently delete ALL sales records from the database? This action cannot be undone.')) {
      return;
    }
    try {
      await businessApi.deleteAllSales();
      setSelectedIds(new Set());
      await fetchSales();
      alert('✅ All sales have been deleted successfully from the database.');
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Delete all failed');
    }
  };

  const exportCSV = () => {
    if (!sales || sales.length === 0) return;
    const headers = [
      'Invoice No',
      'Sale Date',
      'Customer Name',
      'Country',
      'Product Type',
      'Description',
      'Shape',
      'Carat',
      'Color',
      'Clarity',
      'Cut',
      'Cert No',
      'Supplier',
      'Purchase Price',
      'Selling Price',
      'Discount',
      'Final Sale Amount',
      'Shipping Cost',
      'GST %',
      'GST Amount',
      'Final Purchase Price',
      'Gross Profit',
      'Net Profit',
      'Sales Person',
      'Commission %',
      'Commission Amount',
      'Profit After Commission',
      'Payment Status',
      'Order Status',
      'Tracking Number',
    ];

    const rows = sales.map((s) => [
      s.invoiceNo,
      s.saleDate ? new Date(s.saleDate).toISOString().split('T')[0] : '',
      `"${s.customerName}"`,
      s.customerCountry || '',
      s.productType,
      `"${s.productDescription || ''}"`,
      s.shape || '',
      s.caratWeight || '',
      s.diamondColor || '',
      s.clarity || '',
      s.cut || '',
      s.certificateNo || '',
      `"${s.supplierName || ''}"`,
      s.purchasePrice,
      s.sellingPrice,
      s.discount,
      s.finalSaleAmount,
      s.shippingCost,
      s.gstPercent,
      s.gstAmount,
      s.finalPurchasePrice,
      s.grossProfit,
      s.netProfit,
      `"${s.salesPersonName || ''}"`,
      s.commissionPercent,
      s.commissionAmount,
      s.profitAfterCommission,
      s.paymentStatus,
      s.orderStatus,
      s.trackingNumber || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales_tracker_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    if (!sales || sales.length === 0) return;

    const headers = [
      'Invoice No',
      'Sale Date',
      'Customer Name',
      'Customer Country',
      'Product Type',
      'Product Description',
      'Stone Type',
      'Shape',
      'Diamond Color',
      'Clarity',
      'Cut',
      'Polish',
      'Symmetry',
      'Fluorescence',
      'Measurement',
      'Price per Carat',
      'Carat / Weight',
      'Quantity',
      'Certificate',
      'Certificate No',
      'Supplier',
      'Purchase Price',
      'Selling Price',
      'Discount',
      'Final Sale Amount',
      'Shipping Cost',
      'GST %',
      'GST Amount',
      'Final Purchase Price',
      'Payment Status',
      'Payment Method',
      'Amount Received',
      'Pending Amount',
      'Gross Profit',
      'Net Profit',
      'Sales Person',
      'Commission %',
      'Commission Amount',
      'Profit After Commission',
      'Profit % (Markup)',
      'Final Profit %',
      'Order Status',
      'Tracking Number',
      'Tracking Link',
      'Dollar Rate',
      'Sale Month',
    ];

    const dataRows = sales.map((s) => [
      s.invoiceNo,
      s.saleDate ? new Date(s.saleDate).toISOString().split('T')[0] : '',
      s.customerName || '',
      s.customerCountry || '',
      s.productType || '',
      s.productDescription || '',
      s.stoneType || '',
      s.shape || '',
      s.diamondColor || '',
      s.clarity || '',
      s.cut || '',
      s.polish || '',
      s.symmetry || '',
      s.fluorescence || '',
      s.measurement || '',
      s.pricePerCarat ?? '',
      s.caratWeight ?? '',
      s.quantity ?? 1,
      s.certificate || '',
      s.certificateNo || '',
      s.supplierName || '',
      s.purchasePrice ?? 0,
      s.sellingPrice ?? 0,
      s.discount ?? 0,
      s.finalSaleAmount ?? 0,
      s.shippingCost ?? 0,
      s.gstPercent ?? 0,
      s.gstAmount ?? 0,
      s.finalPurchasePrice ?? 0,
      s.paymentStatus || '',
      s.paymentMethod || '',
      s.amountReceived ?? 0,
      s.pendingAmount ?? 0,
      s.grossProfit ?? 0,
      s.netProfit ?? 0,
      s.salesPersonName || '',
      s.commissionPercent ?? 0,
      s.commissionAmount ?? 0,
      s.profitAfterCommission ?? 0,
      s.markupPercent ?? 0,
      s.finalProfitPercent ?? 0,
      s.orderStatus || '',
      s.trackingNumber || '',
      s.trackingLink || '',
      s.dollarRate ?? 94.55,
      s.saleMonth || '',
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Ledger');
    XLSX.writeFile(workbook, `sales_ledger_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const hasActiveFilters = search || productType !== 'ALL' || paymentStatus !== 'ALL' || orderStatus !== 'ALL';

  const handleResetFilters = () => {
    setSearch('');
    setProductType('ALL');
    setPaymentStatus('ALL');
    setOrderStatus('ALL');
    setPage(1);
  };

  return (
    <PageContainer>
      {/* Top Header & Actions Bar */}
      <PageHeader>
        <div className="title-group">
          <h1>
            Sales Management Tracker
            <span className="badge-tag">46-Column Ledger</span>
          </h1>
          <p>Authoritative financial tracking, sales performance, commissions & margins</p>
        </div>

        <div className="action-toolbar">
          <SecondaryButton
            type="button"
            $variant="danger"
            onClick={handleDeleteAll}
            title="Purge all sales data from database"
          >
            <Trash2 size={13} /> Delete All Sales
          </SecondaryButton>

          <SecondaryLink to={`${PRIVATE_BUSINESS_PATH}/import`} title="Import batch sales via Excel or CSV">
            <UploadCloud size={14} color="#2563eb" /> Import Excel / File
          </SecondaryLink>

          <SecondaryButton type="button" $variant="success" onClick={exportExcel} title="Export ledger to Excel workbook">
            <FileSpreadsheet size={14} color="#15803d" /> Export Excel (.xlsx)
          </SecondaryButton>

          <SecondaryButton type="button" onClick={exportCSV} title="Export CSV spreadsheet">
            <Download size={14} /> Export CSV
          </SecondaryButton>

          <PrimaryButton to={`${PRIVATE_BUSINESS_PATH}/sales/new`} title="Create a new commercial invoice">
            <Plus size={16} /> New Sale Invoice
          </PrimaryButton>
        </div>
      </PageHeader>

      {/* KPI Financial Metric Cards */}
      <SummaryGrid>
        {loading && !summary ? (
          Array.from({ length: 7 }).map((_, i) => <SkeletonKpi key={i} />)
        ) : (
          <>
            <KpiCard>
              <div className="card-top">
                <span className="label">Total Orders</span>
                <span className="icon-wrap"><Receipt size={14} /></span>
              </div>
              <div className="val">{summary?.totalOrders || 0}</div>
              <div className="subtitle">Processed deals</div>
            </KpiCard>

            <KpiCard $highlight="revenue">
              <div className="card-top">
                <span className="label">Total Revenue</span>
                <span className="icon-wrap"><DollarSign size={14} color="#0f172a" /></span>
              </div>
              <div className="val">${fmt(summary?.totalRevenue)}</div>
              <div className="subtitle">Gross billed volume</div>
            </KpiCard>

            <KpiCard>
              <div className="card-top">
                <span className="label">Purchase Costs</span>
                <span className="icon-wrap"><Wallet size={14} /></span>
              </div>
              <div className="val" style={{ color: '#475569' }}>
                ${fmt(summary?.totalPurchaseCost)}
              </div>
              <div className="subtitle">Inventory & vendor COGS</div>
            </KpiCard>

            <KpiCard>
              <div className="card-top">
                <span className="label">Gross Profit</span>
                <span className="icon-wrap"><TrendingUp size={14} /></span>
              </div>
              <div className="val">${fmt(summary?.totalGrossProfit)}</div>
              <div className="subtitle">Revenue minus COGS</div>
            </KpiCard>

            <KpiCard $highlight="profit">
              <div className="card-top">
                <span className="label">Net Profit</span>
                <span className="icon-wrap" style={{ background: '#f0fdf4', color: '#16a34a' }}><Sparkles size={14} /></span>
              </div>
              <div className="val">${fmt(summary?.totalNetProfit)}</div>
              <div className="subtitle">Post-shipping & GST</div>
            </KpiCard>

            <KpiCard $highlight="warning">
              <div className="card-top">
                <span className="label">Commission Due</span>
                <span className="icon-wrap" style={{ background: '#fffbeb', color: '#d97706' }}><Award size={14} /></span>
              </div>
              <div className="val">${fmt(summary?.totalCommission)}</div>
              <div className="subtitle">Staff commission liability</div>
            </KpiCard>

            <KpiCard $highlight="retained">
              <div className="card-top">
                <span className="label">Retained Profit</span>
                <span className="icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}><ShieldCheck size={14} /></span>
              </div>
              <div className="val">${fmt(summary?.totalProfitAfterCommission)}</div>
              <div className="subtitle">Retained business equity</div>
            </KpiCard>
          </>
        )}
      </SummaryGrid>

      {/* Filter Toolbar */}
      <FilterToolbar>
        <div className="search-wrapper">
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search invoice, client, stone, certificate..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')} title="Clear search">
              <X size={13} />
            </button>
          )}
        </div>

        <select
          className="filter-select"
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Product Types</option>
          <option value="Diamond">💎 Diamonds Only</option>
          <option value="Jewelry">✨ Jewelry Only</option>
        </select>

        <select
          className="filter-select"
          value={paymentStatus}
          onChange={(e) => {
            setPaymentStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="Paid">Paid (Full)</option>
          <option value="Partial">Partial Payment</option>
          <option value="Pending">Pending / Unpaid</option>
        </select>

        <select
          className="filter-select"
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Order Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
        </select>

        {hasActiveFilters && (
          <SecondaryButton type="button" onClick={handleResetFilters} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
            <RefreshCw size={12} /> Reset Filters
          </SecondaryButton>
        )}

        <div className="results-pill">
          {loading ? 'Loading...' : `Showing ${sales.length} ${sales.length === 1 ? 'sale' : 'sales'}`}
        </div>
      </FilterToolbar>

      {/* Floating Selection Banner */}
      {selectedIds.size > 0 && (
        <SelectionBanner>
          <div>
            ✨ <strong>{selectedIds.size}</strong> {selectedIds.size === 1 ? 'record' : 'records'} selected
          </div>
          <div className="actions">
            <SecondaryButton type="button" onClick={() => setSelectedIds(new Set())} style={{ padding: '4px 10px', fontSize: '0.76rem' }}>
              Deselect All
            </SecondaryButton>
            <SecondaryButton type="button" $variant="danger" onClick={handleDeleteSelected} style={{ padding: '4px 12px', fontSize: '0.76rem' }}>
              <Trash2 size={12} /> Delete Selected ({selectedIds.size})
            </SecondaryButton>
          </div>
        </SelectionBanner>
      )}

      {/* Error Banner */}
      {fetchError && (
        <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#b91c1c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>⚠️ {fetchError}</span>
          <SecondaryButton type="button" onClick={fetchSales} style={{ padding: '4px 10px', fontSize: '0.76rem' }}>
            Try Again
          </SecondaryButton>
        </div>
      )}

      {/* Main Data Table */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th className="sticky-col-chk">
                <CustomCheckbox
                  $checked={sales.length > 0 && selectedIds.size === sales.length}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSelectAll();
                  }}
                  title="Select / Deselect All Sales"
                >
                  <input
                    type="checkbox"
                    checked={sales.length > 0 && selectedIds.size === sales.length}
                    readOnly
                  />
                  {sales.length > 0 && selectedIds.size === sales.length && <Check size={11} strokeWidth={3} />}
                </CustomCheckbox>
              </th>
              <th className="sticky-col-inv">Invoice No</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Country</th>
              <th>Type</th>
              <th>Description / Shape</th>
              <th>Carat</th>
              <th>Color/Clarity</th>
              <th>Cert #</th>
              <th>Supplier</th>
              <th>Selling Price</th>
              <th>Final Sale</th>
              <th>Purchase Price</th>
              <th>GST</th>
              <th>Final Purchase</th>
              <th>Gross Profit</th>
              <th>Net Profit</th>
              <th>Sales Person</th>
              <th>Comm %</th>
              <th>Comm ($)</th>
              <th>Retained Profit</th>
              <th>Markup %</th>
              <th>Payment</th>
              <th>Order Status</th>
              <th>Tracking</th>
              <th>Dollar Rate</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => {
              const isSelected = selectedIds.has(s.id);
              const isDiamond = s.productType === 'Diamond';

              return (
                <tr key={s.id} style={{ background: isSelected ? '#f0fdf4' : undefined }}>
                  <td className="sticky-col-chk">
                    <CustomCheckbox
                      $checked={isSelected}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSelectRow(s.id);
                      }}
                      title={`Select invoice ${s.invoiceNo}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                      />
                      {isSelected && <Check size={11} strokeWidth={3} />}
                    </CustomCheckbox>
                  </td>

                  <td className="sticky-col-inv">
                    <Link
                      to={`${PRIVATE_BUSINESS_PATH}/sales/${s.id}`}
                      style={{ color: '#0d1319', textDecoration: 'none', fontWeight: 700 }}
                    >
                      {s.invoiceNo}
                    </Link>
                  </td>

                  <td>{s.saleDate ? new Date(s.saleDate).toLocaleDateString() : '-'}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{s.customerName}</td>
                  <td>{s.customerCountry || '-'}</td>

                  <td>
                    <Badge $type={s.productType}>
                      {s.productType === 'Diamond' ? '💎 Diamond' : '✨ Jewelry'}
                    </Badge>
                  </td>

                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {isDiamond ? (s.shape || s.productDescription || '-') : (s.productDescription || '-')}
                  </td>

                  <td>{isDiamond && s.caratWeight ? `${s.caratWeight} ct` : isDiamond ? '-' : `Qty: ${s.quantity || 1}`}</td>
                  <td>{isDiamond && s.diamondColor ? `${s.diamondColor} / ${s.clarity || ''}` : '-'}</td>
                  <td>{isDiamond ? (s.certificateNo || '-') : '-'}</td>
                  <td>{s.supplierName || 'None'}</td>

                  <td>${fmt(s.sellingPrice)}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>${fmt(s.finalSaleAmount)}</td>
                  <td>${fmt(s.purchasePrice)}</td>
                  <td>${fmt(s.gstAmount)}</td>
                  <td>${fmt(s.finalPurchasePrice)}</td>
                  <td>${fmt(s.grossProfit)}</td>

                  <td style={{ fontWeight: 700, color: (Number(s.netProfit) || 0) >= 0 ? '#16a34a' : '#dc2626' }}>
                    ${fmt(s.netProfit)}
                  </td>

                  <td>{s.salesPersonName || '-'}</td>
                  <td>{((Number(s.commissionPercent) || 0) * 100).toFixed(1)}%</td>
                  <td style={{ color: '#d97706', fontWeight: 600 }}>${fmt(s.commissionAmount)}</td>
                  <td style={{ fontWeight: 700, color: '#2563eb' }}>${fmt(s.profitAfterCommission)}</td>
                  <td>{((Number(s.markupPercent) || 0) * 100).toFixed(1)}%</td>

                  <td>
                    <Badge $type={s.paymentStatus}>{s.paymentStatus}</Badge>
                  </td>

                  <td>
                    <Badge $type={s.orderStatus}>{s.orderStatus}</Badge>
                  </td>

                  <td>
                    {s.trackingNumber ? (
                      s.trackingLink ? (
                        <a
                          href={s.trackingLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#2563eb', textDecoration: 'none' }}
                        >
                          {s.trackingNumber} <ExternalLink size={10} />
                        </a>
                      ) : (
                        s.trackingNumber
                      )
                    ) : (
                      '-'
                    )}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={s.dollarRate ? Number(s.dollarRate).toFixed(2) : '94.55'}
                      onBlur={async (e) => {
                        const val = Number(e.target.value);
                        if (val && val !== Number(s.dollarRate)) {
                          try {
                            await businessApi.updateDollarRate(s.id, val);
                          } catch (err) {
                            console.error('Failed to update dollar rate', err);
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                      }}
                      style={{
                        width: 70,
                        padding: '4px 6px',
                        border: '1px solid #cbd5e1',
                        borderRadius: 6,
                        fontSize: '0.78rem',
                        background: '#ffffff',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    />
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <Link to={`${PRIVATE_BUSINESS_PATH}/sales/${s.id}`}>
                        <button
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            padding: '4px 8px',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: '#334155',
                          }}
                          title="View Sale Detail"
                        >
                          <Eye size={13} />
                        </button>
                      </Link>

                      <button
                        onClick={() => setEditingSale(s)}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          padding: '4px 8px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          color: '#0f172a',
                        }}
                        title="Edit Sale Invoice"
                      >
                        <Edit2 size={13} />
                      </button>

                      <button
                        onClick={() => handleDelete(s.id, s.invoiceNo)}
                        style={{
                          background: '#fff5f5',
                          border: '1px solid #fee2e2',
                          color: '#dc2626',
                          padding: '4px 8px',
                          borderRadius: 6,
                          cursor: 'pointer',
                        }}
                        title="Delete Sale Invoice"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {sales.length === 0 && !loading && (
              <tr>
                <td colSpan={28} style={{ padding: 0 }}>
                  <EmptyStateContainer>
                    <div className="icon-circle">
                      <FileSpreadsheet size={26} />
                    </div>
                    <h3>No sales records found</h3>
                    <p>
                      {hasActiveFilters
                        ? 'No transactions matched your current search filters. Try clearing or broadening your search.'
                        : 'Get started by creating your first commercial invoice or importing your existing spreadsheet ledger.'}
                    </p>
                    <div className="cta-group">
                      {hasActiveFilters ? (
                        <SecondaryButton type="button" onClick={handleResetFilters}>
                          <RefreshCw size={13} /> Reset Filters
                        </SecondaryButton>
                      ) : (
                        <>
                          <PrimaryButton to={`${PRIVATE_BUSINESS_PATH}/sales/new`}>
                            <Plus size={15} /> Create Invoice
                          </PrimaryButton>
                          <SecondaryLink to={`${PRIVATE_BUSINESS_PATH}/import`}>
                            <UploadCloud size={15} color="#2563eb" /> Import Excel / CSV
                          </SecondaryLink>
                        </>
                      )}
                    </div>
                  </EmptyStateContainer>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} total transactions)
          </span>

          <div style={{ display: 'flex', gap: 6 }}>
            <SecondaryButton
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page === 1}
              style={{ padding: '6px 12px' }}
            >
              <ChevronLeft size={14} /> Previous
            </SecondaryButton>

            <SecondaryButton
              type="button"
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.page === pagination.totalPages}
              style={{ padding: '6px 12px' }}
            >
              Next <ChevronRight size={14} />
            </SecondaryButton>
          </div>
        </div>
      )}

      {/* Edit Sale Modal */}
      {editingSale && (
        <BusinessEditSaleModal
          sale={editingSale}
          onClose={() => setEditingSale(null)}
          onSuccess={() => {
            setEditingSale(null);
            fetchSales();
          }}
        />
      )}
    </PageContainer>
  );
};
