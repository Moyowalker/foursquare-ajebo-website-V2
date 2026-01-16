'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

interface PrayerRequestForm {
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  isPrivate: boolean;
  isAnonymous: boolean;
}

export default function NewPrayerRequestPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<PrayerRequestForm>({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    isPrivate: false,
    isAnonymous: false
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const categories = [
    'Health & Healing',
    'Family & Relationships',
    'Work & Career',
    'Spiritual Growth',
    'Financial Needs',
    'Ministry & Service',
    'Travel & Safety',
    'Guidance & Decisions',
    'Grief & Loss',
    'Praise & Thanksgiving',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Prayer request title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your prayer request';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Please provide more details (at least 10 characters)';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm() || !user) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would submit to the API
      const newRequest = {
        id: `prayer-${Date.now()}`,
        ...formData,
        requesterId: user.id,
        requesterName: `${user.firstName} ${user.lastName}`,
        status: 'pending',
        prayerCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('New prayer request:', newRequest);
      
      // Redirect to prayer requests page with success message
      router.push('/member/prayer-requests?success=Prayer request submitted successfully');
      
    } catch (error) {
      console.error('Prayer request submission error:', error);
      setErrors({ submit: 'Failed to submit prayer request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof PrayerRequestForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/member/prayer-requests" className="text-blue-400 hover:text-blue-300">
              ← Back to Prayer Requests
            </Link>
            <span className="text-slate-400">•</span>
            <span className="text-white font-medium">Submit Prayer Request</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Submit Prayer Request</h1>
          <p className="text-slate-300">
            Share your prayer needs with our church family
          </p>
        </div>

        <SpectacularCard className="p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Title */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Prayer Request Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                placeholder="Brief title for your prayer request"
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Prayer Request Details *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={6}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none resize-vertical"
                placeholder="Please share the details of your prayer request. Be as specific as you're comfortable with so others can pray effectively for you."
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              <p className="text-sm text-slate-500 mt-1">
                Characters: {formData.description.length} (minimum 10)
              </p>
            </div>

            {/* Urgency */}
            <div className="mb-6">
              <label className="block text-slate-700 font-medium mb-2">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
                  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800 border-red-200' }
                ].map((urgency) => (
                  <label
                    key={urgency.value}
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.urgency === urgency.value
                        ? urgency.color
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={urgency.value}
                      checked={formData.urgency === urgency.value}
                      onChange={(e) => updateFormData('urgency', e.target.value)}
                      className="sr-only"
                      disabled={isSubmitting}
                    />
                    <span className="font-medium">{urgency.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                High urgency requests receive priority attention from prayer teams
              </p>
            </div>

            {/* Privacy Options */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-3">Privacy Options</h3>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isPrivate}
                    onChange={(e) => updateFormData('isPrivate', e.target.checked)}
                    className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
                    disabled={isSubmitting}
                  />
                  <div>
                    <span className="text-slate-700 font-medium">Private Request</span>
                    <p className="text-sm text-slate-600">
                      Only church leadership and prayer team will see this request
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => updateFormData('isAnonymous', e.target.checked)}
                    className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
                    disabled={isSubmitting}
                  />
                  <div>
                    <span className="text-slate-700 font-medium">Submit Anonymously</span>
                    <p className="text-sm text-slate-600">
                      Your name won't be displayed with this request
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/member/prayer-requests">
                <SpectacularButton variant="outline" disabled={isSubmitting}>
                  Cancel
                </SpectacularButton>
              </Link>
              <SpectacularButton
                disabled={isSubmitting}
                onClick={() => void handleSubmit()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prayer Request 🙏'}
              </SpectacularButton>
            </div>
          </form>
        </SpectacularCard>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <SpectacularCard className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              🙏 How Prayer Requests Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Submission Process:</h4>
                <ul className="space-y-1 text-left">
                  <li>• Your request is reviewed by prayer team</li>
                  <li>• Approved requests appear in community feed</li>
                  <li>• You can update or close requests anytime</li>
                  <li>• Share answered prayers to encourage others</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Community Support:</h4>
                <ul className="space-y-1 text-left">
                  <li>• Church members can pray for your request</li>
                  <li>• Prayer warriors receive notifications</li>
                  <li>• Leadership provides pastoral care</li>
                  <li>• Urgent requests get immediate attention</li>
                </ul>
              </div>
            </div>
          </SpectacularCard>
        </div>
      </div>
    </div>
  );
}
