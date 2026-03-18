'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { mockEvents } from '@/data/events';
import PaymentModal from '@/components/payments/PaymentModal';

type Room = {
  name: string;
  description: string;
  image: string;
  amenities: string[];
};

type Facility = {
  title: string;
  description: string;
  icon: string;
  image: string;
  href: string;
};

type Audience = {
  title: string;
  description: string;
  icon: string;
};

type Stat = {
  label: string;
  value: string;
  detail: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const ROOMS: Room[] = [
  {
    name: 'Diamond Estate',
    description: 'Premium family-friendly accommodation with spacious rooms and a calm residential setting.',
    image: '/images/facilities/accommodation/diamond-estate/IMG_6673.JPG',
    amenities: ['Spacious rooms', 'Quiet setting', 'Family-friendly'],
  },
  {
    name: 'International Guest House',
    description: 'Comfortable, well-appointed rooms for rest and reflection.',
    image: '/images/facilities/accommodation/international-guest-house/IMG_6618.jpg',
    amenities: ['Air-conditioned', 'Work desk', 'Private bath'],
  },
  {
    name: 'Jonathan Odega House',
    description: 'Warm, peaceful lodging ideal for ministry teams, small retreats, and visiting guests.',
    image: '/images/facilities/accommodation/jonathan-odega-house/IMG_6603.JPG',
    amenities: ['Group-friendly', 'Serene views', 'Retreat-ready'],
  },
  {
    name: 'Ruby Estate',
    description: 'A peaceful estate-style stay designed for extended visits, family gatherings, and comfort.',
    image: '/images/facilities/accommodation/ruby-estate/IMG_6681.JPG',
    amenities: ['Estate setting', 'Comfort beds', 'Extended-stay comfort'],
  },
];

const FACILITY_GALLERY = [
  { src: '/images/facilities/accommodation/international-guest-house/IMG_6643.JPG', label: 'International Guest House' },
  { src: '/images/facilities/accommodation/diamond-estate/IMG_6671.JPG', label: 'Diamond Estate' },
  { src: '/images/facilities/conference/auditorium/a54474d6-2bb6-44f7-b2c7-41c5a6cb66ce.jpeg', label: 'Main Auditorium' },
  { src: '/images/facilities/dining/delish-fingers/IMG_6578.JPG', label: 'Delish Fingers' },
  { src: '/images/facilities/infrastructure/main-gate/IMG_6771.jpeg', label: 'Camp Entrance' },
  { src: '/images/facilities/recreation/sports-centre/IMG_6691.JPG', label: 'Sports Centre' },
  { src: '/images/facilities/accommodation/gabriel-farombi-building/IMG_6582.JPG', label: 'Gabriel Farombi Building' },
  { src: '/images/facilities/accommodation/jonathan-odega-house/IMG_6612.JPG', label: 'Jonathan Odega House' },
  { src: '/images/facilities/accommodation/ruby-estate/IMG_6688.JPG', label: 'Ruby Estate' },
  { src: '/images/facilities/recreation/gym/IMG_6710.JPG', label: 'Fitness Gym' },
];

const HERO_IMAGES = [
  '/images/facilities/infrastructure/main-gate/IMG_6771.jpeg',
  '/images/facilities/accommodation/international-guest-house/IMG_6618.jpg',
  '/images/facilities/conference/auditorium/09bedef6-413c-4c3a-afd0-349e0659362f.jpeg',
  '/images/facilities/accommodation/ruby-estate/IMG_6681.JPG',
  '/images/facilities/recreation/sports-centre/IMG_6700.JPG',
];

const FACILITIES: Facility[] = [
  {
    title: 'Premium Lodging',
    description:
      'From executive suites with modern amenities to comfortable group dormitories, we accommodate every budget and group size.',
    icon: '🛏️',
    image: '/images/facilities/accommodation/diamond-estate/IMG_6674.JPG',
    href: '/facilities/accommodation',
  },
  {
    title: 'Conference Centers',
    description:
      'State-of-the-art auditoriums and breakout rooms equipped with sound systems, perfect for corporate or spiritual events.',
    icon: '🏛️',
    image: '/images/facilities/conference/auditorium/8a8b9a2d-15a1-492b-a1b9-9b4dfabd4590.jpeg',
    href: '/facilities/conference-halls',
  },
  {
    title: 'Serene Environment',
    description:
      'Acres of manicured landscapes, prayer gardens, and walking trails designed to help you disconnect and reconnect.',
    icon: '🌿',
    image: '/images/facilities/recreation/sports-centre/IMG_6704.JPG',
    href: '/facilities/recreation',
  },
  {
    title: 'Secure Environment',
    description:
      'Located in a gated, secure environment at Ajebo, offering peace of mind for families and organizers.',
    icon: '🛡️',
    image: '/images/facilities/infrastructure/main-gate/IMG_6766.jpeg',
    href: '/facilities',
  },
];

const AUDIENCES: Audience[] = [
  {
    title: 'Church Retreats',
    description: 'Space for worship, teaching, and spiritual renewal.',
    icon: '🙏',
  },
  {
    title: 'Families',
    description: 'Quiet rooms and safe grounds for rest and bonding.',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: 'Conferences',
    description: 'Flexible halls for events, trainings, and gatherings.',
    icon: '🎤',
  },
  {
    title: 'Members',
    description: 'A familiar home for fellowship, prayer, and service.',
    icon: '🧑‍🤝‍🧑',
  },
  {
    title: 'Individuals Seeking Rest',
    description: 'A calm place to breathe, reflect, and renew.',
    icon: '🕊️',
  },
];

const STATS: Stat[] = [
  {
    label: 'Capacity',
    value: '20,000+',
    detail: 'we accommodate every budget and group size.',
  },
  {
    label: 'Facility pillars',
    value: '4',
    detail: 'Serene grounds, A+ security, 24/7 Electricity, World-class accommodations',
  },
  {
    label: 'Booking support',
    value: '1:1',
    detail: 'Guided assistance from inquiry to checkout.',
  },
  {
    label: 'On-site essentials',
    value: 'All-in-one',
    detail: 'Accommodation, recreation, medical centre, and hospitality.',
  },
];

const FEATURED_TESTIMONIAL: Testimonial = {
  quote:
    'Hosting over 10,000 people requires more than just space; it demands exceptional organization and a truly peaceful atmosphere. For five years, Foursquare Camp Ajebo has delivered exactly that. The facilities are outstanding, but it\'s the dedicated support staff that keeps us coming back. They take the stress out of logistics so we can focus entirely on the spiritual impact of our retreat.',
  name: 'Pastor Tunde Ogunripe',
  role: 'Coordinator, Saints Community Church',
};

export default function HomePage() {
  const [selectedRoomType, setSelectedRoomType] = useState('Executive Guest House');
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const roomMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!roomMenuRef.current || roomMenuRef.current.contains(event.target as Node)) {
        return;
      }
      setIsRoomMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const contactQuery = new URLSearchParams({
    booking: 'true',
    roomType: selectedRoomType,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: String(guestCount),
  });

  const contactHref = `/contact?${contactQuery.toString()}`;
  const programs = mockEvents.slice(0, 6);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                Open to the public
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-stone-900">
                Sanctuary.
                <br />
                Community.
                <br />
                Renewal.
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl">
                Experience the perfect blend of spiritual tranquility and modern hospitality. Whether you're planning a corporate conference, a church retreat, or a quiet weekend escape, Foursquare Camp Ajebo is your destination for peace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/facilities/accommodation"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium shadow-lg hover:bg-emerald-800 transition-colors"
                >
                  Explore Accommodation
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 text-emerald-800 font-medium hover:bg-emerald-50 transition-colors"
                >
                  Visual Tour
                </Link>
              </div>

              <p className="text-sm text-stone-500">
                24/7 Electricity • 24/7 Security • Serene grounds • World-class Facilities
              </p>


            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {HERO_IMAGES.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Foursquare Gospel Camp Ajebo accommodation"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-cover transition-opacity duration-1000 ${
                      index === heroIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    priority={index === 0}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-lg border border-stone-200">
                <div className="text-sm text-stone-500">Peaceful environment</div>
                <div className="text-lg font-semibold text-stone-900">Restful, welcoming stays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Bar */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="-mt-8 mb-10 rounded-3xl border border-stone-200 bg-white shadow-lg">
            <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto_auto]">
              <div
                ref={roomMenuRef}
                className="relative"
                onMouseEnter={() => setIsRoomMenuOpen(true)}
                onMouseLeave={() => setIsRoomMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsRoomMenuOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-medium text-stone-700 hover:bg-white"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-stone-400">Room type</span>
                    <span className="mt-1 block text-base text-stone-900">{selectedRoomType}</span>
                  </span>
                  <span className="text-stone-400">▾</span>
                </button>

                {isRoomMenuOpen && (
                  <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-stone-200 bg-white shadow-xl">
                    {[
                      'Executive Guest House',
                      'International Guest House',
                      'Retreat Lodging',
                      'Conference Accommodation',
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedRoomType(option);
                          setIsRoomMenuOpen(false);
                        }}
                        className="block w-full px-4 py-3 text-left text-sm text-stone-700 hover:bg-stone-50 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <label className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                <span className="block text-xs uppercase tracking-wide text-stone-400">Check-in</span>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(event) => setCheckInDate(event.target.value)}
                  className="mt-1 block w-full bg-transparent text-base text-stone-900 focus:outline-none"
                />
              </label>

              <label className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                <span className="block text-xs uppercase tracking-wide text-stone-400">Check-out</span>
                <input
                  type="date"
                  min={checkInDate || undefined}
                  value={checkOutDate}
                  onChange={(event) => setCheckOutDate(event.target.value)}
                  className="mt-1 block w-full bg-transparent text-base text-stone-900 focus:outline-none"
                />
              </label>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                <span className="block text-xs uppercase tracking-wide text-stone-400">Guests</span>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                    className="h-8 w-8 rounded-full border border-stone-200 text-stone-600 hover:bg-white"
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="text-base font-semibold text-stone-900">{guestCount} guest{guestCount > 1 ? 's' : ''}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((count) => Math.min(20, count + 1))}
                    className="h-8 w-8 rounded-full border border-stone-200 text-stone-600 hover:bg-white"
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>

              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-emerald-700"
              >
                <Search className="h-4 w-4" />
                Check availability
              </Link>

              <Link
                href="/facilities/accommodation"
                className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                View rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Online Payment Portal */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-emerald-200 bg-white shadow-lg p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Online payment portal</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 mt-2">
                  Make a payment in minutes
                </h2>
                <p className="text-stone-600 mt-2 max-w-2xl">
                  Pay service charges, bookings, and other camp services securely online.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold hover:bg-emerald-800"
                >
                  Make a payment
                </button>
                <Link
                  href="/giving/donate"
                  className="rounded-xl border border-emerald-200 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50"
                >
                  Giving & donations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Explore our facilities</h2>
              <p className="mt-2 text-lg text-stone-600 max-w-2xl">
                A quick visual tour of guest houses, halls, dining, and outdoor spaces.
              </p>
            </div>
            <Link
              href="/facilities"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
            >
              View all facilities →
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max gap-6 px-6 py-6 animate-marquee pause-marquee-on-hover">
              {[...FACILITY_GALLERY, ...FACILITY_GALLERY].map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative h-48 w-72 overflow-hidden rounded-2xl shadow-sm"
                  aria-hidden={index >= FACILITY_GALLERY.length}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">
                    {image.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Rooms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Guest rooms & accommodation</h2>
              <p className="mt-3 text-lg text-stone-600 max-w-2xl">
                Comfortable rooms designed for rest, quiet reflection, and group retreats.
              </p>
            </div>
            <Link
              href="/facilities/accommodation"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Explore all rooms
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room) => (
              <div key={room.name} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-stone-900">{room.name}</h3>
                  <p className="mt-2 text-sm text-stone-600">{room.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link
                      href="/facilities/accommodation"
                      className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      View / Book Room
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Environment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold">Designed for Rest, Built for Gathering</h2>
              <p className="text-lg text-stone-600">
                We go beyond basic camping. Our facilities are engineered to support large-scale conventions while maintaining intimate pockets of peace for personal reflection.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {FACILITIES.map((facility) => (
                  <div
                    key={facility.title}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-32">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 text-xl">{facility.icon}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-900">{facility.title}</h3>
                      <p className="text-sm text-stone-600 mt-1">{facility.description}</p>
                      <Link
                        href={facility.href}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href="/facilities"
                  className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Explore facilities
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  src: '/images/facilities/conference/auditorium/a54474d6-2bb6-44f7-b2c7-41c5a6cb66ce.jpeg',
                  alt: 'Main conference hall at Camp Ajebo',
                },
                {
                  src: '/images/facilities/dining/delish-fingers/IMG_6579.JPG',
                  alt: 'Dining facilities at Camp Ajebo',
                },
                {
                  src: '/images/facilities/recreation/sports-centre/IMG_6706.JPG',
                  alt: 'Outdoor grounds and recreation space',
                },
                {
                  src: '/images/facilities/accommodation/ruby-estate/IMG_6685.JPG',
                  alt: 'Modern guest rooms at Camp Ajebo',
                },
              ].map((image) => (
                <div key={image.src} className="relative h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Booked Events */}
      <section className="py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium tracking-wide uppercase mb-4">
              Upcoming Programs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              National programs &<br className="hidden sm:block" /> booked events
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              A snapshot of the programs already scheduled by churches and organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((event, index) => {
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);
              const month = startDate.toLocaleString('en', { month: 'short' }).toUpperCase();
              const day = startDate.getDate();
              const isMultiDay = startDate.toDateString() !== endDate.toDateString();
              const spotsLeft = event.capacity - event.registeredCount;
              const fillPercent = Math.round((event.registeredCount / event.capacity) * 100);
              const isFree = event.price === 0;
              const typeIcons: Record<string, string> = { camp: '🏕️', retreat: '🌿', conference: '🎤', service: '🙏', workshop: '📖', outreach: '🤝' };
              const typeIcon = typeIcons[event.type] || '✨';
              const accentColors = [
                'from-emerald-500 to-teal-600',
                'from-amber-500 to-orange-600',
                'from-blue-500 to-indigo-600',
                'from-violet-500 to-purple-600',
                'from-rose-500 to-pink-600',
                'from-cyan-500 to-sky-600',
              ];
              const accent = accentColors[index % accentColors.length];

              return (
                <div
                  key={event.id}
                  className="group relative bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-0 overflow-hidden hover:bg-white/[0.10] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Accent gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${accent}`} />

                  <div className="p-6">
                    {/* Top row: date block + badges */}
                    <div className="flex items-start gap-4">
                      {/* Date Block */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${accent} flex flex-col items-center justify-center shadow-lg`}>
                        <span className="text-[10px] font-bold tracking-widest text-white/80">{month}</span>
                        <span className="text-2xl font-black leading-none text-white">{day}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-medium text-white/80">
                            {typeIcon} {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          {isFree && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[11px] font-bold tracking-wide">
                              FREE
                            </span>
                          )}
                          {event.featured && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-300 text-[11px] font-bold tracking-wide">
                              ⭐ FEATURED
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight truncate">{event.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm text-white/50 line-clamp-2 leading-relaxed">{event.shortDescription}</p>

                    {/* Meta details */}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                      <span>📍 {event.venue}</span>
                      {isMultiDay && (
                        <span>📅 {startDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })} – {endDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>
                      )}
                      <span>👥 {event.ageGroup === 'all-ages' ? 'All Ages' : event.ageGroup.charAt(0).toUpperCase() + event.ageGroup.slice(1)}</span>
                    </div>

                    {/* Capacity progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-white/40">{event.registeredCount} registered</span>
                        <span className={`font-semibold ${spotsLeft < 20 ? 'text-amber-400' : 'text-white/50'}`}>
                          {spotsLeft} spots left
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${accent} transition-all duration-700`}
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer: price + CTA */}
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        {isFree ? (
                          <span className="text-lg font-bold text-emerald-400">Free</span>
                        ) : (
                          <span className="text-lg font-bold text-white">
                            ₦{event.price.toLocaleString()}
                            <span className="text-xs font-normal text-white/40 ml-1">/ person</span>
                          </span>
                        )}
                      </div>
                      <Link
                        href="/events"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${accent} text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
                      >
                        View details
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-stone-900 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Explore all programs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Who the Camp is For */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Who the camp is for</h2>
            <p className="mt-3 text-lg text-stone-600 max-w-3xl mx-auto">
              A welcoming environment for churches, families, conferences, and individuals seeking rest.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AUDIENCES.map((audience) => (
              <div key={audience.title} className="rounded-2xl border border-stone-200 bg-white p-5 text-center">
                <div className="text-3xl mb-3">{audience.icon}</div>
                <h3 className="font-semibold text-stone-900">{audience.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Booking is simple and guided</h2>
              <p className="mt-4 text-white/80 text-lg">
                Share your dates and needs. Our team will help you choose the right rooms and facilities.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 px-6 py-3 font-medium hover:bg-stone-100"
                >
                  Request Booking
                </Link>
                <Link
                  href="/facilities"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-medium hover:bg-white/10"
                >
                  View Facilities
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                {
                  step: '1',
                  title: 'Choose your stay',
                  description: 'Select guest rooms or retreat lodging that fits your group.',
                },
                {
                  step: '2',
                  title: 'Check Availability',
                  description: 'Share dates, group size, and facility requirements.',
                },
                {
                  step: '3',
                  title: 'Receive confirmation',
                  description: 'We will guide you through availability and next steps.',
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-white/20 bg-white/10 p-5">
                  <div className="text-sm text-white/70">Step {item.step}</div>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-sm text-white/70 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">A calm and welcoming environment</h2>
              <p className="mt-3 text-lg text-stone-600 max-w-2xl">
                Glimpses of guest rooms, meeting halls, dining spaces, and the serene grounds.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
            >
              View gallery
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: '/images/facilities/conference/auditorium/09bedef6-413c-4c3a-afd0-349e0659362f.jpeg',
                alt: 'Conference hall interior',
              },
              {
                src: '/images/facilities/accommodation/diamond-estate/IMG_6675.JPG',
                alt: 'Diamond Estate accommodation exterior',
              },
              {
                src: '/images/facilities/dining/delish-fingers/IMG_6581.JPG',
                alt: 'Dining facility at the camp',
              },
              {
                src: '/images/facilities/infrastructure/main-gate/IMG_6770.jpeg',
                alt: 'Camp entrance and surrounding grounds',
              },
            ].map((image) => (
              <div key={image.src} className="relative h-40 md:h-48 rounded-2xl overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof + testimonial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <p className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 border border-emerald-100">
                  Our score card
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
                  See what makes us SHINE
                </h2>
                <p className="text-lg text-stone-600 max-w-3xl">
                  Everything you need in one campground: restful rooms, flexible halls, on-site dining, recreation, and a team that helps you plan every detail.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                    <div className="text-2xl font-semibold text-emerald-700">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-stone-900">{stat.label}</div>
                    <p className="mt-2 text-sm text-stone-600">{stat.detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium hover:bg-emerald-800"
                >
                  See guest stories
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 text-emerald-800 font-medium hover:bg-emerald-50"
                >
                  Book a stay
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-sky-100 blur-2xl" aria-hidden />
              <div className="relative rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl">
                <div className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Featured testimonial</div>
                <p className="mt-4 text-lg text-stone-900 leading-relaxed">"{FEATURED_TESTIMONIAL.quote}"</p>
                <div className="mt-6 text-sm font-semibold text-stone-900">{FEATURED_TESTIMONIAL.name}</div>
                <div className="text-sm text-stone-600">{FEATURED_TESTIMONIAL.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder CTA */}
      <section className="py-16 bg-stone-900 text-white mb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">Becoming a Stakeholder?</h2>
              <p className="text-lg text-white/80">
                Secure your land allocation, manage your on-site facilities, and handle service charges easily all in one place.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-stone-900 px-5 py-3 font-medium hover:bg-stone-100"
                >
                  Members Login
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 shadow-lg">
                <p className="text-sm text-white/70">New members</p>
                <p className="mt-1 text-sm text-white/90">Application for Land Allocation is made simple.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 shadow-lg">
                <p className="text-sm text-white/70">Existing Members</p>
                <p className="mt-1 text-sm text-white/90">
                  Manage your facility from the members portal i.e payment your service charge on the go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </main>
  );
}