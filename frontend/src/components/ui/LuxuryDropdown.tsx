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

const DropdownWrapper = styled.div<{ $fullWidth?: boolean; $isOpen?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  user-select: none;
  z-index: ${({ $isOpen }) => ($isOpen ? 9999 : 1)};
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin-bottom: 8px;
`;

const TriggerButton = styled.button<{ $open: boolean; $disabled?: boolean }>`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  background-color: #111111;
  border: 1px solid ${({ $open }) => ($open ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #F5F1E8;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #C9A96E;
  }

  &:focus-visible {
    outline: none;
    border-color: #C9A96E;
    box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.2);
  }

  .trigger-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .chevron {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: #C9A96E;
    flex-shrink: 0;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  max-height: 180px;
  overflow-y: auto;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  border-radius: 4px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(201, 169, 110, 0.15);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 99999;
  animation: ${fadeInDown} 160ms cubic-bezier(0.16, 1, 0.3, 1) forwards;

  scrollbar-width: thin;
  scrollbar-color: #C9A96E #111111;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #111111;
    border-radius: 0 4px 4px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #C9A96E;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #DFBA73;
  }
`;

const MenuItem = styled.li<{ $selected: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
  font-size: 0.82rem;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  color: ${({ $selected }) => ($selected ? '#C9A96E' : '#F5F1E8')};
  background-color: ${({ $selected, $active }) =>
    $selected ? '#1F1B14' : $active ? '#1E1E1E' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;

  &:hover {
    background-color: #1E1E1E;
    color: #C9A96E;
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
  const menuListRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value || (opt.value && value && opt.value.toLowerCase() === value.toLowerCase()))
    || (value === 'All' || value === 'Any' ? options.find((opt) => opt.value === 'All' || opt.value === 'Any') : null);

  const displayLabel = selectedOption ? selectedOption.label : (placeholder || (options[0]?.label ?? 'Select...'));

  useEffect(() => {
    if (isOpen && menuListRef.current) {
      menuListRef.current.scrollTop = 0;
    }
  }, [isOpen]);

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
    <DropdownWrapper ref={containerRef} $fullWidth={fullWidth} $isOpen={isOpen} style={style} className={className}>
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
        <MenuList ref={menuListRef} role="listbox">
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
                    color: '#C9A96E',
                    textTransform: 'uppercase',
                    background: '#111111',
                    borderTop: '1px solid rgba(140, 116, 75, 0.2)',
                    borderBottom: '1px solid rgba(140, 116, 75, 0.2)',
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
