"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FoursquareLogo } from '@/components/ui/logo';
import { RealTimeStats } from './RealTimeStats';

interface SpectacularHeroSectionProps {
  variant?: 'landing';
}

/**
 * SpectacularHeroSection
 * - Immersive layered background: hero image + gradient atmospherics
 * - Light-ray & particle ambience (respects reduced motion)
 * - Time-of-day greeting + rotating spiritual testimonial phrases
 * - Prominent CTAs (Book Retreat / Join Live Worship / Give with Joy)
 * - Real-time stats bar (viewer count, next/live service, donation progress)
 * - Optional ambient audio toggle
 */
export const SpectacularHeroSection: React.FC<SpectacularHeroSectionProps> = ({ variant = 'landing' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning'|'afternoon'|'evening'>('morning');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const testimonials = [
    'Where Heaven Meets Earth',
    'A Sanctuary of Renewal',
    'Transforming Lives in His Presence',
    'Divine Hospitality & Worship' 
  ];

  const greetings: Record<typeof timeOfDay, string> = {
    morning: 'Good Morning, Welcome to',
    afternoon: 'Good Afternoon, Welcome to',
    evening: 'Good Evening, Welcome to'
  };

  // Setup time-of-day & reduced motion detection
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning'); else if (hour < 18) setTimeOfDay('afternoon'); else setTimeOfDay('evening');
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handle = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handle);
    setTimeout(() => setVisible(true), 100); // entrance staging
    return () => mq.removeEventListener('change', handle);
  }, []);

  // Rotate testimonial phrases
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIndex(i => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // Mouse tracking for light orbs / parallax
  useEffect(() => {
    if (prefersReducedMotion) return; 
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [prefersReducedMotion]);

  // Ambient particle canvas (floating subtle symbols)
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const symbols = ['✝','🕊','✨','🙏','🌟','💫'];
    const particles: Array<{x:number;y:number;vx:number;vy:number;symbol:string;size:number;opacity:number;rot:number;rv:number;}> = [];
    for (let i=0;i<10;i++) {
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random()-.5)*0.4,
        vy: (Math.random()-.5)*0.4,
        symbol: symbols[Math.floor(Math.random()*symbols.length)],
        size: 18+Math.random()*20,
        opacity: 0.12+Math.random()*0.25,
        rot: Math.random()*Math.PI*2,
        rv: (Math.random()-.5)*0.002
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rv;
        if (p.x < -50) p.x = canvas.width + 50; if (p.x > canvas.width+50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50; if (p.y > canvas.height+50) p.y = -50;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = '#FCD34D';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(252,211,77,0.9)';
        ctx.shadowBlur = 12;
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [prefersReducedMotion]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioOn) { audioRef.current.pause(); setAudioOn(false); } else { audioRef.current.play().catch(()=>{}); setAudioOn(true); }
  };

  return (
    <section aria-label="Foursquare Ajebo immersive hero" className="relative w-full min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden bg-black text-white">
      {/* Ambient Audio */}
      <audio ref={audioRef} loop preload="metadata" aria-label="Ambient sanctuary sounds">
        <source src="/audio/sanctuary-ambience.mp3" type="audio/mpeg" />
      </audio>

      {/* Particle Canvas */}
      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" aria-hidden />
      )}

      {/* Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />
        <Image
          src="/images/hero/ajebo-campus-hero@2x.webp"
            alt="Panoramic view of Foursquare Ajebo retreat campus at sunrise"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-all duration-[2500ms] ease-out ${isLoaded ? 'opacity-40 scale-105' : 'opacity-0 scale-100'}`}
            onLoad={() => setIsLoaded(true)}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10 mix-blend-overlay" />
        {/* Light rays */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-1.5 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent animate-light-ray"
                style={{ left: `${12 + i * 14}%`, animationDelay: `${i * 1.1}s` }}
              />
            ))}
          </div>
        )}
        {/* Interactive soft orbs */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className="absolute w-[900px] h-[900px] rounded-full bg-amber-400/15 blur-[220px] transition-transform duration-[1600ms]"
              style={{ transform: `translate(${mouse.x * 0.08 - 420}px, ${mouse.y * 0.06 - 300}px)` }}
            />
            <div
              className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/15 blur-[180px] transition-transform duration-[1800ms]"
              style={{ transform: `translate(${mouse.x * -0.07 + 260}px, ${mouse.y * -0.05 + 180}px)` }}
            />
            <div
              className="absolute w-[520px] h-[520px] rounded-full bg-purple-500/15 blur-[160px] transition-transform duration-[2000ms]"
              style={{ transform: `translate(${mouse.x * 0.05 - 160}px, ${mouse.y * 0.04 - 120}px)` }}
            />
          </div>
        )}
      </div>

      {/* Real-time stats bar */}
      <div className={`relative z-30 w-full px-4 sm:px-8 mt-4 md:mt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <RealTimeStats />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 w-full flex items-center">
        <div className="w-full max-w-[125rem] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-16 pb-24 md:pt-24">
          <div className="max-w-6xl">
            {/* Logo */}
            <div className={`flex justify-center mb-10 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}> 
              <FoursquareLogo size="xl" showText={false} />
            </div>

            {/* Greeting */}
            <p className={`text-amber-300/90 font-medium tracking-widest uppercase text-xs sm:text-sm mb-6 flex items-center gap-3 justify-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden />
              {greetings[timeOfDay]}
            </p>

            {/* Headline */}
            <div className="text-center">
              <h1 className={`font-black leading-[0.85] tracking-tight drop-shadow-2xl transition-all duration-[1400ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-[clamp(2.8rem,8vw,6.5rem)]`}> 
                <span className="block text-white">Foursquare Ajebo</span>
                <span className="block bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-50 bg-clip-text text-transparent text-[clamp(2rem,5.2vw,4.5rem)] font-light italic mt-4">Retreat • Worship • Renewal</span>
              </h1>

              {/* Rotating testimonial / spiritual phrase */}
              <div className="relative h-14 sm:h-16 mt-10 mb-10 overflow-hidden">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 flex items-center justify-center text-base sm:text-xl md:text-2xl font-light italic text-blue-100 transition-all duration-700 ${i === testimonialIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    aria-hidden={i !== testimonialIndex}
                  >
                    “{t}”
                  </div>
                ))}
              </div>

              {/* Subtext */}
              <p className={`mx-auto max-w-4xl text-sm sm:text-lg md:text-xl text-white/85 leading-relaxed backdrop-blur-sm px-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Nigeria's premier spiritual retreat centre: <span className="text-amber-200 font-semibold">heavenly worship</span>,
                <span className="text-blue-200 font-semibold"> world‑class hospitality</span>, and
                <span className="text-purple-200 font-semibold"> transformative community</span> in the sacred heart of Ogun State.
              </p>
            </div>

            {/* CTAs */}
            <div className={`mt-14 flex flex-col lg:flex-row items-center justify-center gap-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} role="group" aria-label="Primary actions">
              <Link
                href="/facilities"
                className="group relative inline-flex items-center justify-center rounded-3xl px-12 py-6 text-base sm:text-lg font-bold tracking-wide overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 shadow-[0_15px_60px_-10px_rgba(245,158,11,0.55)] hover:shadow-[0_18px_70px_-6px_rgba(245,158,11,0.75)] transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 min-w-[250px]"
                data-analytics="hero_cta_book_retreat"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <span>Book Retreat</span>
                  <span className="text-2xl group-hover:rotate-12 transition-transform">🏛️</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <span className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-600 to-yellow-500 blur opacity-40 group-hover:opacity-80 transition-opacity" />
              </Link>

              <Link
                href="/streaming"
                className="group relative inline-flex items-center justify-center rounded-3xl px-12 py-6 text-base sm:text-lg font-semibold border-2 border-blue-300/60 backdrop-blur-lg bg-white/10 text-blue-50 hover:bg-white/20 hover:border-blue-200/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50 transition-all duration-500 hover:scale-110 min-w-[250px]"
                data-analytics="hero_cta_join_live"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <span>Join Live Worship</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">🎥</span>
                </span>
              </Link>

              <Link
                href="/giving"
                className="group relative inline-flex items-center justify-center rounded-3xl px-12 py-6 text-base sm:text-lg font-semibold border-2 border-purple-300/60 backdrop-blur-lg bg-gradient-to-r from-purple-500/25 to-pink-500/25 text-purple-50 hover:from-purple-400/35 hover:to-pink-400/35 hover:border-purple-200/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300/50 transition-all duration-500 hover:scale-110 min-w-[250px]"
                data-analytics="hero_cta_give"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <span>Give with Joy</span>
                  <span className="text-2xl group-hover:scale-125 transition-transform">💝</span>
                </span>
              </Link>
            </div>

            {/* Feature badges */}
            <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {[
                { icon: '🙏', label: '24/7 Prayer', color: 'text-amber-200' },
                { icon: '🏨', label: 'Luxury Suites', color: 'text-blue-200' },
                { icon: '📡', label: 'HD Streaming', color: 'text-purple-200' },
                { icon: '🌿', label: 'Peaceful Grounds', color: 'text-green-200' }
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 cursor-default"
                >
                  <span className="text-2xl" aria-hidden>{f.icon}</span>
                  <span className={`text-xs font-medium tracking-wide ${f.color}`}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 z-50"
        aria-label={`${audioOn ? 'Pause' : 'Play'} ambient background audio`}
      >
        <span className="text-xl" aria-hidden>{audioOn ? '🔊' : '🔇'}</span>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce-gentle" aria-hidden>
        <div className="w-9 h-14 border-2 border-amber-300/70 rounded-full flex justify-center items-start pt-3">
          <div className="w-1.5 h-4 bg-amber-300 rounded-full animate-pulse" />
        </div>
      </div>

      <span className="sr-only">Immersive hero section with real-time service status, viewer count, donation progress, bold heading, inspirational rotating phrases, and calls to action.</span>
    </section>
  );
};

export default SpectacularHeroSection;
