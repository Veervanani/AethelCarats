import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Award, CheckCircle, ShieldCheck, Mail, ChevronRight, Wrench } from 'lucide-react';
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

const CoverageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CoverageCard = styled.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #1a1918;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #55524d;
    line-height: 1.6;
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

export const LifetimeWarrantyPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Limited Lifetime Warranty | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about the Floksy Jewel Free Limited Lifetime Warranty covering manufacturing craftsmanship, prong inspection, and complimentary cleaning.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/lifetime-warranty#webpage',
          'url': 'https://floksyjewel.com/lifetime-warranty',
          'name': 'Free Limited Lifetime Warranty | Floksy Jewel',
          'description': 'Our lifetime commitment to manufacturing quality, stone security, and complimentary maintenance.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/lifetime-warranty#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Why Floksy Jewel', 'item': 'https://floksyjewel.com/lifetime-warranty' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Limited Lifetime Warranty', 'item': 'https://floksyjewel.com/lifetime-warranty' }
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
        <span>Why Floksy Jewel</span>
        <ChevronRight size={12} />
        <span className="current">Limited Lifetime Warranty</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">GUARANTEED CRAFTSMANSHIP</span>
          <h1>Limited Lifetime Warranty</h1>
          <p className="subtitle">
            Every piece created by Floksy Jewel is hand-crafted to exacting standards. We proudly stand behind our master goldsmiths with a complimentary Limited Lifetime Warranty against manufacturing defects.
          </p>
          <Link
            to="/contact-us"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#1a1918',
              color: '#fffdf9',
              padding: '14px 28px',
              borderRadius: 4,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            REQUEST WARRANTY ASSISTANCE
          </Link>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/lifetime-warranty-hero.jpg" alt="Master Jeweller Polishing Diamond Ring" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>Our Quality Guarantee</h2>
          <p>
            When you purchase fine jewellery from Floksy Jewel, your piece is inspected through multi-point gemmological protocols. We guarantee that your item is free from manufacturing defects in structure, setting, and metal casting at the time of delivery.
          </p>
          <p>
            If you ever believe your item has a manufacturing defect, send it to our atelier for expert inspection. If a defect is confirmed, we will repair or replace the item free of charge.
          </p>

          <CoverageGrid>
            <CoverageCard>
              <h3><CheckCircle size={18} color="#c9a45c" /> What Is Covered</h3>
              <p>Manufacturing defects in metal casting, prong alignment, channel settings, solder joints, and structural integrity under normal wear.</p>
            </CoverageCard>
            <CoverageCard>
              <h3><Award size={18} color="#c9a45c" /> Complimentary Services</h3>
              <p>Complimentary annual prong tightening, stone inspection, steam cleaning, and rhodium polishing at our atelier.</p>
            </CoverageCard>
          </CoverageGrid>
        </EditorialBlock>

        <EditorialBlock>
          <h2>Care & Maintenance Guidance</h2>
          <p>
            Fine jewellery is crafted from precious metals that can naturally experience wear over time. Normal wear and tear, accidental damage, loss of stones due to impact, or repairs performed by third-party jewellers are not covered under warranty.
          </p>
          <p>
            We recommend scheduling an annual inspection with our concierge to ensure prongs remain taut and settings remain secure.
          </p>
        </EditorialBlock>
      </ContentGrid>

      <CTABanner>
        <CTABannerInner>
          <h2>Need Maintenance or Repair Assistance?</h2>
          <p>
            Contact our Customer Care team to schedule your complimentary annual jewellery inspection or service.
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
