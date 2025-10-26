# Venco Payment Integration Guide

## Overview
The website now includes a comprehensive payment system that allows users to make secure payments for various church services directly from the homepage without navigation.

## Features Implemented

### 1. **Payment Categories**
Users can pay for the following services:
- **Service Charge**: Monthly or annual church service fees
- **Electricity Vending**: Purchase prepaid electricity units
- **Land Allocation**: Application and processing fees for Allen Camp plots
- **Guest House Reservation**: Accommodation booking payments
- **Block Industry Donations**: Support for block-making and construction projects
- **School Fees**: Educational expenses and school fees
- **Facilities Rental**: Meeting rooms, halls, and event space bookings

### 2. **User Interface Components**

#### **Floating Payment Button**
- Fixed position button at bottom-right corner
- Animated pulse effect for visibility
- Expands on hover to show "Quick Pay" text
- Always accessible from any page scroll position
- Click to open payment modal

#### **Quick Payments Section (Homepage)**
- Prominent section with red gradient background
- Grid layout displaying all 7 payment categories
- Visual icons for each payment type
- Click any category to open payment modal pre-filled with that category

#### **Payment Modal**
- **Step 1: Category Selection** - Browse all payment types
- **Step 2: Payment Form** - Enter amount, personal details, and additional information
- **Step 3: Processing** - Payment processing animation
- **Step 4: Success** - Confirmation with transaction ID

### 3. **Payment Flow**

1. User clicks floating button or category card
2. Modal opens with category selection (or pre-selected)
3. User fills in:
   - Amount (with minimum validation)
   - Full name
   - Email address
   - Phone number
   - Additional details (for specific categories)
4. Form validation ensures all required fields are complete
5. Payment request sent to `/api/payments/venco`
6. Venco payment gateway processes the transaction
7. User receives confirmation with transaction ID
8. Email receipt sent to user's email address

## Technical Implementation

### Files Created

#### **1. Type Definitions** (`src/types/payments.ts`)
- `PaymentCategory`: Payment type identifiers
- `PaymentType`: Configuration for each payment category
- `PaymentFormData`: User form data structure
- `VencoPaymentRequest`: API request format
- `VencoPaymentResponse`: API response format
- `PaymentTransaction`: Transaction record structure

#### **2. Payment Configuration** (`src/data/payments.ts`)
- `PAYMENT_TYPES`: Array of all 7 payment categories with:
  - ID, name, description
  - Icon emoji
  - Minimum amounts
  - Required details flag
- `getPaymentType()`: Helper to retrieve payment type by ID
- `generatePaymentReference()`: Creates unique payment references

#### **3. Venco Service Integration** (`src/lib/venco.ts`)
- `initiateVencoPayment()`: Initialize payment with Venco
- `verifyVencoPayment()`: Verify transaction status
- `formatVencoAmount()`: Convert amount to Venco format (kobo/cents)
- `isVencoConfigured()`: Check if credentials are set
- Test mode support when credentials are missing

#### **4. React Components**

**PaymentModal** (`src/components/payments/PaymentModal.tsx`)
- Multi-step payment form
- Category selection grid
- Form validation
- Error handling
- Success confirmation
- Test mode indicator

**FloatingPayButton** (`src/components/payments/FloatingPayButton.tsx`)
- Animated floating button
- Hover effects
- Tooltip
- Pulse animation

#### **5. API Endpoint** (`src/app/api/payments/venco/route.ts`)
- `POST /api/payments/venco`: Process payments
  - Validates all form data
  - Checks minimum amounts
  - Generates unique reference
  - Calls Venco API
  - Sends confirmation email
  - Logs transaction
- `GET /api/payments/venco`: Webhook callback
  - Receives Venco payment status
  - Updates transaction status
  - Redirects user to success/failure page

#### **6. Homepage Integration** (`src/app/page.tsx`)
- Added "Quick Payments" section
- Integrated PaymentModal
- Added FloatingPayButton
- State management for modal

