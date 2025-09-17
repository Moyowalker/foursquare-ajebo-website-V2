"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ConversionHeroSectionProps {
  variant?: 'landing';
}

/**
 * ConversionHeroSection - Clean, conversion-focused hero
 * - Full-width, mobile-first design
 * - Bold headline with warm, inviting copy
 * - Clear CTAs above the fold
 * - Vibrant background with community/faith atmosphere
 * - Subtle animations with accessibility support
 */
export const ConversionHeroSection: React.FC<ConversionHeroSectionProps> = ({ variant = 'landing' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animationClasses = prefersReducedMotion
    ? ''
    : 'transition-all duration-1000 ease-out';

  return (
    <section
      aria-label="Foursquare Ajebo - Welcome to your spiritual home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"
      style={{ minHeight: '100vh' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/ajebo-campus-hero@2x.webp"
          alt="Beautiful sunrise over Foursquare Ajebo retreat center, showcasing peaceful gardens and welcoming atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-purple-900/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Main Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 ${animationClasses} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            Welcome Home
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-amber-200 mt-2">
              to Foursquare Ajebo
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 ${animationClasses} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: prefersReducedMotion ? '0ms' : '200ms' }}
          >
            Where faith comes alive, community thrives, and every soul finds peace.
            Join us in worship, retreat, and fellowship that transforms lives.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 ${animationClasses} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: prefersReducedMotion ? '0ms' : '400ms' }}
            role="group"
            aria-label="Primary actions"
          >
            {/* Primary CTA - Book Retreat */}
            <Link
              href="/facilities"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300/50 min-w-[200px]"
              aria-label="Book a retreat at Foursquare Ajebo"
            >
              <span className="flex items-center gap-2">
                <span>Book Your Retreat</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">🏛️</span>
              </span>
            </Link>

            {/* Secondary CTA - Join Service */}
            <Link
              href="/streaming"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 min-w-[200px]"
              aria-label="Join our live worship service online"
            >
              <span className="flex items-center gap-2">
                <span>Join Live Worship</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">📺</span>
              </span>
            </Link>

            {/* Tertiary CTA - Give */}
            <Link
              href="/giving"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 min-w-[200px]"
              aria-label="Make a donation to support our ministry"
            >
              <span className="flex items-center gap-2">
                <span>Give with Joy</span>
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">💝</span>
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto ${animationClasses} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: prefersReducedMotion ? '0ms' : '600ms' }}
          >
            {[
              { icon: '🙏', label: 'Daily Prayer', desc: '24/7 spiritual support' },
              { icon: '🏠', label: 'Luxury Suites', desc: 'Comfortable accommodations' },
              { icon: '📺', label: 'Live Streaming', desc: 'Join from anywhere' },
              { icon: '🌱', label: 'Peaceful Grounds', desc: 'Sacred retreat spaces' }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                aria-label={`${item.label}: ${item.desc}`}
              >
                <div className="text-3xl mb-2" aria-hidden>{item.icon}</div>
                <div className="text-white font-medium text-sm mb-1">{item.label}</div>
                <div className="text-white/70 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${animationClasses} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ animationDelay: prefersReducedMotion ? '0ms' : '800ms' }}
        aria-hidden
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Screen Reader Only Content */}
      <div className="sr-only">
        Foursquare Ajebo offers spiritual retreats, live worship services, and opportunities to give back to the community.
        Our beautiful campus provides a peaceful environment for faith, fellowship, and renewal.
      </div>
    </section>
  );
};

export default ConversionHeroSection;