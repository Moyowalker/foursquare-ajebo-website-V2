"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * SupremeHeroSection - Simple and spectacular
 */
const SupremeHeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [liveCount, setLiveCount] = useState(92);
  const [currentTime, setCurrentTime] = useState('');
  const [streamingNow, setStreamingNow] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Real-time updates
    const updateData = () => {
      setLiveCount(prev => Math.max(75, Math.min(150, prev + Math.floor(Math.random() * 6) - 2)));
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        timeZoneName: 'short'
      }));
      
      // Check service time
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      setStreamingNow((day === 0 || day === 3) && hour >= 9 && hour <= 11);
    };

    updateData();
    const interval = setInterval(updateData, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">✨ Loading your spiritual experience...</div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      
      {/* Simple Beautiful Background */}
      <div className="absolute inset-0">
        {/* Beautiful gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-800/80 to-indigo-900/90" />
        
        {/* Floating light effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating spiritual elements */}
        <div className="absolute top-1/3 left-1/6 text-6xl text-amber-300/30 animate-float">🕊️</div>
        <div className="absolute top-2/3 right-1/5 text-4xl text-white/20 animate-float" style={{ animationDelay: '2s' }}>🙏</div>
        <div className="absolute top-1/2 left-3/4 text-5xl text-amber-400/25 animate-float" style={{ animationDelay: '3s' }}>✨</div>
      </div>

      {/* Real-Time Status Bar */}
      <div className="absolute top-24 left-4 right-4 z-20" style={{ marginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl px-6 py-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white text-sm">
              
              {/* Live Status */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full ${streamingNow ? 'bg-red-500' : 'bg-green-400'} shadow-lg`} />
                  {streamingNow && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-base">
                    {streamingNow ? '🔴 WORSHIP LIVE NOW' : '🕊️ Welcome to Worship'}
                  </div>
                  <div className="text-xs text-white/70">Join our spiritual community</div>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-300 font-mono">{liveCount}</div>
                  <div className="text-xs text-white/70">Online</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-mono text-amber-200">{currentTime}</div>
                  <div className="text-xs text-white/70">Local Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sacred Cross - IN FRONT with Transparency */}
      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-30" style={{ marginTop: '120px' }}>
        <div className="animate-bounce" style={{ animationDuration: '4s' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-amber-400/40 bg-amber-400/10 backdrop-blur-sm shadow-lg">
            <span className="text-4xl text-amber-300/70 drop-shadow-md">✝</span>
          </div>
        </div>
      </div>

      {/* Floating Quote Bubbles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-8 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm animate-float">
          "Faith moves mountains" 🏔️
        </div>
        <div className="absolute top-3/4 right-12 bg-amber-400/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm animate-float" style={{ animationDelay: '1.5s' }}>
          "Love never fails" 💕
        </div>
        <div className="absolute top-1/2 left-16 bg-blue-400/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm animate-float" style={{ animationDelay: '3s' }}>
          "Hope anchors the soul" ⚓
        </div>
      </div>

      {/* Natural Spiritual Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 text-2xl text-amber-300/60 animate-float" style={{ animationDelay: '2s' }}>🌿</div>
        <div className="absolute top-32 right-32 text-xl text-white/50 animate-float" style={{ animationDelay: '4s' }}>🕯️</div>
        <div className="absolute bottom-40 left-40 text-lg text-amber-200/70 animate-float" style={{ animationDelay: '3s' }}>🌸</div>
        <div className="absolute bottom-60 right-60 text-2xl text-blue-200/60 animate-float" style={{ animationDelay: '5s' }}>🌾</div>
        <div className="absolute top-1/2 right-20 text-xl text-purple-300/50 animate-float" style={{ animationDelay: '1s' }}>🍃</div>
        <div className="absolute bottom-1/3 left-20 text-lg text-green-200/60 animate-float" style={{ animationDelay: '6s' }}>🌺</div>
      </div>

      {/* MAIN CONTENT - Properly Spaced Below Sacred Cross */}
      <div className="relative z-25 flex items-center justify-center min-h-screen px-6 py-20" style={{ paddingTop: '280px' }}>
        <div className="max-w-6xl mx-auto text-center">
          
          {/* MASSIVE Headline with Animated Entry */}
          <h1 className="mb-6 leading-tight animate-fade-in-up">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white drop-shadow-2xl animate-slide-in-right">
              Come As You Are
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light italic text-amber-300 mt-4 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
              Leave Transformed
            </span>
          </h1>

          {/* Inspiring Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-12 font-light animate-fade-in" style={{ animationDelay: '1s' }}>
            A sacred sanctuary where hearts find peace, souls discover purpose, 
            and community becomes family. Your spiritual journey begins here.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            
            {/* Primary CTA */}
            <Link
              href="/facilities"
              className="group relative transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur opacity-60 animate-pulse" />
              <div className="relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl text-slate-900 font-bold text-lg shadow-2xl min-w-[260px] hover:shadow-amber-500/50">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl animate-bounce">🏛️</span>
                  <span>Book Sacred Retreat</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/streaming"
              className="group relative transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
              style={{ animationDelay: '1.4s' }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-40 group-hover:bg-red-400/30 transition-colors" />
              <div className="relative px-8 py-4 backdrop-blur-xl bg-white/10 border-2 border-white/30 rounded-2xl text-white font-semibold text-lg shadow-2xl min-w-[260px] hover:border-red-400/50">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl animate-pulse">{streamingNow ? '🔴' : '📺'}</span>
                  <span>{streamingNow ? 'Join LIVE Now' : 'Join Worship'}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Tertiary CTA */}
            <Link
              href="/giving"
              className="group relative transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white font-semibold text-lg shadow-2xl min-w-[260px] hover:shadow-green-400/50">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl animate-spin" style={{ animationDuration: '3s' }}>💝</span>
                  <span>Give with Joy</span>
                  <span className="group-hover:scale-125 transition-transform duration-300">✨</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '🙏', title: 'Daily Prayer', desc: '24/7 intercession', color: 'from-blue-500/20 to-purple-500/20' },
              { icon: '🏡', title: 'Retreat Suites', desc: 'Sacred rest spaces', color: 'from-green-500/20 to-emerald-500/20' },
              { icon: '🌊', title: 'Baptistry', desc: 'New life in Christ', color: 'from-cyan-500/20 to-blue-500/20' },
              { icon: '🎵', title: 'Worship', desc: 'Heavenly music', color: 'from-amber-500/20 to-yellow-500/20' }
            ].map((item, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-gradient-to-br ${item.color} border border-white/15 rounded-xl p-4 shadow-xl hover:bg-white/15 transition-all duration-500 transform hover:scale-110 hover:rotate-1 animate-slide-in-up group cursor-pointer`}
                style={{ animationDelay: `${1.8 + index * 0.2}s` }}
              >
                <div className="text-3xl mb-2 group-hover:animate-bounce transition-all">{item.icon}</div>
                <div className="text-amber-300 font-bold text-base mb-1 group-hover:text-amber-200 transition-colors">{item.title}</div>
                <div className="text-white/80 text-xs group-hover:text-white transition-colors">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-10 h-16 border-2 border-amber-400/60 rounded-full flex justify-center pt-4 backdrop-blur-sm bg-white/5">
          <div className="w-2 h-6 bg-amber-400 rounded-full shadow-lg" />
        </div>
      </div>

      {/* Screen Reader Content */}
      <div className="sr-only">
        Welcome to Foursquare Ajebo spiritual retreat center. Currently {liveCount} people are online. 
        {streamingNow ? 'Live worship service is streaming now.' : 'Join us for worship services.'}
        Experience our daily prayer ministry, retreat suites, baptistry, and worship center.
      </div>
    </section>
  );
};

export default SupremeHeroSection;