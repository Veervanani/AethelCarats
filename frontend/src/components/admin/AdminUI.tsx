import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

// ==========================================
// LUXURY DESIGN SYSTEM TOKENS & STYLES
// ==========================================

export const PageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e3d9;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const PageTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #1f1f1f;
    margin: 0;
    line-height: 1.2;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #77736c;
    margin: 0;
  }
`;

export const HeaderActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const AdminPageHeader: React.FC<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}> = ({ title, description, actions }) => (
  <PageHeaderWrapper>
    <PageTitleGroup>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </PageTitleGroup>
    {actions && <HeaderActionsGroup>{actions}</HeaderActionsGroup>}
  </PageHeaderWrapper>
);

// ==========================================
// BUTTON SYSTEM
// ==========================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $loading?: boolean;
  icon?: React.ReactNode;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

export const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost';
  $size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 6px 12px;
          font-size: 0.72rem;
        `;
      case 'lg':
        return `
          padding: 12px 24px;
          font-size: 0.85rem;
        `;
      default:
        return `
          padding: 9px 18px;
          font-size: 0.78rem;
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: #ffffff;
          color: #1f1f1f;
          border: 1px solid #d9d3c7;
          &:hover:not(:disabled) {
            border-color: #c9a45c;
            color: #c9a45c;
            background: #faf8f5;
          }
        `;
      case 'gold':
        return `
          background: #c9a45c;
          color: #1f1f1f;
          border: 1px solid #c9a45c;
          &:hover:not(:disabled) {
            background: #b8934b;
            border-color: #b8934b;
          }
        `;
      case 'danger':
        return `
          background: #fff5f5;
          color: #c53030;
          border: 1px solid #feb2b2;
          &:hover:not(:disabled) {
            background: #c53030;
            color: #ffffff;
            border-color: #c53030;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #55524d;
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            color: #1f1f1f;
            background: #faf5eb;
          }
        `;
      default:
        return `
          background: #1f1f1f;
          color: #ffffff;
          border: 1px solid #1f1f1f;
          &:hover:not(:disabled) {
            background: #c9a45c;
            border-color: #c9a45c;
            color: #1f1f1f;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AdminButton: React.FC<ButtonProps> = ({
  children,
  $variant = 'primary',
  $size = 'md',
  $loading = false,
  icon,
  disabled,
  ...props
}) => (
  <StyledButton $variant={$variant} $size={$size} disabled={disabled || $loading} {...props}>
    {$loading ? <SpinnerIcon size={14} /> : icon}
    {children}
  </StyledButton>
);

// ==========================================
// FORM CONTROLS
// ==========================================

export const AdminFormGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #33312e;
    display: flex;
    justify-content: space-between;

    span.req {
      color: #c53030;
    }
  }

  .helper-text {
    font-size: 0.75rem;
    color: #77736c;
    margin-top: 2px;
  }
`;

export const AdminInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #1f1f1f;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: #a39e93;
    font-size: 0.82rem;
  }

  &:focus {
    border-color: #c9a45c;
    box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.15);
  }

  &:disabled {
    background: #f7f6f2;
    color: #8c877d;
    cursor: not-allowed;
  }
`;

export const AdminSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #1f1f1f;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #c9a45c;
    box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.15);
  }

  &:disabled {
    background: #f7f6f2;
    color: #8c877d;
    cursor: not-allowed;
  }
`;

export const AdminTextarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #1f1f1f;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: #a39e93;
    font-size: 0.82rem;
  }

  &:focus {
    border-color: #c9a45c;
    box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.15);
  }
`;

// ==========================================
// CARD & CONTAINER SYSTEM
// ==========================================

export const AdminCard = styled.div<{ $disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid #e6e1d7;
  border-radius: 8px;
  padding: 26px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: #d9d3c7;
    box-shadow: 0 8px 24px rgba(23, 23, 23, 0.04);
  }
`;

export const AdminCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2ede4;

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #1f1f1f;
    margin: 0;
    letter-spacing: 0.02em;
  }
`;

// ==========================================
// BADGE SYSTEM
// ==========================================

export type BadgeVariant = 'published' | 'draft' | 'active' | 'inactive' | 'gold' | 'pending' | 'danger';

export const AdminBadge = styled.span<{ $variant?: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  white-space: nowrap;

  ${({ $variant }) => {
    switch ($variant) {
      case 'published':
      case 'active':
        return `
          background: #e6f4ea;
          color: #137333;
          border: 1px solid #ceead6;
        `;
      case 'draft':
      case 'inactive':
        return `
          background: #f1f3f4;
          color: #5f6368;
          border: 1px solid #dadce0;
        `;
      case 'pending':
        return `
          background: #fef7e0;
          color: #b06000;
          border: 1px solid #feefc3;
        `;
      case 'danger':
        return `
          background: #fce8e6;
          color: #c5221f;
          border: 1px solid #fad2cf;
        `;
      default:
        return `
          background: #faf5eb;
          color: #b8934b;
          border: 1px solid #e6e1d7;
        `;
    }
  }}
`;

// ==========================================
// TABLE SYSTEM
// ==========================================

export const AdminTableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #e6e1d7;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

export const AdminTable = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;

  th {
    background: #faf8f5;
    padding: 14px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #55524d;
    text-align: left;
    border-bottom: 1px solid #e6e1d7;
  }

  td {
    padding: 15px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #1f1f1f;
    border-bottom: 1px solid #f2ede4;
  }

  tbody tr {
    transition: background-color 0.18s ease;

    &:hover {
      background-color: #faf5eb;
    }

    &:last-child td {
      border-bottom: none;
    }
  }
`;

// ==========================================
// MODAL & DRAWER SYSTEM
// ==========================================

export const AdminModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 22, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const AdminModalCard = styled.div<{ $maxWidth?: string }>`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '560px'};
  max-height: 85vh;
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2ede4;

    h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.5rem;
      color: #1f1f1f;
      margin: 0;
    }

    button.close-btn {
      background: none;
      border: none;
      color: #77736c;
      cursor: pointer;
      padding: 4px;
      &:hover {
        color: #1f1f1f;
      }
    }
  }

  .modal-footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #f2ede4;
  }
`;

// ==========================================
// EMPTY & LOADING STATES
// ==========================================

export const AdminEmptyState: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, description, action, icon }) => (
  <div
    style={{
      padding: '48px 24px',
      textAlign: 'center',
      background: '#ffffff',
      border: '1px dashed #d9d3c7',
      borderRadius: 8,
      margin: '24px 0',
    }}
  >
    {icon && <div style={{ color: '#c9a45c', marginBottom: 12 }}>{icon}</div>}
    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#1f1f1f', margin: '0 0 6px' }}>
      {title}
    </h3>
    {description && <p style={{ fontSize: '0.85rem', color: '#77736c', margin: '0 0 20px' }}>{description}</p>}
    {action}
  </div>
);

export const AdminSkeleton = styled.div<{ $height?: string; $width?: string }>`
  height: ${({ $height }) => $height || '20px'};
  width: ${({ $width }) => $width || '100%'};
  background: linear-gradient(90deg, #f2ede4 25%, #faf8f5 50%, #f2ede4 75%);
  background-size: 200% 100%;
  border-radius: 4px;
`;
