import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { Employee } from '../types';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  TrendingUp,
  CalendarCheck,
  Award,
  DollarSign,
  ArrowLeft,
} from 'lucide-react';

const ProfileHeader = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;

  .stat-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .stat-val {
    font-size: 1.3rem;
    font-weight: 700;
    color: #0f172a;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#0d1319' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0d1319' : '#64748b')};
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: -2px;
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
    padding: 10px 14px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }
`;

export const BusinessEmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'attendance' | 'commissions'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    businessApi
      .getEmployeeById(id)
      .then((res) => {
        setEmployee(res.employee);
        setStats(res.stats);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Employee Profile...</div>;
  }

  if (!employee) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Employee not found.</div>;
  }

  return (
    <div>
      <Link
        to={`${PRIVATE_BUSINESS_PATH}/employees`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', marginBottom: 16 }}
      >
        <ArrowLeft size={14} /> Back to Employees Directory
      </Link>

      <ProfileHeader>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{employee.fullName}</h1>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: '#f1f5f9', borderRadius: 4, fontWeight: 700 }}>
              {employee.employeeCode}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' }}>
            <span>🏢 {employee.department}</span>
            <span>💼 {employee.designation}</span>
            <span>📧 {employee.email}</span>
            <span>📞 {employee.phone || 'No phone'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>MONTHLY TARGET</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              ${(employee.monthlySalesTarget || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </ProfileHeader>

      <StatGrid>
        <StatCard>
          <div className="stat-label">Total Invoiced Orders</div>
          <div className="stat-val">{stats?.totalOrders || 0}</div>
        </StatCard>
        <StatCard>
          <div className="stat-label">Total Sales Volume</div>
          <div className="stat-val" style={{ color: '#0d1319' }}>
            ${(stats?.totalSalesAmount || 0).toLocaleString()}
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-label">Net Profit Generated</div>
          <div className="stat-val" style={{ color: '#16a34a' }}>
            ${(stats?.netProfit || 0).toLocaleString()}
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-label">Earned Commission</div>
          <div className="stat-val" style={{ color: '#d97706' }}>
            ${(stats?.totalCommission || 0).toLocaleString()}
          </div>
        </StatCard>
      </StatGrid>

      <TabContainer>
        <TabButton $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          Overview & KPIs
        </TabButton>
        <TabButton $active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>
          Sales History ({employee.sales?.length || 0})
        </TabButton>
        <TabButton $active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>
          Recent Attendance ({employee.attendances?.length || 0})
        </TabButton>
        <TabButton $active={activeTab === 'commissions'} onClick={() => setActiveTab('commissions')}>
          Commissions Ledger ({employee.commissions?.length || 0})
        </TabButton>
      </TabContainer>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 14px 0' }}>Product Sales Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span>Loose Diamonds</span>
                <strong>{stats?.diamondSalesCount || 0} Deals</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span>Finished Jewelry</span>
                <strong>{stats?.jewelrySalesCount || 0} Deals</strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 14px 0' }}>Commission Status Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span>Pending Approvals:</span>
                <strong style={{ color: '#d97706' }}>${stats?.commissionSummary?.pending?.toLocaleString() || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span>Approved (Awaiting Payout):</span>
                <strong style={{ color: '#2563eb' }}>${stats?.commissionSummary?.approved?.toLocaleString() || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span>Paid Out:</span>
                <strong style={{ color: '#16a34a' }}>${stats?.commissionSummary?.paid?.toLocaleString() || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <Table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Sale Amount</th>
              <th>Net Profit</th>
              <th>Commission</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employee.sales?.map((s: any) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 700 }}>
                  <Link to={`${PRIVATE_BUSINESS_PATH}/sales/${s.id}`} style={{ color: '#0f172a' }}>
                    {s.invoiceNo}
                  </Link>
                </td>
                <td>{new Date(s.saleDate).toLocaleDateString()}</td>
                <td>{s.customerName}</td>
                <td>{s.productType}</td>
                <td style={{ fontWeight: 600 }}>${s.finalSaleAmount?.toLocaleString()}</td>
                <td style={{ color: '#16a34a' }}>${s.netProfit?.toLocaleString()}</td>
                <td style={{ color: '#d97706' }}>${s.commissionAmount?.toLocaleString()}</td>
                <td>{s.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {activeTab === 'attendance' && (
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            {employee.attendances?.map((a: any) => (
              <tr key={a.id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td style={{ fontWeight: 600 }}>{a.status}</td>
                <td>{a.checkInTime ? new Date(a.checkInTime).toLocaleTimeString() : '-'}</td>
                <td>{a.checkOutTime ? new Date(a.checkOutTime).toLocaleTimeString() : '-'}</td>
                <td>{a.workingHours || 0} hrs</td>
                <td>{a.lateStatus ? '⚠️ Late' : 'On Time'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {activeTab === 'commissions' && (
        <Table>
          <thead>
            <tr>
              <th>Sale Invoice</th>
              <th>Rate %</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Approved At</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {employee.commissions?.map((c: any) => (
              <tr key={c.id}>
                <td>{c.saleId}</td>
                <td>{((c.commissionRate || 0) * 100).toFixed(1)}%</td>
                <td style={{ fontWeight: 700, color: '#d97706' }}>${c.commissionAmount?.toLocaleString()}</td>
                <td>{c.status}</td>
                <td>{c.approvedAt ? new Date(c.approvedAt).toLocaleDateString() : '-'}</td>
                <td>{c.paidAt ? new Date(c.paidAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
