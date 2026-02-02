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
  commerciallyAvailable?: boolean;
  startingRate?: number;
  maxGuests?: number;
  roomType?: string;
  availabilityNote?: string;
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
    commerciallyAvailable: true,
    startingRate: 45000,
    maxGuests: 2,
    roomType: 'Executive Suite',
    availabilityNote: 'Limited rooms available weekly',
    images: [
      { 
        src: '/images/facilities/real/international-guest-house.jpeg.jpg', 
        alt: 'International Guest House - Premium Accommodation',
        caption: 'Luxury accommodation for distinguished guests'
      },
      { 
        src: '/images/facilities/real/accommodation/international-guest-house.jpg', 
        alt: 'International Guest House Interior',
        caption: 'Comfortable and modern interior facilities'
      }
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
    commerciallyAvailable: true,
    startingRate: 35000,
    maxGuests: 4,
    roomType: 'Family Suite',
    availabilityNote: 'Best for families and small teams',
    images: [
      { 
        src: '/images/facilities/real/modern-guest-rooms.JPG', 
        alt: 'Diamond Estate - Modern Guest Rooms',
        caption: 'Modern and comfortable guest rooms'
      }
    ],
    features: ['Modern facilities', 'Spacious rooms', 'Garden views', 'Security'],
    capacity: 'Family and group accommodation'
  },
  {
    id: 'gabriel-farombi-building',
    name: 'Gabriel Farombi Building',
    description: 'Named in honor of our heritage, this building provides comfortable lodging for ministry leaders and special guests.',
    category: 'accommodation',
    subcategory: 'leadership',
    commerciallyAvailable: true,
    startingRate: 28000,
    maxGuests: 2,
    roomType: 'Leadership Room',
    availabilityNote: 'Priority for ministry visitors',
    images: [
      { 
        src: '/images/facilities/real/residential-building.jpg', 
        alt: 'Gabriel Farombi Building - Leadership Accommodation',
        caption: 'Dedicated accommodation for ministry leaders'
      }
    ],
    features: ['Conference rooms', 'Office spaces', 'Meeting facilities', 'Guest rooms'],
    capacity: 'Leadership and ministry accommodation'
  },
  {
    id: 'jonathan-odega-house',
    name: 'Jonathan Odega House',
    description: 'Comfortable accommodation facility designed for ministry teams and visiting pastors.',
    category: 'accommodation',
    subcategory: 'leadership',
    commerciallyAvailable: true,
    startingRate: 25000,
    maxGuests: 3,
    roomType: 'Ministry Suite',
    availabilityNote: 'Group-friendly units available',
    images: [
      { 
        src: '/images/facilities/real/accommodation/modern-guest-houses.jpg', 
        alt: 'Jonathan Odega House - Ministry Accommodation',
        caption: 'Comfortable lodging for ministry teams'
      }
    ],
    features: ['Pastor quarters', 'Study areas', 'Prayer rooms', 'Meeting spaces'],
    capacity: 'Ministry team accommodation'
  },
  {
    id: 'odunaike-house',
    name: 'Odunaike House',
    description: 'Standard comfortable accommodation for camp participants and retreat attendees.',
    category: 'accommodation',
    subcategory: 'standard',
    commerciallyAvailable: true,
    startingRate: 12000,
    maxGuests: 6,
    roomType: 'Shared Lodge',
    availabilityNote: 'Great for retreats and group bookings',
    images: [
      { 
        src: '/images/facilities/real/modern-guest-rooms.JPG', 
        alt: 'Odunaike House - Standard Accommodation',
        caption: 'Comfortable standard accommodation'
      }
    ],
    features: ['Shared facilities', 'Dormitory style', 'Common areas', 'Basic amenities'],
    capacity: 'Group accommodation'
  },
  {
    id: 'jehovah-shammah-house',
    name: 'Jehovah Shammah House',
    description: 'A place where God\'s presence is acknowledged - comfortable lodging for spiritual retreats and conferences.',
    category: 'accommodation',
    subcategory: 'standard',
    commerciallyAvailable: true,
    startingRate: 15000,
    maxGuests: 4,
    roomType: 'Retreat Rooms',
    availabilityNote: 'Quiet wing for spiritual retreats',
    images: [
      { 
        src: '/images/facilities/real/jehovah-shammah-house.jpeg', 
        alt: 'Jehovah Shammah House - Spiritual Retreat Accommodation',
        caption: 'Peaceful environment for spiritual retreats'
      },
      { 
        src: '/images/facilities/real/accommodation/jehovah-shammah-house.jpg', 
        alt: 'Jehovah Shammah House Interior',
        caption: 'Comfortable interior spaces for reflection'
      }
    ],
    features: ['Prayer areas', 'Quiet environment', 'Basic amenities', 'Spiritual atmosphere'],
    capacity: 'Retreat and conference accommodation'
  },
  {
    id: 'ruby-estate',
    name: 'Ruby Estate',
    description: 'Beautiful estate accommodation offering a peaceful environment for extended stays and family gatherings.',
    category: 'accommodation',
    subcategory: 'premium',
    commerciallyAvailable: true,
    startingRate: 40000,
    maxGuests: 6,
    roomType: 'Estate Villa',
    availabilityNote: 'Ideal for extended stays',
    images: [
      { 
        src: '/images/facilities/real/accommodation/executive-guest-house.jpg', 
        alt: 'Ruby Estate - Premium Family Accommodation',
        caption: 'Beautiful estate for family gatherings'
      }
    ],
    features: ['Family facilities', 'Extended stay options', 'Kitchen facilities', 'Garden access'],
    capacity: 'Family and extended stay accommodation'
  },
  
  // CONFERENCE FACILITIES
  {
    id: 'auditorium',
    name: 'Main Auditorium (Rev. Gabriel Adome Building)',
    description: 'Our primary conference and worship venue equipped with modern audio-visual technology and comfortable seating.',
    category: 'conference',
    images: [
      { 
        src: '/images/facilities/real/main-conference-hall.jpeg.JPG', 
        alt: 'Main Auditorium - Rev. Gabriel Adome Building',
        caption: 'State-of-the-art conference and worship facility'
      },
      { 
        src: '/images/facilities/real/conference/gabriel-adombe-building.jpg', 
        alt: 'Gabriel Adombe Building Exterior',
        caption: 'Modern conference facility exterior'
      }
    ],
    features: ['High-capacity seating', 'Modern sound system', 'Video projection', 'Stage facilities', 'Air conditioning'],
    capacity: 'Large congregation seating'
  },
  
  // RECREATION FACILITIES
  {
    id: 'sports-centre',
    name: 'Sports Centre',
    description: 'Complete sports and recreation facility for physical fitness and recreational activities.',
    category: 'recreation',
    images: [
      { 
        src: '/images/facilities/real/outdoor-stadium.JPG', 
        alt: 'Sports Centre - Outdoor Stadium',
        caption: 'Modern sports and recreation facilities'
      },
      { 
        src: '/images/facilities/real/recreation/sports-stadium.jpg', 
        alt: 'Sports Stadium',
        caption: 'Complete sports complex for various activities'
      }
    ],
    features: ['Multiple sports courts', 'Equipment provided', 'Changing rooms', 'Outdoor activities'],
    capacity: 'Various sports activities'
  },
  {
    id: 'gym',
    name: 'Fitness Gym',
    description: 'Modern gymnasium equipped with fitness equipment for health and wellness activities.',
    category: 'recreation',
    images: [
      { 
        src: '/images/facilities/real/outdoor-stadium.JPG', 
        alt: 'Fitness and Recreation Area',
        caption: 'Modern fitness and wellness facilities'
      }
    ],
    features: ['Modern equipment', 'Personal training', 'Group fitness', 'Health programs'],
    capacity: 'Individual and group fitness'
  },
  
  // DINING FACILITIES
  {
    id: 'delish-fingers',
    name: 'Delish Fingers Restaurant',
    description: 'Our on-site restaurant serving delicious meals and refreshments for all camp visitors and residents.',
    category: 'dining',
    images: [
      { 
        src: '/images/facilities/real/dining-restaurant.JPG', 
        alt: 'Delish Fingers Restaurant',
        caption: 'Quality dining experience with local and international cuisine'
      },
      { 
        src: '/images/facilities/real/dining/delishringers-restaurant.jpg', 
        alt: 'Delishringers Restaurant Interior',
        caption: 'Modern restaurant interior and dining facilities'
      }
    ],
    features: ['Full service restaurant', 'Local and international cuisine', 'Catering services', 'Event dining'],
    capacity: 'Restaurant and catering services'
  },
  
  // INFRASTRUCTURE
  {
    id: 'main-gate',
    name: 'Main Gate Entrance',
    description: 'The welcoming entrance to Foursquare Camp Ajebo, providing security and visitor reception.',
    category: 'infrastructure',
    images: [
      { 
        src: '/images/facilities/real/main-conference-hall.jpeg.JPG', 
        alt: 'Camp Ajebo Main Entrance Area',
        caption: 'Welcome to Foursquare Camp Ajebo'
      }
    ],
    features: ['Security checkpoint', 'Visitor registration', 'Welcome center', 'Parking coordination'],
    capacity: 'Entry and security management'
  },
  {
    id: 'mast',
    name: 'Communication Mast',
    description: 'Essential communication infrastructure ensuring connectivity throughout the camp facility.',
    category: 'infrastructure',
    images: [
      { 
        src: '/images/facilities/real/IMG_6592.JPG', 
        alt: 'Communication Infrastructure',
        caption: 'Modern communication and infrastructure systems'
      }
    ],
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
