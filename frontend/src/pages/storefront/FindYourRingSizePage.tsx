import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Ruler,
  Printer,
  Package,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Info,
  X,
  Send,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const BreadcrumbBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 32px;

  a {
    color: #A8A8A8;
    text-decoration: none;
    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`;

// SECTION 1: HERO
const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 64px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: #F5F1E8;
    line-height: 1.15;
    margin-bottom: 16px;
  }

  p.subtitle {
    font-size: 1.15rem;
    color: #C9A96E;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  p.desc {
    font-size: 1rem;
    color: #D8D2C5;
    line-height: 1.8;
  }
`;

const HeroMedia = styled.div`
  aspect-ratio: 4 / 3;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// SECTION 2: INTRO PARAGRAPH
const IntroSection = styled.div`
  max-width: 800px;
  margin: 0 auto 64px;
  text-align: center;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #F5F1E8;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    color: #D8D2C5;
    line-height: 1.8;
  }
`;

// SECTION 3: DARK CTA BAND
const DarkCtaBand = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 48px 32px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #F5F1E8;
    margin: 0;
  }

  a.cta-btn {
    padding: 14px 28px;
    background: #C9A96E;
    color: #0B0B0B;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.85rem;
    transition: all 0.2s ease;

    &:hover {
      background: #DFBA73;
      transform: translateY(-2px);
    }
  }
`;

