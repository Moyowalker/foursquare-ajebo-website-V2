'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

interface Event {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'fellowship' | 'conference' | 'outreach' | 'youth' | 'special';
  date: string;
  time: string;
  endTime?: string;
  location: string;
  registrationRequired: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  registrationDeadline?: string;
  cost: number;
  organizer: string;
  contactEmail: string;
  contactPhone?: string;
  imageUrl?: string;
  tags?: string[];
  registrants?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const mockEvents: Event[] = [
  {
    id: 'event-001',
    title: 'Christmas Carol Service',
    description: 'Join us for a special Christmas celebration with carols, testimonies, and fellowship. Come and celebrate the birth of our Lord Jesus Christ with the church family.',
    category: 'special',
    date: '2024-12-25',
    time: '10:00',
    endTime: '12:00',
    location: 'Main Sanctuary',
    registrationRequired: false,
    currentAttendees: 0,
    cost: 0,
    organizer: 'Pastor Emmanuel',
    contactEmail: 'pastor@foursquareajebo.org',
    contactPhone: '+234 801 234 5678',
    tags: ['christmas', 'celebration', 'family'],
    status: 'upcoming'
  },
  {
    id: 'event-002',
    title: 'New Year Prayer & Fasting',
    description: '21-day prayer and fasting program to start the new year. Daily prayer sessions and weekly teaching on spiritual disciplines.',
    category: 'special',
    date: '2025-01-01',
    time: '06:00',
    endTime: '07:00',
    location: 'Prayer Hall',
    registrationRequired: true,
    maxAttendees: 100,
    currentAttendees: 67,
    registrationDeadline: '2024-12-30',
    cost: 0,
    organizer: 'Prayer Ministry',
    contactEmail: 'prayer@foursquareajebo.org',
    tags: ['prayer', 'fasting', 'new year'],
    registrants: ['user-001'],
    status: 'upcoming'
  },
  {
    id: 'event-003',
    title: 'Youth Leadership Conference',
    description: 'Empowering young leaders with biblical principles and practical leadership skills. Featuring guest speakers and interactive workshops.',
    category: 'youth',
    date: '2025-01-15',
    time: '09:00',
    endTime: '17:00',
    location: 'Conference Hall',
    registrationRequired: true,
    maxAttendees: 50,
    currentAttendees: 23,
    registrationDeadline: '2025-01-10',
    cost: 5000,
    organizer: 'Youth Ministry',
    contactEmail: 'youth@foursquareajebo.org',
    contactPhone: '+234 802 345 6789',
    tags: ['youth', 'leadership', 'conference'],
    status: 'upcoming'
  },
  {
    id: 'event-004',
    title: 'Marriage Enrichment Seminar',
    description: 'Strengthen your marriage with biblical principles. For married couples and those preparing for marriage.',
    category: 'fellowship',
    date: '2025-02-14',
    time: '15:00',
    endTime: '18:00',
    location: 'Fellowship Hall',
    registrationRequired: true,
    maxAttendees: 30,
    currentAttendees: 18,
    registrationDeadline: '2025-02-10',
    cost: 3000,
    organizer: 'Family Ministry',
    contactEmail: 'family@foursquareajebo.org',
    tags: ['marriage', 'family', 'relationships'],
    status: 'upcoming'
  },
  {
    id: 'event-005',
    title: 'Community Outreach - Ajebo Market',
    description: 'Evangelism and free medical screening at the local market. Volunteers needed for various activities.',
    category: 'outreach',
    date: '2025-01-20',
    time: '08:00',
    endTime: '14:00',
    location: 'Ajebo Market Square',
    registrationRequired: true,
    maxAttendees: 25,
    currentAttendees: 15,
    registrationDeadline: '2025-01-18',
    cost: 0,
    organizer: 'Evangelism Team',
    contactEmail: 'outreach@foursquareajebo.org',
    tags: ['outreach', 'evangelism', 'community'],
    status: 'upcoming'
  },
  {
    id: 'event-006',
    title: 'Sunday Service',
    description: 'Regular Sunday worship service with praise, worship, and the Word of God.',
    category: 'service',
    date: '2025-01-05',
    time: '10:00',
    endTime: '12:30',
    location: 'Main Sanctuary',
    registrationRequired: false,
    currentAttendees: 0,
    cost: 0,
    organizer: 'Church Leadership',
    contactEmail: 'admin@foursquareajebo.org',
    tags: ['worship', 'service', 'weekly'],
    status: 'upcoming'
  }
];

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('upcoming');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    // Filter events based on search and filters
    let filtered = events;

