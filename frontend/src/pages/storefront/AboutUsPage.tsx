import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Sparkles, ShieldCheck, Award, Heart, Mail, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { SafeImage } from '../../components/ui/SafeImage';
import { WhyFloksyJewelNav } from '../../components/ui/WhyFloksyJewelNav';
import { RevealContainer } from '../../components/ui/RevealContainer';

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
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PillarTile = styled.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1a1918;
    color: #c9a45c;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
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

export const AboutUsPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Quality & Value | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover Floksy Jewel commitment to master craftsmanship, certified diamonds, transparent pricing, and personalized luxury jewellery concierge services.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://floksyjewel.com/#organization',
          'name': 'Floksy Jewel',
          'url': 'https://floksyjewel.com',
          'logo': 'https://floksyjewel.com/assets/floksy-jewel-logo.png',
          'description': 'Luxury fine jewellery atelier specializing in certified natural & lab-grown diamonds, bespoke engagement rings, and high jewellery.',
        },
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/about-us#webpage',
          'url': 'https://floksyjewel.com/about-us',
          'name': 'Quality & Value | Floksy Jewel Brand Story',
          'description': 'Learn about our heritage, master goldsmith craftsmanship, and ethical diamond sourcing.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/about-us#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'About Floksy Jewel', 'item': 'https://floksyjewel.com/about-us' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Quality & Value', 'item': 'https://floksyjewel.com/about-us' }
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
        <span>About Floksy Jewel</span>
        <ChevronRight size={12} />
        <span className="current">Quality & Value</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="text-side">
            <span className="eyebrow">OUR HERITAGE & ATELIER PHILOSOPHY</span>
            <h1>Quality & Value</h1>
            <p className="subtitle">
              Luxury jewellery should feel exceptional in every detail. Floksy Jewel bridges master European craftsmanship with direct diamond sightholder sourcing to deliver uncompromised quality without traditional retail inflation.
            </p>
            <Link
              to="/collections"
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
              DISCOVER THE COLLECTION
            </Link>
          </div>
          <div className="image-side">
            <SafeImage src="/assets/why-floksy/about-us-hero.jpg" alt="Master Jeweller Setting Diamond in Atelier" />
          </div>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>The Floksy Jewel Standard</h2>
            <p>
              Founded on the belief that fine jewellery should be timeless, transparent, and personally meaningful, Floksy Jewel creates solitaire rings, tennis bracelets, high-jewellery necklaces, and bespoke heirlooms.
            </p>
            <p>
              Every piece is forged in solid 14K Gold, 18K Gold, or Platinum 950, and set with hand-selected certified diamonds verified for superior brilliance, symmetry, and fire.
            </p>

            <PillarsGrid>
              <RevealContainer delay={0.0} yOffset={25}>
                <PillarTile>
                  <div className="icon">
                    <Sparkles size={20} />
                  </div>
                  <h3>Master Craftsmanship</h3>
                  <p>Hand-finished settings, secure prongs, and meticulous CAD modeling by expert jewellers.</p>
                </PillarTile>
              </RevealContainer>

              <RevealContainer delay={0.1} yOffset={25}>
                <PillarTile>
                  <div className="icon">
                    <ShieldCheck size={20} />
                  </div>
                  <h3>GIA & IGI Certified</h3>
                  <p>Every major diamond carries an independent certificate verifying carat, color, clarity, and cut.</p>
                </PillarTile>
              </RevealContainer>

              <RevealContainer delay={0.2} yOffset={25}>
                <PillarTile>
                  <div className="icon">
                    <Award size={20} />
                  </div>
                  <h3>Direct Sightholder Value</h3>
                  <p>Ethical direct sourcing eliminates unnecessary middleman markups for honest luxury pricing.</p>
                </PillarTile>
              </RevealContainer>
            </PillarsGrid>
          </EditorialBlock>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <EditorialBlock>
            <h2>Bespoke Personalization & Concierge</h2>
            <p>
              Whether searching for the perfect diamond engagement ring or designing a custom heirloom from reference sketches, our dedicated Jewellery Concierge guides you through every decision.
            </p>
            <p>
              We offer complimentary 3D CAD renders, custom diamond sourcing, fully-insured global shipping, and a limited lifetime warranty on every piece.
            </p>
          </EditorialBlock>
        </RevealContainer>
      </ContentGrid>

      <RevealContainer yOffset={35}>
        <CTABanner>
          <CTABannerInner>
            <h2>Experience Floksy Jewel Luxury</h2>
            <p>
              Speak with a diamond specialist or browse our curated collection of fine jewellery.
            </p>
            <Link to="/contact-us" className="primary-btn">
              <Mail size={16} /> SPEAK WITH OUR CONCIERGE
            </Link>
          </CTABannerInner>
        </CTABanner>
      </RevealContainer>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
