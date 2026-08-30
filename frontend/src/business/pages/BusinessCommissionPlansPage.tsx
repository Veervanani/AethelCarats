import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { CommissionPlan } from '../types';
import { Layers, Plus, ArrowLeft, CheckCircle2, Trash2 } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;

const PlanCard = styled.div<{ $isDefault?: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $isDefault }) => ($isDefault ? '#e2b96f' : '#e2e8f0')};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;

  .plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .plan-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
  }
  .rule-list {
    margin-top: 14px;
    border-top: 1px solid #f1f5f9;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .rule-item {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    background: #f8fafc;
    border-radius: 4px;
  }
`;

export const BusinessCommissionPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<CommissionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [rules, setRules] = useState<any[]>([
    { productType: 'DIAMOND', commissionBasis: 'NET_PROFIT', commissionRate: 0.05 },
    { productType: 'JEWELRY', commissionBasis: 'NET_PROFIT', commissionRate: 0.06 },
  ]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res: any = await businessApi.getCommissionPlans();
      setPlans(Array.isArray(res) ? res : (res?.plans || []));
    } catch (e) {
      console.error(e);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await businessApi.createCommissionPlan({
        name,
        description,
        isDefault,
        rules,
      });
      setShowModal(false);
      setName('');
      setDescription('');
      fetchPlans();
      alert('✅ Plan created successfully');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to create plan');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <Link
            to={`${PRIVATE_BUSINESS_PATH}/commissions`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', marginBottom: 6 }}
          >
            <ArrowLeft size={14} /> Back to Commissions
          </Link>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Commission Plans & Rules</h1>
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
          <Plus size={16} /> Create Commission Plan
        </button>
      </PageHeader>

      <PlanGrid>
        {plans.map((p) => (
          <PlanCard key={p.id} $isDefault={p.isDefault}>
            <div className="plan-header">
              <div className="plan-name">{p.name}</div>
              {p.isDefault && (
                <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', background: '#fef3c7', color: '#b45309', borderRadius: 4 }}>
                  DEFAULT
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 10px 0' }}>{p.description || 'Standard atelier commission plan'}</p>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Rules</div>
            <div className="rule-list">
              {p.rules?.map((r, i) => (
                <div key={i} className="rule-item">
                  <span>{r.productType} ({r.commissionBasis}):</span>
                  <strong>{(r.commissionRate * 100).toFixed(1)}%</strong>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 14 }}>
              Assigned to <strong>{p._count?.employees || 0}</strong> staff members
            </div>
          </PlanCard>
        ))}
      </PlanGrid>

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
              maxWidth: 540,
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: 24,
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px 0' }}>Create Commission Plan</h2>
            <form onSubmit={handleCreatePlan}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Plan Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Senior Diamond Executive Plan"
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    id="isDefPlan"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                  />
                  <label htmlFor="isDefPlan" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                    Set as Default Plan for New Employees
                  </label>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Plan Rates</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Diamond Net Profit %</span>
                      <input
                        type="number"
                        step="0.005"
                        value={rules[0]?.commissionRate || 0.05}
                        onChange={(e) => {
                          const updated = [...rules];
                          updated[0].commissionRate = Number(e.target.value);
                          setRules(updated);
                        }}
                        style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Jewelry Net Profit %</span>
                      <input
                        type="number"
                        step="0.005"
                        value={rules[1]?.commissionRate || 0.06}
                        onChange={(e) => {
                          const updated = [...rules];
                          updated[1].commissionRate = Number(e.target.value);
                          setRules(updated);
                        }}
                        style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                      />
                    </div>
                  </div>
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
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
