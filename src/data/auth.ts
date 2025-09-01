import { 
  User, 
  PrayerRequest, 
  MemberGivingRecord, 
  MemberEventRecord, 
  MemberActivity,
  DashboardData,
  Announcement,
  Ministry,
  MemberStats
} from '@/types/auth';

// Mock Users for Development
export const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'john.adebayo@email.com',
    password: 'password123', // Demo only
    firstName: 'John',
    lastName: 'Adebayo',
    phone: '+234 801 234 5678',
    dateOfBirth: '1985-06-15',
    address: {
      street: '45 Victoria Island Road',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '101241',
      country: 'Nigeria'
    },
    membershipDate: '2018-03-15',
    membershipStatus: 'active',
    role: {
      type: 'member',
      permissions: [
        { action: 'read', resource: 'events' },
        { action: 'register', resource: 'events' },
        { action: 'read', resource: 'blog' },
        { action: 'submit', resource: 'prayer_requests' }
      ]
    },
    emergencyContact: {
      name: 'Mary Adebayo',
      relationship: 'Wife',
      phone: '+234 802 345 6789',
      email: 'mary.adebayo@email.com'
    },
    ministries: ['Worship Team', 'Men Fellowship'],
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      privacy: {
        showInDirectory: true,
        shareContactInfo: true
      },
      communication: {
        newsletter: true,
        eventReminders: true,
        givingReceipts: true,
        prayerUpdates: true
      }
    },
    createdAt: '2018-03-15T10:00:00Z',
    updatedAt: '2024-08-30T14:30:00Z',
    lastLoginAt: '2024-09-01T08:15:00Z',
    emailVerified: true,
    phoneVerified: true
  },
  {
    id: 'user-002',
    email: 'sarah.okafor@email.com',
    password: 'password123', // Demo only
    firstName: 'Sarah',
    lastName: 'Okafor',
    phone: '+234 803 456 7890',
    dateOfBirth: '1992-09-22',
    address: {
      street: '12 Allen Avenue',
      city: 'Ikeja',
      state: 'Lagos',
      zipCode: '100271',
      country: 'Nigeria'
    },
    membershipDate: '2020-01-10',
    membershipStatus: 'active',
    role: {
      type: 'leader',
      permissions: [
        { action: 'read', resource: 'events' },
        { action: 'create', resource: 'events' },
        { action: 'manage', resource: 'youth_ministry' },
        { action: 'read', resource: 'members' }
      ],
      ministries: ['Youth Ministry']
    },
    emergencyContact: {
      name: 'Peter Okafor',
      relationship: 'Father',
      phone: '+234 804 567 8901'
    },
    ministries: ['Youth Ministry', 'Women Fellowship', 'Sunday School'],
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        showInDirectory: true,
        shareContactInfo: false
      },
      communication: {
        newsletter: true,
        eventReminders: true,
        givingReceipts: true,
        prayerUpdates: false
      }
    },
    createdAt: '2020-01-10T09:30:00Z',
    updatedAt: '2024-08-28T16:45:00Z',
    lastLoginAt: '2024-08-31T19:20:00Z',
    emailVerified: true,
    phoneVerified: false
  },
  {
    id: 'user-003',
    email: 'pastor.emmanuel@foursquareajebo.org',
    password: 'password123', // Demo only
    firstName: 'Emmanuel',
    lastName: 'Ogunyemi',
    phone: '+234 805 678 9012',
    membershipDate: '2015-06-01',
    membershipStatus: 'active',
    role: {
      type: 'pastor',
      permissions: [
        { action: '*', resource: '*' }
      ]
    },
    ministries: ['Leadership', 'Preaching', 'Counseling'],
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        showInDirectory: true,
        shareContactInfo: true
      },
      communication: {
        newsletter: true,
        eventReminders: true,
        givingReceipts: true,
        prayerUpdates: true
      }
    },
    createdAt: '2015-06-01T00:00:00Z',
    updatedAt: '2024-09-01T12:00:00Z',
    lastLoginAt: '2024-09-01T07:30:00Z',
    emailVerified: true,
    phoneVerified: true
  }
];

