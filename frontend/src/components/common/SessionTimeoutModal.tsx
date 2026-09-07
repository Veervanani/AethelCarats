import React from 'react';
import styled from 'styled-components';
import { ShieldAlert, LogOut, RefreshCw } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 11, 0.85);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  border-top: 4px solid #C9A96E;
  width: 100%;
  max-width: 460px;
  padding: 36px 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  text-align: center;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #111111;
  border: 1px solid #C9A96E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  color: #C9A96E;
`;

const Title = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.6;
  margin: 0 0 20px 0;

  strong {
    color: #C9A96E;
  }
`;

const CountdownCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #111111;
  border: 2px solid #C9A96E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #C9A96E;
  box-shadow: inset 0 2px 6px rgba(201, 169, 110, 0.15);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StayBtn = styled.button`
  flex: 1;
  padding: 13px 20px;
  background: #C9A96E;
  color: #0B0B0B;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    color: #0B0B0B;
  }
`;

const LogoutBtn = styled.button`
  padding: 13px 18px;
  background: #151515;
  color: #F5F1E8;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s ease;

  &:hover {
    border-color: #d32f2f;
    color: #d32f2f;
    background: rgba(211, 47, 47, 0.1);
  }
`;

interface SessionTimeoutModalProps {
  isOpen: boolean;
  secondsRemaining: number;
  isAdmin: boolean;
  onExtendSession: () => void;
  onLogout: () => void;
}

export const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  isOpen,
  secondsRemaining,
  isAdmin,
  onExtendSession,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalCard>
        <IconCircle>
          <ShieldAlert size={28} />
        </IconCircle>

        <Title>{isAdmin ? 'Atelier Security Notice' : 'Security Session Notice'}</Title>
        <Subtitle>
          For your security, your session will expire in <strong>{secondsRemaining} seconds</strong> due to inactivity. Would you like to stay signed in?
        </Subtitle>

        <CountdownCircle>{secondsRemaining}</CountdownCircle>

        <ButtonRow>
          <LogoutBtn onClick={onLogout}>
            <LogOut size={14} /> Log Out Now
          </LogoutBtn>
          <StayBtn onClick={onExtendSession}>
            <RefreshCw size={14} /> Stay Logged In
          </StayBtn>
        </ButtonRow>
      </ModalCard>
    </Overlay>
  );
};
