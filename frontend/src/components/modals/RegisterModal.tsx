import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../../services/api';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
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
  max-width: 500px;
  position: relative;
  padding: 44px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 169, 110, 0.25);
  box-sizing: border-box;
  animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 6px;
  max-height: 90vh;
  overflow-y: auto;
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
    font-size: 2.2rem;
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
  gap: 16px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

  .input-wrapper {
    position: relative;
    width: 100%;
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
    font-family: 'Inter', sans-serif;
    transition: all 0.25s ease;

    &:focus {
      border-color: #C9A96E;
      background-color: #161616;
      box-shadow: 0 0 0 4px rgba(201, 169, 110, 0.14);
    }
  }

  .password-toggle {
    position: absolute;
    right: 12px;
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
  margin-top: 6px;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #111111;
  color: #F5F1E8;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 12px;

  &:hover {
    border-color: #C9A96E;
    background-color: #161616;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterRow = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  font-size: 0.84rem;
  color: #D8D2C5;

  button {
    background: none;
    border: none;
    color: #C9A96E;
    font-weight: 700;
    cursor: pointer;
    margin-left: 6px;

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
  padding: 10px 14px;
  font-size: 0.82rem;
  border-radius: 4px;
  margin-bottom: 14px;
  text-align: center;
`;

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.register({
        name: `${firstName} ${lastName}`,
        email,
        password,
      });
      if (data.token) {
        localStorage.setItem('app_auth_token', data.token);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
        let userInfo: any = null;
        try {
          const infoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          if (infoRes.ok) {
            userInfo = await infoRes.json();
          }
        } catch (e) {
          console.warn('Google profile fetch warning:', e);
        }

        const res = await api.googleAuth({
          token: tokenResponse.access_token,
          accessToken: tokenResponse.access_token,
          credential: (tokenResponse as any).credential || (tokenResponse as any).id_token,
          userInfo,
        });

        if (res.token) {
          localStorage.setItem('app_auth_token', res.token);
          localStorage.setItem('app_user_profile', JSON.stringify(res.user));
          if (onSuccess) onSuccess();
          onClose();
        } else {
          setError('Google Sign-In failed. Please try again.');
        }
      } catch (err: any) {
        console.error('Google OAuth error:', err);
        setError(err?.response?.data?.message || err?.message || 'Google authentication failed.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse: any) => {
      console.warn('Google login error:', errorResponse);
      if (errorResponse?.error !== 'popup_closed_by_user') {
        setError(errorResponse?.error_description || 'Google Sign-In failed or was canceled.');
      }
    },
  });

  const handleGoogleSignIn = () => {
    setError('');
    googleLogin();
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
          <h2>CREATE ACCOUNT</h2>
          <div className="gold-divider" />
        </HeaderSection>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <label htmlFor="reg-first-name">First Name</label>
              <input
                id="reg-first-name"
                type="text"
                placeholder="Eleanor"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="reg-last-name">Last Name</label>
              <input
                id="reg-last-name"
                type="text"
                placeholder="Vane"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              placeholder="eleanor@auroradiamonds.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="reg-password">Password</label>
            <div className="input-wrapper">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a secure password"
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

          <FormGroup>
            <label htmlFor="reg-confirm-password">Confirm Password</label>
            <input
              id="reg-confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </SubmitButton>
        </Form>

        <GoogleButton type="button" onClick={handleGoogleSignIn}>
          <svg viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </GoogleButton>

        <FooterRow>
          Already have an account?
          <button type="button" onClick={onOpenLogin}>
            Login
          </button>
        </FooterRow>
      </ModalCard>
    </Overlay>
  );
};
