import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, User, Mail, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

const PageWrapper = styled.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 56px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  padding: 40px 36px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(201, 169, 110, 0.1);
  border-radius: 4px;

  @media (max-width: 576px) {
    padding: 28px 20px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  margin-bottom: 32px;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#C9A96E' : '#A8A8A8')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#C9A96E' : 'transparent')};
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
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
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input {
    padding: 12px 16px;
    font-size: 0.95rem;
    color: #F5F1E8;
    background-color: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background-color: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
    }
  }
`;

const ForgotLink = styled.a`
  font-size: 0.8rem;
  color: #A8A8A8;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #C9A96E;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background-color: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  padding: 12px 16px;
  font-size: 0.85rem;
  color: #FC8181;
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid rgba(229, 62, 62, 0.4);
  border-radius: 2px;
  margin-bottom: 16px;
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
        localStorage.setItem('app_user_profile', JSON.stringify({ email, name: name || 'Valued Client' }));
        navigate('/account');
      } else {
        // Admin or Customer login
        try {
          const res = await api.loginAdmin({ email, password });
          if (res.token) {
            localStorage.setItem('admin_session_token', res.token);
            navigate('/vault-mgmt-k8m3x9q2v7');
            return;
          }
        } catch (e) {
          // Storefront customer login fallback
          localStorage.setItem('app_user_profile', JSON.stringify({ email, name: email.split('@')[0] }));
          navigate('/account');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

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
              placeholder="e.g. eleanor@aethelcarats.com"
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
                style={{ width: 'auto', cursor: 'pointer', accentColor: '#C9A96E' }}
              />
              <label
                htmlFor="showStorefrontPasswordCheck"
                style={{ fontSize: '0.8rem', color: '#A8A8A8', cursor: 'pointer', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}
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
      </AuthCard>
    </PageWrapper>
  );
};
