'use client';

import { useEffect, useRef, useState } from 'react';
import { Event } from '@/types/events';
import { mockEvents, getUpcomingEvents, getFeaturedEvents } from '@/data/events';
import { EventCalendar } from '@/components/events/EventCalendar';
import { EventDetailsModal } from '@/components/events/EventDetailsModal';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function EventsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(30,64,175,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(245,158,11,0.1),transparent_50%)]"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join us for life-changing experiences, spiritual growth, and meaningful fellowship. 
              Discover events designed to strengthen your faith and build lasting community connections.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <SpectacularButton
                variant={viewMode === 'calendar' ? 'primary' : 'outline'}
                onClick={() => setViewMode('calendar')}
              >
                📅 Calendar View
              </SpectacularButton>
              <SpectacularButton
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                📋 List View
              </SpectacularButton>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar/List View Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <EventCalendar
            events={upcomingEvents}
            onEventClick={handleEventClick}
          />
        </div>
      </section>

      {/* Featured Events */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Events
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't miss these highlighted events that are designed to impact lives and strengthen community bonds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <SpectacularCard
                key={event.id}
                className="h-full"
                onClick={() => handleEventClick(event)}
                glow
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">
                      {event.category === 'youth-camp' ? '🏕️' : 
                       event.category === 'family-camp' ? '👨‍👩‍👧‍👦' : 
                       event.category === 'leadership-training' ? '👑' :
                       event.category === 'worship-service' ? '🎵' :
                       event.category === 'bible-study' ? '📖' : '✨'}
                    </span>
                    <SpectacularBadge variant="info" size="sm">
                      {event.status}
                    </SpectacularBadge>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📅</span>
                      <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📍</span>
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">💰</span>
                      <span>{event.currency}{event.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <SpectacularButton 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleRegister(event)}
                    >
                      Register
                    </SpectacularButton>
                    <SpectacularButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEventClick(event)}
                    >
                      Details
                    </SpectacularButton>
                  </div>
                </div>
              </SpectacularCard>
            ))}
          </div>
        </div>
      </section>

      {/* Event Statistics */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Event Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the transformative power of our events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Annual Events", icon: "📅" },
              { number: "5,000+", label: "Annual Attendees", icon: "👥" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "15+", label: "Event Categories", icon: "🎯" }
            ].map((stat, index) => (
              <SpectacularCard key={stat.label} className="p-6 text-center" hover>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </SpectacularCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SpectacularCard className="p-12">
              <div className="text-6xl mb-6">📧</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Subscribe to our newsletter to be the first to know about upcoming events, 
                early bird offers, and exclusive updates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <SpectacularButton className="px-8 py-3">
                  Subscribe ✨
                </SpectacularButton>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Event Inquiries 💬
                </SpectacularButton>
              </div>
            </SpectacularCard>
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
