import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <div style={{ width: '100%' }}>{children}</div>;
};

export default PageTransition;
