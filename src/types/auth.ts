// User Authentication and Member Portal Types for Foursquare Ajebo Church

export interface User {
  id: string;
  email: string;
  password?: string; // Only used for demo/development purposes
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  address?: Address;
  membershipDate: string;
  membershipStatus: 'active' | 'inactive' | 'pending';
  role: UserRole;
  profileImage?: string;
  emergencyContact?: EmergencyContact;
  ministries: string[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showInDirectory: boolean;
    shareContactInfo: boolean;
  };
  communication: {
    newsletter: boolean;
    eventReminders: boolean;
    givingReceipts: boolean;
    prayerUpdates: boolean;
  };
}

export interface UserRole {
  type: 'member' | 'leader' | 'pastor' | 'admin';
  permissions: Permission[];
  ministries?: string[];
}

export interface Permission {
  action: string;
  resource: string;
  conditions?: Record<string, any>;
}

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  address: Address;
  emergencyContact: EmergencyContact;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface PasswordResetData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
  refreshToken: string;
}

export interface MemberStats {
  totalGiving: number;
  eventsAttended: number;
  prayerRequestsSubmitted: number;
  memberSince: string;
  ministryInvolvement: string[];
  attendanceRate: number;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'personal' | 'family' | 'health' | 'work' | 'ministry' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'answered' | 'closed';
  isPublic: boolean;
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
  answeredAt?: string;
  tags: string[];
  prayerCount: number;
}

export interface PrayerComment {
  id: string;
  prayerRequestId: string;
  userId: string;
  userName: string;
  comment: string;
  isEncouragement: boolean;
  createdAt: string;
}

export interface MemberGivingRecord {
  id: string;
  userId: string;
  donationId: string;
  amount: number;
  category: string;
  frequency: string;
  paymentMethod: string;
  date: string;
  receiptNumber: string;
  taxDeductible: boolean;
  notes?: string;
}

export interface MemberEventRecord {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  registrationDate: string;
  attendanceStatus: 'registered' | 'attended' | 'no-show' | 'cancelled';
  notes?: string;
  rating?: number;
  feedback?: string;
}

export interface MemberActivity {
  id: string;
  userId: string;
  type: 'login' | 'donation' | 'event_registration' | 'prayer_request' | 'profile_update';
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface DashboardData {
  user: User;
  stats: MemberStats;
  recentActivities: MemberActivity[];
  upcomingEvents: MemberEventRecord[];
  recentGiving: MemberGivingRecord[];
  activePrayerRequests: PrayerRequest[];
  announcements: Announcement[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  targetRoles: UserRole['type'][];
  expiresAt?: string;
  createdAt: string;
  readBy: string[];
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  leader: string;
  meetingTime?: string;
  location?: string;
  contactInfo: {
    email?: string;
    phone?: string;
  };
  requirements?: string[];
  isActive: boolean;
  memberCount: number;
}

// Form validation schemas
export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  errors?: ValidationError[];
  message?: string;
}

// Nigerian-specific fields
export interface NigerianUserData {
  localGovernmentArea?: string;
  nationality: string;
  occupation?: string;
  workAddress?: Address;
  nextOfKin: EmergencyContact;
  bornAgainDate?: string;
  baptismDate?: string;
  confirmationDate?: string;
}

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;

export const MINISTRY_CATEGORIES = [
  'Worship Team', 'Youth Ministry', 'Children Ministry', 'Women Fellowship',
  'Men Fellowship', 'Ushering', 'Technical Team', 'Evangelism', 'Counseling',
  'Prayer Team', 'Media Team', 'Finance Committee', 'Building Committee',
  'Outreach Team', 'Sunday School', 'Bible Study Leaders'
] as const;

export const PRAYER_CATEGORIES = [
  'Personal Growth', 'Family', 'Health & Healing', 'Work & Career',
  'Ministry & Service', 'Salvation', 'Relationships', 'Financial',
  'Church Growth', 'Nation & World', 'Spiritual Warfare', 'Other'
] as const;
