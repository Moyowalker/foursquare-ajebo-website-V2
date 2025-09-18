'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorBoundary, DonationErrorFallback } from '@/components/ui/error-boundary';
import { LoadingButton, LoadingOverlay } from '@/components/ui/loading';
import { Alert, SuccessMessage, ErrorMessage } from '@/components/ui/feedback';
import { useDonation } from '@/hooks/useApi';
import { donationCategories, formatCurrency, calculateTotalFees, getTotalAmount } from '@/data/donations';
import { DONATION_FREQUENCIES, PAYMENT_METHODS, DEDICATION_TYPES } from '@/types/donations';

function DonationFormSection() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: 'tithes',
    amount: 0,
    customAmount: '',
    frequency: 'one-time',
    coverFees: false,
    donorInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    paymentMethod: 'card',
    dedication: {
      enabled: false,
      type: 'in_honor',
      name: '',
      message: '',
    },
    anonymous: false,
  });

  const { processDonation, donationStatus, errorMessage, reset, isProcessing, isSuccess, isError } = useDonation();

  const selectedCategory = donationCategories.find(cat => cat.id === formData.category);
  const fees = calculateTotalFees(formData.amount, formData.coverFees);
  const totalAmount = getTotalAmount(formData.amount, formData.coverFees);

  const handleAmountSelect = (amount: number) => {
    setFormData({ ...formData, amount, customAmount: '' });
  };

  const handleCustomAmount = (value: string) => {
    const amount = parseFloat(value) || 0;
    setFormData({ ...formData, amount, customAmount: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await processDonation({
        amount: totalAmount,
        donationType: formData.category,
        donorName: formData.anonymous ? undefined : `${formData.donorInfo.firstName} ${formData.donorInfo.lastName}`,
        donorEmail: formData.anonymous ? undefined : formData.donorInfo.email,
        isAnonymous: formData.anonymous,
        frequency: formData.frequency,
        dedication: formData.dedication.enabled ? formData.dedication : undefined,
      });

      // Redirect to thank you page on success
      router.push(`/giving/thank-you?amount=${totalAmount}&type=${formData.category}`);
      
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.amount > 0;
      case 2:
        return formData.donorInfo.firstName && formData.donorInfo.lastName && formData.donorInfo.email;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <LoadingOverlay isLoading={isProcessing} message="Processing your donation...">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Amount & Category */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Amount & Category</h2>
                  
                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Giving Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      disabled={isProcessing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                    >
                      {donationCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    {selectedCategory && (
                      <p className="text-gray-600 text-sm mt-2">{selectedCategory.description}</p>
                    )}
                  </div>

                  {/* Frequency Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Giving Frequency</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {DONATION_FREQUENCIES.map((freq) => (
                        <button
                          key={freq.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, frequency: freq.value })}
                          disabled={isProcessing}
                          className={`p-3 rounded-lg border text-center transition-colors disabled:opacity-50 ${
                            formData.frequency === freq.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">{freq.label}</div>
                          <div className="text-xs opacity-75">{freq.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Donation Amount</label>
                    
                    {/* Suggested Amounts */}
                    {selectedCategory && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                        {selectedCategory.suggested_amounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            disabled={isProcessing}
                            className={`p-3 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                              formData.amount === amount && !formData.customAmount
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            ₦{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Custom Amount */}
                    <div>
                      <input
                        type="number"
                        placeholder="Enter custom amount (₦)"
                        value={formData.customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        disabled={isProcessing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                        min="100"
                        step="100"
                      />
                    </div>
                  </div>

                  {/* Cover Fees Option */}
                  <div className="mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.coverFees}
                        onChange={(e) => setFormData({ ...formData, coverFees: e.target.checked })}
                        disabled={isProcessing}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <span className="text-gray-700">
                        Cover processing fees ({formatCurrency(fees)}) so 100% goes to the ministry
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.donorInfo.firstName}
                        onChange={(e) => setFormData({
                          ...formData,
                          donorInfo: { ...formData.donorInfo, firstName: e.target.value }
                        })}
                        disabled={isProcessing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.donorInfo.lastName}
                        onChange={(e) => setFormData({
                          ...formData,
                          donorInfo: { ...formData.donorInfo, lastName: e.target.value }
                        })}
                        disabled={isProcessing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.donorInfo.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        donorInfo: { ...formData.donorInfo, email: e.target.value }
                      })}
                      disabled={isProcessing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.donorInfo.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        donorInfo: { ...formData.donorInfo, phone: e.target.value }
                      })}
                      disabled={isProcessing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  {/* Anonymous Option */}
                  <div className="mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                        disabled={isProcessing}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <span className="text-gray-700">Make this donation anonymous</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  
                  <Alert type="info" title="Demo Mode" className="mb-6">
                    This is a demonstration. No actual payment will be processed.
                  </Alert>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                          disabled={isProcessing}
                          className={`p-4 rounded-lg border text-center transition-colors disabled:opacity-50 ${
                            formData.paymentMethod === method.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-2xl mb-2">{method.icon}</div>
                          <div className="font-medium">{method.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-700 mb-2">
                      <span className="mr-2">🔒</span>
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-green-600 text-sm">
                      Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {isError && (
                <div className="mt-6">
                  <DonationErrorFallback onRetry={reset} />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={isProcessing}
                    className="btn-outline px-6 py-3 disabled:opacity-50"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto">
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={!isStepValid() || isProcessing}
                      className="btn-primary px-6 py-3 disabled:opacity-50"
                    >
                      Next
                    </button>
                  ) : (
                    <LoadingButton
                      type="submit"
                      isLoading={isProcessing}
                      disabled={!isStepValid()}
                      className="btn-primary px-6 py-3"
                    >
                      Complete Donation
                    </LoadingButton>
                  )}
                </div>
              </div>
            </form>
          </LoadingOverlay>
        </div>
      </div>

      {/* Donation Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Category:</span>
              <span className="text-gray-900 font-medium">{selectedCategory?.name}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frequency:</span>
              <span className="text-gray-900 font-medium capitalize">{formData.frequency.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Amount:</span>
              <span className="text-gray-900 font-medium">{formatCurrency(formData.amount)}</span>
            </div>
            {formData.coverFees && (
              <div className="flex justify-between text-gray-600">
                <span>Processing Fees:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(fees)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-gray-900 font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {formData.dedication.enabled && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="text-gray-900 font-medium mb-2">Dedication</h4>
              <p className="text-gray-600 text-sm">
                {DEDICATION_TYPES.find(t => t.value === formData.dedication.type)?.label}: {formData.dedication.name}
              </p>
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>🔒 Your information is secure and encrypted</p>
            <p>📧 Receipt will be sent to your email</p>
            <p>💝 100% tax-deductible donation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/giving" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Giving
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-gray-600">Thank you for your generous heart and faithful giving</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber, index) => (
              <React.Fragment key={stepNumber}>
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-600">
                  {stepNumber}
                </div>
                {index < 2 && (
                  <div className="h-1 w-16 bg-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <ErrorBoundary fallback={<DonationErrorFallback />}>
          <DonationFormSection />
        </ErrorBoundary>
      </div>
    </div>
  );
}