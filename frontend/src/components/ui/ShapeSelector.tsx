import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, Check } from 'lucide-react';
import { DIAMOND_SHAPES, normalizeShape } from '../../config/diamondShapes';

interface ShapeSelectorProps {
  selectedShape: string;
  onSelectShape: (shape: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ShapeSelectorContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ShapesSubgrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ShapeCard = styled.button<{ $selected: boolean }>`
  position: relative;
  background-color: ${({ $selected }) => ($selected ? '#faf5eb' : '#ffffff')};
  border: 1px solid ${({ $selected }) => ($selected ? '#c9a45c' : '#e8e3d9')};
  border-radius: 4px;
  padding: 10px 6px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected ? '0 2px 10px rgba(201, 164, 92, 0.2)' : 'none'};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;

  &:hover, &:focus-visible {
    border-color: #c9a45c;
    background-color: #faf5eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(201, 164, 92, 0.15);
  }

  .svg-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: ${({ $selected }) =>
        $selected
          ? 'brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%)'
          : 'brightness(0.2)'};
      transition: filter 0.2s ease, transform 0.2s ease;
    }
  }

  span.shape-name {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ $selected }) => ($selected ? '#c9a45c' : '#1f1f1f')};
    transition: color 0.2s ease;
  }

  .check-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

const ToggleExpandButton = styled.button<{ $expanded: boolean }>`
  background: none;
  border: none;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #6b6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 0 0;
  transition: color 0.2s ease;

  &:hover {
    color: #c9a45c;
  }

  svg {
    transition: transform 0.25s ease;
    transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  selectedShape,
  onSelectShape,
  className,
  style,
}) => {
  const [showMore, setShowMore] = useState(false);
  const canonicalSelected = normalizeShape(selectedShape);

  const initialShapes = DIAMOND_SHAPES.slice(0, 9);
  const additionalShapes = DIAMOND_SHAPES.slice(9);
  const visibleShapes = showMore ? DIAMOND_SHAPES : initialShapes;

  return (
    <ShapeSelectorContainer className={className} style={style}>
      <ShapesSubgrid>
        {visibleShapes.map((shape) => {
          const isSelected = canonicalSelected === shape.value;
          return (
            <ShapeCard
              key={shape.value}
              type="button"
              $selected={isSelected}
              onClick={() => onSelectShape(isSelected ? 'All' : shape.value)}
              data-testid={`shape-card-${shape.value.toLowerCase()}`}
            >
              <div className="check-icon">
                <Check size={10} color="#C9A45C" />
              </div>
              <div className="svg-wrapper">
                <img
                  src={shape.image}
                  alt={shape.name}
                  onError={(e: any) => {
                    // Fallback to default asset if broken path
                    const fallback = `/assets/diamonds/${shape.value}.svg`;
                    if (e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
                />
              </div>
              <span className="shape-name">{shape.name}</span>
            </ShapeCard>
          );
        })}
      </ShapesSubgrid>

      {additionalShapes.length > 0 && (
        <ToggleExpandButton
          type="button"
          $expanded={showMore}
          onClick={() => setShowMore(!showMore)}
        >
          <span>{showMore ? 'Show Fewer Shapes' : 'More Shapes'}</span>
          <ChevronDown size={12} />
        </ToggleExpandButton>
      )}
    </ShapeSelectorContainer>
  );
};
