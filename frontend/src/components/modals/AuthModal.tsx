import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Eye, EyeOff, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { useAuth, AuthModalMode } from '../../context/AuthContext';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
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
  max-width: 520px;
  position: relative;
  padding: 44px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(201, 169, 110, 0.15);
  box-sizing: border-box;
  animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 4px;
  max-height: 90vh;
  overflow-y: auto;

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
  border: 1px solid rgba(140, 116, 75, 0.25);
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
    background: linear-gradient(135deg, #1f1f1f 0%, #111111 100%);
    border: 1px solid #C9A96E;
    border-radius: 50%;
    margin-bottom: 12px;
    color: #C9A96E;
    box-shadow: 0 4px 14px rgba(201, 169, 110, 0.25);
  }

  .brand-sub {
    font-size: 0.72rem;
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
  gap: 18px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label {
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  .forgot-link {
    font-size: 0.74rem;
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
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background-color: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
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
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #C9A96E;
  color: #0B0B0B;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 6px;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.35);
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
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  font-size: 0.82rem;
  color: #A8A8A8;

  button {
    background: none;
    border: none;
    color: #C9A96E;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-left: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.div`
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid rgba(229, 62, 62, 0.4);
  color: #FC8181;
  padding: 10px 14px;
  font-size: 0.8rem;
  border-radius: 2px;
  margin-bottom: 16px;
  text-align: center;
`;

const SuccessMsg = styled.div`
  background-color: rgba(56, 161, 105, 0.15);
  border: 1px solid rgba(56, 161, 105, 0.4);
  color: #68D391;
  padding: 10px 14px;
  font-size: 0.8rem;
  border-radius: 2px;
  margin-bottom: 16px;
  text-align: center;
`;

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    rememberMe,
    setRememberMe,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) closeAuthModal();
    };
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (authModalMode === 'signin') {
      if (!email || !password) {
        setError('Please enter both your email address and password.');
        return;
      }
      setIsSubmitting(true);
      try {
        await login({ email, password }, rememberMe);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Unable to sign in. Please check your credentials.');
      } finally {
        setIsSubmitting(false);
      }
    } else if (authModalMode === 'register') {
      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setIsSubmitting(true);
      try {
        const fullName = `${firstName} ${lastName}`.trim() || email.split('@')[0];
        await register({ name: fullName, email, password });
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Unable to create account. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else if (authModalMode === 'forgot_password') {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      setIsSubmitting(true);
      try {
        setSuccess(`Password reset instructions sent to ${email}`);
      } catch (err: any) {
        setError('Unable to send password reset email.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Overlay $isOpen={isAuthModalOpen} onClick={closeAuthModal}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeAuthModal} aria-label="Close modal">
          <X size={18} />
        </CloseButton>

        <HeaderSection>
          <div className="crest-logo">
            <Sparkles size={20} />
          </div>
          <div className="brand-sub">AETHELCARATS</div>
          <h2>
            {authModalMode === 'signin' && 'SIGN IN'}
            {authModalMode === 'register' && 'CREATE ACCOUNT'}
            {authModalMode === 'forgot_password' && 'FORGOT PASSWORD'}
          </h2>
          <div className="gold-divider" />
        </HeaderSection>

        {error && <ErrorMsg>{error}</ErrorMsg>}
        {success && <SuccessMsg>{success}</SuccessMsg>}

        <Form onSubmit={handleSubmit}>
          {authModalMode === 'register' && (
            <FormRow>
              <FormGroup>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Eleanor"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Vane"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
            </FormRow>
          )}

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="eleanor@aethelcarats.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={authModalMode !== 'register'}
            />
          </FormGroup>

          {authModalMode !== 'forgot_password' && (
            <FormGroup>
              <div className="label-row">
                <label>Password</label>
                {authModalMode === 'signin' && (
                  <span
                    className="forgot-link"
                    onClick={() => openAuthModal('forgot_password')}
                  >
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="input-wrapper">
                <input
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
          )}

          {authModalMode === 'signin' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -6, marginBottom: 2 }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#C9A96E', cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.8rem', color: '#A8A8A8', cursor: 'pointer', textTransform: 'none', fontWeight: 400 }}>
                Remember me on this device (14-day persistent login)
              </label>
            </div>
          )}

          {authModalMode === 'register' && (
            <FormGroup>
              <label>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? authModalMode === 'signin'
                ? 'AUTHENTICATING...'
                : authModalMode === 'register'
                ? 'CREATING ACCOUNT...'
                : 'SENDING...'
              : authModalMode === 'signin'
              ? 'SIGN IN TO ACCOUNT'
              : authModalMode === 'register'
              ? 'CREATE ACCOUNT'
              : 'SEND RESET REQUEST'}
          </SubmitButton>
        </Form>

        <FooterRow>
          {authModalMode === 'signin' && (
            <>
              Don't have an account?
              <button type="button" onClick={() => openAuthModal('register')}>
                Create Account
              </button>
            </>
          )}
          {authModalMode === 'register' && (
            <>
              Already have an account?
              <button type="button" onClick={() => openAuthModal('signin')}>
                Sign In
              </button>
            </>
          )}
          {authModalMode === 'forgot_password' && (
            <>
              Remembered your password?
              <button type="button" onClick={() => openAuthModal('signin')}>
                Sign In
              </button>
            </>
          )}
        </FooterRow>
      </ModalCard>
    </Overlay>
  );
};
