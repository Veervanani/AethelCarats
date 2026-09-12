import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Heart, ShoppingBag, Eye, Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(24, 23, 21, 0.76);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
  animation: backdropFadeIn 0.3s ease-out;

  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 12px 10px;
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(31, 31, 31, 0.22), 0 0 0 1px rgba(201, 164, 92, 0.25);
  overflow: hidden;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalScaleUp {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(16px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-height: 92vh;
    border-radius: 12px 12px 0 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: #1f1f1f;
    color: #C9A96E;
    border-color: #C9A96E;
  }
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: auto;
  max-height: 90vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGallerySection = styled.div`
  background-color: #0B0B0B;
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-right: 1px solid rgba(140, 116, 75, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    border-right: none;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  }

  .main-img-box {
    width: 100%;
    aspect-ratio: 1;
    max-height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 16px;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .thumbs-row {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;

    .thumb {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      border: 1px solid rgba(140, 116, 75, 0.25);
      cursor: pointer;
      overflow: hidden;
      background: #111111;
      transition: all 0.2s ease;

      &.active {
        border-color: #C9A96E;
        box-shadow: 0 0 0 2px rgba(201, 164, 92, 0.3);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const InfoSection = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 20px 18px 28px;
  }

  .brand-badge {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 8px;
  }

  h2 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #F5F1E8;
    line-height: 1.3;
    margin: 0 0 12px 0;

    @media (max-width: 768px) {
      font-size: 1.35rem;
    }
  }

  .price-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    .price {
      font-size: 1.4rem;
      font-weight: 700;
      color: #F5F1E8;

      &.sale {
        color: #d93838;
      }
    }

    .compare {
      font-size: 1.0rem;
      color: #999388;
      text-decoration: line-through;
    }

    .sale-tag {
      background: #d93838;
      color: #ffffff;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 2px;
      letter-spacing: 0.08em;
    }
  }
`;

const OptionGroup = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 8px;

    span {
      color: #C9A96E;
      font-weight: 600;
      margin-left: 4px;
    }
  }
`;

const MetalsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MetalPill = styled.button<{ $active: boolean }>`
  padding: 7px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  background-color: ${({ $active }) => ($active ? '#C9A96E' : '#111111')};
  color: ${({ $active }) => ($active ? '#0B0B0B' : '#D8D2C5')};
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #C9A96E;
    color: ${({ $active }) => ($active ? '#0B0B0B' : '#F5F1E8')};
  }
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 10px 14px;
  font-size: 0.88rem;
  color: #F5F1E8;
  background: #0B0B0B;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  outline: none;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    border-color: #C9A96E;
  }
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .qty-picker {
    display: flex;
    align-items: center;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 4px;
    background: #0B0B0B;

    button {
      background: none;
      border: none;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #F5F1E8;

      &:hover {
        background: #1f1f1f;
        color: #C9A96E;
      }
    }

    span {
      padding: 0 12px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #F5F1E8;
      min-width: 24px;
      text-align: center;
    }
  }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .add-bag-btn {
    width: 100%;
    padding: 14px;
    background-color: #C9A96E;
    color: #0B0B0B;
    border: 1px solid #C9A96E;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #DFBA73;
      border-color: #DFBA73;
      color: #0B0B0B;
    }
  }

  .full-details-btn {
    width: 100%;
    padding: 12px;
    background-color: transparent;
    color: #F5F1E8;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #C9A96E;
      color: #C9A96E;
      background: #0B0B0B;
    }
  }
