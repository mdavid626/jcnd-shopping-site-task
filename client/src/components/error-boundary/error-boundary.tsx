import React, { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.css';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <div className="ErrorBoundary-title">Simple Shopping Site</div>
          <div className="ErrorBoundary-description">Oops, that's an error</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
