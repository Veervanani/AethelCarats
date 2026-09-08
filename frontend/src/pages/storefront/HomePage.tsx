import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { api } from '../../services/api';
import { PageSection, HeroBanner } from '../../types';
import { SafeImage } from '../../components/ui/SafeImage';
import { RevealContainer } from '../../components/ui/RevealContainer';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 640px;
  height: clamp(640px, 82vh, 860px);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #F5F1E8;
  text-align: left;
  padding: 0 7.5%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #0B0B0B;

  @media (max-width: 1024px) {
    padding: 0 5%;
    min-height: 560px;
    height: clamp(560px, 72vh, 740px);
  }

  @media (max-width: 768px) {
    height: 84svh;
    min-height: 580px;
    max-height: 740px;
    padding: 0;
    align-items: flex-start;
  }
`;

const HeroOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 40px;
    background: linear-gradient(
      to bottom,
      rgba(11, 11, 11, 0.95) 0%,
      rgba(11, 11, 11, 0.75) 45%,
      rgba(11, 11, 11, 0.2) 85%
    );
  }
`;

const HeroImageColumn = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  picture {
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
    display: block;
  }

  @media (max-width: 768px) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  }
`;

const HeroTextColumn = styled.div`
  max-width: 580px;
  width: 100%;
  z-index: 5;
  position: relative;

  @media (max-width: 1024px) {
    max-width: 480px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    text-align: center;
    margin-top: 0;
    padding: 80px 24px 64px;
    box-sizing: border-box;
  }
`;

const Eyebrow = styled.span`
  font-size: 0.82rem;
  letter-spacing: 0.28em;
  font-weight: 700;
  color: #C9A96E;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    margin-bottom: 8px;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  font-size: clamp(2.4rem, 4.4vw, 4rem);
  font-weight: 500;
  line-height: 1.12;
  color: #F5F1E8;
  margin-bottom: 22px;
  letter-spacing: 0.02em;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    line-height: 1.2;
    margin-bottom: 10px;
    white-space: normal;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  color: #A8A8A8;
  margin-bottom: 38px;
  font-weight: 300;
  line-height: 1.65;
  max-width: 480px;

  @media (max-width: 768px) {
    font-size: 0.82rem;
    line-height: 1.45;
    margin-bottom: 18px;
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
    max-width: 260px;
    margin: 0 auto;
  }
`;

const LuxuryButton = styled(Link)<{ $variant?: 'primary' | 'outline' }>`
  padding: 16px 32px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  white-space: nowrap !important;
  box-sizing: border-box;
  flex-shrink: 0;

  background-color: ${({ $variant }) => ($variant === 'outline' ? 'transparent' : '#C9A96E')};
  color: ${({ $variant }) => ($variant === 'outline' ? '#F5F1E8' : '#0B0B0B')};
  border: 1px solid ${({ $variant }) => ($variant === 'outline' ? '#8C744B' : '#C9A96E')};

  &:hover {
    background-color: ${({ $variant }) => ($variant === 'outline' ? '#C9A96E' : '#DFCA9B')};
    border-color: #C9A96E;
    color: #0B0B0B;
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(201, 169, 110, 0.3);
  }

  @media (max-width: 1024px) {
    padding: 14px 22px;
    font-size: 0.74rem;
    letter-spacing: 0.14em;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 16px;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    box-sizing: border-box;
    white-space: nowrap !important;
  }
`;

const FancyIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 7.5%;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 16px;
  }
`;

const FancyIndicatorDash = styled.button<{ $active: boolean }>`
  height: 3px;
  width: ${({ $active }) => ($active ? '38px' : '18px')};
  background-color: ${({ $active }) => ($active ? '#C9A45C' : 'rgba(180, 150, 90, 0.35)')};
  border: none;
  border-radius: 2px;
  padding: 0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #C9A45C;
    width: 32px;
  }
`;



/* HORIZONTAL LUXURY CATEGORY CAROUSEL SECTION */
const ExploreWrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 20px 24px 28px;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 16px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px 12px 20px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;

  .swiper {
    padding: 4px 0 16px;
    overflow: visible;
  }
`;

const CategoryCard = styled(Link)`
  display: block;
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.22);
  border-radius: 4px;
  text-decoration: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    border-color: #C9A96E;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 18px rgba(201, 169, 110, 0.15);

    img {
      transform: scale(1.04);
    }
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px 16px;
  background: rgba(17, 17, 17, 0.92);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryTitle = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #F5F1E8;
  transition: color 0.25s ease;

  ${CategoryCard}:hover & {
    color: #C9A96E;
  }
`;

const NavArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'prev' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  transition: all 0.25s ease;

  &:hover {
    background: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    transform: translateY(-50%) scale(1.06);
  }

  &.swiper-button-disabled {
    opacity: 0.25;
    cursor: default;
    pointer-events: none;
  }
`;

/* FULL-WIDTH EDITORIAL HERO BANNER ("A NEW EXPRESSION OF FINE JEWELLERY") */
const EditorialBannerSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const EditorialBannerContainer = styled.div<{
  $bgImage?: string;
  $tabletImage?: string;
  $mobileImage?: string;
  $objectPosition?: string;
  $tabletObjectPosition?: string;
  $mobileObjectPosition?: string;
  $showOverlay?: boolean;
  $overlayOpacity?: number;
  $bannerHeightDesktop?: string;
  $bannerHeightTablet?: string;
  $bannerHeightMobile?: string;
  $paddingTopBottom?: string;
}>`
  position: relative;
  width: 100%;
  min-height: ${({ $bannerHeightDesktop }) => $bannerHeightDesktop || '540px'};
  background-color: #0B0B0B;
  background-image: ${({ $bgImage }) => `url(${$bgImage || '/assets/aura_editorial_banner_v3.png'})`};
  background-size: cover;
  background-position: right center;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  display: flex;
  align-items: center;
  padding: ${({ $paddingTopBottom }) => $paddingTopBottom || '64px'} 80px;

  @media (max-width: 1024px) {
    padding: 48px 32px;
    min-height: ${({ $bannerHeightTablet }) => $bannerHeightTablet || '420px'};
    background-position: right center;
    background-image: ${({ $tabletImage, $bgImage }) => `url(${$tabletImage || $bgImage || '/assets/aura_editorial_banner_v3.png'})`};
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
    min-height: ${({ $bannerHeightMobile }) => $bannerHeightMobile || '380px'};
    background-position: right center;
    background-image: ${({ $mobileImage, $tabletImage, $bgImage }) => `url(${$mobileImage || $tabletImage || $bgImage || '/assets/aura_editorial_banner_v3.png'})`};
  }
`;

const EditorialBannerContent = styled.div<{ $textColor?: string }>`
  max-width: 520px;
  color: ${({ $textColor }) => $textColor || '#F5F1E8'};
`;

const EditorialBannerTitle = styled.h2<{ $textColor?: string }>`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.12;
  color: #F5F1E8;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const EditorialBannerDesc = styled.p<{ $textColor?: string }>`
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.65;
  color: #A8A8A8;
  margin-bottom: 36px;
