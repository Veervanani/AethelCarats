import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { CommissionRecord, Employee } from '../types';
import {
  Award,
  DollarSign,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Layers,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;

const StatCard = styled.div<{ $color?: string }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({ $color }) => $color || '#0d1319'};
  border-radius: 8px;
  padding: 16px;

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
  .sub {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 4px;
  }
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
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
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`;

const Badge = styled.span<{ $status: string }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;

  ${({ $status }) => {
    switch ($status) {
      case 'PAID':
        return 'background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;';
      case 'APPROVED':
        return 'background: #e7f5ff; color: #1c7ed6; border: 1px solid #a5d8ff;';
      case 'PENDING':
        return 'background: #fff9db; color: #f59f00; border: 1px solid #ffe066;';
      case 'CANCELLED':
        return 'background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;';
      default:
        return 'background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;';
    }
  }}
`;

export const BusinessCommissionPage: React.FC = () => {
  const [commissions, setCommissions] = useState<CommissionRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState('ALL');
  const [employeeId, setEmployeeId] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchCommissions = async () => {
    setLoading(true);
    try {
      const [commRes, empRes] = await Promise.all([
        businessApi.getCommissions({
          status: status !== 'ALL' ? status : undefined,
          employeeId: employeeId !== 'ALL' ? employeeId : undefined,
        }),
        businessApi.getEmployees({ status: 'ACTIVE' }),
      ]);
      setCommissions(commRes.commissions || []);
      setStats(commRes.stats);
      setEmployees(empRes.employees || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, [status, employeeId]);

  const handleApprove = async (id: string) => {
    try {
      await businessApi.approveCommission(id);
      fetchCommissions();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Approval failed');
    }
  };

  const handlePay = async (id: string) => {
    const ref = prompt('Enter payment reference (e.g. Bank Transfer / Check #):', 'Bank Wire');
    if (!ref) return;
    try {
      await businessApi.payCommission(id, ref);
      fetchCommissions();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Payout failed');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Sales Commissions & Payouts</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Commission calculations ledger, approval queues, and payout disbursement tracking
          </p>
        </div>

        <Link
          to={`${PRIVATE_BUSINESS_PATH}/commission-plans`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: '#0d1319',
            color: '#ffffff',
            borderRadius: 6,
            fontSize: '0.82rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Layers size={15} /> Commission Plans & Rules
        </Link>
      </PageHeader>

      <StatGrid>
        <StatCard $color="#f59f00">
          <div className="label">Pending Approval</div>
          <div className="val" style={{ color: '#d97706' }}>
            ${(stats?.pendingAmount || 0).toLocaleString()}
          </div>
          <div className="sub">{stats?.pendingCount || 0} Transactions</div>
        </StatCard>
        <StatCard $color="#1c7ed6">
          <div className="label">Approved (Awaiting Payout)</div>
          <div className="val" style={{ color: '#2563eb' }}>
            ${(stats?.approvedAmount || 0).toLocaleString()}
          </div>
          <div className="sub">{stats?.approvedCount || 0} Transactions</div>
        </StatCard>
        <StatCard $color="#2b8a3e">
          <div className="label">Paid Out</div>
          <div className="val" style={{ color: '#16a34a' }}>
            ${(stats?.paidAmount || 0).toLocaleString()}
          </div>
          <div className="sub">{stats?.paidCount || 0} Transactions</div>
        </StatCard>
        <StatCard $color="#0d1319">
          <div className="label">Total Commissions</div>
          <div className="val">${(stats?.totalCommission || 0).toLocaleString()}</div>
          <div className="sub">All statuses combined</div>
        </StatCard>
      </StatGrid>

      <ControlBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="PAID">PAID</option>
          </select>

          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="ALL">All Staff Members</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName} ({emp.employeeCode})
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Showing {commissions.length} records</div>
      </ControlBar>

      <Table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Sale Invoice</th>
            <th>Client</th>
            <th>Sale Date</th>
            <th>Basis</th>
            <th>Rate</th>
            <th>Commission Amount</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((c) => (
            <tr key={c.id}>
              <td style={{ fontWeight: 600 }}>
                <div>{c.employee?.fullName}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.employee?.employeeCode}</div>
              </td>
              <td style={{ fontWeight: 700 }}>
                <Link to={`${PRIVATE_BUSINESS_PATH}/sales/${c.saleId}`} style={{ color: '#0d1319' }}>
                  {c.sale?.invoiceNo || 'INV'}
                </Link>
              </td>
              <td>{c.sale?.customerName || '-'}</td>
              <td>{c.sale?.saleDate ? new Date(c.sale.saleDate).toLocaleDateString() : '-'}</td>
              <td>{c.commissionBasis}</td>
              <td>{(c.commissionRate * 100).toFixed(1)}%</td>
              <td style={{ fontWeight: 800, color: '#d97706', fontSize: '0.9rem' }}>
                ${c.commissionAmount.toLocaleString()}
              </td>
              <td>
                <Badge $status={c.status}>{c.status}</Badge>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 6 }}>
                  {c.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(c.id)}
                      style={{
                        padding: '4px 10px',
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Approve
                    </button>
                  )}
                  {c.status === 'APPROVED' && (
                    <button
                      onClick={() => handlePay(c.id)}
                      style={{
                        padding: '4px 10px',
                        background: '#16a34a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Mark Paid
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {commissions.length === 0 && !loading && (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No commissions found for selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
