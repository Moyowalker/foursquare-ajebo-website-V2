'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

interface GivingRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'tithe' | 'offering' | 'special' | 'building' | 'missions' | 'thanksgiving';
  method: 'bank_transfer' | 'card' | 'cash' | 'mobile_money';
  date: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  note?: string;
  receipt?: string;
}

interface GivingCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  suggestedAmounts: number[];
  isActive: boolean;
}

const givingCategories: GivingCategory[] = [
  {
    id: 'tithe',
    name: 'Tithe',
    description: 'A tenth of your income as worship to God',
    icon: '💝',
    suggestedAmounts: [5000, 10000, 20000, 50000],
    isActive: true
  },
  {
    id: 'offering',
    name: 'Offering',
    description: 'General church offering for ministry operations',
    icon: '🙏',
    suggestedAmounts: [1000, 2000, 5000, 10000],
    isActive: true
  },
  {
    id: 'special',
    name: 'Special Offering',
    description: 'Special gifts for specific projects or needs',
    icon: '🎁',
    suggestedAmounts: [2000, 5000, 10000, 25000],
    isActive: true
  },
  {
    id: 'building',
    name: 'Building Fund',
    description: 'Contribute to church building and expansion projects',
    icon: '🏗️',
    suggestedAmounts: [5000, 10000, 25000, 50000],
    isActive: true
  },
  {
    id: 'missions',
    name: 'Missions',
    description: 'Support missionary work and evangelism efforts',
    icon: '🌍',
    suggestedAmounts: [3000, 5000, 10000, 20000],
    isActive: true
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    description: 'Express gratitude to God for His blessings',
    icon: '🙌',
    suggestedAmounts: [2000, 5000, 10000, 15000],
    isActive: true
  }
];

const mockGivingHistory: GivingRecord[] = [
  {
    id: 'giving-001',
    userId: 'user-001',
    amount: 15000,
    currency: 'NGN',
    type: 'tithe',
    method: 'bank_transfer',
    date: '2024-12-15',
    reference: 'TXN-20241215-001',
    status: 'completed',
    note: 'December tithe',
    receipt: 'receipt-001.pdf'
  },
  {
    id: 'giving-002',
    userId: 'user-001',
    amount: 5000,
    currency: 'NGN',
    type: 'offering',
    method: 'mobile_money',
    date: '2024-12-08',
    reference: 'TXN-20241208-002',
    status: 'completed',
    note: 'Sunday offering'
  },
  {
    id: 'giving-003',
    userId: 'user-001',
    amount: 10000,
    currency: 'NGN',
    type: 'thanksgiving',
    method: 'bank_transfer',
    date: '2024-11-24',
    reference: 'TXN-20241124-003',
    status: 'completed',
    note: 'Thanksgiving for promotion'
  }
];

