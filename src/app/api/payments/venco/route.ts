import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { PaymentFormData } from '@/types/payments';
import { getPaymentType } from '@/data/payments';
import { resend } from '@/lib/email';
import { upsertPaymentTransaction, updatePaymentStatus } from '@/lib/payment-transactions';
import { formatPaystackAmount, getPaystackPublicKey, getPaystackSubaccount, initializePaystackTransaction, isPaystackConfigured, verifyPaystackTransaction } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentFormData = await request.json();

    // Validation
    if (!body.category || !body.amount || !body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Validate payment type and minimum amount
    const paymentType = getPaymentType(body.category);
    if (!paymentType) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment category' },
        { status: 400 }
      );
    }

    if (paymentType.minAmount && body.amount < paymentType.minAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum amount for ${paymentType.name} is ₦${paymentType.minAmount.toLocaleString()}`,
        },
        { status: 400 }
      );
    }

    // Check if additional details are required
    if (paymentType.requiresDetails && !body.details) {
      return NextResponse.json(
        {
          success: false,
          message: `Additional details are required for ${paymentType.name}`,
        },
        { status: 400 }
      );
    }

    // Generate reference if not provided
    const reference = body.reference || `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const callbackUrl = `${request.nextUrl.origin}/giving/thank-you`;

    const paystackResponse = await initializePaystackTransaction({
      email: body.email,
      amount: formatPaystackAmount(body.amount),
      reference,
      callbackUrl,
      metadata: {
        category: body.category,
        details: body.details || '',
        paymentType: paymentType.name,
        customerName: body.name,
        customerPhone: body.phone,
      },
      subaccount: getPaystackSubaccount() || undefined,
    });

    if (!paystackResponse?.status) {
      return NextResponse.json(
        {
          success: false,
          message: paystackResponse?.message || 'Payment initiation failed',
        },
        { status: 500 }
      );
    }

    // Persist transaction (best-effort)
    try {
      await upsertPaymentTransaction({
        reference,
        gateway: 'paystack',
        category: body.category,
        amount: body.amount,
        status: 'pending',
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: body.details || null,
        gatewayReference: paystackResponse?.data?.reference || reference,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (dbError) {
      console.error('Failed to persist payment transaction:', dbError);
    }

    // Send confirmation email (best-effort)
    if (resend && body.email) {
      try {
        await resend.emails.send({
          from: 'Foursquare Camp Ajebo <noreply@foursquareajebo.org>',
          to: [body.email],
          subject: `Payment Initiated - ${reference}`,
          html: `
            <h2>Payment Initiated</h2>
            <p>Dear ${body.name},</p>
            <p>Your ${paymentType.name} payment has been initiated successfully.</p>
            <p><strong>Amount:</strong> ₦${body.amount.toLocaleString()}</p>
            <p><strong>Reference:</strong> ${reference}</p>
            <p><strong>Reference:</strong> ${paystackResponse?.data?.reference || reference}</p>
            <p>Please complete your payment in the checkout window.</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    // Log transaction (you can later save this to a database)
    console.log('Payment initiated:', {
      reference: reference,
      category: body.category,
      amount: body.amount,
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: paystackResponse?.message || 'Payment initiated successfully',
      reference: paystackResponse?.data?.reference || reference,
      authorizationUrl: paystackResponse?.data?.authorization_url,
      accessCode: paystackResponse?.data?.access_code,
      publicKey: getPaystackPublicKey(),
      isConfigured: isPaystackConfigured(),
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET /api/payments/venco?reference=...  -> verify payment status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { success: false, message: 'Reference is required' },
        { status: 400 }
      );
    }

    const verification = await verifyPaystackTransaction(reference);

    const status = verification?.data?.status;
    const normalizedStatus = status === 'success' ? 'completed' : status === 'failed' ? 'failed' : 'pending';

    try {
      await updatePaymentStatus(reference, normalizedStatus, reference);
    } catch (dbError) {
      console.error('Failed to update payment status:', dbError);
    }

    return NextResponse.json({
      success: normalizedStatus !== 'failed',
      status: normalizedStatus,
      message: verification?.message || 'Verification complete',
      reference,
      data: verification?.data,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}
