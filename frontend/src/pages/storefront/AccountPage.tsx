import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  User,
  Heart,
  ShoppingBag,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d3c7;

  .welcome {
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1f1f1f;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.95rem;
      color: #6b6b6b;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: #ffffff;
  color: #1f1f1f;
  border: 1px solid #d9d3c7;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1f1f1f;
    color: #ffffff;
    border-color: #1f1f1f;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LookupBox = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(31, 31, 31, 0.03);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 220px;
      padding: 12px 14px;
      border: 1px solid #d9d3c7;
      background: #faf8f5;
      font-size: 0.88rem;
      outline: none;

      &:focus {
        border-color: #c9a45c;
        background: #ffffff;
      }
    }

    button {
      padding: 12px 24px;
      background: #1f1f1f;
      color: #ffffff;
      border: none;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: #c9a45c;
      }
    }
  }
`;

const OrderCard = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(31, 31, 31, 0.03);

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    .no {
      font-family: monospace;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f1f1f;
    }

    .date {
      font-size: 0.82rem;
      color: #777;
    }

    .status-badge {
      padding: 4px 12px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 12px;
      background: #faf5eb;
      color: #c9a45c;
      border: 1px solid #e8e3d9;

      &.delivered {
        background: #e6f4ea;
        color: #137333;
        border-color: #ceead6;
      }
      &.manufacturing {
        background: #e8f0fe;
        color: #1a73e8;
        border-color: #d2e3fc;
      }
      &.dispatched {
        background: #feefc3;
        color: #b06000;
        border-color: #fce8e6;
      }
    }
  }
`;

const CourierBox = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-left: 4px solid #c9a45c;
  padding: 16px 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .courier-info {
    display: flex;
    align-items: center;
    gap: 14px;

    .icon-wrap {
      width: 42px;
      height: 42px;
      background: #ffffff;
      border: 1px solid #d9d3c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9a45c;
      flex-shrink: 0;
    }

    .carrier {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #77736c;
    }

    .tracking-no {
      font-family: monospace;
      font-size: 1.05rem;
      font-weight: 700;
      color: #1f1f1f;
      margin-top: 2px;
    }
  }
`;

const StepperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 24px 0 28px;
  position: relative;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StepItem = styled.div<{ $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .step-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${({ $completed }) => ($completed ? '#1f1f1f' : '#faf8f5')};
    color: ${({ $completed }) => ($completed ? '#c9a45c' : '#a39e93')};
    border: 2px solid ${({ $completed }) => ($completed ? '#1f1f1f' : '#d9d3c7')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .step-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ $completed }) => ($completed ? '#1f1f1f' : '#8c877d')};
  }

  @media (max-width: 640px) {
    flex-direction: row;
    text-align: left;
  }
`;

const OrderItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;
    color: #33312e;
    padding: 8px 0;
    border-bottom: 1px dashed #f2ede4;

    .name {
      font-weight: 600;
    }
    .price {
      font-weight: 700;
      color: #c9a45c;
    }
  }
