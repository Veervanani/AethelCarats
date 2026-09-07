import React from 'react';
import styled from 'styled-components';
import { RotateCcw } from 'lucide-react';

export interface AdminColorPickerProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange: (color: string) => void;
  inline?: boolean;
}

const LUXURY_PRESETS = [
  { name: 'Champagne Gold', hex: '#c9a45c' },
  { name: 'Warm Ivory', hex: '#f5f1e8' },
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Dark Charcoal', hex: '#1f1f1f' },
  { name: 'Deep Onyx', hex: '#0b0b0b' },
  { name: 'Muted Taupe', hex: '#8c877b' },
  { name: 'Rose Gold', hex: '#dfba73' },
];

const Container = styled.div<{ $inline?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  ${({ $inline }) =>
    $inline
      ? `
    font-size: 0.75rem;
  `
      : `
    margin-top: 4px;
    margin-bottom: 8px;
    width: 100%;
    flex-wrap: wrap;
  `}
`;

const SwatchWrapper = styled.label`
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #d9d3c7;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  input[type='color'] {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 44px;
    height: 44px;
    opacity: 0;
    cursor: pointer;
  }
`;

const HexInput = styled.input`
  width: 76px !important;
  height: 24px !important;
  padding: 2px 6px !important;
  font-family: monospace !important;
  font-size: 0.72rem !important;
  text-transform: uppercase !important;
  border: 1px solid #d9d3c7 !important;
  border-radius: 4px !important;
  background: #ffffff !important;
  color: #1f1f1f !important;
  box-sizing: border-box !important;

  &:focus {
    outline: none !important;
    border-color: #c9a45c !important;
  }
`;

const PresetsRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const PresetDot = styled.button<{ $color: string; $active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ $active }) => ($active ? '#1f1f1f' : 'rgba(0,0,0,0.2)')};
  box-shadow: ${({ $active }) => ($active ? '0 0 0 1px #c9a45c' : 'none')};
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.25);
  }
`;

const ResetButton = styled.button`
  background: transparent;
  border: none;
  color: #8c877b;
  cursor: pointer;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 0.7rem;

  &:hover {
    color: #c53030;
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const AdminColorPicker: React.FC<AdminColorPickerProps> = ({
  label,
  value,
  defaultValue = '#1f1f1f',
  onChange,
  inline = true,
}) => {
  const currentColor = value || defaultValue;

  return (
    <Container $inline={inline} title={label ? `${label} text color` : 'Customize text color'}>
      {label && <span style={{ color: '#77736c', fontSize: '0.72rem', fontWeight: 600 }}>{label}:</span>}
      <SwatchWrapper
        style={{ backgroundColor: currentColor }}
        title="Click to open color palette picker"
      >
        <input
          type="color"
          value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : defaultValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </SwatchWrapper>

      <HexInput
        type="text"
        value={value || ''}
        placeholder={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        title="Hex color code (e.g. #c9a45c)"
      />

      <PresetsRow>
        {LUXURY_PRESETS.map((p) => (
          <PresetDot
            key={p.hex}
            type="button"
            $color={p.hex}
            $active={value?.toLowerCase() === p.hex.toLowerCase()}
            title={`${p.name} (${p.hex})`}
            onClick={() => onChange(p.hex)}
          />
        ))}
      </PresetsRow>

      {value && value.toLowerCase() !== defaultValue.toLowerCase() && (
        <ResetButton
          type="button"
          onClick={() => onChange('')}
          title="Reset to default color"
        >
          <RotateCcw size={11} />
        </ResetButton>
      )}
    </Container>
  );
};
