import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { resend, EMAIL_CONFIG } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();
    
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }
    
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is currently unavailable' },
        { status: 503 }
      );
    }
    
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }
    
    // Update donation status in database
    if (supabaseAdmin) {
      const { error: updateError } = await supabaseAdmin
        .from('donations')
        .update({ status: 'completed' })
        .eq('stripe_payment_intent_id', paymentIntentId);
      
      if (updateError) {
        console.error('Failed to update donation status:', updateError);
      }
    }
    
    // Send confirmation email if donor provided email
    const donorEmail = paymentIntent.metadata.donorEmail;
    const donorName = paymentIntent.metadata.donorName;
    const isAnonymous = paymentIntent.metadata.isAnonymous === 'true';
    
    if (!isAnonymous && donorEmail && donorName && resend) {
      try {
        const emailHtml = EMAIL_CONFIG.templates.donationConfirmation.template({
          name: donorName,
          amount: paymentIntent.amount / 100, // Convert from kobo to naira
          donationType: paymentIntent.metadata.donationType,
          transactionId: paymentIntentId,
        });
        
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: [donorEmail],
          subject: EMAIL_CONFIG.templates.donationConfirmation.subject,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your generous donation!',
      donation: {
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        donationType: paymentIntent.metadata.donationType,
        transactionId: paymentIntentId,
      },
    });
    
  } catch (error) {
    console.error('Donation confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm donation. Please contact us for assistance.' },
      { status: 500 }
    );
  }
}