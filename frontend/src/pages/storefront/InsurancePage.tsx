import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ShieldCheck, FileText, Mail, ChevronRight } from 'lucide-react';
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

const AppraisalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AppraisalCard = styled.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 0.9rem;
    color: #A8A8A8;
    line-height: 1.6;
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

export const InsurancePage: React.FC = () => {
  const [cmsPage, setCmsPage] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getPageBySlug('insurance').then((data) => {
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
  const heroImage = c.desktopImage || c.pageImages?.desktopImage || '/assets/why-aura/insurance-hero.jpg';

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Why AethelCarats</span>
        <ChevronRight size={12} />
        <span className="current">{c.heading || cmsPage?.title || 'Jewellery Insurance'}</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow" style={{ color: c.eyebrowColor || undefined }}>
              {c.eyebrow || 'PROTECTING YOUR PRECIOUS CREATIONS'}
            </span>
            <h1 style={{ color: c.headingColor || undefined }}>
              {c.heading || cmsPage?.title || 'Jewellery Insurance'}
            </h1>
            <p className="subtitle" style={{ color: c.introductionColor || undefined }}>
              {c.introduction || 'Your fine jewellery represents both sentimental devotion and enduring financial value. We assist you with official appraisal documentation and GIA/IGI certificates to simplify insurance coverage.'}
            </p>
            <Link
              to="/contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#C9A96E',
                color: '#0B0B0B',
                padding: '14px 28px',
                borderRadius: 2,
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              REQUEST APPRAISAL DOCUMENTATION
            </Link>
          </div>
          <div className="image-side">
            <SafeImage src={heroImage} alt={c.heading || 'Fine Diamond Necklace in Vault Display Case'} />
          </div>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Official Valuation & Appraisal</h2>
            <p style={{ color: c.insuranceInformationColor || undefined }}>
              {c.insuranceInformation || 'While AethelCarats provides comprehensive transit insurance until your purchase is delivered, personal jewellery insurance protects your piece against loss, theft, or damage throughout your lifetime.'}
            </p>
            <p style={{ color: c.coverageColor || undefined }}>
              {c.coverage || 'To help you secure comprehensive coverage from specialized jewellery insurers, AethelCarats provides complimentary official appraisal documentation for fine jewellery pieces.'}
            </p>

            <AppraisalsGrid>
              <RevealContainer delay={0.0} yOffset={25}>
                <AppraisalCard>
                  <h3><FileText size={18} color="#C9A96E" /> Valuation Documents</h3>
                  <p>Detailed itemized description including metal gram weight, diamond carat weight, cut grade, color, and retail replacement value.</p>
                </AppraisalCard>
              </RevealContainer>
              <RevealContainer delay={0.1} yOffset={25}>
                <AppraisalCard>
                  <h3><ShieldCheck size={18} color="#C9A96E" /> Independent Certificates</h3>
                  <p>Original GIA or IGI diamond grading reports verifying laser inscriptions and stone micro-details.</p>
                </AppraisalCard>
              </RevealContainer>
            </AppraisalsGrid>
          </EditorialBlock>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Recommended Insurance Steps</h2>
            <p style={{ color: c.claimsColor || undefined }}>
              {c.claims || 'Securing specialized jewellery insurance is quick and straightforward:'}
            </p>
            <ul>
              <li>Request your AethelCarats appraisal valuation document upon order completion.</li>
              <li>Submit the valuation and diamond certificate to your insurance provider.</li>
              <li>Ensure coverage includes worldwide protection against loss, theft, damage, and mysterious disappearance.</li>
            </ul>
          </EditorialBlock>
        </RevealContainer>
      </ContentGrid>

      <RevealContainer yOffset={35}>
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
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
