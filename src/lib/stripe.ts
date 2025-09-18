import { Stripe } from 'stripe';

// Only initialize Stripe if secret key is available
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null;

export const STRIPE_CONFIG = {
  currency: 'ngn', // Nigerian Naira
  paymentMethods: ['card'],
  donationTypes: {
    tithe: {
      name: 'Tithe',
      description: 'Your faithful tithe to support church ministry',
    },
    offering: {
      name: 'Offering',
      description: 'General offering for church operations',
    },
    special: {
      name: 'Special Offering',
      description: 'Special collections and fundraising',
    },
    building_fund: {
      name: 'Building Fund',
      description: 'Support church construction and maintenance',
    },
  },
} as const;

export type DonationType = keyof typeof STRIPE_CONFIG.donationTypes;