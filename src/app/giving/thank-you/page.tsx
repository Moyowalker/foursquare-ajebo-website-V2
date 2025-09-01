'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SpectacularButton, SpectacularCard } from '@/components/ui/spectacular';

export default function ThankYouPage() {
  const [transactionId] = useState(() => 
    `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thank You! 🙏
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Your generous donation has been successfully processed
          </p>
          <p className="text-slate-400">
            Transaction ID: <span className="font-mono text-blue-400">{transactionId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Confirmation */}
          <SpectacularCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">📧</span>
              Confirmation Details
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-3">What happens next?</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Email receipt sent to your inbox
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Tax-deductible receipt included
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Donation processed securely
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">⏳</span>
                    Annual giving statement in January
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-3">Your Impact</h3>
                <p className="text-slate-300 text-sm">
                  Your faithful giving helps us continue God's work in our community and around the world. 
                  Every dollar makes an eternal difference in someone's life.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <SpectacularButton className="flex-1">
                View Donation History
              </SpectacularButton>
              <SpectacularButton variant="outline" className="flex-1">
                Set Up Recurring Giving
              </SpectacularButton>
            </div>
          </SpectacularCard>

          {/* Share & Connect */}
          <SpectacularCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🤝</span>
              Share & Connect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-3">Share Your Joy</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Let others know about the impact we're making together in our community.
                </p>
                <div className="flex gap-3">
                  <SpectacularButton size="sm" variant="outline">
                    Share on Facebook
                  </SpectacularButton>
                  <SpectacularButton size="sm" variant="outline">
                    Share on Twitter
                  </SpectacularButton>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-6">
                <h3 className="text-white font-medium mb-3">Get More Involved</h3>
                <div className="space-y-3">
                  <Link href="/events" className="block">
                    <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📅</span>
                        <div>
                          <div className="text-white font-medium">Upcoming Events</div>
                          <div className="text-slate-400 text-sm">Join us for worship and fellowship</div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/volunteer" className="block">
                    <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🙋</span>
                        <div>
                          <div className="text-white font-medium">Volunteer Opportunities</div>
                          <div className="text-slate-400 text-sm">Serve alongside us in ministry</div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/prayer" className="block">
                    <div className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🙏</span>
                        <div>
                          <div className="text-white font-medium">Prayer Requests</div>
                          <div className="text-slate-400 text-sm">Share your prayer needs with us</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SpectacularCard>
        </div>

        {/* Scripture & Encouragement */}
        <div className="mt-12">
          <SpectacularCard className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">God's Promise to Givers</h2>
              
              <blockquote className="text-lg text-slate-300 italic mb-4 leading-relaxed">
                "Give, and it will be given to you. A good measure, pressed down, shaken together 
                and running over, will be poured into your lap. For with the measure you use, 
                it will be measured to you."
              </blockquote>
              
              <p className="text-blue-400 font-medium mb-6">— Luke 6:38</p>
              
              <p className="text-slate-300 mb-8">
                Thank you for your faithful obedience and generous heart. Your giving is an 
                act of worship that honors God and blesses our community. We pray that God 
                will multiply your blessing and continue to use you mightily in His kingdom.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <SpectacularButton size="lg" className="px-8">
                    Return Home
                  </SpectacularButton>
                </Link>
                <Link href="/giving">
                  <SpectacularButton variant="outline" size="lg" className="px-8">
                    Give Again
                  </SpectacularButton>
                </Link>
              </div>
            </div>
          </SpectacularCard>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-2">
            Questions about your donation? Need help with giving?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:giving@foursquareajebo.org" className="text-blue-400 hover:text-blue-300">
              📧 giving@foursquareajebo.org
            </a>
            <a href="tel:+2348012345678" className="text-blue-400 hover:text-blue-300">
              📞 +234 801 234 5678
            </a>
            <a href="https://wa.me/2348012345678" className="text-blue-400 hover:text-blue-300">
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
