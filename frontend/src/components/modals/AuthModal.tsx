import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Eye, EyeOff, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth, AuthModalMode } from '../../context/AuthContext';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(24, 23, 21, 0.72);
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
  background: #ffffff;
  border: 1px solid #d9d3c7;
  width: 100%;
  max-width: 520px;
  position: relative;
  padding: 44px 40px;
  box-shadow: 0 24px 60px rgba(31, 31, 31, 0.18), 0 0 0 1px rgba(201, 164, 92, 0.25);
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
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: #1f1f1f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    color: #c9a45c;
    border-color: #c9a45c;
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
    background: linear-gradient(135deg, #faf5eb 0%, #f4eae0 100%);
    border: 1px solid #c9a45c;
    border-radius: 50%;
    margin-bottom: 12px;
    color: #c9a45c;
    box-shadow: 0 4px 14px rgba(201, 164, 92, 0.15);
  }

  .brand-sub {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a45c;
    margin-bottom: 6px;
  }

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin: 0 0 10px 0;
    font-weight: 500;
  }

  .gold-divider {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #c9a45c 50%, transparent 100%);
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
    color: #1f1f1f;
  }

  .forgot-link {
    font-size: 0.74rem;
    color: #6b6b6b;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #c9a45c;
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
    color: #1f1f1f;
    background-color: #faf5eb;
    border: 1px solid #d9d3c7;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.14);
    }
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #777;
    cursor: pointer;

    &:hover {
      color: #c9a45c;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #1f1f1f 0%, #2b2a28 100%);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 6px;

  &:hover {
    background: linear-gradient(135deg, #c9a45c 0%, #b8944d 100%);
    border-color: #c9a45c;
    color: #1f1f1f;
    box-shadow: 0 6px 18px rgba(201, 164, 92, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0 16px;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e8e3d9;
  }

  span {
    padding: 0 12px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #888;
    text-transform: uppercase;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  color: #1f1f1f;
  border: 1px solid #d9d3c7;
  font-size: 0.84rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: #c9a45c;
    background-color: #faf5eb;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterRow = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f7f2ea;
  font-size: 0.82rem;
  color: #6b6b6b;

  button {
    background: none;
    border: none;
    color: #1f1f1f;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-left: 6px;

    &:hover {
      color: #c9a45c;
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.div`
  background-color: #fdf2f2;
  border: 1px solid #f8b4b4;
  color: #c53030;
  padding: 10px 14px;
  font-size: 0.8rem;
  border-radius: 2px;
  margin-bottom: 16px;
  text-align: center;
`;

const SuccessMsg = styled.div`
  background-color: #f0fff4;
  border: 1px solid #9ae6b4;
  color: #276749;
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
    googleAuth,
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsSubmitting(true);
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

        await googleAuth({
          token: tokenResponse.access_token,
          accessToken: tokenResponse.access_token,
          credential: (tokenResponse as any).credential || (tokenResponse as any).id_token,
          userInfo,
        });
      } catch (err: any) {
        console.error('Google OAuth error:', err);
        setError(err?.response?.data?.message || err?.message || 'Google authentication failed.');
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: (errorResponse: any) => {
      console.warn('Google login error:', errorResponse);
      if (errorResponse?.error !== 'popup_closed_by_user') {
        setError(errorResponse?.error_description || 'Google Sign-In failed or was canceled.');
      }
    },
  });

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
          <div className="brand-sub">FLOKSY JEWEL ATELIER</div>
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
              placeholder="eleanor@floksyjewel.com"
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
                style={{ width: '16px', height: '16px', accentColor: '#c9a45c', cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.8rem', color: '#555', cursor: 'pointer', textTransform: 'none', fontWeight: 400 }}>
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

        {authModalMode !== 'forgot_password' && (
          <>
            <Divider>
              <span>OR</span>
            </Divider>

            <GoogleButton type="button" onClick={() => { setError(''); googleLogin(); }}>
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {authModalMode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
            </GoogleButton>
          </>
        )}

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