// Mock Prayer Requests
export const mockPrayerRequests: PrayerRequest[] = [
  {
    id: 'prayer-001',
    userId: 'user-001',
    title: 'Healing for My Mother',
    description: 'Please pray for my mother who is battling diabetes. The doctors say her condition is improving, but I believe in the power of prayer for complete healing.',
    category: 'health',
    priority: 'high',
    status: 'active',
    isPublic: true,
    allowComments: true,
    createdAt: '2024-08-25T10:30:00Z',
    updatedAt: '2024-08-30T14:15:00Z',
    tags: ['healing', 'family', 'health'],
    prayerCount: 23
  },
  {
    id: 'prayer-002',
    userId: 'user-002',
    title: 'Wisdom for Youth Ministry Leadership',
    description: 'As I step into greater leadership in youth ministry, I need God\'s wisdom and guidance to effectively minister to the young people in our church.',
    category: 'ministry',
    priority: 'medium',
    status: 'active',
    isPublic: true,
    allowComments: true,
    createdAt: '2024-08-28T16:45:00Z',
    updatedAt: '2024-08-30T09:20:00Z',
    tags: ['wisdom', 'leadership', 'youth'],
    prayerCount: 15
  },
  {
    id: 'prayer-003',
    userId: 'user-001',
    title: 'Job Promotion',
    description: 'Believing God for favor in my workplace and promotion to the senior management position.',
    category: 'work',
    priority: 'medium',
    status: 'answered',
    isPublic: false,
    allowComments: false,
    createdAt: '2024-07-15T09:00:00Z',
    updatedAt: '2024-08-20T11:30:00Z',
    answeredAt: '2024-08-20T11:30:00Z',
    tags: ['career', 'favor', 'promotion'],
    prayerCount: 8
  }
];

// Mock Member Giving Records
export const mockMemberGiving: MemberGivingRecord[] = [
  {
    id: 'giving-001',
    userId: 'user-001',
    donationId: 'don-001',
    amount: 50000,
    category: 'Tithes & Offerings',
    frequency: 'monthly',
    paymentMethod: 'Bank Transfer',
    date: '2024-08-01T00:00:00Z',
    receiptNumber: 'RCP-2024-001',
    taxDeductible: true,
    notes: 'Monthly tithe - automatic transfer'
  },
  {
    id: 'giving-002',
    userId: 'user-001',
    donationId: 'don-015',
    amount: 25000,
    category: 'Building Fund',
    frequency: 'one-time',
    paymentMethod: 'Card',
    date: '2024-08-15T00:00:00Z',
    receiptNumber: 'RCP-2024-015',
    taxDeductible: true,
    notes: 'Special offering for new sanctuary'
  },
  {
    id: 'giving-003',
    userId: 'user-002',
    donationId: 'don-023',
    amount: 15000,
    category: 'Youth Ministry',
    frequency: 'quarterly',
    paymentMethod: 'Mobile Payment',
    date: '2024-07-01T00:00:00Z',
    receiptNumber: 'RCP-2024-023',
    taxDeductible: true,
    notes: 'Support for youth summer camp'
  }
];

// Mock Member Event Records
export const mockMemberEvents: MemberEventRecord[] = [
  {
    id: 'event-reg-001',
    userId: 'user-001',
    eventId: 'event-001',
    eventTitle: 'Men\'s Fellowship Breakfast',
    eventDate: '2024-09-07T08:00:00Z',
    registrationDate: '2024-08-25T14:30:00Z',
    attendanceStatus: 'registered',
    notes: 'Registered for men\'s fellowship breakfast meeting'
  },
  {
    id: 'event-reg-002',
    userId: 'user-001',
    eventId: 'event-005',
    eventTitle: 'Family Fun Day',
    eventDate: '2024-08-15T10:00:00Z',
    registrationDate: '2024-08-10T09:15:00Z',
    attendanceStatus: 'attended',
    rating: 5,
    feedback: 'Wonderful event! Great organization and fun activities for the whole family.',
    notes: 'Attended with wife and 2 children'
  },
  {
    id: 'event-reg-003',
    userId: 'user-002',
    eventId: 'event-003',
    eventTitle: 'Youth Summer Camp 2024',
    eventDate: '2024-07-20T00:00:00Z',
    registrationDate: '2024-06-15T16:20:00Z',
    attendanceStatus: 'attended',
    rating: 5,
    feedback: 'Amazing experience! The youth were so engaged and many gave their lives to Christ.',
    notes: 'Served as youth leader and counselor'
  }
];

