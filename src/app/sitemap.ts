import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllNavLinks } from '@/lib/navigation';

// Force static generation for static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Get all navigation links from our navigation config
  const navLinks = getAllNavLinks();
  
  // Main navigation pages from our config
  const mainRoutes = navLinks.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' as const : 'weekly' as const,
    priority: route === '/' ? 1 : 
             route.includes('/about') && route !== '/about' ? 0.7 :
             route.includes('/services') && route !== '/services' ? 0.7 :
             route.includes('/leadership') && route !== '/leadership' ? 0.7 :
             route.includes('/facilities') && route !== '/facilities' ? 0.7 :
             ['/', '/about', '/services', '/leadership', '/facilities', '/contact'].includes(route) ? 0.9 : 0.8,
  }));

  // Additional pages not in main navigation
  const additionalRoutes = [
    '/blog',
    '/gallery',
    '/giving/thank-you',
    '/member/dashboard',
    '/member/directory',
    '/member/documents',
    '/member/events',
    '/member/giving',
    '/member/prayer-requests',
    '/member/profile',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/verify-email',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.includes('/member') ? 0.5 : 
             route.includes('/auth') ? 0.4 : 0.6,
  }));

  // Legal and utility pages
  const utilityRoutes = [
    '/legal',
    '/privacy', 
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }));

  // Dynamic event routes (you can populate this from your database)
  const eventRoutes = [
    '/events/youth-camp-2025',
    '/events/family-retreat-2025', 
    '/events/leadership-conference-2025',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic blog routes (you can populate this from your database)
  const blogRoutes = [
    '/blog/summer-camp-2025-announcement',
    '/blog/testimony-healing-miracle',
    '/blog/family-retreat-recap',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...mainRoutes, ...additionalRoutes, ...utilityRoutes, ...eventRoutes, ...blogRoutes];
}