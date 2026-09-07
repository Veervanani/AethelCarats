import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RefreshCw, ShieldCheck, Scale, Award, Truck, Lock, Sparkles, BookOpen, Tag, Mail } from 'lucide-react';
import { RevealContainer } from './RevealContainer';

const NavSectionWrapper = styled.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 500;
    color: #F5F1E8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-top: 8px;
    letter-spacing: 0.04em;
  }
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NavItemCard = styled(Link)<{ $active: boolean }>`
  background: #151515;
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  padding: 24px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? '0 4px 20px rgba(201, 169, 110, 0.2)' : 'none')};

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#C9A96E' : '#111111')};
    color: ${({ $active }) => ($active ? '#0B0B0B' : '#C9A96E')};
    border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.3)')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  span {
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ $active }) => ($active ? '#C9A96E' : '#F5F1E8')};
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  &:hover {
    border-color: #C9A96E;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

    .icon-wrapper {
      background: #C9A96E;
      color: #0B0B0B;
    }

    span {
      color: #C9A96E;
    }
  }
`;

const WHY_PAGES = [
  { label: 'Quality & Value', path: '/about-us', icon: Sparkles },
  { label: 'Return Policy', path: '/returns-refunds', icon: RefreshCw },
  { label: 'Conflict Free Diamonds', path: '/sustainability', icon: ShieldCheck },
  { label: 'Diamond Price Matching', path: '/price-match', icon: Scale },
  { label: 'Lifetime Warranty', path: '/lifetime-warranty', icon: Award },
  { label: 'Free Insured Shipping', path: '/shipping-delivery', icon: Truck },
  { label: 'Jewellery Insurance', path: '/insurance', icon: Lock },
  { label: 'AethelCarats Journal', path: '/blog', icon: BookOpen },
  { label: 'Sale Exclusions', path: '/sale-exclusions', icon: Tag },
  { label: 'Contact Concierge', path: '/contact-us', icon: Mail },
];

export const WhyAuraDiamondNav: React.FC = () => {
  const location = useLocation();

  return (
    <RevealContainer yOffset={35}>
      <NavSectionWrapper>
        <SectionHeader>
          <h2>Why AethelCarats Atelier</h2>
          <p>Discover our commitments to master craftsmanship, certified diamonds, and lifetime value.</p>
        </SectionHeader>

        <NavGrid>
          {WHY_PAGES.map((page, idx) => {
            const Icon = page.icon;
            const isActive = location.pathname === page.path;
            return (
              <RevealContainer key={page.path} staggerIndex={idx} yOffset={20}>
                <NavItemCard to={page.path} $active={isActive}>
                  <div className="icon-wrapper">
                    <Icon size={20} />
                  </div>
                  <span>{page.label}</span>
                </NavItemCard>
              </RevealContainer>
            );
          })}
        </NavGrid>
      </NavSectionWrapper>
    </RevealContainer>
  );
};
