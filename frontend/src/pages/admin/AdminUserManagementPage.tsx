import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Shield, AlertCircle, Check, X, Lock } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
  AdminModalOverlay,
  AdminModalCard,
  AdminFormGroup,
} from '../../components/admin/AdminUI';

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1f1f1f;
  color: #c9a45c;
  border: 1px solid #c9a45c;
  padding: 14px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
`;

export const AdminUserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<string>('CUSTOMER');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isCallerSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminUsers({ search, role: roleFilter });
      setUsers(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const handleOpenEdit = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowConfirm(false);
  };

  const handleSaveRole = async () => {
    if (!selectedUser) return;
    setIsUpdating(true);
    try {
      const res = await api.updateUserRole(selectedUser.id, newRole);
      if (res.success && res.user) {
        setUsers((prev) =>
          prev.map((u) => (u.id === res.user.id ? { ...u, role: res.user.role } : u))
        );
        setToastMessage(`Role for ${selectedUser.email} updated to ${newRole}`);
        setTimeout(() => setToastMessage(''), 4000);
        setSelectedUser(null);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to update role.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Users & Roles"
        description="Manage admin users, staff roles, client accounts, and security access permissions."
      />

      <AdminCard style={{ marginBottom: 20, padding: 18 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8c877d' }} />
            <AdminInput
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 40 }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#55524d' }}>
              Filter Role:
            </span>
            <AdminSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ width: 180 }}>
              <option value="ALL">ALL ROLES</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PRODUCT_MANAGER">PRODUCT MANAGER</option>
              <option value="CONTENT_MANAGER">CONTENT MANAGER</option>
              <option value="ORDER_MANAGER">ORDER MANAGER</option>
              {isCallerSuperAdmin && <option value="SUPER_ADMIN">SUPER ADMIN</option>}
            </AdminSelect>
          </div>
        </div>
      </AdminCard>

      {error && (
        <div style={{ color: '#c53030', padding: '14px 18px', background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: 6, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th>User Name & Email</th>
              <th>Current Role</th>
              <th>Account Type</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading registered users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No users found matching filter.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isPrimary = u.email.toLowerCase() === 'veervanani1201@gmail.com';
                const roleBadgeVariant = u.role === 'SUPER_ADMIN' || u.role === 'ADMIN' ? 'gold' : 'draft';
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{u.name || 'Unnamed User'}</div>
                      <div style={{ fontSize: '0.78rem', color: '#77736c' }}>{u.email}</div>
                    </td>
                    <td>
                      <AdminBadge $variant={roleBadgeVariant}>
                        <Shield size={12} /> {u.role}
                      </AdminBadge>
                    </td>
                    <td>
                      {isPrimary ? (
                        <AdminBadge $variant="gold">
                          <Lock size={10} /> PRIMARY ADMIN
                        </AdminBadge>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#77736c' }}>Standard User</span>
                      )}
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <AdminButton
                        $size="sm"
                        $variant="secondary"
                        disabled={isPrimary && !isCallerSuperAdmin}
                        onClick={() => handleOpenEdit(u)}
                      >
                        {isPrimary && !isCallerSuperAdmin ? 'PROTECTED' : 'Edit Role'}
                      </AdminButton>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>

      {/* EDIT ROLE MODAL */}
      {selectedUser && (
        <AdminModalOverlay onClick={() => setSelectedUser(null)}>
          <AdminModalCard onClick={(e) => e.stopPropagation()} $maxWidth="500px">
            <div className="modal-header">
              <h3>Change User Role</h3>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1f1f1f' }}>{selectedUser.name || 'Valued Client'}</div>
              <div style={{ fontSize: '0.82rem', color: '#77736c' }}>{selectedUser.email}</div>
            </div>

            {!showConfirm ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <AdminFormGroup>
                  <label>Select New Role:</label>
                  <AdminSelect value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="PRODUCT_MANAGER">PRODUCT MANAGER</option>
                    <option value="CONTENT_MANAGER">CONTENT MANAGER</option>
                    <option value="ORDER_MANAGER">ORDER MANAGER</option>
                    {isCallerSuperAdmin && <option value="SUPER_ADMIN">SUPER ADMIN</option>}
                  </AdminSelect>
                </AdminFormGroup>

                <div className="modal-footer">
                  <AdminButton $variant="secondary" onClick={() => setSelectedUser(null)}>
                    Cancel
                  </AdminButton>
                  <AdminButton
                    $variant="gold"
                    disabled={newRole === selectedUser.role}
                    onClick={() => setShowConfirm(true)}
                  >
                    Continue
                  </AdminButton>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: '#fef7e0', border: '1px solid #feefc3', color: '#b06000', padding: 16, borderRadius: 6, fontSize: '0.88rem' }}>
                  <AlertCircle size={18} style={{ float: 'left', marginRight: 8, marginTop: 2 }} />
                  Confirm role change for <strong>{selectedUser.email}</strong> from{' '}
                  <strong>{selectedUser.role}</strong> to <strong>{newRole}</strong>?
                </div>

                <div className="modal-footer">
                  <AdminButton $variant="secondary" onClick={() => setShowConfirm(false)}>
                    Back
                  </AdminButton>
                  <AdminButton $variant="primary" onClick={handleSaveRole} $loading={isUpdating}>
                    Confirm Role Change
                  </AdminButton>
                </div>
              </div>
            )}
          </AdminModalCard>
        </AdminModalOverlay>
      )}

      {toastMessage && (
        <Toast>
          <Check size={18} /> {toastMessage}
        </Toast>
      )}
    </div>
  );
};
