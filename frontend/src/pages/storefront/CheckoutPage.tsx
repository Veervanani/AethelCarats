import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  CheckCircle2,
  Sparkles,
  Printer,
  ChevronRight,
  Landmark,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const SignInRequiredBox = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);

  .lock-icon {
    width: 64px;
    height: 64px;
    background: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #C9A96E;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  button {
    padding: 16px 36px;
    background: #C9A96E;
    color: #0B0B0B;
    border: 1px solid #C9A96E;
    border-radius: 2px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      border-color: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    }
  }
`;

const PageWrapper = styled.div`
  max-width: 1200px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 40px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`;

const HeaderBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  a {
    color: #D8D2C5;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: #C9A96E;
    }
  }

  span {
    color: #C9A96E;
    font-weight: 600;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutSection = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 576px) {
    padding: 20px 16px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  padding-bottom: 12px;

  span.step {
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    color: #C9A96E;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
`;

const FormGroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'span 1')};
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #F5F1E8;
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
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
`;

const SummarySidebar = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 32px 24px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    padding-bottom: 12px;
  }
`;

const CartItemsSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 4px;
`;

const CartItemMini = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    background: #0B0B0B;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
  }

  .info {
    flex: 1;
    .title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #F5F1E8;
      line-height: 1.3;
    }
    .meta {
      font-size: 0.75rem;
      color: #A8A8A8;
      margin-top: 2px;
    }
  }

  .price {
    font-size: 0.95rem;
    font-weight: 700;
    color: #C9A96E;
  }
`;

const TotalBreakdown = styled.div`
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  padding-top: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: #D8D2C5;
    margin-bottom: 10px;

    &.total {
      border-top: 1px dashed rgba(140, 116, 75, 0.3);
      padding-top: 14px;
      margin-top: 14px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #F5F1E8;

      .amount {
        color: #C9A96E;
        font-size: 1.25rem;
      }
    }
  }
`;

const SecurityGuaranteeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.78rem;
  color: #A8A8A8;

  svg {
    color: #C9A96E;
  }
