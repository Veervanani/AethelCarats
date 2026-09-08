import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
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
    color: #F5F1E8;
    font-weight: 500;
  }
`;

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px 64px;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  text-align: center;
  color: #F5F1E8;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #D8D2C5;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 36px;
  line-height: 1.6;
`;

const ContentCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 40px;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #D8D2C5;
  line-height: 1.8;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  white-space: pre-line;

  h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    color: #F5F1E8;
    margin: 32px 0 16px;
  }

  p {
    margin-bottom: 20px;
  }

  ul {
    margin: 12px 0 20px 20px;
    li {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`;

const DEFAULT_PAGE_CONTENT: Record<string, any> = {
  'bespoke-service': {
    title: 'Bespoke Jewelry & Custom Atelier Design',
    subheading: 'From initial sketches to hand-finished masterpieces crafted exclusively for your unique story.',
    introduction: 'At AethelCarats Fine Jewellery Atelier, bespoke creation represents the pinnacle of haute joaillerie. Our master goldsmiths, gemologists, and 3D CAD designers collaborate intimately with you to bring your most exquisite dreams into tangible reality.',
    brandStory: 'Every bespoke journey begins with your vision. Whether you desire a custom solitaire engagement ring, a bespoke eternity band, an heirloom diamond redesign, or a one-of-a-kind diamond necklace, our artisans apply generations of traditional craftsmanship paired with precision technology.',
    craftsmanship: '1. Private Design Consultation — Share your sketches, inspirations, or design preferences with our senior concierge.\n2. Precision 3D CAD Modeling — We create exact digital 3D models and photorealistic renders for your review and adjustments.\n3. Certified Diamond Sourcing — Hand-select from conflict-free natural or lab-grown solitaires certified by IGI and GIA.\n4. Master Goldsmith Hand-Setting — Hand-forged in 14K/18K solid gold or 950 platinum with microscopic precision stone setting.\n5. Purity Hallmarking & White-Glove Presentation — Official purity hallmarking, certificate matching, and insured delivery in luxury packaging.',
    coverage: 'All custom bespoke creations include complimentary lifetime maintenance, annual ultrasonic cleaning, prong inspections, and 1 complimentary ring resizing within 60 days of delivery.',
    seoCopy: 'Custom diamond jewelry design, bespoke engagement rings, custom wedding bands, and certified diamond customizer at AethelCarats Fine Jewellery Atelier.'
  },
  'jewellery-care': {
    title: 'Fine Jewellery Care & Preservation Guide',
    subheading: 'Expert advice from master goldsmiths on preserving the enduring brilliance and luster of your diamond jewellery.',
    introduction: 'Fine diamond jewelry is crafted to be treasured for generations. With proper daily care, mindful storage, and routine maintenance, your AethelCarats pieces will maintain their breathtaking sparkle forever.',
    brandStory: 'Daily Wear Best Practices:\n• Put jewelry on last when dressing (after applying lotions, cosmetics, and perfumes).\n• Remove rings and fine jewelry prior to swimming in chlorinated pools, intense gym workouts, or handling household cleansers.\n• Avoid sharp impacts against hard stone or ceramic surfaces to protect delicate prongs and diamond girdle edges.',
    craftsmanship: 'Professional Home Cleaning Method:\n1. Soak your fine jewelry in a small bowl of warm water with a few drops of mild dishwashing soap for 10–15 minutes.\n2. Gently brush behind stone settings and under prongs with an extra-soft toothbrush.\n3. Rinse thoroughly under warm running water (ensure the drain is securely plugged).\n4. Pat dry gently with a clean, lint-free microfiber jewelry polishing cloth.',
    ourValues: 'Precious Metal Guidelines:\n• 18K Yellow & Rose Gold: Clean with mild warm soapy water and polish with a soft gold cloth.\n• 18K White Gold: Finished with luminous rhodium plating. Avoid abrasive cleaners. We offer complimentary rhodium recoating under our Lifetime Care plan.\n• 950 Platinum: Hypoallergenic and exceptionally durable. Develops a distinguished satin patina that can be buffed to high polish at any time.',
    coverage: 'Complimentary Annual Atelier Inspection: We invite you to send or bring your AethelCarats jewelry for complimentary annual prong inspection, stone tightness verification, and professional ultrasonic restoration.',
    seoCopy: 'How to clean and care for diamond rings, solid gold jewelry maintenance, and platinum care instructions from AethelCarats Atelier.'
  },
  'privacy-policy': {
    title: 'Privacy Policy & Client Data Protection',
    subheading: 'Your privacy and trust are paramount. Learn how AethelCarats protects your personal information and transaction security.',
    introduction: 'AethelCarats Fine Jewellery Atelier ("AethelCarats", "we", "us", or "our") is dedicated to protecting the confidentiality, integrity, and security of our clients\' personal information in accordance with international data privacy standards (including GDPR and CCPA).',
    brandStory: '1. Information We Collect\n• Personal Contact Details: Full name, email address, telephone/WhatsApp number, delivery address, and billing address.\n• Order & Custom Specifications: Ring sizes, engraving details, bespoke CAD design preferences, and order history.\n• Payment Information: All payments are processed through encrypted, PCI-DSS Level 1 compliant gateways. We do not store complete card numbers or security codes on our servers.\n• Technical & Usage Data: IP address, device browser type, and anonymized navigation patterns to ensure seamless browsing performance.',
    ourValues: '2. How We Use Your Information\n• Order Fulfillment: To manufacture, hallmark, insure, and dispatch your jewelry orders.\n• Concierge Updates: To provide real-time updates regarding bespoke CAD designs, diamond certifications, and delivery tracking.\n• Service Enhancement: To continually refine our digital storefront, security safeguards, and diamond vault catalog.\n• Fraud Prevention: To verify payment authenticity and protect clients against unauthorized transactions.',
    craftsmanship: '3. Data Protection & Non-Disclosure\nWe never sell, rent, or monetize your personal information to third parties. Data is only shared with trusted partners strictly necessary to fulfill your order (e.g. insured courier services like DHL Express/FedEx, and certified gemological laboratories for certificate issuance).',
    coverage: '4. Your Privacy Rights & Concierge Contact\nYou have full rights to request access to, update, or permanently delete your stored profile data at any time. For all data privacy inquiries, please contact our Data Protection Team at concierge@aethelcarats.com.',
    seoCopy: 'AethelCarats Privacy Policy, GDPR compliance, secure payment encryption, and client data protection guidelines.'
  },
  'terms-of-service': {
    title: 'Terms of Service & Atelier Sale Conditions',
    subheading: 'Official terms and conditions governing purchases, bespoke services, and digital interactions with AethelCarats.',
    introduction: 'Welcome to AethelCarats Fine Jewellery Atelier (aethelcarats.com). By accessing our digital maison, browsing our loose diamond vault, or commissioning bespoke jewelry, you agree to the following terms and conditions.',
    brandStory: '1. Product Accuracy & Diamond Certification\nEvery diamond and fine jewelry item offered by AethelCarats is guaranteed 100% authentic and crafted to the exact specifications described. Solitaire diamonds are accompanied by official international grading certificates (IGI, GIA, or equivalent).\n\n2. Pricing & Market Currency\nDue to real-time fluctuations in precious metal spot prices and diamond indices, prices are subject to periodic updates. Once an order is confirmed and payment is authorized, your price is strictly locked and guaranteed against market increases.',
    craftsmanship: '3. Custom & Bespoke Orders\nCustomized and bespoke orders proceed through formal CAD model approval. Once 3D design specifications and diamond selections are approved by the client, production commences immediately in our atelier.\n\n4. Intellectual Property Rights\nAll designs, bespoke 3D CAD models, brand logos, imagery, and text displayed on aethelcarats.com are the exclusive intellectual property of AethelCarats Fine Jewellery Atelier.',
    ourValues: '5. Limitation of Liability & Insured Transit\nAethelCarats provides full transit insurance on all shipments until physical signature receipt by the client. For questions regarding our Terms of Service, contact concierge@aethelcarats.com.',
    seoCopy: 'AethelCarats Terms of Service, purchase conditions, diamond warranty, and atelier sales agreements.'
  },
  'billing-terms-conditions': {
    title: 'Billing Terms & Payment Conditions',
    subheading: 'Transparent, secure, and encrypted payment processing for all luxury jewelry and certified diamond acquisitions.',
    introduction: 'AethelCarats ensures the highest standards of financial security and transparency. Every transaction is processed through end-to-end 256-bit SSL encryption and PCI-DSS Level 1 certified gateways.',
    brandStory: '1. Accepted Payment Methods\nWe proudly accept the following payment methods:\n• PayPal (Account balance, linked bank accounts, and PayPal Credit)\n• Major Credit & Debit Cards (Visa, Mastercard, American Express, Discover)\n• Direct Bank Wire Transfer (Complimentary wire transfer discounts available for high-value solitaires)\n• Flexible Escrow / Milestone payments for bespoke high jewelry orders upon consultation.',
    craftsmanship: '2. Payment Authorization & Security\n• All payments are authorized immediately upon checkout submission.\n• To safeguard against fraudulent transactions, orders may undergo 3D Secure / OTP verification.\n• Orders will be scheduled for atelier production and insured dispatch only upon successful payment verification.',
    ourValues: '3. Taxes, Customs & Currency Rates\n• Prices are displayed in USD ($) or your localized selected currency.\n• Applicable sales tax, GST, or VAT will be clearly calculated during the checkout process.\n• International shipments: Standard import customs and duties, if applicable to your destination jurisdiction, are handled transparently with our international shipping partners.',
    coverage: '4. Refund & Cancellation Terms\nApproved refunds are credited back to the original method of payment within 3 to 5 business days following inspection approval at our atelier. For billing inquiries, contact concierge@aethelcarats.com or call +91 97378 53060.',
    seoCopy: 'AethelCarats Billing Terms, payment methods, secure checkout, PayPal, credit card encryption, and refund policies.'
  }
};

DEFAULT_PAGE_CONTENT['billing-terms'] = DEFAULT_PAGE_CONTENT['billing-terms-conditions'];
DEFAULT_PAGE_CONTENT['terms-and-conditions'] = DEFAULT_PAGE_CONTENT['terms-of-service'];

export const CMSPage: React.FC = () => {
  const location = useLocation();
  const rawPath = location.pathname.toLowerCase();
  const rawSlug = rawPath.replace('/pages/', '').replace('/policies/', '').replace('/', '') || 'about-us';
  const slug = rawSlug.trim();

  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const formattedTitle = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    document.title = `${formattedTitle} | AethelCarats`;

    const fallback = DEFAULT_PAGE_CONTENT[slug] || {
      title: formattedTitle,
      subheading: `Official ${formattedTitle} documentation and atelier guidelines for AethelCarats Fine Jewellery.`,
      introduction: `Welcome to the ${formattedTitle} section of AethelCarats Fine Jewellery Atelier. For bespoke guidance, personal diamond consultations, or specific policy inquiries, our concierge is available 24/7.`,
      brandStory: `AethelCarats is dedicated to delivering excellence in every detail. Each piece in our collection is crafted with master precision and certified diamonds.`,
      craftsmanship: `For personalized assistance or inquiries regarding our ${formattedTitle}, please reach out to our concierge team at concierge@aethelcarats.com or call +91 97378 53060.`,
      coverage: `All services and purchases are covered by our AethelCarats Authenticity Guarantee and white-glove client support.`
    };

    api.getPageBySlug(slug).then((data) => {
      let parsed: any = {};
      const raw = data.draftContent || data.content;
      if (raw) {
        try {
          parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch (e) {
          parsed = { content: raw };
        }
      }

      const mergedContent = {
        ...fallback,
        ...parsed,
      };

      setPage({
        ...fallback,
        ...data,
        title: data.title || fallback.title,
        parsedContent: mergedContent,
      });

      if (data.seoMetadata?.seoTitle) {
        document.title = data.seoMetadata.seoTitle;
      }
    }).catch(() => {
      setPage({
        ...fallback,
        title: fallback.title || formattedTitle,
        parsedContent: fallback,
      });
    });
  }, [slug]);

  if (!page) return <PageWrapper><Container>Loading...</Container></PageWrapper>;

  const c = page.parsedContent || {};

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Policies</span>
        <ChevronRight size={12} />
        <span className="current">{page.title}</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <Container>
          <Title style={{ color: c.headingColor || undefined }}>{c.heading || page.title}</Title>
          {c.subheading && <Subtitle style={{ color: c.subheadingColor || undefined }}>{c.subheading}</Subtitle>}

          {(c.desktopImage || c.pageImages?.desktopImage) && (
            <div style={{ marginBottom: 32, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(140, 116, 75, 0.25)', maxHeight: 440 }}>
              <SafeImage
                src={c.desktopImage || c.pageImages?.desktopImage}
                alt={c.altText || c.pageImages?.altText || page.title}
                style={{ width: '100%', height: '100%', maxHeight: 440, objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          <ContentCard style={{ color: c.bodyTextColor || undefined }}>
            {/* Render Page-Specific Structured Content */}
            {c.introduction && (
              <p style={{ fontSize: '1.05rem', fontWeight: 500, color: c.introColor || '#F5F1E8' }}>{c.introduction}</p>
            )}

            {c.brandStory && (
              <div>
                <h2 style={{ color: c.brandStoryColor || undefined }}>Brand Story & Heritage</h2>
                <p style={{ color: c.brandStoryColor || undefined }}>{c.brandStory}</p>
              </div>
            )}

            {c.ourValues && (
              <div>
                <h2 style={{ color: c.valuesColor || undefined }}>Our Values</h2>
                <p style={{ color: c.valuesColor || undefined }}>{c.ourValues}</p>
              </div>
            )}

            {c.craftsmanship && (
              <div>
                <h2 style={{ color: c.craftsmanshipColor || undefined }}>Master Craftsmanship</h2>
                <p style={{ color: c.craftsmanshipColor || undefined }}>{c.craftsmanship}</p>
              </div>
            )}

            {c.conflictFreePolicy && (
              <div>
                <h2 style={{ color: c.kimberleyColor || undefined }}>Kimberley Process & Conflict-Free Guarantee</h2>
                <p style={{ color: c.kimberleyColor || undefined }}>{c.conflictFreePolicy}</p>
              </div>
            )}

            {c.returnEligibility && (
              <div>
                <h2 style={{ color: c.eligibilityColor || undefined }}>Return Eligibility & Terms</h2>
                <p style={{ color: c.eligibilityColor || undefined }}>{c.returnEligibility}</p>
              </div>
            )}

            {c.returnProcess && (
              <div>
                <h2 style={{ color: c.inspectionColor || undefined }}>Step-by-Step Return Process</h2>
                <p style={{ color: c.inspectionColor || undefined }}>{c.returnProcess}</p>
              </div>
            )}

            {c.coverage && (
              <div>
                <h2 style={{ color: c.coverageColor || undefined }}>Coverage Overview</h2>
                <p style={{ color: c.coverageColor || undefined }}>{c.coverage}</p>
              </div>
            )}

            {c.shippingProcessing && (
              <div>
                <h2 style={{ color: c.processingColor || undefined }}>Order Processing</h2>
                <p style={{ color: c.processingColor || undefined }}>{c.shippingProcessing}</p>
              </div>
            )}

            {c.shippingDelivery && (
              <div>
                <h2 style={{ color: c.deliveryColor || undefined }}>Delivery Timelines</h2>
                <p style={{ color: c.deliveryColor || undefined }}>{c.shippingDelivery}</p>
              </div>
            )}

            {c.warrantyIncluded && (
              <div>
                <h2 style={{ color: c.includedColor || undefined }}>What Is Included</h2>
                <p style={{ color: c.includedColor || undefined }}>{c.warrantyIncluded}</p>
              </div>
            )}

            {c.warrantyExcluded && (
              <div>
                <h2 style={{ color: c.excludedColor || undefined }}>What Is Excluded</h2>
                <p style={{ color: c.excludedColor || undefined }}>{c.warrantyExcluded}</p>
              </div>
            )}

            {c.priceMatchRequirements && (
              <div>
                <h2 style={{ color: c.requirementsColor || undefined }}>Price Match Requirements</h2>
                <p style={{ color: c.requirementsColor || undefined }}>{c.priceMatchRequirements}</p>
              </div>
            )}

            {c.seoCopy && (
              <div>
                <p style={{ color: c.seoCopyColor || undefined }}>{c.seoCopy}</p>
              </div>
            )}

            {/* HTML Rich Text Body if present */}
            {c.content && <div style={{ color: c.bodyTextColor || undefined }} dangerouslySetInnerHTML={{ __html: c.content }} />}

            {/* Custom Section Blocks */}
            {page.sections && page.sections.map((sec: any, idx: number) => {
              if (sec.isVisible === false) return null;
              let s: any = {};
              try { s = typeof sec.content === 'string' ? JSON.parse(sec.content) : (sec.content || {}); } catch (e) { s = { text: sec.content }; }
              return (
                <div
                  key={sec.id || idx}
                  style={{
                    marginTop: 32,
                    padding: s.backgroundColor ? '28px 24px' : '0',
                    backgroundColor: s.backgroundColor || 'transparent',
                    borderRadius: s.backgroundColor ? 6 : 0,
                    borderTop: s.backgroundColor ? 'none' : '1px solid rgba(140, 116, 75, 0.25)',
                    paddingTop: s.backgroundColor ? '28px' : '28px',
                  }}
                >
                  {s.eyebrow && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: s.eyebrowColor || '#C9A45C',
                        marginBottom: 8,
                      }}
                    >
                      {s.eyebrow}
                    </span>
                  )}
                  {s.title && (
                    <h2
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.8rem',
                        fontWeight: 500,
                        color: s.titleColor || '#F5F1E8',
                        margin: '0 0 10px 0',
                      }}
                    >
                      {s.title}
                    </h2>
                  )}
                  {s.subtitle && (
                    <h4
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: s.subtitleColor || '#C5BEAF',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {s.subtitle}
                    </h4>
                  )}
                  {s.description && (
                    <p
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        color: s.descriptionColor || '#D8D2C5',
                        marginBottom: 16,
                      }}
                    >
                      {s.description}
                    </p>
                  )}
                  {s.bodyHtml && (
                    <div
                      style={{ color: s.textColor || s.bodyTextColor || '#D8D2C5', lineHeight: 1.7, marginBottom: 16 }}
                      dangerouslySetInnerHTML={{ __html: s.bodyHtml }}
                    />
                  )}
                  {s.text && !s.bodyHtml && (
                    <div
                      style={{ color: s.textColor || s.bodyTextColor || '#D8D2C5', lineHeight: 1.7, marginBottom: 16 }}
                      dangerouslySetInnerHTML={{ __html: s.text }}
                    />
                  )}
                  {(s.primaryBtnText || s.buttonText) && (
                    <div style={{ marginTop: 16 }}>
                      <Link
                        to={s.primaryBtnLink || s.buttonLink || '/collections'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '10px 22px',
                          background: '#151515',
                          border: '1px solid #C9A45C',
                          borderRadius: 3,
                          color: s.primaryBtnTextColor || s.buttonTextColor || '#F5F1E8',
                          textDecoration: 'none',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.primaryBtnText || s.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Concierge Assistance Quick Links */}
            <div
              style={{
                marginTop: 40,
                padding: '24px 28px',
                background: '#111111',
                border: '1px solid rgba(140, 116, 75, 0.35)',
                borderRadius: 4,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#F5F1E8', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                  Have Questions Regarding This Policy?
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#A8A8A8' }}>
                  Our private client advisors are available 24/7 to assist you.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  to="/contact-us"
                  style={{
                    padding: '10px 20px',
                    background: '#C9A96E',
                    color: '#0B0B0B',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 2,
                    display: 'inline-block',
                  }}
                >
                  Contact Concierge
                </Link>
                <Link
                  to="/custom-jewellery"
                  style={{
                    padding: '10px 20px',
                    background: '#151515',
                    color: '#F5F1E8',
                    border: '1px solid rgba(140, 116, 75, 0.35)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 2,
                    display: 'inline-block',
                  }}
                >
                  Bespoke Customizer
                </Link>
              </div>
            </div>
          </ContentCard>
        </Container>
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
