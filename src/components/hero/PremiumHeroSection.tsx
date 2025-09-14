"use client";
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface PremiumHeroSectionProps {
  variant?: 'default';
}

/**
 * Premium Hero Section: World-class immersive experience with:
 * - Dynamic light rays & worship parallax
 * - Floating faith symbols animation system
 * - Context-aware greetings & testimonial rotation
 * - Sophisticated entrance choreography
 * - Optional ambient sanctuary audio
 * - Advanced accessibility & motion controls
 */
export const PremiumHeroSection: React.FC<PremiumHeroSectionProps> = ({ variant = 'default' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Faith symbols for particle system
  const faithSymbols = ['✝', '🕊', '✨', '🙏', '💒', '🌟', '💫'];
  
  // Dynamic testimonials
  const testimonials = [
    "A sanctuary where heaven touches earth",
    "Experience God's presence in every detail",
    "Where worship meets world-class hospitality"
  ];

  // Time-based greetings
  const greetings = {
    morning: "Good Morning, Welcome to",
    afternoon: "Good Afternoon, Step into",
    evening: "Good Evening, Enter into"
  };

  useEffect(() => {
    // Check motion preferences
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    // Set time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    // Entrance reveal
    setTimeout(() => setIsVisible(true), 100);

    // Fallback visibility after 2 seconds if still not visible
    setTimeout(() => setIsVisible(true), 2000);

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [prefersReducedMotion]);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle system
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      symbol: string;
      opacity: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: faithSymbols[Math.floor(Math.random() * faithSymbols.length)],
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 20 + 15
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.font = `${particle.size}px serif`;
        ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(particle.symbol, particle.x, particle.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [prefersReducedMotion]);

  // Audio toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioEnabled) {
      audioRef.current.pause();
      setAudioEnabled(false);
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Audio autoplay blocked');
      });
      setAudioEnabled(true);
    }
  };

  return (
    <section
      aria-label="Foursquare Ajebo premium spiritual experience"
      className="relative isolate w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-800 via-purple-700 to-indigo-800"
      style={{ minHeight: '100vh' }}
    >
      {/* Fallback background for immediate visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        aria-label="Optional ambient sanctuary sounds"
      >
        <source src="/audio/sanctuary-ambience.mp3" type="audio/mpeg" />
      </audio>

      {/* Particle Canvas */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-40"
          aria-hidden="true"
        />
      )}

      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-purple-600/50 to-amber-600/40 animate-gradient-shift" />
        
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/ajebo-campus-hero@1x.webp"
            alt="Divine sunrise over Ajebo retreat center with golden light rays"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-all duration-[2000ms] ease-out ${
              isLoaded ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.naturalWidth > 0) setIsLoaded(true);
            }}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Crect width='10' height='6' fill='%233B82F6'/%3E%3C/svg%3E"
          />
        </div>

        {/* Dynamic light rays */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-amber-300/20 to-transparent transform -skew-x-12 animate-light-ray"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.8}s`,
                  transform: `translateX(${mouse.x * 0.02 - 20}px) skewX(-12deg)`
                }}
              />
            ))}
          </div>
        )}

        {/* Worship atmosphere overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-amber-500/5" />
        
        {/* Interactive light orbs */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute w-[800px] h-[800px] rounded-full bg-amber-400/15 blur-[200px] transition-transform duration-1000"
              style={{
                transform: `translate(${mouse.x * 0.08 - 300}px, ${mouse.y * 0.06 - 200}px)`
              }}
            />
            <div
              className="absolute w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[150px] transition-transform duration-1200"
              style={{
                transform: `translate(${mouse.x * -0.05 + 200}px, ${mouse.y * -0.03 + 100}px)`
              }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full">
        <div className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-20 max-w-[100rem] mx-auto">
          <div className="max-w-4xl lg:max-w-5xl">
            
            {/* Context-aware greeting */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-amber-300 font-medium tracking-wider uppercase text-sm sm:text-base mb-6 flex items-center gap-3 drop-shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden />
                {greetings[timeOfDay as keyof typeof greetings]}
              </p>
            </div>

            {/* Hero Headline with spectacular typography */}
            <div className={`transform transition-all duration-1200 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h1 className="font-black leading-[0.85] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-8">
                <span className="block text-white drop-shadow-2xl">
                  Foursquare Ajebo
                </span>
                <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 font-light italic drop-shadow-lg">
                  Where Heaven Meets Earth
                </span>
              </h1>
            </div>

            {/* Dynamic testimonial */}
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="relative h-16 sm:h-20 mb-8 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <p
                    key={index}
                    className={`absolute inset-0 text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed font-light italic transition-all duration-700 drop-shadow-md ${
                      currentTestimonial === index 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    "{testimonial}"
                  </p>
                ))}
              </div>
            </div>

            {/* Main description */}
            <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mb-12 backdrop-blur-sm drop-shadow-md">
                Experience Nigeria's premier spiritual retreat destination. Our sanctuary blends 
                <span className="text-amber-200 font-medium"> divine worship</span>, 
                <span className="text-blue-200 font-medium"> world-class facilities</span>, and 
                <span className="text-purple-200 font-medium"> transformative community</span> 
                in the heart of Ogun State.
              </p>
            </div>

            {/* Premium CTA Section */}
            <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex flex-col sm:flex-row gap-6 mb-12" role="group" aria-label="Primary ministry actions">
                
                {/* Book Retreat - Primary CTA */}
                <Link
                  href="/facilities"
                  className="group relative inline-flex items-center justify-center rounded-2xl px-10 py-5 text-base sm:text-lg font-bold tracking-wide overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 shadow-[0_8px_40px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_50px_-4px_rgba(245,158,11,0.8)] transition-all duration-500 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
                  data-analytics="premium_cta_book_retreat"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Book Sacred Retreat</span>
                    <span className="text-2xl group-hover:rotate-12 transition-transform">🏛️</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
                </Link>

                {/* Join Service - Secondary CTA */}
                <Link
                  href="/streaming"
                  className="group relative inline-flex items-center justify-center rounded-2xl px-10 py-5 text-base sm:text-lg font-semibold border-2 border-blue-300/50 backdrop-blur-lg bg-white/10 text-blue-100 hover:bg-white/20 hover:border-blue-200/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 transition-all duration-300 transform hover:scale-105"
                  data-analytics="premium_cta_join_service"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Join Live Worship</span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform">🎥</span>
                  </span>
                </Link>

                {/* Give - Tertiary CTA */}
                <Link
                  href="/giving"
                  className="group relative inline-flex items-center justify-center rounded-2xl px-10 py-5 text-base sm:text-lg font-semibold border-2 border-purple-300/50 backdrop-blur-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-100 hover:from-purple-400/30 hover:to-pink-400/30 hover:border-purple-200/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300/50 transition-all duration-300 transform hover:scale-105"
                  data-analytics="premium_cta_give"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Give with Joy</span>
                    <span className="text-xl group-hover:scale-125 transition-transform">💝</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Enhanced Features Bar */}
            <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm font-medium">
                {[
                  { icon: '🙏', label: '24/7 Prayer', color: 'text-amber-200' },
                  { icon: '🏨', label: 'Luxury Suites', color: 'text-blue-200' },
                  { icon: '📡', label: 'HD Streaming', color: 'text-purple-200' },
                  { icon: '🌟', label: 'Group Rates', color: 'text-green-200' }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-slate-300/80 hover:text-white transition-colors duration-300"
                  >
                    <span className="text-lg" aria-hidden>{feature.icon}</span>
                    <span className={feature.color}>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Control */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 z-50"
        aria-label={`${audioEnabled ? 'Pause' : 'Play'} ambient sanctuary sounds`}
        title="Toggle ambient sounds"
      >
        <span className="text-xl" aria-hidden>
          {audioEnabled ? '🔊' : '🔇'}
        </span>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-8 h-12 border-2 border-amber-300/60 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-amber-300 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Screen reader description */}
      <span className="sr-only">
        Premium hero section featuring dynamic worship atmosphere with optional ambient sounds,
        animated faith symbols, and context-aware greeting based on time of day.
      </span>
    </section>
  );
};

export default PremiumHeroSection;
