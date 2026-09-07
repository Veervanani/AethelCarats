import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
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
`;

const ModalCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  width: 100%;
  max-width: 440px;
  position: relative;
  padding: 44px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 169, 110, 0.25);
  box-sizing: border-box;
  animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 6px;
  color: #F5F1E8;

  @media (max-width: 576px) {
    padding: 32px 20px;
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
  margin-bottom: 28px;

  .crest-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #111111;
    border: 1px solid #C9A96E;
    border-radius: 50%;
    margin-bottom: 12px;
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
    font-size: 2.1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin: 0 0 10px 0;
    font-weight: 500;
  }

  p {
    font-size: 0.85rem;
    color: #D8D2C5;
    margin: 0;
    line-height: 1.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #C9A96E;
      background-color: #161616;
      box-shadow: 0 0 0 4px rgba(201, 169, 110, 0.14);
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #C9A96E;
  color: #0B0B0B;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.3);
  }
`;

const BackToLoginButton = styled.button`
  background: none;
  border: none;
  color: #D8D2C5;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 18px;
  width: 100%;

  &:hover {
    color: #C9A96E;
  }
`;

const SuccessCard = styled.div`
  text-align: center;
  padding: 10px 0;

  .icon {
    color: #C9A96E;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.9rem;
    color: #D8D2C5;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setEmail('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await api.forgotPassword(email);
    } catch (err) {
      // Ignore security enumeration
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
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
          <h2>RESET PASSWORD</h2>
          {!isSubmitted && <p>Enter your email address and we will send you instructions to reset your password.</p>}
        </HeaderSection>

        {!isSubmitted ? (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="reset-email">Email Address</label>
              <input
                id="reset-email"
                type="email"
                placeholder="eleanor@auroradiamonds.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
            </SubmitButton>
          </Form>
        ) : (
          <SuccessCard>
            <CheckCircle2 size={42} className="icon" />
            <p>
              If an account exists for <strong>{email}</strong>, a password reset link has been sent to your inbox.
            </p>
            <SubmitButton type="button" onClick={onOpenLogin}>
              RETURN TO LOGIN
            </SubmitButton>
          </SuccessCard>
        )}

        {!isSubmitted && (
          <BackToLoginButton type="button" onClick={onOpenLogin}>
            <ArrowLeft size={14} /> Back to Login
          </BackToLoginButton>
        )}
      </ModalCard>
    </Overlay>
  );
};
