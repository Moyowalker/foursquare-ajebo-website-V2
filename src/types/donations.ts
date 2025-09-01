// Donation System Types for Foursquare Ajebo Church
export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  suggested_amounts: number[];
  target_amount?: number;
  current_amount?: number;
  priority: number;
}

export interface DonationForm {
  category: string;
  amount: number;
  custom_amount?: number;
  frequency: 'one-time' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  donor_info: DonorInfo;
  payment_method: PaymentMethod;
  dedication?: Dedication;
  anonymous: boolean;
  cover_fees: boolean;
}

export interface DonorInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: Address;
  member_id?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'bank' | 'paypal' | 'mobile';
  card_info?: CardInfo;
  bank_info?: BankInfo;
}

export interface CardInfo {
  number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  cardholder_name: string;
}

export interface BankInfo {
  routing_number: string;
  account_number: string;
  account_type: 'checking' | 'savings';
  account_holder_name: string;
}

export interface Dedication {
  type: 'in_honor' | 'in_memory' | 'thanksgiving' | 'prayer_request';
  name: string;
  message?: string;
  notify_family?: boolean;
  family_email?: string;
}

export interface DonationRecord {
  id: string;
  transaction_id: string;
  donor_id: string;
  category: string;
  amount: number;
  fees: number;
  net_amount: number;
  frequency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_method: string;
  dedication?: Dedication;
  anonymous: boolean;
  created_at: string;
  processed_at?: string;
  receipt_sent: boolean;
  tax_deductible: boolean;
}

export interface DonationStats {
  total_raised: number;
  total_donors: number;
  categories: {
    [key: string]: {
      amount: number;
      percentage: number;
      donor_count: number;
    };
  };
  monthly_trends: {
    month: string;
    amount: number;
    donor_count: number;
  }[];
  frequency_breakdown: {
    one_time: number;
    recurring: number;
  };
}

export interface GivingGoal {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: string;
  featured: boolean;
  image_url?: string;
  created_at: string;
}

export const DONATION_FREQUENCIES = [
  { value: 'one-time', label: 'One Time', description: 'Make a single donation' },
  { value: 'weekly', label: 'Weekly', description: 'Give every week' },
  { value: 'monthly', label: 'Monthly', description: 'Give every month' },
  { value: 'quarterly', label: 'Quarterly', description: 'Give every 3 months' },
  { value: 'annual', label: 'Annual', description: 'Give once a year' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
  { value: 'paypal', label: 'PayPal', icon: '💸' },
  { value: 'mobile', label: 'Mobile Payment', icon: '📱' },
] as const;

export const DEDICATION_TYPES = [
  { value: 'in_honor', label: 'In Honor Of', description: 'Celebrate someone special' },
  { value: 'in_memory', label: 'In Memory Of', description: 'Remember a loved one' },
  { value: 'thanksgiving', label: 'Thanksgiving', description: 'Give thanks for blessings' },
  { value: 'prayer_request', label: 'Prayer Request', description: 'Submit a prayer request' },
] as const;
