'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music,
  Mic,
  Users,
  Calendar,
  Guitar,
  Building,
  Play,
  Settings,
  Star,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Headphones,
  Video,
  Heart,
  Zap,
  Search,
  Bell,
  User,
  ChevronRight,
  Plus,
  Eye,
  Download,
  Share2,
  Monitor
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { DigitalHymnal } from '@/components/worship/DigitalHymnal';
import { LiveLyricsDisplay } from '@/components/worship/LiveLyricsDisplay';
import { ChoirScheduling } from '@/components/worship/ChoirScheduling';
import { InstrumentBookingPlatform } from '@/components/worship/InstrumentBookingPlatform';
import { StudioReservationSystem } from '@/components/worship/StudioReservationSystem';

type WorshipSection = 'dashboard' | 'hymnal' | 'lyrics' | 'choir' | 'instruments' | 'studio';

interface WorshipFeature {
  id: WorshipSection;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: {
    label: string;
    value: string | number;
    trend?: string;
  }[];
  quickActions: {
    label: string;
    action: () => void;
  }[];
}

export default function WorshipPlatform() {
  const [activeSection, setActiveSection] = useState<WorshipSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const features: WorshipFeature[] = [
    {
      id: 'hymnal',
      title: 'Digital Hymnal',
      description: 'Browse, search, and play hymns and worship songs with audio and lyrics',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-600',
      stats: [
        { label: 'Total Songs', value: 250 },
        { label: 'Categories', value: 6 },
        { label: 'With Audio', value: 180 }
      ],
      quickActions: [
        { label: 'Browse Songs', action: () => setActiveSection('hymnal') },
        { label: 'Popular Hymns', action: () => setActiveSection('hymnal') }
      ]
    },
    {
      id: 'lyrics',
      title: 'Live Lyrics Display',
      description: 'Present lyrics in real-time with karaoke-style highlighting and fullscreen mode',
      icon: <Monitor className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-600',
      stats: [
        { label: 'Active Sessions', value: 3 },
        { label: 'Display Themes', value: 8 },
        { label: 'Font Options', value: 12 }
      ],
      quickActions: [
        { label: 'Start Session', action: () => setActiveSection('lyrics') },
        { label: 'Settings', action: () => setActiveSection('lyrics') }
      ]
    },
    {
      id: 'choir',
      title: 'Choir Scheduling',
      description: 'Manage choir practices, member availability, and voice part assignments',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-400 to-teal-600',
      stats: [
        { label: 'Active Members', value: 24 },
        { label: 'This Month', value: '8 practices' },
        { label: 'Voice Parts', value: 4 }
      ],
      quickActions: [
        { label: 'Schedule Practice', action: () => setActiveSection('choir') },
        { label: 'View Calendar', action: () => setActiveSection('choir') }
      ]
    },
    {
      id: 'instruments',
      title: 'Instrument Booking',
      description: 'Reserve musical instruments and audio equipment with maintenance tracking',
      icon: <Guitar className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-600',
      stats: [
        { label: 'Available', value: 18 },
        { label: 'Active Bookings', value: 6 },
        { label: 'Categories', value: 6 }
      ],
      quickActions: [
        { label: 'Book Instrument', action: () => setActiveSection('instruments') },
        { label: 'View Inventory', action: () => setActiveSection('instruments') }
      ]
    },
    {
      id: 'studio',
      title: 'Studio Reservations',
      description: 'Book recording studios and practice rooms with equipment and scheduling',
      icon: <Building className="w-8 h-8" />,
      color: 'from-red-400 to-pink-600',
      stats: [
        { label: 'Available Rooms', value: 4 },
        { label: 'This Week', value: '$850 revenue' },
        { label: 'Equipment Items', value: 25 }
      ],
      quickActions: [
        { label: 'Book Studio', action: () => setActiveSection('studio') },
        { label: 'View Schedule', action: () => setActiveSection('studio') }
      ]
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'booking',
      title: 'Studio A Reserved',
      description: 'Emily Carter booked recording session for 3 hours',
      time: '2 hours ago',
      icon: <Building className="w-5 h-5" />,
      color: 'text-red-400'
    },
    {
      id: '2',
      type: 'practice',
      title: 'Choir Practice Scheduled',
      description: 'Sunday morning rehearsal added to calendar',
      time: '4 hours ago',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-400'
    },
    {
      id: '3',
      type: 'instrument',
      title: 'Guitar Booked',
      description: 'Taylor 814ce reserved for worship service',
      time: '6 hours ago',
      icon: <Guitar className="w-5 h-5" />,
      color: 'text-yellow-400'
    },
    {
      id: '4',
      type: 'lyrics',
      title: 'Lyrics Session Created',
      description: 'Christmas concert playlist prepared',
      time: '1 day ago',
      icon: <Mic className="w-5 h-5" />,
      color: 'text-purple-400'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Sunday Morning Rehearsal',
      time: 'Tomorrow 9:00 AM',
      type: 'Choir Practice',
      attendees: 18,
      location: 'Main Sanctuary'
    },
    {
      id: '2',
      title: 'Youth Band Studio Session',
      time: 'Jan 16, 7:00 PM',
      type: 'Studio Booking',
      attendees: 6,
      location: 'Studio B'
    },
    {
      id: '3',
      title: 'Christmas Concert Practice',
      time: 'Jan 21, 2:00 PM',
      type: 'Performance',
      attendees: 35,
      location: 'Fellowship Hall'
    }
  ];

  if (activeSection !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header Navigation */}
        <div className="sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ← Back to Dashboard
                </button>
                <div className="text-2xl font-bold">
                  <GradientText>
                    {features.find(f => f.id === activeSection)?.title}
                  </GradientText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render Active Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'hymnal' && <DigitalHymnal />}
            {activeSection === 'lyrics' && <LiveLyricsDisplay />}
            {activeSection === 'choir' && <ChoirScheduling />}
            {activeSection === 'instruments' && <InstrumentBookingPlatform />}
            {activeSection === 'studio' && <StudioReservationSystem />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Music className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">Worship Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Digital Ministry Hub</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital tools for worship services, choir management, instrument booking, 
              and studio reservations - all in one integrated platform.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search hymns, schedule practice, book instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 text-lg"
              />
            </div>
          </div>

          {/* Feature Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(feature.id)}
                className="cursor-pointer"
              >
                <GlassCard className="p-8 h-full hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-20 text-white group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {feature.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    {feature.quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-purple-400 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                      >
                        {action.label}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{activity.title}</h4>
                        <p className="text-sm text-slate-400">{activity.description}</p>
                      </div>
                      <div className="text-xs text-slate-500">
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">92%</div>
                      <div className="text-sm text-slate-400">System Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">156</div>
                      <div className="text-sm text-slate-400">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                      <div className="text-sm text-slate-400">Support</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Upcoming Events & Quick Actions */}
            <div className="space-y-8">
              
              {/* Upcoming Events */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-white/5 rounded-lg">
                      <h4 className="font-medium text-white mb-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full">
                          {event.type}
                        </span>
                        <span className="text-slate-400">
                          {event.attendees} attending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <SpectacularButton
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setActiveSection('choir')}
                >
                  View Full Calendar
                </SpectacularButton>
              </GlassCard>

              {/* Quick Actions */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                
                <div className="space-y-3">
                  <SpectacularButton
                    variant="primary"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => setActiveSection('lyrics')}
                  >
                    <Play className="w-4 h-4 mr-3" />
                    Start Lyrics Session
                  </SpectacularButton>

                  <SpectacularButton
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => setActiveSection('hymnal')}
                  >
                    <Music className="w-4 h-4 mr-3" />
                    Browse Hymnal
                  </SpectacularButton>

                  <SpectacularButton
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => setActiveSection('choir')}
                  >
                    <Plus className="w-4 h-4 mr-3" />
                    Schedule Practice
                  </SpectacularButton>

                  <SpectacularButton
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => setActiveSection('instruments')}
                  >
                    <Guitar className="w-4 h-4 mr-3" />
                    Book Instrument
                  </SpectacularButton>

                  <SpectacularButton
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => setActiveSection('studio')}
                  >
                    <Building className="w-4 h-4 mr-3" />
                    Reserve Studio
                  </SpectacularButton>
                </div>
              </GlassCard>

              {/* Platform Stats */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Platform Overview</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">All Systems</span>
                    </div>
                    <span className="text-sm font-medium text-green-400">Operational</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Live Streaming</span>
                    </div>
                    <span className="text-sm font-medium text-blue-400">Active</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Audio System</span>
                    </div>
                    <span className="text-sm font-medium text-purple-400">Connected</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-slate-300">Backup Status</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-400">Synced</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            Powered by Foursquare Camp Ajebo Church • Worship Platform v2.0
          </p>
        </div>
      </footer>
    </div>
  );
}
