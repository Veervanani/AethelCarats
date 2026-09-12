import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, ChevronRight } from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { WhyAuraDiamondNav } from '../../components/ui/WhyAuraDiamondNav';
import { RevealContainer } from '../../components/ui/RevealContainer';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
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
  color: #A8A8A8;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #C9A96E;
    font-weight: 600;
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
      color: #C9A96E;
      font-weight: 700;
      margin-bottom: 12px;
      display: block;
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem;
      font-weight: 500;
      color: #F5F1E8;
      margin-bottom: 20px;
      letter-spacing: 0.04em;
      line-height: 1.1;

      @media (max-width: 768px) {
        font-size: 2.3rem;
      }
    }

    p.subtitle {
      font-size: 1.05rem;
      color: #D8D2C5;
      line-height: 1.7;
      margin-bottom: 28px;
    }
  }

  .image-side {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(140, 116, 75, 0.25);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);

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
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 36px;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: #F5F1E8;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  }

  p {
    font-size: 0.95rem;
    color: #D8D2C5;
    line-height: 1.7;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 12px 0 16px 20px;
    color: #D8D2C5;
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
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 40px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    color: #D8D2C5;
    font-size: 0.95rem;
    max-width: 540px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  a.primary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #C9A96E;
    color: #0B0B0B;
    padding: 14px 28px;
    border-radius: 2px;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    }
  }
`;

export const SaleExclusionsPage: React.FC = () => {
  const [cmsPage, setCmsPage] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getPageBySlug('sale-exclusions').then((data) => {
      if (data) {
        const raw = data.draftContent || data.content;
        let parsed: any = {};
        if (raw) {
          try {
            parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
          } catch (e) {
            parsed = { content: raw };
          }
        }
        if ((!parsed || Object.keys(parsed).length === 0) && data.content) {
          try {
            parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
          } catch (e) {
            parsed = { content: data.content };
          }
        }
        setCmsPage({ ...data, parsedContent: parsed });
        if (data.seoMetadata?.seoTitle) {
          document.title = data.seoMetadata.seoTitle;
        } else if (data.title) {
          document.title = `${data.title} | AethelCarats Fine Jewellery`;
        }
      }
    }).catch(console.warn);
  }, []);

  const c = cmsPage?.parsedContent || {};
  const heroImage = c.desktopImage || c.pageImages?.desktopImage || '';

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Why AethelCarats</span>
        <ChevronRight size={12} />
        <span className="current">{c.heading || cmsPage?.title || 'Sale Exclusions'}</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow" style={{ color: c.eyebrowColor || undefined }}>
              {c.eyebrow || 'PROMOTIONAL GUIDELINES & TERMS'}
            </span>
            <h1 style={{ color: c.headingColor || undefined }}>
              {c.heading || cmsPage?.title || 'Sale Exclusions'}
            </h1>
            <p className="subtitle" style={{ color: c.introductionColor || undefined }}>
              {c.introduction || 'Official guidelines and policy terms regarding promotional discount codes, special seasonal offers, loose certified diamonds, and bespoke custom jewellery.'}
            </p>
          </div>
          <div className="image-side">
            <SafeImage src={heroImage} alt={c.heading || 'AethelCarats Ring on Pedestal'} />
          </div>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Promotional Discount Guidelines</h2>
            {c.exclusionRules ? (
              <p style={{ color: c.exclusionRulesColor || undefined, whiteSpace: 'pre-line' }}>{c.exclusionRules}</p>
            ) : (
              <>
                <p>
                  Promotional codes, seasonal offers, and storewide discounts offered by AethelCarats apply to eligible ready-to-ship fine jewellery items unless explicitly stated otherwise.
                </p>
                <p>
                  Promotional offers cannot be combined with existing sale prices, trade-in allowances, or price-matched diamond orders. Limit one promotional code per transaction.
                </p>
              </>
            )}
          </EditorialBlock>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Standard Exclusions</h2>
            {c.excludedProducts || c.excludedCategories ? (
              <>
                {c.excludedProducts && (
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#C9A96E', marginBottom: 8 }}>Excluded Products</h3>
                    <p style={{ color: c.excludedProductsColor || undefined, whiteSpace: 'pre-line' }}>{c.excludedProducts}</p>
                  </div>
                )}
                {c.excludedCategories && (
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#C9A96E', marginBottom: 8 }}>Excluded Categories</h3>
                    <p style={{ color: c.excludedCategoriesColor || undefined, whiteSpace: 'pre-line' }}>{c.excludedCategories}</p>
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </EditorialBlock>
        </RevealContainer>

        {/* Dynamic CMS Sections if configured */}
        {cmsPage?.sections?.map((sec: any, idx: number) => {
          if (sec.isVisible === false) return null;
          let s: any = {};
          try { s = typeof sec.content === 'string' ? JSON.parse(sec.content) : (sec.content || {}); } catch (e) { s = { text: sec.content }; }
          return (
            <RevealContainer key={sec.id || idx} yOffset={35}>
              <EditorialBlock>
                <h2>{sec.title || s.title || s.heading}</h2>
                {s.subtitle && <h4 style={{ color: '#C9A96E', margin: '0 0 12px', fontSize: '1rem' }}>{s.subtitle}</h4>}
                <p style={{ whiteSpace: 'pre-line' }}>{s.description || s.text || s.content || ''}</p>
              </EditorialBlock>
            </RevealContainer>
          );
        })}
      </ContentGrid>

      <RevealContainer yOffset={35}>
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
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
