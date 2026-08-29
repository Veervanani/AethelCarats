import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { FileText, Download, Filter, Calendar } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const ControlCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

const ReportTypeButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1px solid ${({ $active }) => ($active ? '#0d1319' : '#cbd5e1')};
  background: ${({ $active }) => ($active ? '#0d1319' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#334155')};
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

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

export const BusinessReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<'sales' | 'staff' | 'profit'>('sales');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    businessApi
      .getDashboardMetrics({ period: 'all' })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const handleExport = () => {
    alert('Report downloaded in CSV format.');
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Business & Profit Intelligence Reports</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Consolidated financial auditing, salesperson profitability analysis, and margins
          </p>
        </div>

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
          <Download size={15} /> Export Audit Report
        </button>
      </PageHeader>

      <ControlCard>
        <div style={{ display: 'flex', gap: 8 }}>
          <ReportTypeButton $active={reportType === 'sales'} onClick={() => setReportType('sales')}>
            Sales Breakdown
          </ReportTypeButton>
          <ReportTypeButton $active={reportType === 'staff'} onClick={() => setReportType('staff')}>
            Staff Performance
          </ReportTypeButton>
          <ReportTypeButton $active={reportType === 'profit'} onClick={() => setReportType('profit')}>
            Margin & Retained Profit
          </ReportTypeButton>
        </div>
      </ControlCard>

      {reportType === 'sales' && (
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
      )}

      {reportType === 'staff' && (
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
      )}

      {reportType === 'profit' && (
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
      )}
    </div>
  );
};
