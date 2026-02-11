import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/email';

interface BookingRequestPayload {
  propertyName?: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  phone: string;
  email: string;
  additionalNotes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequestPayload = await request.json();

    const requiredFields: (keyof BookingRequestPayload)[] = [
      'checkIn',
      'checkOut',
      'guests',
      'name',
      'phone',
      'email',
    ];

    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && !body[field]?.trim())) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const emailHtml = `
      <h2>New Accommodation Booking Request</h2>
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Property:</strong> ${body.propertyName || 'Not specified'}</p>
      <p><strong>Check-in:</strong> ${body.checkIn}</p>
      <p><strong>Check-out:</strong> ${body.checkOut}</p>
      <p><strong>Guests:</strong> ${body.guests}</p>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Additional notes:</strong> ${body.additionalNotes || 'None'}</p>
    `;

    const confirmationHtml = `
      <h2>Booking Request Received</h2>
      <p>Dear ${body.name},</p>
      <p>We have received your accommodation booking request and will confirm availability shortly.</p>
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Property:</strong> ${body.propertyName || 'Not specified'}</p>
      <p><strong>Check-in:</strong> ${body.checkIn}</p>
      <p><strong>Check-out:</strong> ${body.checkOut}</p>
      <p><strong>Guests:</strong> ${body.guests}</p>
      <p>Thank you for choosing Foursquare Camp.</p>
    `;

    if (!resend) {
      console.warn('Resend not configured - skipping email send');
      return NextResponse.json({ success: true, message: 'Booking received' });
    }

    const toAdmin = 'bookings@foursquarecamp.org.ng';

    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [toAdmin],
      subject: `Booking Request - ${body.propertyName || 'Accommodation'} (${bookingId})`,
      html: emailHtml,
      replyTo: body.email,
    });

    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [body.email],
      subject: `We received your booking request (${bookingId})`,
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    console.error('Accommodation booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
