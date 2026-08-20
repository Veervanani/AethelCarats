import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { MessageCircle, ShieldCheck, FileText, ArrowLeft, Check } from 'lucide-react';
import { api } from '../../services/api';
import { Diamond } from '../../types';
import { SafeImage } from '../../components/ui/SafeImage';
import { getDiamondImageUrl } from '../../utils/diamondImageHelper';
import { RevealContainer } from '../../components/ui/RevealContainer';

const DetailContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const MediaViewer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MediaDisplay = styled.div`
  aspect-ratio: 1 / 1;
  background-color: #f5f2ea;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img, video {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 12px;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 24px;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .val {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ActionButton = styled.button<{ $isWhatsapp?: boolean }>`
  width: 100%;
  padding: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  transition: all 0.25s ease;

  background-color: ${({ $isWhatsapp, theme }) => ($isWhatsapp ? '#25D366' : theme.colors.textPrimary)};
  color: ${({ theme }) => theme.colors.white};
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

export const DiamondDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [diamond, setDiamond] = useState<Diamond | null>(null);
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');

  const [waNumber, setWaNumber] = useState('447900123456');

  useEffect(() => {
    api.getSiteSettings().then((settings) => {
      if (settings && settings.whatsappNumber) {
        const clean = settings.whatsappNumber.replace(/[^\d]/g, '');
        if (clean) setWaNumber(clean);
      }
    }).catch(console.error);

    if (id) {
      api.getDiamondById(id).then(setDiamond).catch(console.error);
    }
  }, [id]);

  useLayoutEffect(() => {
    if (diamond) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [diamond?.id]);

  if (!diamond) {
    return <DetailContainer>Loading diamond details...</DetailContainer>;
  }

  const handleWhatsApp = async () => {
    try {
      const data = await api.getWhatsAppInquiryMessage(diamond.diamondId);
      window.open(data.whatsappUrl, '_blank');
    } catch (e) {
      const text = `Hello Floksy Jewel Atelier,\n\nI am interested in Diamond ${diamond.diamondId} (${diamond.carat}ct ${diamond.shape}, Color ${diamond.color}, Clarity ${diamond.clarity}).\n\nLink: ${window.location.href}`;
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <DetailContainer>
      <BackLink to="/diamonds">
        <ArrowLeft size={16} /> Back to The Diamond Vault
      </BackLink>

      <MainGrid>
        <RevealContainer yOffset={35}>
          <MediaViewer>
            <MediaDisplay>
              {activeMedia === 'video' && diamond.videoUrl ? (
                diamond.videoUrl.endsWith('.mp4') || diamond.videoUrl.endsWith('.webm') ? (
                  <video src={diamond.videoUrl} autoPlay loop muted controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <iframe
                    src={diamond.videoUrl}
                    title={`${diamond.diamondId} 360 View`}
                    style={{ width: '100%', height: '100%', minHeight: '400px', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <SafeImage
                  src={getDiamondImageUrl(diamond)}
                  alt={`${diamond.carat}ct ${diamond.shape}`}
                />
              )}
            </MediaDisplay>
            {diamond.videoUrl && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button
                  onClick={() => setActiveMedia('image')}
                  style={{ padding: '8px 16px', border: '1px solid #ccc', background: activeMedia === 'image' ? '#242321' : 'white', color: activeMedia === 'image' ? 'white' : 'black', cursor: 'pointer' }}
                >
                  IMAGE
                </button>
                <button
                  onClick={() => setActiveMedia('video')}
                  style={{ padding: '8px 16px', border: '1px solid #ccc', background: activeMedia === 'video' ? '#242321' : 'white', color: activeMedia === 'video' ? 'white' : 'black', cursor: 'pointer' }}
                >
                  360° VIDEO
                </button>
              </div>
            )}
          </MediaViewer>
        </RevealContainer>

        <RevealContainer yOffset={35}>
          <div>
            <Title>{diamond.carat.toFixed(2)} Carat {diamond.shape} Diamond</Title>
            <Price>${diamond.price.toLocaleString()} USD</Price>

            <ActionButton $isWhatsapp onClick={handleWhatsApp}>
              <MessageCircle size={20} /> INQUIRE ON WHATSAPP
            </ActionButton>

            <SpecsGrid>
              <SpecItem>
                <span className="label">Diamond ID</span>
                <span className="val">{diamond.diamondId}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Type</span>
                <span className="val">{diamond.diamondType === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Shape</span>
                <span className="val">{diamond.shape}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Carat Weight</span>
                <span className="val">{diamond.carat}ct</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Color Grade</span>
                <span className="val">{diamond.color}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Clarity Grade</span>
                <span className="val">{diamond.clarity}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Cut Grade</span>
                <span className="val">{diamond.cut || 'Excellent'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Polish</span>
                <span className="val">{diamond.polish || 'Excellent'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Symmetry</span>
                <span className="val">{diamond.symmetry || 'Excellent'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Fluorescence</span>
                <span className="val">{diamond.fluorescence || 'None'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Lab Grading</span>
                <span className="val">{diamond.lab || 'GIA'}</span>
              </SpecItem>
              <SpecItem>
                <span className="label">Certificate No.</span>
                <span className="val">{diamond.certificateNumber || 'Verified'}</span>
              </SpecItem>
            </SpecsGrid>

            {diamond.certificateUrl && (
              <a
                href={diamond.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#B8944D', fontWeight: 600 }}
              >
                <FileText size={16} /> View Official {diamond.lab || 'GIA'} Digital Grading Report
              </a>
            )}
          </div>
        </RevealContainer>
      </MainGrid>
    </DetailContainer>
  );
};
