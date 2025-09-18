'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { DefaultErrorFallback } from '@/components/ui/error-boundary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-600 mb-8">
                We're sorry, but an unexpected error occurred. This has been logged and our team has been notified.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={reset}
                  className="w-full btn-primary px-6 py-3"
                >
                  Try Again
                </button>
                
                <Link href="/" className="block w-full btn-outline px-6 py-3 text-center">
                  Go Home
                </Link>
                
                <Link href="/contact" className="block w-full btn-outline px-6 py-3 text-center">
                  Contact Support
                </Link>
              </div>

              {process.env.NODE_ENV === 'development' && error && (
                <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg text-sm">
                  <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
                  <pre className="mt-2 text-red-600 whitespace-pre-wrap break-words">
                    {error.message}
                    {error.stack && '\n\nStack trace:\n' + error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}