// Mock Member Activities
export const mockMemberActivities: MemberActivity[] = [
  {
    id: 'activity-001',
    userId: 'user-001',
    type: 'donation',
    description: 'Made monthly tithe donation of ₦50,000',
    metadata: { amount: 50000, category: 'tithes' },
    timestamp: '2024-09-01T10:30:00Z'
  },
  {
    id: 'activity-002',
    userId: 'user-001',
    type: 'prayer_request',
    description: 'Submitted prayer request for mother\'s healing',
    metadata: { requestId: 'prayer-001', category: 'health' },
    timestamp: '2024-08-25T10:30:00Z'
  },
  {
    id: 'activity-003',
    userId: 'user-001',
    type: 'event_registration',
    description: 'Registered for Men\'s Fellowship Breakfast',
    metadata: { eventId: 'event-001', eventTitle: 'Men\'s Fellowship Breakfast' },
    timestamp: '2024-08-25T14:30:00Z'
  },
  {
    id: 'activity-004',
    userId: 'user-001',
    type: 'login',
    description: 'Logged into member portal',
    timestamp: '2024-09-01T08:15:00Z'
  }
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'announce-001',
    title: 'New Member Orientation',
    message: 'Join us this Sunday after service for new member orientation. Learn about our church history, ministries, and how to get involved.',
    type: 'info',
    targetRoles: ['member'],
    createdAt: '2024-08-30T12:00:00Z',
    readBy: []
  },
  {
    id: 'announce-002',
    title: 'Building Fund Progress Update',
    message: 'We have reached 62% of our building fund goal! Thank you for your faithful giving. ₦7.5M more needed to complete the new sanctuary.',
    type: 'success',
    targetRoles: ['member', 'leader', 'pastor'],
    createdAt: '2024-08-28T15:30:00Z',
    readBy: ['user-001']
  },
  {
    id: 'announce-003',
    title: 'Ministry Leaders Meeting',
    message: 'All ministry leaders are required to attend the leadership meeting this Friday at 7:00 PM in the conference room.',
    type: 'warning',
    targetRoles: ['leader', 'pastor'],
    expiresAt: '2024-09-06T23:59:59Z',
    createdAt: '2024-09-01T09:00:00Z',
    readBy: []
  }
];

// Mock Ministries
export const mockMinistries: Ministry[] = [
  {
    id: 'ministry-001',
    name: 'Worship Team',
    description: 'Leading the congregation in worship through music and song',
    leader: 'David Adebayo',
    meetingTime: 'Thursdays 7:00 PM',
    location: 'Church Sanctuary',
    contactInfo: {
      email: 'worship@foursquareajebo.org',
      phone: '+234 806 123 4567'
    },
    requirements: ['Musical ability', 'Regular attendance', 'Heart for worship'],
    isActive: true,
    memberCount: 15
  },
  {
    id: 'ministry-002',
    name: 'Youth Ministry',
    description: 'Discipling and developing young people ages 13-25',
    leader: 'Sarah Okafor',
    meetingTime: 'Saturdays 4:00 PM',
    location: 'Youth Hall',
    contactInfo: {
      email: 'youth@foursquareajebo.org',
      phone: '+234 807 234 5678'
    },
    requirements: ['Heart for young people', 'Commitment to discipleship'],
    isActive: true,
    memberCount: 45
  },
  {
    id: 'ministry-003',
    name: 'Children Ministry',
    description: 'Teaching and caring for children during services and events',
    leader: 'Grace Okonkwo',
    meetingTime: 'Sundays during service',
    location: 'Children Hall',
    contactInfo: {
      email: 'children@foursquareajebo.org'
    },
    requirements: ['Love for children', 'Background check', 'Training completion'],
    isActive: true,
    memberCount: 20
  }
];