// SECTION 4 & 5: SPLIT SECTIONS (FREE SIZER & CHART)
const SplitSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .content-side {
    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #F5F1E8;
      margin-bottom: 16px;
    }

    p {
      font-size: 0.95rem;
      color: #D8D2C5;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    button.action-btn {
      padding: 14px 24px;
      background: #C9A96E;
      color: #0B0B0B;
      border: none;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.82rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #DFBA73;
        transform: translateY(-2px);
      }
    }
  }

  .media-side {
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 6px;
    overflow: hidden;
    padding: 24px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    img {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`;

// SECTION 7: HOW TO MEASURE AT HOME
const MethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MethodCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #C9A96E;
  }

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    color: #C9A96E;
    font-weight: 700;
    margin-bottom: 12px;
  }

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.88rem;
    color: #D8D2C5;
    line-height: 1.7;
  }
`;

// SECTION 8: CONVERSION TABLE
const TableContainer = styled.div`
  margin-bottom: 80px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #F5F1E8;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const ConversionTable = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.85rem;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  color: #D8D2C5;

  th,
  td {
    padding: 12px 16px;
    text-align: center;
    border: 1px solid rgba(140, 116, 75, 0.2);
  }

  th {
    background: #1F1F1F;
    color: #F5F1E8;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 0.78rem;
    border-bottom: 1px solid rgba(140, 116, 75, 0.35);
  }

  tr:nth-child(even) {
    background: #111111;
  }
`;

// SIZER MODAL
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 8px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  color: #F5F1E8;
`;

import { api } from '../../services/api';

export const FindYourRingSizePage: React.FC = () => {
  const [showSizerModal, setShowSizerModal] = useState(false);
  const [sizerSubmitted, setSizerSubmitted] = useState(false);
  const [formInput, setFormInput] = useState({ name: '', email: '', address: '', city: '', postalCode: '' });
  const [cmsData, setCmsData] = useState<any>(null);
  const [cmsPage, setCmsPage] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch ring size guide specific table data
    api.getRingSizeGuide()
      .then((data) => {
        if (data) {
          if (typeof data.conversionsJson === 'string') {
            try {
              data.conversions = JSON.parse(data.conversionsJson);
            } catch {}
          }
          if (typeof data.measureStepsJson === 'string') {
            try {
              data.measureSteps = JSON.parse(data.measureStepsJson);
            } catch {}
          }
          setCmsData(data);
          if (data.seoTitle) {
            document.title = data.seoTitle;
          }
        }
      })
      .catch((err) => console.error('Failed to fetch CMS ring size guide:', err));

    // Also fetch general CMS page data if configured under slug 'ring-size-guide'
    api.getPageBySlug('ring-size-guide')
      .then((page) => {
        if (page) {
          let parsed: any = {};
          const raw = page.draftContent || page.content;
          if (raw) {
            try {
              parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            } catch {
              parsed = { content: raw };
            }
          }
          setCmsPage({ ...page, parsedContent: parsed });
          if (!cmsData?.seoTitle && page.seoMetadata?.seoTitle) {
            document.title = page.seoMetadata.seoTitle;
          }
        }
      })
      .catch(console.warn);
  }, []);

  const handlePrintChart = () => {
    window.print();
  };

  const handleSizerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSizerSubmitted(true);
  };

  const c = cmsPage?.parsedContent || {};

  const CONVERSION_DATA = (cmsData?.conversions && cmsData.conversions.length > 0) ? cmsData.conversions : [
    { us: '3', uk: 'F', eu: '44', diameter: '14.1 mm', circumference: '44.2 mm' },
    { us: '3.5', uk: 'G', eu: '45', diameter: '14.5 mm', circumference: '45.5 mm' },
    { us: '4', uk: 'H 1/2', eu: '47', diameter: '14.9 mm', circumference: '46.8 mm' },
    { us: '4.5', uk: 'I 1/2', eu: '48', diameter: '15.3 mm', circumference: '48.0 mm' },
    { us: '5', uk: 'J 1/2', eu: '49', diameter: '15.7 mm', circumference: '49.3 mm' },
    { us: '5.5', uk: 'K 1/2', eu: '51', diameter: '16.1 mm', circumference: '50.6 mm' },
    { us: '6', uk: 'L 1/2', eu: '52', diameter: '16.5 mm', circumference: '51.9 mm' },
    { us: '6.5', uk: 'M 1/2', eu: '53', diameter: '16.9 mm', circumference: '53.1 mm' },
    { us: '7', uk: 'N 1/2', eu: '54', diameter: '17.3 mm', circumference: '54.4 mm' },
    { us: '7.5', uk: 'O 1/2', eu: '56', diameter: '17.7 mm', circumference: '55.7 mm' },
    { us: '8', uk: 'P 1/2', eu: '57', diameter: '18.1 mm', circumference: '57.0 mm' },
    { us: '8.5', uk: 'Q 1/2', eu: '58', diameter: '18.5 mm', circumference: '58.3 mm' },
    { us: '9', uk: 'R 1/2', eu: '59', diameter: '18.9 mm', circumference: '59.5 mm' },
    { us: '9.5', uk: 'S 1/2', eu: '61', diameter: '19.4 mm', circumference: '60.8 mm' },
    { us: '10', uk: 'T 1/2', eu: '62', diameter: '19.8 mm', circumference: '62.1 mm' },
    { us: '10.5', uk: 'U 1/2', eu: '63', diameter: '20.2 mm', circumference: '63.4 mm' },
    { us: '11', uk: 'V 1/2', eu: '65', diameter: '20.6 mm', circumference: '64.6 mm' },
    { us: '11.5', uk: 'W 1/2', eu: '66', diameter: '21.0 mm', circumference: '65.9 mm' },
    { us: '12', uk: 'Y', eu: '67', diameter: '21.4 mm', circumference: '67.2 mm' },
  ];

  const defaultSteps = [
    { step: 1, title: 'Measure an Existing Ring', description: 'Place an existing ring that fits the target finger over our printable sizing circles until the inside of the ring aligns exactly with the circle perimeter.' },
    { step: 2, title: 'Measure Your Finger', description: 'Wrap a flexible measuring tape or strip of paper snugly around the knuckle base. Mark the overlap point and measure length in millimeters to find circumference.' },
    { step: 3, title: 'Use Our Free Ring Sizer', description: 'Thread the end of our plastic sizer through the buckle. Adjust until it slides comfortably over the knuckle for exact US ring size reading.' },
  ];

  const measureSteps = (cmsData?.measureSteps && cmsData.measureSteps.length > 0)
    ? cmsData.measureSteps
    : defaultSteps;

  const heroTitle = cmsData?.heroTitle || c.heading || 'How To Measure Your Ring Size';
  const heroSubtitle = cmsData?.heroSubtitle || c.subheading || 'Ring Sizer & Conversion Guide';
  const heroDesc = cmsData?.introParagraphs || c.introduction || 'Discovering your ideal ring size ensures maximum comfort and security for your bespoke AethelCarats creation. Follow our complimentary guide, printable sizer, and international conversion matrix.';
  const heroImage = cmsData?.heroImage || c.desktopImage || c.pageImages?.desktopImage || '';
  const introHeading = cmsData?.introHeading || 'Finding Your Ring Size';
  const introDesc = cmsData?.introContent || cmsData?.introParagraphs || c.introduction || 'Finding the right ring size is one of the most essential steps when choosing an engagement ring or wedding band. AethelCarats provides complimentary resizing within 30 days for all non-custom creation orders.';

  const sizerHeading = cmsData?.sizerHeading || 'Complimentary Plastic Ring Sizer';
  const sizerDescription = cmsData?.sizerDescription || 'Receive a free AethelCarats belt-style plastic ring sizer delivered directly to your doorstep. It works like a belt around your finger for easy, accurate measurements at home.';
  const sizerBtnText = cmsData?.sizerButtonText || 'REQUEST FREE RING SIZER';
  const sizerImage = cmsData?.sizerImage || '';

  const chartTitle = cmsData?.chartTitle || 'Printable Ring Size Chart';
  const chartDescription = cmsData?.chartDescription || 'Print our 1:1 scale ring size chart to measure an existing ring or match your finger diameter directly on paper. Ensure page scaling is set to 100% when printing.';

  const measureHeading = cmsData?.measureHeading || 'How To Measure At Home';
  const ctaHeading = cmsData?.ctaHeading || 'Find Your Perfect AethelCarats Ring';
  const ctaDescription = cmsData?.ctaDescription || 'Explore our certified GIA natural and lab diamond solitaire engagement rings and eternity bands.';
  const ctaButtonText = cmsData?.ctaButtonText || 'SHOP RINGS CATALOGUE';
  const ctaButtonUrl = cmsData?.ctaButtonUrl || '/rings';

  return (
    <PageWrapper>
      {/* BREADCRUMB */}
      <BreadcrumbBar>
        <Link to="/">Home</Link> / <Link to="/education">Education</Link> / <Link to="/rings">Rings</Link> / <span className="current">Find Your Ring Size</span>
      </BreadcrumbBar>

      {/* HERO SECTION */}
      <HeroSection>
        <HeroText>
          <p className="subtitle">{heroSubtitle}</p>
          <h1>{heroTitle}</h1>
          <p className="desc">{heroDesc}</p>
        </HeroText>
        <HeroMedia>
          <SafeImage src={heroImage} alt={heroTitle} />
        </HeroMedia>
      </HeroSection>

      {/* INTRO SECTION */}
      <IntroSection>
        <h2>{introHeading}</h2>
        <p>{introDesc}</p>
      </IntroSection>

      {/* DARK CTA BAND */}
      <RevealContainer yOffset={35}>
        <DarkCtaBand>
          <div>
            <h3>Browse Our Selection of Fine Rings</h3>
            <p style={{ margin: '8px 0 0', color: '#A8A8A8', fontSize: '0.9rem' }}>Handcrafted 18K Gold & Platinum Solitaires</p>
          </div>
          <Link to="/rings" className="cta-btn">
            FIND YOUR RING
          </Link>
        </DarkCtaBand>
      </RevealContainer>

      {/* FREE RING SIZER SECTION */}
      <RevealContainer yOffset={35}>
        <SplitSection>
          <div className="content-side">
            <h3>{sizerHeading}</h3>
            <p>{sizerDescription}</p>
            <button className="action-btn" onClick={() => setShowSizerModal(true)}>
              {sizerBtnText}
            </button>
          </div>
          <div className="media-side">
            <SafeImage src={sizerImage} alt={sizerHeading} style={{ borderRadius: 4 }} />
          </div>
        </SplitSection>
      </RevealContainer>

      {/* PRINTABLE RING SIZE CHART SECTION */}
      <RevealContainer yOffset={35}>
        <SplitSection>
          <div className="media-side">
            <div style={{ padding: 20, background: '#111111', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 6 }}>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 12, color: '#F5F1E8' }}>US Standard Diameter Circles</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {['5', '6', '7', '8', '9', '10', '11', '12'].map((s) => (
                  <div key={s} style={{ padding: 12, border: '1.5px dashed #C9A96E', color: '#F5F1E8', borderRadius: '50%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                    US {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="content-side">
            <h3>{chartTitle}</h3>
            <p>{chartDescription}</p>
            <button className="action-btn" onClick={handlePrintChart}>
              PRINT RING SIZE CHART
            </button>
          </div>
        </SplitSection>
      </RevealContainer>

      {/* HOW TO MEASURE AT HOME */}
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', textAlign: 'center', color: '#F5F1E8', marginBottom: 32 }}>{measureHeading}</h3>
      <MethodsGrid>
        {measureSteps.map((st: any, idx: number) => (
          <MethodCard key={idx}>
            <div className="num">0{idx + 1}</div>
            <h4>{st.title}</h4>
            <p>{st.description}</p>
          </MethodCard>
        ))}
      </MethodsGrid>

      {/* CONVERSION TABLE */}
      <TableContainer>
        <h3>International Ring Size Conversion Chart</h3>
        <ConversionTable>
          <thead>
            <tr>
              <th>US Size</th>
              <th>UK & Australia</th>
              <th>EU & Japan</th>
              <th>Inside Diameter (mm)</th>
              <th>Inside Circumference (mm)</th>
            </tr>
          </thead>
          <tbody>
            {CONVERSION_DATA.map((row: any, rIdx: number) => (
              <tr key={row.us || rIdx}>
                <td style={{ fontWeight: 700, color: '#C9A96E' }}>US {row.us}</td>
                <td>{row.uk}</td>
                <td>{row.eu}</td>
                <td>{row.diameter}</td>
                <td>{row.circumference}</td>
              </tr>
            ))}
          </tbody>
        </ConversionTable>
      </TableContainer>

      {/* BETWEEN SIZES GUIDANCE */}
      <IntroSection style={{ background: '#151515', padding: '40px 32px', borderRadius: 6, border: '1px solid rgba(140, 116, 75, 0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#F5F1E8', marginBottom: 12 }}>Between Two Sizes?</h3>
        <p style={{ fontSize: '0.92rem', color: '#D8D2C5', lineHeight: 1.8 }}>
          If you fall between two sizes, we always recommend sizing up. Fingers fluctuate in size depending on temperature, humidity, and time of day (typically slightly larger in the evening). Wider band styles (above 4mm) also feel tighter than slim solitaire bands.
        </p>
      </IntroSection>

      {/* Dynamic CMS Sections if configured */}
      {cmsPage?.sections?.map((sec: any, idx: number) => {
        if (sec.isVisible === false) return null;
        let s: any = {};
        try { s = typeof sec.content === 'string' ? JSON.parse(sec.content) : (sec.content || {}); } catch { s = { text: sec.content }; }
        return (
          <RevealContainer key={sec.id || idx} yOffset={35}>
            <IntroSection style={{ background: '#151515', padding: '36px 28px', borderRadius: 6, border: '1px solid rgba(140, 116, 75, 0.25)', marginTop: 40 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F1E8' }}>{sec.title || s.title || s.heading}</h2>
              {s.subtitle && <h4 style={{ color: '#C9A96E', margin: '8px 0 16px' }}>{s.subtitle}</h4>}
              <p style={{ color: '#D8D2C5', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.description || s.text || s.content || ''}</p>
            </IntroSection>
          </RevealContainer>
        );
      })}

      {/* FINAL CTA */}
      <div style={{ textAlign: 'center', marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(140, 116, 75, 0.25)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#F5F1E8', marginBottom: 16 }}>{ctaHeading}</h2>
        <p style={{ color: '#D8D2C5', fontSize: '1rem', maxWidth: 600, margin: '0 auto 28px' }}>
          {ctaDescription}
        </p>
        <Link to={ctaButtonUrl} style={{ padding: '16px 36px', background: '#C9A96E', color: '#0B0B0B', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.1em', borderRadius: 4, display: 'inline-block' }}>
          {ctaButtonText}
        </Link>
      </div>

      {/* FREE SIZER MODAL */}
      {showSizerModal && (
        <ModalOverlay onClick={() => setShowSizerModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSizerModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#A8A8A8' }}>
              <X size={20} />
            </button>

            {sizerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle size={48} color="#C9A96E" style={{ marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#F5F1E8', marginBottom: 8 }}>Free Sizer Requested!</h3>
                <p style={{ color: '#D8D2C5', fontSize: '0.9rem' }}>We are mailing your complimentary AethelCarats Ring Sizer to your address. Estimated arrival: 3-5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSizerSubmit}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#F5F1E8', marginBottom: 12 }}>Request Free Ring Sizer</h3>
                <p style={{ color: '#D8D2C5', fontSize: '0.85rem', marginBottom: 20 }}>We will mail a free plastic belt sizer directly to your home.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formInput.name}
                    onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                    style={{ padding: 12, background: '#111111', color: '#F5F1E8', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, outline: 'none' }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formInput.email}
                    onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                    style={{ padding: 12, background: '#111111', color: '#F5F1E8', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, outline: 'none' }}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Shipping Street Address"
                    value={formInput.address}
                    onChange={(e) => setFormInput({ ...formInput, address: e.target.value })}
                    style={{ padding: 12, background: '#111111', color: '#F5F1E8', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, outline: 'none' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={formInput.city}
                      onChange={(e) => setFormInput({ ...formInput, city: e.target.value })}
                      style={{ padding: 12, background: '#111111', color: '#F5F1E8', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, outline: 'none' }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Postal Code"
                      value={formInput.postalCode}
                      onChange={(e) => setFormInput({ ...formInput, postalCode: e.target.value })}
                      style={{ padding: 12, background: '#111111', color: '#F5F1E8', border: '1px solid rgba(140, 116, 75, 0.25)', borderRadius: 4, outline: 'none' }}
                    />
                  </div>

                  <button type="submit" style={{ marginTop: 12, padding: 14, background: '#C9A96E', color: '#0B0B0B', border: 'none', borderRadius: 4, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em' }}>
                    SUBMIT MAILING REQUEST
                  </button>
                </div>
              </form>
            )}
          </ModalBox>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};
