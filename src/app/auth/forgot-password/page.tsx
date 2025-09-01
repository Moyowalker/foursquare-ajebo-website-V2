'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would send a password reset email
      console.log('Password reset requested for:', email);
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-md">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Login
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-slate-300">We've sent password reset instructions to your email</p>
          </div>

          <SpectacularCard className="p-8">
            <div className="text-center">
              <div className="text-6xl mb-6">📧</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Email Sent Successfully</h2>
              <p className="text-slate-600 mb-6">
                If an account with email <strong>{email}</strong> exists, you will receive 
                password reset instructions within the next few minutes.
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <div className="flex flex-col space-y-3">
                  <SpectacularButton
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Try Different Email
                  </SpectacularButton>
                  
                  <Link href="/auth/login">
                    <SpectacularButton variant="primary" className="w-full">
                      Back to Login
                    </SpectacularButton>
                  </Link>
                </div>
              </div>
            </div>
          </SpectacularCard>

          {/* Contact Support */}
          <div className="text-center mt-8 p-4 bg-slate-800/50 rounded-lg">
            <p className="text-slate-300 text-sm mb-2">
              Still having trouble accessing your account?
            </p>
            <p className="text-slate-400 text-xs">
              Contact our support team at{' '}
              <a href="mailto:support@foursquareajebo.org" className="text-blue-400 hover:text-blue-300">
                support@foursquareajebo.org
              </a>{' '}
              or call{' '}
              <a href="tel:+234XXXXXXXXX" className="text-blue-400 hover:text-blue-300">
                +234 XXX XXX XXXX
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Login
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Reset Password</h1>
          <p className="text-slate-300">Enter your email to receive reset instructions</p>
        </div>

        <SpectacularCard className="p-8">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-6">
              <label className="block text-slate-800 font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <SpectacularButton
              disabled={isLoading}
              onClick={() => handleSubmit({} as React.FormEvent)}
              className="w-full mb-6"
            >
              {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions ✨'}
            </SpectacularButton>
          </form>

          {/* Additional Help */}
          <div className="border-t border-slate-200 pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Make sure to use the email address associated with your church account</p>
                <p>• Check your spam/junk folder for the reset email</p>
                <p>• Password reset links expire after 24 hours</p>
              </div>
            </div>
          </div>
        </SpectacularCard>

        {/* Alternative Options */}
        <div className="text-center mt-8">
          <p className="text-slate-400 mb-4">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in here
            </Link>
          </p>
          
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Join our church family
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