    if (statusFilter) {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredEvents(filtered);
  }, [searchTerm, categoryFilter, statusFilter, events]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      service: '⛪',
      fellowship: '🤝',
      conference: '🎯',
      outreach: '💝',
      youth: '👥',
      special: '✨'
    };
    return icons[category as keyof typeof icons] || '📅';
  };

  const getCategoryName = (category: string) => {
    const names = {
      service: 'Worship Service',
      fellowship: 'Fellowship',
      conference: 'Conference',
      outreach: 'Outreach',
      youth: 'Youth Ministry',
      special: 'Special Event'
    };
    return names[category as keyof typeof names] || category;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: 'info' as const,
      ongoing: 'warning' as const,
      completed: 'success' as const,
      cancelled: 'danger' as const
    };
    return variants[status as keyof typeof variants] || 'info';
  };

  const isRegistered = (event: Event) => {
    return event.registrants?.includes(user?.id || '') || false;
  };

  const canRegister = (event: Event) => {
    if (!event.registrationRequired) return false;
    if (isRegistered(event)) return false;
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) return false;
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) return false;
    return true;
  };

  const handleRegister = (event: Event) => {
    if (!canRegister(event)) return;
    
    // Update event registration
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { 
            ...e, 
            currentAttendees: e.currentAttendees + 1,
            registrants: [...(e.registrants || []), user?.id || '']
          }
        : e
    ));
    
    alert(`Successfully registered for: ${event.title}`);
  };

  const handleUnregister = (event: Event) => {
    if (!isRegistered(event)) return;
    
    // Update event registration
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { 
            ...e, 
            currentAttendees: Math.max(0, e.currentAttendees - 1),
            registrants: (e.registrants || []).filter(id => id !== user?.id)
          }
        : e
    ));
    
    alert(`Successfully unregistered from: ${event.title}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/member/dashboard" className="text-blue-400 hover:text-blue-300">
                ← Back to Dashboard
              </Link>
              <span className="text-slate-400">•</span>
              <span className="text-white font-medium">Church Events</span>
            </div>
            
            {(user.role === 'admin' || user.role === 'pastor' || user.role === 'leader') && (
              <SpectacularButton variant="primary" size="sm">
                Create Event
              </SpectacularButton>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Church Events</h1>
          <p className="text-slate-300">
            Discover and register for church activities, services, and special events
          </p>
        </div>

        {/* Search and Filters */}
        <SpectacularCard className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Search Events</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                placeholder="Search by title, description, or tags..."
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="service">Worship Services</option>
                <option value="fellowship">Fellowship</option>
                <option value="conference">Conferences</option>
                <option value="outreach">Outreach</option>
                <option value="youth">Youth Ministry</option>
                <option value="special">Special Events</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-end">
              <SpectacularButton
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setStatusFilter('upcoming');
                }}
                className="w-full"
              >
                Clear Filters
              </SpectacularButton>
            </div>
          </div>
        </SpectacularCard>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-slate-300">
            Showing {filteredEvents.length} events
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <SpectacularCard className="p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Events Found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || categoryFilter
                ? "Try adjusting your search criteria or filters."
                : "No events match your current filter selection."}
            </p>
            <SpectacularButton
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setStatusFilter('upcoming');
              }}
            >
              View All Upcoming Events
            </SpectacularButton>
          </SpectacularCard>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <SpectacularCard key={event.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-4xl">
                      {getCategoryIcon(event.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-800 mr-4">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <SpectacularBadge 
                            variant={getStatusBadge(event.status)}
                            size="sm"
                          >
                            {event.status}
                          </SpectacularBadge>
                          <SpectacularBadge variant="outline" size="sm">
                            {getCategoryName(event.category)}
                          </SpectacularBadge>
                          {isRegistered(event) && (
                            <SpectacularBadge variant="success" size="sm">
                              Registered
                            </SpectacularBadge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-4">
                        <div>
                          <span className="font-medium">📅 Date:</span><br/>
                          {new Date(event.date).toLocaleDateString('en-NG', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div>
                          <span className="font-medium">⏰ Time:</span><br/>
                          {event.time} {event.endTime && `- ${event.endTime}`}
                        </div>
                        <div>
                          <span className="font-medium">📍 Location:</span><br/>
                          {event.location}
                        </div>
                      </div>

                      {event.registrationRequired && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span className="font-medium text-slate-700">Cost:</span><br/>
                              {event.cost === 0 ? 'Free' : `₦${event.cost.toLocaleString()}`}
                            </div>
                            <div>
                              <span className="font-medium text-slate-700">Attendees:</span><br/>
                              {event.currentAttendees}{event.maxAttendees && `/${event.maxAttendees}`}
                            </div>
                            {event.registrationDeadline && (
                              <div>
                                <span className="font-medium text-slate-700">Deadline:</span><br/>
                                {new Date(event.registrationDeadline).toLocaleDateString()}
                              </div>
                            )}
                            <div>
                              <span className="font-medium text-slate-700">Organizer:</span><br/>
                              {event.organizer}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.map((tag, index) => (
                            <SpectacularBadge key={index} variant="secondary" size="sm">
                              {tag}
                            </SpectacularBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 space-y-2">
                    {event.registrationRequired && (
                      <>
                        {isRegistered(event) ? (
                          <SpectacularButton
                            variant="danger"
                            size="sm"
                            onClick={() => handleUnregister(event)}
                          >
                            Unregister
                          </SpectacularButton>
                        ) : canRegister(event) ? (
                          <SpectacularButton
                            size="sm"
                            onClick={() => handleRegister(event)}
                          >
                            Register
                          </SpectacularButton>
                        ) : (
                          <SpectacularButton
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            {event.maxAttendees && event.currentAttendees >= event.maxAttendees 
                              ? 'Full' 
                              : 'Registration Closed'}
                          </SpectacularButton>
                        )}
                      </>
                    )}
                    
                    <div className="text-center">
                      <a 
                        href={`mailto:${event.contactEmail}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Contact Organizer
                      </a>
                    </div>
                  </div>
                </div>
              </SpectacularCard>
            ))}
          </div>
        )}

        {/* Quick Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Event Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { category: 'service', name: 'Services', icon: '⛪' },
              { category: 'fellowship', name: 'Fellowship', icon: '🤝' },
              { category: 'conference', name: 'Conferences', icon: '🎯' },
              { category: 'outreach', name: 'Outreach', icon: '💝' },
              { category: 'youth', name: 'Youth', icon: '👥' },
              { category: 'special', name: 'Special', icon: '✨' }
            ].map((cat) => (
              <SpectacularCard 
                key={cat.category} 
                className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCategoryFilter(cat.category)}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h3 className="font-bold text-slate-800 text-sm">{cat.name}</h3>
              </SpectacularCard>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📋 Event Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Registration:</h4>
              <ul className="space-y-1">
                <li>• Some events require registration</li>
                <li>• Registration may have deadlines</li>
                <li>• Limited capacity events fill up quickly</li>
                <li>• You can unregister if plans change</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Need Help?</h4>
              <ul className="space-y-1">
                <li>• Contact event organizers directly</li>
                <li>• Check with church office for details</li>
                <li>• Some events may require special preparation</li>
                <li>• Follow church announcements for updates</li>
              </ul>
            </div>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}
