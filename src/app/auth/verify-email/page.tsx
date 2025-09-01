'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error' | 'expired'>('pending');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const userEmail = searchParams.get('email');
    
    if (userEmail) {
      setEmail(decodeURIComponent(userEmail));
    }

    if (token) {
      // Simulate email verification process
      setTimeout(() => {
        // In a real app, this would make an API call to verify the token
        if (token === 'valid-token') {
          setVerificationStatus('success');
          
          // Update user verification status in localStorage (demo only)
          const userData = localStorage.getItem('user');
          if (userData) {
            const user = JSON.parse(userData);
            user.emailVerified = true;
            localStorage.setItem('user', JSON.stringify(user));
          }
        } else if (token === 'expired-token') {
          setVerificationStatus('expired');
        } else {
          setVerificationStatus('error');
        }
      }, 2000);
    }
  }, [searchParams]);

  const handleResendVerification = async () => {
    setIsResending(true);
    
    // Simulate sending verification email
    setTimeout(() => {
      setIsResending(false);
      alert(`Verification email sent to ${email}`);
    }, 1500);
  };

  const handleContinueToLogin = () => {
    router.push('/auth/login?verified=true');
  };

  const handleGoToDashboard = () => {
    router.push('/member/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {verificationStatus === 'pending' && '⏳'}
            {verificationStatus === 'success' && '✅'}
            {verificationStatus === 'error' && '❌'}
            {verificationStatus === 'expired' && '⏰'}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {verificationStatus === 'pending' && 'Verifying Your Email'}
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
            {verificationStatus === 'expired' && 'Link Expired'}
          </h1>
          <p className="text-slate-300">
            {verificationStatus === 'pending' && 'Please wait while we verify your email address...'}
            {verificationStatus === 'success' && 'Your email has been successfully verified.'}
            {verificationStatus === 'error' && 'We could not verify your email address.'}
            {verificationStatus === 'expired' && 'Your verification link has expired.'}
          </p>
        </div>

        <SpectacularCard className="p-8">
          
          {/* Pending State */}
          {verificationStatus === 'pending' && (
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600 mb-6">
                Verifying your email address...
              </p>
              {email && (
                <p className="text-sm text-slate-500">
                  Email: {email}
                </p>
              )}
            </div>
          )}

          {/* Success State */}
          {verificationStatus === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">✅</div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Verification Complete</h3>
              <p className="text-slate-600 mb-6">
                Welcome to the Foursquare Gospel Church Ajebo family! Your email has been verified and your account is now active.
              </p>
              <div className="space-y-3">
                <SpectacularButton onClick={handleGoToDashboard} className="w-full">
                  Go to Member Dashboard
                </SpectacularButton>
                <SpectacularButton 
                  variant="outline" 
                  onClick={handleContinueToLogin}
                  className="w-full"
                >
                  Continue to Login
                </SpectacularButton>
              </div>
            </div>
          )}

          {/* Error State */}
          {verificationStatus === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">❌</div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Verification Failed</h3>
              <p className="text-slate-600 mb-6">
                The verification link is invalid or has already been used. Please request a new verification email.
              </p>
              <div className="space-y-3">
                <SpectacularButton 
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </SpectacularButton>
                <Link href="/auth/login">
                  <SpectacularButton variant="outline" className="w-full">
                    Back to Login
                  </SpectacularButton>
                </Link>
              </div>
            </div>
          )}

          {/* Expired State */}
          {verificationStatus === 'expired' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">⏰</div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Link Expired</h3>
              <p className="text-slate-600 mb-6">
                Your verification link has expired. Please request a new verification email to complete your registration.
              </p>
              <div className="space-y-3">
                <SpectacularButton 
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? 'Sending...' : 'Send New Verification Email'}
                </SpectacularButton>
                <Link href="/auth/register">
                  <SpectacularButton variant="outline" className="w-full">
                    Back to Registration
                  </SpectacularButton>
                </Link>
              </div>
            </div>
          )}
        </SpectacularCard>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• Check your spam/junk folder for the verification email</p>
            <p>• Verification links expire after 24 hours</p>
            <p>• Make sure you're using the correct email address</p>
            <p>• Contact church administration for assistance</p>
          </div>
          <div className="mt-4">
            <a href="mailto:admin@foursquareajebo.org" className="text-blue-400 hover:text-blue-300">
              admin@foursquareajebo.org
            </a>
          </div>
        </div>

        {/* Demo Info */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🚀 Demo Information</h3>
          <div className="text-sm text-slate-600 space-y-2">
            <p><strong>Test URLs:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Success: <code>?token=valid-token&email=test@example.com</code></li>
              <li>Expired: <code>?token=expired-token&email=test@example.com</code></li>
              <li>Error: <code>?token=invalid-token&email=test@example.com</code></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              In production, this would integrate with your email service provider and backend API.
            </p>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}
