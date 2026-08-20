import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Diamond as DiamondIcon, ShieldCheck, Sparkles, Truck, ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
  min-height: 620px;
  height: clamp(620px, 78vh, 820px);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #1F1F1F;
  text-align: left;
  padding: 0 7.5%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #FAF9F6;

  @media (max-width: 1024px) {
    padding: 0 5%;
    min-height: 540px;
    height: clamp(540px, 70vh, 720px);
  }

  @media (max-width: 768px) {
    height: 82svh;
    min-height: 560px;
    max-height: 720px;
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
    padding-top: 36px;
    background: linear-gradient(
      to bottom,
      rgba(250, 249, 246, 0.95) 0%,
      rgba(250, 249, 246, 0.65) 45%,
      rgba(250, 249, 246, 0) 85%
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
  letter-spacing: 0.26em;
  font-weight: 700;
  color: #C9A45C;
  text-transform: uppercase;
  margin-bottom: 22px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    margin-bottom: 6px;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 4.2vw, 3.8rem);
  font-weight: 400;
  line-height: 1.1;
  color: #1F1F1F;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.45rem;
    line-height: 1.22;
    margin-bottom: 8px;
    white-space: normal;
    font-weight: 500;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  color: #555555;
  margin-bottom: 38px;
  font-weight: 300;
  line-height: 1.65;
  max-width: 480px;

  @media (max-width: 768px) {
    font-size: 0.78rem;
    line-height: 1.4;
    margin-bottom: 14px;
    margin-left: auto;
    margin-right: auto;
    max-width: 290px;
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
  padding: 16px 28px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
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

  background-color: ${({ $variant }) => ($variant === 'outline' ? 'transparent' : '#1F1F1F')};
  color: ${({ $variant }) => ($variant === 'outline' ? '#1F1F1F' : '#FFFDF9')};
  border: 1px solid #1F1F1F;

  &:hover {
    background-color: ${({ $variant }) => ($variant === 'outline' ? '#1F1F1F' : '#C9A45C')};
    border-color: ${({ $variant }) => ($variant === 'outline' ? '#1F1F1F' : '#C9A45C')};
    color: ${({ $variant }) => ($variant === 'outline' ? '#FFFDF9' : '#1F1F1F')};
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(31, 31, 31, 0.18);
  }

  @media (max-width: 1024px) {
    padding: 14px 20px;
    font-size: 0.74rem;
    letter-spacing: 0.12em;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 9px 14px;
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

/* 4-COLUMN TRUST / VALUE PROPOSITION SECTION */
const ValuePropsRow = styled.div`
  background-color: #FAF9F6;
  border-top: 1px solid #E8E3D9;
  border-bottom: 1px solid #E8E3D9;
  padding: 54px 24px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 32px 16px 24px;
  }
`;

const ValuePropsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
  align-items: stretch;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const ValuePropCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E8E3D9;
  border-radius: 4px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  height: 100%;
  min-height: 220px;
  box-shadow: 0 6px 20px rgba(36, 35, 33, 0.02);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A45C 0%, #E6C887 50%, #C9A45C 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: #D4AF37;
    box-shadow: 0 16px 32px rgba(201, 164, 92, 0.12);

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.12) rotate(4deg);
      color: #C9A45C;
    }
  }

  svg {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
  }

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1F1F1F;
    margin: 0;
  }

  p {
    font-size: 0.84rem;
    color: #666666;
    line-height: 1.6;
    margin: 0;
  }
`;

const ValuePropsMobileSliderWrapper = styled.div`
  display: none;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) {
    display: block;
  }

  .swiper {
    padding-bottom: 32px;
    width: 100%;
  }

  .swiper-slide {
    height: auto;
    display: flex;
  }

  .swiper-pagination {
    bottom: 0 !important;
  }

  .swiper-pagination-bullet {
    background: #c9a45c;
    opacity: 0.35;
    width: 7px;
    height: 7px;
    margin: 0 4px !important;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    width: 22px;
    border-radius: 4px;
    background: #c9a45c;
  }
`;

const ValuePropCardMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 24px 18px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(201, 164, 92, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  width: 100%;
  min-height: 150px;
  box-sizing: border-box;

  h4 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #242321;
    margin: 0;
  }

  p {
    font-size: 0.82rem;
    color: #55524d;
    line-height: 1.45;
    margin: 0;
    max-width: 280px;
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
  background-color: #f3efe6;
  border: 1px solid #e8e3d9;
  text-decoration: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.025);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px 16px;
  background: rgba(250, 249, 246, 0.92);
  backdrop-filter: blur(4px);
  border-top: 1px solid rgba(232, 227, 217, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryTitle = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #1F1F1F;
`;

const NavArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'prev' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  color: #1a1918;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;

  &:hover {
    background: #1a1918;
    color: #ffffff;
    border-color: #1a1918;
  }

  &.swiper-button-disabled {
    opacity: 0.3;
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
  background-color: #FAF9F6;
  background-image: ${({ $bgImage }) => `url(${$bgImage || '/assets/floksy_editorial_banner_v3.png'})`};
  background-size: cover;
  background-position: right center;
  border-top: 1px solid #e8e3d9;
  border-bottom: none;
  display: flex;
  align-items: center;
  padding: ${({ $paddingTopBottom }) => $paddingTopBottom || '64px'} 80px;

  @media (max-width: 1024px) {
    padding: 48px 32px;
    min-height: ${({ $bannerHeightTablet }) => $bannerHeightTablet || '420px'};
    background-position: right center;
    background-image: ${({ $tabletImage, $bgImage }) => `url(${$tabletImage || $bgImage || '/assets/floksy_editorial_banner_v3.png'})`};
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
    min-height: ${({ $bannerHeightMobile }) => $bannerHeightMobile || '380px'};
    background-position: right center;
    background-image: ${({ $mobileImage, $tabletImage, $bgImage }) => `url(${$mobileImage || $tabletImage || $bgImage || '/assets/floksy_editorial_banner_v3.png'})`};
  }
`;

const EditorialBannerContent = styled.div<{ $textColor?: string }>`
  max-width: 520px;
  color: ${({ $textColor }) => $textColor || '#fffdf9'};
`;

const EditorialBannerTitle = styled.h2<{ $textColor?: string }>`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.12;
  color: ${({ $textColor }) => $textColor || '#fffdf9'};
  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const EditorialBannerDesc = styled.p<{ $textColor?: string }>`
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.65;
  color: ${({ $textColor }) => ($textColor ? `${$textColor}cc` : '#e0dad0')};
  margin-bottom: 36px;
`;

const EditorialBannerButton = styled(Link)<{ $buttonBg?: string; $buttonColor?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 38px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $buttonColor }) => $buttonColor || '#fffdf9'};
  border: 1px solid ${({ $buttonColor }) => $buttonColor || '#fffdf9'};
  background: ${({ $buttonBg }) => $buttonBg || 'transparent'};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $buttonColor }) => $buttonColor || '#fffdf9'};
    color: ${({ $buttonBg }) => ($buttonBg && $buttonBg !== 'transparent' ? '#fffdf9' : '#242321')};
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
  border-bottom: 1px solid #e8e3d9;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.025);
  }
`;

const StaticEditorialPanelOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26, 25, 24, 0.75) 0%, rgba(26, 25, 24, 0.15) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 44px 40px;
  color: #fffdf9;

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
  border-bottom: none;
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
  background-color: #f9f7f2;
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
  background-color: #f3efe6;
  border: 1px solid #e8e3d9;
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
  color: #c9a45c;
  margin-bottom: 6px;
  display: block;
`;

const EditorialTitle = styled.h3`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: #242321;
  line-height: 1.18;
  margin-bottom: 10px;
`;

const ShopNowLink = styled(Link)`
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #242321;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    color: #c9a45c;
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
    color: #242321;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  .slide-counter {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #242321;
  }
`;

const NavPaginationTrack = styled.div`
  width: 240px;
  max-width: 80%;
  height: 1px;
  background-color: #e8e3d9;
  margin-top: 10px;
  position: relative;
`;

const NavPaginationActiveLine = styled.div<{ $activeIndex: number; $totalSlides: number }>`
  position: absolute;
  top: -0.5px;
  left: ${({ $activeIndex, $totalSlides }) => ($totalSlides > 0 ? ($activeIndex / $totalSlides) * 100 : 0)}%;
  width: ${({ $totalSlides }) => ($totalSlides > 0 ? 100 / $totalSlides : 100)}%;
  height: 2px;
  background-color: #c9a45c;
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
  background: rgba(255, 253, 249, 0.92);
  backdrop-filter: blur(10px);
  border: 1.5px solid #C9A45C;
  color: #1F1F1F;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(36, 35, 33, 0.12);

  &:hover {
    background: #C9A45C;
    border-color: #C9A45C;
    color: #1F1F1F;
    transform: translateX(-50%) translateY(-4px);
    box-shadow: 0 14px 32px rgba(201, 164, 92, 0.3);
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
  color: #1F1F1F;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(250, 249, 246, 0.9);

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
  background: rgba(255, 253, 249, 0.92);
  backdrop-filter: blur(10px);
  color: #1F1F1F;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1.5px solid #C9A45C;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(36, 35, 33, 0.12);

  &:hover {
    background: #C9A45C;
    border-color: #C9A45C;
    color: #1F1F1F;
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(201, 164, 92, 0.3);
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
  border-top: 1px solid #e8e3d9;
  border-bottom: 1px solid #e8e3d9;
  background-color: #f9f7f2;
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
  color: #c9a45c;
  margin-bottom: 12px;
  display: block;
`;

const DiamondShapesTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 400;
  color: #242321;
  line-height: 1.15;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const DiamondShapesSubtitle = styled.p`
  font-size: 0.95rem;
  color: #77736c;
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
  filter: brightness(0.18);
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
  border: 1px solid #E8E3D9;
  background-color: #FFFFFF;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(36, 35, 33, 0.02);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A45C 0%, #E6C887 50%, #C9A45C 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &:hover {
    border-color: #D4AF37;
    background-color: #FFFFFF;
    box-shadow: 0 12px 28px rgba(201, 164, 92, 0.15);
    transform: translateY(-6px);

    &::before {
      opacity: 1;
    }

    img {
      filter: brightness(0) saturate(100%) invert(67%) sepia(35%) saturate(704%) hue-rotate(5deg) brightness(91%) contrast(86%);
      transform: scale(1.12);
    }

    span {
      color: #C9A45C;
    }
  }

  span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1F1F1F;
    text-align: center;
    transition: color 0.3s ease;
  }

  @media (max-width: 576px) {
    padding: 16px 10px 14px;
  }
`;

