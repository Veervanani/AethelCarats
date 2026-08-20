import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, Check } from 'lucide-react';

export interface LuxuryOption {
  label: string;
  value: string;
  isHeader?: boolean;
  colorHex?: string;
}

interface LuxuryDropdownProps {
  label?: string;
  options: LuxuryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownWrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  user-select: none;
`;

const Label = styled.label`
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b6b6b;
  margin-bottom: 4px;
`;

const TriggerButton = styled.button<{ $open: boolean; $disabled?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid ${({ $open }) => ($open ? '#c9a45c' : '#d9d3c7')};
  border-radius: 2px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #1f1f1f;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $disabled }) => ($disabled ? '#d9d3c7' : '#c9a45c')};
  }

  &:focus-visible {
    outline: 2px solid #c9a45c;
    outline-offset: 1px;
  }

  .trigger-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: #6b6b6b;
    flex-shrink: 0;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 140px;
  max-height: 240px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(31, 31, 31, 0.08);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 1000;
  animation: ${fadeInDown} 200ms ease-out forwards;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d3c7;
    border-radius: 2px;
  }
`;

const MenuItem = styled.li<{ $selected: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 0.78rem;
  font-weight: ${({ $selected }) => ($selected ? '700' : '500')};
  color: ${({ $selected }) => ($selected ? '#c9a45c' : '#1f1f1f')};
  background-color: ${({ $selected, $active }) =>
    $selected ? '#faf5eb' : $active ? '#faf8f5' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: #faf5eb;
    color: #c9a45c;
  }
`;

export const LuxuryDropdown: React.FC<LuxuryDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  style,
  className,
  fullWidth = true,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDownGlobal = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(options.length - 1);
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    }
  };

  const handleSelect = (val: string) => {
    if (val === value && val !== 'All' && val !== 'Any') {
      const fallback = options.find((o) => o.value === 'All' || o.value === 'Any')?.value || 'All';
      onChange(fallback);
    } else {
      onChange(val);
    }
    setIsOpen(false);
  };

  return (
    <DropdownWrapper ref={containerRef} $fullWidth={fullWidth} style={style} className={className}>
      {label && <Label>{label}</Label>}
      <TriggerButton
        type="button"
        $open={isOpen}
        $disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="trigger-text">{displayLabel}</span>
        <ChevronDown size={14} className="chevron" />
      </TriggerButton>

      {isOpen && (
        <MenuList role="listbox">
          {options.map((opt, idx) => {
            if (opt.isHeader) {
              return (
                <div
                  key={opt.value || idx}
                  style={{
                    padding: '8px 12px 4px 12px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#c9a45c',
                    textTransform: 'uppercase',
                    background: '#faf8f5',
                    borderTop: '1px solid #f0ecf6',
                    borderBottom: '1px solid #f0ecf6',
                    margin: '4px 0 2px 0',
                  }}
                >
                  {opt.label}
                </div>
              );
            }
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightedIndex;
            return (
              <MenuItem
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                $selected={isSelected}
                $active={isHighlighted}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setHighlightedIndex(idx)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {opt.colorHex && (
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: opt.colorHex,
                        border: '1px solid #ccc',
                        display: 'inline-block',
                      }}
                    />
                  )}
                  {opt.label}
                </span>
                {isSelected && <Check size={14} color="#C9A45C" />}
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </DropdownWrapper>
  );
};
