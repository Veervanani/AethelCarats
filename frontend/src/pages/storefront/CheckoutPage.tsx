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
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const SignInRequiredBox = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(31, 31, 31, 0.06);

  .lock-icon {
    width: 64px;
    height: 64px;
    background: #faf5eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #c9a45c;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.08em;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  button {
    padding: 16px 36px;
    background: #1f1f1f;
    color: #ffffff;
    border: none;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #c9a45c;
    }
  }
`;

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  background-color: #f9f7f2;
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
  color: #77736c;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  a {
    color: #1f1f1f;
    text-decoration: none;
    &:hover {
      color: #c9a45c;
    }
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
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  @media (max-width: 576px) {
    padding: 20px 16px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2ede4;
  padding-bottom: 12px;

  span.step {
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    color: #c9a45c;
    font-weight: 600;
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
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #33312e;
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #1f1f1f;
    background: #faf8f5;
    border: 1px solid #d9d3c7;
    outline: none;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.12);
    }
  }
`;

const PaymentTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentTabBtn = styled.button<{ $active: boolean }>`
  padding: 14px 12px;
  background: ${({ $active }) => ($active ? '#faf5eb' : '#ffffff')};
  border: 1.5px solid ${({ $active }) => ($active ? '#c9a45c' : '#e8e3d9')};
  color: ${({ $active }) => ($active ? '#1f1f1f' : '#6b6b6b')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: ${({ $active }) => ($active ? '#c9a45c' : '#77736c')};
  }

  &:hover {
    border-color: #c9a45c;
  }
`;

const SummarySidebar = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 32px 24px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2ede4;
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
    background: #faf8f5;
    border: 1px solid #e8e3d9;
  }

  .info {
    flex: 1;
    .title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #1f1f1f;
      line-height: 1.3;
    }
    .meta {
      font-size: 0.75rem;
      color: #77736c;
      margin-top: 2px;
    }
  }

  .price {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f1f1f;
  }
`;

const TotalBreakdown = styled.div`
  border-top: 1px solid #f2ede4;
  padding-top: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: #55524d;
    margin-bottom: 10px;

    &.total {
      border-top: 1px dashed #d9d3c7;
      padding-top: 14px;
      margin-top: 14px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #1f1f1f;

      .amount {
        color: #c9a45c;
      }
    }
  }
`;

const PlaceOrderBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: #1f1f1f;
  color: #ffffff;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
  }

  &:disabled {
    background: #a39e93;
    cursor: not-allowed;
  }
`;

const SecurityGuaranteeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.78rem;
  color: #77736c;

  svg {
    color: #388e3c;
  }
