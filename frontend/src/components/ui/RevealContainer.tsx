import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  scaleInitial?: number;
  className?: string;
  style?: React.CSSProperties;
  staggerIndex?: number;
  isImage?: boolean;
}

export const RevealContainer: React.FC<RevealProps> = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default RevealContainer;
