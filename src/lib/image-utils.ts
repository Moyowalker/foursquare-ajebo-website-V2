// Image placeholder generator for missing images

export interface PlaceholderConfig {
  width: number;
  height: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

// Generate SVG placeholder
export function generatePlaceholder({
  width,
  height,
  text = 'Image',
  backgroundColor = '#f3f4f6',
  textColor = '#6b7280',
  fontSize = 16
}: PlaceholderConfig): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="${fontSize}" 
            fill="${textColor}" text-anchor="middle" dominant-baseline="central">
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Pre-generated common placeholders
export const placeholders = {
  boardMember: generatePlaceholder({
    width: 200,
    height: 200,
    text: 'Board Member',
    backgroundColor: '#e5e7eb',
    textColor: '#6b7280'
  }),
  
  event: generatePlaceholder({
    width: 400,
    height: 300,
    text: 'Event Image',
    backgroundColor: '#ddd6fe',
    textColor: '#7c3aed'
  }),
  
  blog: generatePlaceholder({
    width: 800,
    height: 400,
    text: 'Blog Post',
    backgroundColor: '#fef3c7',
    textColor: '#d97706'
  }),
  
  gallery: generatePlaceholder({
    width: 300,
    height: 300,
    text: 'Gallery',
    backgroundColor: '#dcfce7',
    textColor: '#16a34a'
  }),
  
  hero: generatePlaceholder({
    width: 1920,
    height: 1080,
    text: 'Hero Image',
    backgroundColor: '#bfdbfe',
    textColor: '#1d4ed8',
    fontSize: 48
  }),
  
  avatar: generatePlaceholder({
    width: 128,
    height: 128,
    text: '👤',
    backgroundColor: '#f9fafb',
    textColor: '#374151',
    fontSize: 32
  })
};

// Generate church-specific placeholders
export const churchPlaceholders = {
  sanctuary: generatePlaceholder({
    width: 800,
    height: 600,
    text: '⛪ Sanctuary',
    backgroundColor: '#ede9fe',
    textColor: '#7c3aed',
    fontSize: 24
  }),
  
  conference: generatePlaceholder({
    width: 600,
    height: 400,
    text: '🏛️ Conference Hall',
    backgroundColor: '#f0f9ff',
    textColor: '#0284c7',
    fontSize: 20
  }),
  
  accommodation: generatePlaceholder({
    width: 500,
    height: 400,
    text: '🏨 Accommodation',
    backgroundColor: '#f0fdf4',
    textColor: '#15803d',
    fontSize: 18
  }),
  
  grounds: generatePlaceholder({
    width: 700,
    height: 500,
    text: '🌿 Church Grounds',
    backgroundColor: '#ecfdf5',
    textColor: '#059669',
    fontSize: 22
  })
};

// Image optimization utilities
export const imageUtils = {
  // Get optimal sizes string for responsive images
  getResponsiveSizes: (breakpoints: { [key: string]: string }): string => {
    return Object.entries(breakpoints)
      .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
      .join(', ');
  },
  
  // Common responsive sizes presets
  responsivePresets: {
    hero: '100vw',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    avatar: '(max-width: 768px) 64px, 80px',
    gallery: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
    blog: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
  },
  
  // Generate WebP fallback for older browsers
  getImageWithFallback: (src: string): { webp: string; fallback: string } => {
    const isExternal = src.startsWith('http');
    if (isExternal) {
      return { webp: src, fallback: src };
    }
    
    const extension = src.split('.').pop();
    const basePath = src.replace(`.${extension}`, '');
    
    return {
      webp: `${basePath}.webp`,
      fallback: src
    };
  },
  
  // Generate blur data URL from color
  generateBlurDataURL: (color = '#f3f4f6'): string => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
      </svg>
    `)}`;
  }
};

// Church image categories for better organization
export const churchImageCategories = {
  facilities: [
    'sanctuary',
    'conference-hall',
    'accommodation',
    'kitchen',
    'library',
    'playground'
  ],
  
  activities: [
    'worship-service',
    'youth-program',
    'bible-study',
    'community-outreach',
    'fellowship',
    'prayer-meeting'
  ],
  
  events: [
    'summer-camp',
    'retreat',
    'conference',
    'baptism',
    'wedding',
    'graduation'
  ],
  
  nature: [
    'gardens',
    'lake-view',
    'mountains',
    'walking-paths',
    'outdoor-pavilion'
  ]
};

export default {
  generatePlaceholder,
  placeholders,
  churchPlaceholders,
  imageUtils,
  churchImageCategories
};