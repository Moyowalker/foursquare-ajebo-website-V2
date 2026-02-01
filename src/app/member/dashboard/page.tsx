'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PaymentModal from '@/components/payments/PaymentModal';
import type { PaymentCategory } from '@/types/payments';
import type { User } from '@/types/auth';

type PaymentItem = {
  key: PaymentCategory;
  title: string;
  emoji: string;
  description: string;
  group: 'services' | 'utilities' | 'facilities';
};

const PAYMENT_ITEMS: PaymentItem[] = [
  { key: 'service-charge', title: 'Service Charge', emoji: '💳', description: 'Pay monthly or annual dues', group: 'services' },
  { key: 'electricity', title: 'Electricity Vending', emoji: '⚡', description: 'Purchase prepaid units', group: 'utilities' },
  { key: 'land-allocation', title: 'Land Allocation', emoji: '🏞️', description: 'Application fees & processing', group: 'services' },
  { key: 'guest-house', title: 'Guest House', emoji: '🏠', description: 'Accommodation reservations', group: 'facilities' },
  { key: 'block-industry', title: 'Block Industry', emoji: '🧱', description: 'Support construction projects', group: 'services' },
  { key: 'school-fees', title: 'School Fees', emoji: '🎓', description: 'Educational expenses', group: 'services' },
  { key: 'facilities-rental', title: 'Facilities Rental', emoji: '🏢', description: 'Meeting rooms & halls', group: 'facilities' },
];

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState<PaymentCategory | undefined>();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/auth/login');
      setLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const openPaymentModal = (category?: PaymentCategory) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setSelectedPaymentCategory(category);
    setIsPaymentModalOpen(true);
  };

  const filteredPayments = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PAYMENT_ITEMS;
    return PAYMENT_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-600">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm text-emerald-700 font-semibold">Member Portal</p>
                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                  Welcome back{user ? `, ${user.firstName}` : ''}
                </h1>
                <p className="mt-2 text-slate-600 max-w-2xl">
                  Manage your payments, bookings, and member services in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/member/profile" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Update Profile
                </Link>
                <Link href="/member/wallet" className="inline-flex items-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
                  Open Wallet
                </Link>
                <Link href="/member/giving" className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
                  Giving History
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Payments & Services', value: 'Quick pay & wallet' },
                { label: 'Bookings', value: 'Guest rooms & retreats' },
                { label: 'Community', value: 'Events & prayer requests' },
                { label: 'Documents', value: 'Membership records' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Payments & member services</h2>
                <p className="mt-2 text-slate-600 max-w-2xl">
                  Make service payments, utilities, and facility bookings from your portal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search payments"
                    className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                </div>
                <button
                  onClick={() => openPaymentModal()}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                >
                  Make a payment
                </button>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredPayments.map((item) => (
                <button
                  key={item.key}
                  onClick={() => openPaymentModal(item.key)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:bg-white hover:shadow-md"
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  <div className="mt-3 text-xs font-semibold text-emerald-700">Pay now →</div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/member/wallet" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Fund wallet
              </Link>
              <Link href="/member/giving" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Giving & donations
              </Link>
              <Link href="/giving" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Public giving page
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-semibold text-slate-900">Bookings & retreats</h2>
              <p className="mt-2 text-slate-600">
                Reserve guest rooms, conference halls, and retreat facilities with guided support.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Guest room bookings',
                    description: 'Explore available rooms and request a stay.',
                    href: '/facilities/accommodation',
                  },
                  {
                    title: 'Conference halls',
                    description: 'Plan retreats, seminars, and gatherings.',
                    href: '/facilities/conference-halls',
                  },
                  {
                    title: 'Retreat planning',
                    description: 'Share dates and needs for guided planning.',
                    href: '/contact',
                  },
                  {
                    title: 'Camp facilities',
                    description: 'Browse dining, recreation, and worship spaces.',
                    href: '/facilities',
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:shadow"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Upcoming actions</h2>
              <div className="mt-4 space-y-3">
                {[
                  'Complete your member profile for accurate records.',
                  'Submit prayer requests or follow up on responses.',
                  'Download updated camp documents and policies.',
                  'Review recent payments and wallet activity.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Member services</h2>
                <p className="mt-2 text-slate-600">Access your profile, documents, events, and community tools.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/member/events" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Events
                </Link>
                <Link href="/member/documents" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Documents
                </Link>
                <Link href="/member/prayer-requests" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Prayer requests
                </Link>
                <Link href="/member/directory" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Member directory
                </Link>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Profile & bio', desc: 'Update personal details and contact info.', href: '/member/profile' },
                { title: 'Documents', desc: 'View forms, guidelines, and approvals.', href: '/member/documents' },
                { title: 'Events', desc: 'Register and track attendance.', href: '/member/events' },
                { title: 'Prayer requests', desc: 'Submit or follow up on prayer needs.', href: '/member/prayer-requests' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:shadow">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialCategory={selectedPaymentCategory}
      />
    </div>
  );
}
