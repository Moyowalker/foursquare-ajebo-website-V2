// Ministry and Analytics Type Definitions

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: Date;
  membershipStatus: 'active' | 'inactive' | 'new' | 'visiting';
  demographicInfo: {
    age: number;
    gender: 'male' | 'female' | 'other';
    address: string;
    occupation: string;
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  };
  ministryInvolvement: string[];
  smallGroupId?: string;
  leadershipRoles: string[];
}

// Member Engagement Tracking
export interface MemberEngagement {
  memberId: string;
  memberName: string;
  engagementScore: number; // 0-100
  lastActivity: Date;
  monthlyActivities: {
    month: string;
    serviceAttendance: number;
    ministryParticipation: number;
    smallGroupAttendance: number;
    volunteerHours: number;
    donationCount: number;
    prayerRequestsSubmitted: number;
    eventsAttended: number;
  }[];
  trends: {
    period: 'week' | 'month' | 'quarter' | 'year';
    change: number; // percentage change
    direction: 'up' | 'down' | 'stable';
  };
  riskLevel: 'low' | 'medium' | 'high'; // disengagement risk
}

// Service Attendance Analytics
export interface ServiceAttendance {
  id: string;
  date: Date;
  serviceType: 'sunday_morning' | 'sunday_evening' | 'wednesday' | 'special_event' | 'prayer_meeting';
  totalAttendance: number;
  newVisitors: number;
  returningMembers: number;
  firstTimeVisitors: number;
  demographics: {
    ageGroups: {
      children: number; // 0-12
      youth: number; // 13-17
      youngAdults: number; // 18-30
      adults: number; // 31-64
      seniors: number; // 65+
    };
    genderDistribution: {
      male: number;
      female: number;
      other: number;
    };
  };
  weatherCondition?: 'sunny' | 'rainy' | 'cloudy' | 'stormy';
  specialEvents?: string[];
}

export interface AttendanceAnalytics {
  averageAttendance: number;
  growthRate: number; // percentage
  seasonalTrends: {
    month: string;
    attendance: number;
    change: number;
  }[];
  serviceComparison: {
    serviceType: string;
    averageAttendance: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  retentionRate: number; // percentage of visitors who return
  peakAttendancePeriods: string[];
}

// Giving Pattern Analytics
export interface Donation {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: Date;
  type: 'tithe' | 'offering' | 'special_project' | 'missions' | 'building_fund' | 'benevolence';
  method: 'cash' | 'check' | 'online' | 'bank_transfer' | 'mobile';
  recurringDonationId?: string;
  purpose?: string;
  isAnonymous: boolean;
}

export interface GivingAnalytics {
  totalGiving: number;
  averageGift: number;
  donorCount: number;
  givingGrowth: number; // percentage
  monthlyTrends: {
    month: string;
    amount: number;
    donorCount: number;
    change: number;
  }[];
  donorSegmentation: {
    segment: 'major_donors' | 'regular_givers' | 'occasional_givers' | 'first_time_givers';
    count: number;
    totalAmount: number;
    percentage: number;
  }[];
  givingMethods: {
    method: string;
    amount: number;
    percentage: number;
  }[];
  projectFunding: {
    projectName: string;
    targetAmount: number;
    currentAmount: number;
    donorCount: number;
    progressPercentage: number;
  }[];
}

// Prayer Request Analytics
export interface PrayerRequest {
  id: string;
  submittedBy: string;
  submittedDate: Date;
  category: 'health' | 'family' | 'finances' | 'career' | 'spiritual' | 'relationships' | 'guidance' | 'thanksgiving';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isAnonymous: boolean;
  status: 'open' | 'in_progress' | 'answered' | 'closed';
  description: string;
  responses: {
    id: string;
    responderId: string;
    responseDate: Date;
    message: string;
  }[];
  answeredDate?: Date;
  testimonyShared?: boolean;
}

export interface PrayerAnalytics {
  totalRequests: number;
  answeredRequests: number;
  responseRate: number; // percentage
  averageResponseTime: number; // days
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
    averageResolutionTime: number;
  }[];
  monthlyTrends: {
    month: string;
    submitted: number;
    answered: number;
    responseRate: number;
  }[];
  testimoniesShared: number;
  mostActiveRequesters: {
    memberId: string;
    memberName: string;
    requestCount: number;
    answeredCount: number;
  }[];
}

// Ministry Effectiveness Metrics
export interface Ministry {
  id: string;
  name: string;
  type: 'worship' | 'children' | 'youth' | 'adult' | 'seniors' | 'missions' | 'outreach' | 'small_groups' | 'administration';
  leader: {
    id: string;
    name: string;
    role: string;
  };
  description: string;
  goals: MinistryGoal[];
  members: string[]; // member IDs
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  activities: MinistryActivity[];
  kpis: MinistryKPI[];
}

export interface MinistryGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: number; // 0-100
  metrics: {
    target: number;
    current: number;
    unit: string;
  };
}

export interface MinistryActivity {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'event' | 'outreach' | 'service' | 'training' | 'fellowship';
  attendance: number;
  feedback: {
    satisfaction: number; // 1-5
    engagementLevel: number; // 1-5
    comments: string[];
  };
  outcomes: string[];
  cost: number;
}

export interface MinistryKPI {
  id: string;
  name: string;
  category: 'growth' | 'engagement' | 'effectiveness' | 'financial' | 'spiritual';
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  benchmarkComparison: 'above' | 'at' | 'below';
}

export interface MinistryEffectivenessAnalytics {
  overallScore: number; // 0-100
  ministryPerformance: {
    ministryId: string;
    ministryName: string;
    score: number;
    memberGrowth: number;
    engagement: number;
    goalCompletion: number;
    budgetEfficiency: number;
  }[];
  leadershipEffectiveness: {
    leaderId: string;
    leaderName: string;
    ministriesLed: number;
    averageMinistryScore: number;
    memberSatisfaction: number;
    goalAchievementRate: number;
  }[];
  resourceAllocation: {
    ministry: string;
    budgetUtilization: number;
    memberToLeaderRatio: number;
    costPerMember: number;
    roi: number; // return on investment
  }[];
  growthOpportunities: {
    area: string;
    priority: 'high' | 'medium' | 'low';
    potentialImpact: number;
    requiredInvestment: number;
  }[];
}

// Dashboard Summary Types
export interface AnalyticsPeriod {
  label: string;
  value: 'week' | 'month' | 'quarter' | 'year';
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeDirection: 'up' | 'down' | 'stable';
  unit?: string;
  color: string;
  icon: string;
  trend?: number[];
}

export interface AnalyticsFilter {
  ministry?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  memberSegment?: 'all' | 'new' | 'active' | 'inactive' | 'leaders';
  serviceType?: string;
  donationType?: string;
  prayerCategory?: string;
}

export interface AnalyticsDashboardData {
  summary: DashboardMetric[];
  memberEngagement: MemberEngagement[];
  attendanceAnalytics: AttendanceAnalytics;
  givingAnalytics: GivingAnalytics;
  prayerAnalytics: PrayerAnalytics;
  ministryEffectiveness: MinistryEffectivenessAnalytics;
  lastUpdated: Date;
}
