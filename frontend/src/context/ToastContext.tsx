import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastFn {
  (message: string, type?: ToastType): void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export interface ToastContextType {
  showToast: ToastFn;
  // Also support direct destructuring of helper methods from useToast() e.g. const { showToast, error, success } = useToast();
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const defaultFn: any = (message: string, type: ToastType = 'success') => {};
defaultFn.success = () => {};
defaultFn.error = () => {};
defaultFn.warning = () => {};
defaultFn.info = () => {};

const ToastContext = createContext<ToastContextType>({
  showToast: defaultFn,
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
});

const ToastNotificationContainer = styled.div<{ $show: boolean; $type: ToastType }>`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: ${({ $show }) => ($show ? 'translate(-50%, 0)' : 'translate(-50%, -20px)')};
  z-index: 9999999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 30px;
  background: #ffffff;
  border: 1px solid ${({ $type }) => ($type === 'warning' ? '#f59e0b' : $type === 'error' ? '#ef4444' : $type === 'info' ? '#3b82f6' : '#10b981')};
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(201, 164, 92, 0.3);
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  width: 90%;
  max-width: 460px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    top: 70px;
    padding: 10px 18px;
  }

  .toast-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ $type }) => ($type === 'warning' ? '#fef3c7' : $type === 'error' ? '#fee2e2' : $type === 'info' ? '#dbeafe' : '#d1fae5')};
    color: ${({ $type }) => ($type === 'warning' ? '#d97706' : $type === 'error' ? '#dc2626' : $type === 'info' ? '#2563eb' : '#059669')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(5, 150, 105, 0.15);

    svg {
      width: 20px;
      height: 20px;
      stroke-width: 2.8px;
    }
  }

  .toast-content {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #19202a;
    line-height: 1.4;

    @media (max-width: 576px) {
      font-size: 0.82rem;
    }
  }

  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #999388;
    padding: 2px;
    margin-left: auto;
    display: flex;
    align-items: center;

    &:hover {
      color: #19202a;
    }
  }
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success',
  });

  const triggerToast = (message: string, type: ToastType = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const showToastFn: any = (message: string, type: ToastType = 'success') => triggerToast(message, type);
  showToastFn.success = (msg: string) => triggerToast(msg, 'success');
  showToastFn.error = (msg: string) => triggerToast(msg, 'error');
  showToastFn.warning = (msg: string) => triggerToast(msg, 'warning');
  showToastFn.info = (msg: string) => triggerToast(msg, 'info');

  return (
    <ToastContext.Provider
      value={{
        showToast: showToastFn,
        success: (msg: string) => triggerToast(msg, 'success'),
        error: (msg: string) => triggerToast(msg, 'error'),
        warning: (msg: string) => triggerToast(msg, 'warning'),
        info: (msg: string) => triggerToast(msg, 'info'),
      }}
    >
      {children}
      <ToastNotificationContainer $show={toast.show} $type={toast.type}>
        <div className="toast-icon">
          {toast.type === 'error' ? (
            <AlertCircle size={22} />
          ) : toast.type === 'warning' ? (
            <AlertCircle size={22} />
          ) : toast.type === 'info' ? (
            <Info size={22} />
          ) : (
            <CheckCircle2 size={22} />
          )}
        </div>
        <div className="toast-content">{toast.message}</div>
        <button
          className="toast-close"
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
        >
          <X size={16} />
        </button>
      </ToastNotificationContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
