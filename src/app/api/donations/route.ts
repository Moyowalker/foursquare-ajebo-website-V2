import { NextRequest, NextResponse } from 'next/server';
import { donationFormSchema } from '@/lib/validations';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the donation data
    const validatedData = donationFormSchema.parse(body);
    
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Convert to kobo (Nigerian currency cents)
      currency: STRIPE_CONFIG.currency,
      payment_method_types: STRIPE_CONFIG.paymentMethods,
      metadata: {
        donationType: validatedData.donationType,
        donorName: validatedData.donorName || 'Anonymous',
        donorEmail: validatedData.donorEmail || '',
        isAnonymous: validatedData.isAnonymous.toString(),
      },
    });
    
    // Save donation record to database
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('donations')
        .insert({
          donor_name: validatedData.isAnonymous ? null : validatedData.donorName,
          donor_email: validatedData.isAnonymous ? null : validatedData.donorEmail,
          amount: validatedData.amount,
          currency: STRIPE_CONFIG.currency,
          donation_type: validatedData.donationType,
          stripe_payment_intent_id: paymentIntent.id,
          status: 'pending',
        });
      
      if (dbError) {
        console.error('Database error:', dbError);
        // Continue with payment intent creation even if database fails
      }
    }
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
    
  } catch (error) {
    console.error('Donation creation error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Please check your donation details and try again.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process donation. Please try again later.' },
      { status: 500 }
    );
  }
}