// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
  location: string;
  image?: string;
  registrationOpen: boolean;
  maxAttendees?: number;
  currentAttendees?: number;
  price?: number;
  featured?: boolean;
}

export type EventCategory = 
  | 'retreat'
  | 'convention' 
  | 'workshop'
  | 'conference'
  | 'camp'
  | 'service'
  | 'other';

// Facility Types
export interface Facility {
  id: string;
  name: string;
  description: string;
  type: FacilityType;
  capacity: number;
  amenities: string[];
  images: string[];
  available: boolean;
  pricePerNight?: number;
  pricePerHour?: number;
}

export type FacilityType = 
  | 'accommodation'
  | 'hall'
  | 'conference-room'
  | 'outdoor'
  | 'recreational'
  | 'dining'
  | 'other';

// Accommodation Types
export interface Accommodation extends Facility {
  type: 'accommodation';
  roomType: RoomType;
  bedCount: number;
  hasPrivateBathroom: boolean;
  hasAirConditioning: boolean;
}

export type RoomType = 
  | 'single'
  | 'double'
  | 'family'
  | 'dormitory'
  | 'vip-suite';

// Booking Types
export interface Booking {
  id: string;
  facilityId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
  specialRequests?: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: ContactCategory;
}

export type ContactCategory = 
  | 'general'
  | 'booking'
  | 'events'
  | 'donations'
  | 'support'
  | 'media';

// Gallery Types
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  category: GalleryCategory;
  featured?: boolean;
  uploadedAt: Date;
}

export type MediaType = 'image' | 'video';

export type GalleryCategory = 
  | 'facilities'
  | 'events'
  | 'activities'
  | 'nature'
  | 'testimonials'
  | 'other';

// News/Announcement Types
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  category: NewsCategory;
  featured?: boolean;
  image?: string;
  slug: string;
}

export type NewsCategory = 
  | 'announcement'
  | 'event'
  | 'testimony'
  | 'update'
  | 'ministry';

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
  featured?: boolean;
  createdAt: Date;
}

// Staff/Leadership Types
export interface StaffMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  department: StaffDepartment;
}

export type StaffDepartment = 
  | 'leadership'
  | 'administration'
  | 'facilities'
  | 'ministry'
  | 'maintenance'
  | 'security';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common UI Types
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MenuItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: MenuItem[];
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

// Search Types
export interface SearchFilters {
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  capacity?: number;
  amenities?: string[];
}
