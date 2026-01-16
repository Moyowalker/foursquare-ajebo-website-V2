import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { verifyPaystackTransaction } from '@/lib/paystack';
import { creditWallet } from '@/lib/wallet';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    if (!reference || !userId || !email || !name) {
      return NextResponse.json({ success: false, message: 'reference, userId, email, name are required' }, { status: 400 });
    }

    const verification = await verifyPaystackTransaction(reference);
    const status = verification?.data?.status;

    if (status !== 'success') {
      return NextResponse.json({ success: false, status, message: verification?.message || 'Payment not completed' });
    }

    const amount = (verification?.data?.amount || 0) / 100;

    const wallet = await creditWallet({
      userId,
      email,
      name,
      amount,
      reference,
      source: 'paystack',
      description: 'Wallet topup',
      metadata: { paystack: verification?.data },
    });

    return NextResponse.json({ success: true, status: 'success', wallet });
  } catch (error) {
    console.error('Wallet verify error:', error);
    return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 500 });
  }
}
