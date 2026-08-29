import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InternalSale, Employee, Supplier } from '../types';
import { businessApi } from '../services/businessApi';
import { X, Save, Calculator, Gem, Sparkles, Truck } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
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
      border-color: #0d1319;
    }
  }
`;

interface Props {
  sale: InternalSale;
  onClose: () => void;
  onSuccess: () => void;
}

export const BusinessEditSaleModal: React.FC<Props> = ({ sale, onClose, onSuccess }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState(sale.invoiceNo || '');
  const [saleDate, setSaleDate] = useState(sale.saleDate ? new Date(sale.saleDate).toISOString().split('T')[0] : '');
  const [customerName, setCustomerName] = useState(sale.customerName || '');
  const [customerCountry, setCustomerCountry] = useState(sale.customerCountry || '');
  const [productType, setProductType] = useState(sale.productType || 'Diamond');
  const [productDescription, setProductDescription] = useState(sale.productDescription || '');
  const [shape, setShape] = useState(sale.shape || 'Round');
  const [caratWeight, setCaratWeight] = useState(sale.caratWeight || '');
  const [diamondColor, setDiamondColor] = useState(sale.diamondColor || 'F');
  const [clarity, setClarity] = useState(sale.clarity || 'VS1');
  const [cut, setCut] = useState(sale.cut || '3EX');
  const [certificateNo, setCertificateNo] = useState(sale.certificateNo || '');
  const [supplierName, setSupplierName] = useState(sale.supplierName || '');

  const [purchasePrice, setPurchasePrice] = useState(sale.purchasePrice || 0);
  const [sellingPrice, setSellingPrice] = useState(sale.sellingPrice || 0);
  const [discount, setDiscount] = useState(sale.discount || 0);
  const [gstPercent, setGstPercent] = useState(sale.gstPercent ?? 0.015);
  const [shippingCost, setShippingCost] = useState(sale.shippingCost || 0);
  const [dollarRate, setDollarRate] = useState(sale.dollarRate || 94.55);

  const [employeeId, setEmployeeId] = useState(sale.employeeId || '');
  const [commissionPercent, setCommissionPercent] = useState(sale.commissionPercent ?? 0.05);

  const [paymentStatus, setPaymentStatus] = useState(sale.paymentStatus || 'Paid');
  const [paymentMethod, setPaymentMethod] = useState(sale.paymentMethod || 'Bank Wire');
  const [amountReceived, setAmountReceived] = useState(sale.amountReceived || '');
  const [orderStatus, setOrderStatus] = useState(sale.orderStatus || 'Delivered');
  const [trackingNumber, setTrackingNumber] = useState(sale.trackingNumber || '');

  useEffect(() => {
    businessApi.getEmployees({ status: 'ACTIVE' }).then((res: any) => {
      setEmployees(Array.isArray(res) ? res : (res?.employees || []));
    });
    businessApi.getSuppliers().then((res: any) => {
      setSuppliers(Array.isArray(res) ? res : (res?.suppliers || []));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedEmp = employees.find((emp) => emp.id === employeeId);
      await businessApi.updateSale(sale.id, {
        invoiceNo,
        saleDate,
        customerName,
        customerCountry,
        productType,
        productDescription,
        shape,
        caratWeight: caratWeight ? Number(caratWeight) : undefined,
        diamondColor,
        clarity,
        cut,
        certificateNo,
        supplierName,
        purchasePrice: Number(purchasePrice) || 0,
        sellingPrice: Number(sellingPrice) || 0,
        discount: Number(discount) || 0,
        gstPercent: Number(gstPercent) || 0,
        shippingCost: Number(shippingCost) || 0,
        dollarRate: Number(dollarRate) || 94.55,
        employeeId: employeeId || undefined,
        salesPersonName: selectedEmp?.fullName || sale.salesPersonName || undefined,
        commissionPercent: Number(commissionPercent) || 0,
        paymentStatus,
        paymentMethod,
        amountReceived: Number(amountReceived) || Number(sellingPrice) || 0,
        orderStatus,
        trackingNumber,
      });

      alert(`✅ Invoice ${invoiceNo} updated successfully!`);
      onSuccess();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to update sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Edit Sale Invoice — {sale.invoiceNo}
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Modify commercial details, client information, pricing ledger, and exchange rates
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </ModalHeader>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <ModalBody>
            <FormGrid>
              <FormGroup>
                <label>Invoice Number *</label>
                <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <label>Sale Date *</label>
                <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <label>Customer Name *</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
              </FormGroup>

              <FormGroup>
                <label>Customer Country</label>
                <input type="text" value={customerCountry} onChange={(e) => setCustomerCountry(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <label>Product Type</label>
                <select value={productType} onChange={(e) => setProductType(e.target.value as any)}>
                  <option value="Diamond">Diamond</option>
                  <option value="Jewelry">Jewelry</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Shape / Model</label>
                <input type="text" value={shape} onChange={(e) => setShape(e.target.value)} />
              </FormGroup>

              <FormGroup $full>
                <label>Product Description / Diamond Specs</label>
                <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <label>Carat Weight (ct)</label>
                <input type="number" step="0.01" value={caratWeight} onChange={(e) => setCaratWeight(e.target.value as any)} />
              </FormGroup>

              <FormGroup>
                <label>Color / Clarity</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input type="text" placeholder="Color" value={diamondColor} onChange={(e) => setDiamondColor(e.target.value)} />
                  <input type="text" placeholder="Clarity" value={clarity} onChange={(e) => setClarity(e.target.value)} />
                </div>
              </FormGroup>

              <FormGroup>
                <label>Certificate No</label>
                <input type="text" value={certificateNo} onChange={(e) => setCertificateNo(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <label>Supplier / Vendor</label>
                <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} list="edit-supp-list" />
                <datalist id="edit-supp-list">
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name} />
                  ))}
                </datalist>
              </FormGroup>

              <FormGroup>
                <label>Purchase Price ($)</label>
                <input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} required />
              </FormGroup>

              <FormGroup>
                <label>Selling Price ($)</label>
                <input type="number" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} required />
              </FormGroup>

              <FormGroup>
                <label>Discount ($)</label>
                <input type="number" step="0.01" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
              </FormGroup>

              <FormGroup>
                <label>GST % (e.g. 0.015 for 1.5%)</label>
                <input type="number" step="0.001" value={gstPercent} onChange={(e) => setGstPercent(Number(e.target.value))} />
              </FormGroup>

              <FormGroup>
                <label>Dollar Rate ($ / ₹)</label>
                <input type="number" step="0.01" value={dollarRate} onChange={(e) => setDollarRate(Number(e.target.value))} required />
              </FormGroup>

              <FormGroup>
                <label>Sales Person</label>
                <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
                  <option value="">Unassigned</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName || (emp as any).name} ({emp.employeeCode})
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label>Commission Rate (e.g. 0.05 for 5%)</label>
                <input type="number" step="0.005" value={commissionPercent} onChange={(e) => setCommissionPercent(Number(e.target.value))} />
              </FormGroup>

              <FormGroup>
                <label>Payment Status</label>
                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as any)}>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Order Status</label>
                <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value as any)}>
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Tracking Number</label>
                <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
              </FormGroup>
            </FormGrid>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 20px',
                background: '#0d1319',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Save size={14} /> {loading ? 'Saving Changes...' : 'Save Invoice'}
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </Overlay>
  );
};
