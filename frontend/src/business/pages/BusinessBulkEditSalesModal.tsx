import React, { useState } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { X, CheckCircle2, AlertCircle, Edit3, ShieldAlert } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: scaleUp 0.15s ease-out;

  @keyframes scaleUp {
    from {
      transform: scale(0.96);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  padding: 16px 20px;
  background: #0d1319;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 75vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  select,
  input {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    color: #0f172a;
    background: #ffffff;

    &:focus {
      border-color: #0d1319;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.1);
    }
  }

  .hint {
    font-size: 0.72rem;
    color: #64748b;
  }
`;

const Footer = styled.div`
  padding: 14px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: #0d1319;
    color: #ffffff;
    border: 1px solid #0d1319;
    &:hover {
      background: #1e293b;
    }
  `
      : `
    background: #ffffff;
    color: #475569;
    border: 1px solid #cbd5e1;
    &:hover {
      background: #f1f5f9;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Props {
  selectedIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export const BusinessBulkEditSalesModal: React.FC<Props> = ({ selectedIds, onClose, onSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState<string>('NO_CHANGE');
  const [orderStatus, setOrderStatus] = useState<string>('NO_CHANGE');
  const [salesPersonName, setSalesPersonName] = useState<string>('NO_CHANGE');
  const [dollarRate, setDollarRate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('NO_CHANGE');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const updates: Record<string, any> = {};
    if (paymentStatus !== 'NO_CHANGE') updates.paymentStatus = paymentStatus;
    if (orderStatus !== 'NO_CHANGE') updates.orderStatus = orderStatus;
    if (salesPersonName !== 'NO_CHANGE') updates.salesPersonName = salesPersonName;
    if (paymentMethod !== 'NO_CHANGE') updates.paymentMethod = paymentMethod;
    if (dollarRate.trim() !== '') {
      const parsedRate = Number(dollarRate);
      if (!isNaN(parsedRate) && parsedRate > 0) {
        updates.dollarRate = parsedRate;
      }
    }

    if (Object.keys(updates).length === 0) {
      setError('Please choose at least one field to update.');
      return;
    }

    setSaving(true);
    try {
      await businessApi.bulkUpdateSales(selectedIds, updates);
      alert(`✅ Successfully bulk updated ${selectedIds.length} sales records in the database.`);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Bulk update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>
            <Edit3 size={17} /> Bulk Edit Sales ({selectedIds.length} records)
          </h2>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Header>

        <form onSubmit={handleSubmit}>
          <Body>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: 8, fontSize: '0.78rem', color: '#166534' }}>
              💡 Changes will be applied to all <strong>{selectedIds.length}</strong> selected invoices simultaneously. Leave any field as "Do Not Change" to keep each invoice's current value.
            </div>

            {error && (
              <div style={{ background: '#fff5f5', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: 8, fontSize: '0.78rem', color: '#b91c1c' }}>
                ⚠️ {error}
              </div>
            )}

            <FormGroup>
              <label>Payment Status</label>
              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="NO_CHANGE">-- Do Not Change --</option>
                <option value="Paid">Paid (Full)</option>
                <option value="Partial">Partial Payment</option>
                <option value="Pending">Pending / Unpaid</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Order / Delivery Status</label>
              <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                <option value="NO_CHANGE">-- Do Not Change --</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Assigned Sales Representative</label>
              <select value={salesPersonName} onChange={(e) => setSalesPersonName(e.target.value)}>
                <option value="NO_CHANGE">-- Do Not Change --</option>
                <option value="Rutu">Rutu (Sales Manager)</option>
                <option value="Jyoti">Jyoti (Sales Executive)</option>
                <option value="Twinkle">Twinkle (Sales Executive)</option>
                <option value="Veer">Veer (Director)</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="NO_CHANGE">-- Do Not Change --</option>
                <option value="Bank Wire">Bank Wire / Transfer</option>
                <option value="Credit Card">Credit Card / Stripe</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Dollar Rate ($ / ₹)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Leave blank to keep existing rates"
                value={dollarRate}
                onChange={(e) => setDollarRate(e.target.value)}
              />
              <span className="hint">Example: 94.55</span>
            </FormGroup>
          </Body>

          <Footer>
            <Button type="button" $variant="secondary" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" $variant="primary" disabled={saving}>
              {saving ? 'Updating...' : `Apply Bulk Changes (${selectedIds.length})`}
            </Button>
          </Footer>
        </form>
      </Modal>
    </Overlay>
  );
};
