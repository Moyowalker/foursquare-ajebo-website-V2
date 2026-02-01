import crypto from 'crypto';

const PAYSTACK_CONFIG = {
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  subaccount: process.env.PAYSTACK_SUBACCOUNT || '',
  baseUrl: 'https://api.paystack.co',
};

export function isPaystackConfigured() {
  return Boolean(PAYSTACK_CONFIG.secretKey && PAYSTACK_CONFIG.publicKey);
}

export function getPaystackPublicKey() {
  return PAYSTACK_CONFIG.publicKey;
}

export function getPaystackSubaccount() {
  return PAYSTACK_CONFIG.subaccount;
}

export function formatPaystackAmount(amount: number) {
  return Math.round(amount * 100);
}

export function verifyPaystackSignature(payload: string, signature: string | null) {
  if (!PAYSTACK_CONFIG.secretKey || !signature) return false;

  const hash = crypto
    .createHmac('sha512', PAYSTACK_CONFIG.secretKey)
    .update(payload, 'utf8')
    .digest('hex');

  if (hash.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
}

export async function initializePaystackTransaction(payload: {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
  subaccount?: string;
}) {
  if (!PAYSTACK_CONFIG.secretKey) {
    throw new Error('Paystack secret key is not configured');
  }

  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      amount: payload.amount,
      reference: payload.reference,
      callback_url: payload.callbackUrl,
      metadata: payload.metadata || {},
      ...(payload.subaccount ? { subaccount: payload.subaccount } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Paystack initialize failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function verifyPaystackTransaction(reference: string) {
  if (!PAYSTACK_CONFIG.secretKey) {
    throw new Error('Paystack secret key is not configured');
  }

  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Paystack verify failed: ${response.status} ${errorText}`);
  }

  return response.json();
}
