import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tag, ShieldCheck, Mail, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { SafeImage } from '../../components/ui/SafeImage';
import { WhyFloksyJewelNav } from '../../components/ui/WhyFloksyJewelNav';

const PageWrapper = styled.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`;

const BreadcrumbsBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.current {
    color: #1a1918;
    font-weight: 500;
  }
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 24px;
  }

  .text-side {
    .eyebrow {
      font-size: 0.8rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #c9a45c;
      font-weight: 600;
      margin-bottom: 12px;
      display: block;
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem;
      font-weight: 500;
      color: #1a1918;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
      line-height: 1.1;

      @media (max-width: 768px) {
        font-size: 2.3rem;
      }
    }

    p.subtitle {
      font-size: 1.05rem;
      color: #55524d;
      line-height: 1.7;
      margin-bottom: 28px;
    }
  }

  .image-side {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);

    img {
      width: 100%;
      height: 420px;
      object-fit: cover;

      @media (max-width: 768px) {
        height: 280px;
      }
    }
  }
`;

const ContentGrid = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const EditorialBlock = styled.section`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 36px;
  border-radius: 4px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #1a1918;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8e3d9;
  }

  p {
    font-size: 0.95rem;
    color: #55524d;
    line-height: 1.7;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 12px 0 16px 20px;
    color: #55524d;
    font-size: 0.95rem;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
`;

const CTABanner = styled.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`;

const CTABannerInner = styled.div`
  background: #1a1918;
  color: #fffdf9;
  padding: 40px;
  border-radius: 4px;
  text-align: center;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #fffdf9;
    margin-bottom: 12px;
  }

  p {
    color: #d9d3c7;
    font-size: 0.95rem;
    max-width: 540px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  a.primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #c9a45c;
    color: #1a1918;
    padding: 14px 28px;
    border-radius: 4px;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: #fffdf9;
    }
  }
`;

export const SaleExclusionsPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Sale Exclusions | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Review official Floksy Jewel promotional exclusions, special offer terms, and custom order guidelines.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/sale-exclusions#webpage',
          'url': 'https://floksyjewel.com/sale-exclusions',
          'name': 'Sale Exclusions & Promotional Terms | Floksy Jewel',
          'description': 'Official policy details regarding promotional codes, special offers, loose diamonds, and bespoke custom items.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/sale-exclusions#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Sale Exclusions', 'item': 'https://floksyjewel.com/sale-exclusions' }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span className="current">Sale Exclusions</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">PROMOTIONAL GUIDELINES & TERMS</span>
          <h1>Sale Exclusions</h1>
          <p className="subtitle">
            Official guidelines and policy terms regarding promotional discount codes, special seasonal offers, loose certified diamonds, and bespoke custom jewellery.
          </p>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/sale-exclusions-hero.jpg" alt="Floksy Jewel Ring on Ivory Pedestal" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>Promotional Discount Guidelines</h2>
          <p>
            Promotional codes, seasonal offers, and storewide discounts offered by Floksy Jewel apply to eligible ready-to-ship fine jewellery items unless explicitly stated otherwise.
          </p>
          <p>
            Promotional offers cannot be combined with existing sale prices, trade-in allowances, or price-matched diamond orders. Limit one promotional code per transaction.
          </p>
        </EditorialBlock>

        <EditorialBlock>
          <h2>Standard Exclusions</h2>
          <p>
            Unless explicitly specified in a promotional campaign announcement, the following categories are excluded from discount promotional codes:
          </p>
          <ul>
            <li>Loose Natural and Lab-Grown Diamonds.</li>
            <li>Custom 3D CAD Bespoke Jewellery Creations.</li>
            <li>Special order gemstones and rare fancy-colored diamonds.</li>
            <li>Gift Cards and e-Vouchers.</li>
            <li>Shipping, insurance, and duties charges.</li>
          </ul>
        </EditorialBlock>
      </ContentGrid>

      <CTABanner>
        <CTABannerInner>
          <h2>Have Questions About a Promo Code?</h2>
          <p>
            Our customer care team is available to assist you with order verification or discount eligibility.
          </p>
          <Link to="/contact-us" className="primary-btn">
            <Mail size={16} /> CONTACT CUSTOMER CARE
          </Link>
        </CTABannerInner>
      </CTABanner>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
