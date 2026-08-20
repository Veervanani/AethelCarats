import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageCircle } from 'lucide-react';
import { api } from '../../services/api';

const FloatingBtn = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #1F1F1F;
  color: #C9A45C;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #C9A45C;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(31, 31, 31, 0.25);
  z-index: 10001;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.05);
    background-color: #0F1317;
    color: #FFFDF9;
    border-color: #FFFDF9;
    box-shadow: 0 12px 28px rgba(31, 31, 31, 0.35);
  }

  @media (max-width: 768px) {
    bottom: max(85px, calc(80px + env(safe-area-inset-bottom)));
    right: 16px;
    width: 44px;
    height: 44px;
  }
`;

export const WhatsAppFloatingButton: React.FC<{ message?: string }> = ({
  message = 'Hello Floksy Jewel, I have an inquiry regarding fine jewellery and diamonds.',
}) => {
  const [waNumber, setWaNumber] = useState('447900123456');

  useEffect(() => {
    api.getSiteSettings().then((settings) => {
      if (settings && settings.whatsappNumber) {
        const clean = settings.whatsappNumber.replace(/[^\d]/g, '');
        if (clean) setWaNumber(clean);
      }
    }).catch(console.error);
  }, []);

  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${waNumber}?text=${encoded}`;

  return (
    <FloatingBtn href={href} target="_blank" rel="noopener noreferrer" title="WhatsApp Concierge">
      <MessageCircle size={28} />
    </FloatingBtn>
  );
};
