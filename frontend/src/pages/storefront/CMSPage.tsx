import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
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

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px 64px;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  text-align: center;
  color: #1a1918;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #55524d;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 36px;
  line-height: 1.6;
`;

const ContentCard = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #55524d;
  line-height: 1.8;
  margin-bottom: 32px;

  h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    color: #1a1918;
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

    document.title = `${formattedTitle} | Floksy Jewel`;

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
          <Title>{c.heading || page.title}</Title>
          {c.subheading && <Subtitle>{c.subheading}</Subtitle>}

          <ContentCard>
            {/* Render Page-Specific Structured Content */}
            {c.introduction && <p style={{ fontSize: '1.05rem', fontWeight: 500, color: '#1a1918' }}>{c.introduction}</p>}

            {c.brandStory && (
              <div>
                <h2>Brand Story & Heritage</h2>
                <p>{c.brandStory}</p>
              </div>
            )}

            {c.ourValues && (
              <div>
                <h2>Our Values</h2>
                <p>{c.ourValues}</p>
              </div>
            )}

            {c.craftsmanship && (
              <div>
                <h2>Master Craftsmanship</h2>
                <p>{c.craftsmanship}</p>
              </div>
            )}

            {c.conflictFreePolicy && (
              <div>
                <h2>Kimberley Process & Conflict-Free Guarantee</h2>
                <p>{c.conflictFreePolicy}</p>
              </div>
            )}

            {c.returnEligibility && (
              <div>
                <h2>Return Eligibility & Terms</h2>
                <p>{c.returnEligibility}</p>
              </div>
            )}

            {c.returnProcess && (
              <div>
                <h2>Step-by-Step Return Process</h2>
                <p>{c.returnProcess}</p>
              </div>
            )}

            {c.coverage && (
              <div>
                <h2>Coverage Overview</h2>
                <p>{c.coverage}</p>
              </div>
            )}

            {/* HTML Rich Text Body if present */}
            {c.content && <div dangerouslySetInnerHTML={{ __html: c.content }} />}

            {/* Custom Section Blocks */}
            {page.sections && page.sections.map((sec: any, idx: number) => {
              let parsedSec: any = {};
              try { parsedSec = typeof sec.content === 'string' ? JSON.parse(sec.content) : sec.content; } catch (e) {}
              return <div key={sec.id || idx} dangerouslySetInnerHTML={{ __html: parsedSec.text || parsedSec.description || '' }} />;
            })}
          </ContentCard>
        </Container>
      </RevealContainer>

      <WhyFloksyJewelNav />
    </PageWrapper>
  );
};
