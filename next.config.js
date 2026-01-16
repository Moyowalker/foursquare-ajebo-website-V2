/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable API routes and server functions
  trailingSlash: true,
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization configuration
  images: {
    // Disable optimization for Netlify compatibility (free tier doesn't support image optimization)
    unoptimized: true,
    
    // Use remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foursquareajebo.org',
      },
      {
        protocol: 'https',
        hostname: 'www.foursquareajebo.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Add empty turbopack config to silence migration warning
  turbopack: {},
  
  // Compress output
  compress: true,
};

export default nextConfig;