`;

const EditorialBannerButton = styled(Link)<{ $buttonBg?: string; $buttonColor?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 38px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  background: #C9A96E;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #DFCA9B;
    border-color: #DFCA9B;
    color: #0B0B0B;
    box-shadow: 0 10px 24px rgba(201, 169, 110, 0.3);
  }
`;

/* PERMANENTLY FIXED STATIC 50/50 TWO-PANEL EDITORIAL SECTION (NECKLACES & BRACELETS) */
const StaticEditorialSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const StaticEditorialContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-top: none;
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    aspect-ratio: auto;
  }
`;

const StaticEditorialPanel = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: block;
  text-decoration: none;
  background-color: #0B0B0B;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

const StaticEditorialPanelOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.25) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 44px 40px;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 28px 24px;
  }
`;

/* BLUE NILE-STYLE EDITORIAL COLLECTION SECTION */
const EditorialCollectionSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: none;
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  touch-action: pan-y;
  user-select: none;

  img {
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const EditorialCollectionGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0;
  width: 100%;
  aspect-ratio: 2 / 1;
  background-color: #111111;
  overflow: hidden;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    aspect-ratio: auto;
  }
`;

const EditorialCollectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 24px 32px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 36px 24px;
  }
`;

const FixedLeftImgWrap = styled.div`
  width: 74%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 78%;
    max-width: 420px;
  }

  @media (max-width: 992px) {
    width: 100%;
    max-width: 480px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const EditorialEyebrow = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 6px;
  display: block;
`;

const EditorialTitle = styled.h3`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 500;
  color: #F5F1E8;
  line-height: 1.18;
  margin-bottom: 10px;
`;

const ShopNowLink = styled(Link)`
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A96E;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    color: #DFCA9B;
  }
`;

const CenteredNavControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const NavControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  button {
    background: transparent;
    border: none;
    color: #F5F1E8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  .slide-counter {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #A8A8A8;
  }
`;

const NavPaginationTrack = styled.div`
  width: 240px;
  max-width: 80%;
  height: 1px;
  background-color: rgba(140, 116, 75, 0.25);
  margin-top: 10px;
  position: relative;
`;

const NavPaginationActiveLine = styled.div<{ $activeIndex: number; $totalSlides: number }>`
  position: absolute;
  top: -0.5px;
  left: ${({ $activeIndex, $totalSlides }) => ($totalSlides > 0 ? ($activeIndex / $totalSlides) * 100 : 0)}%;
  width: ${({ $totalSlides }) => ($totalSlides > 0 ? 100 / $totalSlides : 100)}%;
  height: 2px;
  background-color: #C9A96E;
  transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const EditorialCollectionRight = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

/* BLUE NILE-STYLE DUAL-PANEL PROMOTIONAL SECTION */
const PromoSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: none;
  border-bottom: none;
`;

const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  height: 680px;
  margin: 0;
  padding: 0;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const PromoPanel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(36, 35, 33, 0.28) 0%, transparent 50%);
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  &:hover {
    img {
      transform: scale(1.04);
    }
  }

  @media (max-width: 992px) {
    min-height: 480px;
  }
`;

const LeftPromoButton = styled(Link)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: min(290px, 85%);
  height: 58px;
  padding: 0 24px;
  background: rgba(17, 17, 17, 0.92);
  backdrop-filter: blur(10px);
  border: 1.5px solid #C9A96E;
  color: #F5F1E8;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

  &:hover {
    background: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
    transform: translateX(-50%) translateY(-4px);
    box-shadow: 0 14px 32px rgba(201, 169, 110, 0.4);
  }

  @media (max-width: 768px) {
    bottom: 60px;
    height: 52px;
  }
`;

const RightPromoContent = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  text-align: center;
  width: 90%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    bottom: 48px;
    width: 95%;
  }
`;

const RightPromoTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: #F5F1E8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1.9rem;
    margin-bottom: 16px;
  }
`;

const RightPromoButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: min(260px, 85%);
  height: 58px;
  padding: 0 24px;
  background: rgba(17, 17, 17, 0.92);
  backdrop-filter: blur(10px);
  color: #F5F1E8;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1.5px solid #C9A96E;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

  &:hover {
    background: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(201, 169, 110, 0.4);
  }

  @media (max-width: 768px) {
    height: 52px;
  }
`;

/* DIAMOND SHAPES SECTION */
const DiamondShapesSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  background-color: #111111;
`;

const DiamondShapesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const DiamondShapesLeft = styled.div`
  width: 100%;
  min-height: 540px;
  overflow: hidden;
  background-color: #0B0B0B;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 992px) {
    min-height: 360px;
  }
`;

const DiamondShapesRight = styled.div`
  padding: 64px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 992px) {
    padding: 48px 24px;
  }
`;

const DiamondShapesEyebrow = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 12px;
  display: block;
`;

const DiamondShapesTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 500;
  color: #F5F1E8;
  line-height: 1.15;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const DiamondShapesSubtitle = styled.p`
  font-size: 0.95rem;
  color: #A8A8A8;
  line-height: 1.6;
  margin-bottom: 36px;
`;

const DiamondShapesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const DiamondShapeSvg = styled.img<{ $desktopSize?: string; $tabletSize?: string; $mobileSize?: string }>`
  width: ${({ $desktopSize }) => $desktopSize || '46px'};
  max-width: 52px;
  height: auto;
  object-fit: contain;
  filter: brightness(0) invert(0.9);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
  margin: 0 auto 12px;

  @media (max-width: 1024px) {
    width: ${({ $tabletSize }) => $tabletSize || '42px'};
  }

  @media (max-width: 576px) {
    width: ${({ $mobileSize }) => $mobileSize || '38px'};
    margin-bottom: 8px;
  }
`;

const DiamondShapeCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 22px 14px 18px;
  border: 1px solid rgba(140, 116, 75, 0.25);
  background-color: #151515;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A96E 0%, #E6C887 50%, #C9A96E 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &:hover {
    border-color: #C9A96E;
    background-color: #1A1A1A;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.8), 0 0 16px rgba(201, 169, 110, 0.15);
    transform: translateY(-6px);

    &::before {
      opacity: 1;
    }

    img {
      filter: brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(600%) hue-rotate(5deg);
      transform: scale(1.12);
    }

    span {
      color: #C9A96E;
    }
  }

  span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    text-align: center;
    transition: color 0.3s ease;
  }

  @media (max-width: 576px) {
    padding: 16px 10px 14px;
  }
`;

/* "ONLY AT AETHELCARATS" SECTION */
const OnlyAtAuraSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 80px 32px 88px;
  background-color: #0B0B0B;
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
`;

const OnlyAtAuraTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin-bottom: 32px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OnlyAtAuraCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  .swiper {
    padding: 12px 6px 24px;
    overflow: visible;
  }