`;

const ConfirmationBox = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(31, 31, 31, 0.06);

  .check-icon {
    width: 64px;
    height: 64px;
    background: #faf5eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #c9a45c;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    letter-spacing: 0.08em;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .order-no {
    font-family: monospace;
    font-size: 1.1rem;
    background: #faf8f5;
    border: 1px solid #e8e3d9;
    padding: 6px 16px;
    display: inline-block;
    color: #1f1f1f;
    font-weight: 700;
    margin-bottom: 24px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
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

  const [paymentMethod] = useState<'PAYPAL'>('PAYPAL');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [paypalClientId, setPaypalClientId] = useState<string>('');

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
            To ensure lifetime warranty coverage, GIA diamond authentication certificates, and secure white-glove order tracking, please sign in to your Floksy account or create one before proceeding.
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
          <div className="order-no">ORDER #{completedOrder.orderNumber || 'FJ-10028'}</div>
          <p>
            Thank you for choosing <strong>Floksy Jewel</strong>. Your order has been registered and assigned to our master jewelers. A formal white-glove invoice and tracking schedule have been dispatched to <strong>{completedOrder.customerEmail || formData.email}</strong>.
          </p>

          <div className="actions">
            <button
              onClick={() => window.print()}
              style={{
                padding: '14px 24px',
                background: '#faf8f5',
                border: '1px solid #d9d3c7',
                color: '#1f1f1f',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Printer size={16} /> PRINT INVOICE
            </button>
            <Link
              to="/rings"
              style={{
                padding: '14px 28px',
                background: '#1f1f1f',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
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
              background: '#1f1f1f',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
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
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Ring Road, Suite 400" />
              </Field>
              <Field>
                <label>City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="Surat / Mumbai / New York" />
              </Field>
              <Field>
                <label>Postal / Zip Code *</label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} placeholder="395006 / 10001" />
              </Field>
            </FormGroupGrid>

            <SectionTitle style={{ marginTop: '36px' }}>
              PAYMENT METHOD
              <span className="step">STEP 2 OF 2</span>
            </SectionTitle>

            <div
              id="paypal-button-container"
              style={{
                background: '#faf8f5',
                border: '1.5px solid #c9a45c',
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
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f1f1f' }}>PayPal Express Checkout</div>
                    <div style={{ fontSize: '0.78rem', color: '#77736c' }}>Official Buyer Protection & 256-Bit SSL Encrypted</div>
                  </div>
                </div>
                <ShieldCheck size={24} color="#388E3C" />
              </div>

              <p style={{ fontSize: '0.85rem', color: '#55524d', lineHeight: '1.5', marginBottom: '16px' }}>
                You will complete your order securely via <strong>PayPal Express Checkout</strong>. Accepts PayPal Balance, Debit Cards, and Credit Cards worldwide.
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
                        const clientEmail = formData.email || user?.email || 'client@floksyjewel.com';
                        try {
                          const paypalRes = await api.createPayPalOrder({
                            amount: subtotal,
                            currency: 'USD',
                            description: `Floksy Jewel Order for ${clientEmail}`,
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
                          const finalEmail = formData.email || user?.email || 'client@floksyjewel.com';
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
                              sku: item.sku || item.product?.sku || 'FJ-PIECE',
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
                <div style={{ marginTop: 12, padding: 14, background: '#fff', border: '1px solid #c9a45c', borderRadius: 4, textAlign: 'center', fontSize: '0.82rem', color: '#55524d' }}>
                  <Lock size={18} color="#c9a45c" style={{ marginBottom: 4 }} />
                  <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PayPal Payment Gateway Loading</div>
                </div>
              )}
            </div>
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
                <span style={{ color: '#388E3C', fontWeight: 600 }}>COMPLIMENTARY</span>
              </div>
              <div className="row total">
                <span>Total Due</span>
                <span className="amount">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </TotalBreakdown>

            {/* Smart Interactive PayPal Buttons */}
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
                      const clientEmail = formData.email || user?.email || 'client@floksyjewel.com';
                      try {
                        const paypalRes = await api.createPayPalOrder({
                          amount: subtotal,
                          currency: 'USD',
                          description: `Floksy Jewel Order for ${clientEmail}`,
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
                        const finalEmail = formData.email || user?.email || 'client@floksyjewel.com';
                        const finalAddress = formData.address
                          ? `${formData.address}, ${formData.city || ''}, ${formData.postalCode || ''}, ${formData.country || 'USA'}`
                          : 'PayPal Verified Shipping Address';

                        // 1. Create order in Prisma DB
                        const orderPayload = {
                          customerName: finalName,
                          customerEmail: finalEmail,
                          customerPhone: formData.phone || '',
                          shippingAddress: finalAddress,
                          items: cartItems.map((item: any) => ({
                            productId: item.id || item.productId,
                            productName: item.productName || item.product?.title || item.title || 'Handcrafted Jewellery Piece',
                            sku: item.sku || item.product?.sku || 'FJ-PIECE',
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

                        // 2. Capture PayPal Payment on Backend
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
              <div style={{ marginTop: 20, padding: 16, background: '#faf5eb', border: '1px solid #c9a45c', borderRadius: 4, textAlign: 'center', fontSize: '0.82rem', color: '#55524d' }}>
                <Lock size={18} color="#c9a45c" style={{ marginBottom: 6 }} />
                <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PayPal Payment Required</div>
                <div style={{ fontSize: '0.75rem', color: '#777', marginTop: 4 }}>
                  Please ensure PayPal Credentials are configured in Admin Panel (PayPal & Settings).
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
