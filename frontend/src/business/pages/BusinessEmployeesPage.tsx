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
  Trash2,
  Check,
} from 'lucide-react';

const CustomCheckbox = styled.label<{ $checked?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked }) => ($checked ? '#0d1319' : '#cbd5e1')};
  background: ${({ $checked }) => ($checked ? '#0d1319' : '#ffffff')};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  vertical-align: middle;

  &:hover {
    border-color: #0d1319;
    box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.12);
  }

  input {
    display: none;
  }
`;

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

  @media (max-width: 640px) {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
  }
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

  @media (max-width: 640px) {
    width: 100%;
    box-sizing: border-box;
  }

  input {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    outline: none;
    width: 100%;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`;

const Table = styled.table`
  width: 100%;
  min-width: 820px;
  border-collapse: collapse;
  font-size: 0.84rem;
  white-space: nowrap;

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
  background: #ffffff;
  border: 1px solid #e2e8f0;
  height: 32px;
  min-width: 32px;
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  color: #334155;
  transition: all 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`;

const ActionIconButton = styled.button<{ $danger?: boolean }>`
  background: ${({ $danger }) => ($danger ? '#fff1f2' : '#ffffff')};
  border: 1px solid ${({ $danger }) => ($danger ? '#fecdd3' : '#e2e8f0')};
  color: ${({ $danger }) => ($danger ? '#e11d48' : '#475569')};
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#ffe4e6' : '#f1f5f9')};
    color: ${({ $danger }) => ($danger ? '#be123c' : '#0f172a')};
    border-color: ${({ $danger }) => ($danger ? '#fda4af' : '#cbd5e1')};
  }

  svg {
    width: 15px;
    height: 15px;
    display: block;
    stroke-width: 2.2;
  }
`;

export const BusinessEmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
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
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, department, status]);

  const handleSelectAll = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIds.size === employees.length && employees.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(employees.map((emp) => emp.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleDeleteSingle = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete employee "${name}"?`)) return;
    try {
      await businessApi.deleteEmployee(id);
      fetchEmployees();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} selected employees?`)) return;
    try {
      await businessApi.deleteEmployeesBatch(Array.from(selectedIds));
      fetchEmployees();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Batch delete failed');
    }
  };

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

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {selectedIds.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                background: '#e11d48',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              🗑️ Delete Selected ({selectedIds.size})
            </button>
          )}

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
        </div>
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

      <TableContainer>
        <Table>
        <thead>
          <tr>
            <th style={{ width: 36, textAlign: 'center' }}>
              <CustomCheckbox
                $checked={employees.length > 0 && selectedIds.size === employees.length}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectAll();
                }}
                title="Select All Employees"
              >
                <input
                  type="checkbox"
                  checked={employees.length > 0 && selectedIds.size === employees.length}
                  readOnly
                />
                {employees.length > 0 && selectedIds.size === employees.length && <Check size={11} strokeWidth={3} />}
              </CustomCheckbox>
            </th>
            <th>Code</th>
            <th>Full Name</th>
            <th>Email / Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Sales Deals</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={{ textAlign: 'center' }}>
                <CustomCheckbox
                  $checked={selectedIds.has(emp.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleSelect(emp.id);
                  }}
                  title={`Select ${emp.fullName || (emp as any).name}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(emp.id)}
                    readOnly
                  />
                  {selectedIds.has(emp.id) && <Check size={11} strokeWidth={3} />}
                </CustomCheckbox>
              </td>
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
              <td>{emp._count?.sales || 0} deals</td>
              <td>
                <StatusBadge $status={emp.status}>
                  {emp.status === 'ACTIVE' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {emp.status}
                </StatusBadge>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <Link to={`${PRIVATE_BUSINESS_PATH}/employees/${emp.id}`} style={{ textDecoration: 'none' }}>
                    <ActionIconButton title="View Profile" type="button">
                      <Eye size={15} color="#2563eb" />
                    </ActionIconButton>
                  </Link>
                  <ActionIconButton
                    title="Edit Details"
                    type="button"
                    onClick={() => {
                      setEditingEmp(emp);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 size={15} color="#0f172a" />
                  </ActionIconButton>
                  <ActionBtn
                    type="button"
                    title={emp.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    onClick={() => handleToggleStatus(emp.id)}
                    style={{
                      background: emp.status === 'ACTIVE' ? '#fff7ed' : '#f0fdf4',
                      borderColor: emp.status === 'ACTIVE' ? '#ffedd5' : '#bbf7d0',
                      color: emp.status === 'ACTIVE' ? '#c2410c' : '#16a34a',
                    }}
                  >
                    {emp.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </ActionBtn>
                  <ActionIconButton
                    $danger
                    type="button"
                    title="Delete Staff"
                    onClick={() => handleDeleteSingle(emp.id, emp.fullName || (emp as any).name || emp.employeeCode)}
                  >
                    <Trash2 size={15} />
                  </ActionIconButton>
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
      </TableContainer>

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
