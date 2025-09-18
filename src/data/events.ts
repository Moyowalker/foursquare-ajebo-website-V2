import { Event, EventCategory, EventType, AgeGroup, EventStatus } from '@/types/events';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Youth Camp 2025',
    description: 'Join us for an unforgettable week of spiritual growth, fellowship, and adventure! Our Summer Youth Camp offers a perfect blend of worship, teaching, outdoor activities, and life-changing encounters with God. Designed specifically for teenagers, this camp will challenge and inspire young hearts to pursue their faith with passion.',
    shortDescription: 'A week of spiritual growth, fellowship, and adventure for teenagers',
    category: 'youth-camp',
    type: 'camp',
    startDate: new Date('2025-07-15'),
    endDate: new Date('2025-07-22'),
    startTime: '09:00',
    endTime: '16:00',
    location: 'Foursquare Camp Ajebo Camp Grounds',
    venue: 'Main Camp Facility',
    capacity: 150,
    registeredCount: 89,
    price: 25000,
    currency: 'NGN',
    imageUrl: '/images/events/youth-camp-2025.jpg',
    images: [
      '/images/events/youth-camp-1.jpg',
      '/images/events/youth-camp-2.jpg',
      '/images/events/youth-camp-3.jpg'
    ],
    tags: ['youth', 'camp', 'spiritual-growth', 'fellowship', 'adventure'],
    organizer: 'Youth Ministry Team',
    contact: {
      name: 'Pastor David Adebayo',
      email: 'youth@foursquareajebo.org',
      phone: '+234-803-123-4567'
    },
    requirements: [
      'Ages 13-19',
      'Medical clearance form',
      'Signed waiver',
      'Emergency contact information'
    ],
    included: [
      'Accommodation',
      'All meals',
      'Camp materials',
      'T-shirt',
      'Certificate of participation'
    ],
    ageGroup: 'youth',
    difficulty: 'All Levels',
    status: 'upcoming',
    registrationDeadline: new Date('2025-07-01'),
    cancellationPolicy: 'Full refund if cancelled 14 days before event',
    featured: true,
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-15')
  },
  {
    id: '2',
    title: 'Family Retreat Weekend',
    description: 'Strengthen family bonds and deepen your faith together at our Family Retreat Weekend. This special event is designed for families of all sizes to connect with God and each other through worship, teaching, fun activities, and quality time in a peaceful setting.',
    shortDescription: 'A weekend for families to connect with God and each other',
    category: 'family-camp',
    type: 'retreat',
    startDate: new Date('2025-09-12'),
    endDate: new Date('2025-09-14'),
    startTime: '18:00',
    endTime: '14:00',
    location: 'Foursquare Camp Ajebo Retreat Center',
    venue: 'Family Lodge',
    capacity: 80,
    registeredCount: 34,
    price: 15000,
    currency: 'NGN',
    imageUrl: '/images/events/family-retreat.jpg',
    images: [
      '/images/events/family-1.jpg',
      '/images/events/family-2.jpg'
    ],
    tags: ['family', 'retreat', 'bonding', 'worship', 'children'],
    organizer: 'Family Ministry',
    contact: {
      name: 'Mrs. Grace Okafor',
      email: 'family@foursquareajebo.org',
      phone: '+234-805-987-6543'
    },
    requirements: [
      'Family registration required',
      'Children must be accompanied by adults',
      'Health insurance recommended'
    ],
    included: [
      'Accommodation for the family',
      'All meals',
      'Family activity kits',
      'Childcare during adult sessions'
    ],
    ageGroup: 'families',
    difficulty: 'All Levels',
    status: 'upcoming',
    registrationDeadline: new Date('2025-08-30'),
    cancellationPolicy: 'Full refund if cancelled 7 days before event',
    featured: true,
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-06-20')
  },
  {
    id: '3',
    title: 'Leadership Excellence Conference',
    description: 'Equip yourself with biblical leadership principles and practical skills at our Leadership Excellence Conference. This intensive training is designed for current and aspiring leaders in ministry, business, and community service.',
    shortDescription: 'Intensive leadership training with biblical principles',
    category: 'leadership-training',
    type: 'conference',
    startDate: new Date('2025-10-03'),
    endDate: new Date('2025-10-05'),
    startTime: '08:00',
    endTime: '17:00',
    location: 'Foursquare Camp Ajebo Conference Hall',
    venue: 'Main Conference Center',
    capacity: 200,
    registeredCount: 156,
    price: 35000,
    currency: 'NGN',
    imageUrl: '/images/events/leadership-conference.jpg',
    images: [
      '/images/events/leadership-1.jpg',
      '/images/events/leadership-2.jpg',
      '/images/events/leadership-3.jpg'
    ],
    tags: ['leadership', 'training', 'ministry', 'conference', 'skills'],
    organizer: 'Leadership Development Team',
    contact: {
      name: 'Pastor Emmanuel Adebayo',
      email: 'leadership@foursquareajebo.org',
      phone: '+234-802-456-7890'
    },
    requirements: [
      'Ministry experience preferred',
      'Letter of recommendation',
      'Commitment to complete program'
    ],
    included: [
      'Training materials',
      'Lunch and refreshments',
      'Certificate of completion',
      'Networking opportunities'
    ],
    ageGroup: 'adults',
    difficulty: 'Intermediate',
    status: 'upcoming',
    registrationDeadline: new Date('2025-09-20'),
    cancellationPolicy: 'Partial refund available up to 5 days before event',
    featured: true,
    createdAt: new Date('2025-07-01'),
    updatedAt: new Date('2025-07-15')
  },
  {
    id: '4',
    title: 'Prayer & Worship Night',
    description: 'Join us for a powerful evening of prayer, worship, and seeking God\'s presence. This monthly gathering brings our community together for corporate prayer, praise, and spiritual renewal.',
    shortDescription: 'Monthly gathering for prayer, worship, and spiritual renewal',
    category: 'prayer-meeting',
    type: 'service',
    startDate: new Date('2025-08-30'),
    endDate: new Date('2025-08-30'),
    startTime: '19:00',
    endTime: '21:00',
    location: 'Foursquare Camp Ajebo Main Sanctuary',
    venue: 'Main Sanctuary',
    capacity: 300,
    registeredCount: 0,
    price: 0,
    currency: 'NGN',
    imageUrl: '/images/events/prayer-night.jpg',
    images: [
      '/images/events/prayer-1.jpg',
      '/images/events/worship-1.jpg'
    ],
    tags: ['prayer', 'worship', 'community', 'spiritual', 'monthly'],
    organizer: 'Prayer Ministry',
    contact: {
      name: 'Pastor Sarah Okonkwo',
      email: 'prayer@foursquareajebo.org',
      phone: '+234-804-321-0987'
    },
    requirements: [
      'Open to all ages',
      'No registration required'
    ],
    included: [
      'Prayer guide',
      'Light refreshments'
    ],
    ageGroup: 'all-ages',
    difficulty: 'All Levels',
    status: 'upcoming',
    registrationDeadline: new Date('2025-08-30'),
    cancellationPolicy: 'Free event - no cancellation needed',
    featured: false,
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '5',
    title: 'Bible Study Intensive',
    description: 'Deepen your understanding of Scripture through our intensive Bible study program. This four-week series focuses on practical application of biblical principles in daily life.',
    shortDescription: 'Four-week intensive Bible study with practical applications',
    category: 'bible-study',
    type: 'workshop',
    startDate: new Date('2025-09-05'),
    endDate: new Date('2025-09-26'),
    startTime: '18:30',
    endTime: '20:00',
    location: 'Foursquare Camp Ajebo Study Center',
    venue: 'Bible Study Room',
    capacity: 50,
    registeredCount: 23,
    price: 5000,
    currency: 'NGN',
    imageUrl: '/images/events/bible-study.jpg',
    images: [
      '/images/events/study-1.jpg',
      '/images/events/study-2.jpg'
    ],
    tags: ['bible-study', 'scripture', 'learning', 'weekly', 'growth'],
    organizer: 'Teaching Ministry',
    contact: {
      name: 'Pastor Michael Akinola',
      email: 'teaching@foursquareajebo.org',
      phone: '+234-806-654-3210'
    },
    requirements: [
      'Bible required',
      'Notebook for notes',
      'Commitment to attend all sessions'
    ],
    included: [
      'Study materials',
      'Workbook',
      'Certificate upon completion'
    ],
    ageGroup: 'adults',
    difficulty: 'Intermediate',
    status: 'upcoming',
    registrationDeadline: new Date('2025-09-01'),
    cancellationPolicy: 'Refund available if cancelled before start date',
    featured: false,
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2025-08-20')
  },
  {
    id: '6',
    title: 'Community Outreach Day',
    description: 'Make a difference in our local community! Join us for a day of service, compassion, and showing God\'s love through practical acts of kindness and community support.',
    shortDescription: 'Day of community service and outreach activities',
    category: 'community-outreach',
    type: 'outreach',
    startDate: new Date('2025-11-16'),
    endDate: new Date('2025-11-16'),
    startTime: '08:00',
    endTime: '16:00',
    location: 'Various Community Locations',
    venue: 'Multiple Venues',
    capacity: 100,
    registeredCount: 45,
    price: 0,
    currency: 'NGN',
    imageUrl: '/images/events/outreach-day.jpg',
    images: [
      '/images/events/outreach-1.jpg',
      '/images/events/community-1.jpg'
    ],
    tags: ['outreach', 'community', 'service', 'compassion', 'volunteering'],
    organizer: 'Outreach Ministry',
    contact: {
      name: 'Deacon James Okoro',
      email: 'outreach@foursquareajebo.org',
      phone: '+234-807-789-0123'
    },
    requirements: [
      'Comfortable clothing',
      'Willingness to serve',
      'Transportation may be provided'
    ],
    included: [
      'T-shirt',
      'Lunch',
      'Transportation to venues',
      'Service project materials'
    ],
    ageGroup: 'all-ages',
    difficulty: 'All Levels',
    status: 'upcoming',
    registrationDeadline: new Date('2025-11-10'),
    cancellationPolicy: 'Free event - cancellation appreciated for planning',
    featured: false,
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-08-25')
  }
];

