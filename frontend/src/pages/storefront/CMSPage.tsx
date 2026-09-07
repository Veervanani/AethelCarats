import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
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

export const CMSPage: React.FC = () => {
  const location = useLocation();
  const rawSlug = location.pathname.replace('/pages/', '').replace('/policies/', '').replace('/', '') || 'about-us';
  const slug = rawSlug.trim();

  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const formattedTitle = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    document.title = `${formattedTitle} | AethelCarats`;

    api.getPageBySlug(slug).then((data) => {
      let parsed = {};
      const raw = data.draftContent || data.content;
      if (raw) {
        try {
          parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch (e) {
          parsed = { content: raw };
        }
      }
      setPage({ ...data, parsedContent: parsed });

      if (data.seoMetadata?.seoTitle) {
        document.title = data.seoMetadata.seoTitle;
      }
    }).catch(() => {
      setPage({ title: formattedTitle, parsedContent: {} });
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
              <img
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
          </ContentCard>
        </Container>
      </RevealContainer>

      <WhyAuraDiamondNav />
    </PageWrapper>
  );
};
