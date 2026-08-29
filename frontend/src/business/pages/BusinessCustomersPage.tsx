import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { BusinessCustomer, Employee } from '../types';
import { Contact, Search, Plus, UserCheck, AlertTriangle } from 'lucide-react';

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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

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
            <th>Client Name</th>
            <th>Country</th>
            <th>Contact Details</th>
            <th>Assigned Staff</th>
            <th>Total Invoiced Deals</th>
            <th>Lifetime Volume</th>
            <th>Net Profit</th>
            <th>Last Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={{ fontWeight: 600 }}>{c.name}</td>
              <td>{c.country || '-'}</td>
              <td>
                <div>{c.email}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.phone || c.company || '-'}</div>
              </td>
              <td>{c.assignedEmployee?.fullName || 'Unassigned'}</td>
              <td style={{ fontWeight: 600 }}>{c._count?.internalSales || 0}</td>
              <td style={{ fontWeight: 700 }}>${(c.totalSales || 0).toLocaleString()}</td>
              <td style={{ color: '#16a34a', fontWeight: 600 }}>${(c.totalNetProfit || 0).toLocaleString()}</td>
              <td>{c.lastSaleDate ? new Date(c.lastSaleDate).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
          {customers.length === 0 && !loading && (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No clients found matching search.
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
                        {e.fullName} ({e.employeeCode})
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
