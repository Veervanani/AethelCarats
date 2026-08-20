import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeft,
  FileText,
  CreditCard,
  RotateCcw,
  Download,
  CheckCircle,
  Clock,
  Package,
  Truck,
  ShieldCheck,
  AlertTriangle,
  User,
  MapPin,
  Tag,
} from 'lucide-react';
import { financialApi } from '../../services/financialApi';
import { PRIVATE_ADMIN_PATH } from '../../App';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #77736c;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    color: #c9a45c;
  }
`;

const TitleArea = styled.div`
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Badge = styled.span<{ $bg: string; $color: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'gold' | 'secondary' }>`
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary' ? '#1F1F1F' : $variant === 'gold' ? '#C9A45C' : '#D9D3C7'};
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#1F1F1F' : $variant === 'gold' ? '#C9A45C' : '#FFFDF9'};
  color: ${({ $variant }) => ($variant === 'primary' || $variant === 'gold' ? '#FFFDF9' : '#1F1F1F')};

  &:hover {
    opacity: 0.9;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.2rem;
    color: #1f1f1f;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e3d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    text-align: left;
    padding: 10px;
    background: #f7f5f0;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #77736c;
  }

  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const SummaryRow = styled.div<{ $bold?: boolean; $gold?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.85rem;
  font-weight: ${({ $bold }) => ($bold ? '700' : '400')};
  color: ${({ $gold }) => ($gold ? '#C9A45C' : '#1F1F1F')};
  border-top: ${({ $bold }) => ($bold ? '1px solid #E8E3D9' : 'none')};
`;

const TimelineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    height: 2px;
    background: #e8e3d9;
    z-index: 1;
  }
