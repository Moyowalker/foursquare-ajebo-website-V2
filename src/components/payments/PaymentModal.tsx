'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { PAYMENT_TYPES, generatePaymentReference } from '@/data/payments';
import { PaymentCategory, PaymentFormData } from '@/types/payments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: PaymentCategory;
}

export default function PaymentModal({
  isOpen,
  onClose,
  initialCategory,
}: PaymentModalProps) {
  const [step, setStep] = useState<'select' | 'form' | 'processing' | 'success'>('select');
  const [formData, setFormData] = useState<PaymentFormData>({
    category: initialCategory || 'service-charge',
    amount: 0,
    name: '',
    email: '',
    phone: '',
    details: '',
  });
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const selectedPaymentType = PAYMENT_TYPES.find((p) => p.id === formData.category);

  const handleCategorySelect = (category: PaymentCategory) => {
    setFormData({ ...formData, category });
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (selectedPaymentType?.minAmount && formData.amount < selectedPaymentType.minAmount) {
      setError(`Minimum amount is ₦${selectedPaymentType.minAmount.toLocaleString()}`);
      return;
    }

    if (selectedPaymentType?.requiresDetails && !formData.details) {
      setError('Please provide additional details for this payment type');
      return;
    }

    setStep('processing');

    try {
      const reference = generatePaymentReference(formData.category);
      const response = await fetch('/api/payments/venco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reference,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTransactionId(result.transactionId);
        
        // If payment URL is provided, redirect to Venco payment page
        if (result.paymentUrl && result.paymentUrl !== '#') {
          window.location.href = result.paymentUrl;
        } else {
          // Test mode - show success
          setStep('success');
        }
      } else {
        setError(result.message || 'Payment initiation failed');
        setStep('form');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setStep('form');
    }
  };

  const handleClose = () => {
    setStep('select');
    setFormData({
      category: initialCategory || 'service-charge',
      amount: 0,
      name: '',
      email: '',
      phone: '',
      details: '',
    });
    setError('');
    setTransactionId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'select' && 'Select Payment Type'}
            {step === 'form' && `Pay ${selectedPaymentType?.name}`}
            {step === 'processing' && 'Processing Payment...'}
            {step === 'success' && 'Payment Successful'}
          </h2>
          {step === 'form' && selectedPaymentType && (
            <p className="text-gray-600 mt-1">{selectedPaymentType.description}</p>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Category Selection */}
          {step === 'select' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYMENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleCategorySelect(type.id)}
                  className="flex items-start text-left p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all"
                >
                  <span className="text-3xl mr-3">{type.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    {type.minAmount && (
                      <p className="text-xs text-gray-500 mt-2">
                        Min: ₦{type.minAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Payment Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  required
                  min={selectedPaymentType?.minAmount || 1}
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter amount"
                />
                {selectedPaymentType?.minAmount && (
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum: ₦{selectedPaymentType.minAmount.toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              {selectedPaymentType?.requiresDetails && (
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="details"
                    required
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="E.g., Meter number, booking dates, student name, etc."
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
              <p className="text-gray-600 mt-4">Processing your payment...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we redirect you to the payment page</p>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Initiated!</h3>
              <p className="text-gray-600 mb-4">
                {transactionId && (
                  <>
                    Transaction ID: <span className="font-mono font-semibold">{transactionId}</span>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                A confirmation receipt has been sent to your email address.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Test Mode:</strong> This is currently running in test mode. 
                  Real payments will be processed once Venco credentials are configured.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
