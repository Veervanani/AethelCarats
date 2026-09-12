import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Heart,
  Truck,
  ShieldCheck,
  Award,
  ZoomIn,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { Product } from '../../types';
import { api } from '../../services/api';
import { ProductCard } from '../../components/ui/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { LuxuryImageLightbox } from '../../components/ui/LuxuryImageLightbox';
import {
  AtelierExperienceBanner,
  ItemReviewsSection,
  SimilarItemsSection,
  RecentlyViewedSection,
} from '../../components/storefront/ProductDetailExtraSections';

// ==========================================
// STYLED COMPONENTS - LAYOUT & CONTAINERS
// ==========================================

const PageOuterWrapper = styled.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 48px 80px 48px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 24px 60px 24px;
  }
  @media (max-width: 768px) {
    padding: 16px 16px 40px 16px;
  }
`;

const BreadcrumbsBar = styled.div`
  font-size: 0.78rem;
  color: #A8A8A8;
  margin-bottom: 28px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`;

const ProductMainGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 48px;
  align-items: start;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 36px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// ==========================================
// LEFT GALLERY - DESKTOP & MOBILE
// ==========================================

const DesktopImageSection = styled.div`
  width: 100%;
  min-width: 0;
  /* Removed fixed height, align-self, position sticky, and top */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopImageScrollArea = styled.div`
  width: 100%;
  /* Removed height, overflow-y: scroll, and scrollbar hiding */
  /* Now it will just flow naturally with the window scroll */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

const GalleryImageCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #0B0B0B;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(140, 116, 75, 0.25);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }

  .zoom-hint {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(21, 21, 21, 0.92);
    backdrop-filter: blur(6px);
    color: #F5F1E8;
    padding: 8px 14px;
    border-radius: 20px;
    border: 1px solid rgba(140, 116, 75, 0.3);
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &:hover .zoom-hint {
    opacity: 1;
  }
`;

const MobileGallery = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }
`;

const MobileCarouselTrack = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  border-radius: 6px;
  width: 100%;
  scrollbar-width: none;
  touch-action: pan-x pan-y;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileSlideCard = styled.div`
  flex: 0 0 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  background: #0B0B0B;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(140, 116, 75, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const MobileArrowBtn = styled.button<{ $dir: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $dir }) => ($dir === 'left' ? 'left: 10px;' : 'right: 10px;')}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(21, 21, 21, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(140, 116, 75, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F5F1E8;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;

  &:active {
    transform: translateY(-50%) scale(0.92);
  }
`;

const MobileCounterBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(21, 21, 21, 0.9);
  backdrop-filter: blur(4px);
  color: #C9A96E;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(140, 116, 75, 0.3);
`;

const MobileDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #C9A96E;
      width: 24px;
      border-radius: 4px;
    }
  }
`;

// ==========================================
// RIGHT PANEL - CONFIGURATION & DETAILS
// ==========================================

const RightConfigPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  z-index: 10;
  width: 100%;
  min-width: 0;

  @media (min-width: 769px) {
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
    align-self: start;
    height: auto;
    max-height: none;
    overflow: visible;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

const ProductHeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.2rem;
    font-weight: 500;
    color: #F5F1E8;
    margin: 0 0 8px 0;
    line-height: 1.15;
    letter-spacing: 0.02em;
  }

  .wishlist-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #A8A8A8;
    transition: color 0.2s;

    &:hover {
      color: #E53E3E;
    }

    &.active {
      color: #E53E3E;
    }
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #A8A8A8;

  .stars {
    color: #C9A96E;
    letter-spacing: 2px;
  }
`;

const PriceDisplayBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 4px;

  .current-price {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.85rem;
    font-weight: 600;
    color: #C9A96E;
    letter-spacing: -0.01em;
  }

  .compare-price {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: #777777;
    text-decoration: line-through;
  }
`;

const SectionDividerBlock = styled.div`
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
`;

const MetalHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  margin-bottom: 10px;

  .label {
    color: #A8A8A8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .value {
    color: #F5F1E8;
    font-weight: 700;
  }
`;

const MetalTilesRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const MetalPillButton = styled.button<{ $isSelected: boolean }>`
  padding: 8px 16px;
  background: ${({ $isSelected }) => ($isSelected ? 'rgba(201, 169, 110, 0.12)' : '#151515')};
  border: 1.5px solid ${({ $isSelected }) => ($isSelected ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 600;
  color: ${({ $isSelected }) => ($isSelected ? '#F5F1E8' : '#D8D2C5')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;

  &:hover {
    border-color: #C9A96E;
    color: #F5F1E8;
    background: ${({ $isSelected }) => ($isSelected ? 'rgba(201, 169, 110, 0.18)' : '#1c1c1c')};
  }
`;

const RingSizeReferenceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0;
  flex-wrap: wrap;

  .label-title {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #F5F1E8;
    letter-spacing: -0.01em;
  }

  .guide-link {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #C9A96E;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 0.15s ease;

    &:hover {
      color: #DFCA9B;
    }
  }
`;

const MinimalSelectWrapper = styled.div`
  position: relative;
  width: 155px;
`;

const MinimalSelectTrigger = styled.button`
  width: 100%;
  padding: 4px 0 6px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(140, 116, 75, 0.35);
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.9rem;
  transition: border-color 0.15s ease;

  .selected-val {
    font-weight: 600;
    color: #F5F1E8;
  }

  .placeholder-val {
    color: #A8A8A8;
    font-weight: 400;
  }

  &:hover {
    border-bottom-color: #C9A96E;
  }

  .arrow-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: #C9A96E;
  }
`;

const CustomDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.75);
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;

  .option-item {
    padding: 8px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    cursor: pointer;
    color: #F5F1E8;
    transition: background 0.15s ease;

    &:hover {
      background: #222222;
      color: #C9A96E;
    }

    &.selected {
      background: #2A241A;
      color: #C9A96E;
      font-weight: 700;
    }
  }
`;

const EngravingRow = styled.div`
  margin-bottom: 0;
`;

const EngravingToggleButton = styled.button`
  background: none;
  border: none;
  color: #F5F1E8;
  font-weight: 600;
  font-size: 0.88rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  transition: color 0.18s ease;

  &:hover {
    color: #C9A96E;

    .info-circle {
      border-color: #C9A96E;
      color: #C9A96E;
    }
  }

  .info-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #C9A96E;
    color: #C9A96E;
    font-size: 0.65rem;
    font-weight: 700;
    font-style: italic;
    line-height: 1;
    transition: all 0.18s ease;
  }
`;

const EngravingInputField = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  margin-top: 10px;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: #777777;
  }

  &:focus {
    border-color: #C9A96E;
  }
`;

const CustomOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CustomOptionLabel = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: #F5F1E8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CustomOptionInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#E53E3E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #C9A96E;
  }
`;

const CustomOptionTextarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#E53E3E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #C9A96E;
  }
`;

const CustomOptionSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#E53E3E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
`;

const OptionTilesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const OptionRectTile = styled.button<{ $isSelected: boolean }>`
  height: 44px;
  min-width: 48px;
  padding: 0 16px;
  background: #151515;
  border: ${({ $isSelected }) => ($isSelected ? '1.5px solid #C9A96E' : '1px solid rgba(140, 116, 75, 0.25)')};
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  color: ${({ $isSelected }) => ($isSelected ? '#C9A96E' : '#F5F1E8')};
  transition: all 0.15s ease;

  &:hover {
    border-color: #C9A96E;
  }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0;
`;

const MainCtaRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .qty-selector-col { display: none; }
  }
