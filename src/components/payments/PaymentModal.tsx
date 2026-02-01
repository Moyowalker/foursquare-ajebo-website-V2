'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PAYMENT_TYPES, generatePaymentReference } from '@/data/payments';
import { PaymentCategory, PaymentFormData } from '@/types/payments';
import type { User } from '@/types/auth';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void } | undefined;
    };
  }
}

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
  const [step, setStep] = useState<'select' | 'form' | 'processing' | 'success' | 'failed'>('select');
  const [formData, setFormData] = useState<PaymentFormData>({
    category: initialCategory || 'service-charge',
    amount: 0,
    name: '',
    email: '',
    phone: '',
    details: '',
  });
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isPaystackReady, setIsPaystackReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletUser, setWalletUser] = useState<User | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [isWalletPaying, setIsWalletPaying] = useState(false);

  const selectedPaymentType = PAYMENT_TYPES.find((p) => p.id === formData.category);

  const handleCategorySelect = (category: PaymentCategory) => {
    setFormData({ ...formData, category });
    setStep('form');
  };

  const checkPaymentStatus = async () => {
    if (!reference) return;

    try {
      const response = await fetch(`/api/payments/paystack?reference=${encodeURIComponent(reference)}`);
      const result = await response.json();

      if (result.status === 'success' || result.status === 'completed' || result.success === true) {
        setVerificationMessage('Payment verified. Thank you!');
        setStep('success');
        return true;
      }

      if (result.status === 'failed' || result.success === false) {
        setError(result.message || 'Payment failed. Please try again.');
        setStep('failed');
        return true;
      }

      setVerificationMessage('Payment is still processing. Please complete the checkout.');
      return false;
    } catch (verifyError) {
      setVerificationMessage('Unable to confirm payment status yet. Please try again shortly.');
      return false;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    if (window.PaystackPop) {
      setIsPaystackReady(true);
      return;
    }

    const scriptId = 'paystack-inline';
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setIsPaystackReady(true);
    script.onerror = () => setError('Unable to load Paystack checkout. Please try again.');
    document.body.appendChild(script);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const userData = localStorage.getItem('user');
    if (!userData) {
      setWalletUser(null);
      setWalletBalance(0);
      return;
    }

    const parsedUser = JSON.parse(userData) as User;
    setWalletUser(parsedUser);
    setIsWalletLoading(true);

    const fetchWallet = async () => {
      try {
        const response = await fetch(`/api/wallet?userId=${parsedUser.id}&email=${encodeURIComponent(parsedUser.email)}&name=${encodeURIComponent(`${parsedUser.firstName} ${parsedUser.lastName}`)}`);
        const result = await response.json();
        if (result.success) {
          setWalletBalance(Number(result.wallet?.balance || 0));
        }
      } catch {
        setWalletBalance(0);
      } finally {
        setIsWalletLoading(false);
      }
    };

    fetchWallet();
  }, [isOpen]);

  useEffect(() => {
    if (step !== 'processing' || !reference) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 12;

    const poll = async () => {
      if (cancelled) return;
      attempts += 1;
      const completed = await checkPaymentStatus();

      if (!completed && attempts < maxAttempts) {
        setTimeout(poll, 5000);
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [step, reference]);

  useEffect(() => {
    if (!reference) return;

    const resolveFromStorage = () => {
      const stored = localStorage.getItem('payment:status');
      if (!stored) return;

      try {
        const payload = JSON.parse(stored) as { reference?: string; status?: string };
        if (payload.reference !== reference) return;

        if (payload.status === 'success' || payload.status === 'completed') {
          setVerificationMessage('Payment confirmed in another tab.');
          setStep('success');
        }

        if (payload.status === 'failed') {
          setError('Payment failed. Please try again.');
          setStep('failed');
        }
      } catch {
        /* ignore malformed storage payload */
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'payment:status') return;
      resolveFromStorage();
    };

    resolveFromStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [reference]);

  useEffect(() => {
    if (step !== 'processing' || !reference) return;

    const handleFocus = () => {
      void checkPaymentStatus();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void checkPaymentStatus();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [step, reference]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    setVerificationMessage('');

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

    try {
      const reference = generatePaymentReference(formData.category);
      if (!isPaystackReady) {
        setError('Payment system is still loading. Please try again in a moment.');
        return;
      }

      setIsSubmitting(true);

      const response = await fetch('/api/payments/paystack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reference,
        }),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        const message = result?.message || `Payment request failed (${response.status}).`;
        setError(message);
        setStep('form');
        return;
      }

      if (result?.success) {
        const paystackKey = result.publicKey || '';
        const paystackReference = result.reference || reference;
        const authorizationUrl = result.authorizationUrl || '';

        setReference(paystackReference);
        setStep('processing');

        if (!paystackKey) {
          if (authorizationUrl) {
            window.open(authorizationUrl, '_blank', 'noopener,noreferrer');
            setVerificationMessage('Checkout opened in a new tab. Complete payment, then verify here.');
            return;
          }

          setError('Paystack public key is not configured.');
          setStep('form');
          return;
        }

        try {
          const handler = window.PaystackPop?.setup({
            key: paystackKey,
            email: formData.email,
            amount: Math.round(formData.amount * 100),
            ref: paystackReference,
            metadata: {
              custom_fields: [
                { display_name: 'Name', variable_name: 'name', value: formData.name },
                { display_name: 'Phone', variable_name: 'phone', value: formData.phone },
                { display_name: 'Category', variable_name: 'category', value: formData.category },
                { display_name: 'Details', variable_name: 'details', value: formData.details || '' },
              ],
            },
            callback: async () => {
              await checkPaymentStatus();
            },
            onClose: () => {
              setVerificationMessage('Checkout closed. You can retry or verify payment status.');
              setStep('processing');
            },
          });

          if (!handler) {
            if (authorizationUrl) {
              window.open(authorizationUrl, '_blank', 'noopener,noreferrer');
              setVerificationMessage('Checkout opened in a new tab. Complete payment, then verify here.');
              return;
            }

            setError('Unable to open Paystack checkout.');
            setStep('form');
            return;
          }

          handler.openIframe();
        } catch (setupError) {
          if (authorizationUrl) {
            window.open(authorizationUrl, '_blank', 'noopener,noreferrer');
            setVerificationMessage('Checkout opened in a new tab. Complete payment, then verify here.');
            return;
          }

          throw setupError;
        }
      } else {
        setError(result?.message || 'Payment initiation failed');
        setStep('form');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setStep('form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletPay = async () => {
    setError('');
    setVerificationMessage('');

    if (!walletUser) {
      setError('Please log in to use wallet payment.');
      return;
    }

    if (selectedPaymentType?.id !== 'service-charge') {
      setError('Wallet pay is available for service charges only.');
      return;
    }

    if (formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (walletBalance < formData.amount) {
      setError('Insufficient wallet balance.');
      return;
    }

    setIsWalletPaying(true);

    try {
      const response = await fetch('/api/wallet/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: walletUser.id,
          email: walletUser.email,
          name: `${walletUser.firstName} ${walletUser.lastName}`,
          amount: formData.amount,
          category: formData.category,
          description: `Wallet payment for ${selectedPaymentType?.name || 'service charge'}`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        setError(result.message || 'Wallet payment failed');
        return;
      }

      setReference(result.reference || '');
      setStep('success');
      setWalletBalance((prev) => prev - formData.amount);
    } catch {
      setError('Wallet payment failed. Please try again.');
    } finally {
      setIsWalletPaying(false);
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
    setReference('');
    setVerificationMessage('');
    setIsSubmitting(false);
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
            {step === 'failed' && 'Payment Failed'}
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
                  step="0.01"
                  inputMode="decimal"
                  value={formData.amount || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      amount: value === '' ? 0 : Number(value),
                    });
                  }}
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
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  {isSubmitting ? 'Initializing...' : 'Proceed to Payment'}
                </button>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Pay with Wallet</p>
                    <p className="text-xs text-gray-500">
                      {walletUser
                        ? `Balance: ₦${walletBalance.toLocaleString()}`
                        : 'Log in to use wallet payments.'}
                    </p>
                    {selectedPaymentType?.id !== 'service-charge' && (
                      <p className="text-xs text-gray-500">Available for service charges only.</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleWalletPay}
                    disabled={isWalletLoading || isWalletPaying || !walletUser || selectedPaymentType?.id !== 'service-charge'}
                    className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isWalletPaying ? 'Processing...' : 'Pay from Wallet'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-red-600"></div>
                <p className="text-gray-600 mt-4">Complete payment in the Paystack secure checkout.</p>
                {verificationMessage && (
                  <p className="text-sm text-gray-500 mt-2">{verificationMessage}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => void checkPaymentStatus()}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  I’ve Completed Payment
                </button>
              </div>
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
              {reference && (
                <p className="text-gray-600 mb-4">
                  Transaction ID: <span className="font-mono font-semibold">{reference}</span>
                </p>
              )}
              <p className="text-sm text-gray-500 mb-6">
                A confirmation receipt has been sent to your email address.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          )}

          {/* Step 5: Failed */}
          {step === 'failed' && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-4">{error || 'We couldn’t confirm your payment.'}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setStep('form')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
