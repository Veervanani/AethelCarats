import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Play } from 'lucide-react';
import { Diamond } from '../../types';
import { api } from '../../services/api';
import { SafeImage } from './SafeImage';
import { getDiamondImageUrl } from '../../utils/diamondImageHelper';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  cursor: pointer;
  overflow: hidden;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #0B0B0B;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 82%;
    height: 82%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${CardContainer}:hover & img {
    transform: scale(1.08);
  }
`;

const TypeTag = styled.span<{ $isLab?: boolean }>`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ $isLab }) => ($isLab ? '#1f1f1f' : '#C9A45C')};
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
`;

const VideoIconBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(31, 31, 31, 0.85);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background-color 0.2s ease;

  ${CardContainer}:hover & {
    background-color: #c9a45c;
    transform: scale(1.1);
  }
`;

const DetailsArea = styled.div`
  padding: 22px 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #151515;
`;

const MainHeader = styled.h4`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 600;
  color: #F5F1E8;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const SpecsLine = styled.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: #D8D2C5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CertBadge = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #C9A96E;
  border: 1px solid rgba(140, 116, 75, 0.3);
  background-color: #1F1F1F;
  padding: 4px 10px;
  margin: 4px 0;
  text-transform: uppercase;
  border-radius: 4px;
`;

const PriceText = styled.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: #C9A96E;
  margin-top: 4px;
`;

const InquireBtn = styled.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(140, 116, 75, 0.4);
  color: #F5F1E8;
  padding: 11px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
    transform: translateY(-1px);
  }
`;

export const DiamondCard: React.FC<{ diamond: Diamond }> = ({ diamond }) => {
  const navigate = useNavigate();

  const handleInquire = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await api.getWhatsAppInquiryMessage(diamond.diamondId);
      window.open(data.whatsappUrl, '_blank');
    } catch (error) {
      window.open(`https://wa.me/447900123456?text=Interested in diamond ${diamond.diamondId}`, '_blank');
    }
  };

  const isFancy = Boolean(diamond.fancyColor || diamond.color === 'FANCY');
  const fancyLabel = diamond.fancyColor
    ? `${diamond.fancyIntensity || 'FANCY'} ${diamond.fancyColor}`
    : null;

  return (
    <CardContainer data-diamond-id={diamond.diamondId} onClick={() => navigate(`/diamonds/${diamond.diamondId}`)}>
      <ImageArea>
        <SafeImage
          src={getDiamondImageUrl(diamond)}
          alt={`${diamond.carat}ct ${diamond.shape} Diamond`}
          loading="lazy"
          width="400"
          height="400"
        />
        <TypeTag $isLab={diamond.diamondType === 'LAB_GROWN'}>
          {diamond.growthType ? diamond.growthType : diamond.diamondType === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural'}
        </TypeTag>

        {diamond.videoUrl && (
          <VideoIconBadge title="360 Video Available">
            <Play size={14} fill="white" />
          </VideoIconBadge>
        )}
      </ImageArea>

      <DetailsArea>
        <MainHeader>{diamond.carat.toFixed(2)}ct {diamond.shape}</MainHeader>

        <SpecsLine>
          {isFancy && fancyLabel ? (
            <span style={{ color: '#c9a45c', fontWeight: 600 }}>{fancyLabel}</span>
          ) : (
            `${diamond.color} | ${diamond.clarity} | ${diamond.cut || 'EXCELLENT'}`
          )}
        </SpecsLine>

        {isFancy && (
          <SpecsLine style={{ fontSize: '0.78rem' }}>
            {diamond.clarity} | {diamond.cut || 'EXCELLENT'}
          </SpecsLine>
        )}

        {diamond.lab && <CertBadge>{diamond.lab} CERTIFIED</CertBadge>}

        <PriceText>
          ${diamond.price.toLocaleString()}
          {diamond.pricePerCarat && (
            <span style={{ fontSize: '0.75rem', color: '#777', fontWeight: 400, marginLeft: 6 }}>
              (${Math.round(diamond.pricePerCarat).toLocaleString()}/ct)
            </span>
          )}
        </PriceText>

        <InquireBtn onClick={handleInquire}>INQUIRE NOW</InquireBtn>
      </DetailsArea>
    </CardContainer>
  );
};