`;

const QuantitySelectorContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  height: 50px;
  background: #151515;

  button {
    background: none;
    border: none;
    width: 38px;
    height: 100%;
    cursor: pointer;
    color: #F5F1E8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;

    &:hover {
      background: #222222;
      color: #C9A96E;
    }
  }

  span {
    padding: 0 4px;
    font-weight: 700;
    font-size: 0.9rem;
    color: #F5F1E8;
    min-width: 18px;
    text-align: center;
  }
`;

const PrimaryCtaBtn = styled.button`
  width: 100%;
  height: 50px;
  background: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  &:hover {
    background: #DFCA9B;
    border-color: #DFCA9B;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(201, 169, 110, 0.3);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`;

const BuyNowCtaBtn = styled.button`
  width: 100%;
  height: 50px;
  background: transparent;
  color: #F5F1E8;
  border: 1px solid #8C744B;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:hover {
    background: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`;

const SecondaryCtaBtn = styled.button`
  width: 100%;
  height: 48px;
  background: transparent;
  color: #C9A96E;
  border: 1px solid rgba(140, 116, 75, 0.4);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #C9A96E;
    background: rgba(201, 169, 110, 0.08);
  }
`;

const BenefitsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #D8D2C5;
    font-weight: 500;
  }
`;

const AccordionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
  user-select: none;

  &:hover {
    color: #C9A96E;
  }
`;

const AccordionBody = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.6;
`;

const StickyBottomBar = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #111111;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.85);
  padding: 12px 24px;
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(110%)')};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  .sticky-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .product-info {
    display: flex;
    align-items: center;
    gap: 14px;

    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border: 1px solid rgba(140, 116, 75, 0.25);
      border-radius: 4px;
    }

    .title-price {
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #F5F1E8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 320px;
      }

      .meta-price {
        font-size: 0.85rem;
        color: #C9A96E;
        font-weight: 700;
      }
    }
  }

  .sticky-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .sticky-qty {
      display: flex;
      align-items: center;
      border: 1px solid rgba(140, 116, 75, 0.25);
      border-radius: 4px;
      height: 40px;
      background: #151515;

      button {
        background: none;
        border: none;
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        color: #F5F1E8;

        &:hover { background: #222222; }
      }

      span {
        padding: 0 8px;
        font-weight: 700;
        font-size: 0.85rem;
        color: #F5F1E8;
      }
    }

    button.sticky-btn {
      height: 40px;
      padding: 0 20px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .add-bag {
      background: #C9A96E;
      color: #0B0B0B;
      border: none;
      font-weight: 700;
      &:hover { background: #DFCA9B; }
    }

    .buy-now {
      background: transparent;
      color: #F5F1E8;
      border: 1px solid #8C744B;
      &:hover { background: #C9A96E; color: #0B0B0B; }
    }
  }

  @media (max-width: 768px) {
    padding: 10px 14px max(10px, env(safe-area-inset-bottom));

    .sticky-inner {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .product-info {
      justify-content: space-between;
      img { display: none; }
      .title-price {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .title { max-width: 220px; font-size: 0.88rem; }
        .meta-price { font-size: 0.85rem; font-weight: 700; }
      }
    }

    .sticky-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      width: 100%;

      .sticky-qty { display: none; }
      button.sticky-btn {
        width: 100%;
        padding: 0 8px;
        font-size: 0.75rem;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const ToastNotificationContainer = styled.div<{ $show: boolean; $type: 'success' | 'warning' | 'error' }>`
  position: fixed;
  top: 85px;
  left: 50%;
  transform: ${({ $show }) => ($show ? 'translate(-50%, 0)' : 'translate(-50%, -20px)')};
  z-index: 100000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border-radius: 30px;
  background: #151515;
  border: 1px solid ${({ $type }) => ($type === 'warning' ? '#f59e0b' : $type === 'error' ? '#ef4444' : '#C9A96E')};
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(201, 169, 110, 0.2);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  width: 90%;
  max-width: 440px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    top: 74px;
    padding: 10px 16px;
    font-size: 0.82rem;
  }

  .toast-icon {
    color: ${({ $type }) => ($type === 'warning' ? '#f59e0b' : $type === 'error' ? '#ef4444' : '#C9A96E')};
    display: flex;
    align-items: center;
  }

  .toast-content {
    font-family: 'Inter', sans-serif;
    font-size: 0.86rem;
    font-weight: 500;
    color: #F5F1E8;
    line-height: 1.4;
  }

  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #A8A8A8;
    padding: 2px;
    margin-left: auto;
    display: flex;
    align-items: center;

    &:hover {
      color: #F5F1E8;
    }
  }
`;

const SaleCountdownTimerBox = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 10px 14px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .timer-header {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #C9A96E;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .timer-units {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .unit-card {
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.2);
    border-radius: 4px;
    padding: 3px 8px;
    text-align: center;
    min-width: 42px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .unit-num {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #F5F1E8;
    line-height: 1.15;
  }

  .unit-label {
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #A8A8A8;
    font-weight: 600;
    margin-top: 1px;
  }
`;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 100px 24px;
  text-align: center;
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 50vh;
  box-sizing: border-box;

  .not-found-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
    margin-bottom: 24px;
  }

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.4rem;
    font-weight: 500;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin: 0 0 16px 0;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }

  p {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.98rem;
    color: #D8D2C5;
    max-width: 480px;
    line-height: 1.6;
    margin: 0 0 32px 0;
  }

  .cta-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: #C9A96E;
    color: #0B0B0B;
    border: 1px solid #C9A96E;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #DFBA73;
      border-color: #DFBA73;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: #151515;
    color: #F5F1E8;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      border-color: #C9A96E;
      color: #C9A96E;
      background: #1F1F1F;
      transform: translateY(-2px);
    }
  }
