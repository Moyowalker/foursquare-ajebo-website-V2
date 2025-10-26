import { PaymentType } from '@/types/payments';

export const PAYMENT_TYPES: PaymentType[] = [
  {
    id: 'service-charge',
    name: 'Service Charge',
    description: 'Pay your monthly or annual service charges',
    icon: '💳',
    minAmount: 1000,
    requiresDetails: false,
  },
  {
    id: 'electricity',
    name: 'Electricity Vending',
    description: 'Purchase prepaid electricity units',
    icon: '⚡',
    minAmount: 500,
    requiresDetails: true,
  },
  {
    id: 'land-allocation',
    name: 'Land Allocation',
    description: 'Pay for land allocation application and processing',
    icon: '🏞️',
    minAmount: 5000,
    requiresDetails: true,
  },
  {
    id: 'guest-house',
    name: 'Guest House Reservation',
    description: 'Reserve and pay for guest house accommodation',
    icon: '🏠',
    minAmount: 2000,
    requiresDetails: true,
  },
  {
    id: 'block-industry',
    name: 'Block Industry Donations',
    description: 'Support our block-making industry and construction projects',
    icon: '🧱',
    minAmount: 1000,
    requiresDetails: false,
  },
  {
    id: 'school-fees',
    name: 'School Fees',
    description: 'Pay school fees and educational expenses',
    icon: '🎓',
    minAmount: 5000,
    requiresDetails: true,
  },
  {
    id: 'facilities-rental',
    name: 'Facilities Rental',
    description: 'Book and pay for meeting rooms, halls, and event spaces',
    icon: '🏢',
    minAmount: 3000,
    requiresDetails: true,
  },
];

export const getPaymentType = (id: string): PaymentType | undefined => {
  return PAYMENT_TYPES.find((type) => type.id === id);
};

export const generatePaymentReference = (category: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const prefix = category.substring(0, 3).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
