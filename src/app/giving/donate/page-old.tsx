'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { donationCategories, formatCurrency, calculateTotalFees, getTotalAmount } from '@/data/donations';
import { DONATION_FREQUENCIES, PAYMENT_METHODS, DEDICATION_TYPES } from '@/types/donations';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DonatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create payment intent
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          donationType: formData.category,
          donorName: formData.anonymous ? undefined : `${formData.donorInfo.firstName} ${formData.donorInfo.lastName}`,
          donorEmail: formData.anonymous ? undefined : formData.donorInfo.email,
          isAnonymous: formData.anonymous,
        }),
      });

      const { clientSecret, paymentIntentId } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      // Get Stripe instance
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // In a real implementation, you'd use Stripe Elements
            // For now, this is a placeholder
          },
          billing_details: {
            name: `${formData.donorInfo.firstName} ${formData.donorInfo.lastName}`,
            email: formData.donorInfo.email,
            phone: formData.donorInfo.phone,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return;
      }

      // Confirm donation completion
      await fetch('/api/donations/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentIntentId }),
      });

      // Redirect to thank you page
      router.push(`/giving/thank-you?amount=${totalAmount}&type=${formData.category}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.amount > 0;
      case 2:
        return formData.donorInfo.firstName && formData.donorInfo.lastName && formData.donorInfo.email;
      case 3:
        return true; // Payment step validation would be more complex in real implementation
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/giving" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Giving
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Make a Donation</h1>
          <p className="text-slate-300">Thank you for your generous heart and faithful giving</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNumber 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-600 text-slate-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`h-1 w-16 ${
                    step > stepNumber ? 'bg-blue-500' : 'bg-slate-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <SpectacularCard className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Amount & Category */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Choose Amount & Category</h2>
                    
                    {/* Category Selection */}
                    <div className="mb-6">
                      <label className="block text-white font-medium mb-3">Giving Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                      >
                        {donationCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                      {selectedCategory && (
                        <p className="text-slate-300 text-sm mt-2">{selectedCategory.description}</p>
                      )}
                    </div>

                    {/* Frequency Selection */}
                    <div className="mb-6">
                      <label className="block text-white font-medium mb-3">Giving Frequency</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {DONATION_FREQUENCIES.map((freq) => (
                          <button
                            key={freq.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, frequency: freq.value })}
                            className={`p-3 rounded-lg border text-center transition-colors ${
                              formData.frequency === freq.value
                                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                : 'border-slate-600 text-slate-300 hover:border-slate-500'
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
                      <label className="block text-white font-medium mb-3">Donation Amount</label>
                      
                      {/* Suggested Amounts */}
                      {selectedCategory && (
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                          {selectedCategory.suggested_amounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handleAmountSelect(amount)}
                              className={`p-3 rounded-lg border font-medium transition-colors ${
                                formData.amount === amount && !formData.customAmount
                                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
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
                          className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
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
                          className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-white">
                          Cover processing fees ({formatCurrency(fees)}) so 100% goes to the ministry
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.donorInfo.firstName}
                          onChange={(e) => setFormData({
                            ...formData,
                            donorInfo: { ...formData.donorInfo, firstName: e.target.value }
                          })}
                          className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.donorInfo.lastName}
                          onChange={(e) => setFormData({
                            ...formData,
                            donorInfo: { ...formData.donorInfo, lastName: e.target.value }
                          })}
                          className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-white font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.donorInfo.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          donorInfo: { ...formData.donorInfo, email: e.target.value }
                        })}
                        className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-medium mb-2">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.donorInfo.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          donorInfo: { ...formData.donorInfo, phone: e.target.value }
                        })}
                        className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Dedication Options */}
                    <div className="mb-6">
                      <label className="flex items-center space-x-3 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          checked={formData.dedication.enabled}
                          onChange={(e) => setFormData({
                            ...formData,
                            dedication: { ...formData.dedication, enabled: e.target.checked }
                          })}
                          className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-white font-medium">Make this donation in honor or memory of someone</span>
                      </label>

                      {formData.dedication.enabled && (
                        <div className="space-y-4 ml-8">
                          <div>
                            <label className="block text-white font-medium mb-2">Dedication Type</label>
                            <select
                              value={formData.dedication.type}
                              onChange={(e) => setFormData({
                                ...formData,
                                dedication: { ...formData.dedication, type: e.target.value as any }
                              })}
                              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                            >
                              {DEDICATION_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label} - {type.description}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Name</label>
                            <input
                              type="text"
                              value={formData.dedication.name}
                              onChange={(e) => setFormData({
                                ...formData,
                                dedication: { ...formData.dedication, name: e.target.value }
                              })}
                              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Message (Optional)</label>
                            <textarea
                              value={formData.dedication.message}
                              onChange={(e) => setFormData({
                                ...formData,
                                dedication: { ...formData.dedication, message: e.target.value }
                              })}
                              rows={3}
                              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Anonymous Option */}
                    <div className="mb-6">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.anonymous}
                          onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                          className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-white">Make this donation anonymous</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
                    
                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <label className="block text-white font-medium mb-3">Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        {PAYMENT_METHODS.map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                            className={`p-4 rounded-lg border text-center transition-colors ${
                              formData.paymentMethod === method.value
                                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                : 'border-slate-600 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            <div className="text-2xl mb-2">{method.icon}</div>
                            <div className="font-medium">{method.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card Information (Mock) */}
                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <label className="block text-white font-medium mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-white font-medium mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Full name on card"
                            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                      <div className="flex items-center text-green-400 mb-2">
                        <span className="mr-2">🔒</span>
                        <span className="font-medium">Secure Payment</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-300 text-center">{error}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <SpectacularButton
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      disabled={isProcessing}
                    >
                      Previous
                    </SpectacularButton>
                  )}
                  
                  <div className="ml-auto">
                    {step < 3 ? (
                      <SpectacularButton
                        onClick={() => setStep(step + 1)}
                        disabled={!isStepValid() || isProcessing}
                      >
                        Next
                      </SpectacularButton>
                    ) : (
                      <SpectacularButton
                        disabled={!isStepValid() || isProcessing}
                      >
                        {isProcessing ? 'Processing... 💫' : 'Complete Donation 💝'}
                      </SpectacularButton>
                    )}
                  </div>
                </div>
              </form>
            </SpectacularCard>
          </div>

          {/* Donation Summary Sidebar */}
          <div className="lg:col-span-1">
            <SpectacularCard className="p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-4">Donation Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Category:</span>
                  <span className="text-white">{selectedCategory?.name}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Frequency:</span>
                  <span className="text-white capitalize">{formData.frequency.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Amount:</span>
                  <span className="text-white">{formatCurrency(formData.amount)}</span>
                </div>
                {formData.coverFees && (
                  <div className="flex justify-between text-slate-300">
                    <span>Processing Fees:</span>
                    <span className="text-white">{formatCurrency(fees)}</span>
                  </div>
                )}
                <div className="border-t border-slate-600 pt-3">
                  <div className="flex justify-between text-white font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {formData.dedication.enabled && (
                <div className="bg-slate-800 p-4 rounded-lg mb-6">
                  <h4 className="text-white font-medium mb-2">Dedication</h4>
                  <p className="text-slate-300 text-sm">
                    {DEDICATION_TYPES.find(t => t.value === formData.dedication.type)?.label}: {formData.dedication.name}
                  </p>
                </div>
              )}

              <div className="text-xs text-slate-400">
                <p className="mb-2">🔒 Your information is secure and encrypted</p>
                <p className="mb-2">📧 Receipt will be sent to your email</p>
                <p>💝 100% tax-deductible donation</p>
              </div>
            </SpectacularCard>
          </div>
        </div>
      </div>
    </div>
  );
}
