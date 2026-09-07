import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Award, CheckCircle, Mail, ChevronRight } from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { WhyAuraDiamondNav } from '../../components/ui/WhyAuraDiamondNav';
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

const CoverageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CoverageCard = styled.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 12px;
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

export const LifetimeWarrantyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Lifetime Warranty | AethelCarats Fine Jewellery';
  }, []);

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Why AethelCarats</span>
        <ChevronRight size={12} />
        <span className="current">Lifetime Warranty</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow">GUARANTEED CRAFTSMANSHIP</span>
            <h1>Lifetime Warranty</h1>
            <p className="subtitle">
              Every piece created by AethelCarats is hand-crafted to exacting standards. We proudly stand behind our master goldsmiths with a complimentary Lifetime Warranty against manufacturing defects.
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
              REQUEST WARRANTY ASSISTANCE
            </Link>
          </div>
          <div className="image-side">
            <SafeImage src="/assets/why-aura/lifetime-warranty-hero.jpg" alt="Master Jeweller Polishing Diamond Ring" />
          </div>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Our Quality Guarantee</h2>
            <p>
              When you purchase fine jewellery from AethelCarats, your piece is inspected through multi-point gemmological protocols. We guarantee that your item is free from manufacturing defects in structure, setting, and metal casting at the time of delivery.
            </p>
            <p>
              If you ever believe your item has a manufacturing defect, send it to our atelier for expert inspection. If a defect is confirmed, we will repair or replace the item free of charge.
            </p>

            <CoverageGrid>
              <RevealContainer delay={0.0} yOffset={25}>
                <CoverageCard>
                  <h3><CheckCircle size={18} color="#C9A96E" /> What Is Covered</h3>
                  <p>Manufacturing defects in metal casting, prong alignment, channel settings, solder joints, and structural integrity under normal wear.</p>
                </CoverageCard>
              </RevealContainer>
              <RevealContainer delay={0.1} yOffset={25}>
                <CoverageCard>
                  <h3><Award size={18} color="#C9A96E" /> Complimentary Services</h3>
                  <p>Complimentary annual prong tightening, stone inspection, steam cleaning, and rhodium polishing at our atelier.</p>
                </CoverageCard>
              </RevealContainer>
            </CoverageGrid>
          </EditorialBlock>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Care & Maintenance Guidance</h2>
            <p>
              Fine jewellery is crafted from precious metals that can naturally experience wear over time. Normal wear and tear, accidental damage, loss of stones due to impact, or repairs performed by third-party jewellers are not covered under warranty.
            </p>
            <p>
              We recommend scheduling an annual inspection with our concierge to ensure prongs remain taut and settings remain secure.
            </p>
          </EditorialBlock>
        </RevealContainer>
      </ContentGrid>

      <RevealContainer yOffset={35}>
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
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