`;

const TimelineStep = styled.div<{ $completed: boolean }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  .dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ $completed }) => ($completed ? '#C9A45C' : '#FFFDF9')};
    border: 2px solid ${({ $completed }) => ($completed ? '#C9A45C' : '#D9D3C7')};
    color: ${({ $completed }) => ($completed ? '#FFFDF9' : '#8C877B')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ $completed }) => ($completed ? '#1F1F1F' : '#8C877B')};
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

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  // Modals
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'Bank Transfer',
    referenceId: '',
    notes: '',
  });

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundForm, setRefundForm] = useState({
    amount: '',
    refundMethod: 'Original Payment Method',
    reason: '',
    notes: '',
  });

  const [showVoidModal, setShowVoidModal] = useState(false);
  const [voidPaymentId, setVoidPaymentId] = useState<string | null>(null);
  const [voidReason, setVoidReason] = useState('');

  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({
    courierCompany: 'FedEx Express',
    trackingNumber: '',
    status: 'DISPATCHED',
  });

  const loadOrder = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await financialApi.getOrderById(id);
      setOrder(data);
      if (data.shipments && data.shipments.length > 0) {
        const lastShip = data.shipments[data.shipments.length - 1];
        setDispatchForm({
          courierCompany: lastShip.carrier || 'FedEx Express',
          trackingNumber: lastShip.trackingNumber || '',
          status: data.orderStatus || 'DISPATCHED',
        });
      }
      const methods = await financialApi.getPaymentMethods();
      setPaymentMethods(methods);
      setPaymentForm((prev) => ({
        ...prev,
        amount: data.balanceDue ? String(data.balanceDue) : '',
        paymentMethod: methods[0]?.name || 'Bank Transfer',
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === 'DISPATCHED' || newStatus === 'SHIPPED') {
      setDispatchForm((prev) => ({ ...prev, status: newStatus }));
      setShowDispatchModal(true);
      return;
    }
    try {
      await financialApi.updateOrder(order.id, { orderStatus: newStatus });
      loadOrder();
    } catch (e) {
      alert('Error updating order status');
    }
  };

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financialApi.updateOrder(order.id, {
        orderStatus: dispatchForm.status,
        courierCompany: dispatchForm.courierCompany,
        trackingNumber: dispatchForm.trackingNumber,
      });
      setShowDispatchModal(false);
      loadOrder();
    } catch (err: any) {
      alert('Failed to save tracking details');
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financialApi.createPayment({
        orderId: order.id,
        amount: Number(paymentForm.amount),
        paymentMethod: paymentForm.paymentMethod,
        referenceId: paymentForm.referenceId,
        notes: paymentForm.notes,
      });
      setShowAddPaymentModal(false);
      loadOrder();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating payment');
    }
  };

  const handleCreateRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financialApi.createRefund({
        orderId: order.id,
        amount: Number(refundForm.amount),
        refundMethod: refundForm.refundMethod,
        reason: refundForm.reason,
        notes: refundForm.notes,
      });
      setShowRefundModal(false);
      loadOrder();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating refund');
    }
  };

  const handleVoidPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voidPaymentId || !voidReason) return;
    try {
      await financialApi.voidPayment(voidPaymentId, voidReason);
      setShowVoidModal(false);
      setVoidPaymentId(null);
      setVoidReason('');
      loadOrder();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error voiding payment');
    }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Order Detail...</div>;
  }

  if (!order) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Order not found.</div>;
  }

  const timelineSteps = [
    { label: 'Order Created', completed: true },
    { label: 'Confirmed', completed: order.orderStatus !== 'PENDING' },
    { label: 'Payment Received', completed: order.paidAmount > 0 },
    { label: 'In Production', completed: ['IN_PRODUCTION', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED'].includes(order.orderStatus) },
    { label: 'Shipped', completed: ['SHIPPED', 'DELIVERED'].includes(order.orderStatus) },
    { label: 'Delivered', completed: order.orderStatus === 'DELIVERED' },
  ];

  return (
    <div>
      <BackLink onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/orders`)}>
        <ArrowLeft size={16} /> Back to All Orders
      </BackLink>

      <PageHeader>
        <TitleArea>
          <h1>
            Order #{order.orderNumber}
            <Badge
              $bg={order.calculatedStatus === 'PAID' ? '#E6F4EA' : '#FEF7E0'}
              $color={order.calculatedStatus === 'PAID' ? '#137333' : '#B06000'}
            >
              {order.calculatedStatus}
            </Badge>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#777', marginTop: 4 }}>
            Placed on {new Date(order.orderDate).toLocaleString()}
          </p>
        </TitleArea>

        <HeaderActions>
          <ActionBtn $variant="gold" onClick={() => setShowAddPaymentModal(true)}>
            <CreditCard size={14} /> + Add Payment
          </ActionBtn>
          <ActionBtn $variant="secondary" onClick={() => setShowRefundModal(true)}>
            <RotateCcw size={14} /> Refund
          </ActionBtn>

          <ActionBtn
            $variant="primary"
            onClick={() =>
              financialApi.downloadPdfBlob(
                financialApi.getOrderStatementPdfUrl(order.id),
                `Order_Statement_${order.orderNumber}.pdf`
              )
            }
          >
            <Download size={14} /> Statement PDF
          </ActionBtn>

          <ActionBtn
            $variant="secondary"
            onClick={() =>
              financialApi.downloadPdfBlob(
                financialApi.getInvoicePdfUrl(order.id),
                `Invoice_${order.orderNumber}.pdf`
              )
            }
          >
            <FileText size={14} /> Tax Invoice PDF
          </ActionBtn>
        </HeaderActions>
      </PageHeader>

      {/* Visual Timeline Progress */}
      <Card>
        <h2>Order Status & Execution Timeline</h2>
        <TimelineContainer>
          {timelineSteps.map((step, idx) => (
            <TimelineStep key={idx} $completed={step.completed}>
              <div className="dot">{step.completed ? '✓' : idx + 1}</div>
              <div className="label">{step.label}</div>
            </TimelineStep>
          ))}
        </TimelineContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, alignSelf: 'center' }}>Update Order Status:</span>
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{ padding: '8px 14px', fontWeight: 600, borderRadius: 4, border: '1px solid #c9a45c', background: '#fffdf9', color: '#1f1f1f', cursor: 'pointer' }}
          >
            <option value="PENDING">PENDING (Awaiting Review)</option>
            <option value="CONFIRMED">CONFIRMED (Order Approved)</option>
            <option value="MANUFACTURING">MANUFACTURING (In Atelier Crafting)</option>
            <option value="DISPATCHED">DISPATCHED (Handed to Courier)</option>
            <option value="SHIPPED">SHIPPED (In Transit)</option>
            <option value="DELIVERED">DELIVERED (Completed)</option>
            <option value="REJECTED">REJECTED (Declined)</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        {order.shipments && order.shipments.length > 0 && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed #d9d3c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#777', textTransform: 'uppercase' }}>
                <Truck size={14} style={{ verticalAlign: 'middle', marginRight: 6, color: '#c9a45c' }} /> DISPATCHED COURIER & TRACKING DETAILS
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1f1f1f', marginTop: 4 }}>
                Carrier: <span style={{ color: '#c9a45c' }}>{order.shipments[order.shipments.length - 1].carrier}</span> | Tracking ID: <span style={{ fontFamily: 'monospace', color: '#1f1f1f' }}>{order.shipments[order.shipments.length - 1].trackingNumber}</span>
              </div>
            </div>
            <ActionBtn $variant="gold" onClick={() => setShowDispatchModal(true)}>
              <Truck size={14} /> Update Tracking
            </ActionBtn>
          </div>
        )}
      </Card>

      <DetailGrid>
        <div>
          {/* ORDER ITEMS */}
          <Card>
            <h2>Purchased Items ({order.items ? order.items.length : 0})</h2>
            <ItemsTable>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.productName}</div>
                      {item.variantInfo && (
                        <div style={{ fontSize: '0.75rem', color: '#777' }}>{item.variantInfo}</div>
                      )}
                    </td>
                    <td>{item.sku || 'N/A'}</td>
                    <td>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>
                      {order.currency} ${item.unitPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      {order.currency} ${item.subtotal?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </ItemsTable>
          </Card>

          {/* PAYMENT HISTORY */}
          <Card>
            <h2>Payment Transactions</h2>
            <ItemsTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Payment ID</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(order.payments || []).length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: 20 }}>
                      No payment transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  order.payments.map((p: any) => (
                    <tr key={p.id}>
                      <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 600 }}>{p.paymentNumber || p.id.substring(0, 8)}</td>
                      <td>{p.paymentMethod}</td>
                      <td>{p.referenceId || 'N/A'}</td>
                      <td style={{ fontWeight: 700, color: p.status === 'VOIDED' ? '#888' : '#2e7d32' }}>
                        {p.currency} ${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td>
                        <Badge
                          $bg={p.status === 'SUCCESS' ? '#E6F4EA' : '#FCE8E6'}
                          $color={p.status === 'SUCCESS' ? '#137333' : '#C5221F'}
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td>
                        {p.status === 'SUCCESS' && (
                          <div style={{ display: 'flex', gap: 6 }}>
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
                              <Download size={15} />
                            </button>
                            <button
                              title="Void Payment"
                              onClick={() => {
                                setVoidPaymentId(p.id);
                                setShowVoidModal(true);
                              }}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#c5221f' }}
                            >
                              Void
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </ItemsTable>
          </Card>

          {/* REFUND HISTORY */}
          {(order.refunds || []).length > 0 && (
            <Card>
              <h2>Refund Transactions</h2>
              <ItemsTable>
                <thead>
                  <tr>
                    <th>Refund ID</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Reason</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.refunds.map((r: any) => (
                    <tr key={r.id}>
                      <td>{r.refundNumber}</td>
                      <td>{new Date(r.refundDate).toLocaleDateString()}</td>
                      <td>{r.refundMethod}</td>
                      <td>{r.reason || 'N/A'}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#c5221f' }}>
                        -${order.currency} ${r.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ItemsTable>
            </Card>
          )}
        </div>

        <div>
          {/* FINANCIAL BREAKDOWN */}
          <Card>
            <h2>Financial Overview</h2>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{order.currency} ${order.subtotal?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </SummaryRow>
            {order.discount > 0 && (
              <SummaryRow>
                <span>Discount</span>
                <span style={{ color: '#2e7d32' }}>-{order.currency} ${order.discount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </SummaryRow>
            )}
            {order.tax > 0 && (
              <SummaryRow>
                <span>Taxes</span>
                <span>+{order.currency} ${order.tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </SummaryRow>
            )}
            {order.shippingFee > 0 && (
              <SummaryRow>
                <span>Shipping</span>
                <span>+{order.currency} ${order.shippingFee?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </SummaryRow>
            )}
            <SummaryRow $bold>
              <span>Final Order Total</span>
              <span>{order.currency} ${order.totalAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </SummaryRow>

            <div style={{ margin: '12px 0', borderTop: '1px solid #e8e3d9' }} />

            <SummaryRow>
              <span>Total Payments Received</span>
              <span style={{ color: '#2e7d32', fontWeight: 600 }}>
                {order.currency} ${order.paidAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </SummaryRow>

            {order.refundedAmount > 0 && (
              <SummaryRow>
                <span>Total Refunds</span>
                <span style={{ color: '#c5221f', fontWeight: 600 }}>
                  -{order.currency} ${order.refundedAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </SummaryRow>
            )}

            <SummaryRow $bold $gold style={{ fontSize: '1.05rem', marginTop: 8 }}>
              <span>Outstanding Balance</span>
              <span>{order.currency} ${order.balanceDue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </SummaryRow>
          </Card>

          {/* CUSTOMER DETAILS */}
          <Card>
            <h2>Client Details</h2>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              <div style={{ fontWeight: 700, color: '#1f1f1f' }}>{order.customerName || 'Valued Client'}</div>
              <div>{order.customerEmail}</div>
              <div>{order.customerPhone || 'Phone N/A'}</div>
              <div style={{ marginTop: 12 }}>
                <strong>Billing Address:</strong>
                <div>{order.billingAddress || 'N/A'}</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <strong>Shipping Address:</strong>
                <div>{order.shippingAddress || 'N/A'}</div>
              </div>
            </div>
          </Card>
        </div>
      </DetailGrid>

      {/* ADD PAYMENT MODAL */}
      {showAddPaymentModal && (
        <ModalOverlay onClick={() => setShowAddPaymentModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>+ Add Payment for Order #{order.orderNumber}</h2>
            <form onSubmit={handleAddPayment}>
              <FormGroup>
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Payment Method</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                >
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Transaction / Reference ID</label>
                <input
                  type="text"
                  placeholder="e.g. WIRE-98341"
                  value={paymentForm.referenceId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, referenceId: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Notes</label>
                <textarea
                  rows={2}
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setShowAddPaymentModal(false)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="primary">
                  Save Payment
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* REFUND MODAL */}
      {showRefundModal && (
        <ModalOverlay onClick={() => setShowRefundModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>+ Issue Refund for Order #{order.orderNumber}</h2>
            <form onSubmit={handleCreateRefund}>
              <FormGroup>
                <label>Refund Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={refundForm.amount}
                  onChange={(e) => setRefundForm({ ...refundForm, amount: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Refund Method</label>
                <input
                  type="text"
                  value={refundForm.refundMethod}
                  onChange={(e) => setRefundForm({ ...refundForm, refundMethod: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Reason for Refund</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Size exchange / Order adjustment"
                  value={refundForm.reason}
                  onChange={(e) => setRefundForm({ ...refundForm, reason: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Notes</label>
                <textarea
                  rows={2}
                  value={refundForm.notes}
                  onChange={(e) => setRefundForm({ ...refundForm, notes: e.target.value })}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setShowRefundModal(false)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="primary">
                  Issue Refund
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* VOID PAYMENT MODAL */}
      {showVoidModal && (
        <ModalOverlay onClick={() => setShowVoidModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#c5221f' }}>Void Payment Transaction</h2>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 16 }}>
              Voiding a payment will exclude it from order balance calculations while preserving audit trail logs. Reason is mandatory.
            </p>
            <form onSubmit={handleVoidPaymentSubmit}>
              <FormGroup>
                <label>Mandatory Void Reason</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State reason for voiding transaction..."
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setShowVoidModal(false)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="primary">
                  Confirm Void
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* DISPATCH / TRACKING MODAL */}
      {showDispatchModal && (
        <ModalOverlay onClick={() => setShowDispatchModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>Set Dispatch & Courier Tracking Details</h2>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 16 }}>
              Enter the courier carrier company name and tracking ID. This information will immediately be displayed to the customer in their account order tracker.
            </p>
            <form onSubmit={handleDispatchSubmit}>
              <FormGroup>
                <label>Order Status</label>
                <select
                  value={dispatchForm.status}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, status: e.target.value })}
                >
                  <option value="DISPATCHED">DISPATCHED (Handed to Courier)</option>
                  <option value="SHIPPED">SHIPPED (In Transit)</option>
                  <option value="DELIVERED">DELIVERED (Completed)</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Courier / Carrier Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FedEx Express, DHL, UPS, Royal Mail"
                  value={dispatchForm.courierCompany}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, courierCompany: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Waybill / Tracking ID Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 789234510098 / 1Z9999999999999999"
                  value={dispatchForm.trackingNumber}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, trackingNumber: e.target.value })}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setShowDispatchModal(false)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="primary">
                  Save Dispatch & Tracking ID
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
};
