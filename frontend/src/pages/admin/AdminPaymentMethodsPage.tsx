import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Edit, Check, X, Shield, Settings, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { financialApi } from '../../services/financialApi';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
  }
`;

const TableContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    background: #1a1918;
    color: #fffdf9;
    padding: 12px 16px;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalCard = styled.div`
  background: #fffdf9;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  padding: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #555;
  }

  input {
    padding: 10px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
  }
`;

export const AdminPaymentMethodsPage: React.FC = () => {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Add / Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);
  const [form, setForm] = useState({ name: '', code: '', description: '', sortOrder: 0 });

  const loadMethods = async () => {
    setLoading(true);
    try {
      const data = await financialApi.getPaymentMethods();
      setMethods(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMethods();
  }, []);

  const handleToggleActive = async (m: any) => {
    try {
      await financialApi.updatePaymentMethod(m.id, { isActive: !m.isActive });
      setSuccessMsg(`✓ Status for "${m.name}" updated in database.`);
      setTimeout(() => setSuccessMsg(''), 3500);
      loadMethods();
    } catch (e) {
      alert('Error toggling status in database');
    }
  };

  const handleDelete = async (m: any) => {
    if (window.confirm(`Are you sure you want to permanently delete "${m.name}" from the database?\n\nIf you have added a new payment method, deleting the old one ensures only the new one remains in the database.`)) {
      try {
        await financialApi.deletePaymentMethod(m.id);
        setSuccessMsg(`✓ "${m.name}" permanently deleted from database. Only active methods remain.`);
        setTimeout(() => setSuccessMsg(''), 4000);
        loadMethods();
      } catch (err: any) {
        alert(err.response?.data?.message || err.message || 'Error deleting payment method from database');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMethod) {
        await financialApi.updatePaymentMethod(editingMethod.id, form);
        setSuccessMsg(`✓ "${form.name}" updated in database.`);
      } else {
        await financialApi.createPaymentMethod(form);
        setSuccessMsg(`✓ New payment method "${form.name}" stored in database.`);
      }
      setTimeout(() => setSuccessMsg(''), 4000);
      setShowModal(false);
      setEditingMethod(null);
      setForm({ name: '', code: '', description: '', sortOrder: 0 });
      loadMethods();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving payment method to database');
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <h1>Payment Methods Management</h1>
          <p style={{ color: '#666', fontSize: '0.85rem' }}>
            Configure and manage available payment channels stored in your MySQL database. Add new payment methods, or delete old ones so only your desired options exist.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMethod(null);
            setForm({ name: '', code: '', description: '', sortOrder: methods.length + 1 });
            setShowModal(true);
          }}
          style={{
            padding: '10px 18px',
            background: '#C9A45C',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Plus size={16} /> + Add Payment Method
        </button>
      </PageHeader>

      {successMsg && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 18px',
            background: '#e6f4ea',
            border: '1px solid #ceead6',
            color: '#137333',
            borderRadius: 6,
            fontWeight: 600,
            marginBottom: 20,
            fontSize: '0.85rem',
          }}
        >
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Sort</th>
              <th>Method Name</th>
              <th>System Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 30, color: '#888' }}>
                  Loading payment methods from database...
                </td>
              </tr>
            ) : (
              methods.map((m) => (
                <tr key={m.id}>
                  <td>{m.sortOrder}</td>
                  <td style={{ fontWeight: 700, color: '#1f1f1f' }}>{m.name}</td>
                  <td style={{ fontFamily: 'monospace', color: '#666' }}>{m.code}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 12,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: m.isActive ? '#E6F4EA' : '#F1F3F4',
                        color: m.isActive ? '#137333' : '#5F6368',
                      }}
                    >
                      {m.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button
                        onClick={() => handleToggleActive(m)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          border: '1px solid #d9d3c7',
                          background: '#fff',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        {m.isActive ? 'Disable' : 'Enable'}
                      </button>

                      <button
                        onClick={() => {
                          setEditingMethod(m);
                          setForm({ name: m.name, code: m.code, description: m.description || '', sortOrder: m.sortOrder });
                          setShowModal(true);
                        }}
                        style={{
                          border: '1px solid #d9d3c7',
                          background: '#fff',
                          padding: '4px 8px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          color: '#555',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.75rem',
                        }}
                        title="Edit method"
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(m)}
                        style={{
                          border: '1px solid #feb2b2',
                          background: '#fff5f5',
                          padding: '4px 8px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          color: '#c53030',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.75rem',
                        }}
                        title={`Permanently delete ${m.name} from database`}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* MODAL */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {editingMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
            </h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Method Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cryptocurrency Transfer / Apple Pay"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </FormGroup>

              {!editingMethod && (
                <FormGroup>
                  <label>System Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. crypto_transfer"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', background: '#1F1F1F', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Save Method
                </button>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
};
