'use client';

import { useState, useCallback } from 'react';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface UseApiStateOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useApiState<T = any>(options: UseApiStateOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const apiError: ApiError = {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        code: (err as any)?.code,
        status: (err as any)?.status
      };
      
      setError(apiError);
      
      if (options.onError) {
        options.onError(apiError);
      }
      
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isSuccess: !error && !loading && data !== null,
    isError: !!error
  };
}

export function useContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitForm = useCallback(async (formData: any) => {
    setSubmissionStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setSubmissionStatus('success');
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message';
      setErrorMessage(message);
      setSubmissionStatus('error');
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setSubmissionStatus('idle');
    setErrorMessage('');
  }, []);

  return {
    submissionStatus,
    errorMessage,
    submitForm,
    reset,
    isSubmitting: submissionStatus === 'submitting',
    isSuccess: submissionStatus === 'success',
    isError: submissionStatus === 'error'
  };
}

export function useDonation() {
  const [donationStatus, setDonationStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const processDonation = useCallback(async (donationData: any) => {
    setDonationStatus('processing');
    setErrorMessage('');

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Payment processing failed');
      }

      const result = await response.json();
      setDonationStatus('success');
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Payment failed';
      setErrorMessage(message);
      setDonationStatus('error');
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setDonationStatus('idle');
    setErrorMessage('');
  }, []);

  return {
    donationStatus,
    errorMessage,
    processDonation,
    reset,
    isProcessing: donationStatus === 'processing',
    isSuccess: donationStatus === 'success',
    isError: donationStatus === 'error'
  };
}