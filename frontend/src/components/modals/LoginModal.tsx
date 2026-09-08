import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Eye, EyeOff, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp?: () => void;
  onOpenForgotPassword?: () => void;
  onSuccess?: () => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: backdropFadeIn 0.3s ease-out;

  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  width: 100%;
  max-width: 480px;
  position: relative;
  padding: 48px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 169, 110, 0.25);
  box-sizing: border-box;
  animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 6px;
  color: #F5F1E8;

  @keyframes modalScaleUp {
    from {
      opacity: 0;
      transform: scale(0.94) translateY(14px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (max-width: 576px) {
    padding: 36px 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: #F5F1E8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    color: #C9A96E;
    border-color: #C9A96E;
    transform: rotate(90deg);
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;

  .crest-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #111111;
    border: 1px solid #C9A96E;
    border-radius: 50%;
    margin-bottom: 14px;
    color: #C9A96E;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  }

  .brand-sub {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 6px;
  }

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.3rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin: 0 0 10px 0;
    font-weight: 500;
  }

  .gold-divider {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #C9A96E 50%, transparent 100%);
    margin: 0 auto;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  .forgot-link {
    font-size: 0.76rem;
    color: #A8A8A8;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
      text-decoration: underline;
    }
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 14px 16px;
    font-size: 0.92rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      border-color: #C9A96E;
      background-color: #161616;
      box-shadow: 0 0 0 4px rgba(201, 169, 110, 0.14);
    }
  }

  .password-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #A8A8A8;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: #C9A96E;
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #C9A96E;
  color: #0B0B0B;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    color: #0B0B0B;
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.4);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FooterRow = styled.div`
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  font-size: 0.85rem;
  color: #D8D2C5;

  button {
    background: none;
    border: none;
    color: #C9A96E;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-left: 6px;
    transition: color 0.2s ease;

    &:hover {
      color: #DFBA73;
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.div`
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 12px 16px;
  font-size: 0.82rem;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
`;

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenSignUp,
  onOpenForgotPassword,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.login({ email, password });
      if (data.token) {
        localStorage.setItem('app_auth_token', data.token);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </CloseButton>

        <HeaderSection>
          <div className="crest-logo">
            <Sparkles size={20} />
          </div>
          <div className="brand-sub">AETHELCARATS</div>
          <h2>SIGN IN</h2>
          <div className="gold-divider" />
        </HeaderSection>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="modal-login-email">Email Address</label>
            <input
              id="modal-login-email"
              type="email"
              placeholder="e.g. eleanor@auroradiamonds.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <div className="label-row">
              <label htmlFor="modal-login-password">Password</label>
              <span
                className="forgot-link"
                onClick={() => {
                  onClose();
                  if (onOpenForgotPassword) onOpenForgotPassword();
                }}
              >
                Forgot password?
              </span>
            </div>
            <div className="input-wrapper">
              <input
                id="modal-login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'AUTHENTICATING...' : 'SIGN IN TO ACCOUNT'}
          </LoginButton>
        </Form>

        <FooterRow>
          Don't have an account?
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenSignUp) onOpenSignUp();
            }}
          >
            Create Account
          </button>
        </FooterRow>
      </ModalCard>
    </Overlay>
  );
};
