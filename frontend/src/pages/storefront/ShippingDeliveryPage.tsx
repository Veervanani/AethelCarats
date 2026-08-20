import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Truck, ShieldCheck, Lock, PackageCheck, Mail, ChevronRight } from 'lucide-react';
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

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightTile = styled.div`
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

export const ShippingDeliveryPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Free Secure Shipping | Floksy Jewel';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Floksy Jewel offers complimentary fully-insured express shipping worldwide. Learn about discreet packaging, transit insurance, and tracking.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://floksyjewel.com/shipping-delivery#webpage',
          'url': 'https://floksyjewel.com/shipping-delivery',
          'name': 'Free Secure Shipping & Global Delivery | Floksy Jewel',
          'description': 'Complimentary fully-insured global courier shipping with discreet packaging and signature verification.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/shipping-delivery#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Why Floksy Jewel', 'item': 'https://floksyjewel.com/shipping-delivery' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Free Secure Shipping', 'item': 'https://floksyjewel.com/shipping-delivery' }
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
        <span className="current">Free Secure Shipping</span>
      </BreadcrumbsBar>

      <HeroSection>
        <div className="text-side">
          <span className="eyebrow">WHITE-GLOVE TRANSIT & PROTECTION</span>
          <h1>Free Secure Shipping</h1>
          <p className="subtitle">
            Every creation leaving our atelier is delivered with complete discretion, 100% transit insurance, and complimentary express courier dispatch worldwide.
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
            DISCUSS DELIVERY OPTIONS
          </Link>
        </div>
        <div className="image-side">
          <SafeImage src="/assets/why-floksy/shipping-delivery-hero.jpg" alt="Floksy Jewel Luxury Packaging Box" />
        </div>
      </HeroSection>

      <ContentGrid>
        <EditorialBlock>
          <h2>Discreet & Fully Insured Delivery</h2>
          <p>
            We understand that fine jewellery is often purchased as a surprise proposal or special anniversary gift. To preserve secrecy, all parcels are dispatched in unbranded, non-descript outer packaging that gives no indication of the valuable contents inside.
          </p>
          <p>
            Inside the outer box, your item is housed in our signature illuminated leatherette presentation case, complete with diamond certificates and care guides.
          </p>

          <HighlightsGrid>
            <HighlightTile>
              <div className="icon">
                <Truck size={20} />
              </div>
              <h3>Complimentary Express</h3>
              <p>Free overnight or 2-day express courier dispatch on all orders.</p>
            </HighlightTile>

            <HighlightTile>
              <div className="icon">
                <ShieldCheck size={20} />
              </div>
              <h3>100% Transit Insured</h3>
              <p>Fully covered from our vault until signed for at your address.</p>
            </HighlightTile>

            <HighlightTile>
              <div className="icon">
                <Lock size={20} />
              </div>
              <h3>Signature Required</h3>
              <p>Delivered strictly with direct adult signature verification.</p>
            </HighlightTile>
          </HighlightsGrid>
        </EditorialBlock>

        <EditorialBlock>
          <h2>International Shipping & Customs</h2>
          <p>
            We ship to over 50 countries worldwide including the United Kingdom, United States, Canada, Europe, Australia, and the UAE. International shipments are handled by premium global couriers (FedEx, DHL Express, Armored Courier).
          </p>
          <p>
            Detailed tracking numbers are provided immediately upon dispatch so you can trace your parcel in real-time.
          </p>
        </EditorialBlock>
      </ContentGrid>

      <CTABanner>
        <CTABannerInner>
          <h2>Need Delivery Assistance or Hold For Pick-Up?</h2>
          <p>
            Our concierge can arrange delivery to a local FedEx/DHL hold facility for secret proposal planning.
          </p>
          <Link to="/contact-us" className="primary-btn">
            <Mail size={16} /> CONTACT DELIVERY CONCIERGE
          </Link>
        </CTABannerInner>
      </CTABanner>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
