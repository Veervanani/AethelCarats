import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  @media (pointer: fine) {
    html {
      scroll-behavior: smooth;
    }
  }

  html, body {
    width: 100%;
    overflow-x: hidden;
    position: relative;
    min-height: 100vh;
    -webkit-overflow-scrolling: touch;
  }

  #root {
    width: 100%;
    position: relative;
    min-height: 100vh;
  }

  input, select, textarea, button, img, video, canvas, svg {
    max-width: 100%;
    font-family: inherit;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fonts.body};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 500;
    line-height: 1.25;
    color: ${theme.colors.textPrimary};
    letter-spacing: 0.02em;
    overflow-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.fast};

    &:focus-visible {
      outline: 2px solid ${theme.colors.gold};
      outline-offset: 3px;
      border-radius: 2px;
    }
  }

  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      outline: 2px solid ${theme.colors.gold};
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  input, select, textarea {
    &:focus-visible {
      outline: 2px solid ${theme.colors.gold};
      outline-offset: 1px;
    }
  }

  img, video {
    height: auto;
    display: block;
    object-fit: cover;
    content-visibility: auto;
  }

  svg {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  ::selection {
    background: ${theme.colors.gold};
    color: ${theme.colors.white};
  }

  /* Keyframe Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes fjMarqueeScroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(201, 164, 92, 0.4);
    }
    50% {
      box-shadow: 0 0 0 12px rgba(201, 164, 92, 0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Utility Classes for Micro-Interactions */
  .fade-in-up {
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .shimmer-bg {
    background: linear-gradient(90deg, #f2ede4 25%, #faf8f5 50%, #f2ede4 75%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
  }

  /* Custom luxury scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gold};
  }

  /* GPU-Accelerated 10/10 Scroll Reveal & Stagger Animation Tokens */
  .fj-reveal {
    opacity: 0;
    transform: translate3d(0, 35px, 0);
    transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }

  .fj-reveal-img {
    opacity: 0;
    transform: translate3d(0, 25px, 0) scale(1.015);
    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }

  .fj-reveal.fj-reveal-active, .fj-reveal-img.fj-reveal-active {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  .fj-stagger-1 { transition-delay: 0.08s; }
  .fj-stagger-2 { transition-delay: 0.16s; }
  .fj-stagger-3 { transition-delay: 0.24s; }
  .fj-stagger-4 { transition-delay: 0.32s; }

  /* Respect User Motion Preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .fj-reveal, .fj-reveal-img {
      opacity: 1 !important;
      transform: none !important;
    }
  }

  /* Sticky Layout Fix: Prevent overflow rules on html, body, #root from breaking position: sticky */
  html, body, #root {
    overflow: visible !important;
    overflow-x: visible !important;
  }
`;

