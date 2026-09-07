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
  min-height: 80vh;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #0B0B0B;
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
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);

  .welcome {
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #F5F1E8;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.95rem;
      color: #A8A8A8;
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
  background-color: #111111;
  color: #F5F1E8;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(229, 62, 62, 0.15);
    color: #FC8181;
    border-color: rgba(229, 62, 62, 0.4);
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LookupBox = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
  }

  .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 220px;
      padding: 12px 14px;
      border: 1px solid rgba(140, 116, 75, 0.25);
      background: #111111;
      color: #F5F1E8;
      border-radius: 2px;
      font-size: 0.88rem;
      outline: none;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s ease;

      &::placeholder {
        color: #666666;
      }

      &:focus {
        border-color: #C9A96E;
        background: #0B0B0B;
        box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
      }
    }

    button {
      padding: 12px 24px;
      background: #C9A96E;
      color: #0B0B0B;
      border: 1px solid #C9A96E;
      border-radius: 2px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s ease;

      &:hover {
        background: #DFBA73;
        border-color: #DFBA73;
        box-shadow: 0 4px 14px rgba(201, 169, 110, 0.3);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;

const OrderCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    padding-bottom: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    .no {
      font-family: monospace;
      font-weight: 700;
      font-size: 1.1rem;
      color: #C9A96E;
    }

    .date {
      font-size: 0.82rem;
      color: #A8A8A8;
    }

    .status-badge {
      padding: 5px 14px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 12px;
      background: rgba(201, 169, 110, 0.15);
      color: #C9A96E;
      border: 1px solid rgba(201, 169, 110, 0.35);

      &.delivered {
        background: rgba(56, 161, 105, 0.15);
        color: #68D391;
        border-color: rgba(56, 161, 105, 0.35);
      }
      &.manufacturing {
        background: rgba(49, 130, 206, 0.15);
        color: #63B3ED;
        border-color: rgba(49, 130, 206, 0.35);
      }
      &.dispatched {
        background: rgba(221, 107, 32, 0.15);
        color: #F6AD55;
        border-color: rgba(221, 107, 32, 0.35);
      }
    }
  }
`;

const CourierBox = styled.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-left: 4px solid #C9A96E;
  border-radius: 4px;
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
      background: #151515;
      border: 1px solid rgba(140, 116, 75, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #C9A96E;
      flex-shrink: 0;
    }

    .carrier {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #A8A8A8;
    }

    .tracking-no {
      font-family: monospace;
      font-size: 1.05rem;
      font-weight: 700;
      color: #F5F1E8;
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
    background: ${({ $completed }) => ($completed ? '#C9A96E' : '#111111')};
    color: ${({ $completed }) => ($completed ? '#0B0B0B' : '#666666')};
    border: 2px solid ${({ $completed }) => ($completed ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
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
    color: ${({ $completed }) => ($completed ? '#F5F1E8' : '#666666')};
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
    color: #D8D2C5;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(140, 116, 75, 0.2);

    .name {
      font-weight: 600;
    }
    .price {
      font-weight: 700;
      color: #C9A96E;
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
      const stored = localStorage.getItem('app_user_profile');
      const token = localStorage.getItem('app_auth_token') || localStorage.getItem('admin_session_token');
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        fetchUserOrders(u.email);
      } else if (token) {
        const u = { email: 'client@aethelcarats.com', name: 'Valued Client' };
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
      const lastPlacedEmail = localStorage.getItem('app_last_order_email');
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
      const searchEmail = lookupEmail || (user?.email?.includes('@') ? user.email : localStorage.getItem('app_last_order_email') || '');
      const res = await api.trackPublicOrder(lookupOrderNo, searchEmail);
      setLookupResult(res);
    } catch (err: any) {
      setLookupError(err.response?.data?.message || 'Order not found. Please check your order number.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('app_auth_token');
    localStorage.removeItem('app_user_profile');
    localStorage.removeItem('admin_session_token');
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
        <h3><Search size={18} color="#C9A96E" style={{ marginRight: 8 }} /> INSTANT ORDER TRACKING</h3>
        <form onSubmit={handleLookupSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Enter Order Number (e.g. AC-10028)"
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
          <div style={{ color: '#FC8181', fontSize: '0.85rem', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={16} /> {lookupError}
          </div>
        )}

        {lookupResult && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(140, 116, 75, 0.2)' }}>
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
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#68D391', background: 'rgba(56, 161, 105, 0.15)', border: '1px solid rgba(56, 161, 105, 0.35)', padding: '6px 14px', borderRadius: 4 }}>
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
        <ShoppingBag size={24} color="#C9A96E" /> MY RECENT ORDERS ({orders.length})
      </SectionTitle>

      {loadingOrders ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#A8A8A8' }}>Loading order history...</div>
      ) : orders.length === 0 ? (
        <div style={{ background: '#151515', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ color: '#A8A8A8', marginBottom: 16 }}>You have no placed orders yet.</p>
          <Link to="/rings" style={{ padding: '12px 24px', background: '#C9A96E', color: '#0B0B0B', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', borderRadius: 2 }}>
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
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#68D391', background: 'rgba(56, 161, 105, 0.15)', border: '1px solid rgba(56, 161, 105, 0.35)', padding: '6px 14px', borderRadius: 4 }}>
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
