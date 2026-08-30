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
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.8rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 10px;
    width: 100%;
  }
`;

const SelectInput = styled.select`
  padding: 6px 28px 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.8rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 13px;
  cursor: pointer;
  box-sizing: border-box;
  width: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    border-color: #0f172a;
  }
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

const KpiCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => ($highlight ? 'linear-gradient(135deg, #0d1319 0%, #1a2530 100%)' : '#ffffff')};
  color: ${({ $highlight }) => ($highlight ? '#ffffff' : '#0f172a')};
  border: 1px solid ${({ $highlight }) => ($highlight ? '#0d1319' : '#e2e8f0')};
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 12px;
  }

  .kpi-title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ $highlight }) => ($highlight ? '#e2b96f' : '#64748b')};
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kpi-value {
    font-size: 1.35rem;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    word-break: break-word;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }
  .kpi-sub {
    font-size: 0.72rem;
    color: ${({ $highlight }) => ($highlight ? '#9bb0bf' : '#64748b')};
    margin-top: 4px;
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
  const [dollarRate, setDollarRate] = useState<number>(() => {
    const cached = localStorage.getItem('fj_biz_fx_rate');
    return cached && !isNaN(Number(cached)) && Number(cached) > 0 ? Number(cached) : 94.55;
  });

  // Load latest exchange rate setting from database on mount
  useEffect(() => {
    businessApi
      .getSettings()
      .then((res) => {
        if (res?.settings?.dollarRate) {
          const dbRate = Number(res.settings.dollarRate);
          if (!isNaN(dbRate) && dbRate > 0) {
            setDollarRate(dbRate);
            localStorage.setItem('fj_biz_fx_rate', String(dbRate));
          }
        }
      })
      .catch((err) => console.error('Failed to fetch settings from DB:', err));
  }, []);

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
      if (res?.metrics?.dollarRate) {
        const metricRate = Number(res.metrics.dollarRate);
        if (!isNaN(metricRate) && metricRate > 0) {
          localStorage.setItem('fj_biz_fx_rate', String(metricRate));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [period, year, month, dollarRate]);

  const handleDollarRateChange = (newVal: number) => {
    setDollarRate(newVal);
    if (!isNaN(newVal) && newVal > 0) {
      localStorage.setItem('fj_biz_fx_rate', String(newVal));
      // Immediately persist to MySQL database
      businessApi.updateSettings({ dollarRate: newVal, defaultFxRate: newVal }).catch((err) => {
        console.error('Failed to sync dollar rate to database:', err);
      });
    }
  };

  const m = data?.metrics;
  const fmt = (val: any) => (Number(val) || 0).toLocaleString();

  const handlePeriodChange = (val: string) => {
    setPeriod(val);
    if (val === 'all') {
      setYear('All Years');
      setMonth('All Months');
    } else if (val === 'month') {
      setYear('2026');
      setMonth('August');
    } else if (val === 'year') {
      setYear('2026');
      setMonth('All Months');
    }
  };

  const handleYearChange = (val: string) => {
    setYear(val);
    if (period !== 'all' && period !== 'month') {
      setPeriod('all');
    }
  };

  const handleMonthChange = (val: string) => {
    setMonth(val);
    if (period !== 'all' && period !== 'month') {
      setPeriod('all');
    }
  };

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
          <SelectInput value={period} onChange={(e) => handlePeriodChange(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </SelectInput>

          <SelectInput value={year} onChange={(e) => handleYearChange(e.target.value)}>
            <option value="All Years">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </SelectInput>

          <SelectInput value={month} onChange={(e) => handleMonthChange(e.target.value)}>
            <option value="All Months">All Months</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
              (mo) => (
                <option key={mo} value={mo}>
                  {mo}
                </option>
              )
            )}
          </SelectInput>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setCurrencyView('USD')}
              style={{
                padding: '5px 10px',
                fontSize: '0.74rem',
                fontWeight: 700,
                background: currencyView === 'USD' ? '#0d1319' : '#f1f5f9',
                color: currencyView === 'USD' ? '#fff' : '#475569',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrencyView('INR')}
              style={{
                padding: '5px 10px',
                fontSize: '0.74rem',
                fontWeight: 700,
                background: currencyView === 'INR' ? '#0d1319' : '#f1f5f9',
                color: currencyView === 'INR' ? '#fff' : '#475569',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
              }}
            >
              INR (₹)
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Rate:</span>
            <input
              type="number"
              step="0.01"
              value={dollarRate}
              onChange={(e) => handleDollarRateChange(Number(e.target.value))}
              style={{ width: 62, padding: '5px 6px', fontSize: '0.76rem', border: '1px solid #cbd5e1', borderRadius: 5, textAlign: 'center' }}
            />
            <button
              type="button"
              onClick={fetchDashboard}
              style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 5, padding: '5px 8px', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Refresh Metrics"
            >
              <RefreshCw size={14} />
            </button>
          </div>
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
            {currencyView === 'USD' ? `$${fmt(m?.totalRevenue)}` : `₹${fmt((Number(m?.totalRevenue) || 0) * dollarRate)}`}
          </div>
          <div className="kpi-sub">{m?.totalOrders || 0} Invoiced Orders</div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Net Profit</span>
            <TrendingUp size={16} color="#16a34a" />
          </div>
          <div className="kpi-value" style={{ color: '#16a34a' }}>
            {currencyView === 'USD' ? `$${fmt(m?.totalNetProfit)}` : `₹${fmt(m?.totalNetProfitINR || (Number(m?.totalNetProfit) || 0) * dollarRate)}`}
          </div>
          <div className="kpi-sub">
            Avg Markup: {Number(m?.averageMarkupPercent || 0) > 1 ? Number(m?.averageMarkupPercent).toFixed(1) : ((Number(m?.averageMarkupPercent) || 0) * 100).toFixed(1)}%
          </div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Commission Paid/Due</span>
            <Award size={16} color="#d97706" />
          </div>
          <div className="kpi-value" style={{ color: '#d97706' }}>
            {currencyView === 'USD' ? `$${fmt(m?.totalCommission)}` : `₹${fmt(m?.totalCommissionINR || (Number(m?.totalCommission) || 0) * dollarRate)}`}
          </div>
          <div className="kpi-sub">
            Retained Profit: {currencyView === 'USD' ? `$${fmt(m?.totalProfitAfterCommission)}` : `₹${fmt(m?.profitAfterCommissionINR || (Number(m?.totalProfitAfterCommission) || 0) * dollarRate)}`}
          </div>
        </KpiCard>

        <KpiCard>
          <div className="kpi-title">
            <span>Attendance Today</span>
            <Users size={16} color="#2563eb" />
          </div>
          <div className="kpi-value" style={{ color: '#2563eb' }}>
            {(data as any)?.attendanceToday?.present || data?.attendance?.present || 0} / {(data as any)?.attendanceToday?.total || data?.attendance?.totalEmployees || 0}
          </div>
          <div className="kpi-sub">
            {(data as any)?.attendanceToday?.late || data?.attendance?.late || 0} Late | {(data as any)?.attendanceToday?.absent || data?.attendance?.absent || 0} Absent | {(data as any)?.attendanceToday?.onLeave || data?.attendance?.onLeave || 0} Leave
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
                {data?.salesPersonPerformance?.map((sp, idx) => {
                  const rev = Number(sp.revenue) || 0;
                  const npUSD = Number(sp.netProfitUSD) || 0;
                  const npINR = Number(sp.netProfitINR) || npUSD * dollarRate;
                  const commUSD = Number(sp.commissionUSD) || 0;
                  const commINR = Number(sp.commissionINR) || commUSD * dollarRate;
                  const pacUSD = Number(sp.profitAfterCommission) || (npUSD - commUSD);
                  const pacINR = pacUSD * dollarRate;

                  return (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{sp.name || 'Unassigned'}</td>
                      <td>{sp.orders || 0}</td>
                      <td>${fmt(rev)}</td>
                      <td style={{ color: '#16a34a', fontWeight: 600 }}>
                        {currencyView === 'USD' ? `$${fmt(npUSD)}` : `₹${fmt(npINR)}`}
                      </td>
                      <td style={{ color: '#d97706', fontWeight: 600 }}>
                        {currencyView === 'USD' ? `$${fmt(commUSD)}` : `₹${fmt(commINR)}`}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {currencyView === 'USD' ? `$${fmt(pacUSD)}` : `₹${fmt(pacINR)}`}
                      </td>
                    </tr>
                  );
                })}
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
                  <span>${fmt(data?.productDistribution?.diamond?.revenue)}</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: '#e2b96f',
                      width: `${
                        (Number(m?.totalRevenue) || 0) > 0
                          ? Math.min(100, (((Number(data?.productDistribution?.diamond?.revenue) || 0) / (Number(m?.totalRevenue) || 1)) * 100))
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                  {data?.productDistribution?.diamond?.orders || 0} Orders | Net: ${fmt(data?.productDistribution?.diamond?.netProfit)}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                  <span>Finished Jewelry</span>
                  <span>${fmt(data?.productDistribution?.jewelry?.revenue)}</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: '#0d1319',
                      width: `${
                        (Number(m?.totalRevenue) || 0) > 0
                          ? Math.min(100, (((Number(data?.productDistribution?.jewelry?.revenue) || 0) / (Number(m?.totalRevenue) || 1)) * 100))
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                  {data?.productDistribution?.jewelry?.orders || 0} Orders | Net: ${fmt(data?.productDistribution?.jewelry?.netProfit)}
                </div>
              </div>
            </div>
          </ContentCard>

          {/* Company Monthly Sales Target Progress */}
          <ContentCard>
            {(() => {
              const tgt = (data as any)?.salesTargetOverall || (data as any)?.targets || {};
              const mName = tgt.monthName || month !== 'All Months' ? month : 'August';
              const yr = tgt.year || year !== 'All Years' ? year : '2026';
              const tgtVal = Number(tgt.target ?? tgt.totalTarget ?? 0);
              const actVal = Number(tgt.actual ?? tgt.actualSales ?? 0);
              const achPct = tgtVal > 0 ? Math.min(100, Math.round((actVal / tgtVal) * 100)) : 0;
              const remaining = Math.max(0, tgtVal - actVal);
              const orders = tgt.orderCount ?? 0;

              return (
                <div>
                  <div className="card-header" style={{ marginBottom: 12 }}>
                    <div>
                      <div className="card-title">Company Monthly Target</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                        Target for <strong>{mName} {yr}</strong> ({orders} orders)
                      </div>
                    </div>
                    <Percent size={16} color="#2563eb" />
                  </div>

                  {tgtVal > 0 ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                        <span style={{ color: '#0f172a' }}>Achieved: ${fmt(actVal)}</span>
                        <span style={{ color: '#64748b' }}>Target: ${fmt(tgtVal)}</span>
                      </div>
                      <div style={{ height: 10, background: '#f1f5f9', borderRadius: 5, overflow: 'hidden', margin: '8px 0' }}>
                        <div
                          style={{
                            height: '100%',
                            background: achPct >= 100 ? '#16a34a' : '#2563eb',
                            width: `${achPct}%`,
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                        <span>Achievement: <strong style={{ color: achPct >= 100 ? '#16a34a' : '#0f172a' }}>{achPct}%</strong></span>
                        <span>Remaining: <strong>${fmt(remaining)}</strong></span>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '8px 0', fontSize: '0.78rem', color: '#64748b' }}>
                      <div>No target quota configured for <strong>{mName} {yr}</strong>.</div>
                      <div style={{ marginTop: 6, fontWeight: 700, color: '#0f172a' }}>
                        Closed Sales: ${fmt(actVal)} ({orders} orders)
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
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
                  <td style={{ fontWeight: 700 }}>${fmt(c.revenue)}</td>
                </tr>
              ))}
              {(!data?.topCustomers || data.topCustomers.length === 0) && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>
                    No client revenue records yet.
                  </td>
                </tr>
              )}
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
                  <td style={{ fontWeight: 700 }}>${fmt(c.revenue)}</td>
                </tr>
              ))}
              {(!data?.countryDistribution || data.countryDistribution.length === 0) && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '16px', color: '#94a3b8' }}>
                    No geographic distribution data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ContentCard>
      </GridTwoCol>
    </div>
  );
};
