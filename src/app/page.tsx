'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
};

type Audience = {
  title: string;
  description: string;
  icon: string;
};

const ROOMS: Room[] = [
  {
    name: 'Executive Guest House',
    description: 'Spacious suites for leaders, families, and special retreats.',
    image: '/images/facilities/real/accommodation/executive-guest-house.jpg',
    amenities: ['En-suite', 'Quiet setting', 'Premium bedding'],
  },
  {
    name: 'International Guest House',
    description: 'Comfortable, well-appointed rooms for rest and reflection.',
    image: '/images/facilities/real/accommodation/international-guest-house.jpg',
    amenities: ['Air-conditioned', 'Work desk', 'Private bath'],
  },
  {
    name: 'Jehovah Shammah House',
    description: 'Warm, peaceful lodging ideal for small retreats and teams.',
    image: '/images/facilities/real/jehovah-shammah-house.jpeg',
    amenities: ['Group-friendly', 'Serene views', 'Daily housekeeping'],
  },
  {
    name: 'Modern Guest Rooms',
    description: 'Simple, restful rooms designed for quiet nights and early mornings.',
    image: '/images/facilities/real/modern-guest-rooms.JPG',
    amenities: ['Comfort beds', 'Fresh linens', 'Easy access'],
  },
];

const FACILITIES: Facility[] = [
  {
    title: 'Conference Halls',
    description: 'Well-equipped halls for retreats, seminars, and conferences.',
    icon: '🏛️',
  },
  {
    title: 'Dining Facilities',
    description: 'On-site dining for groups with wholesome meals and service.',
    icon: '🍽️',
  },
  {
    title: 'Serene Environment',
    description: 'Quiet gardens, prayer areas, and peaceful walking paths.',
    icon: '🌿',
  },
  {
    title: 'Accessible Grounds',
    description: 'Easy-to-navigate camp layout with ample parking.',
    icon: '🧭',
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

export default function HomePage() {
  const [selectedRoomType, setSelectedRoomType] = useState('Executive Guest House');
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
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

  const contactQuery = new URLSearchParams({
    booking: 'true',
    roomType: selectedRoomType,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: String(guestCount),
  });

  const contactHref = `/contact?${contactQuery.toString()}`;

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
                Guest room bookings • Retreats • Conferences
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-stone-900">
                Stay at Foursquare Gospel Camp, Ajebo
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl">
                A peaceful retreat destination with welcoming guest rooms, serene grounds, and
                spaces designed for rest, reflection, and meaningful gatherings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/facilities/accommodation"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium shadow-lg hover:bg-emerald-800 transition-colors"
                >
                  View Guest Rooms
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 text-emerald-800 font-medium hover:bg-emerald-50 transition-colors"
                >
                  Plan a Retreat
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  'Guest rooms',
                  'Retreat lodging',
                  'Conference halls',
                  'Serene grounds',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-stone-200 bg-white/80 px-3 py-2 text-sm text-stone-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/facilities/real/international-guest-house.jpeg.jpg"
                  alt="Guest house at Foursquare Gospel Camp, Ajebo"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
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
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Request booking
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
              <h2 className="text-3xl md:text-4xl font-semibold">Facilities built for retreats</h2>
              <p className="text-lg text-stone-600">
                From conference halls to serene outdoor spaces, everything is designed to help
                guests feel welcomed, rested, and focused.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {FACILITIES.map((facility) => (
                  <div key={facility.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <div className="text-2xl mb-2">{facility.icon}</div>
                    <h3 className="font-semibold text-stone-900">{facility.title}</h3>
                    <p className="text-sm text-stone-600 mt-1">{facility.description}</p>
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
                  src: '/images/facilities/real/main-conference-hall.jpeg.JPG',
                  alt: 'Main conference hall at Camp Ajebo',
                },
                {
                  src: '/images/facilities/real/dining-restaurant.JPG',
                  alt: 'Dining facilities at Camp Ajebo',
                },
                {
                  src: '/images/facilities/real/outdoor-stadium.JPG',
                  alt: 'Outdoor grounds and recreation space',
                },
                {
                  src: '/images/facilities/real/modern-guest-rooms.JPG',
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
                  title: 'Tell us your needs',
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
                src: '/images/facilities/real/main-conference-hall.jpeg.JPG',
                alt: 'Conference hall interior',
              },
              {
                src: '/images/facilities/real/accommodation/executive-guest-house.jpg',
                alt: 'Executive guest house exterior',
              },
              {
                src: '/images/facilities/real/dining-restaurant.JPG',
                alt: 'Dining facility at the camp',
              },
              {
                src: '/images/facilities/real/outdoor-stadium.JPG',
                alt: 'Outdoor grounds and pathways',
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

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to plan your stay?</h2>
            <p className="mt-3 text-lg text-stone-600 max-w-2xl mx-auto">
              Share your dates and goals, and we’ll help you create a peaceful, well-organized retreat.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium hover:bg-emerald-800"
              >
                Request Booking
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 text-emerald-800 font-medium hover:bg-emerald-50"
              >
                Explore Facilities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}