// Helper Functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getPrayerRequestsByUserId = (userId: string): PrayerRequest[] => {
  return mockPrayerRequests.filter(request => request.userId === userId);
};

export const getPublicPrayerRequests = (): PrayerRequest[] => {
  return mockPrayerRequests.filter(request => request.isPublic && request.status === 'active');
};

export const getMemberGivingByUserId = (userId: string): MemberGivingRecord[] => {
  return mockMemberGiving.filter(record => record.userId === userId);
};

export const getMemberEventsByUserId = (userId: string): MemberEventRecord[] => {
  return mockMemberEvents.filter(record => record.userId === userId);
};

export const getMemberActivitiesByUserId = (userId: string, limit: number = 10): MemberActivity[] => {
  return mockMemberActivities
    .filter(activity => activity.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getAnnouncementsForUser = (userRole: string): Announcement[] => {
  return mockAnnouncements.filter(announcement => 
    announcement.targetRoles.includes(userRole as any) &&
    (!announcement.expiresAt || new Date(announcement.expiresAt) > new Date())
  );
};

export const calculateMemberStats = (userId: string): MemberStats => {
  const givingRecords = getMemberGivingByUserId(userId);
  const eventRecords = getMemberEventsByUserId(userId);
  const prayerRequests = getPrayerRequestsByUserId(userId);
  const user = getUserById(userId);

  const totalGiving = givingRecords.reduce((sum, record) => sum + record.amount, 0);
  const eventsAttended = eventRecords.filter(event => event.attendanceStatus === 'attended').length;
  const memberSince = user?.membershipDate || '';
  const ministryInvolvement = user?.ministries || [];

  // Calculate attendance rate (simplified)
  const totalRegistered = eventRecords.length;
  const attendanceRate = totalRegistered > 0 ? (eventsAttended / totalRegistered) * 100 : 0;

  return {
    totalGiving,
    eventsAttended,
    prayerRequestsSubmitted: prayerRequests.length,
    memberSince,
    ministryInvolvement,
    attendanceRate: Math.round(attendanceRate)
  };
};

export const getMemberDashboardData = (userId: string): DashboardData => {
  const user = getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const stats = calculateMemberStats(userId);
  const recentActivities = getMemberActivitiesByUserId(userId, 5);
  const upcomingEvents = getMemberEventsByUserId(userId)
    .filter(event => new Date(event.eventDate) > new Date() && event.attendanceStatus === 'registered')
    .slice(0, 3);
  const recentGiving = getMemberGivingByUserId(userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const activePrayerRequests = getPrayerRequestsByUserId(userId)
    .filter(request => request.status === 'active')
    .slice(0, 3);
  const announcements = getAnnouncementsForUser(user.role.type);

  return {
    user,
    stats,
    recentActivities,
    upcomingEvents,
    recentGiving,
    activePrayerRequests,
    announcements
  };
};

// Authentication helpers
export const validateLogin = async (email: string, password: string): Promise<User | null> => {
  // In a real app, this would validate against a database with hashed passwords
  const user = getUserByEmail(email);
  
  // For demo purposes, accept any password for existing users
  if (user && password.length >= 6) {
    return user;
  }
  
  return null;
};

export const generateToken = (user: User): string => {
  // In a real app, this would generate a proper JWT token
  return btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role.type }));
};

export const validateToken = (token: string): User | null => {
  try {
    const decoded = JSON.parse(atob(token));
    return getUserById(decoded.userId) || null;
  } catch {
    return null;
  }
};
