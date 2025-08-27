import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { seoDefaults } from '@/lib/config';
import { cn } from '@/lib/utils';

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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
