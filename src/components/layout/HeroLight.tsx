'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Building2, CreditCard } from 'lucide-react';

type Props = { onQuickPay?: () => void };

export default function HeroLight({ onQuickPay }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-stone-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-[48px] bg-gradient-to-r from-stone-100 via-white to-stone-100" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-stone-900">
              Welcome to <span className="text-stone-700 font-extrabold">Camp Ajebo</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-stone-600 max-w-xl">
              A serene Christian retreat offering guest houses, modern conference halls, and vibrant fellowship.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-3 text-white hover:bg-black">
                <CalendarDays className="h-5 w-5" /> Plan a Visit
              </Link>
              <Link href="/facilities" className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-stone-900 hover:bg-stone-50">
                <Building2 className="h-5 w-5" /> Explore Facilities
              </Link>
              <button onClick={onQuickPay} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-stone-900 hover:bg-stone-50">
                <CreditCard className="h-5 w-5" /> Quick Pay
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-stone-600">
              <span className="rounded-md bg-stone-100 px-3 py-1">24/7 Hospitality</span>
              <span className="rounded-md bg-stone-100 px-3 py-1">500+ Guest Capacity</span>
              <span className="rounded-md bg-stone-100 px-3 py-1">Modern Conference Center</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[22rem] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image src="/images/facilities/real/conference/gabriel-adombe-building.jpg" alt="Conference Center" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative h-40 rounded-xl overflow-hidden shadow ring-1 ring-black/5">
                <Image src="/images/facilities/real/accommodation/international-guest-house.jpg" alt="Guest House" fill className="object-cover" />
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden shadow ring-1 ring-black/5">
                <Image src="/images/facilities/real/dining-restaurant.JPG" alt="Restaurant" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
