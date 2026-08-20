import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingBag, Trash2, ArrowRight, Plus, Minus, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const TitleHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #6b6b6b;
  }
`;

const EmptyStateContainer = styled.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.04);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: #faf5eb;
    display: flex;
    align-items: center;
    justify-content: center;
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
`;

const CategoryButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  color: #1f1f1f;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartItemRow = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 14px;
    padding: 14px;
  }

  .img-box-link {
    width: 105px;
    height: 105px;
    background: #faf8f5;
    border: 1px solid #f0eae1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: #c9a45c;
      transform: scale(1.02);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 600px) {
      width: 95px;
      height: 95px;
    }
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    .name-link {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #1f1f1f;
      text-decoration: none;
      line-height: 1.3;
      transition: color 0.2s ease;
      margin-bottom: 2px;

      &:hover {
        color: #c9a45c;
      }

      @media (max-width: 600px) {
        font-size: 1.0rem;
        line-height: 1.25;
      }
    }

    .meta-text {
      font-size: 0.76rem;
      color: #66635d;
      line-height: 1.35;

      @media (max-width: 600px) {
        font-size: 0.72rem;
      }
    }

    .price {
      font-size: 1.08rem;
      font-weight: 700;
      color: #1f1f1f;
      margin-top: 4px;

      @media (max-width: 600px) {
        font-size: 0.98rem;
      }
    }
  }

  .cart-item-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;

    @media (max-width: 600px) {
      grid-column: 1 / -1;
      width: 100%;
      justify-content: space-between;
      border-top: 1px solid #f2ede4;
      padding-top: 10px;
      margin-top: 2px;
      margin-left: 0;
    }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #d9d3c7;
    background: #faf8f5;
    border-radius: 4px;

    button {
      background: none;
      border: none;
      padding: 8px 12px;
      min-width: 36px;
      height: 36px;
      cursor: pointer;
      color: #1f1f1f;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease;

      &:hover {
        background: #f0e9dc;
      }
    }

    span {
      padding: 0 12px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #1f1f1f;
      min-width: 24px;
      text-align: center;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease;

    &:hover {
      color: #d9534f;
    }
  }
`;

const SummaryCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 28px;
  height: fit-content;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    margin: 0 0 20px 0;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 12px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 12px;
    color: #4a4741;

    &.total {
      border-top: 1px solid #f2ede4;
      padding-top: 16px;
      margin-top: 16px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f1f1f;

      .amount {
        color: #c9a45c;
      }
    }
  }

  .shipping-note {
    font-size: 0.78rem;
    color: #777;
    margin-bottom: 20px;
  }
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const ContinueShoppingBtn = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 12px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #1f1f1f;
  text-decoration: none;

  &:hover {
    color: #c9a45c;
  }
`;

