import { DonationCategory, DonationRecord, DonationStats, GivingGoal } from '@/types/donations';

// Donation Categories for Foursquare Camp Ajebo Church
export const donationCategories: DonationCategory[] = [
  {
    id: 'tithes',
    name: 'Tithes & Offerings',
    description: 'Your faithful giving supports our ministry and community outreach',
    icon: '⛪',
    color: 'from-blue-500 to-purple-600',
    suggested_amounts: [5000, 10000, 25000, 50000, 100000],
    priority: 1,
  },
  {
    id: 'missions',
    name: 'Missions & Evangelism',
    description: 'Support our global mission work and local evangelism efforts',
    icon: '🌍',
    color: 'from-green-500 to-teal-600',
    suggested_amounts: [2500, 5000, 10000, 20000, 50000],
    target_amount: 5000000,
    current_amount: 3250000,
    priority: 2,
  },
  {
    id: 'building',
    name: 'Building Fund',
    description: 'Help us expand our facilities to accommodate our growing congregation',
    icon: '🏗️',
    color: 'from-orange-500 to-red-600',
    suggested_amounts: [10000, 25000, 50000, 100000, 250000],
    target_amount: 20000000,
    current_amount: 12500000,
    priority: 3,
  },
  {
    id: 'youth',
    name: 'Youth Ministry',
    description: 'Invest in the next generation through youth programs and activities',
    icon: '👥',
    color: 'from-pink-500 to-purple-600',
    suggested_amounts: [2500, 5000, 10000, 20000, 30000],
    target_amount: 1500000,
    current_amount: 875000,
    priority: 4,
  },
  {
    id: 'outreach',
    name: 'Community Outreach',
    description: 'Support our food bank, homeless ministry, and community programs',
    icon: '🤝',
    color: 'from-cyan-500 to-blue-600',
    suggested_amounts: [2000, 5000, 10000, 15000, 25000],
    target_amount: 2500000,
    current_amount: 1820000,
    priority: 5,
  },
  {
    id: 'music',
    name: 'Worship & Music',
    description: 'Support our worship team, instruments, and audio-visual equipment',
    icon: '🎵',
    color: 'from-indigo-500 to-purple-600',
    suggested_amounts: [3000, 7500, 15000, 30000, 50000],
    target_amount: 2000000,
    current_amount: 1280000,
    priority: 6,
  },
  {
    id: 'special',
    name: 'Special Projects',
    description: 'Support specific church initiatives and special events',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-600',
    suggested_amounts: [2500, 5000, 10000, 20000, 40000],
    priority: 7,
  },
  {
    id: 'emergency',
    name: 'Emergency Relief',
    description: 'Help us respond to disasters and emergency needs in our community',
    icon: '🚨',
    color: 'from-red-500 to-pink-600',
    suggested_amounts: [2000, 5000, 10000, 25000, 50000],
    priority: 8,
  },
];

// Mock Donation Records for Development
export const mockDonationRecords: DonationRecord[] = [
  {
    id: 'don-001',
    transaction_id: 'txn-2024-001',
    donor_id: 'donor-001',
    category: 'tithes',
    amount: 50000,
    fees: 1500,
    net_amount: 48500,
    frequency: 'monthly',
    status: 'completed',
    payment_method: 'card',
    anonymous: false,
    created_at: '2024-08-15T10:30:00Z',
    processed_at: '2024-08-15T10:32:00Z',
    receipt_sent: true,
    tax_deductible: true,
  },
  {
    id: 'don-002',
    transaction_id: 'txn-2024-002',
    donor_id: 'donor-002',
    category: 'missions',
    amount: 25000,
    fees: 800,
    net_amount: 24200,
    frequency: 'one-time',
    status: 'completed',
    payment_method: 'bank',
    dedication: {
      type: 'in_memory',
      name: 'John Doe',
      message: 'In loving memory of a faithful servant',
    },
    anonymous: false,
    created_at: '2024-08-20T14:15:00Z',
    processed_at: '2024-08-20T14:17:00Z',
    receipt_sent: true,
    tax_deductible: true,
  },
  {
    id: 'don-003',
    transaction_id: 'txn-2024-003',
    donor_id: 'donor-003',
    category: 'building',
    amount: 100000,
    fees: 3000,
    net_amount: 97000,
    frequency: 'quarterly',
    status: 'completed',
    payment_method: 'card',
    anonymous: true,
    created_at: '2024-08-25T09:45:00Z',
    processed_at: '2024-08-25T09:47:00Z',
    receipt_sent: true,
    tax_deductible: true,
  },
];