export const eventCategories = [
  { value: 'spiritual-retreat', label: 'Spiritual Retreat', color: '#8b5cf6' },
  { value: 'youth-camp', label: 'Youth Camp', color: '#f59e0b' },
  { value: 'family-camp', label: 'Family Camp', color: '#10b981' },
  { value: 'leadership-training', label: 'Leadership Training', color: '#1e40af' },
  { value: 'worship-service', label: 'Worship Service', color: '#b91c1c' },
  { value: 'bible-study', label: 'Bible Study', color: '#059669' },
  { value: 'prayer-meeting', label: 'Prayer Meeting', color: '#7c3aed' },
  { value: 'community-outreach', label: 'Community Outreach', color: '#dc2626' },
  { value: 'conference', label: 'Conference', color: '#1d4ed8' },
  { value: 'special-event', label: 'Special Event', color: '#9333ea' }
];

export const eventTypes = [
  { value: 'camp', label: 'Camp' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'service', label: 'Service' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'outreach', label: 'Outreach' }
];

export const ageGroups = [
  { value: 'children', label: 'Children (0-12)' },
  { value: 'youth', label: 'Youth (13-19)' },
  { value: 'young-adults', label: 'Young Adults (20-35)' },
  { value: 'adults', label: 'Adults (36+)' },
  { value: 'seniors', label: 'Seniors (65+)' },
  { value: 'families', label: 'Families' },
  { value: 'all-ages', label: 'All Ages' }
];

// Helper functions
export function getEventsByCategory(category: EventCategory): Event[] {
  return mockEvents.filter(event => event.category === category);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const upcoming = mockEvents
    .filter(event => event.status === 'upcoming' && event.startDate > new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getFeaturedEvents(): Event[] {
  return mockEvents.filter(event => event.featured && event.status === 'upcoming');
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find(event => event.id === id);
}

export function formatPrice(price: number, currency: string = 'NGN'): string {
  if (price === 0) return 'Free';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(startDate);
  const end = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(endDate);
  
  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate);
  }
  
  return `${start} - ${end}`;
}
