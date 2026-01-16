import { NextRequest, NextResponse } from 'next/server';
import { initializePaystackTransaction, formatPaystackAmount, getPaystackPublicKey } from '@/lib/paystack';
import { upsertPaymentTransaction } from '@/lib/payment-transactions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, name, amount } = body;

    if (!userId || !email || !name || !amount) {
      return NextResponse.json({ success: false, message: 'userId, email, name, amount are required' }, { status: 400 });
    }

    const reference = `WAL-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const paystackResponse = await initializePaystackTransaction({
      email,
      amount: formatPaystackAmount(Number(amount)),
      reference,
      callbackUrl: `${request.nextUrl.origin}/giving/thank-you`,
      metadata: {
        walletTopup: true,
        userId,
        name,
        email,
      },
    });

    if (!paystackResponse?.status) {
      return NextResponse.json({ success: false, message: paystackResponse?.message || 'Topup failed' }, { status: 500 });
    }

    await upsertPaymentTransaction({
      reference,
      gateway: 'paystack',
      category: 'service-charge',
      amount: Number(amount),
      status: 'pending',
      customerName: name,
      customerEmail: email,
      customerPhone: '',
      details: 'Wallet topup',
      gatewayReference: paystackResponse?.data?.reference || reference,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      reference,
      authorizationUrl: paystackResponse?.data?.authorization_url,
      publicKey: getPaystackPublicKey(),
      message: paystackResponse?.message || 'Authorization URL created',
    });
  } catch (error) {
    console.error('Wallet topup error:', error);
    return NextResponse.json({ success: false, message: 'Failed to start topup' }, { status: 500 });
  }
}
