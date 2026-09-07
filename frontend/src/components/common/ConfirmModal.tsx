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
  background: rgba(11, 11, 11, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease forwards;
`;

const ModalCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  animation: ${scaleUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #F5F1E8;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .close-btn {
    background: none;
    border: none;
    color: #D8D2C5;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: all 0.2s ease;
    &:hover {
      background: #1f1f1f;
      color: #C9A96E;
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #D8D2C5;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  background: #111111;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  button {
    padding: 9px 20px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .cancel-btn {
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.3);
    color: #F5F1E8;
    &:hover {
      background: #1f1f1f;
      border-color: #C9A96E;
      color: #C9A96E;
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
    background: #C9A96E;
    color: #0B0B0B;
    &:hover {
      background: #DFBA73;
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
