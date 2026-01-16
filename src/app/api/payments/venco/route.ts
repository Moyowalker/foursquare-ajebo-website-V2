import { NextRequest, NextResponse } from 'next/server';
import { formatVencoAmount, getVencoCallbackUrl, getVencoWebhookUrl, initiateVencoPayment, isVencoConfigured, verifyVencoPayment } from '@/lib/venco';
import { PaymentFormData } from '@/types/payments';
import { getPaymentType } from '@/data/payments';
import { resend } from '@/lib/email';
import { findPaymentByReference, upsertPaymentTransaction, updatePaymentStatus } from '@/lib/payment-transactions';

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

    // Initiate Venco payment
    const vencoResponse = await initiateVencoPayment({
      amount: formatVencoAmount(body.amount),
      currency: 'NGN',
      reference: reference,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      description: `${paymentType.name} - Foursquare Gospel Church Ajebo`,
      callbackUrl: getVencoCallbackUrl(),
      webhookUrl: getVencoWebhookUrl(),
      returnUrl: `${request.nextUrl.origin}/giving/thank-you`,
      metadata: {
        category: body.category,
        details: body.details || '',
        paymentType: paymentType.name,
      },
    });

    if (vencoResponse.status === 'failed') {
      return NextResponse.json(
        {
          success: false,
          message: vencoResponse.message || 'Payment initiation failed',
        },
        { status: 500 }
      );
    }

    // Persist transaction (best-effort)
    try {
      await upsertPaymentTransaction({
        reference,
        category: body.category,
        amount: body.amount,
        status: vencoResponse.status === 'failed' ? 'failed' : 'pending',
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        details: body.details || null,
        vencoTransactionId: vencoResponse.transactionId || null,
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
            <p><strong>Transaction ID:</strong> ${vencoResponse.transactionId || 'Pending'}</p>
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
      transactionId: vencoResponse.transactionId,
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
      success: vencoResponse.status !== 'failed',
      message: vencoResponse.message || 'Payment initiated successfully',
      transactionId: vencoResponse.transactionId,
      reference: reference,
      paymentUrl: vencoResponse.paymentUrl,
      isTestMode: !isVencoConfigured(),
      data: vencoResponse.data,
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

// GET /api/payments/venco?transactionId=...  -> verify payment status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transactionId');
    const reference = searchParams.get('reference');

    let resolvedTransactionId = transactionId || '';

    if (!resolvedTransactionId && reference) {
      try {
        const record = await findPaymentByReference(reference);
        resolvedTransactionId = (record?.vencoTransactionId as string) || '';
      } catch (dbError) {
        console.error('Failed to resolve transaction ID:', dbError);
      }
    }

    if (!resolvedTransactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const verification = await verifyVencoPayment(resolvedTransactionId);

    try {
      const normalizedStatus =
        verification.status === 'success' ? 'completed' : verification.status === 'pending' ? 'pending' : 'failed';

      const resolvedReference = verification.reference || reference || '';
      if (resolvedReference) {
        await updatePaymentStatus(resolvedReference, normalizedStatus, resolvedTransactionId);
      }
    } catch (dbError) {
      console.error('Failed to update payment status:', dbError);
    }

    return NextResponse.json({
      success: verification.status !== 'failed',
      status: verification.status,
      message: verification.message,
      transactionId: verification.transactionId,
      reference: verification.reference || reference,
      data: verification.data,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}
