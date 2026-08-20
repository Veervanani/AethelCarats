import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99990;
  background: rgba(18, 22, 26, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease forwards;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${scaleUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f0ecf6;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #19202a;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .close-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    &:hover {
      background: #f5f2ea;
      color: #1f1f1f;
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4a4a4a;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  background: #faf8f5;
  border-top: 1px solid #e8e3d9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  button {
    padding: 8px 18px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
  }

  .cancel-btn {
    background: #ffffff;
    border: 1px solid #d9d3c7;
    color: #1f1f1f;
    &:hover {
      background: #f5f2ea;
    }
  }

  .confirm-btn-danger {
    background: #c5221f;
    color: #ffffff;
    &:hover {
      background: #a31815;
    }
  }

  .confirm-btn-primary {
    background: #19202a;
    color: #ffffff;
    &:hover {
      background: #c9a45c;
    }
  }
`;

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>
            {isDanger && <AlertTriangle size={20} color="#c5221f" />}
            {title}
          </h3>
          <button className="close-btn" onClick={onCancel}>
            <X size={16} />
          </button>
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <button className="cancel-btn" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className={isDanger ? 'confirm-btn-danger' : 'confirm-btn-primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </ModalFooter>
      </ModalCard>
    </Overlay>
  );
};
