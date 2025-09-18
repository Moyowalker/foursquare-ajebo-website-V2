import { siteConfig } from '@/lib/config';

// Generate JSON-LD structured data for the church
export function generateChurchStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer service',
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
    ],
    openingHours: [
      'Su 07:00-12:00', // Sunday service hours
      'We 18:00-20:00', // Wednesday evening service
    ],
    geo: {
      '@type': 'GeoCoordinates',
      // You'll need to add actual coordinates
      latitude: '6.6516', // Approximate coordinates for Ogun State
      longitude: '3.3584',
    },
  };
}

// Generate structured data for events
export function generateEventStructuredData(event: {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: `${event.date}T${event.time}`,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.state,
        addressCountry: siteConfig.contact.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: event.image ? `${siteConfig.url}${event.image}` : `${siteConfig.url}${siteConfig.ogImage}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'NGN',
      description: 'Free event',
    },
  };
}

// Generate structured data for accommodation/lodging
export function generateLodgingStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `${siteConfig.name} Retreat Center`,
    description: 'Faith-based retreat center offering accommodation and facilities for spiritual gatherings',
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      addressCountry: siteConfig.contact.address.country,
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Conference Halls',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Accommodation Facilities',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Dining Facilities',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Recreational Areas',
      },
    ],
    image: `${siteConfig.url}${siteConfig.ogImage}`,
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Component to inject structured data
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}