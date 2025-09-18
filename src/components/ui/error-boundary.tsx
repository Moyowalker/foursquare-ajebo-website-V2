'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

export function DefaultErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        {error && process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-100 p-4 rounded-lg mb-4 text-sm">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-2 text-red-600 whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn-primary px-6 py-3"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export function ContactFormErrorFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">📧</div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Message Could Not Be Sent
      </h3>
      <p className="text-red-700 mb-4">
        There was an issue sending your message. Please try again or contact us directly.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
        <a href="tel:+234-xxx-xxx-xxxx" className="btn-outline">
          Call Us Instead
        </a>
      </div>
    </div>
  );
}

export function DonationErrorFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">💳</div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Payment Processing Error
      </h3>
      <p className="text-red-700 mb-4">
        We couldn't process your donation at this time. Your card was not charged.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
        <a href="/contact" className="btn-outline">
          Contact Support
        </a>
      </div>
    </div>
  );
}