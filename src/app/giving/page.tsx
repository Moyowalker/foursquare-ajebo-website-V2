'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { donationCategories, givingGoals, mockDonationStats, formatCurrency, calculateProgress } from '@/data/donations';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function GivingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('one-time');

  const featuredGoals = givingGoals.filter(goal => goal.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Heart-Centered Giving Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Professional Warm Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-900 to-slate-900"></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-6">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Professional Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-24 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 left-32 w-36 h-36 bg-slate-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-amber-200 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Give With <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Purpose</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Your generous giving helps us spread God's love, build our community, 
              and transform lives around the world.
            </p>
            
            <div className="inline-flex items-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <span className="text-amber-100 font-medium">💝 Generous Hearts • 🙏 Faithful Giving • ❤️ Transforming Lives</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SpectacularButton size="lg" className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Give Now 💝
              </SpectacularButton>
              <SpectacularButton variant="outline" size="lg" className="px-8 py-4 border-white/30 text-white hover:bg-white/10">
                Learn More About Giving
              </SpectacularButton>
            </div>
          </div>
        </div>
        
        {/* Loving Bottom Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,30 Q150,90 300,30 T600,30 Q750,90 900,30 T1200,30 L1200,120 L0,120 Z" fill="rgb(15 23 42)" />
          </svg>
        </div>
      </section>

      {/* Giving Impact Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Impact This Year
            </h2>
            <p className="text-slate-300 text-lg">
              See how your faithful giving is making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SpectacularCard className="text-center p-8">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-3xl font-bold text-white mb-2">
                {formatCurrency(mockDonationStats.total_raised)}
              </div>
              <div className="text-slate-400">Total Raised</div>
            </SpectacularCard>

            <SpectacularCard className="text-center p-8">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-3xl font-bold text-white mb-2">
                {mockDonationStats.total_donors}
              </div>
              <div className="text-slate-400">Faithful Givers</div>
            </SpectacularCard>

            <SpectacularCard className="text-center p-8">
              <div className="text-4xl mb-4">🎯</div>
              <div className="text-3xl font-bold text-white mb-2">
                {featuredGoals.length}
              </div>
              <div className="text-slate-400">Active Goals</div>
            </SpectacularCard>
          </div>
        </div>
      </section>

      {/* Featured Giving Goals */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Current Giving Goals
            </h2>
            <p className="text-slate-300 text-lg">
              Help us reach these important milestones for our ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGoals.map((goal) => {
              const progress = calculateProgress(goal.current_amount, goal.target_amount);
              const remaining = goal.target_amount - goal.current_amount;
              const deadline = new Date(goal.deadline).toLocaleDateString();

              return (
                <SpectacularCard key={goal.id} className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{goal.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{goal.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>{formatCurrency(goal.current_amount)} raised</span>
                        <span>{formatCurrency(goal.target_amount)} goal</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div 
                          className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>{progress.toFixed(1)}% complete</span>
                        <span>Due: {deadline}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-semibold text-white mb-2">
                        {formatCurrency(remaining)} remaining
                      </div>
                      <SpectacularButton size="sm" className="w-full">
                        Contribute Now
                      </SpectacularButton>
                    </div>
                  </div>
                </SpectacularCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ways to Give
            </h2>
            <p className="text-slate-300 text-lg">
              Choose how you'd like to support our ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationCategories.map((category) => (
              <SpectacularCard 
                key={category.id} 
                className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-slate-300 text-sm mb-4">{category.description}</p>
                  
                  {category.target_amount && category.current_amount && (
                    <div className="mb-4">
                      <div className="text-sm text-slate-400 mb-1">
                        {formatCurrency(category.current_amount)} of {formatCurrency(category.target_amount)}
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                          style={{ width: `${calculateProgress(category.current_amount, category.target_amount)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {category.suggested_amounts.slice(0, 3).map((amount) => (
                      <SpectacularBadge key={amount} variant="info" className="text-xs">
                        ${amount}
                      </SpectacularBadge>
                    ))}
                  </div>

                  <SpectacularButton size="sm" className="w-full">
                    Give to {category.name}
                  </SpectacularButton>
                </div>
              </SpectacularCard>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Information */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Giving at Foursquare Camp Ajebo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpectacularCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">🔒</span>
                Secure & Easy
              </h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Bank-level security for all transactions</li>
                <li>• Multiple payment options available</li>
                <li>• One-time or recurring giving options</li>
                <li>• Instant email receipts</li>
                <li>• Mobile-friendly giving platform</li>
              </ul>
            </SpectacularCard>

            <SpectacularCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">📊</span>
                Tax Benefits
              </h3>
              <ul className="text-slate-300 space-y-2">
                <li>• All donations are tax-deductible</li>
                <li>• Annual giving statements provided</li>
                <li>• Detailed donation history tracking</li>
                <li>• IRS-compliant receipts</li>
                <li>• Professional financial management</li>
              </ul>
            </SpectacularCard>

            <SpectacularCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">💝</span>
                Honor & Memorial
              </h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Give in honor of loved ones</li>
                <li>• Memorial gift notifications</li>
                <li>• Special dedication options</li>
                <li>• Family notification services</li>
                <li>• Personalized gift messages</li>
              </ul>
            </SpectacularCard>

            <SpectacularCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">📞</span>
                Need Help?
              </h3>
              <ul className="text-slate-300 space-y-2">
                <li>• Call our office: +234 801 234 5678</li>
                <li>• Email: giving@foursquareajebo.org</li>
                <li>• Visit us during service hours</li>
                <li>• WhatsApp support available</li>
                <li>• Financial counseling services</li>
              </ul>
            </SpectacularCard>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Your generous giving helps us continue God's work in our community and around the world.
              Every gift, no matter the size, makes an eternal impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/giving/donate">
                <SpectacularButton size="lg" className="px-8 py-4">
                  Start Giving Today ✨
                </SpectacularButton>
              </Link>
              <Link href="/giving/recurring">
                <SpectacularButton variant="outline" size="lg" className="px-8 py-4">
                  Set Up Recurring Giving
                </SpectacularButton>
              </Link>
            </div>

            <div className="mt-8 text-sm text-slate-400">
              <p>
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
