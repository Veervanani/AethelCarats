import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../../services/api';

const marqueeAnim = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
`;

const BarContainer = styled.div<{ $bg?: string; $textCol?: string }>`
  background-color: ${({ $bg }) => $bg || '#0F1317'};
  color: ${({ $textCol }) => $textCol || '#C9A45C'};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(201, 164, 92, 0.2);
  display: flex;
  align-items: center;
  user-select: none;

  .marquee-wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    white-space: nowrap;
    animation: fjMarqueeScroll 28s linear infinite !important;
    will-change: transform;

    &:hover {
      animation-play-state: paused;
    }
  }

  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding: 0 28px;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    white-space: nowrap;

    .star {
      color: ${({ $textCol }) => $textCol || '#C9A45C'};
      font-size: 0.72rem;
      opacity: 0.9;
    }

    .diamond-star {
      color: ${({ $textCol }) => $textCol || '#C9A45C'};
      font-size: 0.72rem;
      opacity: 0.75;
    }
  }
`;

export const AnnouncementBar: React.FC = () => {
  const [announcementText, setAnnouncementText] = useState('FREE WORLDWIDE SHIPPING');
  const [bg, setBg] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    api.getHolidayModeStatus().then((status: any) => {
      if (status && status.active) {
        setAnnouncementText(status.message || 'Orders are temporarily unavailable while we are away. Please check back soon.');
        setBg('#19202a');
        setColor('#c9a45c');
        return;
      }

      api.getSiteSettings().then((settings) => {
        if (settings && (settings.announcementText || settings.topbarText)) {
          const rawText = settings.announcementText || settings.topbarText;
          setAnnouncementText(rawText.replace(/^[★✦\s]+|[★✦\s]+$/g, ''));
        }
        if (settings && settings.announcementBg) {
          setBg(settings.announcementBg);
        }
        if (settings && settings.announcementColor) {
          setColor(settings.announcementColor);
        }
      }).catch(console.error);
    }).catch(console.error);
  }, []);

  const marqueeItems = Array.from({ length: 8 });

  return (
    <BarContainer $bg={bg} $textCol={color}>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((_, i) => (
            <span key={`a-${i}`} className="marquee-item">
              <span className="star">★</span> {announcementText} <span className="diamond-star">✦</span>
            </span>
          ))}
          {marqueeItems.map((_, i) => (
            <span key={`b-${i}`} className="marquee-item">
              <span className="star">★</span> {announcementText} <span className="diamond-star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </BarContainer>
  );
};
