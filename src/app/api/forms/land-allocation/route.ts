import { NextRequest, NextResponse } from 'next/server';

interface LandAllocationFormData {
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  otherNames: string;
  groupName: string;
  currentAddress: string;
  emailAddress: string;
  telephoneNumber: string;
  churchAddress: string;
  complianceAgreement: string;
  confirmationDate: string;
  confirmationLocation: string;
  confirmationPastor: string;
  landAllocation: string[];
  preAllocationLocation: string;
  preAllocationMethod: string;
  completionDate: string;
  developmentUndertaking: string;
  termsAccepted: boolean;
  declarationAccepted: boolean;
  applicantSignature: string;
  submissionDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: LandAllocationFormData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'fullName',
      'dateOfBirth', 
      'placeOfBirth',
      'currentAddress',
      'emailAddress',
      'telephoneNumber',
      'applicantSignature',
      'submissionDate'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof LandAllocationFormData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate checkboxes
    if (!formData.termsAccepted || !formData.declarationAccepted) {
      return NextResponse.json(
        { error: 'You must accept the terms and conditions' },
        { status: 400 }
      );
    }
    
    // Generate application ID
    const applicationId = `LA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create email content for the church
    const churchEmailContent = `
      <h2>New Land Allocation Application</h2>
      <p><strong>Application ID:</strong> ${applicationId}</p>
      <p><strong>Submission Date:</strong> ${new Date(formData.submissionDate).toLocaleDateString()}</p>
      
      <h3>Applicant Information</h3>
      <ul>
        <li><strong>Full Name:</strong> ${formData.fullName}</li>
        <li><strong>Other Names:</strong> ${formData.otherNames || 'N/A'}</li>
        <li><strong>Date of Birth:</strong> ${new Date(formData.dateOfBirth).toLocaleDateString()}</li>
        <li><strong>Place of Birth:</strong> ${formData.placeOfBirth}</li>
        <li><strong>Email:</strong> ${formData.emailAddress}</li>
        <li><strong>Phone:</strong> ${formData.telephoneNumber}</li>
      </ul>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Current Address:</strong> ${formData.currentAddress}</li>
        <li><strong>Church Address:</strong> ${formData.churchAddress || 'N/A'}</li>
        <li><strong>Group Name:</strong> ${formData.groupName || 'N/A'}</li>
      </ul>
      
      <h3>Land Allocation Preferences</h3>
      <ul>
        <li><strong>Preferred Plot Sizes:</strong> ${formData.landAllocation.length > 0 ? formData.landAllocation.join(', ') : 'None selected'}</li>
        <li><strong>Pre-allocation Location:</strong> ${formData.preAllocationLocation || 'N/A'}</li>
        <li><strong>Building Method:</strong> ${formData.preAllocationMethod || 'N/A'}</li>
        <li><strong>Expected Completion:</strong> ${formData.completionDate ? new Date(formData.completionDate).toLocaleDateString() : 'N/A'}</li>
      </ul>
      
      <h3>Confirmation Details</h3>
      <ul>
        <li><strong>Confirmation Date:</strong> ${formData.confirmationDate ? new Date(formData.confirmationDate).toLocaleDateString() : 'N/A'}</li>
        <li><strong>Confirmation Location:</strong> ${formData.confirmationLocation || 'N/A'}</li>
        <li><strong>Confirming Pastor:</strong> ${formData.confirmationPastor || 'N/A'}</li>
      </ul>
      
      <h3>Additional Information</h3>
      <ul>
        <li><strong>Compliance Agreement:</strong> ${formData.complianceAgreement || 'N/A'}</li>
        <li><strong>Development Undertaking:</strong> ${formData.developmentUndertaking || 'N/A'}</li>
      </ul>
      
      <h3>Declaration</h3>
      <ul>
        <li><strong>Terms Accepted:</strong> ${formData.termsAccepted ? 'Yes' : 'No'}</li>
        <li><strong>Declaration Accepted:</strong> ${formData.declarationAccepted ? 'Yes' : 'No'}</li>
        <li><strong>Digital Signature:</strong> ${formData.applicantSignature}</li>
      </ul>
    `;
    
    // Create confirmation email for applicant
    const applicantEmailContent = `
      <h2>Land Allocation Application Received</h2>
      <p>Dear ${formData.fullName},</p>
      
      <p>Thank you for submitting your land allocation application to the Foursquare City Development Board.</p>
      
      <p><strong>Application ID:</strong> ${applicationId}</p>
      <p><strong>Submission Date:</strong> ${new Date(formData.submissionDate).toLocaleDateString()}</p>
      
      <h3>Next Steps:</h3>
      <ul>
        <li>Your application will be reviewed by the development board</li>
        <li>You will be contacted within 7-14 business days</li>
        <li>Please keep your application ID for reference</li>
        <li>Ensure you have all required documents ready for the next phase</li>
      </ul>
      
      <p><strong>Contact Information:</strong></p>
      <p>For inquiries about your application, please contact:<br>
      Email: development@foursquarecampajebo.org<br>
      Phone: +234 703 219 2546</p>
      
      <p>God bless you,<br>
      Foursquare City Development Board</p>
    `;
    
    // Send emails using your existing email service
    try {
      // Email to church administration
      const churchEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: ['development@foursquarecampajebo.org', 'admin@foursquarecampajebo.org'],
          subject: `New Land Allocation Application - ${formData.fullName}`,
          html: churchEmailContent,
        }),
      });
      
      // Confirmation email to applicant
      const applicantEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: [formData.emailAddress],
          subject: `Land Allocation Application Confirmation - ${applicationId}`,
          html: applicantEmailContent,
        }),
      });
      
      console.log('Church email sent:', churchEmailResponse.ok);
      console.log('Applicant email sent:', applicantEmailResponse.ok);
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with success response even if email fails
    }
    
    // TODO: Save to database if you have one configured
    // await saveToDatabase(formData, applicationId);
    
    return NextResponse.json({
      success: true,
      message: 'Land allocation application submitted successfully',
      applicationId: applicationId,
      submissionDate: formData.submissionDate
    });
    
  } catch (error) {
    console.error('Error processing land allocation form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}