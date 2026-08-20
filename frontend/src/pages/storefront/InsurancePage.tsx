import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, ShieldCheck, FileText, Mail, ChevronRight, CheckCircle } from 'lucide-react';
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

const AppraisalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AppraisalCard = styled.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #1a1918;
    margin-bottom: 10px;
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

export const InsurancePage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Jewelry Insurance | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Protect your investment with Floksy Jewel official valuation documentation, GIA/IGI certificates, and specialized jewellery insurance guidance.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/insurance#webpage',
          'url': 'https://floksyjewel.com/insurance',
          'name': 'Jewelry Insurance & Appraisal Valuation | Floksy Jewel',
          'description': 'Official appraisal documentation, diamond certificates, and guidance for securing comprehensive jewellery insurance.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/insurance#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Why Floksy Jewel', 'item': 'https://floksyjewel.com/insurance' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Jewelry Insurance', 'item': 'https://floksyjewel.com/insurance' }
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
        <span className="current">Jewelry Insurance</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">PROTECTING YOUR PRECIOUS CREATIONS</span>
          <h1>Jewelry Insurance</h1>
          <p className="subtitle">
            Your fine jewellery represents both sentimental devotion and enduring financial value. We assist you with official appraisal documentation and GIA/IGI certificates to simplify insurance coverage.
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
            REQUEST APPRAISAL DOCUMENTATION
          </Link>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/insurance-hero.jpg" alt="Fine Diamond Necklace in Vault Display Case" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>Official Valuation & Appraisal</h2>
          <p>
            While Floksy Jewel provides comprehensive transit insurance until your purchase is delivered, personal jewellery insurance protects your piece against loss, theft, or damage throughout your lifetime.
          </p>
          <p>
            To help you secure comprehensive coverage from specialized jewellery insurers (such as Jewelers Mutual or your preferred provider), Floksy Jewel provides complimentary official appraisal documentation for high-value purchases.
          </p>

          <AppraisalsGrid>
            <AppraisalCard>
              <h3><FileText size={18} color="#c9a45c" /> Valuation Documents</h3>
              <p>Detailed itemized description including metal gram weight, diamond carat weight, cut grade, color, and retail replacement value.</p>
            </AppraisalCard>
            <AppraisalCard>
              <h3><ShieldCheck size={18} color="#c9a45c" /> Independent Certificates</h3>
              <p>Original GIA or IGI diamond grading reports verifying laser inscriptions and stone micro-details.</p>
            </AppraisalCard>
          </AppraisalsGrid>
        </EditorialBlock>

        <EditorialBlock>
          <h2>Recommended Insurance Steps</h2>
          <p>
            Securing specialized jewellery insurance is quick and straightforward:
          </p>
          <ul>
            <li>Request your Floksy Jewel appraisal valuation document upon order completion.</li>
            <li>Submit the valuation and diamond certificate to your insurance provider.</li>
            <li>Ensure coverage includes worldwide protection against loss, theft, damage, and mysterious disappearance.</li>
          </ul>
        </EditorialBlock>
      </ContentGrid>

      <CTABanner>
        <CTABannerInner>
          <h2>Need an Insurance Valuation Report?</h2>
          <p>
            Contact our Customer Care team to receive a duplicate copy of your item's appraisal documentation.
          </p>
          <Link to="/contact-us" className="primary-btn">
            <Mail size={16} /> REQUEST APPRAISAL COPY
          </Link>
        </CTABannerInner>
      </CTABanner>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
