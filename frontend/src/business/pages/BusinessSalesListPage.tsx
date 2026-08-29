import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { InternalSale } from '../types';
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
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const SummaryPill = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px;

  .label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 2px;
  }
`;

const FilterCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #f1f4f8;
    padding: 10px 12px;
    font-weight: 600;
    text-align: left;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: 9px 12px;
    border-bottom: 1px solid #f1f5f9;
    border-right: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }

  th.sticky-col {
    position: sticky;
    left: 0;
    background: #0d1319 !important;
    color: #f1f4f8 !important;
    z-index: 20;
    font-weight: 700;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.15);
  }

  td.sticky-col {
    position: sticky;
    left: 0;
    background: #ffffff;
    z-index: 5;
    font-weight: 700;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.04);
  }

  tr:hover td.sticky-col {
    background: #f8fafc;
  }
`;

const Badge = styled.span<{ $type?: string }>`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;

  ${({ $type }) => {
    switch ($type) {
      case 'Paid':
        return 'background: #ebfbee; color: #2b8a3e;';
      case 'Partial':
        return 'background: #fff9db; color: #f59f00;';
      case 'Pending':
      case 'Unpaid':
        return 'background: #fff5f5; color: #e03131;';
      case 'Delivered':
        return 'background: #e7f5ff; color: #1c7ed6;';
      case 'Diamond':
        return 'background: #fff3bf; color: #d97706;';
      case 'Jewelry':
        return 'background: #f3f0ff; color: #7950f2;';
      default:
        return 'background: #f1f5f9; color: #64748b;';
    }
  }}
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

  const fetchSales = async () => {
    setLoading(true);
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
    } catch (e) {
      console.error(e);
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
      s.dollarRate ?? '',
      s.saleMonth || '',
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Tracking');
    XLSX.writeFile(workbook, `Sales_Tracker_Final_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Sales Management Tracker</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Authoritative financial tracking, 46-column spreadsheet ledger, commissions & margins
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {selectedIds.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Trash2 size={14} /> Delete Selected ({selectedIds.size})
            </button>
          )}

          <button
            onClick={handleDeleteAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px',
              background: '#fff5f5',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Purge all sales data from database"
          >
            <Trash2 size={13} color="#991b1b" /> Delete All Sales
          </button>

          <Link
            to={`${PRIVATE_BUSINESS_PATH}/import`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#0f172a',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <UploadCloud size={14} color="#2563eb" /> Import Excel / File
          </Link>

          <button
            onClick={exportExcel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#15803d',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={14} color="#15803d" /> Export Excel (.xlsx)
          </button>

          <button
            onClick={exportCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            <Download size={14} /> Export CSV
          </button>

          <Link
            to={`${PRIVATE_BUSINESS_PATH}/sales/new`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 18px',
              background: '#0d1319',
              color: '#ffffff',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            <Plus size={16} /> New Sale Invoice
          </Link>
        </div>
      </PageHeader>

      <SummaryStrip>
        <SummaryPill>
          <div className="label">Total Orders</div>
          <div className="val">{summary?.totalOrders || 0}</div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Total Revenue</div>
          <div className="val">${fmt(summary?.totalRevenue)}</div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Purchase Costs</div>
          <div className="val" style={{ color: '#475569' }}>
            ${fmt(summary?.totalPurchaseCost)}
          </div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Gross Profit</div>
          <div className="val">${fmt(summary?.totalGrossProfit)}</div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Net Profit</div>
          <div className="val" style={{ color: '#16a34a' }}>
            ${fmt(summary?.totalNetProfit)}
          </div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Commission Due</div>
          <div className="val" style={{ color: '#d97706' }}>
            ${fmt(summary?.totalCommission)}
          </div>
        </SummaryPill>
        <SummaryPill>
          <div className="label">Retained Profit</div>
          <div className="val" style={{ color: '#2563eb' }}>
            ${fmt(summary?.totalProfitAfterCommission)}
          </div>
        </SummaryPill>
      </SummaryStrip>

      <FilterCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', flex: 1, minWidth: 200 }}>
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search invoice, client, stone, certificate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem', width: '100%' }}
          />
        </div>

        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
        >
          <option value="ALL">All Product Types</option>
          <option value="Diamond">Diamond Only</option>
          <option value="Jewelry">Jewelry Only</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
        >
          <option value="ALL">All Order Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
        </select>
      </FilterCard>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 40, textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={sales.length > 0 && selectedIds.size === sales.length}
                  onChange={toggleSelectAll}
                  style={{ cursor: 'pointer' }}
                />
              </th>
              <th className="sticky-col">Invoice No</th>
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
              return (
                <tr key={s.id} style={{ background: isSelected ? '#f0fdf4' : undefined }}>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(s.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td className="sticky-col">
                    <Link to={`${PRIVATE_BUSINESS_PATH}/sales/${s.id}`} style={{ color: '#0d1319', textDecoration: 'none' }}>
                      {s.invoiceNo}
                    </Link>
                  </td>
                  <td>{s.saleDate ? new Date(s.saleDate).toLocaleDateString() : '-'}</td>
                  <td style={{ fontWeight: 600 }}>{s.customerName}</td>
                  <td>{s.customerCountry || '-'}</td>
                  <td>
                    <Badge $type={s.productType}>{s.productType}</Badge>
                  </td>
                  <td>{s.productDescription || s.shape || '-'}</td>
                  <td>{s.caratWeight ? `${s.caratWeight} ct` : '-'}</td>
                  <td>{s.diamondColor ? `${s.diamondColor} / ${s.clarity || ''}` : '-'}</td>
                  <td>{s.certificateNo || '-'}</td>
                  <td>{s.supplierName || 'None'}</td>
                  <td>${fmt(s.sellingPrice)}</td>
                  <td style={{ fontWeight: 700 }}>${fmt(s.finalSaleAmount)}</td>
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
                  <td style={{ fontWeight: 700 }}>${fmt(s.profitAfterCommission)}</td>
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
                        <a href={s.trackingLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: '#2563eb' }}>
                          {s.trackingNumber} <ExternalLink size={10} />
                        </a>
                      ) : (
                        s.trackingNumber
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ fontWeight: 600, color: '#475569' }}>
                    {s.dollarRate ? Number(s.dollarRate).toFixed(2) : '94.55'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <Link to={`${PRIVATE_BUSINESS_PATH}/sales/${s.id}`}>
                        <button style={{ background: 'none', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }} title="View Sale Detail">
                          <Eye size={12} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(s.id, s.invoiceNo)}
                        style={{ background: 'none', border: '1px solid #fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
                        title="Delete Sale Invoice"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {sales.length === 0 && !loading && (
              <tr>
                <td colSpan={27} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No sales found in the database. Click "Import Excel / File" or "New Sale Invoice" to add records.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </span>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pagination.page === 1}
            style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, cursor: 'pointer' }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={pagination.page === pagination.totalPages}
            style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, cursor: 'pointer' }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
