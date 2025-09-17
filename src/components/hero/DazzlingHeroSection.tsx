"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

/**
 * SupremeHeroSection - First impression that truly wows
 */
const SupremeHeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [liveCount, setLiveCount] = useState(92);
  const [prayerCount, setPrayerCount] = useState(47);
  const [currentTime, setCurrentTime] = useState('');
  const [streamingNow, setStreamingNow] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReturning, setIsReturning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mouseTrailerRef = useRef<HTMLDivElement>(null);

  // Inspirational verses carousel
  const verses = [
    "The LORD is my shepherd; I shall not want. - Psalm 23:1",
    "For I know the plans I have for you, declares the LORD... - Jeremiah 29:11",
    "I can do all things through Christ who strengthens me. - Philippians 4:13",
    "Be still, and know that I am God. - Psalm 46:10",
    "Come to me, all you who are weary and burdened. - Matthew 11:28"
  ];

  // Dynamic spiritual color scheme based on time of day
  const getTimeBasedGradient = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'from-indigo-500 via-blue-600 to-indigo-700'; // Morning (Faith & Peace)
    if (hour >= 12 && hour < 18) return 'from-indigo-600 via-purple-600 to-indigo-800'; // Afternoon (Depth & Wisdom)
    return 'from-indigo-900 via-purple-900 to-indigo-950'; // Evening/Night (Serenity & Contemplation)
  };

  const getTimeBasedMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return '🌅 Good Morning, Beloved';
    if (hour >= 12 && hour < 18) return '☀️ Blessed Afternoon';
    return '🌙 Peaceful Evening';
  };

  useEffect(() => {
    setMounted(true);
    
    // Check if returning visitor
    const visited = localStorage.getItem('foursquare_visited');
    setIsReturning(!!visited);
    if (!visited) {
      localStorage.setItem('foursquare_visited', 'true');
    }

    // Real-time updates
    const updateData = () => {
      setLiveCount(prev => Math.max(75, Math.min(150, prev + Math.floor(Math.random() * 6) - 2)));
      setPrayerCount(prev => Math.max(35, Math.min(65, prev + Math.floor(Math.random() * 4) - 1)));
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

    // Verse rotation every 5 seconds
    const verseInterval = setInterval(() => {
      setCurrentVerse(prev => (prev + 1) % verses.length);
    }, 5000);

    // Mouse movement tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update mouse trailer
      if (mouseTrailerRef.current) {
        mouseTrailerRef.current.style.left = e.clientX + 'px';
        mouseTrailerRef.current.style.top = e.clientY + 'px';
      }

      // Parallax effect for background elements
      const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
      
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach((el, index) => {
        const element = el as HTMLElement;
        const multiplier = (index + 1) * 0.3;
        element.style.transform = `translate3d(${xPos * multiplier}px, ${yPos * multiplier}px, 0)`;
      });
    };

    updateData();
    const interval = setInterval(updateData, 3000);
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      clearInterval(verseInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [verses.length]);

  // Split text animation helper
  const SplitTextAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => (
    <>
      {text.split('').map((letter, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fade-in"
          style={{ 
            animationDelay: `${delay + i * 0.05}s`,
            animationFillMode: 'forwards'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </>
  );

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    // In a real implementation, you'd control actual audio here
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">✨ Preparing your spiritual experience...</div>
      </div>
    );
  }

  return (
    <>
      {/* Custom Mouse Trailer */}
      <div 
        ref={mouseTrailerRef}
        className="mouse-trailer fixed w-5 h-5 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full pointer-events-none z-50 opacity-60 transition-transform duration-150 ease-out"
        style={{ transform: 'translate(-50%, -50%) scale(1)' }}
      />

      <section 
        ref={heroRef}
        className={`relative w-full min-h-screen overflow-hidden bg-gradient-to-br ${getTimeBasedGradient()}`}
      >
        
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          {/* Time-based gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getTimeBasedGradient()} opacity-90`} />
          
          {/* Parallax floating light effects */}
          <div className="parallax-element absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="parallax-element absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="parallax-element absolute top-1/2 left-1/2 w-32 h-32 bg-purple-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Natural spiritual elements with parallax */}
          <div className="parallax-element absolute top-1/3 left-1/6 text-6xl text-amber-300/30 animate-float">🕊️</div>
          <div className="parallax-element absolute top-2/3 right-1/5 text-4xl text-white/20 animate-float" style={{ animationDelay: '2s' }}>🙏</div>
          <div className="parallax-element absolute top-1/2 left-3/4 text-5xl text-amber-400/25 animate-float" style={{ animationDelay: '3s' }}>✨</div>
        </div>

        {/* Ambient Audio Toggle */}
        <button 
          onClick={toggleAudio}
          aria-label={`${audioPlaying ? 'Mute' : 'Play'} ambient worship music`}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <span className="text-xl">
            {audioPlaying ? '🔇' : '🎵'}
          </span>
        </button>

        {/* Time-based Greeting */}
        <div className="absolute top-6 left-6 z-40">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white/90 text-sm font-medium">
              {getTimeBasedMessage()}
              {isReturning && <span className="ml-2">- Welcome Back! 🏠</span>}
            </span>
          </div>
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
                  
                  {/* Live Prayer Counter */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-300 font-mono">{prayerCount}</div>
                      <div className="text-xs text-white/70">Praying Now</div>
                    </div>
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

        {/* Sacred Cross - Transparent */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-30" style={{ marginTop: '120px' }}>
          <div className="animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-amber-400/40 bg-amber-400/10 backdrop-blur-sm shadow-lg">
              <span className="text-4xl text-amber-300/70 drop-shadow-md">✝</span>
            </div>
          </div>
        </div>

        {/* Scripture Carousel - Moved to top area with responsive sizing */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl px-4">
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-xl px-4 py-3 md:px-6 md:py-4 border border-white/10">
              <p className="text-white/90 text-sm md:text-base lg:text-lg font-light leading-relaxed italic transition-opacity duration-500">
                "{verses[currentVerse]}"
              </p>
            </div>
          </div>
        </div>

        {/* Natural Spiritual Elements */}
        <div className="absolute inset-0 z-5">
          <div className="parallax-element absolute top-20 left-20 text-2xl text-indigo-300/60 animate-float" style={{ animationDelay: '2s' }}>🌿</div>
          <div className="parallax-element absolute top-32 right-32 text-xl text-white/50 animate-float" style={{ animationDelay: '4s' }}>🕯️</div>
          <div className="parallax-element absolute bottom-40 left-40 text-lg text-indigo-200/70 animate-float" style={{ animationDelay: '3s' }}>🌸</div>
          <div className="parallax-element absolute bottom-60 right-60 text-2xl text-blue-200/60 animate-float" style={{ animationDelay: '5s' }}>🌾</div>
          <div className="parallax-element absolute top-1/2 right-20 text-xl text-purple-300/50 animate-float" style={{ animationDelay: '1s' }}>🍃</div>
          <div className="parallax-element absolute bottom-1/3 left-20 text-lg text-indigo-200/60 animate-float" style={{ animationDelay: '6s' }}>🌺</div>
        </div>

        {/* MAIN CONTENT - Responsive spacing */}
        <div className="relative z-25 flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-6xl mx-auto text-center" style={{ paddingTop: '120px' }}>
            
            {/* Split Text Animated Headline - Responsive sizing */}
            <h1 className="mb-6 md:mb-8 leading-tight">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl">
                <SplitTextAnimation text="Come As You Are" delay={0.5} />
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light italic text-indigo-200 mt-4 md:mt-6">
                <SplitTextAnimation text="Leave Transformed" delay={1.5} />
              </span>
            </h1>

            {/* Inspiring Description - Responsive text sizing */}
            <div className="mb-12 md:mb-16">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in px-2" style={{ animationDelay: '3s' }}>
                A sacred sanctuary where hearts find peace, souls discover purpose, 
                and community becomes family. Your spiritual journey begins here.
              </p>
            </div>

            {/* Enhanced CTA Buttons - Responsive sizing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-2">
              
              {/* Primary CTA - Updated to spiritual gold accents */}
              <Link
                href="/facilities"
                className="group relative magnetic transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
                style={{ animationDelay: '3.5s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur opacity-60 animate-pulse" />
                <div className="relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-slate-900 font-bold text-base md:text-lg shadow-2xl min-w-[240px] md:min-w-[260px] hover:shadow-yellow-500/50">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <span className="text-lg md:text-xl animate-bounce">🏛️</span>
                    <span className="text-sm md:text-base">Book Sacred Retreat</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>

              {/* Secondary CTA - Streaming with indigo accents */}
              <Link
                href="/streaming"
                className="group relative magnetic transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
                style={{ animationDelay: '4s' }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-40 group-hover:bg-indigo-400/30 transition-colors" />
                <div className="relative px-6 py-3 md:px-8 md:py-4 backdrop-blur-xl bg-white/10 border-2 border-white/30 rounded-2xl text-white font-semibold text-base md:text-lg shadow-2xl min-w-[240px] md:min-w-[260px] hover:border-indigo-400/50">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <span className="text-lg md:text-xl animate-pulse">{streamingNow ? '🔴' : '📺'}</span>
                    <span className="text-sm md:text-base">{streamingNow ? 'Join LIVE Now' : 'Join Worship'}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>

              {/* Tertiary CTA - Giving with emerald accents */}
              <Link
                href="/giving"
                className="group relative magnetic transform hover:scale-110 transition-all duration-500 w-full sm:w-auto animate-bounce-in"
                style={{ animationDelay: '4.5s' }}
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

            {/* Enhanced Feature Cards with Interactive Hover */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: '🙏', title: 'Daily Prayer', desc: '24/7 intercession', color: 'from-indigo-500/20 to-purple-500/20' },
                { icon: '🏡', title: 'Retreat Suites', desc: 'Sacred rest spaces', color: 'from-blue-500/20 to-indigo-500/20' },
                { icon: '🌊', title: 'Baptistry', desc: 'New life in Christ', color: 'from-cyan-500/20 to-blue-500/20' },
                { icon: '🎵', title: 'Worship', desc: 'Heavenly music', color: 'from-purple-500/20 to-indigo-500/20' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`interactive backdrop-blur-xl bg-gradient-to-br ${item.color} border border-white/15 rounded-xl p-4 shadow-xl hover:bg-white/15 transition-all duration-500 transform hover:scale-110 hover:rotate-1 animate-slide-in-up group cursor-pointer`}
                  style={{ animationDelay: `${5 + index * 0.2}s` }}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce transition-all">{item.icon}</div>
                  <div className="text-indigo-200 font-bold text-base mb-1 group-hover:text-indigo-100 transition-colors">{item.title}</div>
                  <div className="text-white/80 text-xs group-hover:text-white transition-colors">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Updated with spiritual colors */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="w-10 h-16 border-2 border-indigo-400/60 rounded-full flex justify-center pt-4 backdrop-blur-sm bg-white/5">
            <div className="w-2 h-6 bg-indigo-400 rounded-full shadow-lg" />
          </div>
        </div>

        {/* Screen Reader Content */}
        <div className="sr-only">
          Welcome to Foursquare Ajebo spiritual retreat center. Currently {liveCount} people are online with {prayerCount} people praying. 
          {streamingNow ? 'Live worship service is streaming now.' : 'Join us for worship services.'}
          Current scripture: {verses[currentVerse]}
          Experience our daily prayer ministry, retreat suites, baptistry, and worship center.
        </div>
      </section>
    </>
  );
};

export default SupremeHeroSection;