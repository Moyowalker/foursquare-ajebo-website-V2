import { NextRequest, NextResponse } from 'next/server';
import { verifyVencoWebhookSignature } from '@/lib/venco';
import { updatePaymentStatus } from '@/lib/payment-transactions';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-venco-signature');
    const payload = await request.text();

    if (!verifyVencoWebhookSignature(payload, signature)) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }

    const data = JSON.parse(payload);
    const transactionId = data.transaction_id || data.transactionId || '';
    const reference = data.reference || '';
    const status = data.status || 'failed';

    if (reference) {
      try {
        const normalizedStatus =
          status === 'success' ? 'completed' : status === 'pending' ? 'pending' : 'failed';

        await updatePaymentStatus(reference, normalizedStatus, transactionId || null);
      } catch (dbError) {
        console.error('Webhook DB update failed:', dbError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook processing failed' }, { status: 500 });
  }
}
