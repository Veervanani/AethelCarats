import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LuxuryImageLightboxProps {
  images: string[];
  activeIndex: number;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 9, 8, 0.95);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`;

const TitleText = styled.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`;

const CloseBtn = styled.button`
  background: rgba(255, 253, 249, 0.15);
  border: 1px solid rgba(255, 253, 249, 0.2);
  color: #fffdf9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
    border-color: #c9a45c;
  }
`;

const ViewportArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`;

const ImageStage = styled.div<{ $isDragging: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  transition: ${({ $isDragging }) => ($isDragging ? 'none' : 'transform 0.15s ease-out')};
  max-width: 90vw;
  max-height: 75vh;

  img {
    max-width: 85vw;
    max-height: 70vh;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }
`;

const NavArrow = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(26, 25, 24, 0.7);
  border: 1px solid rgba(201, 164, 92, 0.4);
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
    border-color: #c9a45c;
  }

  @media (max-width: 767px) {
    width: 38px;
    height: 38px;
    ${({ $direction }) => ($direction === 'left' ? 'left: 8px;' : 'right: 8px;')}
  }
`;

const ZoomControlsBar = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(26, 25, 24, 0.85);
  border: 1px solid rgba(201, 164, 92, 0.3);
  border-radius: 30px;
  padding: 6px 16px;
  z-index: 20;
  backdrop-filter: blur(4px);
`;

const ZoomBtn = styled.button`
  background: none;
  border: none;
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #c9a45c;
  }
`;

const ZoomValue = styled.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`;

const BottomThumbnailsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`;

const ThumbnailTile = styled.button<{ $active: boolean }>`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 4px;
  border: ${({ $active }) => ($active ? '2px solid #C9A45C' : '1px solid rgba(255, 253, 249, 0.2)')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transform: ${({ $active }) => ($active ? 'scale(1.05)' : 'scale(1)')};
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background: #1a1918;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
    border-color: #c9a45c;
  }
`;

export const LuxuryImageLightbox: React.FC<LuxuryImageLightboxProps> = ({
  images,
  activeIndex,
  productName,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom whenever image index changes or modal opens
  useEffect(() => {
    setZoomScale(1);
    setPanPos({ x: 0, y: 0 });
  }, [activeIndex, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[activeIndex] || images[0];

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPos({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPos({ x: 0, y: 0 });
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleResetZoom();
    onSelectIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleResetZoom();
    onSelectIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.25, 3.5));
    } else {
      setZoomScale((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanPos({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Drag / Pan Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const nextX = e.clientX - dragStart.x;
    const nextY = e.clientY - dragStart.y;
    // Constrain pan within logical bounds
    const maxPan = (zoomScale - 1) * 300;
    const clampedX = Math.max(-maxPan, Math.min(maxPan, nextX));
    const clampedY = Math.max(-maxPan, Math.min(maxPan, nextY));
    setPanPos({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Events for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDist(dist);
      return;
    }

    // Double tap detector
    const now = Date.now();
    if (now - lastTapTime < 300) {
      if (zoomScale > 1) {
        handleResetZoom();
      } else {
        setZoomScale(2);
      }
    }
    setLastTapTime(now);

    if (zoomScale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPos.x,
        y: e.touches[0].clientY - panPos.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist - lastTouchDist;
      if (Math.abs(delta) > 4) {
        setZoomScale((prev) => {
          const next = Math.min(Math.max(prev + (delta > 0 ? 0.08 : -0.08), 1), 3.5);
          if (next === 1) setPanPos({ x: 0, y: 0 });
          return next;
        });
        setLastTouchDist(dist);
      }
      return;
    }

    if (isDragging && zoomScale > 1 && e.touches.length === 1) {
      const nextX = e.touches[0].clientX - dragStart.x;
      const nextY = e.touches[0].clientY - dragStart.y;
      const maxPan = (zoomScale - 1) * 300;
      setPanPos({
        x: Math.max(-maxPan, Math.min(maxPan, nextX)),
        y: Math.max(-maxPan, Math.min(maxPan, nextY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDist(null);
  };

  return (
    <LightboxOverlay onClick={onClose}>
      <TopBar onClick={(e) => e.stopPropagation()}>
        <TitleText>{productName}</TitleText>
        <CloseBtn onClick={onClose} aria-label="Close Lightbox">
          <X size={20} />
        </CloseBtn>
      </TopBar>

      <ViewportArea
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageStage
          $isDragging={isDragging}
          style={{
            transform: `translate3d(${panPos.x}px, ${panPos.y}px, 0) scale(${zoomScale})`,
          }}
        >
          <SafeImage src={currentImg} alt={productName} />
        </ImageStage>

        {images.length > 1 && (
          <>
            <NavArrow $direction="left" onClick={handlePrev} aria-label="Previous Image">
              <ChevronLeft size={24} />
            </NavArrow>
            <NavArrow $direction="right" onClick={handleNext} aria-label="Next Image">
              <ChevronRight size={24} />
            </NavArrow>
          </>
        )}

        <ZoomControlsBar onClick={(e) => e.stopPropagation()}>
          <ZoomBtn onClick={handleZoomOut} disabled={zoomScale <= 1} title="Zoom Out">
            <ZoomOut size={18} />
          </ZoomBtn>
          <ZoomValue>{Math.round(zoomScale * 100)}%</ZoomValue>
          <ZoomBtn onClick={handleZoomIn} disabled={zoomScale >= 3.5} title="Zoom In">
            <ZoomIn size={18} />
          </ZoomBtn>
          <ZoomBtn onClick={handleResetZoom} title="Reset Zoom">
            <RotateCcw size={16} />
          </ZoomBtn>
        </ZoomControlsBar>
      </ViewportArea>

      {images.length > 1 && (
        <BottomThumbnailsBar onClick={(e) => e.stopPropagation()}>
          {images.map((url, idx) => (
            <ThumbnailTile
              key={idx}
              $active={activeIndex === idx}
              onClick={() => {
                handleResetZoom();
                onSelectIndex(idx);
              }}
              aria-label={`View image ${idx + 1}`}
            >
              <SafeImage src={url} alt={`${productName} thumbnail ${idx + 1}`} />
            </ThumbnailTile>
          ))}
        </BottomThumbnailsBar>
      )}
    </LightboxOverlay>
  );
};
