import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Force static generation for static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const routes = [
    '',
    '/about',
    '/facilities',
    '/events',
    '/gallery',
    '/contact',
    '/giving',
    '/giving/donate',
    '/board',
    '/ministry',
    '/worship',
    '/streaming',
    '/legal',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 
             route.includes('/legal') || route.includes('/privacy') || route.includes('/terms') ? 0.3 : 0.8,
  }));

  // Add dynamic routes for events (you'll populate this from your database)
  const eventRoutes = [
    // Example event routes - replace with actual event data
    '/events/youth-camp-2024',
    '/events/family-retreat-2024',
    '/events/leadership-conference-2024',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...eventRoutes];
}