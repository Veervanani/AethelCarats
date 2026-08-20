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
    font-size: 2rem;
    font-weight: 500;
    color: #1a1918;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    font-size: 0.9rem;
    color: #77736c;
    margin-top: 6px;
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
  background: #fffdf9;
  border: 1px solid ${({ $active }) => ($active ? '#c9a45c' : '#e8e3d9')};
  padding: 24px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  transition: all 0.2s ease;
  box-shadow: ${({ $active }) => ($active ? '0 4px 16px rgba(201, 164, 92, 0.15)' : 'none')};

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#1a1918' : '#f5f2ea')};
    color: ${({ $active }) => ($active ? '#c9a45c' : '#1a1918')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  span {
    font-size: 0.82rem;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: ${({ $active }) => ($active ? '#c9a45c' : '#1a1918')};
    line-height: 1.4;
  }

  &:hover {
    border-color: #c9a45c;
    transform: translateY(-2px);

    .icon-wrapper {
      background: #c9a45c;
      color: #1a1918;
    }

    span {
      color: #c9a45c;
    }
  }
`;

const WHY_PAGES = [
  { label: 'Quality & Value', path: '/about-us', icon: Sparkles },
  { label: 'Return Policy', path: '/returns-refunds', icon: RefreshCw },
  { label: 'Conflict Free Diamonds', path: '/sustainability', icon: ShieldCheck },
  { label: 'Diamond Price Matching', path: '/price-match', icon: Scale },
  { label: 'Limited Lifetime Warranty', path: '/lifetime-warranty', icon: Award },
  { label: 'Free Secure Shipping', path: '/shipping-delivery', icon: Truck },
  { label: 'Jewelry Insurance', path: '/insurance', icon: Lock },
  { label: 'Floksy Jewel Journal', path: '/blog', icon: BookOpen },
  { label: 'Sale Exclusions', path: '/sale-exclusions', icon: Tag },
  { label: 'Contact Concierge', path: '/contact-us', icon: Mail },
];

export const WhyFloksyJewelNav: React.FC = () => {
  const location = useLocation();

  return (
    <RevealContainer yOffset={35}>
      <NavSectionWrapper>
        <SectionHeader>
          <h2>Why Floksy Jewel</h2>
          <p>Discover our uncompromising commitments to ethical sourcing, security, and lifetime value.</p>
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
