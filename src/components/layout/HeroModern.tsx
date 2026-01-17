"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Sparkles, ArrowRight, CalendarDays, Building2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-xl px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-600"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600"
              >
                Register
              </Link>
type Props = { onQuickPay?: () => void };

// Animated counter component
function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target);
  const suffix = target.replace(/\d+/g, '');

  useEffect(() => {
    if (isNaN(numericTarget)) {
      setCount(numericTarget);
      return;
    }
    let start = 0;
    const duration = 2000;
    const increment = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <div className="relative group">
      <div className="relative rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-xl px-5 py-4 text-center hover:bg-slate-800 transition-colors">
        <div className="text-3xl md:text-4xl font-bold text-white">
          {isNaN(numericTarget) ? target : `${count}${suffix}`}
        </div>
        <div className="mt-2 text-xs text-slate-400 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function HeroModern({ onQuickPay }: Props) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle color accents */}
        <div className="absolute -top-64 -left-64 h-[40rem] w-[40rem] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute -bottom-64 -right-64 h-[48rem] w-[48rem] rounded-full bg-red-900/15 blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 h-[30rem] w-[30rem] rounded-full bg-amber-900/10 blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container relative mx-auto px-6 py-20 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-red-900/50 bg-red-950/30 backdrop-blur-xl px-4 py-1.5 text-sm font-medium text-red-100 shadow-lg"
            >
              <Sparkles className="h-4 w-4 text-red-400" />
              A sacred retreat for worship, rest, and renewal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-bold text-white"
            >
              Foursquare Camp Ajebo
              <span className="block mt-2 text-red-500">
                Where Faith Meets Fellowship
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="mt-5 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl"
            >
              Find stillness, community, and world‑class hospitality across our beautiful
              grounds, guest houses, conference spaces, and worship center in Ogun State.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-red-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-red-900/40 transition-all hover:bg-red-700 hover:shadow-red-900/60"
              >
                <CalendarDays className="h-5 w-5" />
                Plan Your Visit
              </Link>
              <Link
                href="/facilities"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-600/50 bg-slate-800/40 backdrop-blur-xl px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-slate-800/60 hover:border-slate-500/70"
              >
                <Building2 className="h-5 w-5" />
                <span>Explore Facilities</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
              <button
                type="button"
                onClick={onQuickPay}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-xl px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-600"
              >
                <CreditCard className="h-5 w-5" />
                Quick Pay
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="mt-10 grid grid-cols-3 gap-5 max-w-2xl"
            >
              <AnimatedCounter target="50+" label="Years of Ministry" />
              <AnimatedCounter target="50000+" label="Annual Guests" />
              {/* <AnimatedCounter target="1000000+" label="Lives Impacted" /> */}
            </motion.div>
          </div>

          {/* Right: Immersive Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Subtle glow behind images */}
            <div className="absolute -inset-12 bg-red-900/20 blur-3xl rounded-full" />
            
            {/* Large hero image */}
            <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 will-change-transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/images/facilities/real/main-conference-hall.jpeg.JPG"
                alt="Main Conference Center at Camp Ajebo"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>

            {/* Offset secondary images with parallax effect */}
            <div className="absolute -right-6 top-8 w-52 h-40 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 will-change-transform hover:scale-110 hover:-rotate-2 transition-all duration-300">
              <Image
                src="/images/facilities/real/accommodation/international-guest-house.jpg"
                alt="International Guest House"
                fill
                sizes="(min-width: 1024px) 12rem, 40vw"
                className="object-cover object-center"
              />

            </div>
            <div className="absolute -right-10 bottom-16 w-60 h-48 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 will-change-transform hover:scale-110 hover:rotate-2 transition-all duration-300">
              <Image
                src="/images/facilities/real/dining-restaurant.JPG"
                alt="Delish Fingers Restaurant"
                fill
                sizes="(min-width: 1024px) 16rem, 45vw"
                className="object-cover object-center"
              />

            </div>

            {/* Floating badge - redesigned */}
            <div className="absolute -bottom-6 -left-3 flex max-w-sm items-center gap-4 rounded-3xl border border-slate-700 bg-slate-900/95 backdrop-blur-2xl px-5 py-4 shadow-2xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-950/40 ring-2 ring-red-900/50">
                <span className="text-2xl">⛪</span>
              </div>
              <div className="flex-1 text-slate-200 font-medium leading-snug text-sm">
                Peaceful, purpose‑built campus for worship & gatherings
              </div>
              <ArrowRight className="h-4 w-4 text-red-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-sm text-slate-300 shadow-lg">
          <ChevronDown className="h-5 w-5 animate-bounce" />
          <span className="font-medium">Scroll to explore</span>
        </div>
      </div>

      {/* Local styles for animations */}
      <style jsx>{`
        /* Removed all gradient and orb animations for cleaner look */
      `}</style>
    </section>
  );
}
