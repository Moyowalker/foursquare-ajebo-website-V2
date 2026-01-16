import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackSignature } from '@/lib/paystack';
import { updatePaymentStatus } from '@/lib/payment-transactions';
import { creditWallet } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-paystack-signature');
    const payload = await request.text();

    if (!verifyPaystackSignature(payload, signature)) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(payload);
    const reference = event?.data?.reference || '';
    const status = event?.data?.status || 'failed';
    const metadata = event?.data?.metadata || {};

    if (reference) {
      const normalizedStatus = status === 'success' ? 'completed' : status === 'failed' ? 'failed' : 'pending';
      await updatePaymentStatus(reference, normalizedStatus, reference);
    }

    if (metadata?.walletTopup && status === 'success') {
      const amount = (event?.data?.amount || 0) / 100;
      await creditWallet({
        userId: metadata.userId,
        email: metadata.email,
        name: metadata.name,
        amount,
        reference,
        source: 'paystack',
        description: 'Wallet topup',
        metadata: { paystack: event.data },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook processing failed' }, { status: 500 });
  }
}