`;

export const AccountPage: React.FC = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Tracking Lookup State
  const [lookupOrderNo, setLookupOrderNo] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fj_customer_user');
      const token = localStorage.getItem('floksy_token') || localStorage.getItem('fj_admin_token');
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        fetchUserOrders(u.email);
      } else if (token) {
        const u = { email: 'client@floksyjewel.com', name: 'Valued Client' };
        setUser(u);
        fetchUserOrders(u.email);
      } else {
        navigate('/login');
      }
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.hash === '#my-orders' || location.hash === '#orders') {
      const el = document.getElementById('my-orders');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location.hash, location.pathname]);

  const fetchUserOrders = async (email: string) => {
    setLoadingOrders(true);
    try {
      const lastPlacedEmail = localStorage.getItem('fj_last_order_email');
      let data = await api.getMyOrders(email);
      if ((!data || data.length === 0) && lastPlacedEmail && lastPlacedEmail !== email) {
        const extraData = await api.getMyOrders(lastPlacedEmail);
        if (Array.isArray(extraData) && extraData.length > 0) {
          data = extraData;
        }
      }
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupOrderNo) return;
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const searchEmail = lookupEmail || (user?.email?.includes('@') ? user.email : localStorage.getItem('fj_last_order_email') || '');
      const res = await api.trackPublicOrder(lookupOrderNo, searchEmail);
      setLookupResult(res);
    } catch (err: any) {
      setLookupError(err.response?.data?.message || 'Order not found. Please check your order number.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('floksy_token');
    localStorage.removeItem('fj_customer_user');
    localStorage.removeItem('fj_admin_token');
    navigate('/login');
  };

  if (!user) return null;

  const renderStatusStepper = (statusStr: string) => {
    const s = (statusStr || 'CONFIRMED').toUpperCase();
    const isPlaced = true;
    const isConfirmed = s !== 'PENDING' && s !== 'REJECTED' && s !== 'CANCELLED';
    const isManufacturing = ['MANUFACTURING', 'IN_PRODUCTION', 'DISPATCHED', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED'].includes(s);
    const isDispatched = ['DISPATCHED', 'SHIPPED', 'DELIVERED'].includes(s);
    const isDelivered = s === 'DELIVERED';

    return (
      <StepperGrid>
        <StepItem $completed={isPlaced}>
          <div className="step-icon">1</div>
          <div className="step-label">Order Placed</div>
        </StepItem>
        <StepItem $completed={isConfirmed}>
          <div className="step-icon">2</div>
          <div className="step-label">Confirmed</div>
        </StepItem>
        <StepItem $completed={isManufacturing}>
          <div className="step-icon">3</div>
          <div className="step-label">In Manufacturing</div>
        </StepItem>
        <StepItem $completed={isDispatched}>
          <div className="step-icon">4</div>
          <div className="step-label">Dispatched</div>
        </StepItem>
        <StepItem $completed={isDelivered}>
          <div className="step-icon">5</div>
          <div className="step-label">Delivered</div>
        </StepItem>
      </StepperGrid>
    );
  };

  return (
    <PageWrapper>
      <AccountHeader>
        <div className="welcome">
          <h1>MY ACCOUNT</h1>
          <p>Welcome back, {user.name} ({user.email})</p>
        </div>
        <LogoutBtn onClick={handleLogout}>
          <LogOut size={16} /> LOGOUT
        </LogoutBtn>
      </AccountHeader>

      {/* TRACK ORDER INSTANT LOOKUP */}
      <LookupBox>
        <h3><Search size={18} color="#C9A45C" style={{ marginRight: 8 }} /> INSTANT ORDER TRACKING</h3>
        <form onSubmit={handleLookupSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Enter Order Number (e.g. FJ-10028)"
              value={lookupOrderNo}
              onChange={(e) => setLookupOrderNo(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address (Optional)"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
            />
            <button type="submit" disabled={lookupLoading}>
              {lookupLoading ? 'LOOKING UP...' : 'TRACK STATUS'}
            </button>
          </div>
        </form>

        {lookupError && (
          <div style={{ color: '#c53030', fontSize: '0.85rem', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={16} /> {lookupError}
          </div>
        )}

        {lookupResult && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #e8e3d9' }}>
            <OrderCard style={{ margin: 0 }}>
              <div className="order-header">
                <div>
                  <span className="no">ORDER #{lookupResult.orderNumber}</span>
                  <span className="date" style={{ marginLeft: 12 }}>
                    Placed {new Date(lookupResult.createdAt || lookupResult.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className={`status-badge ${String(lookupResult.orderStatus).toLowerCase()}`}>
                  STATUS: {lookupResult.orderStatus || 'CONFIRMED'}
                </div>
              </div>

              {renderStatusStepper(lookupResult.orderStatus)}

              {lookupResult.shipments && lookupResult.shipments.length > 0 && (
                <CourierBox>
                  <div className="courier-info">
                    <div className="icon-wrap">
                      <Truck size={20} />
                    </div>
                    <div>
                      <div className="carrier">Courier Carrier: {lookupResult.shipments[lookupResult.shipments.length - 1].carrier}</div>
                      <div className="tracking-no">Waybill / Tracking ID: {lookupResult.shipments[lookupResult.shipments.length - 1].trackingNumber}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#388E3C', background: '#e6f4ea', border: '1px solid #ceead6', padding: '6px 14px', borderRadius: 4 }}>
                    ✓ Insured Transit in Progress
                  </div>
                </CourierBox>
              )}

              <OrderItemsList>
                {(lookupResult.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="item-row">
                    <span className="name">{item.productName} (x{item.quantity})</span>
                    <span className="price">${(item.unitPrice * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </OrderItemsList>
            </OrderCard>
          </div>
        )}
      </LookupBox>

      {/* MY ORDERS SECTION */}
      <SectionTitle id="my-orders">
        <ShoppingBag size={24} color="#C9A45C" /> MY RECENT ORDERS ({orders.length})
      </SectionTitle>

      {loadingOrders ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#777' }}>Loading order history...</div>
      ) : orders.length === 0 ? (
        <div style={{ background: '#ffffff', border: '1px solid #d9d3c7', padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ color: '#777', marginBottom: 16 }}>You have no placed orders yet.</p>
          <Link to="/rings" style={{ padding: '12px 24px', background: '#1f1f1f', color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>
            EXPLORE FINE JEWELLERY
          </Link>
        </div>
      ) : (
        orders.map((ord: any) => (
          <OrderCard key={ord.id}>
            <div className="order-header">
              <div>
                <span className="no">ORDER #{ord.orderNumber}</span>
                <span className="date" style={{ marginLeft: 12 }}>
                  Placed {new Date(ord.createdAt || ord.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className={`status-badge ${String(ord.orderStatus).toLowerCase()}`}>
                STATUS: {ord.orderStatus || 'CONFIRMED'}
              </div>
            </div>

            {renderStatusStepper(ord.orderStatus)}

            {ord.shipments && ord.shipments.length > 0 && (
              <CourierBox>
                <div className="courier-info">
                  <div className="icon-wrap">
                    <Truck size={20} />
                  </div>
                  <div>
                    <div className="carrier">Courier Carrier: {ord.shipments[ord.shipments.length - 1].carrier}</div>
                    <div className="tracking-no">Waybill / Tracking ID: {ord.shipments[ord.shipments.length - 1].trackingNumber}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#388E3C', background: '#e6f4ea', border: '1px solid #ceead6', padding: '6px 14px', borderRadius: 4 }}>
                  ✓ Insured Transit in Progress
                </div>
              </CourierBox>
            )}

            <OrderItemsList>
              {(ord.items || []).map((item: any, idx: number) => (
                <div key={idx} className="item-row">
                  <span className="name">{item.productName} (Qty: {item.quantity})</span>
                  <span className="price">${(item.unitPrice * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </OrderItemsList>
          </OrderCard>
        ))
      )}
    </PageWrapper>
  );
};
