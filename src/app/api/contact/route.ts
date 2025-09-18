import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { resend, EMAIL_CONFIG } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    // Save to database if Supabase is configured
    if (supabaseAdmin) {
      try {
        const { error: dbError } = await supabaseAdmin
          .from('contact_messages')
          .insert({
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            subject: validatedData.subject,
            message: validatedData.message,
            status: 'new',
          });
        
        if (dbError) {
          console.error('Database error:', dbError);
          // Don't fail the entire request if database save fails
        }
      } catch (dbError) {
        console.error('Database connection error:', dbError);
        // Continue without database save
      }
    } else {
      console.warn('Supabase not configured - skipping database save');
    }
    
    // Send email notification
    try {
      if (!resend) {
        console.warn('Resend not configured - skipping email sending');
        return NextResponse.json({ 
          success: true, 
          message: 'Message received. Email service is currently unavailable, but we will respond soon!' 
        });
      }
      
      const emailHtml = EMAIL_CONFIG.templates.contactForm.template(validatedData);
      
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [EMAIL_CONFIG.churchEmail],
        subject: `Contact Form: ${validatedData.subject}`,
        html: emailHtml,
        replyTo: validatedData.email,
      });
      
      // Send confirmation email to user
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [validatedData.email],
        subject: 'Thank you for contacting Foursquare Ajebo',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Dear ${validatedData.name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>God bless you!</p>
          <p>Foursquare Gospel Church Ajebo</p>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Please check your form data and try again.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}