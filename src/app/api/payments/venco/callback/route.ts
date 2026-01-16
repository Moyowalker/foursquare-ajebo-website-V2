import { NextRequest, NextResponse } from 'next/server';
import { verifyVencoPayment } from '@/lib/venco';
import { updatePaymentStatus } from '@/lib/payment-transactions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transaction_id') || searchParams.get('transactionId') || '';
    const reference = searchParams.get('reference') || '';

    if (!transactionId) {
      return NextResponse.redirect(new URL('/?payment=failed', request.url));
    }

    const verification = await verifyVencoPayment(transactionId);

    try {
      const normalizedStatus =
        verification.status === 'success' ? 'completed' : verification.status === 'pending' ? 'pending' : 'failed';

      const resolvedReference = verification.reference || reference;
      if (resolvedReference) {
        await updatePaymentStatus(resolvedReference, normalizedStatus, transactionId);
      }
    } catch (dbError) {
      console.error('Callback update failed:', dbError);
    }

    if (verification.status === 'success') {
      return NextResponse.redirect(new URL('/giving/thank-you', request.url));
    }

    return NextResponse.redirect(new URL('/?payment=failed', request.url));
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/?payment=failed', request.url));
  }
}
