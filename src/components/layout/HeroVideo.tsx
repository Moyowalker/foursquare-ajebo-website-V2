'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CalendarDays, Building2, CreditCard } from 'lucide-react';

type Props = { onQuickPay?: () => void };

export default function HeroVideo({ onQuickPay }: Props) {
  const [canPlay, setCanPlay] = useState(false);
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/camp-ambient.mp4';
  const posterUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_POSTER || '/images/facilities/real/main-conference-hall.jpeg.JPG';

  useEffect(() => {
    const t = setTimeout(() => setCanPlay(true), 300); // small delay to avoid layout jank
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[78vh] flex items-center">
      {/* Video background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {canPlay ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={posterUrl} alt="Camp Ajebo" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Foursquare Camp Ajebo</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            A peaceful destination for worship, conferences, and meaningful community.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-white hover:bg-amber-700">
              <CalendarDays className="h-5 w-5" /> Plan Your Visit
            </Link>
            <Link href="/facilities" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-white hover:bg-white/20">
              <Building2 className="h-5 w-5" /> Explore Facilities
            </Link>
            <button onClick={onQuickPay} className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-white hover:bg-white/20">
              <CreditCard className="h-5 w-5" /> Quick Pay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
