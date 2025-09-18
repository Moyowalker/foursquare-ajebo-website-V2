import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Donation form validation schema
export const donationFormSchema = z.object({
  amount: z.number().min(100, 'Minimum donation amount is ₦100'),
  donationType: z.enum(['tithe', 'offering', 'special', 'building_fund']),
  donorName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  donorEmail: z.string().email('Please enter a valid email address').optional(),
  isAnonymous: z.boolean().default(false),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;

// Event registration validation schema
export const eventRegistrationSchema = z.object({
  eventId: z.string().uuid(),
  attendeeName: z.string().min(2, 'Name must be at least 2 characters'),
  attendeeEmail: z.string().email('Please enter a valid email address'),
  attendeePhone: z.string().optional(),
  specialRequests: z.string().optional(),
});

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>;

// Member registration validation schema
export const memberRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().refine((date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }, 'Please enter a valid date'),
  address: z.string().min(10, 'Please enter your full address'),
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name required'),
    phone: z.string().min(10, 'Emergency contact phone required'),
    relationship: z.string().min(2, 'Relationship required'),
  }),
  previousChurch: z.string().optional(),
  baptized: z.boolean(),
  bornAgain: z.boolean(),
  membershipType: z.enum(['regular', 'youth', 'children']),
});

export type MemberRegistrationData = z.infer<typeof memberRegistrationSchema>;