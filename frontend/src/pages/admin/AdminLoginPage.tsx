import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, Mail } from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';

const LoginContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1918;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const LoginCard = styled.form`
  width: 100%;
  max-width: 440px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  text-align: center;
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.2rem;
    letter-spacing: 0.15em;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 8px;
  }
  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    font-size: 0.95rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    outline: none;
  }
`;

const LoginBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.white};
  padding: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

interface AdminLoginPageProps {
  onSuccess?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.loginAdmin({ username, email: username, password });
      localStorage.setItem('fj_admin_token', res.token);
      localStorage.setItem('fj_admin_user', JSON.stringify(res.user));
      onSuccess?.();
      navigate(`${PRIVATE_ADMIN_PATH}/cms/page-builder`);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Invalid admin credentials');
    }
  };

  return (
    <LoginContainer>
      <LoginCard onSubmit={handleLogin}>
        <Header>
          <img src="/assets/floksy-jewel-logo.png" alt="Floksy Jewel" style={{ height: 48, width: 'auto', marginBottom: 12, objectFit: 'contain' }} />
          <p>ATELIER SECURE ACCESS</p>
        </Header>

        {error && <div style={{ color: '#d32f2f', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}

        <InputGroup>
          <label>Username</label>
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Password"
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
              style={{ width: 'auto', cursor: 'pointer', accentColor: '#1a1918' }}
            />
            <label
              htmlFor="showPasswordCheck"
              style={{ fontSize: '0.8rem', color: '#555', cursor: 'pointer', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}
            >
              Show password
            </label>
          </div>
        </InputGroup>

        <LoginBtn type="submit">SIGN IN TO ATELIER</LoginBtn>
      </LoginCard>
    </LoginContainer>
  );
};
