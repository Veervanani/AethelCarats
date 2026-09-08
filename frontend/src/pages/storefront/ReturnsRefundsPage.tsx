import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RefreshCw, Mail, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { WhyAuraDiamondNav } from '../../components/ui/WhyAuraDiamondNav';
import { SafeImage } from '../../components/ui/SafeImage';
import { RevealContainer } from '../../components/ui/RevealContainer';

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

const ProcessGrid = styled.section`
  max-width: 1200px;
  margin: 0 auto 64px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 28px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .step-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #C9A96E;
    line-height: 1;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #F5F1E8;
  }

  p {
    font-size: 0.88rem;
    color: #A8A8A8;
    line-height: 1.5;
  }
`;

const PolicyContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PolicySection = styled.section`
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

const ReturnCTABanner = styled.section`
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

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 2px;
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    a.primary-btn {
      background: #C9A96E;
      color: #0B0B0B;
      &:hover {
        background: #DFBA73;
        box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
      }
    }

    a.secondary-btn {
      border: 1px solid rgba(140, 116, 75, 0.35);
      background: #111111;
      color: #F5F1E8;
      &:hover {
        border-color: #C9A96E;
        color: #C9A96E;
      }
    }
  }
`;

export const ReturnsRefundsPage: React.FC = () => {
  const [contactEmail, setContactEmail] = useState('concierge@aethelcarats.com');
  const [cmsPage, setCmsPage] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getPageBySlug('returns-refunds').then((data) => {
      if (data) {
        const raw = data.content || data.draftContent;
        let parsed: any = {};
        if (raw) {
          try {
            parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
          } catch (e) {
            parsed = { content: raw };
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

    api.getSiteSettings().then((settings) => {
      if (settings && settings.contactEmail) {
        setContactEmail(settings.contactEmail);
      }
    }).catch(console.error);
  }, []);

  const c = cmsPage?.parsedContent || {};
  const heroImage = c.desktopImage || c.pageImages?.desktopImage || '/assets/why-aura/returns-refunds-hero.jpg';

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Customer Care</span>
        <ChevronRight size={12} />
        <span className="current">{c.heading || cmsPage?.title || 'Returns & Refunds'}</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow" style={{ color: c.eyebrowColor || undefined }}>
              {c.eyebrow || 'OUR COMMITMENT TO CLIENT ASSURANCE'}
            </span>
            <h1 style={{ color: c.headingColor || undefined }}>
              {c.heading || cmsPage?.title || 'Returns & Refunds'}
            </h1>
            <p className="subtitle" style={{ color: c.introductionColor || undefined }}>
              {c.introduction || 'Clear and transparent guidance for your AethelCarats purchase. We ensure total peace of mind with our complimentary 30-day return policy and gemmological inspection.'}
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
              INITIATE RETURN REQUEST
            </Link>
          </div>
          <div className="image-side">
            <SafeImage src={heroImage} alt={c.heading || 'AethelCarats Presentation Box and Solitaire Ring'} />
          </div>
        </HeroSection>
      </RevealContainer>

      <ProcessGrid>
        <RevealContainer delay={0.0} yOffset={25}>
          <ProcessCard>
            <span className="step-number">01</span>
            <h3>Submit Request</h3>
            <p>Contact our concierge team with your Order ID to initiate a return request.</p>
          </ProcessCard>
        </RevealContainer>

        <RevealContainer delay={0.1} yOffset={25}>
          <ProcessCard>
            <span className="step-number">02</span>
            <h3>Instructions</h3>
            <p>Receive return shipping guidelines and secure return paperwork.</p>
          </ProcessCard>
        </RevealContainer>

        <RevealContainer delay={0.2} yOffset={25}>
          <ProcessCard>
            <span className="step-number">03</span>
            <h3>Secure Return</h3>
            <p>Package the item securely with original certificates and luxury box.</p>
          </ProcessCard>
        </RevealContainer>

        <RevealContainer delay={0.3} yOffset={25}>
          <ProcessCard>
            <span className="step-number">04</span>
            <h3>Inspection</h3>
            <p>Gemmological verification by our master jewellers upon arrival.</p>
          </ProcessCard>
        </RevealContainer>

        <RevealContainer delay={0.4} yOffset={25}>
          <ProcessCard>
            <span className="step-number">05</span>
            <h3>Refund</h3>
            <p>Reimbursement processed to original payment method within 5–7 business days.</p>
          </ProcessCard>
        </RevealContainer>
      </ProcessGrid>

      <PolicyContainer>
        <RevealContainer yOffset={35}>
          <PolicySection>
            <h2>30-Day Return Policy</h2>
            <p>
              At AethelCarats, we stand behind the craftsmanship and quality of our fine jewellery. If for any reason you are not completely satisfied with your purchase of a standard, non-customised item, you may return it within 30 days of initial delivery for a full refund or exchange.
            </p>
            <p>
              To be eligible for a return, the jewellery piece must satisfy all of the following conditions:
            </p>
            <ul>
              <li>Must be unworn, undamaged, and in pristine original condition.</li>
              <li>Must include all original diamond grading certificates (GIA, IGI), authenticity cards, and documentation.</li>
              <li>Must be returned in the original illuminated AethelCarats presentation packaging.</li>
            </ul>
          </PolicySection>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <PolicySection>
            <h2>Custom & Bespoke Creations</h2>
            <p>
              Because custom jewellery pieces, special-order diamond cuts, and personalized engraved creations are uniquely hand-crafted to your individual specifications, they are exempt from standard returns and non-refundable.
            </p>
            <p>
              However, we want you to cherish your piece. We offer complimentary ring resizing within 60 days of purchase and complimentary cleaning, inspection, and prong checks.
            </p>
          </PolicySection>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <PolicySection>
            <h2>Inspection & Quality Controls</h2>
            <p>
              All returned jewellery undergoes rigorous gemmological inspection at our master atelier. We verify the diamond laser inscriptions, serial numbers, metal purity hallmarks, and stone settings against original production records.
            </p>
            <p>
              Items showing signs of wear, alteration, resizing by unauthorized third-party jewellers, or missing diamond certificates will not be accepted and will be returned to the sender.
            </p>
          </PolicySection>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <PolicySection>
            <h2>Refund Processing & Timelines</h2>
            <p>
              Upon successful inspection (typically within 2 to 3 business days of receipt), your refund will be issued to your original payment method. Depending on your financial institution, funds usually appear on your statement within 5 to 7 business days.
            </p>
            <p>
              Return shipping fees are complimentary for domestic orders using our prepaid insured shipping labels. International return shipping rates may vary.
            </p>
          </PolicySection>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <PolicySection>
            <h2>Damaged or Incorrect Items</h2>
            <p>
              In the unlikely event that an item arrives damaged, defective, or incorrect, please notify Customer Care within 48 hours of delivery. We will immediately arrange a priority replacement or full refund.
            </p>
          </PolicySection>
        </RevealContainer>
      </PolicyContainer>

      <RevealContainer yOffset={35}>
        <ReturnCTABanner>
          <CTABannerInner>
            <h2>Need Help With a Return?</h2>
            <p>
              Our customer care concierge team is available to assist you with return authorizations, shipping labels, or exchange guidance.
            </p>
            <div className="btn-group">
              <Link to="/contact-us" className="primary-btn">
                <RefreshCw size={16} /> CONTACT CUSTOMER CARE
              </Link>
              <a href={`mailto:${contactEmail}`} className="secondary-btn">
                <Mail size={16} /> EMAIL CONCIERGE
              </a>
            </div>
          </CTABannerInner>
        </ReturnCTABanner>
      </RevealContainer>
      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
