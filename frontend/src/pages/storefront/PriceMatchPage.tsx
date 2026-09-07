import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, ChevronRight } from 'lucide-react';
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

const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepTile = styled.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 24px;
  border-radius: 4px;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #C9A96E;
    margin-bottom: 8px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: #F5F1E8;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.88rem;
    color: #A8A8A8;
    line-height: 1.5;
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

export const PriceMatchPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Diamond Price Matching | AethelCarats Fine Jewellery';
  }, []);

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Why AethelCarats</span>
        <ChevronRight size={12} />
        <span className="current">Diamond Price Matching</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow">UNCOMPROMISING DIAMOND VALUE</span>
            <h1>Diamond Price Matching</h1>
            <p className="subtitle">
              We are dedicated to providing superior diamond quality at fair, competitive prices. If you locate an identical certified diamond offered for less by a recognized retailer, AethelCarats will match the price.
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
              REQUEST A PRICE MATCH
            </Link>
          </div>
          <div className="image-side">
            <SafeImage src="/assets/why-aura/price-match-hero.jpg" alt="Loose Diamond Appraisal on Velvet Display" />
          </div>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>How Price Matching Works</h2>
            <p>
              At AethelCarats, pricing integrity is paramount. Because we work directly with diamond sightholders and maintain direct atelier oversight, we deliver exceptional diamond value without traditional retail markups.
            </p>
            <p>
              To request a price match before completing your purchase, simply submit the diamond specifications or GIA/IGI certificate number to our concierge team.
            </p>

            <StepsRow>
              <RevealContainer delay={0.0} yOffset={25}>
                <StepTile>
                  <div className="num">01</div>
                  <h3>Locate Diamond</h3>
                  <p>Find a loose diamond with identical Carat, Color, Clarity, Cut, and GIA/IGI grading report.</p>
                </StepTile>
              </RevealContainer>
              <RevealContainer delay={0.1} yOffset={25}>
                <StepTile>
                  <div className="num">02</div>
                  <h3>Submit Details</h3>
                  <p>Share the certificate number and retailer offer link with our concierge team.</p>
                </StepTile>
              </RevealContainer>
              <RevealContainer delay={0.2} yOffset={25}>
                <StepTile>
                  <div className="num">03</div>
                  <h3>Review & Match</h3>
                  <p>Our gemmologists verify like-for-like criteria and adjust your price immediately.</p>
                </StepTile>
              </RevealContainer>
            </StepsRow>
          </EditorialBlock>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Matching Eligibility Criteria</h2>
            <p>
              To ensure genuine equity, price matching applies to loose certified diamonds meeting these like-for-like standards:
            </p>
            <ul>
              <li>Must have identical 4Cs (Carat, Color, Clarity, Cut) and proportions.</li>
              <li>Must possess an authentic GIA or IGI grading report.</li>
              <li>Must be currently in stock and available for immediate purchase from an authorized retailer.</li>
              <li>Applies prior to diamond order placement.</li>
            </ul>
          </EditorialBlock>
        </RevealContainer>
      </ContentGrid>

      <RevealContainer yOffset={35}>
        <CTABanner>
          <CTABannerInner>
            <h2>Ready to Verify a Diamond Price?</h2>
            <p>
              Contact our jewellery concierge with your target diamond details for an instant price evaluation.
            </p>
            <Link to="/contact-us" className="primary-btn">
              <Mail size={16} /> SUBMIT PRICE MATCH REQUEST
            </Link>
          </CTABannerInner>
        </CTABanner>
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
