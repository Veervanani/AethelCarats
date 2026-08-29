import React, { useState } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Employee } from '../types';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;

    &:focus {
      border-color: #e2b96f;
      box-shadow: 0 0 0 2px rgba(226, 185, 111, 0.2);
    }
  }
`;

export const BusinessEmployeeFormModal: React.FC<{
  employee?: Employee | null;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ employee, onClose, onSuccess }) => {
  const isEdit = Boolean(employee);
  const [fullName, setFullName] = useState(employee?.fullName || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [department, setDepartment] = useState(employee?.department || 'Sales');
  const [designation, setDesignation] = useState(employee?.designation || 'Sales Executive');
  const [role, setRole] = useState(employee?.role || 'SALES_EMPLOYEE');
  const [status, setStatus] = useState(employee?.status || 'ACTIVE');
  const [monthlySalesTarget, setMonthlySalesTarget] = useState(employee?.monthlySalesTarget || 0);
  const [notes, setNotes] = useState(employee?.notes || '');
  const [createLogin, setCreateLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill out full name and email.');
      return;
    }

    setSaving(true);
    try {
      if (isEdit && employee) {
        await businessApi.updateEmployee(employee.id, {
          fullName,
          email,
          phone,
          department,
          designation,
          role,
          status,
          monthlySalesTarget: Number(monthlySalesTarget),
          notes,
        });
      } else {
        await businessApi.createEmployee({
          fullName,
          email,
          phone,
          department,
          designation,
          role,
          monthlySalesTarget: Number(monthlySalesTarget),
          notes,
          createLogin,
          password: createLogin ? password : undefined,
        });
      }
      onSuccess();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            {isEdit ? 'Edit Employee Details' : 'Register New Employee'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup $fullWidth>
              <label>Full Name *</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <label>Email Address *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <label>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0199" />
            </FormGroup>

            <FormGroup>
              <label>Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="Sales">Sales</option>
                <option value="Atelier & Production">Atelier & Production</option>
                <option value="Accounting & Finance">Accounting & Finance</option>
                <option value="Management">Management</option>
                <option value="Logistics">Logistics</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Designation</label>
              <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <label>System Role & Permissions</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="SALES_EMPLOYEE">Sales Employee (Own Sales & Attendance)</option>
                <option value="SALES_MANAGER">Sales Manager (Team Sales & Approvals)</option>
                <option value="ACCOUNTANT">Accountant (Ledgers & Commission Payouts)</option>
                <option value="ADMIN">Admin (Full Access)</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Monthly Sales Quota Target ($)</label>
              <input
                type="number"
                value={monthlySalesTarget}
                onChange={(e) => setMonthlySalesTarget(Number(e.target.value))}
              />
            </FormGroup>

            {isEdit && (
              <FormGroup>
                <label>Employment Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </FormGroup>
            )}

            {!isEdit && (
              <FormGroup $fullWidth>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <input
                    type="checkbox"
                    id="createLoginCheck"
                    checked={createLogin}
                    onChange={(e) => setCreateLogin(e.target.checked)}
                  />
                  <label htmlFor="createLoginCheck" style={{ cursor: 'pointer' }}>
                    Create System User Login for this employee
                  </label>
                </div>
              </FormGroup>
            )}

            {!isEdit && createLogin && (
              <FormGroup $fullWidth>
                <label>Temporary Password *</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={createLogin}
                  placeholder="Enter initial login password"
                />
              </FormGroup>
            )}

            <FormGroup $fullWidth>
              <label>Internal Notes & Comments</label>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </FormGroup>
          </FormGrid>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '8px 20px',
                background: '#0d1319',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {saving ? 'Saving...' : isEdit ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </ModalCard>
    </ModalOverlay>
  );
};
