/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable API routes and server functions
  trailingSlash: true,
  
  // Disable ESLint during build for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization configuration
  images: {
    // Enable optimization for server deployment
    unoptimized: false,
    
    // Allowed domains for external images
    domains: [
      'foursquareajebo.org',
      'www.foursquareajebo.org',
      'images.unsplash.com',
      'source.unsplash.com'
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
  
  // Webpack configuration for better optimization
  webpack: (config, { isServer }) => {
    // Optimize for performance
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
  
  // Compress output
  compress: true,
};

export default nextConfig;