`;

const ConfirmationBox = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);

  .check-icon {
    width: 64px;
    height: 64px;
    background: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #C9A96E;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  .order-no {
    font-family: monospace;
    font-size: 1.1rem;
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 2px;
    padding: 6px 16px;
    display: inline-block;
    color: #C9A96E;
    font-weight: 700;
    margin-bottom: 24px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const CheckoutPage: React.FC = () => {
  const cartCtx = useCart();
  const cartItems = cartCtx?.cartItems || [];
  const clearCart = cartCtx?.clearCart || (() => {});
  const { isAuthenticated, user, openAuthModal } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [paypalClientId, setPaypalClientId] = useState<string>('');
  const [paymentConfig, setPaymentConfig] = useState<Record<string, string>>({});
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'paypal' | 'bank_wire'>('paypal');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    notes: '',
  });

  useEffect(() => {
    api.getPublicPaymentConfig()
      .then((cfg: any) => {
        if (cfg) {
          setPaymentConfig(cfg);
          if (cfg.paypal_client_id) {
            setPaypalClientId(cfg.paypal_client_id);
          } else {
            setPaypalClientId((import.meta as any).env?.VITE_PAYPAL_CLIENT_ID || '');
          }
          if (cfg.paypal_enabled === 'false' && cfg.bank_transfer_enabled !== 'false') {
            setSelectedPaymentMode('bank_wire');
          }
        }
      })
      .catch(() => {
        api.getPayPalClientId()
          .then((data) => {
            if (data?.clientId) {
              setPaypalClientId(data.clientId);
            } else {
              setPaypalClientId((import.meta as any).env?.VITE_PAYPAL_CLIENT_ID || '');
            }
          })
          .catch(() => {
            setPaypalClientId((import.meta as any).env?.VITE_PAYPAL_CLIENT_ID || '');
          });
      });
  }, []);

  useEffect(() => {
    if (user) {
      const nameParts = (user.name || '').split(' ');
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || nameParts[0] || '',
        lastName: prev.lastName || nameParts.slice(1).join(' ') || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.unitPrice || item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const handleBankWireOrder = async () => {
    if (!formData.firstName || !formData.email || !formData.address) {
      alert('Please fill in your shipping details (First Name, Email, and Address) before completing your order.');
      return;
    }
    setSubmitting(true);
    try {
      const finalName = `${formData.firstName} ${formData.lastName}`.trim() || user?.name || 'Valued Client';
      const finalEmail = formData.email || user?.email || 'client@aethelcarats.com';
      const finalAddress = `${formData.address}, ${formData.city || ''}, ${formData.postalCode || ''}, ${formData.country || 'USA'}`;

      const orderPayload = {
        customerName: finalName,
        customerEmail: finalEmail,
        customerPhone: formData.phone || '',
        shippingAddress: finalAddress,
        items: cartItems.map((item: any) => ({
          productId: item.id || item.productId,
          productName: item.productName || item.product?.title || item.title || 'Handcrafted Jewellery Piece',
          sku: item.sku || item.product?.sku || 'AC-PIECE',
          variantInfo: item.selectedMetal ? `${item.selectedMetal} | Size: ${item.selectedSize || 'Standard'}` : null,
          unitPrice: item.unitPrice || item.product?.price || 0,
          quantity: item.quantity || 1,
        })),
        subtotal,
        shippingFee: 0,
        tax: 0,
        discount: 0,
        currency: paymentConfig.default_currency || 'USD',
        notes: `Selected Payment Method: Direct Bank Wire Transfer. ${formData.notes || ''}`.trim(),
      };

      const dbOrder = await api.createPublicOrder(orderPayload);
      setCompletedOrder(dbOrder);
      clearCart();
    } catch (err: any) {
      console.error('Bank wire order error:', err);
      alert(err?.message || 'Failed to create order via bank wire. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isAuthenticated) {
    return (
      <PageWrapper>
        <SignInRequiredBox>
          <div className="lock-icon">
            <Lock size={32} />
          </div>
          <h2>CLIENT SIGN-IN REQUIRED TO PLACE ORDER</h2>
          <p>
            To ensure lifetime warranty coverage, diamond authenticity certificates, and secure white-glove order tracking, please sign in to your AethelCarats account or create one before proceeding.
          </p>
          <button type="button" onClick={() => openAuthModal('signin')}>
            SIGN IN / REGISTER TO CHECKOUT
          </button>
        </SignInRequiredBox>
      </PageWrapper>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('paypal-button-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (completedOrder) {
    return (
      <PageWrapper>
        <ConfirmationBox>
          <div className="check-icon">
            <CheckCircle2 size={36} />
          </div>
          <h1>ORDER CONFIRMED</h1>
          <div className="order-no">ORDER #{completedOrder.orderNumber || 'AC-10028'}</div>
          <p>
            Thank you for choosing <strong>AethelCarats Fine Jewellery Atelier</strong>. Your order has been registered and assigned to our master jewelers. A formal invoice and tracking schedule have been dispatched to <strong>{completedOrder.customerEmail || formData.email}</strong>.
          </p>

          {completedOrder.notes?.includes('Bank Wire') && (
            <div
              style={{
                background: '#141414',
                border: '1px solid rgba(201, 169, 110, 0.4)',
                borderRadius: '4px',
                padding: '24px',
                margin: '24px 0',
                textAlign: 'left',
              }}
            >
              <div style={{ color: '#C9A96E', fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Landmark size={18} /> WIRE REMITTANCE INSTRUCTIONS
              </div>
              <p style={{ fontSize: '0.82rem', color: '#D8D2C5', marginBottom: '16px', lineHeight: '1.5' }}>
                Please transfer the amount of <strong>${(completedOrder.totalAmount || subtotal).toLocaleString()}</strong> referencing Order <strong>#{completedOrder.orderNumber}</strong> in your wire remarks:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.85rem', color: '#F5F1E8' }}>
                {paymentConfig.bank_name && <div><span style={{ color: '#888' }}>Bank Name:</span><br /><strong>{paymentConfig.bank_name}</strong></div>}
                {paymentConfig.bank_account_name && <div><span style={{ color: '#888' }}>Beneficiary:</span><br /><strong>{paymentConfig.bank_account_name}</strong></div>}
                {paymentConfig.bank_account_number && <div><span style={{ color: '#888' }}>Account / IBAN:</span><br /><strong>{paymentConfig.bank_account_number}</strong></div>}
                {paymentConfig.bank_swift_bic && <div><span style={{ color: '#888' }}>SWIFT / BIC:</span><br /><strong>{paymentConfig.bank_swift_bic}</strong></div>}
                {paymentConfig.bank_routing_code && <div><span style={{ color: '#888' }}>IFSC / Routing:</span><br /><strong>{paymentConfig.bank_routing_code}</strong></div>}
                {paymentConfig.bank_branch_address && <div><span style={{ color: '#888' }}>Branch:</span><br /><strong>{paymentConfig.bank_branch_address}</strong></div>}
              </div>
              {paymentConfig.bank_payment_instructions && (
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#B0A898' }}>
                  {paymentConfig.bank_payment_instructions}
                </div>
              )}
            </div>
          )}

          <div className="actions">
            <button
              onClick={() => window.print()}
              style={{
                padding: '14px 24px',
                background: '#111111',
                border: '1px solid rgba(140, 116, 75, 0.3)',
                color: '#F5F1E8',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '2px',
              }}
            >
              <Printer size={16} /> PRINT INVOICE
            </button>
            <Link
              to="/rings"
              style={{
                padding: '14px 28px',
                background: '#C9A96E',
                color: '#0B0B0B',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '2px',
              }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </ConfirmationBox>
      </PageWrapper>
    );
  }

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <ConfirmationBox>
          <h1>YOUR SHOPPING BAG IS EMPTY</h1>
          <p>Please add items to your cart before proceeding to secure white-glove checkout.</p>
          <Link
            to="/rings"
            style={{
              padding: '14px 28px',
              background: '#C9A96E',
              color: '#0B0B0B',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '2px',
            }}
          >
            EXPLORE COLLECTIONS
          </Link>
        </ConfirmationBox>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeaderBreadcrumb>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <Link to="/cart">Shopping Bag</Link>
        <ChevronRight size={12} />
        <span>Secure Checkout</span>
      </HeaderBreadcrumb>

      <form onSubmit={handleSubmitOrder}>
        <LayoutGrid>
          <CheckoutSection>
            <SectionTitle>
              SHIPPING & CLIENT DETAILS
              <span className="step">STEP 1 OF 2</span>
            </SectionTitle>

            <FormGroupGrid>
              <Field>
                <label>First Name *</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder="e.g. Victoria" />
              </Field>
              <Field>
                <label>Last Name *</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder="e.g. Sterling" />
              </Field>
              <Field $fullWidth>
                <label>Email Address (For Certificate & Tracking) *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="concierge@example.com" />
              </Field>
              <Field $fullWidth>
                <label>Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
              </Field>
              <Field $fullWidth>
                <label>Street Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Luxury Way, Suite 400" />
              </Field>
              <Field>
                <label>City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="New York / London / Surat" />
              </Field>
              <Field>
                <label>Postal / Zip Code *</label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} placeholder="10001 / 395006" />
              </Field>
            </FormGroupGrid>

            <SectionTitle style={{ marginTop: '36px' }}>
              PAYMENT METHOD
              <span className="step">STEP 2 OF 2</span>
            </SectionTitle>

            {/* Payment Method Switcher */}
            <div style={{ display: 'grid', gridTemplateColumns: paymentConfig.bank_transfer_enabled !== 'false' ? '1fr 1fr' : '1fr', gap: '14px', marginBottom: '20px' }}>
              <div
                onClick={() => setSelectedPaymentMode('paypal')}
                style={{
                  background: selectedPaymentMode === 'paypal' ? 'rgba(201, 169, 110, 0.15)' : '#111111',
                  border: selectedPaymentMode === 'paypal' ? '1.5px solid #C9A96E' : '1px solid rgba(140, 116, 75, 0.25)',
                  borderRadius: '4px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
              >
                <CreditCard size={20} color={selectedPaymentMode === 'paypal' ? '#C9A96E' : '#888'} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F5F1E8' }}>PayPal &amp; Cards</div>
                  <div style={{ fontSize: '0.72rem', color: '#999' }}>Debit, Credit, PayPal Balance</div>
                </div>
              </div>

              {paymentConfig.bank_transfer_enabled !== 'false' && (
                <div
                  onClick={() => setSelectedPaymentMode('bank_wire')}
                  style={{
                    background: selectedPaymentMode === 'bank_wire' ? 'rgba(201, 169, 110, 0.15)' : '#111111',
                    border: selectedPaymentMode === 'bank_wire' ? '1.5px solid #C9A96E' : '1px solid rgba(140, 116, 75, 0.25)',
                    borderRadius: '4px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  <Landmark size={20} color={selectedPaymentMode === 'bank_wire' ? '#C9A96E' : '#888'} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F5F1E8' }}>Direct Bank Wire</div>
                    <div style={{ fontSize: '0.72rem', color: '#999' }}>Direct Atelier Wire / SWIFT</div>
                  </div>
                </div>
              )}
            </div>

            {selectedPaymentMode === 'bank_wire' ? (
              <div
                style={{
                  background: '#111111',
                  border: '1px solid rgba(140, 116, 75, 0.35)',
                  padding: '24px',
                  borderRadius: '4px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Landmark size={22} color="#C9A96E" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F1E8' }}>Direct Bank Wire Remittance</div>
                      <div style={{ fontSize: '0.78rem', color: '#A8A8A8' }}>Safe &amp; Verified Wire Transfer for Fine Jewellery</div>
                    </div>
                  </div>
                  <ShieldCheck size={22} color="#C9A96E" />
                </div>

                <p style={{ fontSize: '0.82rem', color: '#D8D2C5', lineHeight: '1.5', marginBottom: '16px' }}>
                  Place your order now. You will receive an official Atelier invoice with these banking details to initiate payment directly from your bank:
                </p>

                <div
                  style={{
                    background: '#151515',
                    border: '1px solid rgba(201, 169, 110, 0.25)',
                    borderRadius: '4px',
                    padding: '16px',
                    marginBottom: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '0.82rem',
                  }}
                >
                  {paymentConfig.bank_name && (
                    <div>
                      <span style={{ color: '#888', fontSize: '0.72rem', textTransform: 'uppercase' }}>Bank Name</span>
                      <div style={{ color: '#F5F1E8', fontWeight: 600 }}>{paymentConfig.bank_name}</div>
                    </div>
                  )}
                  {paymentConfig.bank_account_name && (
                    <div>
                      <span style={{ color: '#888', fontSize: '0.72rem', textTransform: 'uppercase' }}>Beneficiary</span>
                      <div style={{ color: '#F5F1E8', fontWeight: 600 }}>{paymentConfig.bank_account_name}</div>
                    </div>
                  )}
                  {paymentConfig.bank_account_number && (
                    <div>
                      <span style={{ color: '#888', fontSize: '0.72rem', textTransform: 'uppercase' }}>Account / IBAN</span>
                      <div style={{ color: '#F5F1E8', fontWeight: 600 }}>{paymentConfig.bank_account_number}</div>
                    </div>
                  )}
                  {paymentConfig.bank_swift_bic && (
                    <div>
                      <span style={{ color: '#888', fontSize: '0.72rem', textTransform: 'uppercase' }}>SWIFT / BIC</span>
                      <div style={{ color: '#F5F1E8', fontWeight: 600 }}>{paymentConfig.bank_swift_bic}</div>
                    </div>
                  )}
                  {paymentConfig.bank_routing_code && (
                    <div>
                      <span style={{ color: '#888', fontSize: '0.72rem', textTransform: 'uppercase' }}>IFSC / Routing</span>
                      <div style={{ color: '#F5F1E8', fontWeight: 600 }}>{paymentConfig.bank_routing_code}</div>
                    </div>
                  )}
                </div>

                {paymentConfig.bank_payment_instructions && (
                  <p style={{ fontSize: '0.78rem', color: '#B0A898', marginBottom: '20px', fontStyle: 'italic' }}>
                    Note: {paymentConfig.bank_payment_instructions}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleBankWireOrder}
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#C9A96E',
                    color: '#0B0B0B',
                    border: 'none',
                    borderRadius: '2px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  {submitting ? 'PROCESSING ORDER...' : `CONFIRM ORDER VIA BANK WIRE ($${subtotal.toLocaleString()})`}
                </button>
              </div>
            ) : (
              <div
                id="paypal-button-container"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(140, 116, 75, 0.35)',
                  padding: '24px',
                  borderRadius: '4px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        background: '#003087',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontStyle: 'italic',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Pay<span style={{ color: '#0079C1' }}>Pal</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F1E8' }}>PayPal Express Checkout</div>
                      <div style={{ fontSize: '0.78rem', color: '#A8A8A8' }}>Buyer Protection &amp; 256-Bit SSL Encrypted</div>
                    </div>
                  </div>
                  <ShieldCheck size={24} color="#C9A96E" />
                </div>

                <p style={{ fontSize: '0.85rem', color: '#D8D2C5', lineHeight: '1.5', marginBottom: '16px' }}>
                  Complete your order securely via <strong>PayPal Express Checkout</strong>. Accepts PayPal Balance, Debit Cards, and Credit Cards worldwide.
                </p>

                {paypalClientId ? (
                  <div style={{ marginTop: 12 }}>
                    <PayPalScriptProvider
                      options={{
                        clientId: paypalClientId,
                        currency: 'USD',
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                        disabled={submitting}
                        createOrder={async () => {
                          const clientEmail = formData.email || user?.email || 'client@aethelcarats.com';
                          try {
                            const paypalRes = await api.createPayPalOrder({
                              amount: subtotal,
                              currency: 'USD',
                              description: `AethelCarats Order for ${clientEmail}`,
                            });
                            if (!paypalRes?.id) {
                              throw new Error('PayPal payment initialization failed. Please try again.');
                            }
                            return paypalRes.id;
                          } catch (err: any) {
                            console.error('createPayPalOrder error:', err);
                            throw err;
                          }
                        }}
                        onApprove={async (data) => {
                          setSubmitting(true);
                          try {
                            const finalName = `${formData.firstName} ${formData.lastName}`.trim() || user?.name || 'Valued Client';
                            const finalEmail = formData.email || user?.email || 'client@aethelcarats.com';
                            const finalAddress = formData.address
                              ? `${formData.address}, ${formData.city || ''}, ${formData.postalCode || ''}, ${formData.country || 'USA'}`
                              : 'PayPal Verified Shipping Address';

                            const orderPayload = {
                              customerName: finalName,
                              customerEmail: finalEmail,
                              customerPhone: formData.phone || '',
                              shippingAddress: finalAddress,
                              items: cartItems.map((item: any) => ({
                                productId: item.id || item.productId,
                                productName: item.productName || item.product?.title || item.title || 'Handcrafted Jewellery Piece',
                                sku: item.sku || item.product?.sku || 'AC-PIECE',
                                variantInfo: item.selectedMetal ? `${item.selectedMetal} | Size: ${item.selectedSize || 'Standard'}` : null,
                                unitPrice: item.unitPrice || item.product?.price || 0,
                                quantity: item.quantity || 1,
                              })),
                              subtotal,
                              shippingFee: 0,
                              tax: 0,
                              discount: 0,
                              currency: 'USD',
                              notes: `Paid via PayPal Express (PayPal Order ID: ${data.orderID}). ${formData.notes || ''}`.trim(),
                            };

                            const dbOrder = await api.createPublicOrder(orderPayload);

                            await api.capturePayPalOrder({
                              paypalOrderId: data.orderID,
                              dbOrderId: dbOrder.id,
                            });

                            setCompletedOrder(dbOrder);
                            clearCart();
                          } catch (err: any) {
                            console.error('PayPal processing error:', err);
                            alert(err?.message || 'Payment approval succeeded but order recording encountered an issue.');
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                        onError={(err: any) => {
                          console.error('PayPal Button Error:', err);
                          alert('PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.');
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                ) : (
                  <div style={{ marginTop: 12, padding: 14, background: '#151515', border: '1px solid rgba(140, 116, 75, 0.3)', borderRadius: 4, textAlign: 'center', fontSize: '0.82rem', color: '#A8A8A8' }}>
                    <Lock size={18} color="#C9A96E" style={{ marginBottom: 4 }} />
                    <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F5F1E8' }}>PayPal Payment Gateway Loading</div>
                  </div>
                )}
              </div>
            )}
          </CheckoutSection>

          <SummarySidebar>
            <h3>ORDER SUMMARY</h3>
            <CartItemsSummary>
              {cartItems.map((item: any, idx: number) => (
                <CartItemMini key={idx}>
                  <img src={item.image || item.product?.images?.[0]?.url || item.diamond?.imageUrl || '/assets/diamonds/Round.svg'} alt={item.productName} />
                  <div className="info">
                    <div className="title">{item.productName || item.product?.title || 'Handcrafted Ring'}</div>
                    <div className="meta">
                      Qty: {item.quantity || 1} {item.selectedMetal ? `• ${item.selectedMetal}` : ''}
                    </div>
                  </div>
                  <div className="price">${((item.unitPrice || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</div>
                </CartItemMini>
              ))}
            </CartItemsSummary>

            <TotalBreakdown>
              <div className="row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="row">
                <span>Insured Express Shipping</span>
                <span style={{ color: '#C9A96E', fontWeight: 600 }}>COMPLIMENTARY</span>
              </div>
              <div className="row total">
                <span>Total Due</span>
                <span className="amount">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </TotalBreakdown>

            {paypalClientId ? (
              <div style={{ marginTop: 20 }}>
                <PayPalScriptProvider
                  options={{
                    clientId: paypalClientId,
                    currency: 'USD',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                    disabled={submitting}
                    createOrder={async () => {
                      const clientEmail = formData.email || user?.email || 'client@aethelcarats.com';
                      try {
                        const paypalRes = await api.createPayPalOrder({
                          amount: subtotal,
                          currency: 'USD',
                          description: `AethelCarats Order for ${clientEmail}`,
                        });
                        if (!paypalRes?.id) {
                          throw new Error('PayPal payment initialization failed. Please try again.');
                        }
                        return paypalRes.id;
                      } catch (err: any) {
                        console.error('createPayPalOrder error:', err);
                        throw err;
                      }
                    }}
                    onApprove={async (data) => {
                      setSubmitting(true);
                      try {
                        const finalName = `${formData.firstName} ${formData.lastName}`.trim() || user?.name || 'Valued Client';
                        const finalEmail = formData.email || user?.email || 'client@aethelcarats.com';
                        const finalAddress = formData.address
                          ? `${formData.address}, ${formData.city || ''}, ${formData.postalCode || ''}, ${formData.country || 'USA'}`
                          : 'PayPal Verified Shipping Address';

                        const orderPayload = {
                          customerName: finalName,
                          customerEmail: finalEmail,
                          customerPhone: formData.phone || '',
                          shippingAddress: finalAddress,
                          items: cartItems.map((item: any) => ({
                            productId: item.id || item.productId,
                            productName: item.productName || item.product?.title || item.title || 'Handcrafted Jewellery Piece',
                            sku: item.sku || item.product?.sku || 'AC-PIECE',
                            variantInfo: item.selectedMetal ? `${item.selectedMetal} | Size: ${item.selectedSize || 'Standard'}` : null,
                            unitPrice: item.unitPrice || item.product?.price || 0,
                            quantity: item.quantity || 1,
                          })),
                          subtotal,
                          shippingFee: 0,
                          tax: 0,
                          discount: 0,
                          currency: 'USD',
                          notes: `Paid via PayPal Express (PayPal Order ID: ${data.orderID}). ${formData.notes || ''}`.trim(),
                        };

                        const dbOrder = await api.createPublicOrder(orderPayload);

                        await api.capturePayPalOrder({
                          paypalOrderId: data.orderID,
                          dbOrderId: dbOrder.id,
                        });

                        setCompletedOrder(dbOrder);
                        clearCart();
                      } catch (err: any) {
                        console.error('PayPal processing error:', err);
                        alert(err?.message || 'Payment approval succeeded but order recording encountered an issue.');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    onError={(err: any) => {
                      console.error('PayPal Button Error:', err);
                      alert('PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.');
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <div style={{ marginTop: 20, padding: 16, background: '#111111', border: '1px solid rgba(140, 116, 75, 0.3)', borderRadius: 4, textAlign: 'center', fontSize: '0.82rem', color: '#A8A8A8' }}>
                <Lock size={18} color="#C9A96E" style={{ marginBottom: 6 }} />
                <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F5F1E8' }}>PayPal Payment Gateway</div>
                <div style={{ fontSize: '0.75rem', color: '#A8A8A8', marginTop: 4 }}>
                  Please configure PayPal credentials in Admin Settings.
                </div>
              </div>
            )}

            <SecurityGuaranteeBadge>
              <ShieldCheck size={16} /> 256-Bit SSL Encrypted & Fully Insured Transit
            </SecurityGuaranteeBadge>
          </SummarySidebar>
        </LayoutGrid>
      </form>
    </PageWrapper>
  );
};
