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

  /* =========================================================================
     GLOBAL NO-ANIMATION ENFORCEMENT SITE-WIDE
     ========================================================================= */
  *, *::before, *::after {
    animation: none !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition: none !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }

  /* Force immediate full visibility on all content */
  .fj-reveal, .fj-reveal-img, .fj-reveal.fj-reveal-active, .fj-reveal-img.fj-reveal-active {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }

  .fade-in-up, .shimmer-bg {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* Standard cross-browser scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: #C9A96E transparent;
  }

  /* Custom luxury scrollbar - clearly visible in both Admin and Storefront */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #C9A96E;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #DFCA9B;
  }

  ::-webkit-scrollbar-thumb:active {
    background: #B38E4F;
  }

  /* Sticky Layout Fix: Prevent overflow rules on html, body, #root from breaking position: sticky */
  html, body, #root {
    overflow: visible !important;
    overflow-x: visible !important;
  }
`;

