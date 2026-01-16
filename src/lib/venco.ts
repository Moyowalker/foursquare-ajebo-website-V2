import { VencoPaymentRequest, VencoPaymentResponse } from '@/types/payments';
import crypto from 'crypto';

// Venco API Configuration
// TODO: Add your Venco API credentials when available
const VENCO_CONFIG = {
  apiKey: process.env.VENCO_API_KEY || '',
  apiSecret: process.env.VENCO_API_SECRET || '',
  merchantId: process.env.VENCO_MERCHANT_ID || '',
  baseUrl: process.env.VENCO_BASE_URL || 'https://api.venco.com/v1',
  webhookSecret: process.env.VENCO_WEBHOOK_SECRET || process.env.VENCO_API_SECRET || '',
};

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_URL ||
    'http://localhost:3000'
  );
}

export function getVencoCallbackUrl(): string {
  return `${getBaseUrl()}/api/payments/venco/callback`;
}

export function getVencoWebhookUrl(): string {
  return `${getBaseUrl()}/api/payments/venco/webhook`;
}

/**
 * Initialize a Venco payment
 * This function will be updated once Venco integration details are provided
 */
export async function initiateVencoPayment(
  request: VencoPaymentRequest
): Promise<VencoPaymentResponse> {
  // TODO: Replace with actual Venco API integration
  // This is a placeholder implementation
  
  if (!VENCO_CONFIG.apiKey || !VENCO_CONFIG.merchantId) {
    // Return mock response for testing
    return {
      status: 'pending',
      transactionId: `MOCK-${Date.now()}`,
      reference: request.reference,
      paymentUrl: '#', // In production, this will be the Venco payment page URL
      message: 'Payment initiated (TEST MODE - No real transaction)',
      data: {
        mockMode: true,
        note: 'Add VENCO_API_KEY and VENCO_MERCHANT_ID to .env for live payments',
      },
    };
  }

  try {
    // Actual Venco API call (to be implemented with real credentials)
    const response = await fetch(`${VENCO_CONFIG.baseUrl}/payments/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VENCO_CONFIG.apiKey}`,
        'X-Merchant-ID': VENCO_CONFIG.merchantId,
        ...(VENCO_CONFIG.apiSecret ? { 'X-API-SECRET': VENCO_CONFIG.apiSecret } : {}),
      },
      body: JSON.stringify({
        amount: request.amount,
        currency: request.currency,
        reference: request.reference,
        customer: {
          name: request.customerName,
          email: request.customerEmail,
          phone: request.customerPhone,
        },
        description: request.description,
        callback_url: request.callbackUrl || getVencoCallbackUrl(),
        webhook_url: request.webhookUrl || getVencoWebhookUrl(),
        return_url: request.returnUrl || request.callbackUrl || getVencoCallbackUrl(),
        metadata: request.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Venco API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      status: data.status === 'success' ? 'pending' : 'failed',
      transactionId: data.transaction_id || data.transactionId || '',
      reference: data.reference || request.reference,
      paymentUrl: data.payment_url || data.paymentUrl,
      message: data.message || 'Payment initiated successfully',
      data: data,
    };
  } catch (error) {
    console.error('Venco payment error:', error);
    return {
      status: 'failed',
      transactionId: '',
      reference: request.reference,
      message: error instanceof Error ? error.message : 'Payment initiation failed',
    };
  }
}

/**
 * Verify a Venco payment status
 */
export async function verifyVencoPayment(
  transactionId: string
): Promise<VencoPaymentResponse> {
  if (!VENCO_CONFIG.apiKey || !VENCO_CONFIG.merchantId) {
    // Mock verification
    return {
      status: 'success',
      transactionId: transactionId,
      reference: '',
      message: 'Payment verified (TEST MODE)',
      data: { mockMode: true },
    };
  }

  try {
    const response = await fetch(
      `${VENCO_CONFIG.baseUrl}/payments/verify/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VENCO_CONFIG.apiKey}`,
          'X-Merchant-ID': VENCO_CONFIG.merchantId,
          ...(VENCO_CONFIG.apiSecret ? { 'X-API-SECRET': VENCO_CONFIG.apiSecret } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Venco API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      status: data.status || 'failed',
      transactionId: data.transaction_id || transactionId,
      reference: data.reference || '',
      message: data.message || 'Payment verification complete',
      data: data,
    };
  } catch (error) {
    console.error('Venco verification error:', error);
    return {
      status: 'failed',
      transactionId: transactionId,
      reference: '',
      message: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Format amount for Venco (in kobo/cents if required)
 */
export function formatVencoAmount(amount: number): number {
  // Adjust based on Venco's requirements
  // Some payment gateways require amount in smallest currency unit (kobo/cents)
  return Math.round(amount * 100);
}

/**
 * Check if Venco is configured
 */
export function isVencoConfigured(): boolean {
  return !!(VENCO_CONFIG.apiKey && VENCO_CONFIG.merchantId);
}

export function verifyVencoWebhookSignature(
  payload: string,
  signature: string | null
): boolean {
  if (!VENCO_CONFIG.webhookSecret || !signature) {
    return false;
  }

  const computed = crypto
    .createHmac('sha256', VENCO_CONFIG.webhookSecret)
    .update(payload, 'utf8')
    .digest('hex');

  if (computed.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}
