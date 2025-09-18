import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { seoDefaults } from '@/lib/config';
import { cn } from '@/lib/utils';
import { SpectacularNavigation } from '@/components/layout/navigation';
import { GoogleAnalytics } from '@/components/seo/analytics';
import { StructuredData, generateChurchStructuredData } from '@/components/seo/structured-data';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: seoDefaults.title,
    template: `%s | ${seoDefaults.title}`,
  },
  description: seoDefaults.description,
  keywords: seoDefaults.keywords,
  authors: seoDefaults.authors,
  creator: seoDefaults.creator,
  openGraph: seoDefaults.openGraph,
  twitter: seoDefaults.twitter,
  metadataBase: new URL(seoDefaults.openGraph.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#3b82f6',
    'theme-color': '#3b82f6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const churchStructuredData = generateChurchStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={churchStructuredData} />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={cn(inter.className, 'antialiased')}>
        <ErrorBoundary>
          <div className="relative flex min-h-screen flex-col">
            <ErrorBoundary>
              <SpectacularNavigation />
            </ErrorBoundary>
            <div className="flex-1">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </div>
          </div>
        </ErrorBoundary>
        
        {/* Analytics - only in production */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
