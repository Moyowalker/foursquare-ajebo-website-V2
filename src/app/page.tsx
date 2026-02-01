'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentModal from '@/components/payments/PaymentModal';
import FloatingPayButton from '@/components/payments/FloatingPayButton';
import { PaymentCategory } from '@/types/payments';
import Hero from '@/components/layout/Hero';
import type { User } from '@/types/auth';

// Payments data used by redesigned grid
import type { PaymentCategory as Cat } from '@/types/payments';

type PaymentItem = {
  key: Cat;
  title: string;
  emoji: string;
  description: string;
  group: 'services' | 'utilities' | 'facilities' | 'other';
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

export default function HomePage() {
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState<PaymentCategory | undefined>();
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'utilities' | 'facilities'>('all');
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const openPaymentModal = (category?: PaymentCategory) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setSelectedPaymentCategory(category);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onQuickPay={() => openPaymentModal()} />

      {/* Quick Payments Section (auth-gated) */}
      <section className="relative py-20 overflow-hidden">
        {/* Soft gradient + decor */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-emerald-50" />
          <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-gradient-to-tr from-teal-200 via-emerald-200 to-cyan-200 blur-3xl opacity-50" />
          <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-amber-100 via-rose-100 to-pink-100 blur-3xl opacity-40" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            {!user ? (
              <div className="text-center max-w-3xl mx-auto bg-white/90 border border-stone-200 shadow-lg rounded-3xl px-8 py-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-4 py-2 text-sm font-semibold border border-amber-200">
                  Sign in required
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-stone-900">Login to make payments</h2>
                <p className="mt-2 text-stone-600">Please sign in to view and initiate payments for services, utilities, and facilities.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/auth/login" className="sm:w-auto w-full">
                    <SpectacularButton className="w-full">Login</SpectacularButton>
                  </Link>
                  <Link href="/auth/register" className="sm:w-auto w-full">
                    <SpectacularButton variant="outline" className="w-full">Create Account</SpectacularButton>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-stone-600 border border-stone-200">
                    Payments
                  </div>
                  <h2 className="mt-4 text-4xl md:text-5xl font-semibold mb-3">
                    <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">Quick & Secure Payments</span>
                  </h2>
                  <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                    Make payments conveniently for church services, utilities, and facilities.
                  </p>
                </div>

                {/* Controls: Tabs + Search */}
                <Controls
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  query={query}
                  setQuery={setQuery}
                  onAll={() => openPaymentModal()}
                />

                {/* Grid */}
                <PaymentsGrid
                  items={PAYMENT_ITEMS}
                  activeTab={activeTab}
                  query={query}
                  onSelect={(c) => openPaymentModal(c)}
                />

                {/* Security Features */}
                <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 border border-stone-200 text-stone-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 border border-stone-200 text-stone-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 border border-stone-200 text-stone-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Receipt</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About the Camp & Mission Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 leading-tight">
                    A Sacred Space for <span className="text-teal-700">Spiritual Growth</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-teal-600 mb-8"></div>
                </div>
                
                <p className="text-xl text-stone-600 leading-relaxed font-light">
                  For over seven decades, Foursquare Camp Ajebo has been a sanctuary where faith deepens, 
                  community flourishes, and hearts are transformed. Nestled in the serene landscape of 
                  Nigeria, our camp offers a peaceful retreat from the world's distractions.
                </p>
                
                <p className="text-lg text-stone-600 leading-relaxed">
                  Whether you're seeking personal renewal, planning a spiritual retreat, or organizing 
                  a conference, our facilities and community provide the perfect environment for 
                  meaningful encounters with God and one another.
                </p>

                {/* Mission Pillars */}
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Worship</h3>
                    <p className="text-sm text-stone-600">Authentic spiritual experiences</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Fellowship</h3>
                    <p className="text-sm text-stone-600">Genuine Christian community</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📖</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Learning</h3>
                    <p className="text-sm text-stone-600">Biblical teaching and growth</p>
                  </div>
                </div>

                <div className="pt-8">
                  <Link 
                    href="/about" 
                    className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium transition-colors"
                  >
                    Learn more about our story
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <Image
                    src="/images/facilities/real/international-guest-house.jpeg.jpg"
                    alt="International Guest House - Premium Accommodation at Camp Ajebo"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-100/50 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-100/50 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Programs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Activities & Faith-Based Programs
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Experience diverse programs designed to strengthen your faith, build community, 
              and create lasting spiritual memories.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Spiritual Retreats */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-emerald-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/jehovah-shammah-house.jpeg"
                  alt="Jehovah Shammah House - Peaceful Retreat Accommodation"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Spiritual Retreats</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Escape from daily distractions and focus on deepening your relationship with God 
                  through prayer, meditation, and biblical study.
                </p>
                <div className="flex items-center text-teal-700 font-medium">
                  <span className="text-sm">Learn more</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Worship Services */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-sky-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/main-conference-hall.jpeg.JPG"
                  alt="Rev. Gabriel Adome Building - Main Worship and Conference Center"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Worship Services</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Join us for uplifting worship experiences with contemporary music, 
                  inspiring messages, and heartfelt communion with God.
                </p>
                <div className="flex items-center text-sky-700 font-medium">
                  <span className="text-sm">Service times</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Conferences & Events */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-amber-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/accommodation/executive-guest-house.jpg"
                  alt="Executive Guest House - Premium Conference Accommodation"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Conferences & Events</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Host your spiritual conferences, leadership training, and special events 
                  in our well-equipped facilities.
                </p>
                <div className="flex items-center text-amber-700 font-medium">
                  <span className="text-sm">Plan event</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Youth Programs */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-rose-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/outdoor-stadium.JPG"
                  alt="Sports Stadium - Youth Recreation and Activities"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Youth Programs</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Dynamic programs designed to engage young people in faith, leadership, 
                  and community service through fun and meaningful activities.
                </p>
                <div className="flex items-center text-rose-700 font-medium">
                  <span className="text-sm">Join youth</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Community Outreach */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-teal-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/dining-restaurant.JPG"
                  alt="Delishringers Restaurant - Community Dining and Fellowship"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Community Outreach</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Serve the local community through charitable works, educational programs, 
                  and initiatives that demonstrate God's love in action.
                </p>
                <div className="flex items-center text-teal-700 font-medium">
                  <span className="text-sm">Get involved</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Prayer & Meditation */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-indigo-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/modern-guest-rooms.JPG"
                  alt="Modern Guest Houses - Peaceful Accommodation for Prayer and Reflection"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Prayer & Meditation</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Find quiet spaces for personal prayer and meditation in our peaceful 
                  garden areas and dedicated prayer rooms.
                </p>
                <div className="flex items-center text-indigo-700 font-medium">
                  <span className="text-sm">Find peace</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Facilities Showcase */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Premium Facilities & Accommodations
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Experience comfort and tranquility in our thoughtfully designed facilities, 
              crafted to support your spiritual journey and community gatherings.
            </p>
          </div>

          {/* Featured Facilities */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Guest House */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/real/accommodation/international-guest-house.jpg"
                  alt="International Guest House - Premium Accommodation"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-light mb-3">Guest Accommodations</h3>
                  <p className="text-stone-200 font-light">Comfortable rooms designed for rest and reflection</p>
                </div>
              </div>
            </div>

            {/* Conference Center */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/real/conference/gabriel-adombe-building.jpg"
                  alt="Gabriel Adombe Building - Main Conference Center"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-light mb-3">Conference Center</h3>
                  <p className="text-stone-200 font-light">Modern venues for worship and gatherings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Delish Fingers Restaurant</h4>
              <p className="text-sm text-stone-600">Fine dining with local and international cuisine</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Recreation Center</h4>
              <p className="text-sm text-stone-600">Sports facilities and wellness activities</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Beautiful Grounds</h4>
              <p className="text-sm text-stone-600">Landscaped gardens perfect for reflection</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Meeting Rooms</h4>
              <p className="text-sm text-stone-600">Intimate spaces for prayer and discussion</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/facilities" 
              className="inline-flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              Explore All Facilities
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Gallery & Experience Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Experience Our Beautiful Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Step into a serene environment designed for spiritual growth, fellowship, 
              and meaningful connections in the heart of Nigeria.
            </p>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/images/facilities/real/main-conference-hall.jpeg.JPG"
                  alt="Foursquare Camp Ajebo Main Conference Center"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">Welcome to Camp Ajebo</h4>
                </div>
              </div>
            </div>

            {/* Gallery images */}
              <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/images/facilities/real/modern-guest-rooms.JPG"
                  alt="Modern Guest Rooms - Premium Accommodation"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/images/facilities/real/dining-restaurant.JPG"
                  alt="Delishringers Restaurant - Quality Dining Experience"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/images/facilities/real/jehovah-shammah-house.jpeg"
                  alt="Jehovah Shammah House - Spiritual Retreat Center"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/real/outdoor-stadium.JPG"
                alt="Outdoor Stadium - Recreation and Events"
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Statistics Row */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-12 px-8 text-white mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100">Annual Guests</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-blue-100">Facility Types</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2,000,000+</div>
                <div className="text-blue-100">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">70+</div>
                <div className="text-blue-100">Years of Ministry</div>
              </div>
            </div>
          </div>

          {/* Experience Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🙏',
                title: 'Worship Services',
                description: 'Join our uplifting worship services in our beautiful auditorium'
              },
              {
                icon: '🏨',
                title: 'Comfortable Stay',
                description: 'Experience peaceful rest in our well-appointed guest facilities'
              },
              {
                icon: '🍽️',
                title: 'Fine Dining',
                description: 'Enjoy delicious meals at our Delish Fingers restaurant'
              },
              {
                icon: '�',
                title: 'Peaceful Grounds',
                description: 'Find tranquility in our beautifully landscaped campus'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link 
              href="/gallery" 
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Full Gallery
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery & Campus Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Campus Highlights & Gallery
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Discover the beauty and serenity of our campus through these glimpses 
              of life at Foursquare Camp Ajebo.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {/* Featured large image */}
            <div className="col-span-2 row-span-2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div style={{background: 'linear-gradient(135deg, #065f46 0%, #0891b2 100%)'}} className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-6xl block mb-4">⛪</span>
                    <h4 className="font-light text-xl">Welcome to Our Sacred Space</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery thumbnails */}
            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: '#0891b2'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🏨</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: '#059669'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🍽️</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🌿</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: 'linear-gradient(135deg, #0891b2 0%, #7c2d12 100%)'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🏃</span>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="bg-teal-700 rounded-2xl py-16 px-8 text-white mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-light mb-4">Our Community Impact</h3>
                <div className="w-12 h-0.5 bg-amber-200 mx-auto"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">50,000+</div>
                  <div className="text-teal-100 font-light">Annual Guests</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">12</div>
                  <div className="text-teal-100 font-light">Facility Types</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">2,000,000+</div>
                  <div className="text-teal-100 font-light">Lives Touched</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">70+</div>
                  <div className="text-teal-100 font-light">Years of Ministry</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/gallery" 
              className="inline-flex items-center bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              View Full Gallery
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials & Impact Stories */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Stories of <span className="text-teal-700">Transformation</span>
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Hear from those whose lives have been touched by their experience at Camp Ajebo, 
              where faith deepens and community flourishes.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Pastor Sarah O.</h4>
                  <p className="text-sm text-stone-500">Youth Leader</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "Camp Ajebo provided the perfect environment for our youth retreat. The peaceful 
                atmosphere and excellent facilities allowed our young people to truly connect 
                with God and each other."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Rev. Michael A.</h4>
                  <p className="text-sm text-stone-500">Conference Organizer</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "The conference facilities exceeded our expectations. Professional setup, 
                comfortable accommodations, and the spiritual atmosphere made our leadership 
                conference truly impactful."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Mrs. Grace N.</h4>
                  <p className="text-sm text-stone-500">Retreat Participant</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "My personal retreat at Camp Ajebo was life-changing. The quiet spaces for 
                prayer and meditation, combined with the warm fellowship, renewed my spirit 
                and strengthened my faith."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-stone-800 mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              Join the thousands who have experienced spiritual growth and community at Camp Ajebo.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              Share Your Story
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action - Conversion Focused */}
      <section className="relative py-24 overflow-hidden">
        {/* Natural background with earth tones */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #065f46 0%, #0891b2 50%, #7c2d12 100%)'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              Begin Your <span className="text-amber-200">Spiritual Journey</span>
            </h2>
            <div className="w-20 h-0.5 bg-amber-200 mx-auto mb-8"></div>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Whether you're seeking personal renewal, planning a retreat, organizing a conference, 
              or celebrating a special occasion, Camp Ajebo provides the perfect sanctuary for 
              meaningful spiritual encounters.
            </p>

            {/* Quick Services Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
              <h3 className="text-2xl font-light text-white mb-6">Quick Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  href="/forms/land-allocation"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Land Allocation</h4>
                  <p className="text-white/70 text-sm">Apply for Allen Camp plots</p>
                </Link>
                
                <Link 
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Book Facilities</h4>
                  <p className="text-white/70 text-sm">Reserve accommodation</p>
                </Link>
                
                <Link 
                  href="/member"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Member Portal</h4>
                  <p className="text-white/70 text-sm">Access member services</p>
                </Link>
                
                <Link 
                  href="/giving"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Give Online</h4>
                  <p className="text-white/70 text-sm">Support our ministry</p>
                </Link>
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">WhatsApp</h3>
                <p className="text-white/70 mb-4 text-sm">Quick responses</p>
                <a 
                  href="https://wa.me/2347036555871" 
                  className="text-green-300 hover:text-green-200 font-medium"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  +234 703 655 5871
                </a>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Call Direct</h3>
                <p className="text-white/70 mb-4 text-sm">Personal assistance</p>
                <a 
                  href="tel:+2347032192546" 
                  className="text-sky-300 hover:text-sky-200 font-medium"
                >
                  +234 703 219 2546
                </a>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Email Us</h3>
                <p className="text-white/70 mb-4 text-sm">Detailed planning</p>
                <a 
                  href="mailto:info@foursquarecampajebo.org" 
                  className="text-amber-300 hover:text-amber-200 font-medium"
                >
                  info@foursquarecampajebo.org
                </a>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                href="/contact" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-12 py-4 rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Plan Your Visit Today
              </Link>
              <Link 
                href="/facilities" 
                className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 font-medium px-12 py-4 rounded-lg text-xl transition-all duration-300"
              >
                Tour Our Facilities
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              <Link href="/about" className="hover:text-white transition-colors duration-200 font-light">
                Our Story
              </Link>
              <Link href="/giving" className="hover:text-white transition-colors duration-200 font-light">
                Support Our Mission
              </Link>
              <Link href="/events" className="hover:text-white transition-colors duration-200 font-light">
                Upcoming Events
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors duration-200 font-light">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialCategory={selectedPaymentCategory}
      />

      {/* Floating Payment Button */}
      <FloatingPayButton onClick={() => openPaymentModal()} />
    </div>
  );
}

// --- Local UI components for Payments redesign ---
type ControlsProps = {
  activeTab: 'all' | 'services' | 'utilities' | 'facilities';
  setActiveTab: (t: 'all' | 'services' | 'utilities' | 'facilities') => void;
  query: string;
  setQuery: (v: string) => void;
  onAll: () => void;
};

function Controls({ activeTab, setActiveTab, query, setQuery, onAll }: ControlsProps) {
  const tabs: Array<{ id: ControlsProps['activeTab']; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'services', label: 'Services' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'facilities', label: 'Facilities' },
  ];

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto py-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm border transition-colors ${
              activeTab === t.id
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white/80 text-stone-700 border-stone-200 hover:bg-white'
            }`}
            aria-pressed={activeTab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search + All */}
      <div className="flex w-full md:w-auto items-center gap-3">
        <div className="relative flex-1 md:flex-initial">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search payments…"
            className="w-full md:w-64 rounded-xl border border-stone-200 bg-white/80 px-4 py-2 text-sm text-stone-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">⌕</span>
        </div>
        <button
          onClick={onAll}
          className="rounded-xl border-2 border-teal-600/50 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-100"
        >
          All Payments
        </button>
      </div>
    </div>
  );
}

type PaymentsGridProps = {
  items: PaymentItem[];
  activeTab: 'all' | 'services' | 'utilities' | 'facilities';
  query: string;
  onSelect: (c: Cat) => void;
};

function PaymentsGrid({ items, activeTab, query, onSelect }: PaymentsGridProps) {
  const filtered = items.filter((i) => {
    const matchesTab = activeTab === 'all' || i.group === activeTab;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === '' || i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  return (
    <div>
      {/* Featured tile */}
      <div className="mb-6 grid lg:grid-cols-3 gap-6">
        <button
          onClick={() => onSelect('electricity')}
          className="relative col-span-1 lg:col-span-3 overflow-hidden rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-left text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <div className="text-sm uppercase tracking-wide text-white/80">Featured</div>
                <h3 className="text-2xl font-semibold">Electricity Vending</h3>
                <p className="text-white/85">Buy prepaid units and get instant confirmation</p>
              </div>
            </div>
            <div className="hidden md:block rounded-xl bg-white/15 px-3 py-1 text-sm">Most popular</div>
          </div>
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </button>
      </div>

      {/* Items grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((i) => (
          <button
            key={i.key}
            onClick={() => onSelect(i.key)}
            className="group bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl p-6 text-left transition-all duration-300 border border-stone-200 hover:border-stone-300 hover:shadow-md"
          >
            <div className="text-5xl mb-4">{i.emoji}</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">{i.title}</h3>
            <p className="text-stone-600 text-sm mb-3">{i.description}</p>
            <div className="text-teal-700 text-xs font-medium opacity-80 group-hover:opacity-100">Click to pay →</div>
          </button>
        ))}
      </div>
    </div>
  );
}