`;

const METAL_OPTIONS = [
  '14K Yellow Gold',
  '14K White Gold',
  '14K Rose Gold',
  '18K Yellow Gold',
  '18K White Gold',
  'Platinum',
];

const RING_SIZES = [
  'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5',
  'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5',
  'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12',
];

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct: product, closeQuickView } = useQuickView();
  const cartCtx = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('14K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState('US 6.5');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImgIdx(0);
      setSelectedMetal(product.metal || '14K Yellow Gold');
      setSelectedSize('US 6.5');
      setQuantity(1);
      setAddedToast(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) closeQuickView();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, closeQuickView]);

  if (!product) return null;

  const imagesList: string[] = [];
  if (product.primaryImage) imagesList.push(product.primaryImage);
  if (product.mainImage && product.mainImage !== product.primaryImage) imagesList.push(product.mainImage);
  if (product.secondaryImage) imagesList.push(product.secondaryImage);
  if (Array.isArray(product.images)) {
    product.images.forEach((img: any) => {
      const url = typeof img === 'string' ? img : img?.url;
      if (url && !imagesList.includes(url)) imagesList.push(url);
    });
  }
  if (imagesList.length === 0) imagesList.push('');

  const currentPrice = product.salePrice && product.onSale ? product.salePrice : (product.price || 0);
  const comparePrice = product.comparePrice;

  const handleAddToCart = () => {
    if (cartCtx?.addToCart) {
      cartCtx.addToCart(product, quantity, selectedMetal, selectedSize);
    }
    showToast(`"${product.name}" added to your shopping bag!`);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      closeQuickView();
    }, 1200);
  };

  const handleViewFullProduct = () => {
    closeQuickView();
    navigate(`/product/${product.slug || product.id}`);
  };

  return (
    <Overlay $isOpen={!!product} onClick={closeQuickView}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeQuickView} aria-label="Close Quick View">
          <X size={20} />
        </CloseButton>

        <ModalContent>
          <ImageGallerySection>
            <div className="main-img-box">
              <img
                src={imagesList[activeImgIdx] || imagesList[0]}
                alt={product.name}
                onError={(e: any) => { e.target.src = '/assets/gem_rings_cat.png'; }}
              />
            </div>

            {imagesList.length > 1 && (
              <div className="thumbs-row">
                {imagesList.map((src, idx) => (
                  <div
                    key={idx}
                    className={`thumb ${activeImgIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveImgIdx(idx)}
                  >
                    <img src={src} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </ImageGallerySection>

          <InfoSection>
            <div>
              <div className="brand-badge">AETHELCARATS FINE JEWELLERY ATELIER</div>
              <h2>{product.name}</h2>

              <div className="price-row">
                <span className={`price ${product.onSale ? 'sale' : ''}`}>
                  ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {Boolean(product.onSale && comparePrice && Number(comparePrice) > Number(currentPrice)) && (
                  <span className="compare">
                    ${Number(comparePrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
                {Boolean(product.onSale) && <span className="sale-tag">ON SALE</span>}
              </div>

              <OptionGroup>
                <label>
                  Metal Type: <span>{selectedMetal}</span>
                </label>
                <MetalsGrid>
                  {METAL_OPTIONS.map((m) => (
                    <MetalPill
                      key={m}
                      $active={selectedMetal === m}
                      onClick={() => setSelectedMetal(m)}
                    >
                      {m}
                    </MetalPill>
                  ))}
                </MetalsGrid>
              </OptionGroup>

              <OptionGroup>
                <label>Ring Size (US):</label>
                <SelectBox
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {RING_SIZES.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </SelectBox>
              </OptionGroup>

              <OptionGroup>
                <label>Quantity:</label>
                <QuantityRow>
                  <div className="qty-picker">
                    <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                      <Minus size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </QuantityRow>
              </OptionGroup>
            </div>

            <ActionButtonsGroup>
              <button className="add-bag-btn" onClick={handleAddToCart} disabled={addedToast}>
                {addedToast ? (
                  <>
                    <Check size={16} /> ADDED TO BAG!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> ADD TO BAG • ${(currentPrice * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </>
                )}
              </button>

              <button className="full-details-btn" onClick={handleViewFullProduct}>
                VIEW FULL DETAILS <ArrowRight size={14} />
              </button>
            </ActionButtonsGroup>
          </InfoSection>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};