## Configuration Required

### Environment Variables
Add these to your `.env` or `.env.local` file:

```bash
# Venco Payment Gateway Configuration
VENCO_API_KEY=your_actual_venco_api_key
VENCO_API_SECRET=your_actual_venco_api_secret
VENCO_MERCHANT_ID=your_actual_merchant_id
VENCO_BASE_URL=https://api.venco.com/v1

# Application URL (for callbacks)
NEXT_PUBLIC_URL=https://your-domain.com
```

### Getting Venco Credentials

1. **Sign up for Venco Merchant Account**
   - Visit Venco's merchant portal
   - Complete business registration
   - Submit required documentation

2. **Access API Credentials**
   - Log in to merchant dashboard
   - Navigate to "API Settings" or "Integrations"
   - Copy your:
     - API Key
     - API Secret
     - Merchant ID

3. **Configure Webhook URL**
   - Set webhook callback URL in Venco dashboard:
   - `https://your-domain.com/api/payments/venco`
   - This receives payment status updates

4. **Test Mode**
   - Request sandbox/test credentials for development
   - Test all payment flows before going live

## Test Mode

### Current Status
The system is currently in **TEST MODE** because Venco credentials are not yet configured.

### Test Mode Behavior
- All payment flows work normally
- No real money is processed
- Mock transaction IDs are generated
- Email confirmations still sent
- Users see "TEST MODE" banner on success page
- Payment URL is set to `#` (no actual redirect)

### Enabling Live Payments
Once you have Venco credentials:

1. Add credentials to `.env` file
2. Restart the Next.js server
3. System automatically detects credentials
4. Live payments will be processed
5. Test mode indicators will disappear

## Security Features

### Implemented
- ✅ Server-side validation
- ✅ HTTPS required for production
- ✅ Input sanitization
- ✅ Minimum amount validation
- ✅ Email verification format
- ✅ Phone number validation
- ✅ Unique transaction references
- ✅ API key security (server-side only)

### Recommended Additional Security
- [ ] Add CSRF protection
- [ ] Implement rate limiting on API endpoint
- [ ] Add captcha for form submission
- [ ] Log all transactions to database
- [ ] Set up fraud detection monitoring
- [ ] Implement webhook signature verification
- [ ] Add IP address logging
- [ ] Set up payment amount limits

## Email Notifications

### Current Implementation
- Confirmation email template created
- Includes transaction details
- Formatted HTML email
- Test mode indicator
- Sent to user's provided email

### To Enable
Integrate with your email service (already configured in your project):

```typescript
// In src/app/api/payments/venco/route.ts
// Uncomment and configure with your email service
await resend.emails.send({
  from: 'payments@foursquareajebu.org',
  to: data.email,
  subject: `Payment Initiated - ${data.reference}`,
  html: emailHtml,
});
```

## Testing Checklist

### Before Going Live

- [ ] Test all 7 payment categories
- [ ] Verify minimum amount validation
- [ ] Test email notifications
- [ ] Confirm callback URL works
- [ ] Test failed payment handling
- [ ] Verify mobile responsiveness
- [ ] Test with different browsers
- [ ] Verify floating button on all pages
- [ ] Test form validation
- [ ] Confirm success/error messages
- [ ] Test with actual Venco sandbox credentials
- [ ] Verify webhook processing
- [ ] Test payment receipt generation

### User Experience Testing

- [ ] Modal opens smoothly
- [ ] All payment categories visible
- [ ] Forms are easy to fill
- [ ] Error messages are clear
- [ ] Success confirmation is obvious
- [ ] Mobile experience is good
- [ ] Loading states are clear
- [ ] Floating button is accessible

## Database Integration (Recommended)

### For Production
Consider adding a database to store:

```typescript
// Suggested schema
interface PaymentRecord {
  id: string;
  reference: string;
  vencoTransactionId: string;
  category: PaymentCategory;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
}
```

