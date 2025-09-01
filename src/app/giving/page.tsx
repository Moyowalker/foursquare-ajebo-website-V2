'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { donationCategories, givingGoals, mockDonationStats, formatCurrency, calculateProgress } from '@/data/donations';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function GivingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('one-time');

  const featuredGoals = givingGoals.filter(goal => goal.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="absolute inset-0 bg-[url('/images/church-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Give With Purpose
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Your generous giving helps us spread God's love, build our community, 
              and transform lives around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SpectacularButton size="lg" className="px-8 py-4">
                Give Now 💝
              </SpectacularButton>
              <SpectacularButton variant="outline" size="lg" className="px-8 py-4">
                Learn More About Giving
              </SpectacularButton>
            </div>
          </div>
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
              About Giving at Foursquare Ajebo
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
