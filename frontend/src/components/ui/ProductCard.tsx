import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { SafeImage } from './SafeImage';
import { useWishlist } from '../../context/WishlistContext';
import { useQuickView } from '../../context/QuickViewContext';

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.2);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  position: relative;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    border-color: #C9A96E;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(201, 169, 110, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #0B0B0B;
  user-select: none;
`;

const PrimaryImg = styled.div<{ $isHovered: boolean; $activeIdx: number }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $activeIdx, $isHovered }) => ($activeIdx === 1 ? 0 : $isHovered ? 0 : 1)};
  transform: scale(${({ $isHovered }) => ($isHovered ? 1.04 : 1)});
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const SecondaryImg = styled.div<{ $isHovered: boolean; $activeIdx: number }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $activeIdx, $isHovered }) => ($activeIdx === 1 ? 1 : $isHovered ? 1 : 0)};
  transform: scale(${({ $isHovered }) => ($isHovered ? 1.04 : 1)});
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BadgeRow = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 3;

  @media (max-width: 576px) {
    top: 6px;
    left: 6px;
  }
`;

const MetalBadge = styled.span`
  background-color: rgba(11, 11, 11, 0.88);
  color: #C9A96E;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 9px;
  font-weight: 600;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 2px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 576px) {
    font-size: 0.58rem;
    padding: 3px 6px;
    letter-spacing: 0.1em;
  }
`;

