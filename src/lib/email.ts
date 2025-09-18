import { Resend } from 'resend';

// Only initialize Resend if API key is available
export const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const EMAIL_CONFIG = {
  from: 'Foursquare Ajebo <noreply@foursquareajebo.org>',
  churchEmail: process.env.CHURCH_EMAIL || 'info@foursquareajebo.org',
  templates: {
    contactForm: {
      subject: 'New Contact Form Submission',
      template: (data: { name: string; email: string; phone?: string; subject: string; message: string }) => `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from Foursquare Ajebo Website Contact Form</em></p>
      `,
    },
    donationConfirmation: {
      subject: 'Thank you for your donation - Foursquare Ajebo',
      template: (data: { name: string; amount: number; donationType: string; transactionId: string }) => `
        <h2>Thank You for Your Generous Donation!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your donation and are deeply grateful for your generosity.</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Donation Details:</h3>
          <p><strong>Amount:</strong> ₦${data.amount.toLocaleString()}</p>
          <p><strong>Type:</strong> ${data.donationType}</p>
          <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Your support helps us continue our mission of spreading God's love and serving our community.</p>
        <p>May God bless you abundantly!</p>
        
        <p>In His Service,<br>
        Foursquare Gospel Church Ajebo</p>
        
        <hr>
        <p><em>This is an automated receipt. Please keep this for your records.</em></p>
      `,
    },
  },
} as const;