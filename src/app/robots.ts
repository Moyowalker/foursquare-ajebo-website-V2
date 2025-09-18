import { MetadataRoute } from 'next';

// Force static generation for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/member/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/member/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  };
}