`;

// ==========================================
// HELPER COMPONENTS & CONSTANTS
// ==========================================

const SafeImage: React.FC<{ src: string; alt: string; style?: React.CSSProperties; onLoad?: () => void }> = ({ src, alt, style, onLoad }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc || ''}
      alt={alt}
      style={style}
      onLoad={onLoad}
      onError={() => {
        if (imgSrc !== '') {
          setImgSrc('');
        }
      }}
    />
  );
};

const DEFAULT_ACCORDIONS = [
  {
    id: 'exp',
    title: 'YOUR AETHELCARATS EXPERIENCE',
    content: 'Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.',
    enabled: true,
    defaultOpen: true,
  },
  {
    id: 'specs',
    title: 'PRODUCT & DIAMOND SPECIFICATIONS',
    content: 'Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold with stamped hallmark verification.',
    enabled: true,
    defaultOpen: false,
  },
  {
    id: 'craft',
    title: 'CRAFTSMANSHIP & SUSTAINABILITY',
    content: 'Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.',
    enabled: true,
    defaultOpen: false,
  },
  {
    id: 'shipping',
    title: 'SHIPPING & DELIVERY',
    content: 'Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.',
    enabled: true,
    defaultOpen: false,
  },
];

const SaleCountdownTimer: React.FC<{ saleEndsAt: string }> = ({ saleEndsAt }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(saleEndsAt).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (isNaN(target) || diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [saleEndsAt]);

  if (!timeLeft) return null;

  return (
    <SaleCountdownTimerBox>
      <div className="timer-header">
        <span>⏳ Limited Time Offer — Sale Ends In:</span>
      </div>
      <div className="timer-units">
        <div className="unit-card">
          <div className="unit-num">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="unit-label">Days</div>
        </div>
        <div className="unit-card">
          <div className="unit-num">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="unit-label">Hours</div>
        </div>
        <div className="unit-card">
          <div className="unit-num">{String(timeLeft.mins).padStart(2, '0')}</div>
          <div className="unit-label">Mins</div>
        </div>
        <div className="unit-card">
          <div className="unit-num">{String(timeLeft.secs).padStart(2, '0')}</div>
          <div className="unit-label">Secs</div>
        </div>
      </div>
    </SaleCountdownTimerBox>
  );
};

const getCleanFullDescription = (text: string | undefined, title: string | undefined): string => {
  const dbFull = (text || '').trim();
  if (dbFull) {
    return dbFull;
  }
  return (title || '').trim() || 'AethelCarats Fine Jewellery Creation';
};

// ==========================================
// MAIN COMPONENT - PRODUCT DETAIL PAGE
// ==========================================

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Primary State
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [pContent, setPContent] = useState<any>(null);
  const [fetchStatus, setFetchStatus] = useState<'loading' | 'success' | 'not_found' | 'error'>('loading');

  // DOM Refs
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const desktopGalleryRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Configurator Selections
  const [selectedMetal, setSelectedMetal] = useState('14K Yellow Gold');
  const [selectedMetalCode, setSelectedMetalCode] = useState('14k');
  const [selectedSize, setSelectedSize] = useState('Select');
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [showEngravingInput, setShowEngravingInput] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [quantity, setQuantity] = useState<number>(1);

  // UI Interactivity & Modals
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [showConciergeModal, setShowConciergeModal] = useState(false);
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>('exp');
  const [selectedCustomOptions, setSelectedCustomOptions] = useState<Record<string, { title: string; value: string; priceAdjustment: number }>>({});
  const [customOptErrors, setCustomOptErrors] = useState<Record<string, string>>({});
  const [holidayStatus, setHolidayStatus] = useState<any>(null);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'warning' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const [siteSettings, setSiteSettings] = useState<Record<string, any>>({
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult an AethelCarats Atelier Expert',
    consultDescription: 'Speak directly with our AethelCarats Fine Jewellery Atelier specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91 79902 78892',
    consultPhoneLabel: 'Call Atelier',
    consultEmail: 'concierge@aethelcarats.com',
    consultEmailLabel: 'Email Concierge',
    consultCloseLabel: 'Close',
  });

  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const showToastNotification = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    showToast(message, type);
  };

  // Sticky Bar Visibility on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close Ring Size Dropdown on Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSizeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Site Settings & Holiday Mode
  useEffect(() => {
    api.getSiteSettings().then((data) => {
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setSiteSettings((prev) => ({ ...prev, ...data }));
      }
    }).catch(console.error);

    api.getHolidayModeStatus().then(setHolidayStatus).catch(console.error);
  }, []);

  // Fetch Product Data by Slug
  useEffect(() => {
    let isMounted = true;
    if (slug) {
      setProduct(null);
      setFetchStatus('loading');

      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.warn('Product request timed out after 10 seconds.');
          setProduct(null);
          setFetchStatus('error');
        }
      }, 10000);

      api
        .getProductBySlug(slug)
        .then((data: any) => {
          if (!isMounted) return;
          clearTimeout(timeoutId);

          const fetchedProduct = data?.product || (data?.id ? data : null);
          if (fetchedProduct && fetchedProduct.id) {
            setProduct(fetchedProduct);
            setRelated(data?.relatedProducts || []);
            setActiveImageIndex(0);
            setFetchStatus('success');

            try {
              const rawStored = localStorage.getItem('app_recently_viewed');
              const storedList = rawStored ? JSON.parse(rawStored) : [];
              const targetTitle = (fetchedProduct.title || fetchedProduct.name || '').trim().toLowerCase();
              const filtered = storedList.filter((item: any) => {
                if (!item) return false;
                if (item.id && fetchedProduct.id && item.id === fetchedProduct.id) return false;
                if (item.slug && fetchedProduct.slug && item.slug === fetchedProduct.slug) return false;
                const itemTitle = (item.title || item.name || '').trim().toLowerCase();
                if (targetTitle && itemTitle && targetTitle === itemTitle) return false;
                return true;
              });
              const updatedList = [fetchedProduct, ...filtered].slice(0, 10);
              localStorage.setItem('app_recently_viewed', JSON.stringify(updatedList));
            } catch (e) {}

            if (fetchedProduct.metal) {
              const initMetal = fetchedProduct.metal.includes('Silver') ? '14K White Gold' : fetchedProduct.metal;
              setSelectedMetal(initMetal);
              setSelectedMetalCode(initMetal.includes('18K') ? '18k' : '14k');
            } else if (fetchedProduct.metalsConfig) {
              let mList = fetchedProduct.metalsConfig;
              if (typeof mList === 'string') {
                try { mList = JSON.parse(mList); } catch (e) {}
              }
              if (Array.isArray(mList) && mList.length > 0) {
                const first = mList[0];
                const firstLabel = typeof first === 'string' ? first : (first.label || first.name);
                if (firstLabel) {
                  setSelectedMetal(firstLabel);
                  setSelectedMetalCode(String(firstLabel).includes('18K') ? '18k' : '14k');
                }
              }
            }

            api.get(`/product-page-content/${fetchedProduct.id}`).then((res) => {
              if (isMounted && res.data && res.data.content) {
                setPContent(res.data.content);
              }
            }).catch(console.error);

            // Initialize default open accordion
            let accordionsList: any[] = [];
            try {
              if (fetchedProduct.accordionsConfig) {
                accordionsList = typeof fetchedProduct.accordionsConfig === 'string' ? JSON.parse(fetchedProduct.accordionsConfig) : fetchedProduct.accordionsConfig;
              }
            } catch (e) {}
            if (!accordionsList || accordionsList.length === 0) {
              accordionsList = DEFAULT_ACCORDIONS;
            }
            const defaultOpenAcc = accordionsList.find((a: any) => a.enabled !== false && a.defaultOpen);
            if (defaultOpenAcc) {
              setActiveAccordionId(defaultOpenAcc.id || defaultOpenAcc.title);
            }
          } else {
            setProduct(null);
            setFetchStatus('not_found');
          }
        })
        .catch((err: any) => {
          if (!isMounted) return;
          clearTimeout(timeoutId);
          console.error('Error fetching product by slug:', err);
          setProduct(null);
          if (err?.response?.status === 404 || err?.status === 404) {
            setFetchStatus('not_found');
          } else {
            setFetchStatus('error');
          }
        });

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    } else {
      setProduct(null);
      setFetchStatus('not_found');
    }
  }, [slug]);

  // Live review count & rating sync
  const [liveReviewCount, setLiveReviewCount] = useState<number | null>(null);
  const [liveAvgRating, setLiveAvgRating] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      const initCount = (product as any).reviewCount ?? ((product as any).reviews?.length || 0);
      const initRating = (product as any).avgRating ?? 5;
      setLiveReviewCount(initCount);
      setLiveAvgRating(initRating);

      let isMounted = true;
      api.get(`/reviews?productId=${product.id}`)
        .then((res: any) => {
          if (!isMounted) return;
          const list = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
          if (list.length > 0) {
            setLiveReviewCount(list.length);
            const sum = list.reduce((acc: number, item: any) => acc + (Number(item.rating) || 5), 0);
            setLiveAvgRating(Math.round((sum / list.length) * 10) / 10);
          }
        })
        .catch(console.error);

      return () => { isMounted = false; };
    }
  }, [product?.id]);

  // Reset window scroll position when product mounts
  useLayoutEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
    }
  }, [product?.id]);



  // Existing Cart Item Sync
  const existingCartItemIndex = useMemo(() => {
    if (!product || !cartItems) return -1;
    return cartItems.findIndex((item: any) =>
      (item.id === product.id || item.product?.id === product.id || item.productId === product.id) &&
      (!selectedMetal || item.selectedMetal === selectedMetal)
    );
  }, [cartItems, product?.id, selectedMetal]);

  const existingCartItem = existingCartItemIndex >= 0 ? cartItems[existingCartItemIndex] : null;

  useEffect(() => {
    if (existingCartItem && existingCartItem.quantity) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem?.quantity, existingCartItemIndex]);

  const handleQuantityChange = (newQty: number) => {
    const safeQty = Math.max(1, newQty);
    const delta = safeQty - quantity;
    setQuantity(safeQty);
    if (existingCartItemIndex >= 0 && delta !== 0) {
      updateQuantity(existingCartItemIndex, delta);
    }
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordionId((prev) => (prev === key ? null : key));
  };

  const handleMobileScroll = () => {
    if (!carouselTrackRef.current) return;
    const scrollLeft = carouselTrackRef.current.scrollLeft;
    const width = carouselTrackRef.current.clientWidth;
    if (width > 0) {
      const newIdx = Math.round(scrollLeft / width);
      if (newIdx !== activeImageIndex && newIdx >= 0 && newIdx < galleryImages.length) {
        setActiveImageIndex(newIdx);
      }
    }
  };

  const scrollToSlide = (idx: number) => {
    setActiveImageIndex(idx);
    if (carouselTrackRef.current) {
      const width = carouselTrackRef.current.clientWidth;
      carouselTrackRef.current.scrollTo({ left: idx * width, behavior: 'smooth' });
    }
  };

  // Loading, Not Found, Error Views
  if (fetchStatus === 'loading') {
    return (
      <PageWrapper style={{ textAlign: 'center', padding: 80 }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#c9a45c', letterSpacing: '0.08em' }}>
          LOADING AETHELCARATS PRODUCT...
        </div>
      </PageWrapper>
    );
  }

  if (fetchStatus === 'not_found' || (!product && fetchStatus !== 'error')) {
    return (
      <PageOuterWrapper>
        <PageWrapper style={{ paddingBottom: 60 }}>
          <BreadcrumbsBar>
            <Link to="/">Home</Link> / <Link to="/collections">Jewellery</Link> / <span className="current">Product Not Found</span>
          </BreadcrumbsBar>
          <NotFoundWrapper>
            <div className="not-found-icon">
              <Sparkles size={28} />
            </div>
            <h1>PRODUCT NOT FOUND</h1>
            <p>We're sorry, but this product is no longer available.</p>
            <div className="cta-group">
              <Link to="/collections" className="btn-primary">
                VIEW ALL JEWELLERY
              </Link>
            </div>
          </NotFoundWrapper>
        </PageWrapper>
      </PageOuterWrapper>
    );
  }

  if (fetchStatus === 'error' || !product) {
    return (
      <PageOuterWrapper>
        <PageWrapper style={{ paddingBottom: 60 }}>
          <BreadcrumbsBar>
            <Link to="/">Home</Link> / <Link to="/collections">Jewellery</Link> / <span className="current">Error Loading Product</span>
          </BreadcrumbsBar>
          <NotFoundWrapper>
            <div className="not-found-icon" style={{ color: '#c5221f', background: '#fdf2f2', borderColor: '#f8d7da' }}>
              <AlertCircle size={28} />
            </div>
            <h1>UNABLE TO LOAD PRODUCT</h1>
            <p>We encountered a temporary network or server error while loading this piece. Please try again.</p>
            <div className="cta-group">
              <button className="btn-primary" onClick={() => window.location.reload()}>
                RETRY
              </button>
              <Link to="/collections" className="btn-secondary">
                VIEW ALL JEWELLERY
              </Link>
            </div>
          </NotFoundWrapper>
        </PageWrapper>
      </PageOuterWrapper>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // Gallery Images List
  const rawImageList = (product.images && Array.isArray(product.images) && product.images.length > 0)
    ? product.images.map((img: any) => (typeof img === 'string' ? img : img?.url))
    : [product.primaryImage || product.mainImage, product.secondaryImage];

  const galleryImages = Array.from(new Set(rawImageList.filter(Boolean) as string[]));
  const currentMainImage = galleryImages[activeImageIndex] || galleryImages[0] || '';

  const isRingProduct = Boolean(
    (((product.jewelleryType || '').toLowerCase() === 'rings' ||
      (product.jewelleryType || '').toLowerCase() === 'engagement rings' ||
      (product.jewelleryType || '').toLowerCase() === 'wedding bands' ||
      (product.category?.name || '').toLowerCase().includes('ring') ||
      (product.name || '').toLowerCase().includes('ring') ||
      product.enableRingSize === true)) &&
      !(product.jewelleryType || '').toLowerCase().includes('earring') &&
      !(product.jewelleryType || '').toLowerCase().includes('necklace') &&
      !(product.jewelleryType || '').toLowerCase().includes('bracelet') &&
      !(product.jewelleryType || '').toLowerCase().includes('pendant')
  );

  // Variation & Total Price Calculations
  const isProductOnSale = Boolean(
    product.onSale === true && (
      (product.comparePrice && Number(product.comparePrice) > Number(product.price)) ||
      (product.salePrice && Number(product.salePrice) > 0)
    )
  );

  const activeComparePrice = (isProductOnSale && product.comparePrice && Number(product.comparePrice) > Number(product.price))
    ? Number(product.comparePrice)
    : (isProductOnSale && product.salePrice && Number(product.price) > Number(product.salePrice)
        ? Number(product.price)
        : null);

  let parsedMetalsList: any = product.metalsConfig;
  if (typeof parsedMetalsList === 'string') {
    try {
      parsedMetalsList = JSON.parse(parsedMetalsList);
    } catch (e) {
      parsedMetalsList = [];
    }
  }

  const availableMetals = (!Array.isArray(parsedMetalsList) || parsedMetalsList.length === 0)
    ? [
        { label: '14K Yellow Gold', code: '14k', priceAdjustment: 0 },
        { label: '14K White Gold', code: '14k', priceAdjustment: 0 },
        { label: '14K Rose Gold', code: '14k', priceAdjustment: 0 },
        { label: '18K Yellow Gold', code: '18k', priceAdjustment: 250 },
        { label: '18K White Gold', code: '18k', priceAdjustment: 350 },
        { label: '18K Rose Gold', code: '18k', priceAdjustment: 350 },
      ]
    : parsedMetalsList.map((m: any) => {
        if (typeof m === 'string') {
          return {
            label: m,
            code: m.toLowerCase().includes('18k') ? '18k' : '14k',
            priceAdjustment: 0,
          };
        }
        return {
          label: m.label || m.name || String(m),
          code: m.code || (String(m.label || '').toLowerCase().includes('18k') ? '18k' : '14k'),
          priceAdjustment: typeof m.priceAdjustment === 'number' ? m.priceAdjustment : 0,
        };
      });

  const matchingVariation = (product.variations || []).find((v: any) => {
    const matchMetal = v.metal ? v.metal.toLowerCase() === selectedMetal.toLowerCase() : true;
    const matchSize = isRingProduct && selectedSize !== 'Select' ? (v.ringSize ? String(v.ringSize) === String(selectedSize) : true) : true;
    return matchMetal && matchSize;
  });

  let baseVariationPrice = matchingVariation?.price;
  if (!baseVariationPrice) {
    const metalObj = availableMetals.find((m: any) => m.label.toLowerCase() === selectedMetal.toLowerCase());
    const effectiveBasePrice = (isProductOnSale && product.salePrice && Number(product.salePrice) > 0)
      ? Number(product.salePrice)
      : (product.price || 2500);
    baseVariationPrice = effectiveBasePrice + (metalObj?.priceAdjustment || 0);
  }

  const customOptionsTotal = Object.values(selectedCustomOptions).reduce((sum, item) => sum + (item.priceAdjustment || 0), 0);
  const totalPrice = baseVariationPrice + customOptionsTotal;

  let compareTotalPrice: number | null = null;
  if (isProductOnSale && activeComparePrice && activeComparePrice > totalPrice) {
    const metalObj = availableMetals.find((m: any) => m.label.toLowerCase() === selectedMetal.toLowerCase());
    compareTotalPrice = activeComparePrice + (metalObj?.priceAdjustment || 0) + customOptionsTotal;
  }

  const RING_SIZES = ['Select', 'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'];

  // Parse Custom Options
  let parsedCustomOptions: any[] = [];
  try {
    if (product.customOptions) {
      parsedCustomOptions = typeof product.customOptions === 'string' ? JSON.parse(product.customOptions) : product.customOptions;
    } else if (product.customOptionsJson) {
      parsedCustomOptions = typeof product.customOptionsJson === 'string' ? JSON.parse(product.customOptionsJson) : product.customOptionsJson;
    }
  } catch (e) {}

  // Parse Accordions & Detail Sections
  let parsedAccordions: any[] = [];
  try {
    if (product.detailSections && Array.isArray(product.detailSections) && product.detailSections.length > 0) {
      parsedAccordions = [...product.detailSections];
    } else if (product.accordionsConfig) {
      parsedAccordions = typeof product.accordionsConfig === 'string' ? JSON.parse(product.accordionsConfig) : [...product.accordionsConfig];
    }
  } catch (e) {}
  if (!parsedAccordions || parsedAccordions.length === 0) {
    parsedAccordions = [...DEFAULT_ACCORDIONS];
  }

  const rawDescriptionText = product.fullDescription || (product as any).description || product.shortDescription;
  const productDescriptionText = getCleanFullDescription(rawDescriptionText, product.title || product.name);

  if (productDescriptionText && typeof productDescriptionText === 'string' && productDescriptionText.trim() !== '') {
    const overviewIdx = parsedAccordions.findIndex((a: any) => (a.id === 'overview' || (a.title || '').toUpperCase().includes('DESCRIPTION') || (a.title || '').toUpperCase().includes('OVERVIEW')));
    if (overviewIdx !== -1) {
      parsedAccordions[overviewIdx] = {
        ...parsedAccordions[overviewIdx],
        title: 'PRODUCT OVERVIEW & DESCRIPTION',
        content: productDescriptionText.trim(),
        enabled: true,
      };
    } else {
      parsedAccordions.unshift({
        id: 'overview',
        title: 'PRODUCT OVERVIEW & DESCRIPTION',
        content: productDescriptionText.trim(),
        enabled: true,
        defaultOpen: true,
      });
    }
  }

  const seenAccKeys = new Set<string>();
  const activeAccordionsList = parsedAccordions
    .filter((a: any) => a.isActive !== false && a.enabled !== false)
    .filter((a: any) => {
      const key = (a.type || a.title || a.id || '').trim().toUpperCase();
      if (!key) return true;
      if (seenAccKeys.has(key)) return false;
      seenAccKeys.add(key);
      return true;
    });
  const isRingSizeRequired = isRingProduct && (product.isRingSizeRequired !== false);

  const handleAddToCartClick = () => {
    if (isRingSizeRequired && (selectedSize === 'Select' || !selectedSize)) {
      setSizeError(true);
      showToastNotification('Please select a US Ring Size before adding to your bag.', 'warning');
      return;
    }
    setSizeError(false);

    const errors: Record<string, string> = {};
    if (product.enableCustomOptions) {
      for (const opt of parsedCustomOptions) {
        if (opt.required) {
          const valObj = selectedCustomOptions[opt.title || opt.name || opt.label];
          if (!valObj || !valObj.value || !valObj.value.trim()) {
            errors[opt.title || opt.name || opt.label] = `Please complete required option: ${opt.title || opt.name || opt.label}`;
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setCustomOptErrors(errors);
      showToastNotification(Object.values(errors)[0], 'warning');
      return;
    }

    setCustomOptErrors({});
    addToCart(
      product,
      quantity,
      selectedMetal,
      isRingProduct ? (selectedSize === 'Select' ? 'US 7' : selectedSize) : undefined,
      engravingText,
      selectedCustomOptions,
      totalPrice
    );
    showToastNotification('Product successfully added to your shopping bag!', 'success');
  };

  const handleBuyNowClick = () => {
    if (isRingSizeRequired && (selectedSize === 'Select' || !selectedSize)) {
      setSizeError(true);
      showToastNotification('Please select a US Ring Size before proceeding to checkout.', 'warning');
      return;
    }
    setSizeError(false);

    const errors: Record<string, string> = {};
    if (product.enableCustomOptions) {
      for (const opt of parsedCustomOptions) {
        if (opt.required) {
          const valObj = selectedCustomOptions[opt.title || opt.name || opt.label];
          if (!valObj || !valObj.value || !valObj.value.trim()) {
            errors[opt.title || opt.name || opt.label] = `Please complete required option: ${opt.title || opt.name || opt.label}`;
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setCustomOptErrors(errors);
      showToastNotification(Object.values(errors)[0], 'warning');
      return;
    }

    setCustomOptErrors({});
    addToCart(
      product,
      quantity,
      selectedMetal,
      isRingProduct ? (selectedSize === 'Select' ? 'US 7' : selectedSize) : undefined,
      engravingText,
      selectedCustomOptions,
      totalPrice
    );
    navigate('/checkout');
  };

  return (
    <PageOuterWrapper>
      <PageWrapper>
        {/* BREADCRUMBS */}
        <BreadcrumbsBar>
          <Link to="/">Home</Link> / <Link to={`/collections`}>{product.category?.name || product.jewelleryType || 'Jewellery'}</Link> / <span className="current">{product.title || product.name}</span>
        </BreadcrumbsBar>

        <ProductMainGrid>
          {/* LEFT: DESKTOP PRODUCT IMAGE GALLERY */}
          <DesktopImageSection>
            <DesktopImageScrollArea ref={desktopGalleryRef}>
              <DesktopImageGrid className="desktop-image-grid">
                {galleryImages.map((imgUrl, idx) => (
                  <GalleryImageCard
                    key={`gallery_${imgUrl}_${idx}`}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                  >
                    <SafeImage
                      src={imgUrl}
                      alt={`${product.title || product.name} view ${idx + 1}`}
                    />
                    <div className="zoom-hint">
                      <ZoomIn size={12} />
                      Click to expand
                    </div>
                  </GalleryImageCard>
                ))}
              </DesktopImageGrid>
            </DesktopImageScrollArea>
          </DesktopImageSection>

          {/* MOBILE CAROUSEL */}
          <MobileGallery>
            {galleryImages.length > 0 && (
              <MobileCounterBadge>
                {activeImageIndex + 1} / {galleryImages.length}
              </MobileCounterBadge>
            )}

            {galleryImages.length > 1 && activeImageIndex > 0 && (
              <MobileArrowBtn $dir="left" onClick={() => scrollToSlide(activeImageIndex - 1)} aria-label="Previous Image">
                <ChevronLeft size={20} />
              </MobileArrowBtn>
            )}

            {galleryImages.length > 1 && activeImageIndex < galleryImages.length - 1 && (
              <MobileArrowBtn $dir="right" onClick={() => scrollToSlide(activeImageIndex + 1)} aria-label="Next Image">
                <ChevronRight size={20} />
              </MobileArrowBtn>
            )}

            <MobileCarouselTrack ref={carouselTrackRef} onScroll={handleMobileScroll}>
              {galleryImages.map((imgUrl, i) => (
                <MobileSlideCard key={`mob_${i}`} onClick={() => { setActiveImageIndex(i); setIsLightboxOpen(true); }}>
                  <SafeImage src={imgUrl} alt={`${product.title || product.name} view ${i + 1}`} />
                </MobileSlideCard>
              ))}
            </MobileCarouselTrack>

            <MobileDots>
              {galleryImages.map((_, i) => (
                <span key={i} className={activeImageIndex === i ? 'active' : ''} onClick={() => scrollToSlide(i)} />
              ))}
            </MobileDots>
          </MobileGallery>

          <LuxuryImageLightbox
            images={galleryImages}
            activeIndex={activeImageIndex}
            productName={product.title || product.name}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            onSelectIndex={(idx: number) => setActiveImageIndex(idx)}
          />

          {/* RIGHT: STICKY PRODUCT CONFIGURATION PANEL */}
          <RightConfigPanel>
            <ProductHeaderArea>
              <div>
                <h1>{product.title || product.name}</h1>
                <RatingRow>
                  <span className="stars">
                    {'★'.repeat(Math.round(liveAvgRating ?? (product as any).avgRating ?? 5))}
                    {'☆'.repeat(5 - Math.round(liveAvgRating ?? (product as any).avgRating ?? 5))}
                  </span>
                  <span>
                    {(liveReviewCount !== null && liveReviewCount > 0)
                      ? `(${liveReviewCount} ${liveReviewCount === 1 ? 'review' : 'reviews'})`
                      : ((product as any).reviewCount !== undefined && (product as any).reviewCount > 0)
                        ? `(${(product as any).reviewCount} ${(product as any).reviewCount === 1 ? 'review' : 'reviews'})`
                        : '(No reviews yet)'}
                  </span>
                </RatingRow>
              </div>
              <button className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} onClick={() => toggleWishlist(product)} title="Save to Wishlist">
                <Heart size={20} fill={isWishlisted ? '#c00' : 'none'} />
              </button>
            </ProductHeaderArea>

            <SectionDividerBlock>
              <PriceDisplayBox style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span className="current-price" style={{ color: isProductOnSale ? '#E53E3E' : '#C9A96E' }}>
                  ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {isProductOnSale && compareTotalPrice !== null && compareTotalPrice > totalPrice && (
                  <span className="compare-price">
                    ${compareTotalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
                {isProductOnSale && (
                  <span style={{ background: '#d93838', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 4, letterSpacing: '0.04em' }}>
                    🏷️ ON SALE
                  </span>
                )}
              </PriceDisplayBox>

              {Boolean(isProductOnSale && (product as any).saleEndsAt) && (
                <SaleCountdownTimer saleEndsAt={(product as any).saleEndsAt} />
              )}
            </SectionDividerBlock>

            {/* METAL TYPE SELECTOR */}
            {(product as any).enableMetalSelection !== false && (
              <SectionDividerBlock>
                <MetalHeaderTitle>
                  <span className="label">Metal Type:</span>
                  <span className="value">{selectedMetal}</span>
                </MetalHeaderTitle>
                <MetalTilesRow>
                  {availableMetals.map((m: any, i: number) => (
                    <MetalPillButton
                      key={i}
                      type="button"
                      $isSelected={selectedMetal.toLowerCase() === m.label.toLowerCase()}
                      onClick={() => {
                        setSelectedMetal(m.label);
                        setSelectedMetalCode(m.code);
                      }}
                      title={m.label}
                    >
                      {m.label}
                    </MetalPillButton>
                  ))}
                </MetalTilesRow>
              </SectionDividerBlock>
            )}

            {/* RING SIZE SELECTOR */}
            {isRingProduct && (
              <SectionDividerBlock>
                <RingSizeReferenceContainer>
                  <span className="label-title">
                    Ring Size {isRingSizeRequired ? <span style={{ color: '#d9534f' }}>*</span> : <span style={{ color: '#888', fontWeight: 400, fontSize: '0.75rem' }}>(Optional)</span>}:
                  </span>
                  <MinimalSelectWrapper ref={dropdownRef}>
                    <MinimalSelectTrigger onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}>
                      <span className={selectedSize !== 'Select' ? 'selected-val' : 'placeholder-val'}>
                        {selectedSize}
                      </span>
                      <span className="arrow-icon">
                        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.5 6L0 0H9L4.5 6Z" fill="#0c1938" />
                        </svg>
                      </span>
                    </MinimalSelectTrigger>
                    {isSizeDropdownOpen && (
                      <CustomDropdownMenu>
                        {(product.availableRingSizes || RING_SIZES).map((sz: string) => (
                          <div
                            key={sz}
                            className={`option-item ${selectedSize === sz ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedSize(sz);
                              setIsSizeDropdownOpen(false);
                              setSizeError(false);
                            }}
                          >
                            {sz}
                          </div>
                        ))}
                      </CustomDropdownMenu>
                    )}
                  </MinimalSelectWrapper>
                  <Link to="/education/rings/find-your-ring-size" className="guide-link">
                    Ring Size Guide
                  </Link>
                </RingSizeReferenceContainer>
                {sizeError && (
                  <div style={{ color: '#d9534f', fontSize: '0.8rem', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>⚠️</span> Please select a US Ring Size before adding this ring to your shopping bag.
                  </div>
                )}
              </SectionDividerBlock>
            )}



            {/* CUSTOM OPTIONS */}
            {Boolean(product.enableCustomOptions) && parsedCustomOptions.length > 0 && (
              <SectionDividerBlock>
                <CustomOptionsContainer>
                  {parsedCustomOptions.map((opt: any, idx: number) => {
                    const optTitle = opt.title || opt.name || opt.label;
                    if (!optTitle) return null;
                    const inputType = opt.inputType || opt.fieldType || 'Text';
                    const hasError = Boolean(customOptErrors[optTitle]);
                    const priceAdj = Number(opt.priceAdjustment) || 0;

                    return (
                      <div key={opt.id || idx}>
                        <CustomOptionLabel>
                          {optTitle}
                          {selectedCustomOptions[optTitle]?.value ? `: ${selectedCustomOptions[optTitle].value}` : ''}
                          {opt.required && <span style={{ color: '#c5221f' }}>*</span>}
                          {inputType !== 'Checkbox' && priceAdj > 0 && (
                            <span style={{ color: '#137333', fontWeight: 600, marginLeft: 6 }}>(+${priceAdj})</span>
                          )}
                        </CustomOptionLabel>

                        {inputType === 'Text' && (
                          <CustomOptionInput
                            type="text"
                            $hasError={hasError}
                            maxLength={opt.maxCharacterLength || opt.maxLength || 25}
                            placeholder={opt.placeholder || `Enter ${optTitle}...`}
                            value={selectedCustomOptions[optTitle]?.value || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSelectedCustomOptions((prev) => ({
                                ...prev,
                                [optTitle]: { title: optTitle, value: val, priceAdjustment: val.trim() ? priceAdj : 0 },
                              }));
                              if (customOptErrors[optTitle]) {
                                setCustomOptErrors((prev) => ({ ...prev, [optTitle]: '' }));
                              }
                            }}
                          />
                        )}

                        {inputType === 'Textarea' && (
                          <CustomOptionTextarea
                            rows={2}
                            $hasError={hasError}
                            maxLength={opt.maxCharacterLength || opt.maxLength || 100}
                            placeholder={opt.placeholder || `Enter ${optTitle}...`}
                            value={selectedCustomOptions[optTitle]?.value || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSelectedCustomOptions((prev) => ({
                                ...prev,
                                [optTitle]: { title: optTitle, value: val, priceAdjustment: val.trim() ? priceAdj : 0 },
                              }));
                              if (customOptErrors[optTitle]) {
                                setCustomOptErrors((prev) => ({ ...prev, [optTitle]: '' }));
                              }
                            }}
                          />
                        )}

                        {inputType === 'Dropdown' && (
                          <CustomOptionSelect
                            $hasError={hasError}
                            value={selectedCustomOptions[optTitle]?.value || ''}
                            onChange={(e) => {
                              const choices = opt.choices || opt.values || [];
                              const chObj = choices.find((c: any) => (c.label || c.value || c) === e.target.value);
                              const chAdj = typeof chObj === 'object' ? Number(chObj.priceAdjustment) || 0 : priceAdj;
                              setSelectedCustomOptions((prev) => ({
                                ...prev,
                                [optTitle]: {
                                  title: optTitle,
                                  value: e.target.value,
                                  priceAdjustment: e.target.value ? chAdj : 0,
                                },
                              }));
                              if (customOptErrors[optTitle]) {
                                setCustomOptErrors((prev) => ({ ...prev, [optTitle]: '' }));
                              }
                            }}
                          >
                            <option value="">-- Select {optTitle} --</option>
                            {(opt.choices || opt.values || []).map((ch: any, chIdx: number) => {
                              const chLabel = typeof ch === 'string' ? ch : (ch.label || ch.value);
                              const chAdj = typeof ch === 'object' ? Number(ch.priceAdjustment) || 0 : 0;
                              return (
                                <option key={chIdx} value={chLabel}>
                                  {chLabel} {chAdj > 0 ? `(+$${chAdj})` : ''}
                                </option>
                              );
                            })}
                          </CustomOptionSelect>
                        )}

                        {inputType === 'Radio' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {(opt.choices || opt.values || []).map((ch: any, chIdx: number) => {
                              const chLabel = typeof ch === 'string' ? ch : (ch.label || ch.value);
                              const chAdj = typeof ch === 'object' ? Number(ch.priceAdjustment) || 0 : priceAdj;
                              return (
                                <label key={chIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', cursor: 'pointer', color: '#0c1938' }}>
                                  <input
                                    type="radio"
                                    name={`opt_${optTitle}`}
                                    checked={selectedCustomOptions[optTitle]?.value === chLabel}
                                    onChange={() => {
                                      setSelectedCustomOptions((prev) => ({
                                        ...prev,
                                        [optTitle]: { title: optTitle, value: chLabel, priceAdjustment: chAdj },
                                      }));
                                      if (customOptErrors[optTitle]) {
                                        setCustomOptErrors((prev) => ({ ...prev, [optTitle]: '' }));
                                      }
                                    }}
                                    style={{ accentColor: '#0c1938', cursor: 'pointer' }}
                                  />
                                  {chLabel} {chAdj > 0 && <span style={{ color: '#137333', fontWeight: 600 }}>(+${chAdj})</span>}
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {inputType === 'Checkbox' && (() => {
                          const cbOptionsList = (opt.checkboxOptions && Array.isArray(opt.checkboxOptions) && opt.checkboxOptions.length > 0)
                            ? opt.checkboxOptions
                            : (opt.choices && Array.isArray(opt.choices) && opt.choices.length > 0)
                              ? opt.choices
                              : [
                                  {
                                    id: 'cb_default',
                                    label: opt.checkboxLabel !== undefined && opt.checkboxLabel !== '' ? opt.checkboxLabel : optTitle,
                                    priceAdjustment: priceAdj,
                                  }
                                ];

                          const currentSelectedValue = selectedCustomOptions[optTitle]?.value || '';

                          return (
                            <div>
                              <OptionTilesRow>
                                {cbOptionsList.map((cbOpt: any, cbIdx: number) => {
                                  const cbLabel = typeof cbOpt === 'string' ? cbOpt : (cbOpt.label || cbOpt.value);
                                  if (!cbLabel) return null;
                                  const cbAdj = typeof cbOpt === 'object' ? Number(cbOpt.priceAdjustment) || 0 : 0;
                                  const isSelected = currentSelectedValue === cbLabel;

                                  return (
                                    <OptionRectTile
                                      key={cbOpt.id || cbIdx}
                                      type="button"
                                      $isSelected={isSelected}
                                      onClick={() => {
                                        if (isSelected) {
                                          setSelectedCustomOptions((prev) => ({
                                            ...prev,
                                            [optTitle]: {
                                              title: optTitle,
                                              value: '',
                                              priceAdjustment: 0,
                                            },
                                          }));
                                        } else {
                                          setSelectedCustomOptions((prev) => ({
                                            ...prev,
                                            [optTitle]: {
                                              title: optTitle,
                                              value: cbLabel,
                                              priceAdjustment: cbAdj,
                                            },
                                          }));
                                        }

                                        if (customOptErrors[optTitle]) {
                                          setCustomOptErrors((prev) => ({ ...prev, [optTitle]: '' }));
                                        }
                                      }}
                                    >
                                      <span>{cbLabel}</span>
                                      {cbAdj > 0 && (
                                        <span style={{ color: '#137333', fontWeight: 600, marginLeft: 6 }}>
                                          (+$${cbAdj})
                                        </span>
                                      )}
                                    </OptionRectTile>
                                  );
                                })}
                              </OptionTilesRow>
                            </div>
                          );
                        })()}

                        {hasError && <div style={{ fontSize: '0.78rem', color: '#c5221f', marginTop: 4 }}>{customOptErrors[optTitle]}</div>}
                      </div>
                    );
                  })}
                </CustomOptionsContainer>
              </SectionDividerBlock>
            )}

            {/* ACTION BUTTONS & CTAs */}
            <ActionButtonsGroup style={{ marginTop: 4 }}>
              {holidayStatus?.active ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                  <button
                    disabled
                    style={{ width: '100%', padding: '16px 24px', background: '#e2e8f0', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: 4, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'not-allowed' }}
                  >
                    ORDERS TEMPORARILY UNAVAILABLE
                  </button>
                  <div style={{ fontSize: '0.82rem', color: '#c53030', background: '#fff5f5', border: '1px solid #feb2b2', padding: '10px 14px', borderRadius: 4, textAlign: 'center', lineHeight: 1.5 }}>
                    {holidayStatus.message || "Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."}
                  </div>
                </div>
              ) : (
                <MainCtaRow>
                  {pContent?.showQuantitySelector !== false && (
                    <div className="qty-selector-col">
                      <QuantitySelectorContainer>
                        <button type="button" onClick={() => handleQuantityChange(quantity - 1)} aria-label="Decrease quantity">
                          <Minus size={14} />
                        </button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => handleQuantityChange(quantity + 1)} aria-label="Increase quantity">
                          <Plus size={14} />
                        </button>
                      </QuantitySelectorContainer>
                    </div>
                  )}
                  <div className="add-bag-col">
                    <PrimaryCtaBtn onClick={handleAddToCartClick}>
                      ADD TO BAG • ${(totalPrice * quantity).toLocaleString()}
                    </PrimaryCtaBtn>
                  </div>
                  {pContent?.showBuyNowButton !== false && (
                    <div className="buy-now-col">
                      <BuyNowCtaBtn onClick={handleBuyNowClick}>
                        <Zap size={16} /> BUY IT NOW
                      </BuyNowCtaBtn>
                    </div>
                  )}
                </MainCtaRow>
              )}
              {siteSettings.enableConsultAtelierExpert !== 'false' && (
                <SecondaryCtaBtn onClick={() => setShowConciergeModal(true)}>
                  CONSULT AN ATELIER EXPERT
                </SecondaryCtaBtn>
              )}
            </ActionButtonsGroup>

            {/* BENEFITS */}
            {pContent?.showBenefits !== false && (
              <BenefitsRow>
                {pContent?.benefitsJson ? (
                  (() => {
                    try {
                      const list = typeof pContent.benefitsJson === 'string' ? JSON.parse(pContent.benefitsJson) : pContent.benefitsJson;
                      return list.filter((b: any) => b.isActive !== false).map((b: any, idx: number) => (
                        <div key={b.id || idx} className="benefit-item">
                          {b.icon === 'Truck' && <Truck size={16} />}
                          {b.icon === 'ShieldCheck' && <ShieldCheck size={16} />}
                          {b.icon === 'Award' && <Award size={16} />}
                          {b.icon === 'Sparkles' && <Sparkles size={16} />}
                          {(!b.icon || !['Truck', 'ShieldCheck', 'Award', 'Sparkles'].includes(b.icon)) && <Check size={16} />}
                          {b.title}
                        </div>
                      ));
                    } catch (e) {
                      return null;
                    }
                  })()
                ) : (
                  <>
                    <div className="benefit-item">
                      <Truck size={16} /> Free Insured Delivery
                    </div>
                    <div className="benefit-item">
                      <ShieldCheck size={16} /> Lifetime Service Warranty
                    </div>
                    <div className="benefit-item">
                      <Award size={16} /> GIA / IGI Certification
                    </div>
                  </>
                )}
              </BenefitsRow>
            )}

            {/* STOREFRONT ACCORDIONS */}
            <AccordionsContainer style={{ marginTop: 24 }}>
              {activeAccordionsList.map((acc: any, accIdx: number) => {
                const accKey = acc.id || acc.title || `acc_${accIdx}`;
                const isOpen = activeAccordionId === accKey;

                return (
                  <React.Fragment key={accKey}>
                    <AccordionHeader onClick={() => toggleAccordion(accKey)}>
                      <span>{acc.title}</span>
                      <span>{isOpen ? '−' : '+'}</span>
                    </AccordionHeader>
                    <AccordionBody $open={isOpen}>
                      {acc.description && (
                        <div style={{ fontSize: '0.88rem', color: '#D8D2C5', marginBottom: (acc.items && acc.items.length > 0) ? 14 : 0, lineHeight: 1.7 }}>
                          {acc.description}
                        </div>
                      )}
                      {acc.items && Array.isArray(acc.items) && acc.items.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                          {(acc.type === 'SPECIFICATIONS' || (acc.title || '').toUpperCase().includes('SPECIFICATION')) ? (
                            <div style={{ background: '#151515', border: '1px solid rgba(140, 116, 75, 0.25)', padding: 18, borderRadius: 6, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)' }}>
                              <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
                                SPECIFICATION DETAILS
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 18px', fontSize: '0.85rem' }}>
                                {acc.items.map((item: any, itemIdx: number) => (
                                  <div key={item.id || itemIdx}>
                                    {item.title && <strong style={{ color: '#F5F1E8', fontWeight: 600 }}>{item.title}: </strong>}
                                    <span style={{ color: '#D8D2C5' }}>{item.value || item.description || '-'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            acc.items.map((item: any, itemIdx: number) => (
                              <div key={item.id || itemIdx} style={{ background: '#151515', border: '1px solid rgba(140, 116, 75, 0.25)', padding: 16, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 6, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)' }}>
                                {item.imageUrl && (
                                  <img src={item.imageUrl} alt={item.title || 'Atelier Media'} style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 4, marginBottom: 6 }} />
                                )}
                                {(item.title || item.icon) && (
                                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F5F1E8', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {item.icon === 'Truck' && <Truck size={16} color="#C9A96E" />}
                                    {item.icon === 'ShieldCheck' && <ShieldCheck size={16} color="#C9A96E" />}
                                    {item.icon === 'Award' && <Award size={16} color="#C9A96E" />}
                                    {item.icon === 'Sparkles' && <Sparkles size={16} color="#C9A96E" />}
                                    {item.title}
                                  </div>
                                )}
                                {item.value && (
                                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#C9A96E' }}>
                                    {item.value}
                                  </div>
                                )}
                                {item.description && <div style={{ fontSize: '0.85rem', color: '#D8D2C5', lineHeight: 1.6 }}>{item.description}</div>}
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        !acc.description && (
                          <div style={{ whiteSpace: 'pre-line', fontSize: '0.88rem', color: '#D8D2C5', lineHeight: 1.7 }}>
                            {acc.content || 'Information for this section.'}
                          </div>
                        )
                      )}
                    </AccordionBody>
                  </React.Fragment>
                );
              })}
            </AccordionsContainer>
          </RightConfigPanel>
        </ProductMainGrid>
      </PageWrapper>

      {/* EXTRA STOREFRONT SECTIONS */}
      <SimilarItemsSection 
        items={related} 
        currentProductId={product.id} 
        category={(product as any).jewelleryType || (product as any).category?.name || (typeof (product as any).category === 'string' ? (product as any).category : '')} 
        content={pContent} 
      />
      <AtelierExperienceBanner content={pContent} />
      <ItemReviewsSection productName={product.name || product.title} content={pContent} productId={product.id} reviews={(product as any).reviews} />
      <RecentlyViewedSection currentProductId={product.id} content={pContent} />

      {/* CONCIERGE EXPERT MODAL */}
      {showConciergeModal && siteSettings.enableConsultAtelierExpert !== 'false' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#151515', border: '1px solid rgba(140, 116, 75, 0.3)', padding: 32, borderRadius: 8, maxWidth: 500, width: '90%', textAlign: 'center', color: '#F5F1E8' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#F5F1E8', marginBottom: 12 }}>
              {siteSettings.consultTitle || 'Consult an Atelier Expert'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#A8A8A8', marginBottom: 20, whiteSpace: 'pre-line' }}>
              {siteSettings.consultDescription || 'Speak directly with our AethelCarats specialists regarding custom design, diamond selection, or sizing guidance.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {siteSettings.consultPhone && siteSettings.consultPhone.trim() !== '' && (
                <a
                  href={`tel:${siteSettings.consultPhone.replace(/[^\d+]/g, '')}`}
                  style={{ padding: '12px', background: '#111111', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, textDecoration: 'none', color: '#F5F1E8', fontWeight: 600 }}
                >
                  ☎ {siteSettings.consultPhoneLabel || 'Call Atelier'}: {siteSettings.consultPhone}
                </a>
              )}
              {siteSettings.consultEmail && siteSettings.consultEmail.trim() !== '' && (
                <a
                  href={`mailto:${siteSettings.consultEmail.trim()}`}
                  style={{ padding: '12px', background: '#111111', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, textDecoration: 'none', color: '#F5F1E8', fontWeight: 600 }}
                >
                  ✉ {siteSettings.consultEmailLabel || 'Email Concierge'}: {siteSettings.consultEmail}
                </a>
              )}
            </div>
            <button
              onClick={() => setShowConciergeModal(false)}
              style={{ padding: '10px 24px', background: '#C9A96E', color: '#0B0B0B', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
            >
              {siteSettings.consultCloseLabel || 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <ToastNotificationContainer $show={toast.show} $type={toast.type}>
        <div className="toast-icon">
          {toast.type === 'success' ? (
            <CheckCircle2 size={22} />
          ) : (
            <AlertCircle size={22} />
          )}
        </div>
        <div className="toast-content">{toast.message}</div>
        <button className="toast-close" onClick={() => setToast((prev) => ({ ...prev, show: false }))}>
          <X size={16} />
        </button>
        {toast.show && <div className="progress-bar" key={toast.message} />}
      </ToastNotificationContainer>

      {/* STICKY BOTTOM FLOATING BAR */}
      <StickyBottomBar $show={showStickyBar && !holidayStatus?.active && pContent?.showStickyBar !== false}>
        <div className="sticky-inner">
          <div className="product-info">
            <img src={currentMainImage} alt={product?.title || product?.name || 'Jewellery'} />
            <div className="title-price">
              <div className="title">{product?.title || product?.name}</div>
              <div className="meta-price">${(totalPrice * quantity).toLocaleString()}</div>
            </div>
          </div>

          <div className="sticky-actions">
            <div className="sticky-qty">
              <button type="button" onClick={() => handleQuantityChange(quantity - 1)}>
                <Minus size={12} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => handleQuantityChange(quantity + 1)}>
                <Plus size={12} />
              </button>
            </div>

            <button className="sticky-btn add-bag" onClick={handleAddToCartClick}>
              ADD TO BAG
            </button>

            <button className="sticky-btn buy-now" onClick={handleBuyNowClick}>
              BUY IT NOW
            </button>
          </div>
        </div>
      </StickyBottomBar>
    </PageOuterWrapper>
  );
};
