import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Map, ChevronRight, Gem, ShieldCheck, Sparkles, BookOpen, FileText, Phone } from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { WhyAuraDiamondNav } from '../../components/ui/WhyAuraDiamondNav';

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
    color: #F5F1E8;
    font-weight: 500;
  }
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #F5F1E8;
    margin-bottom: 16px;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.1rem;
    color: #D8D2C5;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const SitemapGrid = styled.main`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 32px 24px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #C9A96E;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);

    .icon-box {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #1F1F1F;
      border: 1px solid rgba(140, 116, 75, 0.3);
      color: #C9A96E;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem;
      color: #F5F1E8;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li a {
      font-size: 0.9rem;
      color: #D8D2C5;
      text-decoration: none;
      transition: color 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;

      &:hover {
        color: #C9A96E;
      }
    }
  }
`;

export const SitemapPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Site Map | AethelCarats';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore the complete site map of AethelCarats fine jewellery collections, certified diamonds, customer care services, and brand policies.');
    }

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://aethelcarats.com/sitemap#webpage',
          'url': 'https://aethelcarats.com/sitemap',
          'name': 'Site Map | AethelCarats',
          'description': 'Human-readable site index for AethelCarats jewellery collections, diamond vault, and concierge services.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://aethelcarats.com/sitemap#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aethelcarats.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Site Map', 'item': 'https://aethelcarats.com/sitemap' }
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
        <span className="current">Site Map</span>
      </BreadcrumbsBar>

      <HeroSection>
        <h1>AethelCarats Site Map</h1>
        <p className="subtitle">
          Complete directory of our fine jewellery collections, diamond vault, bespoke concierge services, and atelier policies.
        </p>
      </HeroSection>

      <SitemapGrid>
        <CategoryCard>
          <div className="card-header">
            <div className="icon-box"><Gem size={18} /></div>
            <h2>Fine Jewellery</h2>
          </div>
          <ul>
            <li><Link to="/rings">Diamond Rings</Link></li>
            <li><Link to="/earrings">Earrings</Link></li>
            <li><Link to="/necklaces">Necklaces & Pendants</Link></li>
            <li><Link to="/bracelets">Bracelets & Bangles</Link></li>
            <li><Link to="/pendants">Pendants</Link></li>
            <li><Link to="/collections">All Collections</Link></li>
          </ul>
        </CategoryCard>

        <CategoryCard>
          <div className="card-header">
            <div className="icon-box"><Sparkles size={18} /></div>
            <h2>Diamond Vault</h2>
          </div>
          <ul>
            <li><Link to="/diamonds">All Certified Diamonds</Link></li>
            <li><Link to="/diamonds">Natural Diamonds</Link></li>
            <li><Link to="/diamonds">Lab-Grown Diamonds</Link></li>
            <li><Link to="/custom-jewellery">Custom CAD & Bespoke Design</Link></li>
          </ul>
        </CategoryCard>

        <CategoryCard>
          <div className="card-header">
            <div className="icon-box"><ShieldCheck size={18} /></div>
            <h2>Brand Assurances</h2>
          </div>
          <ul>
            <li><Link to="/returns-refunds">Return Policy</Link></li>
            <li><Link to="/sustainability">Conflict Free Diamonds</Link></li>
            <li><Link to="/price-match">Diamond Price Matching</Link></li>
            <li><Link to="/lifetime-warranty">Limited Lifetime Warranty</Link></li>
            <li><Link to="/shipping-delivery">Free Secure Shipping</Link></li>
            <li><Link to="/insurance">Jewelry Insurance</Link></li>
          </ul>
        </CategoryCard>

        <CategoryCard>
          <div className="card-header">
            <div className="icon-box"><FileText size={18} /></div>
            <h2>Customer Care & Legal</h2>
          </div>
          <ul>
            <li><Link to="/contact-us">Contact Concierge</Link></li>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
            <li><Link to="/about-us">Quality & Value</Link></li>
            <li><Link to="/blog">AethelCarats Journal</Link></li>
            <li><Link to="/sale-exclusions">Sale Exclusions</Link></li>
            <li><Link to="/terms-of-service">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </CategoryCard>
      </SitemapGrid>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
