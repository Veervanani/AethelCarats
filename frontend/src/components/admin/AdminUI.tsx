import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Loader2 } from 'lucide-react';

// ==========================================
// LUXURY DESIGN SYSTEM TOKENS & STYLES
// ==========================================

export const PageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  padding-bottom: 18px;
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
    font-size: 1.85rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #19202a;
    margin: 0;
    line-height: 1.2;
  }

  p {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.85rem;
    color: #77736c;
    margin: 0;
    line-height: 1.5;
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost' | 'outline';
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
  $variant: 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost' | 'outline';
  $size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  letter-spacing: 0.06em;
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
          padding: 6px 14px;
          font-size: 0.72rem;
          height: 32px;
        `;
      case 'lg':
        return `
          padding: 12px 26px;
          font-size: 0.85rem;
          height: 46px;
        `;
      default:
        return `
          padding: 9px 18px;
          font-size: 0.78rem;
          height: 38px;
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
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          &:hover:not(:disabled) {
            border-color: #c9a45c;
            color: #8e6c27;
            background: #faf8f5;
            transform: translateY(-1px);
          }
        `;
      case 'gold':
        return `
          background: linear-gradient(135deg, #dfbe7a 0%, #c9a45c 100%);
          color: #11161b;
          border: 1px solid #c9a45c;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(201, 164, 92, 0.25);
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #ebd094 0%, #b8934b 100%);
            border-color: #b8934b;
            box-shadow: 0 4px 12px rgba(201, 164, 92, 0.35);
            transform: translateY(-1px);
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
      case 'outline':
        return `
          background: transparent;
          color: #19202a;
          border: 1px solid #19202a;
          &:hover:not(:disabled) {
            background: #19202a;
            color: #ffffff;
          }
        `;
      default:
        return `
          background: #161b22;
          color: #ffffff;
          border: 1px solid #161b22;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          &:hover:not(:disabled) {
            background: #c9a45c;
            border-color: #c9a45c;
            color: #11161b;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #383531;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 0;

    span.req {
      color: #c53030;
      font-weight: 800;
    }
  }

  .helper-text {
    font-size: 0.75rem;
    color: #77736c;
    margin-top: 2px;
  }
`;

const baseInputStyles = css`
  width: 100%;
  padding: 10px 14px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  color: #19202a;
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
    box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.18);
  }

  &:disabled {
    background: #f7f6f2;
    color: #8c877d;
    cursor: not-allowed;
  }
`;

export const AdminInput = styled.input`
  ${baseInputStyles}
  height: 40px;
`;

export const AdminSelect = styled.select`
  ${baseInputStyles}
  height: 40px;
  cursor: pointer;
`;

export const AdminTextarea = styled.textarea`
  ${baseInputStyles}
  min-height: 100px;
  resize: vertical;
  line-height: 1.5;
`;

// ==========================================
// CARD & CONTAINER SYSTEM
// ==========================================

export const AdminCard = styled.div<{ $disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 26px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.025);
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: #dcd6cb;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
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
    color: #19202a;
    margin: 0;
    letter-spacing: 0.02em;
  }
`;

export const AdminCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AdminCardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding-top: 18px;
  margin-top: 20px;
  border-top: 1px solid #f2ede4;
`;

// ==========================================
// STATS SYSTEM
// ==========================================

export const AdminStatsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 4}, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const AdminStatCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  .stat-icon {
    width: 46px;
    height: 46px;
    border-radius: 8px;
    background: #faf8f5;
    color: #c9a45c;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-num {
    font-size: 1.6rem;
    font-weight: 700;
    color: #19202a;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #77736c;
    margin-top: 4px;
  }
`;

// ==========================================
// BADGE SYSTEM
// ==========================================

export type BadgeVariant = 'published' | 'draft' | 'active' | 'inactive' | 'gold' | 'pending' | 'danger' | 'info' | 'purple';

export const AdminBadge = styled.span<{ $variant?: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 12px;
  white-space: nowrap;

  ${({ $variant }) => {
    switch ($variant) {
      case 'published':
      case 'active':
        return `
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
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
          background: #fff8e1;
          color: #f57f17;
          border: 1px solid #ffe082;
        `;
      case 'danger':
        return `
          background: #fce8e6;
          color: #c5221f;
          border: 1px solid #fad2cf;
        `;
      case 'info':
        return `
          background: #e8f0fe;
          color: #1a73e8;
          border: 1px solid #aecbfa;
        `;
      case 'purple':
        return `
          background: #f3e8fd;
          color: #7b1fa2;
          border: 1px solid #ce93d8;
        `;
      default:
        return `
          background: #faf5eb;
          color: #8e6c27;
          border: 1px solid #e8e3d9;
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
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
`;

export const AdminTable = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;

  th {
    background: #faf8f5;
    padding: 14px 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #66625b;
    text-align: left;
    border-bottom: 1px solid #e8e3d9;
  }

  td {
    padding: 15px 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.88rem;
    color: #19202a;
    border-bottom: 1px solid #f2ede4;
    vertical-align: middle;
  }

  tbody tr {
    transition: background-color 0.18s ease;

    &:hover {
      background-color: #faf7f2;
    }

    &:last-child td {
      border-bottom: none;
    }
  }
`;

export const AdminPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #faf8f5;
  border-top: 1px solid #e8e3d9;
  font-size: 0.82rem;
  color: #77736c;
`;

export const AdminPaginationBtn = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#19202a' : '#e8e3d9')};
  background: ${({ $active }) => ($active ? '#19202a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#19202a')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #19202a;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// ==========================================
// TABS SYSTEM
// ==========================================

export const AdminTabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 2px;
`;

export const AdminTabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#19202a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fffdfa' : '#55524d')};
  border: 1px solid ${({ $active }) => ($active ? '#19202a' : '#e8e3d9')};
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #19202a;
    color: ${({ $active }) => ($active ? '#fffdfa' : '#19202a')};
  }
`;

// ==========================================
// MODAL & DRAWER SYSTEM
// ==========================================

export const AdminModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 19, 24, 0.7);
  backdrop-filter: blur(5px);
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
  max-height: 88vh;
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);

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
      font-weight: 600;
      color: #19202a;
      margin: 0;
    }

    button.close-btn {
      background: none;
      border: none;
      color: #77736c;
      cursor: pointer;
      padding: 4px;
      &:hover {
        color: #19202a;
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
      padding: '54px 24px',
      textAlign: 'center',
      background: '#ffffff',
      border: '1px dashed #d9d3c7',
      borderRadius: 8,
      margin: '24px 0',
    }}
  >
    {icon && <div style={{ color: '#c9a45c', marginBottom: 14 }}>{icon}</div>}
    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.45rem', fontWeight: 600, color: '#19202a', margin: '0 0 6px' }}>
      {title}
    </h3>
    {description && <p style={{ fontSize: '0.88rem', color: '#77736c', margin: '0 0 22px', maxWidth: 480, marginInline: 'auto' }}>{description}</p>}
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

export { AdminColorPicker } from './AdminColorPicker';
export type { AdminColorPickerProps } from './AdminColorPicker';

