// Church Configuration - Real data for Foursquare Ajebo
export const churchInfo = {
  // Basic Information
  name: 'Foursquare Gospel Church Ajebo',
  shortName: 'Foursquare Ajebo',
  tagline: 'A peaceful spiritual retreat center',
  
  // Contact Information
  contact: {
    phone: {
      main: '+234-803-123-4567',
      whatsapp: '+234-803-123-4567',
      emergency: '+234-911-253236'
    },
    email: {
      info: 'info@foursquareajebo.org',
      pastor: 'pastor@foursquareajebo.org',
      events: 'events@foursquareajebo.org',
      media: 'media@foursquareajebo.org'
    },
    address: {
      street: 'Foursquare Gospel Church Ajebo',
      area: 'Ajebo Community',
      state: 'Ogun State',
      country: 'Nigeria',
      fullAddress: 'Foursquare Gospel Church Ajebo, Ajebo Community, Ogun State, Nigeria'
    },
    social: {
      facebook: 'https://facebook.com/FoursquareAjebo',
      instagram: 'https://instagram.com/FoursquareAjebo',
      youtube: 'https://youtube.com/@FoursquareAjebo',
      twitter: 'https://twitter.com/FoursquareAjebo'
    }
  },

  // Service Times
  services: {
    sunday: {
      main: '8:00 AM - 11:00 AM',
      description: 'Main Sunday Service'
    },
    wednesday: {
      main: '6:00 PM - 8:00 PM',
      description: 'Mid-week Service'
    },
    friday: {
      main: '6:00 PM - 8:00 PM',
      description: 'Prayer & Worship Night'
    }
  },

  // Office Hours
  officeHours: {
    'Monday - Friday': '8:00 AM - 6:00 PM',
    'Saturday': '9:00 AM - 4:00 PM',
    'Sunday': 'After Service - 5:00 PM',
    'Public Holidays': '10:00 AM - 3:00 PM'
  },

  // Leadership
  leadership: {
    seniorPastor: {
      name: 'Pastor Emmanuel Adebayo',
      title: 'Senior Pastor',
      email: 'pastor.emmanuel@foursquareajebo.org',
      phone: '+234-803-123-4567',
      bio: 'Pastor Emmanuel has been leading Foursquare Ajebo for over 15 years with unwavering dedication to God\'s word and community service.'
    },
    associatePastor: {
      name: 'Pastor (Mrs.) Grace Adebayo',
      title: 'Associate Pastor - Women Ministry',
      email: 'pastor.grace@foursquareajebo.org',
      phone: '+234-803-123-4568',
      bio: 'Pastor Grace is a passionate leader in women\'s ministry and youth development with over 12 years of ministry experience.'
    }
  },

  // Mission & Vision
  mission: 'Empowering spiritual growth and community through worship, prayer, and fellowship.',
  vision: 'To provide a serene, comfortable, and secured spiritual retreat centre for worship, fellowship, and community building, fostering spiritual growth and deepening faith among its visitors and stakeholders.',
  
  // Core Values
  values: [
    'Biblical Foundation',
    'Community Service',
    'Spiritual Growth',
    'Family Unity',
    'Youth Development',
    'Compassionate Care'
  ],

  // Facilities
  facilities: {
    accommodation: {
      name: 'Guest Accommodation',
      description: 'Comfortable rooms for retreats and conferences',
      capacity: 100
    },
    halls: {
      main: {
        name: 'Main Sanctuary',
        capacity: 500,
        features: ['Audio/Visual Equipment', 'Air Conditioning', 'Modern Sound System']
      },
      conference: {
        name: 'Conference Hall',
        capacity: 200,
        features: ['Projector', 'Sound System', 'Breakout Rooms']
      }
    },
    amenities: [
      'Modern Kitchen Facilities',
      'Children Play Area',
      'Parking Space for 100+ Vehicles',
      'Beautiful Gardens for Meditation',
      'Youth Recreation Center',
      'Library & Study Rooms'
    ]
  },

  // Statistics
  stats: {
    established: 2009,
    yearsOfService: 15,
    membersServed: '1000+',
    eventsHosted: '50+',
    communitiesReached: 25
  },

  // Legal Information
  legal: {
    registration: 'RC-xxxxx (Churches Registration)',
    taxId: 'xxx-xxx-xxx',
    address: 'Foursquare Gospel Church Ajebo, Ajebo Community, Ogun State, Nigeria'
  }
};

// Ministry Departments
export const ministries = [
  {
    id: 'worship',
    name: 'Worship & Music Ministry',
    leader: 'Elder (Mrs.) Patience Nwosu',
    description: 'Leading the congregation in spirit-filled worship through music and song',
    activities: ['Choir Practice', 'Instrument Training', 'Worship Leading']
  },
  {
    id: 'youth',
    name: 'Youth Ministry',
    leader: 'Deacon Chinedu Okwu',
    description: 'Empowering young people to live out their faith boldly',
    activities: ['Youth Fellowship', 'Summer Camps', 'Mentorship Programs']
  },
  {
    id: 'women',
    name: 'Women Ministry',
    leader: 'Pastor (Mrs.) Grace Adebayo',
    description: 'Nurturing women in their spiritual journey and life skills',
    activities: ['Women Fellowship', 'Skills Training', 'Prayer Groups']
  },
  {
    id: 'children',
    name: 'Children Ministry',
    leader: 'Deaconess Blessing Umeh',
    description: 'Building strong foundations of faith in our children',
    activities: ['Sunday School', 'Children Church', 'Holiday Programs']
  },
  {
    id: 'outreach',
    name: 'Community Outreach',
    leader: 'Elder (Mrs.) Funmilayo Okafor',
    description: 'Serving our community with love and compassion',
    activities: ['Food Distribution', 'Medical Outreach', 'Education Support']
  }
];

// Event Types and Categories
export const eventCategories = [
  { value: 'spiritual-retreat', label: 'Spiritual Retreat', icon: '🙏' },
  { value: 'youth-camp', label: 'Youth Camp', icon: '👥' },
  { value: 'family-camp', label: 'Family Camp', icon: '👨‍👩‍👧‍👦' },
  { value: 'leadership-training', label: 'Leadership Training', icon: '📚' },
  { value: 'worship-service', label: 'Worship Service', icon: '⛪' },
  { value: 'bible-study', label: 'Bible Study', icon: '📖' },
  { value: 'prayer-meeting', label: 'Prayer Meeting', icon: '🙏' },
  { value: 'community-outreach', label: 'Community Outreach', icon: '🤝' },
  { value: 'conference', label: 'Conference', icon: '🎯' },
  { value: 'special-event', label: 'Special Event', icon: '⭐' }
];

// Standard donation categories for the church
export const donationPurposes = [
  { id: 'tithes', name: 'Tithes & Offerings', icon: '⛪' },
  { id: 'missions', name: 'Missions & Evangelism', icon: '🌍' },
  { id: 'building', name: 'Building Fund', icon: '🏗️' },
  { id: 'youth', name: 'Youth Ministry', icon: '👥' },
  { id: 'outreach', name: 'Community Outreach', icon: '🤝' },
  { id: 'music', name: 'Worship & Music', icon: '🎵' },
  { id: 'special', name: 'Special Projects', icon: '⭐' },
  { id: 'emergency', name: 'Emergency Relief', icon: '🚨' }
];

export default churchInfo;