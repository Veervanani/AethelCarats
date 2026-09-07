import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorWrapper = styled.div`
  max-width: 600px;
  margin: 80px auto;
  padding: 48px 32px;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);

  .icon {
    color: #C9A96E;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #D8D2C5;
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: #C9A96E;
    color: #0B0B0B;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background-color: #DFBA73;
      color: #0B0B0B;
    }
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error trapped by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <AlertTriangle size={48} className="icon" />
          <h2>AN ATELIER EXCEPTION OCCURRED</h2>
          <p>
            We encountered an unexpected issue displaying this section. Please click below to refresh the page.
          </p>
          <button className="btn" onClick={() => window.location.reload()}>
            <RefreshCw size={16} /> REFRESH ATELIER
          </button>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}
