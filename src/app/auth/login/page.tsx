'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCredentials } from '@/types/auth';
import { mockUsers } from '@/data/auth';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check for success message from registration
    const message = searchParams.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check credentials against mock users
      const user = mockUsers.find(u => 
        u.email.toLowerCase() === credentials.email.toLowerCase() && 
        u.password === credentials.password
      );

      if (user) {
        // In a real app, you would store the auth token and user data
        console.log('Login successful:', user);
        
        // Store user data in localStorage (in a real app, use proper auth management)
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to member dashboard
        router.push('/member/dashboard');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (userType: 'member' | 'leader' | 'pastor') => {
    const demoUsers = {
      member: { email: 'john.adebayo@email.com', password: 'password123' },
      leader: { email: 'sarah.okafor@email.com', password: 'password123' },
      pastor: { email: 'pastor.emmanuel@foursquareajebo.org', password: 'password123' }
    };

    setCredentials(demoUsers[userType]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-slate-300">Sign in to access your member portal</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
            <p className="text-green-300">{successMessage}</p>
          </div>
        )}

        <SpectacularCard className="p-8">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none pr-12"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-white text-sm">Remember me</span>
              </label>
              
              <Link href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm">
                Forgot password?
              </Link>
            </div>

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-300">{errors.submit}</p>
              </div>
            )}

            <SpectacularButton
              disabled={isLoading}
              onClick={() => handleSubmit({} as React.FormEvent)}
              className="w-full mb-6"
            >
              {isLoading ? 'Signing In...' : 'Sign In ✨'}
            </SpectacularButton>
          </form>

          {/* Demo Login Section */}
          <div className="border-t border-slate-600 pt-6">
            <p className="text-slate-400 text-sm text-center mb-4">
              Demo Accounts (for testing):
            </p>
            <div className="space-y-2">
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('member')}
                className="w-full text-xs"
              >
                Demo Member (John Adebayo)
              </SpectacularButton>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('leader')}
                className="w-full text-xs"
              >
                Demo Leader (Sarah Okafor)
              </SpectacularButton>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('pastor')}
                className="w-full text-xs"
              >
                Demo Pastor (Pastor Emmanuel)
              </SpectacularButton>
            </div>
          </div>
        </SpectacularCard>

        {/* Register Link */}
        <div className="text-center mt-8">
          <p className="text-slate-400">
            New to our church family?{' '}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Create an account
            </Link>
          </p>
        </div>

        {/* Church Contact */}
        <div className="text-center mt-8 p-4 bg-slate-800/50 rounded-lg">
          <p className="text-slate-300 text-sm mb-2">
            Need help with your account?
          </p>
          <p className="text-slate-400 text-xs">
            Contact us at{' '}
            <a href="mailto:admin@foursquareajebo.org" className="text-blue-400 hover:text-blue-300">
              admin@foursquareajebo.org
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
