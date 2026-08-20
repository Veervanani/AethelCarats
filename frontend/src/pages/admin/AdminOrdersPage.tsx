import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  DollarSign,
  CreditCard,
  Clock,
  RotateCcw,
  Plus,
  FileText,
  Download,
  Eye,
  Edit,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
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

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
    letter-spacing: 0.05em;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'secondary' | 'gold' }>`
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 0.8rem;
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
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
  flex-direction: column;
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#C9A45C' : '#E8E3D9')};
  background-color: ${({ $active }) => ($active ? '#C9A45C' : '#FFFDF9')};
  color: ${({ $active }) => ($active ? '#FFFDF9' : '#55514B')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
  }
`;

const ControlsRow = styled.div`
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

    &:focus {
      outline: none;
      border-color: #c9a45c;
    }
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
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #c9a45c;
  }
`;

const TableContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;

  th {
    background: #1a1918;
    color: #fffdf9;
    padding: 14px 16px;
    font-weight: 600;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #e8e3d9;
    color: #2c2a29;
    vertical-align: middle;
  }

  tr:hover td {
    background-color: rgba(201, 164, 92, 0.05);
  }
`;

const StatusBadge = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: ${({ $type }) => {
    switch ($type) {
      case 'PAID':
        return '#E6F4EA';
      case 'PARTIALLY PAID':
        return '#FEF7E0';
      case 'UNPAID':
        return '#FCE8E6';
      case 'REFUNDED':
        return '#F1F3F4';
      case 'OVERPAID':
        return '#E8F0FE';
      default:
        return '#F1F3F4';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'PAID':
        return '#137333';
      case 'PARTIALLY PAID':
        return '#B06000';
      case 'UNPAID':
        return '#C5221F';
      case 'REFUNDED':
        return '#5F6368';
      case 'OVERPAID':
        return '#1A73E8';
      default:
        return '#5F6368';
    }
  }};
`;

const OrderStatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  background: #1f1f1f;
  color: #fffdf9;
`;

const ActionIconButton = styled.button<{ $variant?: 'gold' | 'danger' | 'neutral' }>`
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $variant }) => ($variant === 'gold' ? '#C9A45C' : $variant === 'danger' ? '#FEB2B2' : '#D9D3C7')};
  background-color: ${({ $variant }) => ($variant === 'gold' ? '#FAF5EB' : $variant === 'danger' ? '#FFF5F5' : '#FAF8F5')};
  color: ${({ $variant }) => ($variant === 'gold' ? '#C9A45C' : $variant === 'danger' ? '#C53030' : '#1F1F1F')};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    background-color: ${({ $variant }) => ($variant === 'gold' ? '#C9A45C' : $variant === 'danger' ? '#C53030' : '#1F1F1F')};
    color: #ffffff;

    svg {
      color: #ffffff;
    }
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    color: #1f1f1f;
    margin-bottom: 16px;
  }
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
    &:focus {
      outline: none;
      border-color: #c9a45c;
    }
  }
