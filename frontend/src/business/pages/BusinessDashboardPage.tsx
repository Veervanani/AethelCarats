import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { BusinessDashboardMetrics } from '../types';
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Gem,
  Award,
  Users,
  Percent,
  Calendar,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const SelectInput = styled.select`
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.82rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const KpiCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => ($highlight ? 'linear-gradient(135deg, #0d1319 0%, #1a2530 100%)' : '#ffffff')};
  color: ${({ $highlight }) => ($highlight ? '#ffffff' : '#0f172a')};
  border: 1px solid ${({ $highlight }) => ($highlight ? '#0d1319' : '#e2e8f0')};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  .kpi-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ $highlight }) => ($highlight ? '#e2b96f' : '#64748b')};
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kpi-value {
    font-size: 1.6rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
  }
  .kpi-sub {
    font-size: 0.75rem;
    color: ${({ $highlight }) => ($highlight ? '#9bb0bf' : '#64748b')};
    margin-top: 6px;
  }
`;

const GridTwoCol = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
  }
  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;

  th {
    text-align: left;
    padding: 10px 12px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`;

export const BusinessDashboardPage: React.FC = () => {
  const [data, setData] = useState<BusinessDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<string>('all');
  const [year, setYear] = useState<string>('2026');
  const [month, setMonth] = useState<string>('All Months');
  const [currencyView, setCurrencyView] = useState<'USD' | 'INR'>('USD');
  const [dollarRate, setDollarRate] = useState<number>(94.55);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await businessApi.getDashboardMetrics({
        period,
        year: year !== 'All Years' ? year : undefined,
        month: month !== 'All Months' ? month : undefined,
        dollarRate,
      });
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [period, year, month, dollarRate]);

  const m = data?.metrics;

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Executive Business Dashboard</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Real-time Sales, Profits, Commissions, and Employee Operations Overview
          </p>
        </div>

        <FilterBar>
          <SelectInput value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </SelectInput>

          <SelectInput value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="All Years">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </SelectInput>

          <SelectInput value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="All Months">All Months</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
              (mo) => (
                <option key={mo} value={mo}>
                  {mo}
                </option>
              )
            )}
          </SelectInput>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderLeft: '1px solid #e2e8f0', paddingLeft: 10 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Currency:</span>
            <button
              onClick={() => setCurrencyView('USD')}
              style={{
                padding: '4px 8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: currencyView === 'USD' ? '#0d1319' : '#f1f5f9',
                color: currencyView === 'USD' ? '#fff' : '#475569',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrencyView('INR')}
              style={{
                padding: '4px 8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: currencyView === 'INR' ? '#0d1319' : '#f1f5f9',
                color: currencyView === 'INR' ? '#fff' : '#475569',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              INR (₹)
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Rate:</span>
            <input
              type="number"
              value={dollarRate}
              onChange={(e) => setDollarRate(Number(e.target.value))}
              style={{ width: 60, padding: '4px 6px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }}
            />
          </div>

          <button
            onClick={fetchDashboard}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
            title="Refresh Metrics"
          >
            <RefreshCw size={16} />
          </button>
        </FilterBar>
      </PageHeader>

      {/* KPI Cards */}
      <KpiGrid>
        <KpiCard $highlight>
          <div className="kpi-title">
            <span>Total Revenue</span>
            <DollarSign size={16} />
          </div>
          <div className="kpi-value">
            {currencyView === 'USD' ? `$${(m?.totalRevenue || 0).toLocaleString()}` : `₹${((m?.totalRevenue || 0) * dollarRate).toLocaleString()}`}
          </div>
          <div className="kpi-sub">{m?.totalOrders || 0} Invoiced Orders</div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Net Profit</span>
            <TrendingUp size={16} color="#16a34a" />
          </div>
          <div className="kpi-value" style={{ color: '#16a34a' }}>
            {currencyView === 'USD' ? `$${(m?.totalNetProfit || 0).toLocaleString()}` : `₹${(m?.totalNetProfitINR || 0).toLocaleString()}`}
          </div>
          <div className="kpi-sub">Avg Markup: {((m?.averageMarkupPercent || 0) * 100).toFixed(1)}%</div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Commission Paid/Due</span>
            <Award size={16} color="#d97706" />
          </div>
          <div className="kpi-value" style={{ color: '#d97706' }}>
            {currencyView === 'USD' ? `$${(m?.totalCommission || 0).toLocaleString()}` : `₹${(m?.totalCommissionINR || 0).toLocaleString()}`}
          </div>
          <div className="kpi-sub">
            Retained Profit: {currencyView === 'USD' ? `$${(m?.totalProfitAfterCommission || 0).toLocaleString()}` : `₹${(m?.profitAfterCommissionINR || 0).toLocaleString()}`}
          </div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Attendance Today</span>
            <Users size={16} color="#2563eb" />
          </div>
          <div className="kpi-value" style={{ color: '#2563eb' }}>
            {data?.attendance?.present || 0} / {data?.attendance?.totalEmployees || 0}
          </div>
          <div className="kpi-sub">
            {data?.attendance?.late || 0} Late | {data?.attendance?.absent || 0} Absent | {data?.attendance?.onLeave || 0} Leave
          </div>
        </KpiCard>
      </KpiGrid>

      {/* Main Grid */}
      <GridTwoCol>
        {/* Salesperson Performance */}
        <ContentCard>
          <div className="card-header">
            <div className="card-title">Sales Person Performance & Commission</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
              Showing {data?.salesPersonPerformance?.length || 0} Staff Members
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <th>Sales Person</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Net Profit ({currencyView})</th>
                  <th>Commission ({currencyView})</th>
                  <th>Profit Retained ({currencyView})</th>
                </tr>
              </thead>
              <tbody>
                {data?.salesPersonPerformance?.map((sp, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{sp.name}</td>
                    <td>{sp.orders}</td>
                    <td>${sp.revenue.toLocaleString()}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>
                      {currencyView === 'USD' ? `$${sp.netProfitUSD.toLocaleString()}` : `₹${sp.netProfitINR.toLocaleString()}`}
                    </td>
                    <td style={{ color: '#d97706', fontWeight: 600 }}>
                      {currencyView === 'USD' ? `$${sp.commissionUSD.toLocaleString()}` : `₹${sp.commissionINR.toLocaleString()}`}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {currencyView === 'USD'
                        ? `$${sp.profitAfterCommission.toLocaleString()}`
                        : `₹${(sp.profitAfterCommission * dollarRate).toLocaleString()}`}
                    </td>
                  </tr>
                ))}
                {(!data?.salesPersonPerformance || data.salesPersonPerformance.length === 0) && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                      No sales data recorded for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </ContentCard>

        {/* Product & Quota Distribution */}
        <div>
          <ContentCard style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div className="card-title">Product Distribution</div>
              <Gem size={16} color="#e2b96f" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                  <span>Loose Diamonds</span>
                  <span>${data?.productDistribution?.diamond?.revenue?.toLocaleString() || 0}</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: '#e2b96f',
                      width: `${
                        (m?.totalRevenue || 0) > 0
                          ? Math.min(100, (((data?.productDistribution?.diamond?.revenue || 0) / (m?.totalRevenue || 1)) * 100))
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                  {data?.productDistribution?.diamond?.orders || 0} Orders | Net: ${data?.productDistribution?.diamond?.netProfit || 0}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                  <span>Finished Jewelry</span>
                  <span>${data?.productDistribution?.jewelry?.revenue?.toLocaleString() || 0}</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: '#0d1319',
                      width: `${
                        (m?.totalRevenue || 0) > 0
                          ? Math.min(100, (((data?.productDistribution?.jewelry?.revenue || 0) / (m?.totalRevenue || 1)) * 100))
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                  {data?.productDistribution?.jewelry?.orders || 0} Orders | Net: ${data?.productDistribution?.jewelry?.netProfit || 0}
                </div>
              </div>
            </div>
          </ContentCard>

          {/* Sales Quota Progress */}
          <ContentCard>
            <div className="card-header">
              <div className="card-title">Sales Target Quota</div>
              <Percent size={16} color="#2563eb" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                <span>Achieved: ${data?.targets?.actualSales?.toLocaleString() || 0}</span>
                <span>Target: ${data?.targets?.totalTarget?.toLocaleString() || 0}</span>
              </div>
              <div style={{ height: 10, background: '#f1f5f9', borderRadius: 5, overflow: 'hidden', margin: '8px 0' }}>
                <div
                  style={{
                    height: '100%',
                    background: '#2563eb',
                    width: `${Math.min(100, data?.targets?.achievementPercent || 0)}%`,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Achievement: {data?.targets?.achievementPercent || 0}%</span>
                <span>Remaining: ${data?.targets?.remaining?.toLocaleString() || 0}</span>
              </div>
            </div>
          </ContentCard>
        </div>
      </GridTwoCol>

      {/* Top Customers & Country Distribution */}
      <GridTwoCol>
        <ContentCard>
          <div className="card-header">
            <div className="card-title">Top Clients by Revenue</div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Country</th>
                <th>Orders</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data?.topCustomers?.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.country || '-'}</td>
                  <td>{c.orders}</td>
                  <td style={{ fontWeight: 700 }}>${c.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ContentCard>

        <ContentCard>
          <div className="card-header">
            <div className="card-title">Geographic Sales</div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Orders</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data?.countryDistribution?.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.country}</td>
                  <td>{c.orders}</td>
                  <td style={{ fontWeight: 700 }}>${c.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ContentCard>
      </GridTwoCol>
    </div>
  );
};
