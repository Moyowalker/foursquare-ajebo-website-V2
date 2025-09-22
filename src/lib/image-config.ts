export interface FacilityImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  category: 'accommodation' | 'conference' | 'recreation' | 'dining' | 'infrastructure';
  subcategory?: string;
  images: FacilityImage[];
  features?: string[];
  capacity?: string;
}

// Facility data with image paths ready for Google Drive downloads
export const facilities: Facility[] = [
  // ACCOMMODATION FACILITIES
  {
    id: 'international-guest-house',
    name: 'International Guest House',
    description: 'Our premium accommodation facility offering luxury comfort for distinguished guests and international visitors.',
    category: 'accommodation',
    subcategory: 'premium',
    images: [
      // Images will be added here after Google Drive download
      // Example: { src: '/images/facilities/accommodation/international-guest-house/exterior.jpg', alt: 'International Guest House Exterior' }
    ],
    features: ['Private bathrooms', 'Air conditioning', 'Conference facilities', 'Restaurant access'],
    capacity: 'Multiple rooms available'
  },
  {
    id: 'diamond-estate',
    name: 'Diamond Estate',
    description: 'Premium residential accommodation with modern amenities and beautiful landscaping.',
    category: 'accommodation',
    subcategory: 'premium',
    images: [],
    features: ['Modern facilities', 'Spacious rooms', 'Garden views', 'Security'],
    capacity: 'Family and group accommodation'
  },
  {
    id: 'gabriel-farombi-building',
    name: 'Gabriel Farombi Building',
    description: 'Named in honor of our heritage, this building provides comfortable lodging for ministry leaders and special guests.',
    category: 'accommodation',
    subcategory: 'leadership',
    images: [],
    features: ['Conference rooms', 'Office spaces', 'Meeting facilities', 'Guest rooms'],
    capacity: 'Leadership and ministry accommodation'
  },
  {
    id: 'jonathan-odega-house',
    name: 'Jonathan Odega House',
    description: 'Comfortable accommodation facility designed for ministry teams and visiting pastors.',
    category: 'accommodation',
    subcategory: 'leadership',
    images: [],
    features: ['Pastor quarters', 'Study areas', 'Prayer rooms', 'Meeting spaces'],
    capacity: 'Ministry team accommodation'
  },
  {
    id: 'odunaike-house',
    name: 'Odunaike House',
    description: 'Standard comfortable accommodation for camp participants and retreat attendees.',
    category: 'accommodation',
    subcategory: 'standard',
    images: [],
    features: ['Shared facilities', 'Dormitory style', 'Common areas', 'Basic amenities'],
    capacity: 'Group accommodation'
  },
  {
    id: 'jehovah-shammah-house',
    name: 'Jehovah Shammah House',
    description: 'A place where God\'s presence is acknowledged - comfortable lodging for spiritual retreats and conferences.',
    category: 'accommodation',
    subcategory: 'standard',
    images: [],
    features: ['Prayer areas', 'Quiet environment', 'Basic amenities', 'Spiritual atmosphere'],
    capacity: 'Retreat and conference accommodation'
  },
  {
    id: 'ruby-estate',
    name: 'Ruby Estate',
    description: 'Beautiful estate accommodation offering a peaceful environment for extended stays and family gatherings.',
    category: 'accommodation',
    subcategory: 'premium',
    images: [],
    features: ['Family facilities', 'Extended stay options', 'Kitchen facilities', 'Garden access'],
    capacity: 'Family and extended stay accommodation'
  },
  
  // CONFERENCE FACILITIES
  {
    id: 'auditorium',
    name: 'Main Auditorium',
    description: 'Our primary conference and worship venue equipped with modern audio-visual technology and comfortable seating.',
    category: 'conference',
    images: [],
    features: ['High-capacity seating', 'Modern sound system', 'Video projection', 'Stage facilities', 'Air conditioning'],
    capacity: 'Large congregation seating'
  },
  
  // RECREATION FACILITIES
  {
    id: 'sports-centre',
    name: 'Sports Centre',
    description: 'Complete sports and recreation facility for physical fitness and recreational activities.',
    category: 'recreation',
    images: [],
    features: ['Multiple sports courts', 'Equipment provided', 'Changing rooms', 'Outdoor activities'],
    capacity: 'Various sports activities'
  },
  {
    id: 'gym',
    name: 'Fitness Gym',
    description: 'Modern gymnasium equipped with fitness equipment for health and wellness activities.',
    category: 'recreation',
    images: [],
    features: ['Modern equipment', 'Personal training', 'Group fitness', 'Health programs'],
    capacity: 'Individual and group fitness'
  },
  
  // DINING FACILITIES
  {
    id: 'delish-fingers',
    name: 'Delish Fingers Restaurant',
    description: 'Our on-site restaurant serving delicious meals and refreshments for all camp visitors and residents.',
    category: 'dining',
    images: [],
    features: ['Full service restaurant', 'Local and international cuisine', 'Catering services', 'Event dining'],
    capacity: 'Restaurant and catering services'
  },
  
  // INFRASTRUCTURE
  {
    id: 'main-gate',
    name: 'Main Gate Entrance',
    description: 'The welcoming entrance to Foursquare Camp Ajebo, providing security and visitor reception.',
    category: 'infrastructure',
    images: [],
    features: ['Security checkpoint', 'Visitor registration', 'Welcome center', 'Parking coordination'],
    capacity: 'Entry and security management'
  },
  {
    id: 'mast',
    name: 'Communication Mast',
    description: 'Essential communication infrastructure ensuring connectivity throughout the camp facility.',
    category: 'infrastructure',
    images: [],
    features: ['Communication tower', 'Network coverage', 'Broadcasting capability', 'Emergency communications'],
    capacity: 'Communication infrastructure'
  }
];

// Helper functions for filtering facilities
export const getFacilitiesByCategory = (category: Facility['category']) => 
  facilities.filter(facility => facility.category === category);

export const getAccommodationBySubcategory = (subcategory: string) =>
  facilities.filter(facility => 
    facility.category === 'accommodation' && facility.subcategory === subcategory
  );

export const getFacilityById = (id: string) =>
  facilities.find(facility => facility.id === id);

// Image path generators for when images are added
export const generateImagePath = (facilityId: string, imageName: string) =>
  `/images/facilities/${getFacilityById(facilityId)?.category}/${facilityId}/${imageName}`;

export const getFacilityImages = (facilityId: string) =>
  getFacilityById(facilityId)?.images || [];
