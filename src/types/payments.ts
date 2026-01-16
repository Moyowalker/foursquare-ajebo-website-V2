export type PaymentCategory =
  | 'service-charge'
  | 'electricity'
  | 'land-allocation'
  | 'guest-house'
  | 'block-industry'
  | 'school-fees'
  | 'facilities-rental';

export interface PaymentType {
  id: PaymentCategory;
  name: string;
  description: string;
  icon: string;
  minAmount?: number;
  maxAmount?: number;
  requiresDetails?: boolean;
}

export interface PaymentFormData {
  category: PaymentCategory;
  amount: number;
  name: string;
  email: string;
  phone: string;
  details?: string;
  reference?: string;
}

export interface VencoPaymentRequest {
  amount: number;
  currency: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  callbackUrl?: string;
  webhookUrl?: string;
  returnUrl?: string;
  metadata?: Record<string, any>;
}

export interface VencoPaymentResponse {
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  reference: string;
  paymentUrl?: string;
  message: string;
  data?: any;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  category: PaymentCategory;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details?: string;
  vencoTransactionId?: string;
  createdAt: Date;
  completedAt?: Date;
}
