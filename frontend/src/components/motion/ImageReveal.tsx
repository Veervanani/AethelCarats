import React from 'react';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  staggerIndex?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  delay,
  className = '',
  style = {},
  staggerIndex,
}) => {
  const staggerClass = typeof staggerIndex === 'number' ? `fj-stagger-${(staggerIndex % 4) + 1}` : '';
  const combinedClassName = `fj-reveal-img ${staggerClass} ${className}`.trim();

  const customStyle: React.CSSProperties = { ...style };
  if (typeof delay === 'number' && delay > 0) {
    customStyle.transitionDelay = `${delay}s`;
  }

  return (
    <div className={combinedClassName} style={customStyle}>
      {children}
    </div>
  );
};
