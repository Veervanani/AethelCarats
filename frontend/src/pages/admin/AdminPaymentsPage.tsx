import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Download, CreditCard, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { financialApi } from '../../services/financialApi';
import { PRIVATE_ADMIN_PATH } from '../../App';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const SummaryCard = styled.div<{ $borderTop?: string }>`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-top: 3px solid ${({ $borderTop }) => $borderTop || '#C9A45C'};
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  .label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #77736c;
    margin-bottom: 8px;
  }

  .value {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    font-weight: 700;
    color: #1f1f1f;
  }
`;

const FilterBar = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 240px;
  position: relative;

  input {
    width: 100%;
    padding: 10px 14px 10px 38px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8c877b;
  }
`;

const SelectInput = styled.select`
  padding: 10px 14px;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  font-size: 0.85rem;
  background: #fffdf9;
`;

const TableContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px;
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
    padding: 12px 16px;
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
  max-width: 500px;
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
    color: #55514b;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
  }
`;

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Edit / Void Modal
  const [editingPayment, setEditingPayment] = useState<any>(null);
  const [editForm, setEditForm] = useState({ amount: '', paymentMethod: '', referenceId: '', notes: '', reason: '' });

  const [voidPaymentId, setVoidPaymentId] = useState<string | null>(null);
  const [voidReason, setVoidReason] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [pData, mData] = await Promise.all([
        financialApi.getPayments({ search, method: methodFilter, status: statusFilter }),
        financialApi.getPaymentMethods(),
      ]);
      setPayments(pData);
      setPaymentMethods(mData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, methodFilter, statusFilter]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.reason) {
      alert('Mandatory reason required for modifying payment records');
      return;
    }
    try {
      await financialApi.updatePayment(editingPayment.id, {
        amount: Number(editForm.amount),
        paymentMethod: editForm.paymentMethod,
        referenceId: editForm.referenceId,
        notes: editForm.notes,
        reason: editForm.reason,
      });
      setEditingPayment(null);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error updating payment');
    }
  };

  const handleVoidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voidReason) return;
    try {
      await financialApi.voidPayment(voidPaymentId!, voidReason);
      setVoidPaymentId(null);
      setVoidReason('');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error voiding payment');
    }
  };

  // Metrics
  const totalReceived = payments.filter((p) => p.status === 'SUCCESS').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div>
      <PageHeader>
        <div>
          <h1>Payments Ledger</h1>
          <p style={{ color: '#666', fontSize: '0.85rem' }}>
            Comprehensive transaction ledger of all payments recorded across Floksy Jewel Atelier.
          </p>
        </div>
        <button
          onClick={() => financialApi.downloadExportFile('excel', 'payments')}
          style={{
            padding: '10px 16px',
            background: '#1F1F1F',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Download size={15} /> Export Payments Excel
        </button>
      </PageHeader>

      <SummaryGrid>
        <SummaryCard $borderTop="#2E7D32">
          <div className="label">Total Payments Count</div>
          <div className="value">{payments.length}</div>
        </SummaryCard>
        <SummaryCard $borderTop="#C9A45C">
          <div className="label">Total Amount Received</div>
          <div className="value">USD ${totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </SummaryCard>
      </SummaryGrid>

      <FilterBar>
        <SearchInputWrapper>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by Payment ID, Order ID, Customer, Reference ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputWrapper>

        <SelectInput value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
          <option value="ALL">All Payment Methods</option>
          {paymentMethods.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </SelectInput>

        <SelectInput value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="PENDING">PENDING</option>
          <option value="VOIDED">VOIDED</option>
        </SelectInput>
      </FilterBar>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Reference ID</th>
              <th>Status</th>
              <th>Recorded By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  Loading payments...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700 }}>{p.paymentNumber || p.id.substring(0, 8)}</td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>
                    {p.order ? (
                      <Link to={`${PRIVATE_ADMIN_PATH}/orders/${p.order.id}`} style={{ color: '#c9a45c', fontWeight: 600 }}>
                        #{p.order.orderNumber}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{p.order?.customerName || 'Client'}</td>
                  <td style={{ fontWeight: 700, color: p.status === 'VOIDED' ? '#888' : '#2e7d32' }}>
                    {p.currency} ${p.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td>{p.paymentMethod}</td>
                  <td>{p.referenceId || 'N/A'}</td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: p.status === 'SUCCESS' ? '#E6F4EA' : '#FCE8E6',
                        color: p.status === 'SUCCESS' ? '#137333' : '#C5221F',
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: '#666' }}>{p.recordedBy || 'Admin'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {p.status === 'SUCCESS' && (
                        <>
                          <button
                            title="Download Receipt"
                            onClick={() =>
                              financialApi.downloadPdfBlob(
                                financialApi.getPaymentReceiptPdfUrl(p.id),
                                `Receipt_${p.paymentNumber || p.id}.pdf`
                              )
                            }
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#c9a45c' }}
                          >
                            <Download size={16} />
                          </button>
                          <button
                            title="Edit Payment Record"
                            onClick={() => {
                              setEditingPayment(p);
                              setEditForm({
                                amount: String(p.amount),
                                paymentMethod: p.paymentMethod,
                                referenceId: p.referenceId || '',
                                notes: p.notes || '',
                                reason: '',
                              });
                            }}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            title="Void Payment"
                            onClick={() => {
                              setVoidPaymentId(p.id);
                            }}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#c5221f' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* EDIT PAYMENT MODAL */}
      {editingPayment && (
        <ModalOverlay onClick={() => setEditingPayment(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>Edit Payment Record #{editingPayment.paymentNumber}</h2>
            <form onSubmit={handleEditSubmit}>
              <FormGroup>
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Payment Method</label>
                <select
                  value={editForm.paymentMethod}
                  onChange={(e) => setEditForm({ ...editForm, paymentMethod: e.target.value })}
                >
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Reference ID</label>
                <input
                  type="text"
                  value={editForm.referenceId}
                  onChange={(e) => setEditForm({ ...editForm, referenceId: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Mandatory Modification Reason (Audit Logged)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="State reason for editing this financial record..."
                  value={editForm.reason}
                  onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setEditingPayment(null)}
                  style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', background: '#1F1F1F', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Save Modification
                </button>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* VOID PAYMENT MODAL */}
      {voidPaymentId && (
        <ModalOverlay onClick={() => setVoidPaymentId(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#c5221f' }}>Void Payment</h2>
            <form onSubmit={handleVoidSubmit}>
              <FormGroup>
                <label>Mandatory Void Reason (Audit Logged)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this payment is being voided..."
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setVoidPaymentId(null)}
                  style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', background: '#c5221f', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Confirm Void
                </button>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
};
