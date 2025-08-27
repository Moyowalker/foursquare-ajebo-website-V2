// Site Configuration
export const siteConfig = {
  name: 'Foursquare Ajebo',
  description: 'A faith-based church camp and retreat center providing spiritual and recreational facilities for conventions, retreats, and community programs.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  
  // Contact Information
  contact: {
    phone: '+234 XXX XXX XXXX',
    email: 'info@foursquareajebo.org',
    address: {
      street: 'Foursquare Camp Ground',
      city: 'Ajebo',
      state: 'Nigeria',
      country: 'Nigeria',
    },
  },
  
  // Social Media Links
  social: {
    facebook: 'https://facebook.com/foursquareajebo',
    instagram: 'https://instagram.com/foursquareajebo',
    twitter: 'https://twitter.com/foursquareajebo',
    youtube: 'https://youtube.com/@foursquareajebo',
  },
  
  // Navigation
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Facilities',
      href: '/facilities',
    },
    {
      title: 'Events',
      href: '/events',
    },
    {
      title: 'Gallery',
      href: '/gallery',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  
  // Features
  features: {
    enableBooking: true,
    enableDonations: false, // Will be enabled later
    enableMemberPortal: false, // Will be enabled later
    enableLiveStreaming: false, // Will be enabled later
  },
} as const;

// SEO Constants
export const seoDefaults = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'foursquare church',
    'church camp',
    'retreat center',
    'ajebo',
    'spiritual retreat',
    'church convention',
    'accommodation',
    'faith-based',
    'nigeria church',
  ].join(', '),
  authors: [{ name: 'Foursquare Ajebo' }],
  creator: 'Foursquare Ajebo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@foursquareajebo',
  },
};
