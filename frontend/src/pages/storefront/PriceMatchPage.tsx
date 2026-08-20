import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Scale, CheckCircle, Search, Mail, ChevronRight, HelpCircle } from 'lucide-react';
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

const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepTile = styled.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #c9a45c;
    margin-bottom: 8px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: #1a1918;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.88rem;
    color: #55524d;
    line-height: 1.5;
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

export const PriceMatchPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Diamond Price Matching | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover the Floksy Jewel Diamond Price Match guarantee. We match like-for-like certified GIA and IGI loose diamond offers.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/price-match#webpage',
          'url': 'https://floksyjewel.com/price-match',
          'name': 'Diamond Price Matching Guarantee | Floksy Jewel',
          'description': 'Our commitment to exceptional diamond pricing and like-for-like certified diamond matching.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/price-match#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Why Floksy Jewel', 'item': 'https://floksyjewel.com/price-match' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Diamond Price Matching', 'item': 'https://floksyjewel.com/price-match' }
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
        <span className="current">Diamond Price Matching</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">UNCOMPROMISING DIAMOND VALUE</span>
          <h1>Diamond Price Matching</h1>
          <p className="subtitle">
            We are dedicated to providing superior diamond quality at fair, competitive prices. If you locate an identical certified diamond offered for less by a recognized retailer, Floksy Jewel will match the price.
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
            REQUEST A PRICE MATCH
          </Link>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/price-match-hero.jpg" alt="Loose Diamond Appraisal on Velvet Display" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>How Price Matching Works</h2>
          <p>
            At Floksy Jewel, pricing integrity is paramount. Because we work directly with diamond sightholders and maintain direct atelier oversight, we deliver exceptional diamond value without traditional retail markups.
          </p>
          <p>
            To request a price match before completing your purchase, simply submit the diamond specifications or GIA/IGI certificate number to our concierge team.
          </p>

          <StepsRow>
            <StepTile>
              <div className="num">01</div>
              <h3>Locate Diamond</h3>
              <p>Find a loose diamond with identical Carat, Color, Clarity, Cut, and GIA/IGI grading report.</p>
            </StepTile>
            <StepTile>
              <div className="num">02</div>
              <h3>Submit Details</h3>
              <p>Share the certificate number and retailer offer link with our concierge team.</p>
            </StepTile>
            <StepTile>
              <div className="num">03</div>
              <h3>Review & Match</h3>
              <p>Our gemmologists verify like-for-like criteria and adjust your price immediately.</p>
            </StepTile>
          </StepsRow>
        </EditorialBlock>

        <EditorialBlock>
          <h2>Matching Eligibility Criteria</h2>
          <p>
            To ensure genuine equity, price matching applies to loose certified diamonds meeting these like-for-like standards:
          </p>
          <ul>
            <li>Must have identical 4Cs (Carat, Color, Clarity, Cut) and proportions.</li>
            <li>Must possess an authentic GIA or IGI grading report.</li>
            <li>Must be currently in stock and available for immediate purchase from a authorized retailer.</li>
            <li>Applies prior to diamond order placement.</li>
          </ul>
        </EditorialBlock>
      </ContentGrid>

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

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
