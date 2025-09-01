'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, PrayerRequest } from '@/types/auth';
import { mockPrayerRequests } from '@/data/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function PrayerRequestsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'my' | 'community'>('all');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load prayer requests
      let filteredRequests = mockPrayerRequests;
      
      if (filter === 'my') {
        filteredRequests = mockPrayerRequests.filter(req => req.requesterId === parsedUser.id);
      } else if (filter === 'community') {
        filteredRequests = mockPrayerRequests.filter(req => !req.isPrivate && req.requesterId !== parsedUser.id);
      }
      
      setPrayerRequests(filteredRequests);
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router, filter]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'warning',
      praying: 'info',
      answered: 'success',
      closed: 'error'
    };
    return colors[status as keyof typeof colors] || 'info';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pending Review',
      praying: 'Being Prayed For',
      answered: 'Answered',
      closed: 'Closed'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const handlePrayForRequest = (requestId: string) => {
    // In a real app, this would update the prayer count via API
    setPrayerRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, prayerCount: (req.prayerCount || 0) + 1 }
          : req
      )
    );
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
              <span className="text-white font-medium">Prayer Requests</span>
            </div>
            
            <Link href="/member/prayer-requests/new">
              <SpectacularButton size="sm">
                Submit Request 🙏
              </SpectacularButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Prayer Requests</h1>
          <p className="text-slate-300">
            Share your prayer needs and lift up others in our church community
          </p>
        </div>

        {/* Filters */}
        <SpectacularCard className="p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Requests ({mockPrayerRequests.length})
            </button>
            <button
              onClick={() => setFilter('my')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'my'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              My Requests ({mockPrayerRequests.filter(req => req.requesterId === user.id).length})
            </button>
            <button
              onClick={() => setFilter('community')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'community'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Community Requests ({mockPrayerRequests.filter(req => !req.isPrivate && req.requesterId !== user.id).length})
            </button>
          </div>
        </SpectacularCard>

        {/* Prayer Requests Grid */}
        {prayerRequests.length === 0 ? (
          <SpectacularCard className="p-12 text-center">
            <div className="text-6xl mb-4">🙏</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Prayer Requests</h3>
            <p className="text-slate-600 mb-6">
              {filter === 'my' 
                ? "You haven't submitted any prayer requests yet."
                : "No prayer requests found for this filter."}
            </p>
            <Link href="/member/prayer-requests/new">
              <SpectacularButton>
                Submit Your First Request ✨
              </SpectacularButton>
            </Link>
          </SpectacularCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prayerRequests.map((request) => (
              <SpectacularCard key={request.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      {request.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {request.isAnonymous ? 'Anonymous' : `By ${request.requesterName}`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <SpectacularBadge variant={getStatusColor(request.status) as any}>
                      {getStatusText(request.status)}
                    </SpectacularBadge>
                    {request.isPrivate && (
                      <SpectacularBadge variant="warning" size="sm">
                        Private
                      </SpectacularBadge>
                    )}
                  </div>
                </div>

                <p className="text-slate-700 mb-4 line-clamp-3">
                  {request.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>
                    Category: <span className="font-medium">{request.category}</span>
                  </span>
                  <span>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {request.urgency === 'high' && (
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-red-50 rounded-lg">
                    <span className="text-red-500">🚨</span>
                    <span className="text-red-700 font-medium">Urgent Prayer Request</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-slate-600">
                      💙 {request.prayerCount || 0} people praying
                    </span>
                    {request.status === 'answered' && (
                      <span className="text-sm text-green-600">
                        ✅ Answered prayer!
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {request.requesterId !== user.id && (
                      <SpectacularButton
                        variant="outline"
                        size="sm"
                        onClick={() => handlePrayForRequest(request.id)}
                      >
                        Pray 🙏
                      </SpectacularButton>
                    )}
                    {request.requesterId === user.id && (
                      <Link href={`/member/prayer-requests/${request.id}/edit`}>
                        <SpectacularButton variant="outline" size="sm">
                          Edit
                        </SpectacularButton>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Updates */}
                {request.updates && request.updates.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Recent Update:</h4>
                    <p className="text-sm text-slate-600">
                      {request.updates[request.updates.length - 1].content}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(request.updates[request.updates.length - 1].createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </SpectacularCard>
            ))}
          </div>
        )}

        {/* Prayer Guidelines */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Prayer Request Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">What to Include:</h4>
              <ul className="space-y-1">
                <li>• Specific prayer needs</li>
                <li>• Background context (if comfortable)</li>
                <li>• How others can pray for you</li>
                <li>• Any urgent time-sensitive needs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Privacy Options:</h4>
              <ul className="space-y-1">
                <li>• Mark as private for leadership only</li>
                <li>• Choose anonymous submission</li>
                <li>• Update status as prayers are answered</li>
                <li>• Add updates to share God's faithfulness</li>
              </ul>
            </div>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}
