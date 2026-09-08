import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../../services/api';

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(37, 211, 102, 0), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const FloatingBtn = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #25D366;
  color: #ffffff;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  z-index: 10001;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  animation: ${pulseGlow} 2.5s infinite;

  &:hover {
    transform: scale(1.1);
    background-color: #20ba59;
    box-shadow: 0 12px 32px rgba(37, 211, 102, 0.45);
    color: #ffffff;
  }

  @media (max-width: 768px) {
    bottom: max(85px, calc(80px + env(safe-area-inset-bottom)));
    right: 16px;
    width: 48px;
    height: 48px;
  }
`;

const WhatsAppSvg: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.031 0C5.397 0 .025 5.372.025 12.006c0 2.12.552 4.186 1.6 6.007L.004 24l6.155-1.615a11.968 11.968 0 005.872 1.528h.005c6.634 0 12.006-5.372 12.006-12.007C24.042 5.372 18.665 0 12.031 0zm0 21.963h-.004c-1.796 0-3.559-.484-5.1-1.399l-.366-.217-3.791.995 1.012-3.696-.238-.379a9.957 9.957 0 01-1.529-5.261c0-5.508 4.481-9.988 9.992-9.988 2.668 0 5.176 1.04 7.062 2.927a9.927 9.927 0 012.925 7.062c0 5.509-4.481 9.989-9.961 9.989zm5.474-7.472c-.3-.15-1.776-.876-2.052-.976-.275-.1-.475-.15-.675.15s-.776.976-.951 1.176c-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.227-.244-.585-.492-.505-.675-.515-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.502s1.075 2.898 1.225 3.1c.15.2 2.116 3.23 5.127 4.53 3.01 1.3 3.01.867 3.56.817.55-.05 1.776-.726 2.026-1.427.25-.7.25-1.301.175-1.427-.075-.125-.275-.2-.575-.35z" />
  </svg>
);

export const WhatsAppFloatingButton: React.FC<{ message?: string }> = ({
  message = 'Hello AethelCarats Atelier, I have an inquiry regarding fine jewellery and certified diamonds.',
}) => {
  const [waNumber, setWaNumber] = useState('917990278892');

  useEffect(() => {
    api.getSiteSettings().then((settings) => {
      if (settings) {
        const rawNum = settings.whatsappNumber || settings.whatsapp || settings.contactPhone || '917990278892';
        const clean = rawNum.replace(/[^\d]/g, '');
        if (clean) setWaNumber(clean);
      }
    }).catch(console.error);
  }, []);

  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${waNumber}?text=${encoded}`;

  return (
    <FloatingBtn
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with Atelier Concierge on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppSvg size={30} />
    </FloatingBtn>
  );
};
