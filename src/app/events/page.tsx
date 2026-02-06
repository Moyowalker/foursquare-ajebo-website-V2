'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Event } from '@/types/events';
import { mockEvents, getUpcomingEvents, getFeaturedEvents } from '@/data/events';
import { EventCalendar } from '@/components/events/EventCalendar';
import { EventDetailsModal } from '@/components/events/EventDetailsModal';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegister = (event: Event) => {
    // This would typically integrate with a registration system
    alert(`Registration for "${event.title}" would open here. This will be connected to a proper registration system.`);
  };

  const upcomingEvents = getUpcomingEvents(6);
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              National programs • Booked events • Retreats
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold mt-6">Upcoming programs & events</h1>
            <p className="text-lg md:text-xl text-stone-600 mt-4 leading-relaxed">
              Discover national programs, retreats, conferences, and ministry events hosted at Camp Ajebo.
              Plan ahead and secure your place early.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => setViewMode('calendar')}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-emerald-700 text-white'
                    : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                📅 Calendar View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                  viewMode === 'list'
                    ? 'bg-emerald-700 text-white'
                    : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                📋 List View
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar/List View Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-stone-200 bg-white shadow-sm p-4 md:p-6">
            <EventCalendar
              events={upcomingEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Featured programs</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto mt-3">
              Highlighted national programs and conferences hosted at Camp Ajebo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-44">
                  <Image
                    src={event.imageUrl || '/images/facilities/real/main-conference-hall.jpeg.JPG'}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700">
                    {event.status}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    {new Date(event.startDate).toLocaleDateString()} • {event.venue}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-900">{event.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 line-clamp-3">{event.shortDescription}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-emerald-700">
                      {event.price === 0 ? 'Free' : `₦${event.price.toLocaleString()}`}
                    </span>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleRegister(event)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold"
                      >
                        Register
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEventClick(event)}
                        className="text-stone-500 hover:text-stone-700 font-semibold"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Event impact</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto mt-3">
              A snapshot of the reach and consistency of our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Annual events', icon: '📅' },
              { number: '5,000+', label: 'Annual attendees', icon: '👥' },
              { number: '98%', label: 'Satisfaction rate', icon: '⭐' },
              { number: '15+', label: 'Program categories', icon: '🎯' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-semibold text-emerald-700 mb-2">{stat.number}</div>
                <div className="text-sm text-stone-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl border border-stone-200 p-10 shadow-sm">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-3xl md:text-4xl font-semibold">Stay updated</h2>
              <p className="text-lg text-stone-600 mt-3 mb-8 leading-relaxed">
                Subscribe to receive updates on upcoming programs, early bird offers, and booking windows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button className="px-8 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800">
                  Subscribe
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50"
                >
                  Event inquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          onRegister={() => handleRegister(selectedEvent)}
        />
      )}
    </div>
  );
}