// Mock Donation Statistics
export const mockDonationStats: DonationStats = {
  total_raised: 12575000,
  total_donors: 347,
  categories: {
    tithes: { amount: 7500000, percentage: 59.6, donor_count: 156 },
    missions: { amount: 2050000, percentage: 16.3, donor_count: 89 },
    building: { amount: 1500000, percentage: 11.9, donor_count: 45 },
    youth: { amount: 875000, percentage: 7.0, donor_count: 67 },
    outreach: { amount: 450000, percentage: 3.6, donor_count: 23 },
    music: { amount: 200000, percentage: 1.6, donor_count: 12 },
  },
  monthly_trends: [
    { month: 'Jan 2024', amount: 1850000, donor_count: 45 },
    { month: 'Feb 2024', amount: 2200000, donor_count: 52 },
    { month: 'Mar 2024', amount: 1975000, donor_count: 48 },
    { month: 'Apr 2024', amount: 2125000, donor_count: 55 },
    { month: 'May 2024', amount: 2350000, donor_count: 61 },
    { month: 'Jun 2024', amount: 2075000, donor_count: 49 },
  ],
  frequency_breakdown: {
    one_time: 4500000,
    recurring: 8075000,
  },
};

// Featured Giving Goals
export const givingGoals: GivingGoal[] = [
  {
    id: 'goal-001',
    title: 'New Church Building Expansion',
    description: 'Help us build a new sanctuary to accommodate our growing congregation and enhance our worship experience.',
    target_amount: 20000000,
    current_amount: 12500000,
    deadline: '2024-12-31',
    category: 'building',
    featured: true,
    image_url: '/images/building-expansion.jpg',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'goal-002',
    title: 'Global Missions Campaign',
    description: 'Support our missionaries around the world and fund new mission trips to unreached communities.',
    target_amount: 5000000,
    current_amount: 3250000,
    deadline: '2024-10-31',
    category: 'missions',
    featured: true,
    image_url: '/images/missions-campaign.jpg',
    created_at: '2024-03-01T00:00:00Z',
  },
  {
    id: 'goal-003',
    title: 'Youth Summer Camp Scholarships',
    description: 'Provide scholarships for youth who cannot afford summer camp, ensuring no child is left behind.',
    target_amount: 1500000,
    current_amount: 875000,
    deadline: '2024-09-30',
    category: 'youth',
    featured: true,
    image_url: '/images/youth-camp.jpg',
    created_at: '2024-06-01T00:00:00Z',
  },
];

// Helper Functions
export const getDonationCategoryById = (id: string): DonationCategory | undefined => {
  return donationCategories.find(category => category.id === id);
};

export const getFeaturedCategories = (): DonationCategory[] => {
  return donationCategories
    .filter(category => category.target_amount && category.current_amount)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);
};

export const calculateProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotalFees = (amount: number, coverFees: boolean = false): number => {
  // Nigerian payment processing fees (typically 1.5% + ₦100 for local cards)
  const percentageFee = amount * 0.015;
  const fixedFee = 100;
  const totalFees = percentageFee + fixedFee;
  
  return coverFees ? totalFees : 0;
};

export const getTotalAmount = (amount: number, coverFees: boolean = false): number => {
  const fees = calculateTotalFees(amount, coverFees);
  return amount + fees;
};

export const getDonationsByCategory = (category: string): DonationRecord[] => {
  return mockDonationRecords.filter(record => record.category === category);
};

export const getRecentDonations = (limit: number = 10): DonationRecord[] => {
  return mockDonationRecords
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
};
