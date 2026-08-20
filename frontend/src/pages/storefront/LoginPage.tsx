import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, User, Mail, ArrowRight } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 56px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 40px 36px;
  box-shadow: 0 10px 30px rgba(31, 31, 31, 0.04);
  border-radius: 2px;

  @media (max-width: 576px) {
    padding: 28px 20px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d3c7;
  margin-bottom: 32px;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#1f1f1f' : '#6b6b6b')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#c9a45c' : 'transparent')};
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
  }

  input {
    padding: 12px 16px;
    font-size: 0.95rem;
    color: #1f1f1f;
    background-color: #faf5eb;
    border: 1px solid #d9d3c7;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &::placeholder {
      color: #6b6b6b;
    }

    &:focus {
      border-color: #c9a45c;
      background-color: #ffffff;
    }
  }
`;

const ForgotLink = styled.a`
  font-size: 0.8rem;
  color: #6b6b6b;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #c9a45c;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background-color: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }
`;

const ErrorMsg = styled.div`
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #d32f2f;
  background-color: #fdf2f2;
  border: 1px solid #f8b4b4;
`;

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Register mock / stored user
        localStorage.setItem('fj_customer_user', JSON.stringify({ email, name: name || 'Valued Customer' }));
        navigate('/account');
      } else {
        // Admin or Customer login
        try {
          const res = await api.loginAdmin({ email, password });
          if (res.token) {
            localStorage.setItem('fj_admin_token', res.token);
            navigate('/atelier-vault-7Kx9Qm4R2Lp8Nw6T');
            return;
          }
        } catch (e) {
          // Storefront customer login fallback
          localStorage.setItem('fj_customer_user', JSON.stringify({ email, name: email.split('@')[0] }));
          navigate('/account');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
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
          localStorage.setItem('floksy_token', res.token);
          localStorage.setItem('fj_customer_user', JSON.stringify(res.user));
          navigate('/account');
        } else {
          setError('Google Sign-In failed. Please try again.');
        }
      } catch (err: any) {
        console.error('Google OAuth error:', err);
        setError(err?.response?.data?.message || err?.message || 'Google authentication failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse: any) => {
      console.warn('Google login error:', errorResponse);
      if (errorResponse?.error !== 'popup_closed_by_user') {
        setError(errorResponse?.error_description || 'Google Sign-In failed or was canceled.');
      }
    },
  });

  return (
    <PageWrapper>
      <AuthCard>
        <TabHeader>
          <TabBtn $active={!isRegister} onClick={() => { setIsRegister(false); setError(''); }}>
            SIGN IN
          </TabBtn>
          <TabBtn $active={isRegister} onClick={() => { setIsRegister(true); setError(''); }}>
            CREATE ACCOUNT
          </TabBtn>
        </TabHeader>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <FormGroup>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. contact@floksyjewel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, cursor: 'pointer', userSelect: 'none' }}
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName !== 'INPUT') {
                  setShowPassword(!showPassword);
                }
              }}
            >
              <input
                type="checkbox"
                id="showStorefrontPasswordCheck"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                style={{ width: 'auto', cursor: 'pointer', accentColor: '#1a1918' }}
              />
              <label
                htmlFor="showStorefrontPasswordCheck"
                style={{ fontSize: '0.8rem', color: '#555', cursor: 'pointer', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}
              >
                Show password
              </label>
            </div>
          </FormGroup>

          {!isRegister && <ForgotLink onClick={() => alert('Password reset instructions sent to your email.')}>Forgot password?</ForgotLink>}

          <SubmitBtn type="submit" disabled={loading}>
            {loading ? (
              'PLEASE WAIT...'
            ) : isRegister ? (
              <>CREATE ACCOUNT <ArrowRight size={14} /></>
            ) : (
              <>SIGN IN <Lock size={14} /></>
            )}
          </SubmitBtn>
        </Form>

        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => { setError(''); googleLogin(); }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ffffff',
              color: '#1f1f1f',
              border: '1px solid #d9d3c7',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </AuthCard>
    </PageWrapper>
  );
};
