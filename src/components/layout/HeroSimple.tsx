'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Building2, CreditCard } from 'lucide-react';

type Props = { onQuickPay?: () => void };

export default function HeroSimple({ onQuickPay }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-16 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-900">Camp Ajebo</h1>
            <p className="mt-4 text-lg text-stone-600">Worship. Rest. Community.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700">
                <CalendarDays className="h-5 w-5" /> Plan Visit
              </Link>
              <Link href="/facilities" className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-stone-900 hover:bg-stone-50">
                <Building2 className="h-5 w-5" /> Facilities
              </Link>
              <button onClick={onQuickPay} className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-stone-900 hover:bg-stone-50">
                <CreditCard className="h-5 w-5" /> Quick Pay
              </button>
              <Link href="/auth/login" className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 text-stone-900 hover:bg-stone-50">
                Login
              </Link>
              <Link href="/auth/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
                Register
              </Link>
            </div>
          </div>

          <div className="relative h-[22rem] md:h-[26rem] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <Image
              src="/images/facilities/real/main-conference-hall.jpeg.JPG"
              alt="Camp Ajebo Conference Hall"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