export default function GivingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [givingHistory, setGivingHistory] = useState<GivingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'give' | 'history' | 'statistics'>('give');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('bank_transfer');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load user's giving history
      const userHistory = mockGivingHistory.filter(record => record.userId === parsedUser.id);
      setGivingHistory(userHistory);
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const getTotalGiving = () => {
    return givingHistory
      .filter(record => record.status === 'completed')
      .reduce((total, record) => total + record.amount, 0);
  };

  const getGivingByType = () => {
    const summary: { [key: string]: number } = {};
    givingHistory
      .filter(record => record.status === 'completed')
      .forEach(record => {
        summary[record.type] = (summary[record.type] || 0) + record.amount;
      });
    return summary;
  };

  const getMethodIcon = (method: string) => {
    const icons = {
      bank_transfer: '🏦',
      card: '💳',
      cash: '💵',
      mobile_money: '📱'
    };
    return icons[method as keyof typeof icons] || '💳';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'warning',
      completed: 'success',
      failed: 'danger'
    };
    return colors[status as keyof typeof colors] || 'info';
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleSubmitGiving = async () => {
    const finalAmount = customAmount || amount;
    if (!selectedCategory || !finalAmount) {
      alert('Please select a giving category and amount');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newGiving: GivingRecord = {
        id: `giving-${Date.now()}`,
        userId: user?.id || '',
        amount: parseInt(finalAmount),
        currency: 'NGN',
        type: selectedCategory as any,
        method: paymentMethod as any,
        date: new Date().toISOString().split('T')[0],
        reference: `TXN-${Date.now()}`,
        status: 'completed',
        note: note || undefined
      };

      setGivingHistory(prev => [newGiving, ...prev]);
      setIsProcessing(false);
      
      // Reset form
      setSelectedCategory('');
      setAmount('');
      setCustomAmount('');
      setNote('');
      setActiveTab('history');
      
      alert('Thank you for your generous giving! Your transaction has been processed.');
    }, 3000);
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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/member/dashboard" className="text-blue-400 hover:text-blue-300">
                ← Back to Dashboard
              </Link>
              <span className="text-slate-400">•</span>
              <span className="text-white font-medium">Online Giving</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Online Giving</h1>
          <p className="text-slate-300">
            Give generously as God has blessed you. "Each of you should give what you have decided in your heart to give" - 2 Corinthians 9:7
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'give', label: 'Give Now', icon: '💝' },
            { id: 'history', label: 'History', icon: '📋' },
            { id: 'statistics', label: 'Statistics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Give Now Tab */}
        {activeTab === 'give' && (
          <div className="space-y-8">
            
            {/* Giving Categories */}
            <SpectacularCard className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Choose Giving Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {givingCategories.filter(cat => cat.isActive).map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCategory === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-bold text-slate-800 mb-1">{category.name}</h3>
                      <p className="text-sm text-slate-600">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SpectacularCard>

            {/* Amount Selection */}
            {selectedCategory && (
              <SpectacularCard className="p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Select Amount</h2>
                
                {/* Suggested Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {givingCategories
                    .find(cat => cat.id === selectedCategory)
                    ?.suggestedAmounts.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      onClick={() => handleAmountSelect(suggestedAmount)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        amount === suggestedAmount.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      ₦{suggestedAmount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">₦</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount('');
                      }}
                      className="w-full pl-8 pr-4 py-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter custom amount"
                      min="100"
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Note (Optional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Add a note for your giving..."
                    rows={3}
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-slate-700 font-medium mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
                      { id: 'card', name: 'Debit/Credit Card', icon: '💳' },
                      { id: 'mobile_money', name: 'Mobile Money', icon: '📱' },
                      { id: 'cash', name: 'Cash (Office)', icon: '💵' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-xl mb-1">{method.icon}</div>
                        <div className="text-sm font-medium">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <SpectacularButton
                    onClick={handleSubmitGiving}
                    disabled={isProcessing || (!amount && !customAmount)}
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : `Give ₦${(customAmount || amount || '0').toLocaleString()}`}
                  </SpectacularButton>
                </div>
              </SpectacularCard>
            )}

            {/* Bank Details */}
            <SpectacularCard className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Bank Transfer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Primary Account</h3>
                  <div className="space-y-1 text-slate-600">
                    <p><strong>Bank:</strong> First Bank of Nigeria</p>
                    <p><strong>Account Name:</strong> Foursquare Gospel Church Ajebo</p>
                    <p><strong>Account Number:</strong> 3012345678</p>
                    <p><strong>Sort Code:</strong> 011151003</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Building Fund Account</h3>
                  <div className="space-y-1 text-slate-600">
                    <p><strong>Bank:</strong> Access Bank</p>
                    <p><strong>Account Name:</strong> FGC Ajebo Building Fund</p>
                    <p><strong>Account Number:</strong> 0123456789</p>
                    <p><strong>Sort Code:</strong> 044150149</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Please include your name and purpose of giving in the bank transfer description for proper record keeping.
                </p>
              </div>
            </SpectacularCard>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Giving History</h2>
              <SpectacularBadge variant="info">
                Total: ₦{getTotalGiving().toLocaleString()}
              </SpectacularBadge>
            </div>

            {givingHistory.length === 0 ? (
              <SpectacularCard className="p-12 text-center">
                <div className="text-6xl mb-4">💝</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Giving History</h3>
                <p className="text-slate-600 mb-6">
                  You haven't made any online contributions yet.
                </p>
                <SpectacularButton onClick={() => setActiveTab('give')}>
                  Give Now
                </SpectacularButton>
              </SpectacularCard>
            ) : (
              <div className="space-y-4">
                {givingHistory.map((record) => (
                  <SpectacularCard key={record.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">
                          {givingCategories.find(cat => cat.id === record.type)?.icon || '💝'}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">
                            {givingCategories.find(cat => cat.id === record.type)?.name || record.type}
                          </h3>
                          <p className="text-slate-600 text-sm">{record.note}</p>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <span>{getMethodIcon(record.method)}</span>
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{record.reference}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-800">
                          ₦{record.amount.toLocaleString()}
                        </div>
                        <SpectacularBadge 
                          variant={getStatusColor(record.status) as any}
                          size="sm"
                        >
                          {record.status}
                        </SpectacularBadge>
                      </div>
                    </div>
                  </SpectacularCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Giving Statistics</h2>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SpectacularCard className="p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-bold text-slate-800">Total Given</h3>
                <p className="text-2xl font-bold text-blue-600">₦{getTotalGiving().toLocaleString()}</p>
              </SpectacularCard>
              
              <SpectacularCard className="p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-bold text-slate-800">Transactions</h3>
                <p className="text-2xl font-bold text-green-600">{givingHistory.length}</p>
              </SpectacularCard>
              
              <SpectacularCard className="p-6 text-center">
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-bold text-slate-800">This Month</h3>
                <p className="text-2xl font-bold text-purple-600">
                  ₦{givingHistory
                    .filter(r => new Date(r.date).getMonth() === new Date().getMonth())
                    .reduce((sum, r) => sum + r.amount, 0)
                    .toLocaleString()}
                </p>
              </SpectacularCard>
              
              <SpectacularCard className="p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-slate-800">Average</h3>
                <p className="text-2xl font-bold text-orange-600">
                  ₦{givingHistory.length > 0 ? Math.round(getTotalGiving() / givingHistory.length).toLocaleString() : '0'}
                </p>
              </SpectacularCard>
            </div>

            {/* Giving by Category */}
            <SpectacularCard className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Giving by Category</h3>
              <div className="space-y-4">
                {Object.entries(getGivingByType()).map(([type, amount]) => {
                  const category = givingCategories.find(cat => cat.id === type);
                  const percentage = (amount / getTotalGiving()) * 100;
                  
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category?.icon || '💝'}</span>
                        <span className="font-medium text-slate-800">{category?.name || type}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-800 w-20 text-right">
                          ₦{amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SpectacularCard>
          </div>
        )}

        {/* Contact Information */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">💬 Questions About Giving?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Stewardship Office</h4>
              <div className="space-y-1">
                <p>📧 giving@foursquareajebo.org</p>
                <p>📞 +234 801 234 5678</p>
                <p>⏰ Mon-Fri: 9AM-5PM</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Financial Secretary</h4>
              <div className="space-y-1">
                <p>📧 finance@foursquareajebo.org</p>
                <p>📞 +234 802 345 6789</p>
                <p>💼 For tax receipts and records</p>
              </div>
            </div>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}
