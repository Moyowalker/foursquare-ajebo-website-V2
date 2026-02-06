'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, FileText, Send } from 'lucide-react';

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

interface FormData {
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

const createConditionBeforeRows = () =>
  Array.from({ length: 5 }, () => ({
    assetDescription: '',
    location: '',
    condition: '',
  }));

const createConditionAfterRows = () =>
  Array.from({ length: 5 }, () => ({
    assetDescription: '',
    location: '',
    natureOfDamage: '',
    estimatedCost: '',
  }));

export default function DamagesToCampAssetsForm() {
  const [formData, setFormData] = useState<FormData>({
    groupName: '',
    programName: '',
    programStartDate: '',
    programEndDate: '',
    facilitiesUsed: Array.from({ length: 10 }, () => ''),
    programCoordinator: '',
    phoneNumber: '',
    emailAddress: '',
    campRepresentative: '',
    inspectionConductedBy: '',
    inspectionDate: '',
    conditionBefore: createConditionBeforeRows(),
    conditionAfter: createConditionAfterRows(),
    damageRecorded: '',
    damageDescription: '',
    likelyCause: '',
    responsibleParty: '',
    recommendedAction: '',
    estimatedTotalCost: '',
    agreedResolution: '',
    declarationProgramName: '',
    declarationProgramSignature: '',
    declarationProgramDate: '',
    declarationBoardName: '',
    declarationBoardSignature: '',
    declarationBoardDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFacilitiesChange = (index: number, value: string) => {
    setFormData((prev) => {
      const nextFacilities = [...prev.facilitiesUsed];
      nextFacilities[index] = value;
      return {
        ...prev,
        facilitiesUsed: nextFacilities,
      };
    });
  };

  const handleConditionBeforeChange = (index: number, field: keyof ConditionBeforeRow, value: string) => {
    setFormData((prev) => {
      const nextRows = [...prev.conditionBefore];
      nextRows[index] = {
        ...nextRows[index],
        [field]: value,
      };
      return {
        ...prev,
        conditionBefore: nextRows,
      };
    });
  };

  const handleConditionAfterChange = (index: number, field: keyof ConditionAfterRow, value: string) => {
    setFormData((prev) => {
      const nextRows = [...prev.conditionAfter];
      nextRows[index] = {
        ...nextRows[index],
        [field]: value,
      };
      return {
        ...prev,
        conditionAfter: nextRows,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forms/damages-to-camp-assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting damages form:', error);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Form Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your damages report has been received. The camp administration will review and follow up
            with the responsible officers listed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-700">FOURSQUARE CAMP DEVELOPMENT BOARD</h1>
                <p className="text-gray-600">Damages to Camp Assets Form</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This form documents any damage observed to camp assets before, during, or after the use of
              camp facilities by any church arm, department, unit, or external group.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">A. PROGRAM / USER DETAILS</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Church Arm / Department / Group *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Program / Event *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.programName}
                  onChange={(e) => handleInputChange('programName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Start Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.programStartDate}
                  onChange={(e) => handleInputChange('programStartDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program End Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.programEndDate}
                  onChange={(e) => handleInputChange('programEndDate', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Facilities Used (list up to 10)</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {formData.facilitiesUsed.map((facility, index) => (
                  <input
                    key={`facility-${index}`}
                    type="text"
                    required={index === 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={`Facility ${index + 1}`}
                    value={facility}
                    onChange={(e) => handleFacilitiesChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">B. RESPONSIBLE OFFICERS</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Coordinator / Leader *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.programCoordinator}
                  onChange={(e) => handleInputChange('programCoordinator', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Camp Representative on Duty *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.campRepresentative}
                  onChange={(e) => handleInputChange('campRepresentative', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">C. ASSET CONDITION ASSESSMENT</h3>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                1. Condition Before Program (completed at handover)
              </h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm font-semibold text-gray-500 mb-2">
                <span>Asset Description</span>
                <span>Location</span>
                <span>Condition</span>
              </div>
              <div className="space-y-3">
                {formData.conditionBefore.map((row, index) => (
                  <div key={`before-${index}`} className="grid md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.assetDescription}
                      onChange={(e) => handleConditionBeforeChange(index, 'assetDescription', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.location}
                      onChange={(e) => handleConditionBeforeChange(index, 'location', e.target.value)}
                    />
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.condition}
                      onChange={(e) => handleConditionBeforeChange(index, 'condition', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inspection Conducted By (Name & Signature) *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.inspectionConductedBy}
                    onChange={(e) => handleInputChange('inspectionConductedBy', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.inspectionDate}
                    onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                2. Condition After Program (completed at handover back to camp)
              </h4>
              <div className="grid md:grid-cols-4 gap-3 text-sm font-semibold text-gray-500 mb-2">
                <span>Asset Description</span>
                <span>Location</span>
                <span>Nature of Damage</span>
                <span>Estimated Cost</span>
              </div>
              <div className="space-y-3">
                {formData.conditionAfter.map((row, index) => (
                  <div key={`after-${index}`} className="grid md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.assetDescription}
                      onChange={(e) => handleConditionAfterChange(index, 'assetDescription', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.location}
                      onChange={(e) => handleConditionAfterChange(index, 'location', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.natureOfDamage}
                      onChange={(e) => handleConditionAfterChange(index, 'natureOfDamage', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={row.estimatedCost}
                      onChange={(e) => handleConditionAfterChange(index, 'estimatedCost', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">D. DAMAGE SUMMARY</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Was any damage recorded? *
                </label>
                <div className="flex items-center gap-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="damageRecorded"
                        value={option}
                        checked={formData.damageRecorded === option}
                        onChange={(e) => handleInputChange('damageRecorded', e.target.value)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If Yes, brief description of damage(s)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.damageDescription}
                  onChange={(e) => handleInputChange('damageDescription', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Likely Cause of Damage *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.likelyCause}
                  onChange={(e) => handleInputChange('likelyCause', e.target.value)}
                >
                  <option value="">Select a cause</option>
                  <option value="Wear & Tear">Wear & Tear</option>
                  <option value="Misuse">Misuse</option>
                  <option value="Accident">Accident</option>
                  <option value="Negligence">Negligence</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">E. RESPONSIBILITY & RESOLUTION</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsible Party (if determined)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.responsibleParty}
                  onChange={(e) => handleInputChange('responsibleParty', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommended Action *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.recommendedAction}
                  onChange={(e) => handleInputChange('recommendedAction', e.target.value)}
                >
                  <option value="">Select an action</option>
                  <option value="Repair">Repair</option>
                  <option value="Replacement">Replacement</option>
                  <option value="Cost Recovery">Cost Recovery</option>
                  <option value="Waived">Waived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Total Cost (₦)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.estimatedTotalCost}
                  onChange={(e) => handleInputChange('estimatedTotalCost', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreed Mode of Resolution
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.agreedResolution}
                  onChange={(e) => handleInputChange('agreedResolution', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">F. DECLARATION</h3>
            <p className="text-sm text-gray-600 mb-6">
              We acknowledge the condition of the camp assets as stated above and agree to abide by the
              camp policies regarding the use and maintenance of camp facilities.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">For the Church Arm / Program</h4>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationProgramName}
                  onChange={(e) => handleInputChange('declarationProgramName', e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder="Signature"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationProgramSignature}
                  onChange={(e) => handleInputChange('declarationProgramSignature', e.target.value)}
                />
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationProgramDate}
                  onChange={(e) => handleInputChange('declarationProgramDate', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">For Foursquare Camp Development Board</h4>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationBoardName}
                  onChange={(e) => handleInputChange('declarationBoardName', e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder="Signature"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationBoardSignature}
                  onChange={(e) => handleInputChange('declarationBoardSignature', e.target.value)}
                />
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.declarationBoardDate}
                  onChange={(e) => handleInputChange('declarationBoardDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="w-6 h-6 text-emerald-600" />
                <p className="text-sm">
                  This form must be completed before program commencement and immediately after
                  conclusion of the program.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
