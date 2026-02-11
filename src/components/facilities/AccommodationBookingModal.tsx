"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Send, X } from "lucide-react";

export interface BookingRequestPayload {
  propertyName?: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  phone: string;
  email: string;
  additionalNotes?: string;
}

interface AccommodationBookingModalProps {
  open: boolean;
  onClose: () => void;
  defaultPropertyName?: string;
  defaultBookingDetails?: Partial<BookingRequestPayload>;
}

export function AccommodationBookingModal({
  open,
  onClose,
  defaultPropertyName,
  defaultBookingDetails,
}: AccommodationBookingModalProps) {
  const [formData, setFormData] = useState<BookingRequestPayload>({
    propertyName: defaultPropertyName,
    checkIn: defaultBookingDetails?.checkIn || "",
    checkOut: defaultBookingDetails?.checkOut || "",
    guests: defaultBookingDetails?.guests || "2",
    name: defaultBookingDetails?.name || "",
    phone: defaultBookingDetails?.phone || "",
    email: defaultBookingDetails?.email || "",
    additionalNotes: defaultBookingDetails?.additionalNotes || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormData((prev) => ({
        ...prev,
        propertyName: defaultPropertyName,
        checkIn: defaultBookingDetails?.checkIn || "",
        checkOut: defaultBookingDetails?.checkOut || "",
        guests: defaultBookingDetails?.guests || "2",
        name: defaultBookingDetails?.name || "",
        phone: defaultBookingDetails?.phone || "",
        email: defaultBookingDetails?.email || "",
        additionalNotes: defaultBookingDetails?.additionalNotes || "",
      }));
      setSubmitted(false);
      setError(null);
    }
  }, [open, defaultPropertyName, defaultBookingDetails]);

  const handleChange = (field: keyof BookingRequestPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/forms/accommodation-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send booking request");
      }

      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-16">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Book your stay</p>
            <h3 className="text-lg font-semibold text-gray-900">
              {formData.propertyName || "Accommodation booking"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Request received</h4>
            <p className="text-sm text-gray-600">
              Thank you. Your booking request has been sent to our team. We will confirm availability
              and follow up with next steps shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.propertyName || ""}
                  onChange={(e) => handleChange("propertyName", e.target.value)}
                  placeholder="e.g. International Guest House"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Guests *</label>
                <input
                  type="number"
                  min={1}
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-in *</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.checkIn}
                  onChange={(e) => handleChange("checkIn", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-out *</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.checkOut}
                  onChange={(e) => handleChange("checkOut", e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full name *</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="e.g. +234 800 000 0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Additional notes</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.additionalNotes || ""}
                onChange={(e) => handleChange("additionalNotes", e.target.value)}
                placeholder="Special requests, arrival time, or questions"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit booking request
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