/* "ONLY AT FLOKSY JEWEL" SECTION */
const OnlyAtFloksySection = styled.section`
  width: 100%;
  margin: 0;
  padding: 80px 32px 88px;
  background-color: #FAF9F6;
  border-bottom: 1px solid #E8E3D9;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 56px 18px;
  }
`;

const OnlyAtFloksyTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1F1F1F;
  margin-bottom: 32px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OnlyAtFloksyCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  .swiper {
    padding: 12px 6px 24px;
    overflow: visible;
  }
`;

const OnlyAtFloksyCard = styled(Link)`
  display: block;
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background-color: #F3EFE6;
  border: 1px solid #E8E3D9;
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(36, 35, 33, 0.04);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C9A45C 0%, #E6C887 50%, #C9A45C 100%);
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
    border-color: #D4AF37;
    box-shadow: 0 20px 40px rgba(36, 35, 33, 0.1);

    &::before {
      opacity: 1;
    }

    img {
      transform: scale(1.06);
    }

    h3 {
      color: #C9A45C;
    }
  }
`;

const OnlyAtFloksyCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26, 25, 24, 0.88) 0%, rgba(26, 25, 24, 0.3) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 24px;
  color: #FFFDF9;
`;

const OnlyAtFloksyCardEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A45C;
  margin-bottom: 8px;
`;

const OnlyAtFloksyCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #FFFDF9;
  line-height: 1.25;
  margin: 0;
  transition: color 0.3s ease;
`;

const OnlyAtFloksyNavArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'prev' ? 'left: -20px;' : 'right: -20px;')}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #FFFFFF;
  border: 1px solid #D9D3C7;
  color: #1F1F1F;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #1F1F1F;
    color: #C9A45C;
    border-color: #1F1F1F;
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
  background-color: #FAF9F6;
  border-top: 1px solid #E8E3D9;
  border-bottom: 1px solid #E8E3D9;
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
  color: #C9A45C;
`;

const ReviewsTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1F1F1F;
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
  background-color: #FFFFFF;
  border: 1px solid #D9D3C7;
  color: #1F1F1F;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #1F1F1F;
    color: #C9A45C;
    border-color: #1F1F1F;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
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
  background: #FFFFFF;
  border: 1px solid #E8E3D9;
  border-radius: 4px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 290px;
  position: relative;
  box-shadow: 0 8px 24px rgba(36, 35, 33, 0.03);
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
    background: linear-gradient(90deg, #C9A45C 0%, #E6C887 50%, #C9A45C 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: #D4AF37;
    box-shadow: 0 20px 40px rgba(36, 35, 33, 0.08);

    &::before {
      opacity: 1;
    }

    .quote-watermark {
      transform: scale(1.1) rotate(-5deg);
      color: rgba(201, 164, 92, 0.18);
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
  color: rgba(201, 164, 92, 0.08);
  pointer-events: none;
  transition: all 0.4s ease;
  user-select: none;
`;

const StarsRow = styled.div`
  display: flex;
  gap: 4px;
  color: #C9A45C;
  margin-bottom: 16px;
`;

