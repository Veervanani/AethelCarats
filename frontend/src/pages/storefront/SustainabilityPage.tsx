import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ShieldCheck, Leaf, Globe, CheckCircle, ChevronRight, Mail, Plus, Minus } from 'lucide-react';
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
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  background: #f9f7f2;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;

  .icon-box {
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
    margin-bottom: 8px;
  }

  p {
    font-size: 0.88rem;
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

export const SustainabilityPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Conflict Free Diamonds | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore Floksy Jewel ethical sourcing commitments, 100% conflict-free natural diamonds, and sustainable lab-grown diamond craftsmanship.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/sustainability#webpage',
          'url': 'https://floksyjewel.com/sustainability',
          'name': 'Conflict Free Diamonds & Sustainability | Floksy Jewel',
          'description': 'Our commitment to ethical diamond sourcing, environmental stewardship, and sustainable luxury.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/sustainability#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Why Floksy Jewel', 'item': 'https://floksyjewel.com/sustainability' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Conflict Free Diamonds', 'item': 'https://floksyjewel.com/sustainability' }
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
        <span className="current">Conflict Free Diamonds</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">ETHICAL RESPONSIBILITY & COMMITMENT</span>
          <h1>Conflict Free Diamonds</h1>
          <p className="subtitle">
            At Floksy Jewel, integrity is woven into every diamond we curate. We strictly enforce ethical sourcing standards, guarantee 100% Kimberley Process compliance, and pioneer sustainable lab-grown diamond creations.
          </p>
          <Link
            to="/diamonds"
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
            EXPLORE CERTIFIED DIAMONDS
          </Link>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/sustainability-hero.jpg" alt="Master Jeweller Inspecting Diamond under Loupe" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>Our Ethical Sourcing Philosophy</h2>
          <p>
            Fine jewellery should symbolize beauty, devotion, and lasting value—never environmental harm or human exploitation. Floksy Jewel is committed to working exclusively with diamond sightholders and master cutters who adhere to the strict guidance of the Kimberley Process and international human rights frameworks.
          </p>
          <p>
            Whether selecting a rare natural solitaire or a precision-engineered lab-grown diamond, every gem in our collection is fully traceable to legitimate, conflict-free sources.
          </p>

          <PillarsGrid>
            <PillarCard>
              <div className="icon-box">
                <ShieldCheck size={20} />
              </div>
              <h3>100% Conflict-Free</h3>
              <p>Guaranteed Kimberley Process compliance for all natural diamonds without exception.</p>
            </PillarCard>

            <PillarCard>
              <div className="icon-box">
                <Leaf size={20} />
              </div>
              <h3>Sustainable Lab-Grown</h3>
              <p>Pure carbon diamonds grown with renewable energy, zero mining impact, and full transparency.</p>
            </PillarCard>

            <PillarCard>
              <div className="icon-box">
                <Globe size={20} />
              </div>
              <h3>Recycled Precious Metals</h3>
              <p>Crafted using refined 100% recycled 18K gold and solid silver.</p>
            </PillarCard>
          </PillarsGrid>
        </EditorialBlock>

        <EditorialBlock>
          <h2>Natural vs. Lab-Grown Integrity</h2>
          <p>
            We believe in complete transparency. Our lab-grown diamonds possess the exact same physical, chemical, and optical properties as natural earth-mined diamonds. They are graded by independent gemmological laboratories (GIA / IGI) using identical standards for Carat, Color, Clarity, and Cut.
          </p>
          <p>
            By offering both choices alongside certified provenance, we empower our clients to make an informed, ethical investment that aligns with their personal values.
          </p>
        </EditorialBlock>
      </ContentGrid>

      <CTABanner>
        <CTABannerInner>
          <h2>Have Questions About Diamond Provenance?</h2>
          <p>
            Our gemmologists are available to provide certificate verification, laser inscription confirmation, or custom sourcing assistance.
          </p>
          <Link to="/contact-us" className="primary-btn">
            <Mail size={16} /> SPEAK WITH OUR GEMMOLOGISTS
          </Link>
        </CTABannerInner>
      </CTABanner>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
