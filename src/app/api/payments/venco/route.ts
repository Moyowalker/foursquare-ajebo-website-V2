import { NextRequest, NextResponse } from 'next/server';
import { initiateVencoPayment, isVencoConfigured } from '@/lib/venco';
import { PaymentFormData } from '@/types/payments';
import { getPaymentType } from '@/data/payments';

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
      amount: body.amount,
      currency: 'NGN',
      reference: reference,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      description: `${paymentType.name} - Foursquare Gospel Church Ajebo`,
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

    // Send confirmation email (optional - you can use your existing email service)
    try {
      await sendPaymentConfirmationEmail({
        ...body,
        reference: reference,
        paymentType: paymentType.name,
        transactionId: vencoResponse.transactionId,
        isTestMode: !isVencoConfigured(),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the payment if email fails
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
      success: true,
      message: 'Payment initiated successfully',
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

// Callback endpoint for Venco webhook
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transaction_id');
    const reference = searchParams.get('reference');
    const status = searchParams.get('status');

    // TODO: Verify the callback signature with Venco credentials
    // TODO: Update transaction status in database
    // TODO: Send receipt email to customer

    console.log('Venco callback received:', {
      transactionId,
      reference,
      status,
      timestamp: new Date().toISOString(),
    });

    // Redirect to success page
    if (status === 'success') {
      return NextResponse.redirect(new URL('/giving/thank-you', request.url));
    } else {
      return NextResponse.redirect(new URL('/?payment=failed', request.url));
    }
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json(
      { success: false, message: 'Callback processing failed' },
      { status: 500 }
    );
  }
}

// Helper function to send confirmation email
async function sendPaymentConfirmationEmail(data: {
  name: string;
  email: string;
  amount: number;
  paymentType: string;
  reference: string;
  transactionId: string;
  details?: string;
  isTestMode: boolean;
}) {
  // Use your existing email service (Resend or similar)
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #dc2626; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        ${data.isTestMode ? '.test-mode { background-color: #fef3c7; padding: 10px; margin: 15px 0; border: 2px solid #f59e0b; }' : ''}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Initiated</h1>
          <p>Foursquare Gospel Church Ajebo</p>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Your payment has been initiated successfully. Here are the details:</p>
          
          ${data.isTestMode ? '<div class="test-mode"><strong>⚠️ TEST MODE:</strong> This is a test transaction. No real payment will be processed.</div>' : ''}
          
          <div class="details">
            <p><strong>Payment Type:</strong> ${data.paymentType}</p>
            <p><strong>Amount:</strong> ₦${data.amount.toLocaleString()}</p>
            <p><strong>Reference:</strong> ${data.reference}</p>
            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
            ${data.details ? `<p><strong>Details:</strong> ${data.details}</p>` : ''}
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>Please complete your payment using the secure payment link provided.</p>
          <p>If you have any questions, please contact us at info@foursquareajebu.org</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Foursquare Gospel Church Ajebo. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // TODO: Integrate with your email service
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'payments@foursquareajebu.org',
  //   to: data.email,
  //   subject: `Payment Initiated - ${data.reference}`,
  //   html: emailHtml,
  // });

  console.log('Email would be sent to:', data.email);
  return true;
}