const ReviewCardTitle = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1F1F1F;
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
  color: #555555;
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
  background: linear-gradient(90deg, #F2EDE4 0%, #D9D3C7 50%, #F2EDE4 100%);
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
  color: #1F1F1F;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A45C;
`;

const collectionSlides = [
  {
    id: 'slide-1',
    leftImage: '/assets/floksy_rings_cat_v2.png',
    rightImage: '/assets/floksy_solitaire_ring_perfect_v2.png',
    eyebrow: 'THE 2026 ANNIVERSARY COLLECTION',
    title: 'The Signature Solitaire Collection',
    link: '/collections/signature-collection',
  },
  {
    id: 'slide-2',
    leftImage: '/assets/floksy_necklaces_cat_v2.png',
    rightImage: '/assets/floksy_high_jewellery_v2.png',
    eyebrow: 'RIVIERE & TENNIS DESIGNS',
    title: 'The Haute Joaillerie Necklaces',
    link: '/necklaces',
  },
  {
    id: 'slide-3',
    leftImage: '/assets/floksy_earrings_cat_v2.png',
    rightImage: '/assets/floksy_editorial_banner_v2.png',
    eyebrow: 'FINE EARRINGS & CHANDELIERS',
    title: 'The Diamond Chandelier Collection',
    link: '/earrings',
  },
  {
    id: 'slide-4',
    leftImage: '/assets/floksy_bracelets_editorial_left_v2026.png',
    rightImage: '/assets/floksy_bracelets_editorial_right_new.png',
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
    mobileImagePath: '/assets/floksy_hero_ring_mobile.png',
    subtitle: 'THE SIGNATURE COLLECTION 2026',
    title: "Handcrafted\nElegance &\nExceptional\nDiamonds",
    description: 'Immerse yourself in world-class craftsmanship, exceptional diamonds, and timeless bespoke creations.',
    primaryCtaText: 'EXPLORE RINGS',
    primaryCtaLink: '/rings',
    secondaryCtaText: 'THE DIAMOND VAULT →',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'hero-slide-2',
    productType: 'Necklace',
    imagePath: '/assets/Necklace.png',
    mobileImagePath: '/assets/floksy_hero_necklace_mobile.png',
    subtitle: 'THE ART OF HIGH JEWELRY',
    title: "Timeless\nDiamonds,\nRefined\nForever",
    description: 'Discover exquisite diamond necklaces crafted with precision, elegance, and an uncompromising eye for detail.',
    primaryCtaText: 'EXPLORE NECKLACES',
    primaryCtaLink: '/necklaces',
    secondaryCtaText: 'VIEW COLLECTION →',
    secondaryCtaLink: '/collections/signature-collection',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'hero-slide-3',
    productType: 'Earrings',
    imagePath: '/assets/Earrings.png',
    mobileImagePath: '/assets/floksy_hero_earrings_mobile.png',
    subtitle: 'THE SIGNATURE COLLECTION',
    title: "Brilliance\nDesigned to\nBe Remembered",
    description: 'Exceptional diamond earrings, thoughtfully crafted to bring understated brilliance to every occasion.',
    primaryCtaText: 'EXPLORE EARRINGS',
    primaryCtaLink: '/earrings',
    secondaryCtaText: 'DISCOVER DIAMONDS →',
    secondaryCtaLink: '/diamonds',
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'hero-slide-4',
    productType: 'Bracelet',
    imagePath: '/assets/Bracelet.png',
    mobileImagePath: '/assets/floksy_bracelets_mobile.png',
    subtitle: 'BESPOKE DIAMOND JEWELRY',
    title: "Exceptional\nCraftsmanship,\nWorn Forever",
    description: 'Discover refined diamond bracelets created with precision, timeless design, and exceptional craftsmanship.',
    primaryCtaText: 'EXPLORE BRACELETS',
    primaryCtaLink: '/bracelets',
    secondaryCtaText: 'CREATE YOUR OWN →',
    secondaryCtaLink: '/custom-jewellery',
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
    return '/assets/floksy_hero_ring_mobile.png';
  }
  if (type.includes('necklace') || title.includes('necklace') || img.includes('necklace') || m.includes('necklace')) {
    return '/assets/floksy_hero_necklace_mobile.png';
  }
  if (type.includes('earring') || title.includes('earring') || img.includes('earring') || m.includes('earring')) {
    return '/assets/floksy_hero_earrings_mobile.png';
  }
  if (type.includes('bracelet') || title.includes('bracelet') || img.includes('bracelet') || m.includes('bracelet')) {
    return '/assets/floksy_bracelets_mobile.png';
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
          setCmsConfig(JSON.parse(data.homepage_config));
        } catch (e) {}
      }
    }).catch(console.error);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? collectionSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev === collectionSlides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = collectionSlides[activeSlideIndex];

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

  const heroSection = sections.find((s) => s.blockType === 'HERO');
  let heroContent: any = {
    enableHero: true,
    desktopImage: '/assets/floksy-hero-luxury.webp',
    eyebrow: 'THE SIGNATURE COLLECTION 2026',
    heading: 'Handcrafted Elegance & Exceptional Diamonds',
    description: 'Immerse yourself in world-class craftsmanship, ethically sourced diamonds, and timeless bespoke creations.',
    button1Text: 'EXPLORE RINGS',
    button1Link: '/rings',
    button2Text: 'THE DIAMOND VAULT',
    button2Link: '/diamonds',
    showButton1: true,
    showButton2: true,
  };

  if (heroSection && heroSection.isVisible !== false) {
    try {
      const parsed = typeof heroSection.content === 'string' ? JSON.parse(heroSection.content) : heroSection.content;
      heroContent = {
        ...heroContent,
        ...parsed,
      };
    } catch (e) {
      console.error('Error parsing hero content:', e);
    }
  }

  // Force the new custom ultra-luxury cinematic hero banner image
  heroContent.desktopImage = '/assets/floksy-hero-banner.jpg';

  const campaignBannerSection = sections.find((s) => s.blockType === 'CAMPAIGN_BANNER');
  let campaignBannerContent: any = {
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

  if (campaignBannerSection && campaignBannerSection.isVisible !== false) {
    try {
      const parsed = typeof campaignBannerSection.content === 'string' ? JSON.parse(campaignBannerSection.content) : campaignBannerSection.content;
      campaignBannerContent = { ...campaignBannerContent, ...parsed };
    } catch (e) {
      console.error('Error parsing campaign banner content:', e);
    }
  }

  const diamondShapesSection = sections.find((s) => s.blockType === 'DIAMOND_SHAPES' || s.blockType === 'DIAMOND_GRID');
  let diamondShapesContent: any = {
    eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
    heading: 'Discover Exceptional Diamond Shapes',
    description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
    leftImage: '/assets/floksy_diamonds_cat.png',
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

  if (diamondShapesSection && diamondShapesSection.isVisible !== false) {
    try {
      const parsed = typeof diamondShapesSection.content === 'string' ? JSON.parse(diamondShapesSection.content) : diamondShapesSection.content;
      diamondShapesContent = {
        ...diamondShapesContent,
        ...parsed,
        shapes: parsed.shapes && parsed.shapes.length > 0 ? parsed.shapes : diamondShapesContent.shapes,
      };
    } catch (e) {
      console.error('Error parsing diamond shapes content:', e);
    }
  }

  // 6 Core Category Cards mapping for IMAGE-ONLY Luxury Carousel
  const collectionCategories = [
    { title: 'RINGS', url: '/rings', image: '/assets/floksy_rings_cat.png' },
    { title: 'EARRINGS', url: '/earrings', image: '/assets/floksy_earrings_cat.png' },
    { title: 'NECKLACES', url: '/necklaces', image: '/assets/floksy_necklaces_cat.png' },
    { title: 'BRACELETS', url: '/bracelets', image: '/assets/floksy_bracelets_cat.png' },
    { title: 'PENDANTS', url: '/pendants', image: '/assets/floksy_pendants_cat.png' },
    { title: 'DIAMONDS', url: '/diamonds', image: '/assets/floksy_diamonds_cat.png' },
  ];

  // Right Side Manual Slideshow Images
  const rightSlideshowImages = [
    '/assets/floksy_rings_cat.png',
    '/assets/floksy_necklaces_cat.png',
    '/assets/floksy_earrings_cat.png',
    '/assets/floksy_bracelets_cat.png',
  ];

  // 8 Diamond Shapes
  const diamondShapes = [
    { name: 'ROUND', shape: 'round', url: '/diamonds?shape=round' },
    { name: 'OVAL', shape: 'oval', url: '/diamonds?shape=oval' },
    { name: 'EMERALD', shape: 'emerald', url: '/diamonds?shape=emerald' },
    { name: 'PRINCESS', shape: 'princess', url: '/diamonds?shape=princess' },
    { name: 'CUSHION', shape: 'cushion', url: '/diamonds?shape=cushion' },
    { name: 'PEAR', shape: 'pear', url: '/diamonds?shape=pear' },
    { name: 'RADIANT', shape: 'radiant', url: '/diamonds?shape=radiant' },
    { name: 'MARQUISE', shape: 'marquise', url: '/diamonds?shape=marquise' },
  ];

  // ONLY AT FLOKSY JEWEL Carousel Cards Data
  const onlyAtFloksyCards = [
    {
      id: 'only-1',
      eyebrow: 'MASTER ATELIER CRAFTSMANSHIP',
      title: 'Hand-finished custom CAD & precision diamond setting',
      image: '/assets/floksy_only_at_1.png',
      url: '/custom-jewellery',
    },
    {
      id: 'only-2',
      eyebrow: 'PRIVATE CONCIERGE CONSULTATION',
      title: 'Bespoke 1-on-1 atelier guidance & CAD preview',
      image: '/assets/floksy_only_at_2.png',
      url: '/custom-jewellery',
    },
    {
      id: 'only-3',
      eyebrow: 'AUTHENTICATED CERTIFIED VAULT',
      title: '100% GIA & IGI verified natural & lab-grown stones',
      image: '/assets/floksy_only_at_3.png',
      url: '/diamonds',
    },
    {
      id: 'only-4',
      eyebrow: 'SIGNATURE HERITAGE COLLECTIONS',
      title: 'Timeless solitaire & riviere high jewellery pieces',
      image: '/assets/floksy_only_at_4.png',
      url: '/collections/signature-collection',
    },
  ];

  // REVIEWS Carousel Data
  const customerReviews = [
    { id: 'rev-1', text: 'Amazing selection at incredible prices!', author: 'Ryan K.' },
    { id: 'rev-2', text: 'Our wedding bands are perfect. Simple. High quality. Easy. Comfortable.', author: 'Melissa S.' },
    { id: 'rev-3', text: 'Beautiful and great price', author: 'Carolyn M.' },
    { id: 'rev-4', text: 'Exactly as depicted. Beautiful ring, Excellent service.', author: 'Scott C.' },
    { id: 'rev-5', text: 'The custom CAD process was effortless. Exceptional craftsmanship!', author: 'David H.' },
    { id: 'rev-6', text: 'Superb diamond quality and fast insured delivery.', author: 'Elena P.' },
  ];

  return (
    <>
      {/* 1. DYNAMIC DATABASE-DRIVEN HERO SLIDER / BANNER SYSTEM */}
      {(() => {
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
                        <img src={banner.imagePath} alt={banner.title || 'Floksy Jewel High Jewelry'} />
                      </picture>
                    </HeroImageColumn>

                    <HeroOverlay>
                      <HeroTextColumn>
                        {banner.subtitle && <Eyebrow>{banner.subtitle}</Eyebrow>}
                        {banner.title && <HeroTitle>{banner.title}</HeroTitle>}
                        {banner.description && <HeroSubtitle>{banner.description}</HeroSubtitle>}
                        {(banner.primaryCtaText || banner.secondaryCtaText) && (
                          <ButtonGroup>
                            {banner.primaryCtaText && (
                              <LuxuryButton to={banner.primaryCtaLink || '/rings'}>
                                {banner.primaryCtaText}
                              </LuxuryButton>
                            )}
                            {banner.secondaryCtaText && (
                              <LuxuryButton to={banner.secondaryCtaLink || '/diamonds'} $variant="outline">
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

      {/* 2. CERTIFIED LOOSE DIAMONDS 4-COLUMN TRUST / VALUE PROPOSITION SECTION */}
      <RevealContainer yOffset={35} duration={0.9}>
        <ValuePropsRow>
          {/* DESKTOP & TABLET GRID VIEW */}
          <ValuePropsGrid>
            <RevealContainer delay={0.0} yOffset={25} style={{ height: '100%' }}>
              <ValuePropCard>
                <DiamondIcon size={32} color="#C9A45C" />
                <h4>Certified Loose Diamonds</h4>
                <p>GIA & IGI authenticated natural and lab-grown stones.</p>
              </ValuePropCard>
            </RevealContainer>
            <RevealContainer delay={0.1} yOffset={25} style={{ height: '100%' }}>
              <ValuePropCard>
                <Sparkles size={32} color="#C9A45C" />
                <h4>Bespoke Atelier CAD</h4>
                <p>Custom 3D modeling and hand-setting by master jewelers.</p>
              </ValuePropCard>
            </RevealContainer>
            <RevealContainer delay={0.2} yOffset={25} style={{ height: '100%' }}>
              <ValuePropCard>
                <Truck size={32} color="#C9A45C" />
                <h4>Worldwide Insured Transit</h4>
                <p>Complimentary white-glove courier shipping.</p>
              </ValuePropCard>
            </RevealContainer>
            <RevealContainer delay={0.3} yOffset={25} style={{ height: '100%' }}>
              <ValuePropCard>
                <ShieldCheck size={32} color="#C9A45C" />
                <h4>Lifetime Warranty</h4>
                <p>Guaranteed metal purity and complimentary maintenance.</p>
              </ValuePropCard>
            </RevealContainer>
          </ValuePropsGrid>

          {/* MOBILE HAND-GESTURE SLIDER VIEW */}
          <ValuePropsMobileSliderWrapper>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={14}
              slidesPerView={1.15}
              centeredSlides={true}
              loop={false}
              grabCursor={true}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <ValuePropCardMobile>
                  <DiamondIcon size={34} color="#C9A45C" />
                  <h4>Certified Loose Diamonds</h4>
                  <p>GIA & IGI authenticated natural and lab-grown stones.</p>
                </ValuePropCardMobile>
              </SwiperSlide>
              <SwiperSlide>
                <ValuePropCardMobile>
                  <Sparkles size={34} color="#C9A45C" />
                  <h4>Bespoke Atelier CAD</h4>
                  <p>Custom 3D modeling and hand-setting by master jewelers.</p>
                </ValuePropCardMobile>
              </SwiperSlide>
              <SwiperSlide>
                <ValuePropCardMobile>
                  <Truck size={34} color="#C9A45C" />
                  <h4>Worldwide Insured Transit</h4>
                  <p>Complimentary white-glove courier shipping.</p>
                </ValuePropCardMobile>
              </SwiperSlide>
              <SwiperSlide>
                <ValuePropCardMobile>
                  <ShieldCheck size={34} color="#C9A45C" />
                  <h4>Lifetime Warranty</h4>
                  <p>Guaranteed metal purity and complimentary maintenance.</p>
                </ValuePropCardMobile>
              </SwiperSlide>
            </Swiper>
          </ValuePropsMobileSliderWrapper>
        </ValuePropsRow>
      </RevealContainer>

      {/* 3. LUXURY CATEGORY CAROUSEL */}
      <ExploreWrapper>
        <RevealContainer yOffset={25} duration={0.8}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A45C', display: 'block', marginBottom: 8 }}>
              THE COLLECTION MAISON
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1F1F1F', margin: 0 }}>
              Shop By Category
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
            {collectionCategories.map((cat, idx) => (
              <SwiperSlide key={idx}>
                <RevealContainer delay={(idx % 6) * 0.09} yOffset={35} scaleInitial={0.98}>
                  <CategoryCard to={cat.url}>
                    <SafeImage src={cat.image} alt={cat.title} loading="lazy" />
                    <CardOverlay>
                      <CategoryTitle>{cat.title}</CategoryTitle>
                    </CardOverlay>
                  </CategoryCard>
                </RevealContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </CarouselContainer>
      </ExploreWrapper>

      {/* 4. EDITORIAL HERO BANNER */}
      {campaignBannerContent && campaignBannerContent.enableBanner !== false && (
        <RevealContainer yOffset={35} duration={0.95} scaleInitial={0.99}>
          <EditorialBannerSection>
            <EditorialBannerContainer
              $bgImage={campaignBannerContent.desktopImage || '/assets/floksy_editorial_banner_v3.png'}
              $tabletImage={campaignBannerContent.tabletImage}
              $mobileImage={campaignBannerContent.mobileImage}
              $objectPosition={campaignBannerContent.objectPosition || 'center 35%'}
              $showOverlay={campaignBannerContent.showOverlay !== false}
              $overlayOpacity={campaignBannerContent.overlayOpacity}
              $bannerHeightDesktop={campaignBannerContent.bannerHeightDesktop}
              $bannerHeightTablet={campaignBannerContent.bannerHeightTablet}
              $bannerHeightMobile={campaignBannerContent.bannerHeightMobile}
              $paddingTopBottom={campaignBannerContent.paddingTopBottom}
            >
              <EditorialBannerContent $textColor={campaignBannerContent.textColor || '#1F1F1F'}>
                {campaignBannerContent.heading && (
                  <RevealContainer delay={0.0} yOffset={20}>
                    <EditorialBannerTitle $textColor={campaignBannerContent.textColor || '#1F1F1F'}>
                      {campaignBannerContent.heading}
                    </EditorialBannerTitle>
                  </RevealContainer>
                )}
                {(campaignBannerContent.description || campaignBannerContent.subtitle) && (
                  <RevealContainer delay={0.12} yOffset={20}>
                    <EditorialBannerDesc $textColor={campaignBannerContent.textColor || '#444444'}>
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
      <RevealContainer yOffset={35} duration={0.9}>
        <StaticEditorialSection>
          <StaticEditorialContainer>
            <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
              <StaticEditorialPanel to="/necklaces">
                <SafeImage src="/assets/floksy_necklaces_cat.png" alt="Riviere Necklaces" />
                <StaticEditorialPanelOverlay>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A45C', marginBottom: 8 }}>RIVIERE NECKLACES</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: '#FFFDF9', marginBottom: 14 }}>Solitaire & Tennis Necklaces</h3>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFFDF9' }}>SHOP NOW &rarr;</span>
                </StaticEditorialPanelOverlay>
              </StaticEditorialPanel>
            </RevealContainer>

            <RevealContainer delay={0.15} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
              <StaticEditorialPanel to="/bracelets">
                <SafeImage src="/assets/floksy_bracelets_cat.png" alt="High Jewellery Bracelets" />
                <StaticEditorialPanelOverlay>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A45C', marginBottom: 8 }}>HIGH JEWELLERY BRACELETS</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: '#FFFDF9', marginBottom: 14 }}>Emerald Cut Tennis Bracelets</h3>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFFDF9' }}>SHOP NOW &rarr;</span>
                </StaticEditorialPanelOverlay>
              </StaticEditorialPanel>
            </RevealContainer>
          </StaticEditorialContainer>
        </StaticEditorialSection>
      </RevealContainer>

      {/* 6. EDITORIAL COLLECTION SECTION */}
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
                <FixedLeftImgWrap key={`left-wrap-${currentSlide.id}`}>
                  <SafeImage src={currentSlide.leftImage} alt={currentSlide.title} key={currentSlide.leftImage} />
                </FixedLeftImgWrap>
              </RevealContainer>
              <RevealContainer delay={0.08} yOffset={15}>
                <EditorialEyebrow>{currentSlide.eyebrow}</EditorialEyebrow>
              </RevealContainer>
              <RevealContainer delay={0.16} yOffset={20}>
                <EditorialTitle>{currentSlide.title}</EditorialTitle>
              </RevealContainer>
              <RevealContainer delay={0.24} yOffset={15}>
                <ShopNowLink to={currentSlide.link}>
                  SHOP NOW &rarr;
                </ShopNowLink>
              </RevealContainer>
              <CenteredNavControlsWrapper>
                <NavControlsRow>
                  <button onClick={handlePrevSlide} aria-label="Previous slide">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="slide-counter">
                    0{activeSlideIndex + 1} / 0{collectionSlides.length}
                  </span>
                  <button onClick={handleNextSlide} aria-label="Next slide">
                    <ChevronRight size={18} />
                  </button>
                </NavControlsRow>
                <NavPaginationTrack>
                  <NavPaginationActiveLine $activeIndex={activeSlideIndex} $totalSlides={collectionSlides.length} />
                </NavPaginationTrack>
              </CenteredNavControlsWrapper>
            </EditorialCollectionLeft>

            <EditorialCollectionRight key={`right-wrap-${currentSlide.id}`}>
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

      {/* 7. DUAL-PANEL PROMOTIONAL SECTION */}
      <RevealContainer yOffset={35} duration={0.9}>
        <PromoSection>
          <PromoGrid>
            <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
              <PromoPanel>
                <SafeImage
                  src="/assets/floksy_diamonds_cat.png"
                  alt="Diamond Essentials"
                />
                <LeftPromoButton to="/diamonds">
                  DIAMOND ESSENTIALS
                </LeftPromoButton>
              </PromoPanel>
            </RevealContainer>

            <RevealContainer delay={0.15} yOffset={25} scaleInitial={0.985} style={{ height: '100%' }}>
              <PromoPanel>
                <SafeImage
                  src="/assets/floksy_earrings_cat.png"
                  alt="Golden Hour Collection"
                />
                <RightPromoContent>
                  <RightPromoTitle>GOLDEN HOUR IS HERE</RightPromoTitle>
                  <RightPromoButton to="/collections/signature-collection">
                    SHOP THE EVENT
                  </RightPromoButton>
                </RightPromoContent>
              </PromoPanel>
            </RevealContainer>
          </PromoGrid>
        </PromoSection>
      </RevealContainer>

      {/* 8. DIAMOND SHAPES SECTION */}
      <RevealContainer yOffset={35} duration={0.9}>
        <DiamondShapesSection>
          <DiamondShapesContainer>
            <RevealContainer delay={0.0} yOffset={25} scaleInitial={0.985}>
              <DiamondShapesLeft>
                <SafeImage
                  src={diamondShapesContent.leftImage || diamondShapesContent.desktopImage || '/assets/floksy_diamonds_cat.png'}
                  alt="Diamond Vault Shapes"
                />
              </DiamondShapesLeft>
            </RevealContainer>
            <DiamondShapesRight>
              <RevealContainer delay={0.0} yOffset={15}>
                <DiamondShapesEyebrow>{diamondShapesContent.eyebrow || 'AUTHENTICATED LOOSE DIAMONDS'}</DiamondShapesEyebrow>
              </RevealContainer>
              <RevealContainer delay={0.08} yOffset={20}>
                <DiamondShapesTitle>{diamondShapesContent.heading || 'Discover Exceptional Diamond Shapes'}</DiamondShapesTitle>
              </RevealContainer>
              <RevealContainer delay={0.16} yOffset={15}>
                <DiamondShapesSubtitle>
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
                  <LuxuryButton to="/diamonds" style={{ backgroundColor: '#242321', color: '#FFFDF9', border: 'none' }}>
                    FIND YOUR DIAMOND <ArrowRight size={16} />
                  </LuxuryButton>
                </RevealContainer>
              </div>
            </DiamondShapesRight>
          </DiamondShapesContainer>
        </DiamondShapesSection>
      </RevealContainer>

      {/* 9. "ONLY AT FLOKSY JEWEL" SECTION */}
      <RevealContainer yOffset={35} duration={0.9}>
        <OnlyAtFloksySection>
          <OnlyAtFloksyTitle>ONLY AT FLOKSY JEWEL</OnlyAtFloksyTitle>
          <OnlyAtFloksyCarouselWrapper>
            <OnlyAtFloksyNavArrow ref={onlyAtPrevRef} $direction="prev" aria-label="Previous cards">
              <ChevronLeft size={20} />
            </OnlyAtFloksyNavArrow>
            <OnlyAtFloksyNavArrow ref={onlyAtNextRef} $direction="next" aria-label="Next cards">
              <ChevronRight size={20} />
            </OnlyAtFloksyNavArrow>

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
              {onlyAtFloksyCards.map((card, idx) => (
                <SwiperSlide key={card.id}>
                  <RevealContainer delay={(idx % 4) * 0.1} yOffset={25} scaleInitial={0.985}>
                    <OnlyAtFloksyCard to={card.url}>
                      <SafeImage src={card.image} alt={card.title} loading="lazy" />
                      <OnlyAtFloksyCardOverlay>
                        <OnlyAtFloksyCardEyebrow>{card.eyebrow}</OnlyAtFloksyCardEyebrow>
                        <OnlyAtFloksyCardTitle>{card.title}</OnlyAtFloksyCardTitle>
                      </OnlyAtFloksyCardOverlay>
                    </OnlyAtFloksyCard>
                  </RevealContainer>
                </SwiperSlide>
              ))}
            </Swiper>
          </OnlyAtFloksyCarouselWrapper>
        </OnlyAtFloksySection>
      </RevealContainer>

      {/* 10. ULTRA-LUXURY EDITORIAL REVIEWS SECTION */}
      <RevealContainer yOffset={35} duration={0.9}>
        <ReviewsSection id="reviews">
          <ReviewsHeaderRow>
            <div className="header-titles">
              <ReviewsEyebrow>AUTHENTICATED CLIENT TESTIMONIALS</ReviewsEyebrow>
              <ReviewsTitle>VOICES OF ELEGANCE</ReviewsTitle>
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
              {(dbReviews.length > 0 ? dbReviews : customerReviews).map((rev, idx) => {
                const fullText = String(rev.text || rev.reviewText || rev.content || rev.comment || 'Exceptional craftsmanship and superb diamond quality.').trim();
                const rawTitle = rev.title || (fullText.length > 40 ? fullText.split('.')[0] : 'Exceeded Every Expectation!');
                const titleText = rawTitle.length > 55 ? rawTitle.slice(0, 55) + '...' : rawTitle;
                const bodyText = rev.title ? fullText : (fullText.length > 40 && fullText.includes('.') ? fullText.split('.').slice(1).join('.').trim() || fullText : fullText);

                return (
                  <SwiperSlide key={rev.id}>
                    <RevealContainer delay={(idx % 4) * 0.12} yOffset={25}>
                      <ReviewCardItem>
                        <QuoteWatermark className="quote-watermark">“</QuoteWatermark>
                        <StarsRow>
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} size={15} fill="#C9A45C" color="#C9A45C" />
                          ))}
                        </StarsRow>
                        <ReviewCardTitle>{titleText}</ReviewCardTitle>
                        <ReviewText>{bodyText}</ReviewText>
                        <ReviewDivider />
                        <CustomerFooter>
                          <CustomerInfo>
                            <CustomerName>{rev.author || rev.customerName || rev.name || 'Verified Client'}</CustomerName>
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
    </>
  );
};