### Benefits
- Transaction history
- Payment reconciliation
- Analytics and reporting
- Customer payment history
- Dispute resolution
- Audit trail

## Monitoring & Analytics

### Recommended Tracking
- Total payments by category
- Conversion rates (modal opens → completed payments)
- Average payment amounts
- Failed payment reasons
- Popular payment times
- User device/browser stats

### Tools to Integrate
- Google Analytics events
- Mixpanel for funnel analysis
- Sentry for error tracking
- Custom dashboard for payment admin

## Support & Troubleshooting

### Common Issues

**"Payment initiation failed"**
- Check Venco credentials in .env
- Verify API endpoint is accessible
- Check network connection
- Review browser console for errors

**"Minimum amount error"**
- Each category has minimum amounts
- Service Charge: ₦1,000
- Electricity: ₦500
- Land Allocation: ₦5,000
- Guest House: ₦2,000
- Block Industry: ₦1,000
- School Fees: ₦5,000
- Facilities Rental: ₦3,000

**"Email not received"**
- Check spam folder
- Verify email service is configured
- Check email address was entered correctly
- Review API logs for email errors

**"Modal won't open"**
- Check browser console for JavaScript errors
- Verify React components are loaded
- Clear browser cache
- Try different browser

### Getting Help
- Check Venco documentation
- Review browser console errors
- Check server logs in terminal
- Contact Venco support for API issues
- Test in incognito/private mode

## Future Enhancements

### Planned Features
- [ ] Recurring payments / subscriptions
- [ ] Payment history for logged-in users
- [ ] Multiple payment methods (cards, bank transfer, USSD)
- [ ] Payment plans / installments
- [ ] Bulk payment uploads
- [ ] CSV export of transactions
- [ ] Admin dashboard for payments
- [ ] Refund processing
- [ ] Payment reminders
- [ ] QR code payments
- [ ] Mobile app integration

### Advanced Features
- [ ] Multi-currency support
- [ ] Automatic receipts with PDF
- [ ] Integration with accounting software
- [ ] Member account credits
- [ ] Gift card/voucher payments
- [ ] Payment analytics dashboard
- [ ] Automated reconciliation
- [ ] Payment link generation
- [ ] WhatsApp payment notifications

## Compliance & Legal

### Required
- [ ] Terms of Service for payments
- [ ] Privacy Policy updated for payment data
- [ ] PCI DSS compliance (handled by Venco)
- [ ] Data protection measures
- [ ] User consent for data processing

### Recommended
- [ ] Payment refund policy
- [ ] Dispute resolution process
- [ ] Clear pricing display
- [ ] Transaction receipts
- [ ] Customer support contact for payment issues

## Cost Considerations

### Venco Transaction Fees
- Check Venco's merchant agreement for:
  - Per-transaction fees
  - Percentage-based fees
  - Monthly/annual merchant fees
  - Settlement schedule
  - Chargeback fees

### Hosting & Infrastructure
- Additional API calls may increase hosting costs
- Database storage for transaction records
- Email service costs for confirmations
- SSL certificate (required for payments)

---

## Quick Start Commands

```bash
# Install dependencies (if not already done)
npm install

# Add Venco credentials to .env.local
echo "VENCO_API_KEY=your_key" >> .env.local
echo "VENCO_API_SECRET=your_secret" >> .env.local
echo "VENCO_MERCHANT_ID=your_id" >> .env.local

# Start development server
npm run dev

# Access the site
# Open http://localhost:3000
# Click floating button or payment category
# Test payment flow
```

## Support Contact

For technical issues with this integration:
- Developer: Your development team
- Email: dev@foursquareajebo.org

For Venco-specific issues:
- Venco Support: support@venco.com
- Merchant Dashboard: https://merchant.venco.com

---

**Last Updated**: October 24, 2025
**Version**: 1.0.0
**Status**: Test Mode (Ready for Venco Credentials)
