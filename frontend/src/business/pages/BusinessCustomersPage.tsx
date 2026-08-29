import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { BusinessCustomer, Employee } from '../types';
import { Users, UserPlus, Search, Filter, Trash2, Check, Plus } from 'lucide-react';

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

export const BusinessCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<BusinessCustomer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [assignedEmpId, setAssignedEmpId] = useState('');
  const [notes, setNotes] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const [cRes, empRes] = await Promise.all([
        businessApi.getCustomers({ search }),
        businessApi.getEmployees({ status: 'ACTIVE' }),
      ]);
      setCustomers(cRes.customers || []);
      setEmployees(empRes.employees || []);
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const handleSelectAll = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIds.size === customers.length && customers.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(customers.map((c) => c.id)));
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
    if (!window.confirm(`Are you sure you want to delete customer "${name}"?`)) return;
    try {
      await businessApi.deleteCustomer(id);
      fetchCustomers();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} selected clients?`)) return;
    try {
      await businessApi.deleteCustomersBatch(Array.from(selectedIds));
      fetchCustomers();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Batch delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('⚠️ WARNING: Are you sure you want to permanently delete ALL client records? This action cannot be undone.')) return;
    try {
      await businessApi.deleteAllCustomers();
      fetchCustomers();
      alert('✅ All clients have been deleted successfully.');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete all clients');
    }
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await businessApi.createCustomer({
        name,
        email,
        phone,
        country,
        company,
        assignedEmployeeId: assignedEmpId || undefined,
        notes,
      });
      setShowModal(false);
      setName('');
      setEmail('');
      setPhone('');
      fetchCustomers();
      alert('✅ Customer registered');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Client CRM & Accounts</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Private customer directory, transaction volumes, and sales representative assignments
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={handleDeleteAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#fff1f2',
              color: '#e11d48',
              border: '1px solid #fecdd3',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            🗑️ Delete All Clients
          </button>

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
            <Plus size={16} /> Add Client
          </button>
        </div>
      </PageHeader>

      <ControlBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', width: 300 }}>
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search by client name, country, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem', width: '100%' }}
          />
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Showing {customers.length} clients</div>
      </ControlBar>

      <Table>
        <thead>
          <tr>
            <th style={{ width: 36, textAlign: 'center' }}>
              <CustomCheckbox
                $checked={customers.length > 0 && selectedIds.size === customers.length}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectAll();
                }}
                title="Select All Clients"
              >
                <input
                  type="checkbox"
                  checked={customers.length > 0 && selectedIds.size === customers.length}
                  readOnly
                />
                {customers.length > 0 && selectedIds.size === customers.length && <Check size={11} strokeWidth={3} />}
              </CustomCheckbox>
            </th>
            <th>Client Name</th>
            <th>Country</th>
            <th>Contact Details</th>
            <th>Assigned Staff</th>
            <th>Total Invoiced Deals</th>
            <th>Lifetime Volume</th>
            <th>Net Profit</th>
            <th>Last Sale Date</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={{ textAlign: 'center' }}>
                <CustomCheckbox
                  $checked={selectedIds.has(c.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleSelect(c.id);
                  }}
                  title={`Select client ${c.name}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(c.id)}
                    readOnly
                  />
                  {selectedIds.has(c.id) && <Check size={11} strokeWidth={3} />}
                </CustomCheckbox>
              </td>
              <td style={{ fontWeight: 600 }}>{c.name}</td>
              <td>{c.country || '-'}</td>
              <td>
                <div>{c.email}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.phone || c.company || '-'}</div>
              </td>
              <td>{(c.assignedEmployee as any)?.fullName || (c.assignedEmployee as any)?.name || 'Unassigned'}</td>
              <td style={{ fontWeight: 600 }}>{c._count?.internalSales || 0}</td>
              <td style={{ fontWeight: 700 }}>${(c.totalSales || 0).toLocaleString()}</td>
              <td style={{ color: '#16a34a', fontWeight: 600 }}>${(c.totalNetProfit || 0).toLocaleString()}</td>
              <td>{c.lastSaleDate ? new Date(c.lastSaleDate).toLocaleDateString() : '-'}</td>
              <td style={{ textAlign: 'center' }}>
                <button
                  onClick={() => handleDeleteSingle(c.id, c.name)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48' }}
                  title="Delete Client"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && !loading && (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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
              maxWidth: 500,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px 0' }}>Register Client Profile</h2>
            <form onSubmit={handleCreateCustomer}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Client Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. TG NZ or Mandy J."
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. New Zealand"
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Assigned Sales Person</label>
                  <select
                    value={assignedEmpId}
                    onChange={(e) => setAssignedEmpId(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  >
                    <option value="">Unassigned</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName || (e as any).name} ({e.employeeCode})
                      </option>
                    ))}
                  </select>
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
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
