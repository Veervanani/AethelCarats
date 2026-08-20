import React from 'react';
import styled from 'styled-components';
import { ShieldAlert, LogOut, RefreshCw } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 17, 16, 0.75);
  backdrop-filter: blur(6px);
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
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-top: 4px solid #c9a45c;
  width: 100%;
  max-width: 460px;
  padding: 36px 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  text-align: center;
  position: relative;
  border-radius: 4px;
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
  background: #faf5eb;
  border: 1px solid #c9a45c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  color: #c9a45c;
`;

const Title = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin: 0 0 10px 0;
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: 0.88rem;
  color: #666666;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const CountdownCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #faf5eb;
  border: 2px solid #c9a45c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1f1f1f;
  box-shadow: inset 0 2px 6px rgba(201, 164, 92, 0.15);
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
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const LogoutBtn = styled.button`
  padding: 13px 18px;
  background: #ffffff;
  color: #666666;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid #d9d3c7;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s ease;

  &:hover {
    border-color: #d32f2f;
    color: #d32f2f;
    background: #fdf2f2;
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
