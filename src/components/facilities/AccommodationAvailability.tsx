'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, CalendarClock, CheckCircle, Users, X } from 'lucide-react';
import type { Facility } from '@/lib/image-config';

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: string;
  phone: string;
}

interface AccommodationAvailabilityProps {
  facilities: Facility[];
  bookingDetails: BookingDetails;
  onBook: (facility?: Facility) => void;
}

export default function AccommodationAvailability({ facilities, bookingDetails, onBook }: AccommodationAvailabilityProps) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [activeImageByFacility, setActiveImageByFacility] = useState<Record<string, number>>({});

  const formatCurrency = (amount?: number) =>
    typeof amount === 'number'
      ? `₦${amount.toLocaleString()}`
      : 'Contact for rates';

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedFacility(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!facilities.length) return null;

  return (
    <div className="mb-16">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
          <CheckCircle className="w-4 h-4" /> Available Now
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Commercially Available Accommodation</h2>
        <p className="text-gray-600 max-w-3xl mt-3">
          View the rooms currently open for bookings. Each option includes pricing, capacity, and a quick link to reserve.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow"
          >
            <div className="relative h-52">
              {facility.images?.[activeImageByFacility[facility.id] ?? 0] ? (
                <Image
                  src={facility.images[activeImageByFacility[facility.id] ?? 0].src}
                  alt={facility.images[activeImageByFacility[facility.id] ?? 0].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                {facility.subcategory ? facility.subcategory.toUpperCase() : 'ACCOMMODATION'}
              </div>
              {facility.availabilityNote && (
                <div className="absolute bottom-4 left-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                  {facility.availabilityNote}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{facility.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-400">From</p>
                  <p className="text-xl font-bold text-emerald-600">{formatCurrency(facility.startingRate)}</p>
                  <p className="text-xs text-gray-500">per night</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>
                    {facility.maxGuests
                      ? `Up to ${facility.maxGuests} guests`
                      : 'Flexible occupancy'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  <span>{facility.roomType ?? 'Room type'}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <CalendarClock className="w-4 h-4 text-emerald-600" />
                  <span>Flexible check-in • Bookings confirmed within 24 hours</span>
                </div>
              </div>

              {facility.features && facility.features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {facility.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFacility(facility)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  View property
                </button>
                <button
                  type="button"
                  onClick={() => onBook(facility)}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  Book now
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFacility && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-16">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedFacility(null)} />
          <div
            className="relative z-10 w-full max-w-6xl rounded-2xl bg-white shadow-2xl overflow-hidden flex max-h-[calc(100vh-6rem)] flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedFacility.name} details`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">From</p>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(selectedFacility.startingRate)}</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedFacility.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 p-6 overflow-y-auto">
              <div className="lg:col-span-2 space-y-4">
                <div className="relative h-72 md:h-80 overflow-hidden rounded-2xl border border-emerald-100 bg-gray-50">
                  {selectedFacility.images?.[activeImageByFacility[selectedFacility.id] ?? 0] && (
                    <Image
                      src={selectedFacility.images[activeImageByFacility[selectedFacility.id] ?? 0].src}
                      alt={selectedFacility.images[activeImageByFacility[selectedFacility.id] ?? 0].alt}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {selectedFacility.images?.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() =>
                        setActiveImageByFacility((prev) => ({
                          ...prev,
                          [selectedFacility.id]: index,
                        }))
                      }
                      className={`relative h-16 overflow-hidden rounded-lg border ${
                        (activeImageByFacility[selectedFacility.id] ?? 0) === index
                          ? 'border-emerald-500 ring-2 ring-emerald-200'
                          : 'border-transparent'
                      }`}
                    >
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Room type</span>
                    <span className="font-semibold text-gray-900">{selectedFacility.roomType ?? 'Standard room'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Capacity</span>
                    <span className="font-semibold text-gray-900">
                      {selectedFacility.maxGuests ? `${selectedFacility.maxGuests} guests` : 'Flexible'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Check-in</span>
                    <span className="font-semibold text-gray-900">2:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Check-out</span>
                    <span className="font-semibold text-gray-900">12:00 PM</span>
                  </div>
                </div>

                {selectedFacility.features && selectedFacility.features.length > 0 && (
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">What this room offers</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {selectedFacility.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onBook(selectedFacility)}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    Book now with these details
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
