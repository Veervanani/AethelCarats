import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { SalesTarget, Employee } from '../types';
import { TrendingUp, Plus, Target, CheckCircle2, AlertTriangle } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const TargetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;

const TargetCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .emp-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }
  .period-badge {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 6px;
    background: #f1f5f9;
    color: #475569;
    border-radius: 4px;
  }
  .progress-bar-container {
    height: 10px;
    background: #f1f5f9;
    border-radius: 5px;
    overflow: hidden;
    margin: 12px 0;
  }
  .progress-fill {
    height: 100%;
    background: #2563eb;
    transition: width 0.3s ease;
  }
`;

export const BusinessSalesTargetsPage: React.FC = () => {
  const [targets, setTargets] = useState<SalesTarget[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [targetAmount, setTargetAmount] = useState('50000');
  const [periodType, setPeriodType] = useState('MONTHLY');
  const [periodYear, setPeriodYear] = useState('2026');
  const [periodMonth, setPeriodMonth] = useState('8');

  const fetchTargets = async () => {
    setLoading(true);
    try {
      const [tRes, empRes] = await Promise.all([
        businessApi.getTargets({ year: periodYear }),
        businessApi.getEmployees({ status: 'ACTIVE' }),
      ]);
      setTargets(tRes || []);
      setEmployees(empRes.employees || []);
      if (empRes.employees && empRes.employees.length > 0 && !employeeId) {
        setEmployeeId(empRes.employees[0].id);
      }
    } catch (e) {
      console.error(e);
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
        employeeId,
        periodType,
        periodYear: Number(periodYear),
        periodMonth: Number(periodMonth),
        targetAmount: Number(targetAmount),
      });
      setShowModal(false);
      fetchTargets();
      alert('✅ Sales target established');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to save target');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Sales Targets & Quotas</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Set monthly quota targets and track live progress against closed revenue
          </p>
        </div>

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
          <Plus size={16} /> Set Quota Target
        </button>
      </PageHeader>

      <TargetGrid>
        {targets.map((t) => (
          <TargetCard key={t.id}>
            <div className="header">
              <div>
                <div className="emp-name">{t.employee?.fullName}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{t.employee?.employeeCode}</div>
              </div>
              <span className="period-badge">
                {t.periodType} {t.periodMonth ? `(M${t.periodMonth}/${t.periodYear})` : t.periodYear}
              </span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(100, t.achievementPercent || 0)}%`,
                  background: (t.achievementPercent || 0) >= 100 ? '#16a34a' : '#2563eb',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>Achieved: ${(t.actualSales || 0).toLocaleString()}</span>
              <span>Quota: ${t.targetAmount.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: 8 }}>
              <span>Achievement: {t.achievementPercent || 0}%</span>
              <span>{t.orderCount || 0} Orders</span>
              <span>Remaining: ${(t.remaining || 0).toLocaleString()}</span>
            </div>
          </TargetCard>
        ))}
        {targets.length === 0 && !loading && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#fff', borderRadius: 8, color: '#94a3b8' }}>
            No quotas established for {periodYear}. Click "Set Quota Target" to configure targets.
          </div>
        )}
      </TargetGrid>

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
              background: '#fff',
              borderRadius: 12,
              width: '100%',
              maxWidth: 480,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px 0' }}>Set Employee Sales Quota</h2>
            <form onSubmit={handleCreateTarget}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Employee *</label>
                  <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName || (e as any).name} ({e.employeeCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Period Year</label>
                    <input
                      type="number"
                      value={periodYear}
                      onChange={(e) => setPeriodYear(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Month (1 - 12)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={periodMonth}
                      onChange={(e) => setPeriodMonth(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Target Amount ($) *</label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 20px', background: '#0d1319', color: '#fff', border: 'none', borderRadius: 6 }}
                >
                  Save Quota Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
