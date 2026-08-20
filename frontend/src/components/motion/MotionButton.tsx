import React from 'react';
import styled from 'styled-components';

const StyledMotionButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #1f1f1f;
  background-color: transparent;
  border: 1px solid #1f1f1f;
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  svg {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    background-color: #1f1f1f;
    color: #faf9f6;
    border-color: #1f1f1f;

    svg {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MotionButton: React.FC<MotionButtonProps> = ({ children, ...props }) => {
  return <StyledMotionButton {...props}>{children}</StyledMotionButton>;
};
