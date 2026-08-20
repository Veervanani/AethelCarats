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
  background: #ffffff;
  border: 1px solid #d9d3c7;
  text-align: center;
  box-shadow: 0 12px 36px rgba(31, 31, 31, 0.08);

  .icon {
    color: #c9a45c;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: #1f1f1f;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background-color: #b8944d;
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
