import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { Employee } from '../types';
import { BusinessEmployeeFormModal } from './BusinessEmployeeFormModal';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
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

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 6px;
  width: 280px;

  input {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    outline: none;
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  background: #ffffff;
  border-radius: 10px;
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

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({ $status }) => ($status === 'ACTIVE' ? '#ebfbee' : '#f1f5f9')};
  color: ${({ $status }) => ($status === 'ACTIVE' ? '#2b8a3e' : '#64748b')};
  border: 1px solid ${({ $status }) => ($status === 'ACTIVE' ? '#b2f2bb' : '#cbd5e1')};
`;

const ActionBtn = styled.button`
  background: none;
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #334155;
  transition: all 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

export const BusinessEmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await businessApi.getEmployees({
        search: search || undefined,
        department: department !== 'ALL' ? department : undefined,
        status: status !== 'ALL' ? status : undefined,
      });
      setEmployees(res.employees || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, department, status]);

  const handleToggleStatus = async (id: string) => {
    try {
      await businessApi.toggleEmployeeStatus(id);
      fetchEmployees();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Staff & Employee Directory</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Manage atelier personnel, designations, quotas, and access permissions
          </p>
        </div>

        <button
          onClick={() => {
            setEditingEmp(null);
            setIsModalOpen(true);
          }}
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
          <UserPlus size={16} /> Add Employee
        </button>
      </PageHeader>

      <ControlBar>
        <SearchInputWrapper>
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search by name, email, code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputWrapper>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="ALL">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Atelier & Production">Atelier & Production</option>
            <option value="Accounting & Finance">Accounting & Finance</option>
            <option value="Management">Management</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </ControlBar>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Full Name</th>
            <th>Email / Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Target</th>
            <th>Sales</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={{ fontWeight: 700, color: '#64748b' }}>{emp.employeeCode}</td>
              <td style={{ fontWeight: 600 }}>
                <Link
                  to={`${PRIVATE_BUSINESS_PATH}/employees/${emp.id}`}
                  style={{ color: '#0f172a', textDecoration: 'none' }}
                >
                  {emp.fullName || (emp as any).name || 'Staff Member'}
                </Link>
              </td>
              <td>
                <div>{emp.email}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{emp.phone || '-'}</div>
              </td>
              <td>{emp.department || 'Sales'}</td>
              <td>{emp.designation || 'Sales Executive'}</td>
              <td style={{ fontWeight: 600 }}>${(Number(emp.monthlySalesTarget) || Number((emp as any).monthlyTarget) || Number((emp as any).targetAmount) || 0).toLocaleString()}</td>
              <td>{emp._count?.sales || 0}</td>
              <td>
                <StatusBadge $status={emp.status}>
                  {emp.status === 'ACTIVE' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {emp.status}
                </StatusBadge>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 6 }}>
                  <Link to={`${PRIVATE_BUSINESS_PATH}/employees/${emp.id}`}>
                    <ActionBtn title="View Profile">
                      <Eye size={13} />
                    </ActionBtn>
                  </Link>
                  <ActionBtn
                    title="Edit Details"
                    onClick={() => {
                      setEditingEmp(emp);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 size={13} />
                  </ActionBtn>
                  <ActionBtn
                    title={emp.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    onClick={() => handleToggleStatus(emp.id)}
                  >
                    {emp.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </ActionBtn>
                </div>
              </td>
            </tr>
          ))}
          {employees.length === 0 && !loading && (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No employees found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {isModalOpen && (
        <BusinessEmployeeFormModal
          employee={editingEmp}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchEmployees();
          }}
        />
      )}
    </div>
  );
};
