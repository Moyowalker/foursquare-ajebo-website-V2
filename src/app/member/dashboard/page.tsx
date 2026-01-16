'use client';

import React from 'react';
import Link from 'next/link';
import { SpectacularButton } from '@/components/ui/spectacular';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Member Dashboard
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to your member portal. Access your spiritual journey, connect with the community, and grow in faith.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bible Study
                </h3>
                <p className="text-gray-600 mb-4">
                  Access daily devotionals and join study groups
                </p>
                <SpectacularButton size="sm" variant="outline">
                  Coming Soon
                </SpectacularButton>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with fellow members and participate in discussions
                </p>
                <SpectacularButton size="sm" variant="outline">
                  Coming Soon
                </SpectacularButton>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Prayer Requests
                </h3>
                <p className="text-gray-600 mb-4">
                  Submit and view prayer requests from the community
                </p>
                <SpectacularButton size="sm" variant="outline">
                  Coming Soon
                </SpectacularButton>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Events
                </h3>
                <p className="text-gray-600 mb-4">
                  Register for upcoming church events and activities
                </p>
                <SpectacularButton size="sm" variant="outline">
                  Coming Soon
                </SpectacularButton>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Giving & Wallet
                </h3>
                <p className="text-gray-600 mb-4">
                  Fund your wallet, pay service fees, and track transactions
                </p>
                <Link href="/member/wallet">
                  <SpectacularButton size="sm" variant="outline">
                    Open Wallet
                  </SpectacularButton>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Growth Tracker
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your spiritual growth and set faith goals
                </p>
                <SpectacularButton size="sm" variant="outline">
                  Coming Soon
                </SpectacularButton>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 mb-6">
                The member portal is currently under development. Check back soon for these exciting features!
              </p>
              <Link href="/">
                <SpectacularButton variant="outline">
                  ← Back to Home
                </SpectacularButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
