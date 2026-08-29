import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Supplier } from '../types';
import { Building2, Plus, Search } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
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

export const BusinessSuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [notes, setNotes] = useState('');

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await businessApi.getSuppliers({ search });
      setSuppliers(res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [search]);

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await businessApi.createSupplier({
        name,
        contactPerson,
        email,
        phone,
        country,
        notes,
      });
      setShowModal(false);
      setName('');
      fetchSuppliers();
      alert('✅ Supplier registered');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Diamond & Material Suppliers</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Procurement partners, diamond manufacturers, and precious metals suppliers
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
          <Plus size={16} /> Add Supplier
        </button>
      </PageHeader>

      <Table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Contact Person</th>
            <th>Email / Phone</th>
            <th>Country</th>
            <th>Procured Sales Orders</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td style={{ fontWeight: 700 }}>{s.name}</td>
              <td>{s.contactPerson || '-'}</td>
              <td>
                <div>{s.email || '-'}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.phone || '-'}</div>
              </td>
              <td>{s.country || '-'}</td>
              <td style={{ fontWeight: 600 }}>{s._count?.sales || 0}</td>
              <td>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', background: '#ebfbee', color: '#2b8a3e', borderRadius: 4 }}>
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && !loading && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No suppliers found.
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
              maxWidth: 480,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px 0' }}>Add Supplier / Vendor</h2>
            <form onSubmit={handleCreateSupplier}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Company / Supplier Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. UNIQUE DIAMAX PVT LTD"
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Contact Person</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
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
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  />
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
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
