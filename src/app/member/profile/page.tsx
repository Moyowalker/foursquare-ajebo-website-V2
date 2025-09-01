'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, NIGERIAN_STATES } from '@/types/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

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

  const updateUserField = (field: string, value: any) => {
    if (!user) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUser(prev => prev ? {
        ...prev,
        [parent]: {
          ...(prev[parent as keyof User] as any),
          [child]: value
        }
      } : null);
    } else {
      setUser(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!user?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!user?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!user?.email?.trim()) newErrors.email = 'Email is required';
    if (user?.email && !/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Email is invalid';
    if (!user?.phone?.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm() || !user) return;

    setIsSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update localStorage (in a real app, this would be an API call)
      localStorage.setItem('user', JSON.stringify(user));
      
      setSuccessMessage('Profile updated successfully!');
      
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login?message=You have been logged out successfully');
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

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'contact', name: 'Contact & Address', icon: '📍' },
    { id: 'emergency', name: 'Emergency Contact', icon: '🚨' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/member/dashboard" className="text-blue-400 hover:text-blue-300">
                ← Back to Dashboard
              </Link>
              <span className="text-slate-400">•</span>
              <span className="text-white font-medium">Profile Settings</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <SpectacularBadge variant="success">
                {user.membershipStatus.toUpperCase()}
              </SpectacularBadge>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </SpectacularButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-300">
                Member since {new Date(user.membershipDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {successMessage && (
            <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg mb-6">
              <p className="text-green-300">{successMessage}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SpectacularCard className="p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </SpectacularCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <SpectacularCard className="p-8">
              
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        value={user.firstName || ''}
                        onChange={(e) => updateUserField('firstName', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={user.lastName || ''}
                        onChange={(e) => updateUserField('lastName', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-slate-700 font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={user.dateOfBirth || ''}
                      onChange={(e) => updateUserField('dateOfBirth', e.target.value)}
                      className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-slate-700 font-medium mb-2">Ministry Involvement</label>
                    <div className="flex flex-wrap gap-2">
                      {user.ministries?.map((ministry, index) => (
                        <SpectacularBadge key={index} variant="info">
                          {ministry}
                        </SpectacularBadge>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      Contact church leadership to update your ministry involvement
                    </p>
                  </div>
                </div>
              )}

              {/* Contact & Address Tab */}
              {activeTab === 'contact' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact & Address</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => updateUserField('email', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={user.phone || ''}
                        onChange={(e) => updateUserField('phone', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                        placeholder="+234 XXX XXX XXXX"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Street Address</label>
                      <input
                        type="text"
                        value={user.address?.street || ''}
                        onChange={(e) => updateUserField('address.street', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={user.address?.city || ''}
                          onChange={(e) => updateUserField('address.city', e.target.value)}
                          className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-medium mb-2">State</label>
                        <select
                          value={user.address?.state || ''}
                          onChange={(e) => updateUserField('address.state', e.target.value)}
                          className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select State</option>
                          {NIGERIAN_STATES.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contact Tab */}
              {activeTab === 'emergency' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Emergency Contact</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user.emergencyContact?.name || ''}
                        onChange={(e) => updateUserField('emergencyContact.name', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 font-medium mb-2">Relationship</label>
                        <select
                          value={user.emergencyContact?.relationship || ''}
                          onChange={(e) => updateUserField('emergencyContact.relationship', e.target.value)}
                          className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Relationship</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Child">Child</option>
                          <option value="Friend">Friend</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={user.emergencyContact?.phone || ''}
                          onChange={(e) => updateUserField('emergencyContact.phone', e.target.value)}
                          className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-2">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={user.emergencyContact?.email || ''}
                        onChange={(e) => updateUserField('emergencyContact.email', e.target.value)}
                        className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Communication Preferences</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.notifications?.email || false}
                            onChange={(e) => updateUserField('preferences.notifications.email', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Email notifications</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.notifications?.sms || false}
                            onChange={(e) => updateUserField('preferences.notifications.sms', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-4">Communication</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.communication?.newsletter || false}
                            onChange={(e) => updateUserField('preferences.communication.newsletter', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Church newsletter</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.communication?.eventReminders || false}
                            onChange={(e) => updateUserField('preferences.communication.eventReminders', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Event reminders</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.communication?.prayerUpdates || false}
                            onChange={(e) => updateUserField('preferences.communication.prayerUpdates', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Prayer request updates</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-4">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.privacy?.showInDirectory || false}
                            onChange={(e) => updateUserField('preferences.privacy.showInDirectory', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Show in member directory</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={user.preferences?.privacy?.shareContactInfo || false}
                            onChange={(e) => updateUserField('preferences.privacy.shareContactInfo', e.target.checked)}
                            className="w-5 h-5 text-blue-500 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-slate-700">Share contact information with other members</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Password</h3>
                      <p className="text-blue-600 mb-4">
                        Keep your account secure with a strong password
                      </p>
                      <Link href="/auth/forgot-password">
                        <SpectacularButton variant="outline" size="sm">
                          Change Password
                        </SpectacularButton>
                      </Link>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Account Status</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-600">Email Verified:</span>
                        <SpectacularBadge variant={user.emailVerified ? 'success' : 'warning'}>
                          {user.emailVerified ? 'Verified' : 'Not Verified'}
                        </SpectacularBadge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">Phone Verified:</span>
                        <SpectacularBadge variant={user.phoneVerified ? 'success' : 'warning'}>
                          {user.phoneVerified ? 'Verified' : 'Not Verified'}
                        </SpectacularBadge>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Last Login</h3>
                      <p className="text-yellow-600">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
                <div className="space-x-4">
                  <SpectacularButton
                    variant="outline"
                    onClick={() => router.push('/member/dashboard')}
                  >
                    Cancel
                  </SpectacularButton>
                  <SpectacularButton
                    disabled={isSaving}
                    onClick={handleSave}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes ✨'}
                  </SpectacularButton>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}
            </SpectacularCard>
          </div>
        </div>
      </div>
    </div>
  );
}
