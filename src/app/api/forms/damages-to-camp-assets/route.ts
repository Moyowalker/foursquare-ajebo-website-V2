import { NextRequest, NextResponse } from 'next/server';

interface ConditionBeforeRow {
  assetDescription: string;
  location: string;
  condition: string;
}

interface ConditionAfterRow {
  assetDescription: string;
  location: string;
  natureOfDamage: string;
  estimatedCost: string;
}

interface DamagesFormData {
  groupName: string;
  programName: string;
  programStartDate: string;
  programEndDate: string;
  facilitiesUsed: string[];
  programCoordinator: string;
  phoneNumber: string;
  emailAddress: string;
  campRepresentative: string;
  inspectionConductedBy: string;
  inspectionDate: string;
  conditionBefore: ConditionBeforeRow[];
  conditionAfter: ConditionAfterRow[];
  damageRecorded: string;
  damageDescription: string;
  likelyCause: string;
  responsibleParty: string;
  recommendedAction: string;
  estimatedTotalCost: string;
  agreedResolution: string;
  declarationProgramName: string;
  declarationProgramSignature: string;
  declarationProgramDate: string;
  declarationBoardName: string;
  declarationBoardSignature: string;
  declarationBoardDate: string;
}

const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString() : 'N/A');

export async function POST(request: NextRequest) {
  try {
    const formData: DamagesFormData = await request.json();

    const requiredFields = [
      'groupName',
      'programName',
      'programStartDate',
      'programEndDate',
      'programCoordinator',
      'phoneNumber',
      'emailAddress',
      'campRepresentative',
      'inspectionConductedBy',
      'inspectionDate',
      'damageRecorded',
      'likelyCause',
      'recommendedAction',
      'declarationProgramName',
      'declarationProgramSignature',
      'declarationProgramDate',
      'declarationBoardName',
      'declarationBoardSignature',
      'declarationBoardDate',
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof DamagesFormData]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const hasFacility = (formData.facilitiesUsed || []).some((facility) => facility?.trim());
    if (!hasFacility) {
      return NextResponse.json({ error: 'At least one facility must be listed.' }, { status: 400 });
    }

    if (!['Yes', 'No'].includes(formData.damageRecorded)) {
      return NextResponse.json({ error: 'Damage recorded must be Yes or No.' }, { status: 400 });
    }

    const reportId = `DAMAGE-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const conditionBeforeRows = (formData.conditionBefore || [])
      .filter((row) => row.assetDescription || row.location || row.condition)
      .map(
        (row, index) =>
          `<tr><td>${index + 1}</td><td>${row.assetDescription || 'N/A'}</td><td>${row.location || 'N/A'}</td><td>${row.condition || 'N/A'}</td></tr>`
      )
      .join('');

    const conditionAfterRows = (formData.conditionAfter || [])
      .filter((row) => row.assetDescription || row.location || row.natureOfDamage || row.estimatedCost)
      .map(
        (row, index) =>
          `<tr><td>${index + 1}</td><td>${row.assetDescription || 'N/A'}</td><td>${row.location || 'N/A'}</td><td>${row.natureOfDamage || 'N/A'}</td><td>${row.estimatedCost || 'N/A'}</td></tr>`
      )
      .join('');

    const churchEmailContent = `
      <h2>Damages to Camp Assets Report</h2>
      <p><strong>Report ID:</strong> ${reportId}</p>
      <p><strong>Program Dates:</strong> ${formatDate(formData.programStartDate)} - ${formatDate(formData.programEndDate)}</p>

      <h3>Program / User Details</h3>
      <ul>
        <li><strong>Church Arm / Department / Group:</strong> ${formData.groupName}</li>
        <li><strong>Program / Event:</strong> ${formData.programName}</li>
        <li><strong>Facilities Used:</strong> ${(formData.facilitiesUsed || []).filter((facility) => facility?.trim()).join(', ')}</li>
      </ul>

      <h3>Responsible Officers</h3>
      <ul>
        <li><strong>Program Coordinator:</strong> ${formData.programCoordinator}</li>
        <li><strong>Phone Number:</strong> ${formData.phoneNumber}</li>
        <li><strong>Email Address:</strong> ${formData.emailAddress}</li>
        <li><strong>Camp Representative on Duty:</strong> ${formData.campRepresentative}</li>
      </ul>

      <h3>Condition Before Program</h3>
      <p><strong>Inspection Conducted By:</strong> ${formData.inspectionConductedBy}</p>
      <p><strong>Inspection Date:</strong> ${formatDate(formData.inspectionDate)}</p>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr><th>S/N</th><th>Asset Description</th><th>Location</th><th>Condition</th></tr>
        </thead>
        <tbody>
          ${conditionBeforeRows || '<tr><td colspan="4">No entries</td></tr>'}
        </tbody>
      </table>

      <h3>Condition After Program</h3>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr><th>S/N</th><th>Asset Description</th><th>Location</th><th>Nature of Damage</th><th>Estimated Cost</th></tr>
        </thead>
        <tbody>
          ${conditionAfterRows || '<tr><td colspan="5">No entries</td></tr>'}
        </tbody>
      </table>

      <h3>Damage Summary</h3>
      <ul>
        <li><strong>Damage Recorded:</strong> ${formData.damageRecorded}</li>
        <li><strong>Description:</strong> ${formData.damageDescription || 'N/A'}</li>
        <li><strong>Likely Cause:</strong> ${formData.likelyCause}</li>
      </ul>

      <h3>Responsibility & Resolution</h3>
      <ul>
        <li><strong>Responsible Party:</strong> ${formData.responsibleParty || 'N/A'}</li>
        <li><strong>Recommended Action:</strong> ${formData.recommendedAction}</li>
        <li><strong>Estimated Total Cost:</strong> ${formData.estimatedTotalCost || 'N/A'}</li>
        <li><strong>Agreed Mode of Resolution:</strong> ${formData.agreedResolution || 'N/A'}</li>
      </ul>

      <h3>Declaration</h3>
      <ul>
        <li><strong>Program Name:</strong> ${formData.declarationProgramName}</li>
        <li><strong>Program Signature:</strong> ${formData.declarationProgramSignature}</li>
        <li><strong>Program Date:</strong> ${formatDate(formData.declarationProgramDate)}</li>
        <li><strong>Board Name:</strong> ${formData.declarationBoardName}</li>
        <li><strong>Board Signature:</strong> ${formData.declarationBoardSignature}</li>
        <li><strong>Board Date:</strong> ${formatDate(formData.declarationBoardDate)}</li>
      </ul>
    `;

    const applicantEmailContent = `
      <h2>Damages to Camp Assets Report Received</h2>
      <p>Dear ${formData.programCoordinator},</p>
      <p>Your damages report has been received by the camp administration.</p>
      <p><strong>Report ID:</strong> ${reportId}</p>
      <p><strong>Program:</strong> ${formData.programName}</p>
      <p><strong>Dates:</strong> ${formatDate(formData.programStartDate)} - ${formatDate(formData.programEndDate)}</p>
      <p>We will review the report and follow up with the responsible officers if needed.</p>
      <p>Thank you,<br />Foursquare Camp Development Board</p>
    `;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: ['admin@foursquarecampajebo.org', 'development@foursquarecampajebo.org'],
          subject: `Damages to Camp Assets Report - ${formData.programName}`,
          html: churchEmailContent,
        }),
      });

      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: [formData.emailAddress],
          subject: `Damages Report Confirmation - ${reportId}`,
          html: applicantEmailContent,
        }),
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Damages report submitted successfully',
      reportId,
    });
  } catch (error) {
    console.error('Error processing damages form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