export const CartPage: React.FC = () => {
  const cartCtx = useCart();
  const cartItems = cartCtx?.cartItems || [];
  const updateQuantity = cartCtx?.updateQuantity || (() => {});
  const removeFromCart = cartCtx?.removeFromCart || (() => {});

  const [holidayStatus, setHolidayStatus] = useState<any>(null);

  useEffect(() => {
    api.getHolidayModeStatus().then(setHolidayStatus).catch(console.error);
  }, []);

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.unitPrice || item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const navigate = useNavigate();

  const handleCheckoutClick = async () => {
    try {
      const status = await api.getHolidayModeStatus();
      if (status.active) {
        alert(status.message || 'Orders are temporarily unavailable while Holiday Mode is active.');
        return;
      }
      navigate('/checkout');
    } catch (err) {
      navigate('/checkout');
    }
  };

  return (
    <PageWrapper>
      <RevealContainer yOffset={35}>
        <TitleHeader>
          <h1>YOUR SHOPPING BAG</h1>
          <p>Review your curated selection of handcrafted fine jewellery</p>
        </TitleHeader>
      </RevealContainer>

      {cartItems.length === 0 ? (
        <RevealContainer yOffset={35}>
          <EmptyStateContainer>
            <div className="icon-wrapper">
              <ShoppingBag size={32} color="#C9A45C" />
            </div>
            <h2>YOUR BAG IS EMPTY</h2>
            <p>Explore our timeless collections of solitaire rings, necklaces, bracelets, and certified loose diamonds.</p>

            <CategoryButtonsGrid>
              <CategoryBtn to="/rings">
                RINGS <ArrowRight size={14} />
              </CategoryBtn>
              <CategoryBtn to="/earrings">
                EARRINGS <ArrowRight size={14} />
              </CategoryBtn>
              <CategoryBtn to="/necklaces">
                NECKLACES <ArrowRight size={14} />
              </CategoryBtn>
              <CategoryBtn to="/bracelets">
                BRACELETS <ArrowRight size={14} />
              </CategoryBtn>
              <CategoryBtn to="/diamonds?type=NATURAL">
                DIAMONDS <ArrowRight size={14} />
              </CategoryBtn>
              <CategoryBtn to="/diamonds?type=LAB_GROWN">
                LAB-GROWN DIAMONDS <ArrowRight size={14} />
              </CategoryBtn>
            </CategoryButtonsGrid>

            <div style={{ marginTop: 28, background: '#faf5eb', border: '1px solid #c9a45c', padding: '16px 20px', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.88rem', color: '#1f1f1f', fontWeight: 600 }}>Already placed an order?</span>
              <Link to="/account" style={{ color: '#c9a45c', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>
                View My Orders & Track Live Shipments →
              </Link>
            </div>
          </EmptyStateContainer>
        </RevealContainer>
      ) : (
        <CartLayout>
          <CartItemsList>
            {cartItems.map((item: any, idx: number) => (
              <RevealContainer key={item.id || idx} staggerIndex={idx} yOffset={25}>
                <CartItemRow>
                <Link
                  to={`/product/${item.product?.slug || item.product?.id || ''}`}
                  className="img-box-link"
                  title={`View ${item.product?.name || 'Product'} details`}
                >
                  <img
                    src={item.product?.primaryImage || item.product?.mainImage || (item.product?.images && item.product.images[0] ? item.product.images[0].url : '/assets/floksy_rings_cat.png')}
                    alt={item.product?.name || 'Product image'}
                  />
                </Link>

                <div className="details">
                  <Link
                    to={`/product/${item.product?.slug || item.product?.id || ''}`}
                    className="name-link"
                  >
                    {item.product?.name}
                  </Link>
                  <div className="meta-text">SKU: {item.product?.sku || 'FJ-JW-001'}</div>
                  {item.selectedMetal && <div className="meta-text">Metal: {item.selectedMetal}</div>}
                  {item.selectedSize && item.selectedSize !== 'Select' && <div className="meta-text">Ring Size: {item.selectedSize}</div>}
                  {item.engravingText && <div className="meta-text">Engraving: "{item.engravingText}"</div>}
                  {item.customOptions && Object.keys(item.customOptions).length > 0 && (
                    <div className="meta-text" style={{ marginTop: 2 }}>
                      {Object.entries(item.customOptions).map(([key, val]: any) => (
                        <div key={key}>
                          <strong>{key}:</strong> {val.value} {val.priceAdjustment > 0 ? `(+$${val.priceAdjustment})` : ''}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="price">${(item.unitPrice || item.product?.price || 0).toLocaleString()}</div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button type="button" onClick={() => updateQuantity(idx, -1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(idx, 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>

                  <button type="button" className="delete-btn" onClick={() => removeFromCart(idx)} title="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              </CartItemRow>
            </RevealContainer>
          ))}
        </CartItemsList>

        <RevealContainer yOffset={35}>
          <SummaryCard>
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Insured Express Shipping</span>
              <span style={{ color: '#388E3C', fontWeight: 600 }}>COMPLIMENTARY</span>
            </div>
            <p className="shipping-note">Includes white-glove packaging & full transit insurance.</p>

            <div className="summary-row total">
              <span>Estimated Total</span>
              <span className="amount">${subtotal.toLocaleString()}</span>
            </div>

            {holidayStatus?.active ? (
              <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', padding: 16, marginTop: 16, textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#9b2c2c', letterSpacing: '0.08em' }}>ORDERS TEMPORARILY UNAVAILABLE</h4>
                <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                  {holidayStatus.message || "We are currently taking a short holiday break. Checkout and ordering services are temporarily unavailable."}
                </p>
                <ContinueShoppingBtn to="/rings">CONTINUE BROWSING CATALOG</ContinueShoppingBtn>
              </div>
            ) : (
              <>
                <CheckoutBtn onClick={handleCheckoutClick}>
                  <Lock size={16} /> SECURE CHECKOUT
                </CheckoutBtn>
                <ContinueShoppingBtn to="/rings">CONTINUE SHOPPING</ContinueShoppingBtn>
              </>
            )}
          </SummaryCard>
        </RevealContainer>
      </CartLayout>
      )}
    </PageWrapper>
  );
};