`;

export const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Filters
  const [dateFilter, setDateFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('ALL');
  const [orderStatus, setOrderStatus] = useState('ALL');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  // Modal States
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<any>(null);
  const [paymentForm, setPaymentForm] = useState({
    orderId: '',
    amount: '',
    paymentMethod: 'Bank Transfer',
    referenceId: '',
    notes: '',
  });

  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    billingAddress: '',
    shippingAddress: '',
    productName: 'Custom Fine Jewellery Setting',
    sku: 'FJ-CUSTOM-01',
    unitPrice: '',
    quantity: '1',
    tax: '0',
    notes: '',
  });

  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    billingAddress: '',
    notes: '',
    subtotal: '',
    tax: '',
    shippingFee: '',
    discount: '',
    orderStatus: 'PENDING',
    courierCompany: '',
    trackingNumber: '',
  });

  const openEditOrderModal = (ord: any) => {
    setEditingOrder(ord);
    const lastShipment = ord.shipments && ord.shipments.length > 0 ? ord.shipments[ord.shipments.length - 1] : null;
    setEditForm({
      customerName: ord.customerName || '',
      customerEmail: ord.customerEmail || '',
      customerPhone: ord.customerPhone || '',
      shippingAddress: typeof ord.shippingAddress === 'string' ? ord.shippingAddress : JSON.stringify(ord.shippingAddress || ''),
      billingAddress: typeof ord.billingAddress === 'string' ? ord.billingAddress : JSON.stringify(ord.billingAddress || ''),
      notes: ord.notes || '',
      subtotal: ord.subtotal !== undefined ? String(ord.subtotal) : '',
      tax: ord.tax !== undefined ? String(ord.tax) : '0',
      shippingFee: ord.shippingFee !== undefined ? String(ord.shippingFee) : '0',
      discount: ord.discount !== undefined ? String(ord.discount) : '0',
      orderStatus: ord.orderStatus || 'PENDING',
      courierCompany: lastShipment?.carrier || '',
      trackingNumber: lastShipment?.trackingNumber || '',
    });
  };

  const handleEditOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    try {
      await financialApi.updateOrder(editingOrder.id, {
        ...editForm,
        subtotal: Number(editForm.subtotal || 0),
        tax: Number(editForm.tax || 0),
        shippingFee: Number(editForm.shippingFee || 0),
        discount: Number(editForm.discount || 0),
      });
      alert('Order details updated successfully!');
      setEditingOrder(null);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update order');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, metricsData, methodsData] = await Promise.all([
        financialApi.getOrders({
          search,
          paymentStatus,
          orderStatus,
        }),
        financialApi.getOrderSummaryMetrics({ period: dateFilter }),
        financialApi.getPaymentMethods(),
      ]);
      setOrders(ordersData);
      setMetrics(metricsData);
      setPaymentMethods(methodsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateFilter, search, paymentStatus, orderStatus]);

  const handleAddPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financialApi.createPayment({
        orderId: paymentForm.orderId,
        amount: Number(paymentForm.amount),
        paymentMethod: paymentForm.paymentMethod,
        referenceId: paymentForm.referenceId,
        notes: paymentForm.notes,
      });
      setShowAddPaymentModal(false);
      setPaymentForm({ orderId: '', amount: '', paymentMethod: 'Bank Transfer', referenceId: '', notes: '' });
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error recording payment');
    }
  };

  const handleCreateOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await financialApi.createOrder({
        customerName: newOrderForm.customerName,
        customerEmail: newOrderForm.customerEmail,
        customerPhone: newOrderForm.customerPhone,
        billingAddress: newOrderForm.billingAddress,
        shippingAddress: newOrderForm.shippingAddress,
        subtotal: Number(newOrderForm.unitPrice) * Number(newOrderForm.quantity),
        tax: Number(newOrderForm.tax),
        items: [
          {
            productName: newOrderForm.productName,
            sku: newOrderForm.sku,
            unitPrice: Number(newOrderForm.unitPrice),
            quantity: Number(newOrderForm.quantity),
          },
        ],
        notes: newOrderForm.notes,
      });
      setShowNewOrderModal(false);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating order');
    }
  };

  const openPaymentModalForOrder = (order: any) => {
    setSelectedOrderForPayment(order);
    setPaymentForm({
      orderId: order ? order.id : (orders[0]?.id || ''),
      amount: order && order.balanceDue ? String(order.balanceDue) : '',
      paymentMethod: paymentMethods[0]?.name || 'Bank Transfer',
      referenceId: '',
      notes: '',
    });
    setShowAddPaymentModal(true);
  };

  const handleDeleteOrder = async (ord: any) => {
    if (window.confirm(`Are you sure you want to permanently delete Order #${ord.orderNumber}? This action cannot be undone.`)) {
      try {
        await financialApi.deleteOrder(ord.id);
        loadData();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete order.');
      }
    }
  };

  const handleWipeAllOrders = async () => {
    if (window.confirm('⚠️ ARE YOU SURE YOU WANT TO PERMANENTLY DELETE ALL ORDERS FROM THE DATABASE? Total orders will be set to 0. This cannot be undone.')) {
      try {
        await financialApi.wipeAllOrders();
        alert('All orders have been permanently deleted from the database. Total orders is now 0.');
        loadData();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to wipe orders.');
      }
    }
  };

  return (
    <div>
      <PageHeader>
        <h1>Orders & Financial Dashboard</h1>
        <QuickActions>
          <ActionBtn $variant="gold" onClick={() => setShowNewOrderModal(true)}>
            <Plus size={14} /> + New Order
          </ActionBtn>
          <ActionBtn $variant="secondary" onClick={handleWipeAllOrders} style={{ background: '#FFF5F5', borderColor: '#FEB2B2', color: '#C53030' }}>
            <Trash2 size={14} color="#C53030" /> Clear All Orders
          </ActionBtn>
          <ActionBtn $variant="primary" onClick={() => openPaymentModalForOrder(null)}>
            <CreditCard size={14} /> Add Payment
          </ActionBtn>
          <ActionBtn
            $variant="secondary"
            onClick={() =>
              financialApi.downloadPdfBlob(
                financialApi.getCustomStatementPdfUrl('', ''),
                `Order_Ledger_Report_${dateFilter}.pdf`
              )
            }
          >
            <FileText size={14} /> Statements
          </ActionBtn>
          <ActionBtn
            $variant="secondary"
            onClick={() => financialApi.downloadExportFile('excel', 'orders')}
          >
            <Download size={14} /> Export Excel
          </ActionBtn>
        </QuickActions>
      </PageHeader>

      {/* Summary Cards */}
      <SummaryGrid>
        <SummaryCard $borderTop="#C9A45C">
          <div className="label">Total Orders</div>
          <div className="value">{metrics.totalOrders || orders.length}</div>
        </SummaryCard>
        <SummaryCard $borderTop="#1F1F1F">
          <div className="label">Total Order Value</div>
          <div className="value">${metrics.totalOrderValue?.toLocaleString('en-US', { minimumFractionDigits: 0 }) || '0'}</div>
        </SummaryCard>
        <SummaryCard $borderTop="#2E7D32">
          <div className="label">Payments Received</div>
          <div className="value">${metrics.totalPaymentsReceived?.toLocaleString('en-US', { minimumFractionDigits: 0 }) || '0'}</div>
        </SummaryCard>
        <SummaryCard $borderTop="#B06000">
          <div className="label">Payments Pending</div>
          <div className="value">{metrics.pendingOrdersCount || 0} Orders</div>
        </SummaryCard>
        <SummaryCard $borderTop="#55514B">
          <div className="label">Refunds</div>
          <div className="value">${metrics.totalRefundsIssued?.toLocaleString('en-US', { minimumFractionDigits: 0 }) || '0'}</div>
        </SummaryCard>
        <SummaryCard $borderTop="#C5221F">
          <div className="label">Outstanding Balance</div>
          <div className="value">${metrics.totalOutstandingBalance?.toLocaleString('en-US', { minimumFractionDigits: 0 }) || '0'}</div>
        </SummaryCard>
      </SummaryGrid>

      {/* Date & Search Filter Bar */}
      <FilterBar>
        <FilterGroup>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginRight: 8 }}>PERIOD:</span>
          {[
            { id: 'all', label: 'All Time' },
            { id: 'today', label: 'Today' },
            { id: 'yesterday', label: 'Yesterday' },
            { id: 'this_week', label: 'This Week' },
            { id: 'this_month', label: 'This Month' },
            { id: 'last_month', label: 'Last Month' },
            { id: 'this_year', label: 'This Year' },
          ].map((item) => (
            <FilterChip
              key={item.id}
              $active={dateFilter === item.id}
              onClick={() => setDateFilter(item.id)}
            >
              {item.label}
            </FilterChip>
          ))}
        </FilterGroup>

        <ControlsRow>
          <SearchInputWrapper>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, Reference ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInputWrapper>

          <SelectInput value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="ALL">All Payment Statuses</option>
            <option value="UNPAID">UNPAID</option>
            <option value="PARTIALLY PAID">PARTIALLY PAID</option>
            <option value="PAID">PAID</option>
            <option value="OVERPAID">OVERPAID</option>
            <option value="REFUNDED">REFUNDED</option>
            <option value="PARTIALLY REFUNDED">PARTIALLY REFUNDED</option>
          </SelectInput>

          <SelectInput value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
            <option value="ALL">All Order Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="MANUFACTURING">MANUFACTURING</option>
            <option value="DISPATCHED">DISPATCHED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CANCELLED">CANCELLED</option>
          </SelectInput>
        </ControlsRow>
      </FilterBar>

      {/* Orders Table */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Order Total</th>
              <th>Amount Paid</th>
              <th>Balance Due</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  Loading financial records...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  No orders found matching criteria.
                </td>
              </tr>
            ) : (
              orders.map((ord) => (
                <tr key={ord.id}>
                  <td>
                    <Link
                      to={`${PRIVATE_ADMIN_PATH}/orders/${ord.id}`}
                      style={{ fontWeight: 700, color: '#1f1f1f', textDecoration: 'none' }}
                    >
                      #{ord.orderNumber}
                    </Link>
                  </td>
                  <td>{new Date(ord.orderDate || ord.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{ord.customerName || 'Valued Client'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{ord.customerEmail}</div>
                  </td>
                  <td>{ord.items ? `${ord.items.length} Items` : '1 Item'}</td>
                  <td style={{ fontWeight: 700 }}>
                    {ord.currency} ${ord.totalAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: '#2e7d32', fontWeight: 600 }}>
                    {ord.currency} ${ord.paidAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: ord.balanceDue > 0 ? '#c5221f' : '#777', fontWeight: ord.balanceDue > 0 ? 700 : 400 }}>
                    {ord.currency} ${ord.balanceDue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <StatusBadge $type={ord.calculatedStatus}>{ord.calculatedStatus}</StatusBadge>
                  </td>
                  <td>
                    <select
                      value={ord.orderStatus || 'CONFIRMED'}
                      onChange={async (e) => {
                        try {
                          await financialApi.updateOrder(ord.id, { orderStatus: e.target.value });
                          loadData();
                        } catch (err) {
                          alert('Failed to update status');
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: 4,
                        border: '1px solid #d9d3c7',
                        background: '#faf8f5',
                        color: '#1f1f1f',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="MANUFACTURING">MANUFACTURING</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="REJECTED">REJECTED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <ActionIconButton
                        $variant="neutral"
                        title="View Full Order Details"
                        onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/orders/${ord.id}`)}
                      >
                        <Eye size={16} />
                      </ActionIconButton>
                      <ActionIconButton
                        $variant="gold"
                        title="Record Payment"
                        onClick={() => openPaymentModalForOrder(ord)}
                      >
                        <Plus size={16} />
                      </ActionIconButton>
                      <ActionIconButton
                        $variant="gold"
                        title="Edit Order Details"
                        onClick={() => openEditOrderModal(ord)}
                      >
                        <Edit size={16} />
                      </ActionIconButton>
                      <ActionIconButton
                        $variant="neutral"
                        title="Download Invoice PDF"
                        onClick={() =>
                          financialApi.downloadPdfBlob(
                            financialApi.getOrderStatementPdfUrl(ord.id),
                            `Order_Statement_${ord.orderNumber}.pdf`
                          )
                        }
                      >
                        <FileText size={16} />
                      </ActionIconButton>
                      <ActionIconButton
                        $variant="danger"
                        title="Delete Order"
                        onClick={() => handleDeleteOrder(ord)}
                      >
                        <Trash2 size={16} />
                      </ActionIconButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* ADD PAYMENT MODAL */}
      {showAddPaymentModal && (
        <ModalOverlay onClick={() => setShowAddPaymentModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>+ Record Payment</h2>
            <form onSubmit={handleAddPaymentSubmit}>
              <FormGroup>
                <label>Order</label>
                <select
                  value={paymentForm.orderId}
                  onChange={(e) => {
                    const selected = orders.find((o) => o.id === e.target.value);
                    setPaymentForm({
                      ...paymentForm,
                      orderId: e.target.value,
                      amount: selected?.balanceDue ? String(selected.balanceDue) : paymentForm.amount,
                    });
                  }}
                  required
                >
                  <option value="">Select Order...</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      #{o.orderNumber} - {o.customerName} (Due: ${o.balanceDue})
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label>Amount Received ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 4000.00"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  required
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
                  placeholder="e.g. WIRE-983021 / TRX-8849"
                  value={paymentForm.referenceId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, referenceId: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <label>Notes / Remittance Details</label>
                <textarea
                  rows={3}
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
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

      {/* NEW ORDER MODAL */}
      {showNewOrderModal && (
        <ModalOverlay onClick={() => setShowNewOrderModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>+ Create New Order</h2>
            <form onSubmit={handleCreateOrderSubmit}>
              <FormGroup>
                <label>Customer Name</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.customerName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, customerName: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Customer Email</label>
                <input
                  type="email"
                  required
                  value={newOrderForm.customerEmail}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, customerEmail: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Customer Phone</label>
                <input
                  type="text"
                  value={newOrderForm.customerPhone}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, customerPhone: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Item Description / Product Name</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.productName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, productName: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Unit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newOrderForm.unitPrice}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, unitPrice: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <label>Notes</label>
                <textarea
                  rows={2}
                  value={newOrderForm.notes}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                />
              </FormGroup>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setShowNewOrderModal(false)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="primary">
                  Create Order
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* EDIT ORDER MODAL */}
      {editingOrder && (
        <ModalOverlay onClick={() => setEditingOrder(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <h2>✏️ Edit Order #{editingOrder.orderNumber}</h2>
            <form onSubmit={handleEditOrderSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormGroup>
                  <label>Customer Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.customerName}
                    onChange={(e) => setEditForm({ ...editForm, customerName: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Customer Email</label>
                  <input
                    type="email"
                    required
                    value={editForm.customerEmail}
                    onChange={(e) => setEditForm({ ...editForm, customerEmail: e.target.value })}
                  />
                </FormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormGroup>
                  <label>Customer Phone</label>
                  <input
                    type="text"
                    value={editForm.customerPhone}
                    onChange={(e) => setEditForm({ ...editForm, customerPhone: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Order Status</label>
                  <select
                    value={editForm.orderStatus}
                    onChange={(e) => setEditForm({ ...editForm, orderStatus: e.target.value })}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="MANUFACTURING">MANUFACTURING</option>
                    <option value="DISPATCHED">DISPATCHED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </FormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
                <FormGroup>
                  <label>Subtotal ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.subtotal}
                    onChange={(e) => setEditForm({ ...editForm, subtotal: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Tax ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.tax}
                    onChange={(e) => setEditForm({ ...editForm, tax: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Shipping ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.shippingFee}
                    onChange={(e) => setEditForm({ ...editForm, shippingFee: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Discount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.discount}
                    onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                  />
                </FormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormGroup>
                  <label>Courier Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. DHL Express / FedEx / Bluedart"
                    value={editForm.courierCompany}
                    onChange={(e) => setEditForm({ ...editForm, courierCompany: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Tracking ID / Waybill Number</label>
                  <input
                    type="text"
                    placeholder="e.g. TRK-8849102"
                    value={editForm.trackingNumber}
                    onChange={(e) => setEditForm({ ...editForm, trackingNumber: e.target.value })}
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <label>Shipping Address</label>
                <textarea
                  rows={2}
                  value={editForm.shippingAddress}
                  onChange={(e) => setEditForm({ ...editForm, shippingAddress: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <label>Notes / Custom Specifications</label>
                <textarea
                  rows={2}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <ActionBtn type="button" $variant="secondary" onClick={() => setEditingOrder(null)}>
                  Cancel
                </ActionBtn>
                <ActionBtn type="submit" $variant="gold">
                  Save Changes
                </ActionBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </div>
  );
};
