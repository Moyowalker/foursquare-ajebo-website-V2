'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RegisterFormData, User } from '@/types/auth';
import { NIGERIAN_STATES } from '@/types/auth';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 2) {
      if (!formData.address.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.address.city.trim()) newErrors.city = 'City is required';
      if (!formData.address.state) newErrors.state = 'State is required';
      if (!formData.emergencyContact.name.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContact.relationship.trim()) newErrors.emergencyContactRelationship = 'Relationship is required';
      if (!formData.emergencyContact.phone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1200));

      const now = new Date().toISOString();
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        membershipDate: now,
        membershipStatus: 'pending',
        role: {
          type: 'member',
          permissions: [
            { action: 'read', resource: 'events' },
            { action: 'register', resource: 'events' },
            { action: 'read', resource: 'blog' },
            { action: 'submit', resource: 'prayer_requests' },
          ],
        },
        emergencyContact: formData.emergencyContact,
        ministries: [],
        preferences: {
          notifications: { email: true, sms: false, push: false },
          privacy: { showInDirectory: true, shareContactInfo: true },
          communication: {
            newsletter: formData.subscribeNewsletter,
            eventReminders: true,
            givingReceipts: true,
            prayerUpdates: true,
          },
        },
        createdAt: now,
        updatedAt: now,
        emailVerified: false,
        phoneVerified: false,
      };

      const existingRaw = localStorage.getItem('registeredUsers');
      const existing = existingRaw ? (JSON.parse(existingRaw) as User[]) : [];
      const alreadyExists = existing.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
      if (alreadyExists) {
        setErrors({ submit: 'An account with this email already exists.' });
        return;
      }

      localStorage.setItem('registeredUsers', JSON.stringify([...existing, newUser]));
      window.dispatchEvent(new Event('auth:changed'));

      // Redirect to login with success message
      router.push('/auth/login?message=Registration successful! Please log in with your credentials.');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof RegisterFormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-slate-300 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">Join Our Church Family</h1>
          <p className="text-slate-300">Create your member account to access exclusive features</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep >= step 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-600 text-slate-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`h-1 w-16 transition-colors ${
                    currentStep > step ? 'bg-blue-500' : 'bg-slate-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <SpectacularCard className="p-8 bg-white/95 border border-slate-200 shadow-2xl">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    placeholder="+234 XXX XXX XXXX"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                  {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Address & Emergency Contact */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Address & Emergency Contact</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Address</h3>
                  
                  <div className="mb-4">
                    <label className="block text-slate-700 font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => updateFormData('address.street', e.target.value)}
                      className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      placeholder="Enter your street address"
                    />
                    {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">City *</label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => updateFormData('address.city', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">State *</label>
                      <select
                        value={formData.address.state}
                        onChange={(e) => updateFormData('address.state', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => updateFormData('address.zipCode', e.target.value)}
                      className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      placeholder="Postal code (optional)"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Emergency Contact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.emergencyContact.name}
                        onChange={(e) => updateFormData('emergencyContact.name', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        placeholder="Emergency contact name"
                      />
                      {errors.emergencyContactName && <p className="text-red-600 text-sm mt-1">{errors.emergencyContactName}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Relationship *</label>
                      <select
                        value={formData.emergencyContact.relationship}
                        onChange={(e) => updateFormData('emergencyContact.relationship', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.emergencyContactRelationship && <p className="text-red-600 text-sm mt-1">{errors.emergencyContactRelationship}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => updateFormData('emergencyContact.phone', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        placeholder="+234 XXX XXX XXXX"
                      />
                      {errors.emergencyContactPhone && <p className="text-red-600 text-sm mt-1">{errors.emergencyContactPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.emergencyContact.email}
                        onChange={(e) => updateFormData('emergencyContact.email', e.target.value)}
                        className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Password & Agreement */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Create Your Account</h2>
                
                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    placeholder="Enter a strong password"
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                  <p className="text-slate-500 text-sm mt-1">Must be at least 8 characters long</p>
                </div>

                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="mb-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                      className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <span className="text-slate-700">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                        Privacy Policy
                      </Link>
                      *
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>}
                </div>

                <div className="mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.subscribeNewsletter}
                      onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
                      className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">
                      Subscribe to our newsletter for church updates and announcements
                    </span>
                  </label>
                </div>

                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{errors.submit}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <SpectacularButton
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Previous
                </SpectacularButton>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <SpectacularButton onClick={handleNext}>
                    Next
                  </SpectacularButton>
                ) : (
                  <SpectacularButton
                    disabled={isLoading}
                    onClick={() => void handleSubmit()}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account ✨'}
                  </SpectacularButton>
                )}
              </div>
            </div>
          </form>
        </SpectacularCard>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-slate-300">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
