export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  type: EventType;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  price: number;
  currency: string;
  imageUrl: string;
  images: string[];
  tags: string[];
  organizer: string;
  contact: ContactInfo;
  requirements: string[];
  included: string[];
  ageGroup: AgeGroup;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  status: EventStatus;
  registrationDeadline: Date;
  cancellationPolicy: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export type EventCategory = 
  | 'spiritual-retreat'
  | 'youth-camp'
  | 'family-camp'
  | 'leadership-training'
  | 'worship-service'
  | 'bible-study'
  | 'prayer-meeting'
  | 'community-outreach'
  | 'conference'
  | 'wedding'
  | 'funeral'
  | 'special-event';

export type EventType = 
  | 'camp'
  | 'retreat'
  | 'conference'
  | 'workshop'
  | 'service'
  | 'meeting'
  | 'celebration'
  | 'outreach';

export type AgeGroup = 
  | 'children'
  | 'youth' 
  | 'young-adults'
  | 'adults'
  | 'seniors'
  | 'families'
  | 'all-ages';

export type EventStatus = 
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'cancelled'
  | 'postponed'
  | 'full';

export interface EventRegistration {
  id: string;
  eventId: string;
  attendee: AttendeeInfo;
  registrationDate: Date;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  specialRequests: string;
  emergencyContact: EmergencyContact;
}

export interface AttendeeInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address: Address;
  medicalInfo: string;
  dietaryRestrictions: string[];
  churchMember: boolean;
  churchName: string;
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
  email: string;
}

export type RegistrationStatus = 
  | 'pending'
  | 'confirmed'
  | 'waitlist'
  | 'cancelled'
  | 'no-show';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'partial'
  | 'refunded'
  | 'failed';

export interface EventFilter {
  category?: EventCategory[];
  type?: EventType[];
  ageGroup?: AgeGroup[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  status?: EventStatus[];
  featured?: boolean;
  searchQuery?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: EventCategory;
  color: string;
  textColor: string;
}