`;

const OnlyAtAuraCard = styled(Link)`
  display: block;
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A96E 0%, #E6C887 50%, #C9A96E 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 5;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform: translateY(-6px);
    border-color: #C9A96E;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 18px rgba(201, 169, 110, 0.15);

    &::before {
      opacity: 1;
    }

    img {
      transform: scale(1.06);
    }

    h3 {
      color: #C9A96E;
    }
  }
`;

const OnlyAtAuraCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.3) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 24px;
  color: #F5F1E8;
`;

const OnlyAtAuraCardEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 8px;
`;

const OnlyAtAuraCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #F5F1E8;
  line-height: 1.25;
  margin: 0;
  transition: color 0.3s ease;
`;

const OnlyAtAuraNavArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'prev' ? 'left: -20px;' : 'right: -20px;')}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

/* REVIEWS SECTION */
const ReviewsSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 80px 32px 88px;
  background-color: #111111;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
`;

const ReviewsHeaderRow = styled.div`
  max-width: 1400px;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .header-titles {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const ReviewsEyebrow = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A96E;
`;

const ReviewsTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ReviewsNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewsNavArrow = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(201, 169, 110, 0.3);
  }
`;

const ReviewsCarouselWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  .swiper {
    padding: 12px 6px 24px;
    overflow: visible;
  }
`;

const ReviewCardItem = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.2);
  border-radius: 4px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 290px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A96E 0%, #E6C887 50%, #C9A96E 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: #C9A96E;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 16px rgba(201, 169, 110, 0.15);

    &::before {
      opacity: 1;
    }

    .quote-watermark {
      transform: scale(1.1) rotate(-5deg);
      color: rgba(201, 169, 110, 0.25);
    }
  }
`;

const QuoteWatermark = styled.div`
  position: absolute;
  top: 18px;
  right: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 4rem;
  line-height: 1;
  color: rgba(201, 169, 110, 0.1);
  pointer-events: none;
  transition: all 0.4s ease;
  user-select: none;
`;

const StarsRow = styled.div`
  display: flex;
  gap: 4px;
  color: #C9A96E;
  margin-bottom: 16px;
`;

const ReviewCardTitle = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #F5F1E8;
  margin: 0 0 10px 0;
  line-height: 1.35;
  letter-spacing: 0.02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewText = styled.p`
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.65;
  font-weight: 400;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(140, 116, 75, 0.35) 50%, transparent 100%);
  margin-bottom: 16px;
`;

const CustomerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CustomerName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #F5F1E8;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
`;

const collectionSlides = [
  {
    id: 'slide-1',
    leftImage: '/assets/aura_rings_cat_v2.png',
    rightImage: '/assets/gem_solitaire_ring_perfect_v2.png',
    eyebrow: 'THE 2026 ANNIVERSARY COLLECTION',
    title: 'The Signature Solitaire Collection',
    link: '/collections/signature-collection',
  },
  {
    id: 'slide-2',
    leftImage: '/assets/aura_necklaces_cat_v2.png',
    rightImage: '/assets/aura_high_jewellery_v2.png',
    eyebrow: 'RIVIERE & TENNIS DESIGNS',
    title: 'The Haute Joaillerie Necklaces',
    link: '/necklaces',
  },
  {
    id: 'slide-3',
    leftImage: '/assets/aura_earrings_cat_v2.png',
    rightImage: '/assets/aura_editorial_banner_v2.png',
    eyebrow: 'FINE EARRINGS & CHANDELIERS',
    title: 'The Diamond Chandelier Collection',
    link: '/earrings',
  },
  {
    id: 'slide-4',
    leftImage: '/assets/aura_bracelets_editorial_left_v2026.png',
    rightImage: '/assets/gem_bracelets_editorial_right_new.png',
    eyebrow: 'EMERALD CUT TENNIS LINE',
    title: 'Bespoke Diamond Line Bracelets',
    link: '/bracelets',
  },
];

const DEFAULT_HERO_SLIDES: HeroBanner[] = [
  {
    id: 'hero-slide-1',
    productType: 'Engagement Ring',
    imagePath: '/assets/Engagement Ring.png',
    mobileImagePath: '/assets/Engagement Ring Mobile.png',
    subtitle: 'AETHELCARATS HAUTE JOAILLERIE',
    title: "TIMELESS BEAUTY.\nETERNAL BRILLIANCE.",
    description: "Discover jewellery crafted to become part of your story.",
    primaryCtaText: 'EXPLORE COLLECTION',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'DISCOVER DIAMONDS',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'hero-slide-2',
    productType: 'Necklace',
    imagePath: '/assets/Necklace.png',
    mobileImagePath: '/assets/Necklace Mobile.png',
    subtitle: 'THE ART OF HIGH DIAMOND CRAFT',
    title: "EXQUISITE RIVIÈRE &\nSOLITAIRE CREATIONS",
    description: "Handcrafted masterworks set in 18K gold and platinum with certified precision-cut diamonds.",
    primaryCtaText: 'EXPLORE COLLECTION',
    primaryCtaLink: '/necklaces',
    secondaryCtaText: 'DISCOVER DIAMONDS',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'hero-slide-3',
    productType: 'Earrings',
    imagePath: '/assets/Earrings.png',
    mobileImagePath: '/assets/Earrings Mobile.png',
    subtitle: 'BESPOKE ATELIER SPOTLIGHT',
    title: "UNDERSTATED BRILLIANCE.\nUNCOMPROMISING LUXURY.",
    description: "Exceptional diamond earrings designed for radiant brilliance across every milestone.",
    primaryCtaText: 'EXPLORE COLLECTION',
    primaryCtaLink: '/earrings',
    secondaryCtaText: 'DISCOVER DIAMONDS',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'hero-slide-4',
    productType: 'Bracelet',
    imagePath: '/assets/Bracelet.png',
    mobileImagePath: '/assets/Bracelet Mobile.png',
    subtitle: 'ICONIC FOUR-PRONG TENNIS SUITES',
    title: "FLAWLESS PROPORTIONS.\nETERNAL ELEGANCE.",
    description: "Continuous rows of certified diamonds crafted with precision movement and seamless clasp engineering.",
    primaryCtaText: 'EXPLORE COLLECTION',
    primaryCtaLink: '/bracelets',
    secondaryCtaText: 'DISCOVER DIAMONDS',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 4,
  },
];

const getMobileHeroImagePath = (banner: HeroBanner): string => {
  const type = (banner.productType || '').toLowerCase();
  const title = (banner.title || '').toLowerCase();
  const img = (banner.imagePath || '').toLowerCase();
  const m = (banner.mobileImagePath || '').toLowerCase();

  if (type.includes('ring') || title.includes('ring') || img.includes('ring') || m.includes('ring')) {
    return '/assets/aura_hero_ring_mobile.png';
  }
  if (type.includes('necklace') || title.includes('necklace') || img.includes('necklace') || m.includes('necklace')) {
    return '/assets/aura_hero_necklace_mobile.png';
  }
  if (type.includes('earring') || title.includes('earring') || img.includes('earring') || m.includes('earring')) {
    return '/assets/aura_hero_earrings_mobile.png';
  }
  if (type.includes('bracelet') || title.includes('bracelet') || img.includes('bracelet') || m.includes('bracelet')) {
    return '/assets/aura_bracelets_mobile.png';
  }
  if (banner.mobileImagePath && banner.mobileImagePath.trim() !== '') {
    return banner.mobileImagePath.trim().replace(/ /g, '%20');
  }
  return (banner.imagePath || '').replace(/ /g, '%20');
};


export const HomePage: React.FC = () => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);
  const [heroSwiper, setHeroSwiper] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [dbReviews, setDbReviews] = useState<any[]>([]);
  const [cmsConfig, setCmsConfig] = useState<any>(null);

  useEffect(() => {
    api.getPublicHeroBanners().then((banners) => {
      if (Array.isArray(banners) && banners.length > 0) {
        setHeroBanners(banners);
      }
    }).catch(console.error);

    api.getPublicReviews().then((revs) => {
      if (Array.isArray(revs) && revs.length > 0) {
        const validReviews = revs
          .map((r: any) => {
            const text = String(r.reviewText || r.text || r.content || r.comment || r.description || '').trim();
            const author = String(r.customerName || r.author || r.name || r.authorName || 'Verified Client').trim();
            return {
              id: r.id || Math.random().toString(),
              text,
              author,
              rating: Number(r.rating) || 5,
            };
          })
          .filter((r: any) => r.text.length > 0);

        if (validReviews.length > 0) {
          setDbReviews(validReviews);
        }
      }
    }).catch(console.error);

    api.getSiteSettings('homepage_config').then((data) => {
      if (data && data.homepage_config) {
        try {
          const parsed = typeof data.homepage_config === 'string' ? JSON.parse(data.homepage_config) : data.homepage_config;
          setCmsConfig(parsed);
        } catch (e) {
          console.error('Failed to parse homepage_config:', e);
        }
      }
    }).catch(console.error);
  }, []);

  const activeLookbookSlides = cmsConfig?.collectionSlides && cmsConfig.collectionSlides.length > 0
    ? cmsConfig.collectionSlides
    : collectionSlides;

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? activeLookbookSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev === activeLookbookSlides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = activeLookbookSlides[activeSlideIndex % activeLookbookSlides.length] || activeLookbookSlides[0];

  // Touch & Mouse Swipe Gesture state for Collection Slider
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchEndRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchEndRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndRef.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    if (touchStartRef.current && touchEndRef.current) {
      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
        if (deltaX < 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      }
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY };
    touchEndRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartRef.current) {
      touchEndRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    if (touchStartRef.current && touchEndRef.current) {
      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
        if (deltaX < 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      }
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const onlyAtPrevRef = useRef<HTMLButtonElement>(null);
  const onlyAtNextRef = useRef<HTMLButtonElement>(null);
  const reviewsPrevRef = useRef<HTMLButtonElement>(null);
  const reviewsNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    api.getPageBySlug('home').then((pg) => {
      if (pg && pg.sections) setSections(pg.sections);
    }).catch(console.error);
  }, []);

  // Section 4: Campaign Banner Content
  const campaignBannerSection = sections.find((s) => s.blockType === 'CAMPAIGN_BANNER');
  let campaignBannerContent: any = cmsConfig?.campaignBannerConfig || {
    enableBanner: true,
    desktopImage: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp',
    heading: 'A NEW EXPRESSION OF FINE JEWELLERY',
    description: 'Designed with intention. Crafted with precision. Made to be treasured for generations.',
    buttonText: 'EXPLORE THE COLLECTION',
    buttonLink: '/collections/signature-collection',
    objectPosition: 'center 35%',
    showOverlay: true,
    overlayOpacity: 0.45,
  };

  if (campaignBannerSection && campaignBannerSection.isVisible !== false && !cmsConfig?.campaignBannerConfig) {
    try {
      const parsed = typeof campaignBannerSection.content === 'string' ? JSON.parse(campaignBannerSection.content) : campaignBannerSection.content;
      campaignBannerContent = { ...campaignBannerContent, ...parsed };
    } catch (e) {}
  }

  // Section 8: Diamond Shapes Section Content
  const diamondShapesSection = sections.find((s) => s.blockType === 'DIAMOND_SHAPES' || s.blockType === 'DIAMOND_GRID');
  let diamondShapesContent: any = cmsConfig?.diamondShapesConfig || {
    eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
    heading: 'Discover Exceptional Diamond Shapes',
    description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
    leftImage: '/assets/gem_diamonds_cat.png',
    shapes: [
      { name: 'ROUND', shape: 'round', url: '/diamonds?shape=round', svg: '/assets/diamonds/Round.svg', enabled: true },
      { name: 'OVAL', shape: 'oval', url: '/diamonds?shape=oval', svg: '/assets/diamonds/Oval.svg', enabled: true },
      { name: 'EMERALD', shape: 'emerald', url: '/diamonds?shape=emerald', svg: '/assets/diamonds/Emerald.svg', enabled: true },
      { name: 'PRINCESS', shape: 'princess', url: '/diamonds?shape=princess', svg: '/assets/diamonds/Princess.svg', enabled: true },
      { name: 'CUSHION', shape: 'cushion', url: '/diamonds?shape=cushion', svg: '/assets/diamonds/Cushion.svg', enabled: true },
      { name: 'PEAR', shape: 'pear', url: '/diamonds?shape=pear', svg: '/assets/diamonds/Pear.svg', enabled: true },
      { name: 'RADIANT', shape: 'radiant', url: '/diamonds?shape=radiant', svg: '/assets/diamonds/Radiant.svg', enabled: true },
      { name: 'MARQUISE', shape: 'marquise', url: '/diamonds?shape=marquise', svg: '/assets/diamonds/Marquise.svg', enabled: true },
    ],
  };

  if (diamondShapesSection && diamondShapesSection.isVisible !== false && !cmsConfig?.diamondShapesConfig) {
    try {
      const parsed = typeof diamondShapesSection.content === 'string' ? JSON.parse(diamondShapesSection.content) : diamondShapesSection.content;
      diamondShapesContent = {
        ...diamondShapesContent,
        ...parsed,
        shapes: parsed.shapes && parsed.shapes.length > 0 ? parsed.shapes : diamondShapesContent.shapes,
      };
    } catch (e) {}
  }

  // Section 3: Categories
  const activeCategories = cmsConfig?.categoriesConfig?.items && cmsConfig.categoriesConfig.items.length > 0
    ? cmsConfig.categoriesConfig.items
    : [
        { title: 'RINGS', url: '/rings', image: '/assets/gem_rings_cat.png' },
        { title: 'EARRINGS', url: '/earrings', image: '/assets/gem_earrings_cat.png' },
        { title: 'NECKLACES', url: '/necklaces', image: '/assets/gem_necklaces_cat.png' },
        { title: 'BRACELETS', url: '/bracelets', image: '/assets/gem_bracelets_cat.png' },
        { title: 'PENDANTS', url: '/pendants', image: '/assets/aura_pendants_cat.png' },
        { title: 'DIAMONDS', url: '/diamonds', image: '/assets/gem_diamonds_cat.png' },
      ];

  // Section 5: Two-Panel Featured Cards
  const activeFeaturedCards = cmsConfig?.featuredCards || [
    {
      title: 'RIVIÈRE NECKLACES',
      subtitle: 'Solitaire & Tennis Necklaces',
      imageUrl: '/assets/gem_necklaces_cat.png',
      targetUrl: '/necklaces',
      buttonText: 'SHOP NOW →',
    },
    {
      title: 'HIGH JEWELLERY BRACELETS',
      subtitle: 'Emerald Cut Tennis Bracelets',
      imageUrl: '/assets/gem_bracelets_cat.png',
      targetUrl: '/bracelets',
      buttonText: 'SHOP NOW →',
    },
  ];

  // Section 7: Essentials Dual Promo
  const activeEssentials = cmsConfig?.essentialsConfig || {
    leftTitle: 'DIAMOND ESSENTIALS',
    leftImageUrl: '/assets/gem_diamonds_cat.png',
    leftTargetUrl: '/diamonds',
    leftButtonText: 'DIAMOND ESSENTIALS',
    rightTitle: 'GOLDEN HOUR IS HERE',
    rightImageUrl: '/assets/gem_earrings_cat.png',
    rightTargetUrl: '/collections/signature-collection',
    rightButtonText: 'SHOP THE EVENT',
  };

  // Section 9: Only At Atelier Cards
  const activeAuraCards = cmsConfig?.auraCards && cmsConfig.auraCards.length > 0
    ? cmsConfig.auraCards
    : [
        {
          id: 'only-1',
          eyebrow: 'MASTER ATELIER CRAFTSMANSHIP',
          title: 'Hand-finished custom CAD & precision diamond setting',
          image: '/assets/aura_only_at_1.png',
          url: '/custom-jewellery',
        },
        {
          id: 'only-2',
          eyebrow: 'PRIVATE CONCIERGE CONSULTATION',
          title: 'Bespoke 1-on-1 atelier guidance & CAD preview',
          image: '/assets/aura_only_at_2.png',
          url: '/custom-jewellery',
        },
        {
          id: 'only-3',
          eyebrow: 'AUTHENTICATED CERTIFIED VAULT',
          title: '100% GIA & IGI verified natural & lab-grown stones',
          image: '/assets/aura_only_at_3.png',
          url: '/diamonds',
        },
        {
          id: 'only-4',
          eyebrow: 'SIGNATURE HERITAGE COLLECTIONS',
          title: 'Timeless solitaire & riviere high jewellery pieces',
          image: '/assets/aura_only_at_4.png',
          url: '/collections/signature-collection',
        },
      ];

  // Section 10: Reviews
  const activeReviews = cmsConfig?.customReviews && cmsConfig.customReviews.length > 0
    ? cmsConfig.customReviews
    : (dbReviews.length > 0
      ? dbReviews
      : [
          { id: 'rev-1', text: 'Amazing selection at incredible prices!', author: 'Ryan K.', rating: 5 },
          { id: 'rev-2', text: 'Our wedding bands are perfect. Simple. High quality. Easy. Comfortable.', author: 'Melissa S.', rating: 5 },
          { id: 'rev-3', text: 'Beautiful and great price', author: 'Carolyn M.', rating: 5 },
          { id: 'rev-4', text: 'Exactly as depicted. Beautiful ring, Excellent service.', author: 'Scott C.', rating: 5 },
          { id: 'rev-5', text: 'The custom CAD process was effortless. Exceptional craftsmanship!', author: 'David H.', rating: 5 },
          { id: 'rev-6', text: 'Superb diamond quality and fast insured delivery.', author: 'Elena P.', rating: 5 },
        ]);
  return (
    <>
      {/* 1. DYNAMIC DATABASE-DRIVEN HERO SLIDER / BANNER SYSTEM */}
      {cmsConfig?.sectionVisibility?.hero !== false && (() => {
        const activeHeroSlides = heroBanners && heroBanners.length > 0 ? heroBanners : DEFAULT_HERO_SLIDES;
        return (
          <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={1000}
              autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              onSwiper={(swiper) => setHeroSwiper(swiper)}
              onSlideChange={(swiper) => setActiveHeroIndex(swiper.realIndex)}
              style={{ width: '100%' }}
            >
              {activeHeroSlides.map((banner, idx) => (
                <SwiperSlide key={banner.id || idx}>
                  <HeroSection>
                    <HeroImageColumn>
                      <picture style={{ width: '100%', height: '100%', display: 'block' }}>
                        <source media="(max-width: 768px)" srcSet={encodeURI(getMobileHeroImagePath(banner))} />
                        <img src={banner.imagePath} alt={banner.title || 'AethelCarats High Jewellery'} />
                      </picture>
                    </HeroImageColumn>

                    <HeroOverlay>
                      <HeroTextColumn>
                        {banner.subtitle && (
                          <Eyebrow style={{ color: (banner as any).subtitleColor || cmsConfig?.heroColors?.subtitleColor || undefined }}>
                            {banner.subtitle}
                          </Eyebrow>
                        )}
                        {banner.title && (
                          <HeroTitle style={{ color: (banner as any).titleColor || cmsConfig?.heroColors?.titleColor || undefined }}>
                            {banner.title}
                          </HeroTitle>
                        )}
                        {banner.description && (
                          <HeroSubtitle style={{ color: (banner as any).descriptionColor || cmsConfig?.heroColors?.descriptionColor || undefined }}>
                            {banner.description}
                          </HeroSubtitle>
                        )}
                        {(banner.primaryCtaText || banner.secondaryCtaText) && (
                          <ButtonGroup>
                            {banner.primaryCtaText && (
                              <LuxuryButton
                                to={banner.primaryCtaLink || '/rings'}
                                style={{ color: (banner as any).primaryCtaTextColor || cmsConfig?.heroColors?.primaryCtaTextColor || undefined }}
                              >
                                {banner.primaryCtaText}
                              </LuxuryButton>
                            )}
                            {banner.secondaryCtaText && (
                              <LuxuryButton
                                to={banner.secondaryCtaLink || '/diamonds'}
                                $variant="outline"
                                style={{ color: (banner as any).secondaryCtaTextColor || cmsConfig?.heroColors?.secondaryCtaTextColor || undefined }}
                              >
                                {banner.secondaryCtaText}
                              </LuxuryButton>
                            )}
                          </ButtonGroup>
                        )}
                      </HeroTextColumn>
                    </HeroOverlay>
                  </HeroSection>
                </SwiperSlide>
              ))}
            </Swiper>

            <FancyIndicatorWrapper>
              {activeHeroSlides.map((_, idx) => (
                <FancyIndicatorDash
                  key={idx}
                  $active={idx === (activeHeroIndex % activeHeroSlides.length)}
                  onClick={() => heroSwiper?.slideTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </FancyIndicatorWrapper>
          </div>
        );
      })()}

      {/* 3. LUXURY CATEGORY CAROUSEL */}
      {cmsConfig?.sectionVisibility?.categories !== false && (
        <ExploreWrapper>
          <RevealContainer yOffset={25} duration={0.8}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: cmsConfig?.categoriesConfig?.eyebrowColor || '#C9A96E', display: 'block', marginBottom: 8 }}>
                {cmsConfig?.categoriesConfig?.eyebrow || 'THE COLLECTION MAISON'}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: cmsConfig?.categoriesConfig?.titleColor || '#F5F1E8', margin: 0 }}>
                {cmsConfig?.categoriesConfig?.title || 'Shop By Category'}
              </h2>
            </div>
          </RevealContainer>

          <CarouselContainer>
            <NavArrow ref={prevRef} $direction="prev" aria-label="Previous categories">
              <ChevronLeft size={20} />
            </NavArrow>
            <NavArrow ref={nextRef} $direction="next" aria-label="Next categories">
              <ChevronRight size={20} />
            </NavArrow>

            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.5}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              breakpoints={{
                576: { slidesPerView: 2.2, spaceBetween: 20 },
                768: { slidesPerView: 2.8, spaceBetween: 24 },
                1024: { slidesPerView: 3.8, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {activeCategories.map((cat: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <RevealContainer delay={(idx % 6) * 0.09} yOffset={35} scaleInitial={0.98}>
                    <CategoryCard to={cat.url}>
                      <SafeImage src={cat.image} alt={cat.title} loading="lazy" />
                      <CardOverlay>
                        <CategoryTitle style={{ color: cat.titleColor || undefined }}>{cat.title}</CategoryTitle>
                      </CardOverlay>
                    </CategoryCard>
                  </RevealContainer>
                </SwiperSlide>
              ))}
            </Swiper>
          </CarouselContainer>
        </ExploreWrapper>
      )}

      {/* 4. EDITORIAL CAMPAIGN BANNER */}
      {cmsConfig?.sectionVisibility?.campaignBanner !== false && campaignBannerContent && campaignBannerContent.enableBanner !== false && (
        <RevealContainer yOffset={35} duration={0.95} scaleInitial={0.99}>
          <EditorialBannerSection>
            <EditorialBannerContainer
              $bgImage={campaignBannerContent.desktopImage || '/assets/aura_editorial_banner_v3.png'}
              $tabletImage={campaignBannerContent.tabletImage}
              $mobileImage={campaignBannerContent.mobileImage}
              $objectPosition={campaignBannerContent.objectPosition || 'center 35%'}
              $showOverlay={campaignBannerContent.showOverlay !== false}
              $overlayOpacity={campaignBannerContent.overlayOpacity ?? 0.45}
              $bannerHeightDesktop={campaignBannerContent.bannerHeightDesktop}
              $bannerHeightTablet={campaignBannerContent.bannerHeightTablet}
              $bannerHeightMobile={campaignBannerContent.bannerHeightMobile}
              $paddingTopBottom={campaignBannerContent.paddingTopBottom}
            >
              <EditorialBannerContent $textColor={campaignBannerContent.textColor || '#1F1F1F'}>
                {campaignBannerContent.heading && (
                  <RevealContainer delay={0.0} yOffset={20}>
                    <EditorialBannerTitle $textColor={campaignBannerContent.headingTextColor || campaignBannerContent.textColor || '#1F1F1F'}>
                      {campaignBannerContent.heading}
                    </EditorialBannerTitle>
                  </RevealContainer>
                )}
                {(campaignBannerContent.description || campaignBannerContent.subtitle) && (
                  <RevealContainer delay={0.12} yOffset={20}>
                    <EditorialBannerDesc $textColor={campaignBannerContent.descTextColor || campaignBannerContent.textColor || '#444444'}>
                      {campaignBannerContent.description || campaignBannerContent.subtitle}
                    </EditorialBannerDesc>
                  </RevealContainer>
                )}
                {campaignBannerContent.buttonText && (
                  <RevealContainer delay={0.22} yOffset={20}>
                    <EditorialBannerButton
                      to={campaignBannerContent.buttonLink || '/collections/signature-collection'}
                      $buttonBg={campaignBannerContent.buttonBg || '#1F1F1F'}
                      $buttonColor={campaignBannerContent.buttonColor || '#FFFDF9'}
                    >
                      {campaignBannerContent.buttonText}
                    </EditorialBannerButton>
                  </RevealContainer>
                )}
              </EditorialBannerContent>
            </EditorialBannerContainer>
          </EditorialBannerSection>
        </RevealContainer>
      )}

      {/* 5. STATIC TWO-PANEL EDITORIAL SECTION */}
      {cmsConfig?.sectionVisibility?.featured !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <StaticEditorialSection>
            <StaticEditorialContainer>
              <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
                <StaticEditorialPanel to={activeFeaturedCards[0]?.targetUrl || '/necklaces'}>
                  <SafeImage src={activeFeaturedCards[0]?.imageUrl || '/assets/gem_necklaces_cat.png'} alt={activeFeaturedCards[0]?.title || 'Riviere Necklaces'} />
                  <StaticEditorialPanelOverlay>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: activeFeaturedCards[0]?.titleColor || '#C9A96E', marginBottom: 8 }}>
                      {activeFeaturedCards[0]?.title || 'RIVIERE NECKLACES'}
                    </span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: activeFeaturedCards[0]?.subtitleColor || '#FFFDF9', marginBottom: 14 }}>
                      {activeFeaturedCards[0]?.subtitle || 'Solitaire & Tennis Necklaces'}
                    </h3>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: activeFeaturedCards[0]?.buttonColor || '#FFFDF9' }}>
                      {activeFeaturedCards[0]?.buttonText || 'SHOP NOW →'}
                    </span>
                  </StaticEditorialPanelOverlay>
                </StaticEditorialPanel>
              </RevealContainer>

              <RevealContainer delay={0.15} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
                <StaticEditorialPanel to={activeFeaturedCards[1]?.targetUrl || '/bracelets'}>
                  <SafeImage src={activeFeaturedCards[1]?.imageUrl || '/assets/gem_bracelets_cat.png'} alt={activeFeaturedCards[1]?.title || 'High Jewellery Bracelets'} />
                  <StaticEditorialPanelOverlay>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: activeFeaturedCards[1]?.titleColor || '#C9A96E', marginBottom: 8 }}>
                      {activeFeaturedCards[1]?.title || 'HIGH JEWELLERY BRACELETS'}
                    </span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: activeFeaturedCards[1]?.subtitleColor || '#FFFDF9', marginBottom: 14 }}>
                      {activeFeaturedCards[1]?.subtitle || 'Emerald Cut Tennis Bracelets'}
                    </h3>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: activeFeaturedCards[1]?.buttonColor || '#FFFDF9' }}>
                      {activeFeaturedCards[1]?.buttonText || 'SHOP NOW →'}
                    </span>
                  </StaticEditorialPanelOverlay>
                </StaticEditorialPanel>
              </RevealContainer>
            </StaticEditorialContainer>
          </StaticEditorialSection>
        </RevealContainer>
      )}

      {/* 6. EDITORIAL LOOKBOOK COLLECTION SECTION */}
      {cmsConfig?.sectionVisibility?.signature !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <EditorialCollectionSection
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <EditorialCollectionGrid>
              <EditorialCollectionLeft>
                <RevealContainer delay={0.0} yOffset={25}>
                  <FixedLeftImgWrap key={`left-wrap-${currentSlide.id || activeSlideIndex}`}>
                    <SafeImage src={currentSlide.leftImage} alt={currentSlide.title} key={currentSlide.leftImage} />
                  </FixedLeftImgWrap>
                </RevealContainer>
                <RevealContainer delay={0.08} yOffset={15}>
                  <EditorialEyebrow style={{ color: currentSlide.eyebrowColor || undefined }}>{currentSlide.eyebrow}</EditorialEyebrow>
                </RevealContainer>
                <RevealContainer delay={0.16} yOffset={20}>
                  <EditorialTitle style={{ color: currentSlide.titleColor || undefined }}>{currentSlide.title}</EditorialTitle>
                </RevealContainer>
                <RevealContainer delay={0.24} yOffset={15}>
                  <ShopNowLink to={currentSlide.link} style={{ color: currentSlide.buttonColor || undefined }}>
                    SHOP NOW &rarr;
                  </ShopNowLink>
                </RevealContainer>
                <CenteredNavControlsWrapper>
                  <NavControlsRow>
                    <button onClick={handlePrevSlide} aria-label="Previous slide">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="slide-counter">
                      0{activeSlideIndex + 1} / 0{activeLookbookSlides.length}
                    </span>
                    <button onClick={handleNextSlide} aria-label="Next slide">
                      <ChevronRight size={18} />
                    </button>
                  </NavControlsRow>
                  <NavPaginationTrack>
                    <NavPaginationActiveLine $activeIndex={activeSlideIndex} $totalSlides={activeLookbookSlides.length} />
                  </NavPaginationTrack>
                </CenteredNavControlsWrapper>
              </EditorialCollectionLeft>

              <EditorialCollectionRight key={`right-wrap-${currentSlide.id || activeSlideIndex}`}>
                <RevealContainer delay={0.15} yOffset={25} scaleInitial={0.985}>
                  <SafeImage
                    src={currentSlide.rightImage}
                    alt={`${currentSlide.title} Editorial`}
                    key={currentSlide.rightImage}
                  />
                </RevealContainer>
              </EditorialCollectionRight>
            </EditorialCollectionGrid>
          </EditorialCollectionSection>
        </RevealContainer>
      )}

      {/* 7. DUAL-PANEL PROMOTIONAL SECTION */}
      {cmsConfig?.sectionVisibility?.essentials !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <PromoSection>
            <PromoGrid>
              <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
                <PromoPanel>
                  <SafeImage
                    src={activeEssentials.leftImageUrl || '/assets/gem_diamonds_cat.png'}
                    alt={activeEssentials.leftTitle || 'Diamond Essentials'}
                  />
                  <LeftPromoButton to={activeEssentials.leftTargetUrl || '/diamonds'} style={{ color: activeEssentials.leftButtonColor || undefined }}>
                    {activeEssentials.leftButtonText || activeEssentials.leftTitle || 'DIAMOND ESSENTIALS'}
                  </LeftPromoButton>
                </PromoPanel>
              </RevealContainer>

              <RevealContainer delay={0.15} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
                <PromoPanel>
                  <SafeImage
                    src={activeEssentials.rightImageUrl || '/assets/gem_earrings_cat.png'}
                    alt={activeEssentials.rightTitle || 'Golden Hour Collection'}
                  />
                  <RightPromoContent>
                    <RightPromoTitle style={{ color: activeEssentials.rightTitleColor || undefined }}>
                      {activeEssentials.rightTitle || 'GOLDEN HOUR IS HERE'}
                    </RightPromoTitle>
                    <RightPromoButton to={activeEssentials.rightTargetUrl || '/collections/signature-collection'} style={{ color: activeEssentials.rightButtonColor || undefined }}>
                      {activeEssentials.rightButtonText || 'SHOP THE EVENT'}
                    </RightPromoButton>
                  </RightPromoContent>
                </PromoPanel>
              </RevealContainer>
            </PromoGrid>
          </PromoSection>
        </RevealContainer>
      )}

      {/* 8. DIAMOND SHAPES SECTION */}
      {cmsConfig?.sectionVisibility?.shapes !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <DiamondShapesSection>
            <DiamondShapesContainer>
              <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985}>
                <DiamondShapesLeft>
                  <SafeImage
                    src={diamondShapesContent.leftImage || diamondShapesContent.desktopImage || '/assets/gem_diamonds_cat.png'}
                    alt="Diamond Vault Shapes"
                  />
                </DiamondShapesLeft>
              </RevealContainer>
              <DiamondShapesRight>
                <RevealContainer delay={0.0} yOffset={15}>
                  <DiamondShapesEyebrow style={{ color: diamondShapesContent.eyebrowColor || undefined }}>
                    {diamondShapesContent.eyebrow || 'AUTHENTICATED LOOSE DIAMONDS'}
                  </DiamondShapesEyebrow>
                </RevealContainer>
                <RevealContainer delay={0.08} yOffset={20}>
                  <DiamondShapesTitle style={{ color: diamondShapesContent.headingColor || undefined }}>
                    {diamondShapesContent.heading || 'Discover Exceptional Diamond Shapes'}
                  </DiamondShapesTitle>
                </RevealContainer>
                <RevealContainer delay={0.16} yOffset={15}>
                  <DiamondShapesSubtitle style={{ color: diamondShapesContent.descriptionColor || undefined }}>
                    {diamondShapesContent.description || diamondShapesContent.subtitle || 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.'}
                  </DiamondShapesSubtitle>
                </RevealContainer>

                <DiamondShapesGrid>
                  {diamondShapesContent.shapes
                    .filter((item: any) => item.enabled !== false)
                    .map((item: any, idx: number) => (
                      <RevealContainer key={item.shape || idx} delay={0.1 + (idx % 4) * 0.08} yOffset={20}>
                        <DiamondShapeCard to={item.url || `/diamonds?shape=${item.shape || item.name.toLowerCase()}`}>
                          <DiamondShapeSvg
                            src={item.svg || item.image || `/assets/diamonds/${item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase() : 'Round'}.svg`}
                            alt={item.altText || `${item.name} Diamond Cut`}
                            $desktopSize={item.desktopSize}
                            $tabletSize={item.tabletSize}
                            $mobileSize={item.mobileSize}
                            loading="lazy"
                          />
                          <span>{item.name}</span>
                        </DiamondShapeCard>
                      </RevealContainer>
                    ))}
                </DiamondShapesGrid>

                <div>
                  <RevealContainer delay={0.35} yOffset={15}>
                    <LuxuryButton to={diamondShapesContent.buttonLink || '/diamonds'} style={{ color: diamondShapesContent.buttonColor || undefined }}>
                      {diamondShapesContent.buttonText || 'FIND YOUR DIAMOND'} <ArrowRight size={16} />
                    </LuxuryButton>
                  </RevealContainer>
                </div>
              </DiamondShapesRight>
            </DiamondShapesContainer>
          </DiamondShapesSection>
        </RevealContainer>
      )}

      {/* 9. "ONLY AT AETHELCARATS" SHOWCASE SECTION */}
      {cmsConfig?.sectionVisibility?.onlyAura !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <OnlyAtAuraSection>
            <OnlyAtAuraTitle style={{ color: cmsConfig?.auraTitleColor || undefined }}>
              {cmsConfig?.auraTitle || 'ONLY AT AETHELCARATS'}
            </OnlyAtAuraTitle>
            <OnlyAtAuraCarouselWrapper>
              <OnlyAtAuraNavArrow ref={onlyAtPrevRef} $direction="prev" aria-label="Previous cards">
                <ChevronLeft size={20} />
              </OnlyAtAuraNavArrow>
              <OnlyAtAuraNavArrow ref={onlyAtNextRef} $direction="next" aria-label="Next cards">
                <ChevronRight size={20} />
              </OnlyAtAuraNavArrow>

              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1}
                autoplay={false}
                onBeforeInit={(swiper) => {
                  if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                    swiper.params.navigation.prevEl = onlyAtPrevRef.current;
                    swiper.params.navigation.nextEl = onlyAtNextRef.current;
                  }
                }}
                breakpoints={{
                  576: { slidesPerView: 2, spaceBetween: 16 },
                  992: { slidesPerView: 3, spaceBetween: 16 },
                }}
              >
                {activeAuraCards.map((card: any, idx: number) => (
                  <SwiperSlide key={card.id || idx}>
                    <RevealContainer delay={(idx % 4) * 0.1} yOffset={25} scaleInitial={0.985}>
                      <OnlyAtAuraCard to={card.url || '/custom-jewellery'}>
                        <SafeImage src={card.image} alt={card.title} loading="lazy" />
                        <OnlyAtAuraCardOverlay>
                          <OnlyAtAuraCardEyebrow style={{ color: card.eyebrowColor || undefined }}>{card.eyebrow}</OnlyAtAuraCardEyebrow>
                          <OnlyAtAuraCardTitle style={{ color: card.titleColor || undefined }}>{card.title}</OnlyAtAuraCardTitle>
                        </OnlyAtAuraCardOverlay>
                      </OnlyAtAuraCard>
                    </RevealContainer>
                  </SwiperSlide>
                ))}
              </Swiper>
            </OnlyAtAuraCarouselWrapper>
          </OnlyAtAuraSection>
        </RevealContainer>
      )}

      {/* 10. VOICES OF ELEGANCE / REVIEWS SECTION */}
      {cmsConfig?.sectionVisibility?.reviews !== false && (
        <RevealContainer yOffset={35} duration={0.9}>
          <ReviewsSection id="reviews">
            <ReviewsHeaderRow>
              <div className="header-titles">
                <ReviewsEyebrow style={{ color: cmsConfig?.reviewsConfig?.eyebrowColor || undefined }}>
                  {cmsConfig?.reviewsConfig?.eyebrow || 'AUTHENTICATED CLIENT TESTIMONIALS'}
                </ReviewsEyebrow>
                <ReviewsTitle style={{ color: cmsConfig?.reviewsConfig?.titleColor || undefined }}>
                  {cmsConfig?.reviewsConfig?.title || 'VOICES OF ELEGANCE'}
                </ReviewsTitle>
              </div>
              <ReviewsNavGroup>
                <ReviewsNavArrow ref={reviewsPrevRef} aria-label="Previous reviews">
                  <ChevronLeft size={20} />
                </ReviewsNavArrow>
                <ReviewsNavArrow ref={reviewsNextRef} aria-label="Next reviews">
                  <ChevronRight size={20} />
                </ReviewsNavArrow>
              </ReviewsNavGroup>
            </ReviewsHeaderRow>

            <ReviewsCarouselWrapper>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    if (swiper && swiper.params && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean' && swiper.navigation) {
                      swiper.params.navigation.prevEl = reviewsPrevRef.current;
                      swiper.params.navigation.nextEl = reviewsNextRef.current;
                      swiper.navigation?.init();
                      swiper.navigation?.update();
                    }
                  });
                }}
                breakpoints={{
                  576: { slidesPerView: 2, spaceBetween: 20 },
                  992: { slidesPerView: 3, spaceBetween: 24 },
                  1200: { slidesPerView: 4, spaceBetween: 28 },
                }}
              >
                {activeReviews.map((rev: any, idx: number) => {
                  const fullText = String(rev.text || rev.reviewText || rev.content || rev.comment || 'Exceptional craftsmanship and superb diamond quality.').trim();
                  const rawTitle = rev.title || (fullText.length > 40 ? fullText.split('.')[0] : 'Exceeded Every Expectation!');
                  const titleText = rawTitle.length > 55 ? rawTitle.slice(0, 55) + '...' : rawTitle;
                  const bodyText = rev.title ? fullText : (fullText.length > 40 && fullText.includes('.') ? fullText.split('.').slice(1).join('.').trim() || fullText : fullText);

                  return (
                    <SwiperSlide key={rev.id || idx}>
                      <RevealContainer delay={(idx % 4) * 0.12} yOffset={25}>
                        <ReviewCardItem>
                          <QuoteWatermark className="quote-watermark">“</QuoteWatermark>
                          <StarsRow>
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={15} fill="#C9A96E" color="#C9A45C" />
                            ))}
                          </StarsRow>
                          <ReviewCardTitle style={{ color: rev.titleColor || undefined }}>{titleText}</ReviewCardTitle>
                          <ReviewText style={{ color: rev.textColor || undefined }}>{bodyText}</ReviewText>
                          <ReviewDivider />
                          <CustomerFooter>
                            <CustomerInfo>
                              <CustomerName style={{ color: rev.authorColor || undefined }}>
                                {rev.author || rev.customerName || rev.name || 'Verified Client'}
                              </CustomerName>
                              <VerifiedBadge>
                                <ShieldCheck size={12} color="#C9A45C" /> VERIFIED BUYER
                              </VerifiedBadge>
                            </CustomerInfo>
                          </CustomerFooter>
                        </ReviewCardItem>
                      </RevealContainer>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </ReviewsCarouselWrapper>
          </ReviewsSection>
        </RevealContainer>
      )}
    </>
  );
};
