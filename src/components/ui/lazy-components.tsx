import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Loading skeleton components
export function ComponentSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-slate-700 rounded-lg h-40 w-full"></div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="bg-slate-700 h-4 rounded w-3/4 mb-4"></div>
      <div className="bg-slate-700 h-3 rounded w-1/2 mb-2"></div>
      <div className="bg-slate-700 h-3 rounded w-2/3"></div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="bg-slate-700 h-16 rounded w-96 mx-auto mb-6"></div>
        <div className="bg-slate-700 h-6 rounded w-64 mx-auto mb-4"></div>
        <div className="bg-slate-700 h-6 rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}

// Lazy loaded components
export const LazyStreamingDashboard = dynamic(
  () => import('@/components/streaming/StreamingDashboard'),
  {
    ssr: false,
    loading: () => <ComponentSkeleton className="h-96" />
  }
);

export const LazyEventCalendar = dynamic(
  () => import('@/components/events/EventCalendar'),
  {
    ssr: false,
    loading: () => <ComponentSkeleton className="h-80" />
  }
);

export const LazyAdvancedAnalytics = dynamic(
  () => import('@/components/ministry/AdvancedAnalyticsDashboard'),
  {
    ssr: false,
    loading: () => <ComponentSkeleton className="h-96" />
  }
);

// Error boundary for lazy components
export class LazyComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-slate-800 border border-red-500/50 rounded-lg p-6 text-center">
          <p className="text-red-400">Something went wrong loading this component.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-blue-400 hover:text-blue-300"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper for lazy components
export function LazyWrapper({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  return (
    <LazyComponentErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        {children}
      </Suspense>
    </LazyComponentErrorBoundary>
  );
}