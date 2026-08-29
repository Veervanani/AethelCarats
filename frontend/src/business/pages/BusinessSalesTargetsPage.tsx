import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { SalesTarget } from '../types';
import { TrendingUp, Plus, Target, CheckCircle2, Award, DollarSign, Trash2, Calendar, Sparkles } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;

const StatCard = styled.div<{ $highlight?: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $highlight }) => ($highlight ? '#0d1319' : '#e2e8f0')};
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.04em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .val {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 6px;
  }

  .sub {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 4px;
  }
`;

const TargetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;

const TargetCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .month-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
  }

  .period-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    background: #f1f5f9;
    color: #334155;
    border-radius: 6px;
  }

  .progress-bar-container {
    height: 10px;
    background: #f1f5f9;
    border-radius: 5px;
    overflow: hidden;
    margin: 14px 0;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.4s ease;
  }
`;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const fmt = (num: any) => (Number(num) || 0).toLocaleString();

export const BusinessSalesTargetsPage: React.FC = () => {
  const [targets, setTargets] = useState<SalesTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [periodYear, setPeriodYear] = useState('2026');
  const [periodMonth, setPeriodMonth] = useState('8');
  const [targetAmount, setTargetAmount] = useState('50000');
  const [notes, setNotes] = useState('Company Monthly Sales Target');

  const fetchTargets = async () => {
    setLoading(true);
    try {
      const res = await businessApi.getTargets({ year: periodYear });
      const raw = Array.isArray(res) ? res : ((res as any)?.targets || []);
      setTargets(raw);
    } catch (e) {
      console.error(e);
      setTargets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, [periodYear]);

  const handleCreateTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await businessApi.createTarget({
        periodType: 'MONTHLY',
        periodYear: Number(periodYear),
        periodMonth: Number(periodMonth),
        targetAmount: Number(targetAmount),
        notes,
      });
      setShowModal(false);
      fetchTargets();
      alert('✅ Company monthly sales target established successfully.');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to save target');
    }
  };

  const handleDeleteTarget = async (id: string, name: string) => {
    if (!window.confirm(`⚠️ Are you sure you want to remove target for ${name}?`)) return;
    try {
      await businessApi.deleteTarget(id);
      fetchTargets();
      alert('✅ Target removed.');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete target');
    }
  };

  const totalTargetVol = targets.reduce((sum, t) => sum + (Number(t.targetAmount) || 0), 0);
  const totalActualRev = targets.reduce((sum, t) => sum + (Number(t.actualRevenue || t.actualSales) || 0), 0);
  const totalProfitGen = targets.reduce((sum, t) => sum + (Number(t.netProfit) || 0), 0);
  const totalOrders = targets.reduce((sum, t) => sum + (Number(t.orderCount) || 0), 0);

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Company Monthly Sales Targets</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Set monthly business revenue targets and track organization-wide fulfillment across closed deals
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select
            value={periodYear}
            onChange={(e) => setPeriodYear(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <option value="2025">Year 2025</option>
            <option value="2026">Year 2026</option>
            <option value="2027">Year 2027</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
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
            <Plus size={16} /> Set Monthly Target
          </button>
        </div>
      </PageHeader>

      {/* Aggregate KPI Summary */}
      <SummaryGrid>
        <StatCard>
          <div className="label">
            <span>Configured Targets</span>
            <Target size={15} color="#2563eb" />
          </div>
          <div className="val">${fmt(totalTargetVol)}</div>
          <div className="sub">{targets.length} monthly quotas</div>
        </StatCard>

        <StatCard $highlight>
          <div className="label">
            <span>Billed Revenue</span>
            <DollarSign size={15} color="#0f172a" />
          </div>
          <div className="val">${fmt(totalActualRev)}</div>
          <div className="sub">{totalOrders} invoiced transactions</div>
        </StatCard>

        <StatCard>
          <div className="label">
            <span>Net Profit Generated</span>
            <Sparkles size={15} color="#16a34a" />
          </div>
          <div className="val" style={{ color: '#16a34a' }}>
            ${fmt(totalProfitGen)}
          </div>
          <div className="sub">Company gross margin</div>
        </StatCard>

        <StatCard>
          <div className="label">
            <span>Overall Fulfillment</span>
            <Award size={15} color="#d97706" />
          </div>
          <div className="val" style={{ color: totalTargetVol > 0 && totalActualRev >= totalTargetVol ? '#16a34a' : '#2563eb' }}>
            {totalTargetVol > 0 ? ((totalActualRev / totalTargetVol) * 100).toFixed(1) : 0}%
          </div>
          <div className="sub">Progress toward annual quota</div>
        </StatCard>
      </SummaryGrid>

      {/* Monthly Target Cards */}
      <TargetGrid>
        {targets.map((t) => {
          const mName = t.monthName || MONTH_NAMES[(t.periodMonth || 8) - 1] || 'Month';
          const actRev = Number(t.actualRevenue || t.actualSales) || 0;
          const tgtAmt = Number(t.targetAmount) || 0;
          const pct = tgtAmt > 0 ? Math.min(100, Math.round((actRev / tgtAmt) * 100)) : 0;
          const isAchieved = actRev >= tgtAmt && tgtAmt > 0;

          return (
            <TargetCard key={t.id}>
              <div>
                <div className="header">
                  <div>
                    <div className="month-title">
                      {mName} {t.periodYear}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>{t.notes || 'Company Target'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: isAchieved ? '#ebfbee' : actRev > 0 ? '#eff6ff' : '#f8fafc',
                        color: isAchieved ? '#2b8a3e' : actRev > 0 ? '#1d4ed8' : '#64748b',
                        border: isAchieved ? '1px solid #b2f2bb' : actRev > 0 ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                      }}
                    >
                      {isAchieved ? '🟢 Achieved' : actRev > 0 ? '🔵 In Progress' : '🟡 Pending'}
                    </span>
                    <button
                      onClick={() => handleDeleteTarget(t.id, `${mName} ${t.periodYear}`)}
                      style={{
                        background: '#fff1f2',
                        border: '1px solid #fecdd3',
                        color: '#e11d48',
                        borderRadius: 5,
                        padding: '4px 6px',
                        cursor: 'pointer',
                      }}
                      title="Delete Target"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="progress-bar-container">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: isAchieved ? '#16a34a' : '#2563eb',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 800 }}>
                  <span style={{ color: '#0f172a' }}>Achieved: ${fmt(actRev)}</span>
                  <span style={{ color: '#64748b' }}>Target: ${fmt(tgtAmt)}</span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.74rem',
                  color: '#64748b',
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <span>Fulfillment: <strong style={{ color: isAchieved ? '#16a34a' : '#0f172a' }}>{pct}%</strong></span>
                <span>{t.orderCount || 0} Orders</span>
                <span>Remaining: <strong>${fmt(Math.max(0, tgtAmt - actRev))}</strong></span>
              </div>
            </TargetCard>
          );
        })}

        {targets.length === 0 && !loading && (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '48px 24px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              color: '#94a3b8',
            }}
          >
            No company monthly targets configured for {periodYear}. Click "Set Monthly Target" to establish goals.
          </div>
        )}
      </TargetGrid>

      {/* Set Company Target Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(3px)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              width: '100%',
              maxWidth: 480,
              padding: 24,
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Set Company Monthly Target</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTarget}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Target Year
                    </label>
                    <select
                      value={periodYear}
                      onChange={(e) => setPeriodYear(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.84rem' }}
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Target Month
                    </label>
                    <select
                      value={periodMonth}
                      onChange={(e) => setPeriodMonth(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.84rem' }}
                    >
                      {MONTH_NAMES.map((name, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Company Revenue Target ($ USD) *
                  </label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.84rem', boxSizing: 'border-box' }}
                    required
                    placeholder="e.g. 50000"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                    Target Description / Goal Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.84rem', boxSizing: 'border-box' }}
                    placeholder="e.g. Q3 High Atelier & Diamond Sales Quota"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: '#ffffff', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    background: '#0d1319',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save Company Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
