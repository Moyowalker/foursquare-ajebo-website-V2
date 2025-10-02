'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  // Applicant Information
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  otherNames: string;
  
  // Group/Employment Information
  groupName: string;
  currentAddress: string;
  
  // Contact Information
  emailAddress: string;
  telephoneNumber: string;
  churchAddress: string;
  
  // Compliance Information
  complianceAgreement: string;
  
  // Confirmation Details
  confirmationDate: string;
  confirmationLocation: string;
  confirmationPastor: string;
  
  // Land Allocation Preferences
  landAllocation: string[];
  
  // Pre-allocation Location
  preAllocationLocation: string;
  preAllocationMethod: string;
  completionDate: string;
  
  // Development Undertaking
  developmentUndertaking: string;
  
  // Terms Agreement
  termsAccepted: boolean;
  declarationAccepted: boolean;
  
  // Signature
  applicantSignature: string;
  submissionDate: string;
}

export default function LandAllocationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    otherNames: '',
    groupName: '',
    currentAddress: '',
    emailAddress: '',
    telephoneNumber: '',
    churchAddress: '',
    complianceAgreement: '',
    confirmationDate: '',
    confirmationLocation: '',
    confirmationPastor: '',
    landAllocation: [],
    preAllocationLocation: '',
    preAllocationMethod: '',
    completionDate: '',
    developmentUndertaking: '',
    termsAccepted: false,
    declarationAccepted: false,
    applicantSignature: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLandAllocationChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      landAllocation: checked 
        ? [...prev.landAllocation, value]
        : prev.landAllocation.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forms/land-allocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      alert('Failed to submit application. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your land allocation application has been received successfully. 
            You will be contacted within 7-14 business days regarding the next steps.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  FOURSQUARE CITY DEVELOPMENT BOARD
                </h1>
                <p className="text-gray-600">(Foursquare Gospel Church in Nigeria)</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mt-4">
              ALLEN CAMP LAND/HOUSE ALLOCATION FORM
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Applicant Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              APPLICANT INFORMATION
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Names
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.otherNames}
                  onChange={(e) => handleInputChange('otherNames', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Group/Employment Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              GROUP/EMPLOYMENT INFORMATION
            </h3>
            
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address for Correspondence *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              CONTACT INFORMATION
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.telephoneNumber}
                  onChange={(e) => handleInputChange('telephoneNumber', e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Church Address
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.churchAddress}
                  onChange={(e) => handleInputChange('churchAddress', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Compliance Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              COMPLIANCE INFORMATION
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Agreement Details
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide details about compliance with church regulations and guidelines..."
                value={formData.complianceAgreement}
                onChange={(e) => handleInputChange('complianceAgreement', e.target.value)}
              />
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              CONFIRMATION DETAILS
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmationDate}
                  onChange={(e) => handleInputChange('confirmationDate', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmationLocation}
                  onChange={(e) => handleInputChange('confirmationLocation', e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirming Pastor
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmationPastor}
                  onChange={(e) => handleInputChange('confirmationPastor', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Land Allocation */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              LAND ALLOCATION PREFERENCE
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Plot Size
                </label>
                <div className="space-y-2">
                  {['One (1) Plot', '2 Plots (Half)', '3 Plots (Half)', '4 and Above'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                        checked={formData.landAllocation.includes(option)}
                        onChange={(e) => handleLandAllocationChange(option, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pre-allocation Location
                </label>
                <div className="space-y-2">
                  {['Block A', 'Block B - 1st Gateway', '3 Plots Gateway', 'Any Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="preAllocationLocation"
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                        value={option}
                        checked={formData.preAllocationLocation === option}
                        onChange={(e) => handleInputChange('preAllocationLocation', e.target.value)}
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Building Schedule */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              BUILDING SCHEDULE/ALLOCATION
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Method
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.preAllocationMethod}
                  onChange={(e) => handleInputChange('preAllocationMethod', e.target.value)}
                >
                  <option value="">Select building method</option>
                  <option value="Self Build">Self Build</option>
                  <option value="Contract">Contract</option>
                  <option value="Church Support">Church Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Completion Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Development Undertaking */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              DEVELOPMENT UNDERTAKING
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Development Plans and Commitments
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your development plans and commitments for the allocated land..."
                value={formData.developmentUndertaking}
                onChange={(e) => handleInputChange('developmentUndertaking', e.target.value)}
              />
            </div>
          </div>

          {/* Terms of Allocation */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              TERMS OF ALLOCATION
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Please read carefully:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• All allocations are subject to church leadership approval and available plots.</li>
                  <li>• Payment terms and construction guidelines must be strictly followed.</li>
                  <li>• The allocated land remains church property and cannot be sold or transferred without church approval.</li>
                  <li>• Building must commence within the agreed timeframe and follow church architectural guidelines.</li>
                  <li>• Failure to comply with terms may result in reallocation of the plot.</li>
                </ul>
              </div>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to all terms and conditions of land allocation *
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                  checked={formData.declarationAccepted}
                  onChange={(e) => handleInputChange('declarationAccepted', e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  I declare that all information provided is true and accurate *
                </span>
              </label>
            </div>
          </div>

          {/* Signature */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              SIGNATURE
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Signature (Full Name) *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your full name as digital signature"
                  value={formData.applicantSignature}
                  onChange={(e) => handleInputChange('applicantSignature', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.submissionDate}
                  onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}