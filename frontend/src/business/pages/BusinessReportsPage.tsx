import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Download, FileText, TrendingUp, Users, DollarSign, Database, HardDriveDownload, PlusCircle, Trash2, ShieldCheck, RefreshCw, RotateCcw } from 'lucide-react';
import * as XLSX from 'xlsx';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`;

const ControlCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`;

const ReportTypeButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid ${({ $active }) => ($active ? '#0d1319' : '#cbd5e1')};
  background: ${({ $active }) => ($active ? '#0d1319' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#334155')};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    border-color: #0d1319;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`;

const Table = styled.table`
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`;


const Badge = styled.span<{ $type?: string }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;

  ${({ $type }) => {
    switch ($type) {
      case 'AUTOMATIC_WEEKLY':
        return 'background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;';
      case 'MANUAL_SNAPSHOT':
        return 'background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;';
      default:
        return 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;';
    }
  }}
`;

export const BusinessReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'sales' | 'staff' | 'profit' | 'backups'>('sales');
  const [data, setData] = useState<any>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingBackup, setCreatingBackup] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [dashData, backupData] = await Promise.all([
        businessApi.getDashboardMetrics({ period: 'all' }),
        businessApi.getBackups(),
      ]);
      setData(dashData);
      setBackups(backupData.backups || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateSnapshot = async () => {
    setCreatingBackup(true);
    try {
      await businessApi.createManualBackup();
      alert('✅ Database snapshot created successfully.');
      const bRes = await businessApi.getBackups();
      setBackups(bRes.backups || []);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Failed to create backup snapshot.');
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleDeleteBackup = async (id: string, name: string) => {
    if (!window.confirm(`⚠️ Are you sure you want to delete backup "${name}"?`)) return;
    try {
      await businessApi.deleteBackup(id);
      setBackups((prev) => prev.filter((b) => b.id !== id));
      alert('✅ Backup removed.');
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Failed to delete backup.');
    }
  };

  const handleDownloadBackup = async (id: string, name?: string) => {
    try {
      await businessApi.downloadBackup(id, name);
    } catch (err: any) {
      alert('Failed to download backup snapshot.');
    }
  };

  const handleRestoreBackup = async (id: string, name: string) => {
    if (!window.confirm(`⚠️ CAUTION: Are you sure you want to restore database snapshot "${name}"? This will sync all records from this backup snapshot point.`)) return;
    try {
      const res = await businessApi.restoreBackup(id);
      alert(`✅ ${res.message || 'Database restored successfully!'}`);
      window.location.reload();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Failed to restore backup snapshot.');
    }
  };

  const handleExport = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Sales Category Breakdown
      const salesBreakdown = [
        {
          Category: 'Loose Diamonds',
          Orders: data?.productDistribution?.diamond?.orders || 0,
          Revenue: data?.productDistribution?.diamond?.revenue || 0,
          NetProfit: data?.productDistribution?.diamond?.netProfit || 0,
          ProfitMargin: ((Number(data?.metrics?.averageMarkupPercent) || 0)).toFixed(1) + '%',
        },
        {
          Category: 'Finished Jewelry',
          Orders: data?.productDistribution?.jewelry?.orders || 0,
          Revenue: data?.productDistribution?.jewelry?.revenue || 0,
          NetProfit: data?.productDistribution?.jewelry?.netProfit || 0,
          ProfitMargin: '0%',
        },
      ];
      const wsSales = XLSX.utils.json_to_sheet(salesBreakdown);
      XLSX.utils.book_append_sheet(wb, wsSales, 'Category Breakdown');

      // Sheet 2: Staff Performance
      const staffPerf = (data?.salesPersonPerformance || []).map((sp: any) => ({
        'Staff Member': sp.name || 'Unassigned',
        Orders: sp.orders || 0,
        'Revenue ($)': sp.revenue || 0,
        'Net Profit ($)': sp.netProfitUSD || 0,
        'Commission ($)': sp.commissionUSD || 0,
        'Profit Retained ($)': sp.profitAfterCommission || 0,
      }));
      const wsStaff = XLSX.utils.json_to_sheet(staffPerf.length > 0 ? staffPerf : [{ 'Staff Member': 'No Sales Recorded' }]);
      XLSX.utils.book_append_sheet(wb, wsStaff, 'Staff Performance');

      // Sheet 3: Financial Summary
      const summaryData = [
        { Metric: 'Total Orders', Value: data?.metrics?.totalOrders || 0 },
        { Metric: 'Total Revenue ($)', Value: data?.metrics?.totalRevenue || 0 },
        { Metric: 'Total Purchase Cost ($)', Value: data?.metrics?.totalPurchaseCost || 0 },
        { Metric: 'Total Gross Profit ($)', Value: data?.metrics?.totalGrossProfit || 0 },
        { Metric: 'Total Net Profit ($)', Value: data?.metrics?.totalNetProfit || 0 },
        { Metric: 'Total Commission Due ($)', Value: data?.metrics?.totalCommission || 0 },
        { Metric: 'Total Retained Profit ($)', Value: data?.metrics?.totalProfitAfterCommission || 0 },
        { Metric: 'Average Markup %', Value: (data?.metrics?.averageMarkupPercent || 0) + '%' },
      ];
      const wsSummary = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

      const fileName = `Aura_Jewel_Audit_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (e) {
      console.error(e);
      alert('Failed to generate audit report file.');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Business Intelligence & Database Backups</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Consolidated financial auditing, salesperson profitability analysis, and automated weekly database snapshots
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={handleCreateSnapshot}
            disabled={creatingBackup}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            <Database size={15} color="#2563eb" /> {creatingBackup ? 'Creating Snapshot...' : '⚡ Create Instant Snapshot'}
          </button>

          <button
            onClick={handleExport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              background: '#0d1319',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            <Download size={15} /> Export Audit Report (.xlsx)
          </button>
        </div>
      </PageHeader>

      <ControlCard>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ReportTypeButton $active={reportType === 'sales'} onClick={() => setReportType('sales')}>
            Sales Breakdown
          </ReportTypeButton>
          <ReportTypeButton $active={reportType === 'staff'} onClick={() => setReportType('staff')}>
            Staff Performance
          </ReportTypeButton>
          <ReportTypeButton $active={reportType === 'profit'} onClick={() => setReportType('profit')}>
            Margin & Retained Profit
          </ReportTypeButton>
          <ReportTypeButton $active={reportType === 'backups'} onClick={() => setReportType('backups')}>
            <Database size={14} /> Database Backups ({backups.length})
          </ReportTypeButton>
        </div>
      </ControlCard>

      {reportType === 'sales' && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Orders</th>
                <th>Total Revenue</th>
                <th>Net Profit</th>
                <th>Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Loose Diamonds</td>
                <td>{data?.productDistribution?.diamond?.orders || 0}</td>
                <td style={{ fontWeight: 700 }}>${(data?.productDistribution?.diamond?.revenue || 0).toLocaleString()}</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>${(data?.productDistribution?.diamond?.netProfit || 0).toLocaleString()}</td>
                <td>
                  {(data?.productDistribution?.diamond?.revenue || 0) > 0
                    ? (((data?.productDistribution?.diamond?.netProfit || 0) / (data?.productDistribution?.diamond?.revenue || 1)) * 100).toFixed(1)
                    : 0}
                  %
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Finished Jewelry</td>
                <td>{data?.productDistribution?.jewelry?.orders || 0}</td>
                <td style={{ fontWeight: 700 }}>${(data?.productDistribution?.jewelry?.revenue || 0).toLocaleString()}</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>${(data?.productDistribution?.jewelry?.netProfit || 0).toLocaleString()}</td>
                <td>
                  {(data?.productDistribution?.jewelry?.revenue || 0) > 0
                    ? (((data?.productDistribution?.jewelry?.netProfit || 0) / (data?.productDistribution?.jewelry?.revenue || 1)) * 100).toFixed(1)
                    : 0}
                  %
                </td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      )}

      {reportType === 'staff' && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Sales Representative</th>
                <th>Total Orders</th>
                <th>Sales Volume (USD)</th>
                <th>Net Profit (USD)</th>
                <th>Commission (USD)</th>
                <th>Net Profit (INR)</th>
              </tr>
            </thead>
            <tbody>
              {data?.salesPersonPerformance?.map((sp: any, i: number) => {
                const rev = Number(sp.revenue) || 0;
                const npUSD = Number(sp.netProfitUSD) || 0;
                const npINR = Number(sp.netProfitINR) || npUSD * (data?.metrics?.dollarRate || 94.55);
                const commUSD = Number(sp.commissionUSD) || 0;
                const fmt = (v: any) => (Number(v) || 0).toLocaleString();

                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{sp.name || 'Unassigned'}</td>
                    <td>{sp.orders || 0}</td>
                    <td style={{ fontWeight: 700 }}>${fmt(rev)}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>${fmt(npUSD)}</td>
                    <td style={{ color: '#d97706' }}>${fmt(commUSD)}</td>
                    <td>₹{fmt(npINR)}</td>
                  </tr>
                );
              })}
              {(!data?.salesPersonPerformance || data.salesPersonPerformance.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No staff performance records available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {reportType === 'profit' && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Financial Metric</th>
                <th>Value (USD)</th>
                <th>Value (INR @ {data?.metrics?.dollarRate || 94.55})</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Total Billed Revenue</td>
                <td style={{ fontWeight: 700 }}>${(Number(data?.metrics?.totalRevenue) || 0).toLocaleString()}</td>
                <td>₹{((Number(data?.metrics?.totalRevenue) || 0) * (data?.metrics?.dollarRate || 94.55)).toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Procurement Cost (COGS)</td>
                <td>${(Number(data?.metrics?.totalPurchaseCost) || 0).toLocaleString()}</td>
                <td>₹{((Number(data?.metrics?.totalPurchaseCost) || 0) * (data?.metrics?.dollarRate || 94.55)).toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Net Operational Profit</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>${(Number(data?.metrics?.totalNetProfit) || 0).toLocaleString()}</td>
                <td style={{ color: '#16a34a', fontWeight: 700 }}>₹{(Number(data?.metrics?.totalNetProfitINR) || (Number(data?.metrics?.totalNetProfit) || 0) * (data?.metrics?.dollarRate || 94.55)).toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Total Sales Commission</td>
                <td style={{ color: '#d97706', fontWeight: 700 }}>${(Number(data?.metrics?.totalCommission) || 0).toLocaleString()}</td>
                <td style={{ color: '#d97706', fontWeight: 700 }}>₹{(Number(data?.metrics?.totalCommissionINR) || (Number(data?.metrics?.totalCommission) || 0) * (data?.metrics?.dollarRate || 94.55)).toLocaleString()}</td>
              </tr>
              <tr style={{ background: '#f8fafc' }}>
                <td style={{ fontWeight: 800 }}>Retained Company Profit</td>
                <td style={{ color: '#0d1319', fontWeight: 800 }}>${(Number(data?.metrics?.totalProfitAfterCommission) || 0).toLocaleString()}</td>
                <td style={{ color: '#0d1319', fontWeight: 800 }}>₹{(Number(data?.metrics?.profitAfterCommissionINR) || (Number(data?.metrics?.totalProfitAfterCommission) || 0) * (data?.metrics?.dollarRate || 94.55)).toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      )}

      {reportType === 'backups' && (
        <div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: '0.8rem', color: '#166534', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              🛡️ <strong>Automated Database Resilience:</strong> Full database snapshots of all Sales, Staff, Clients, Attendance, and Commissions are automatically archived weekly in dedicated snapshot tables.
            </span>
          </div>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Backup Snapshot</th>
                  <th>Type</th>
                  <th>Created At</th>
                  <th>Sales Records</th>
                  <th>Staff</th>
                  <th>Clients</th>
                  <th>Size</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{b.backupName}</td>
                    <td>
                      <Badge $type={b.backupType}>
                        {b.backupType === 'AUTOMATIC_WEEKLY' ? '🟢 Weekly Auto' : '🟣 Manual Snapshot'}
                      </Badge>
                    </td>
                    <td>{b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'}</td>
                    <td style={{ fontWeight: 600 }}>{b.salesCount || 0} sales</td>
                    <td>{b.employeesCount || 0} staff</td>
                    <td>{b.customersCount || 0} clients</td>
                    <td style={{ color: '#64748b' }}>{Math.round((b.fileSizeBytes || 1024) / 1024)} KB</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          onClick={() => handleDownloadBackup(b.id, b.backupName)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '5px 10px',
                            background: '#0d1319',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 5,
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                          title="Download JSON Snapshot"
                        >
                          <HardDriveDownload size={13} /> Download
                        </button>
                        <button
                          onClick={() => handleRestoreBackup(b.id, b.backupName)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '5px 10px',
                            background: '#eff6ff',
                            color: '#1d4ed8',
                            border: '1px solid #bfdbfe',
                            borderRadius: 5,
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                          title="Restore Database from this Snapshot"
                        >
                          <RotateCcw size={13} /> Restore
                        </button>
                        <button
                          onClick={() => handleDeleteBackup(b.id, b.backupName)}
                          style={{
                            padding: '5px 8px',
                            background: '#fff1f2',
                            color: '#e11d48',
                            border: '1px solid #fecdd3',
                            borderRadius: 5,
                            cursor: 'pointer',
                          }}
                          title="Delete Backup"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {backups.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      No database backups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};
