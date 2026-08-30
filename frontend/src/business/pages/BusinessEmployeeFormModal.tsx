import React, { useState } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Employee } from '../types';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 640px;
  max-height: 92vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 480px) {
    padding: 16px;
  }
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
    display: flex;
    align-items: center;
    gap: 4px;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    transition: all 0.15s ease;

    &:focus {
      border-color: #e2b96f;
      box-shadow: 0 0 0 2px rgba(226, 185, 111, 0.2);
    }
  }

  .helper-text {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 2px;
  }
`;

const PasswordBox = styled.div`
  grid-column: 1 / -1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 4px;

  .box-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 10px;
  }

  .password-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 540px) {
      grid-template-columns: 1fr;
    }
  }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
`;

export const BusinessEmployeeFormModal: React.FC<{
  employee?: Employee | null;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ employee, onClose, onSuccess }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isEdit = Boolean(employee);

  const [fullName, setFullName] = useState(employee?.fullName || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [department, setDepartment] = useState(employee?.department || 'Sales');
  const [designation, setDesignation] = useState(employee?.designation || 'Sales Executive');
  const [role, setRole] = useState(employee?.role || 'SALES_EMPLOYEE');
  const [status, setStatus] = useState(employee?.status || 'ACTIVE');
  const [notes, setNotes] = useState(employee?.notes || '');
  
  // Password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createLogin, setCreateLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const isSalesHrManager = role === 'SALES_HR_MANAGER';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full Name and Email Address are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Role assignment check
    if (['SUPER_ADMIN', 'ADMIN', 'SALES_HR_MANAGER'].includes(role) && !isAdmin) {
      setErrorMsg('Only Administrators can assign Administrator or Manager roles.');
      return;
    }

    // Password validation for new SALES_HR_MANAGER
    if (isSalesHrManager && !isEdit) {
      if (!password) {
        setErrorMsg('Password is required for SALES_HR_MANAGER.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Password and Confirm Password do not match.');
        return;
      }
    }

    // Password validation for edit mode or optional create login
    if (password) {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Password and Confirm Password do not match.');
        return;
      }
    }

    setSaving(true);
    try {
      if (isEdit && employee) {
        await businessApi.updateEmployee(employee.id, {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          department,
          designation: designation.trim(),
          role,
          status,
          notes: notes.trim(),
          password: password ? password : undefined,
          confirmPassword: password ? confirmPassword : undefined,
        });
      } else {
        await businessApi.createEmployee({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          department,
          designation: designation.trim(),
          role,
          notes: notes.trim(),
          createLogin: isSalesHrManager || createLogin,
          password: (isSalesHrManager || createLogin || password) ? password : undefined,
          confirmPassword: (isSalesHrManager || createLogin || password) ? confirmPassword : undefined,
        });
      }
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || 'Operation failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'nowrap', gap: 10, width: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isEdit ? 'Edit Employee Details' : 'Register New Employee'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: 6,
              width: 32,
              height: 32,
              minWidth: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#64748b',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <ErrorBanner>
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </ErrorBanner>
        )}

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup $fullWidth>
              <label>Full Name *</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="e.g. Ramesh Patel" />
            </FormGroup>

            <FormGroup>
              <label>Email Address (Login Username) *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="employee@floksyjewel.com" />
              <span className="helper-text">Used as the login username/email for system access</span>
            </FormGroup>

            <FormGroup>
              <label>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            </FormGroup>

            <FormGroup>
              <label>Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Atelier & Production">Atelier & Production</option>
                <option value="Accounting & Finance">Accounting & Finance</option>
                <option value="Management">Management</option>
                <option value="Logistics">Logistics</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Designation</label>
              <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Sales & HR Manager" />
            </FormGroup>

            <FormGroup $fullWidth>
              <label>System Role & Permissions *</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {isAdmin && (
                  <>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Full System & Super Admin)</option>
                    <option value="ADMIN">ADMIN (Full Operations & Settings)</option>
                    <option value="SALES_HR_MANAGER">SALES_HR_MANAGER (Sales, HR, Attendance & CRM Operations)</option>
                  </>
                )}
                <option value="SALES_MANAGER">SALES_MANAGER (Team Sales & Approvals)</option>
                <option value="SALES_EMPLOYEE">SALES_EMPLOYEE (Sales & Attendance)</option>
                <option value="ACCOUNTANT">ACCOUNTANT (Finance & Ledgers)</option>
              </select>
              <span className="helper-text">
                {isSalesHrManager
                  ? 'SALES_HR_MANAGER has full access to Employees, Attendance, Sales, Invoices, Commissions, Customers & Suppliers.'
                  : 'Assign appropriate operational access level for this employee.'}
              </span>
            </FormGroup>

            {isEdit && (
              <FormGroup>
                <label>Employment Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                  <option value="ACTIVE">ACTIVE (Allowed to login & record operations)</option>
                  <option value="INACTIVE">INACTIVE (Access blocked)</option>
                </select>
              </FormGroup>
            )}

            {/* DYNAMIC PASSWORD SECTION FOR SALES_HR_MANAGER */}
            {isSalesHrManager && !isEdit && (
              <PasswordBox>
                <div className="box-header">
                  <KeyRound size={15} color="#d97706" />
                  <span>SALES_HR_MANAGER Login Credentials *</span>
                </div>
                <div className="password-grid">
                  <FormGroup>
                    <label>Password *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Minimum 6 characters"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Confirm Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-enter password"
                    />
                  </FormGroup>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 6 }}>
                  Password is encrypted using secure bcrypt hash before storage. Plaintext passwords are never saved or exposed.
                </div>
              </PasswordBox>
            )}

            {/* OPTIONAL PASSWORD CHANGE SECTION FOR EDITING EXISTING EMPLOYEE */}
            {isEdit && (
              <PasswordBox>
                <div className="box-header">
                  <KeyRound size={15} color="#475569" />
                  <span>Change Password (Optional)</span>
                </div>
                <div className="password-grid">
                  <FormGroup>
                    <label>New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave empty to keep existing"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </FormGroup>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 6 }}>
                  Leave password fields blank if you do not wish to change the existing login credentials.
                </div>
              </PasswordBox>
            )}

            {/* OPTIONAL LOGIN FOR OTHER ROLES WHEN CREATING */}
            {!isSalesHrManager && !isEdit && (
              <>
                <FormGroup $fullWidth>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <input
                      type="checkbox"
                      id="createLoginCheck"
                      checked={createLogin}
                      onChange={(e) => setCreateLogin(e.target.checked)}
                    />
                    <label htmlFor="createLoginCheck" style={{ cursor: 'pointer', fontWeight: 600 }}>
                      Create System User Login for this employee
                    </label>
                  </div>
                </FormGroup>

                {createLogin && (
                  <PasswordBox>
                    <div className="password-grid">
                      <FormGroup>
                        <label>Password *</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={createLogin}
                          placeholder="Minimum 6 characters"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Confirm Password *</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required={createLogin}
                          placeholder="Re-enter password"
                        />
                      </FormGroup>
                    </div>
                  </PasswordBox>
                )}
              </>
            )}

            <FormGroup $fullWidth>
              <label>Internal Notes & Comments</label>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional administrative notes" />
            </FormGroup>
          </FormGrid>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                color: '#334155',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '9px 22px',
                background: '#0d1319',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Saving...' : isEdit ? 'Update Employee' : 'Register Employee'}
            </button>
          </div>
        </form>
      </ModalCard>
    </ModalOverlay>
  );
};