const WishlistButton = styled.button<{ $isLiked?: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(21, 21, 21, 0.88);
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: ${({ $isLiked }) => ($isLiked ? '#E53E3E' : '#F5F1E8')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: #0B0B0B;
    color: #C9A96E;
    border-color: #C9A96E;
    transform: scale(1.08);
  }

  @media (max-width: 576px) {
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const QuickViewOverlayBtn = styled.button<{ $isHovered?: boolean }>`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translate(-50%, 14px);
  width: 84%;
  padding: 9px 14px;
  background-color: #C9A96E;
  color: #0B0B0B;
  border: none;
  border-radius: 30px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 6;
  opacity: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;

  ${CardContainer}:hover & {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  &:hover {
    background-color: #DFCA9B;
    box-shadow: 0 10px 28px rgba(201, 169, 110, 0.4);
  }

  @media (max-width: 1024px) {
    opacity: ${({ $isHovered }) => ($isHovered ? 0.96 : 0)};
    transform: ${({ $isHovered }) => ($isHovered ? 'translate(-50%, 0)' : 'translate(-50%, 12px)')};
    pointer-events: ${({ $isHovered }) => ($isHovered ? 'auto' : 'none')};
    width: 88%;
    padding: 7px 10px;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    bottom: 8px;

    ${CardContainer}:active &, ${CardContainer}:focus & {
      opacity: 0.96;
      transform: translate(-50%, 0);
      pointer-events: auto;
    }
  }
`;

const MobileImageDots = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 4;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const Dot = styled.span<{ $active: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#C9A96E' : 'rgba(255, 255, 255, 0.4)')};
  border: 1px solid rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s ease;
`;

const ContentArea = styled.div`
  padding: 16px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
  background: #151515;

  @media (max-width: 576px) {
    padding: 10px 8px 12px;
  }
`;

const Title = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #F5F1E8;
  margin-bottom: 6px;
  line-height: 1.3;
  letter-spacing: 0.02em;
  min-height: 2.6em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s ease;

  ${CardContainer}:hover & {
    color: #C9A96E;
  }

  @media (max-width: 576px) {
    font-size: 0.95rem;
    line-height: 1.25;
    min-height: 2.5em;
    margin-bottom: 4px;
  }

  @media (max-width: 360px) {
    font-size: 0.88rem;
  }
`;

const SpecsText = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  color: #A8A8A8;
  margin-bottom: 10px;

  @media (max-width: 576px) {
    font-size: 0.7rem;
    margin-bottom: 6px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  width: 100%;

  .price {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #C9A96E;
    letter-spacing: 0.01em;
    white-space: nowrap;

    @media (max-width: 576px) {
      font-size: 0.92rem;
    }

    @media (max-width: 360px) {
      font-size: 0.85rem;
    }
  }

  .compare {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: #777777;
    text-decoration: line-through;
    white-space: nowrap;

    @media (max-width: 576px) {
      font-size: 0.75rem;
    }

    @media (max-width: 360px) {
      font-size: 0.7rem;
    }
  }
`;

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isLiked = isInWishlist(product.id);

  // Strict Product Image Isolation & Resolution (Requirements #7 & #8)
  const candidateImages: string[] = [];

  if (Array.isArray(product.images) && product.images.length > 0) {
    const sorted = [...product.images].sort((a: any, b: any) => (a?.position ?? 0) - (b?.position ?? 0));
    sorted.forEach((img: any) => {
      const url = typeof img === 'string' ? img : img?.url;
      if (url && typeof url === 'string' && url.trim() !== '') {
        candidateImages.push(url.trim());
      }
    });
  }

  if (product.primaryImage && typeof product.primaryImage === 'string') candidateImages.push(product.primaryImage.trim());
  if (product.mainImage && typeof product.mainImage === 'string') candidateImages.push(product.mainImage.trim());
  if (product.secondaryImage && typeof product.secondaryImage === 'string') candidateImages.push(product.secondaryImage.trim());

  const realCustomImages = candidateImages.filter(
    (u) => u && !u.includes('gem_rings_cat.png') && !u.includes('gem_rings_cat_2.png')
  );

  const cleanUniqueCustom = Array.from(new Set(realCustomImages));
  const cleanUniqueAll = Array.from(new Set(candidateImages.filter(Boolean)));

  const primarySrc =
    cleanUniqueCustom[0] ||
    cleanUniqueAll[0] ||
    '';

  const secondarySrc =
    cleanUniqueCustom[1] ||
    (cleanUniqueAll[1] && cleanUniqueAll[1] !== primarySrc ? cleanUniqueAll[1] : null) ||
    null;

  const hasSecondary = Boolean(secondarySrc && secondarySrc !== primarySrc);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleImageTouchToggle = (e: React.MouseEvent | React.TouchEvent) => {
    if (hasSecondary) {
      setActiveImageIdx((prev) => (prev === 0 ? 1 : 0));
    }
  };

  const productSlug = product.slug || product.id;
  const productPath = `/product/${productSlug}`;

  return (
    <CardContainer
      to={productPath}
      data-testid="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <ImageWrapper onClick={handleImageTouchToggle}>
        <PrimaryImg $isHovered={isHovered && hasSecondary} $activeIdx={activeImageIdx}>
          <SafeImage src={primarySrc} alt={product.name} loading="lazy" width="400" height="400" />
        </PrimaryImg>

        {hasSecondary && (
          <SecondaryImg $isHovered={isHovered} $activeIdx={activeImageIdx}>
            <SafeImage src={secondarySrc!} alt={`${product.name} alternate view`} loading="lazy" width="400" height="400" />
          </SecondaryImg>
        )}

        <BadgeRow>
          {Boolean(product.onSale || product.salePrice) && (
            <MetalBadge style={{ backgroundColor: '#d93838', color: '#ffffff', borderColor: '#d93838', fontWeight: 700 }}>
              🏷️ ON SALE
            </MetalBadge>
          )}
          {product.metal && <MetalBadge>{product.metal}</MetalBadge>}
        </BadgeRow>

        <WishlistButton
          $isLiked={isLiked}
          onClick={handleWishlistToggle}
          title="Add to Wishlist"
          aria-label="Add to Wishlist"
        >
          <Heart size={16} fill={isLiked ? '#d93838' : 'none'} />
        </WishlistButton>

        <QuickViewOverlayBtn
          $isHovered={isHovered}
          onClick={(e) => openQuickView(product, e)}
          title="Quick View Product Details"
          aria-label="Quick View Product Details"
        >
          <Eye size={14} /> QUICK VIEW
        </QuickViewOverlayBtn>

        {hasSecondary && (
          <MobileImageDots>
            <Dot $active={activeImageIdx === 0} />
            <Dot $active={activeImageIdx === 1} />
          </MobileImageDots>
        )}
      </ImageWrapper>

      <ContentArea>
        <Title>{product.name}</Title>
        {(product.carat || product.shape) && (
          <SpecsText>
            {product.carat ? `${product.carat}ct ` : ''}
            {product.shape || 'Brilliant'}
            {product.color ? ` • ${product.color}` : ''}
            {product.clarity ? ` / ${product.clarity}` : ''}
          </SpecsText>
        )}
        <PriceRow>
          <span className="price" style={{ color: Boolean(product.onSale && product.salePrice) ? '#E53E3E' : '#C9A96E', fontWeight: 700 }}>
            ${(product.salePrice && product.onSale ? product.salePrice : (product.price || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          {Boolean(product.onSale && product.comparePrice && Number(product.comparePrice) > Number(product.salePrice || product.price || 0)) && (
            <span className="compare">
              ${Number(product.comparePrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </PriceRow>
      </ContentArea>
    </CardContainer>
  );
};
