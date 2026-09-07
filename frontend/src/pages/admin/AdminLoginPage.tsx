import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';

const LoginContainer = styled.div`
  min-height: 100vh;
  background-color: #0B0B0B;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const LoginCard = styled.form`
  width: 100%;
  max-width: 460px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  border-radius: 4px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(201, 169, 110, 0.12);
  display: flex;
  flex-direction: column;
  gap: 22px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 32px 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;

  .crest {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #1f1f1f 0%, #111111 100%);
    border: 1px solid #C9A96E;
    border-radius: 50%;
    margin-bottom: 14px;
    color: #C9A96E;
    box-shadow: 0 4px 16px rgba(201, 169, 110, 0.25);
  }

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin: 0 0 6px 0;
    font-weight: 500;
  }

  p {
    font-size: 0.74rem;
    color: #C9A96E;
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  .divider {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #C9A96E 50%, transparent 100%);
    margin: 14px auto 0;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input {
    width: 100%;
    padding: 13px 16px;
    font-size: 0.92rem;
    background-color: #111111;
    color: #F5F1E8;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
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
`;

const LoginBtn = styled.button`
  background-color: #C9A96E;
  color: #0B0B0B;
  padding: 16px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 20px rgba(201, 169, 110, 0.35);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMsg = styled.div`
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid rgba(229, 62, 62, 0.4);
  color: #FC8181;
  padding: 10px 14px;
  font-size: 0.82rem;
  border-radius: 2px;
  text-align: center;
`;

interface AdminLoginPageProps {
  onSuccess?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.loginAdmin({ username, email: username, password });
      localStorage.setItem('admin_session_token', res.token);
      localStorage.setItem('admin_profile', JSON.stringify(res.user));
      onSuccess?.();
      navigate(`${PRIVATE_ADMIN_PATH}/cms/page-builder`);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard onSubmit={handleLogin}>
        <Header>
          <div className="crest">
            <Sparkles size={22} />
          </div>
          <h1>AETHELCARATS</h1>
          <p>ATELIER SECURE ACCESS</p>
          <div className="divider" />
        </Header>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <InputGroup>
          <label>Username / Email</label>
          <input
            type="text"
            required
            placeholder="admin@aethelcarats.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </InputGroup>

        <InputGroup>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, cursor: 'pointer', userSelect: 'none' }}
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName !== 'INPUT') {
                setShowPassword(!showPassword);
              }
            }}
          >
            <input
              type="checkbox"
              id="showPasswordCheck"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer', accentColor: '#C9A96E' }}
            />
            <label
              htmlFor="showPasswordCheck"
              style={{ fontSize: '0.8rem', color: '#A8A8A8', cursor: 'pointer', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}
            >
              Show password
            </label>
          </div>
        </InputGroup>

        <LoginBtn type="submit" disabled={loading}>
          {loading ? 'AUTHENTICATING...' : <>SIGN IN TO ATELIER <Lock size={15} /></>}
        </LoginBtn>
      </LoginCard>
    </LoginContainer>
  );
};
