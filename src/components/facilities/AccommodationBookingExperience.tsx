"use client";

import { useMemo, useState } from "react";
import { Calendar, Phone, Users, Wallet } from "lucide-react";
import AccommodationAvailability, { BookingDetails } from "@/components/facilities/AccommodationAvailability";
import { AccommodationBookingModal } from "@/components/facilities/AccommodationBookingModal";
import type { Facility } from "@/lib/image-config";

interface AccommodationBookingExperienceProps {
  facilities: Facility[];
}

export default function AccommodationBookingExperience({
  facilities,
}: AccommodationBookingExperienceProps) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: "",
    checkOut: "",
    guests: "2",
    phone: "",
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);

  const minPrice = useMemo(() => {
    const prices = facilities
      .map((f) => f.startingRate)
      .filter((v): v is number => typeof v === "number");
    if (!prices.length) return undefined;
    return Math.min(...prices);
  }, [facilities]);

  const priceSummary = minPrice
    ? `Starting from ₦${minPrice.toLocaleString()} / night`
    : "Contact for rates";

  const handleChange = (field: keyof BookingDetails, value: string) => {
    setBookingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const openBooking = (propertyName?: string) => {
    setSelectedProperty(propertyName);
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* Sticky booking bar */}
      <div className="sticky top-0 z-30">
        <div className="bg-white/90 backdrop-blur shadow-md border border-emerald-50 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Book your stay</p>
              <p className="text-xs text-gray-600">{priceSummary}</p>
            </div>
            <button
              type="button"
              onClick={() => openBooking(undefined)}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              Book now
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="sm:hidden inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700"
            >
              {mobileOpen ? "Hide booking form" : "Book now"}
            </button>
          </div>

          <div className={`${mobileOpen ? "block" : "hidden sm:block"}`}>
            <div className="grid sm:grid-cols-4 gap-3 sm:items-end">
              <div>
                <label className="text-xs font-semibold text-gray-700">Check-in</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <input
                    type="date"
                    value={bookingDetails.checkIn}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                    className="w-full text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Check-out</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <input
                    type="date"
                    value={bookingDetails.checkOut}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                    className="w-full text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Guests</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <input
                    type="number"
                    min={1}
                    value={bookingDetails.guests}
                    onChange={(e) => handleChange("guests", e.target.value)}
                    className="w-full text-sm text-gray-900 outline-none"
                    placeholder="2"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Phone</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full text-sm text-gray-900 outline-none"
                    placeholder="e.g. +234 800 000 0000"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => openBooking(undefined)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <Wallet className="w-4 h-4" />
                Book now
              </button>
              <p className="text-xs text-gray-600">We’ll include these details in your booking request.</p>
            </div>
          </div>
        </div>
      </div>

      <AccommodationAvailability
        facilities={facilities}
        bookingDetails={bookingDetails}
        onBook={(facility) => openBooking(facility?.name)}
      />

      <AccommodationBookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultPropertyName={selectedProperty}
        defaultBookingDetails={bookingDetails}
      />
    </div>
  );
}
