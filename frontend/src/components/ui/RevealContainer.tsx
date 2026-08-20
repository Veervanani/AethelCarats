import React from 'react';
import { motion } from 'framer-motion';

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
  delay = 0,
  yOffset = 35,
  duration = 0.85,
  scaleInitial = 1,
  className = '',
  style = {},
  staggerIndex,
  isImage = false,
}) => {
  const calculatedDelay = typeof staggerIndex === 'number' ? (staggerIndex % 4) * 0.1 : delay;
  const initialScale = isImage ? 0.98 : scaleInitial;
  const initialY = isImage ? 25 : yOffset;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, scale: initialScale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.1 }}
      transition={{
        duration: duration,
        delay: calculatedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ willChange: 'opacity, transform', ...style }}
    >
      {children}
    </motion.div>
  );
};
