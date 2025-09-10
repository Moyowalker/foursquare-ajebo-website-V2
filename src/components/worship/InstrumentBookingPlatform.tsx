'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Guitar,
  Music,
  Piano,
  Mic,
  Headphones,
  Settings,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Circle,
  User,
  Phone,
  Mail,
  MapPin,
  Tool,
  Star,
  BookOpen,
  Archive,
  RotateCcw,
  Download,
  Upload
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { InstrumentBooking, Instrument, InstrumentCategory } from '@/types/worship';

// Mock data for instruments and categories
const mockCategories: InstrumentCategory[] = [
  { id: '1', name: 'Guitars', description: 'Acoustic and electric guitars', icon: '🎸', color: 'from-amber-400 to-orange-600' },
  { id: '2', name: 'Keyboards', description: 'Pianos and synthesizers', icon: '🎹', color: 'from-blue-400 to-indigo-600' },
  { id: '3', name: 'Drums', description: 'Drum sets and percussion', icon: '🥁', color: 'from-red-400 to-pink-600' },
  { id: '4', name: 'Audio Equipment', description: 'Microphones and sound gear', icon: '🎤', color: 'from-green-400 to-teal-600' },
  { id: '5', name: 'Brass', description: 'Trumpets, trombones, and horns', icon: '🎺', color: 'from-yellow-400 to-orange-600' },
  { id: '6', name: 'Strings', description: 'Violins, cellos, and bass', icon: '🎻', color: 'from-purple-400 to-pink-600' }
];

const mockInstruments: Instrument[] = [
  {
    id: '1',
    name: 'Taylor 814ce Acoustic Guitar',
    category: mockCategories[0],
    description: 'Professional acoustic guitar with electronics',
    condition: 'excellent',
    location: 'Main Sanctuary',
    isAvailable: true,
    serialNumber: 'TAY814-2023-001',
    purchaseDate: new Date('2023-01-15'),
    lastMaintenance: new Date('2024-01-01'),
    nextMaintenance: new Date('2024-04-01'),
    maintenanceNotes: 'Recently restrung and setup',
    restrictions: ['Must be used with provided case', 'No drinks near instrument'],
    accessories: ['Hardshell case', 'Guitar strap', 'Pick set']
  },
  {
    id: '2',
    name: 'Yamaha P-125 Digital Piano',
    category: mockCategories[1],
    description: '88-key weighted digital piano',
    condition: 'good',
    location: 'Fellowship Hall',
    isAvailable: true,
    serialNumber: 'YAM-P125-2022-003',
    purchaseDate: new Date('2022-06-10'),
    lastMaintenance: new Date('2023-12-15'),
    nextMaintenance: new Date('2024-06-15'),
    maintenanceNotes: 'Key sensitivity adjusted',
    restrictions: ['Requires power outlet access'],
    accessories: ['Sustain pedal', 'Music stand', 'Power adapter']
  },
  {
    id: '3',
    name: 'Pearl Export Drum Set',
    category: mockCategories[2],
    description: '5-piece acoustic drum set',
    condition: 'good',
    location: 'Music Room',
    isAvailable: false,
    serialNumber: 'PRL-EXP-2021-005',
    purchaseDate: new Date('2021-03-20'),
    lastMaintenance: new Date('2023-11-30'),
    nextMaintenance: new Date('2024-05-30'),
    maintenanceNotes: 'New drum heads installed',
    restrictions: ['Practice room use only after 6 PM'],
    accessories: ['Drum sticks', 'Cymbal stands', 'Hi-hat stand']
  },
  {
    id: '4',
    name: 'Shure SM58 Dynamic Microphone',
    category: mockCategories[3],
    description: 'Professional vocal microphone',
    condition: 'excellent',
    location: 'Audio Booth',
    isAvailable: true,
    serialNumber: 'SHU-SM58-2023-007',
    purchaseDate: new Date('2023-08-05'),
    lastMaintenance: new Date('2024-01-10'),
    nextMaintenance: new Date('2024-07-10'),
    maintenanceNotes: 'Windscreen replaced',
    restrictions: ['Handle with care', 'Return to audio booth after use'],
    accessories: ['Windscreen', 'Microphone clip', 'XLR cable']
  }
];

const mockBookings: InstrumentBooking[] = [
  {
    id: '1',
    instrument: mockInstruments[2], // Drum set
    borrower: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567'
    },
    startDate: new Date('2024-01-14'),
    endDate: new Date('2024-01-21'),
    startTime: '14:00',
    endTime: '17:00',
    purpose: 'Youth band practice',
    status: 'confirmed',
    notes: 'Will provide own sticks',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    instrument: mockInstruments[0], // Taylor guitar
    borrower: {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 234-5678'
    },
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-01-16'),
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Sunday service',
    status: 'confirmed',
    notes: 'Lead worship guitar',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface InstrumentBookingPlatformProps {
  onBookingUpdate?: (bookings: InstrumentBooking[]) => void;
}

export const InstrumentBookingPlatform: React.FC<InstrumentBookingPlatformProps> = ({
  onBookingUpdate
}) => {
  const [instruments, setInstruments] = useState<Instrument[]>(mockInstruments);
  const [bookings, setBookings] = useState<InstrumentBooking[]>(mockBookings);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInstrumentModal, setShowInstrumentModal] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [editingBooking, setEditingBooking] = useState<InstrumentBooking | null>(null);
  const [showMaintenanceView, setShowMaintenanceView] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    instrumentId: '',
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    purpose: '',
    notes: ''
  });

  const [instrumentForm, setInstrumentForm] = useState({
    name: '',
    categoryId: '',
    description: '',
    condition: 'good' as Instrument['condition'],
    location: '',
    serialNumber: '',
    purchaseDate: '',
    restrictions: '',
    accessories: '',
    maintenanceNotes: ''
  });

  // Filter instruments based on search and category
  const filteredInstruments = instruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instrument.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || instrument.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get bookings for a specific instrument and date
  const getInstrumentBookings = (instrumentId: string, date: Date) => {
    return bookings.filter(booking => 
      booking.instrument.id === instrumentId &&
      booking.startDate <= date &&
      booking.endDate >= date &&
      booking.status !== 'cancelled'
    );
  };

  // Check if instrument is available for a time slot
  const isInstrumentAvailable = (instrumentId: string, date: Date, startTime: string, endTime: string) => {
    const instrument = instruments.find(i => i.id === instrumentId);
    if (!instrument?.isAvailable) return false;

    const conflictingBookings = bookings.filter(booking => 
      booking.instrument.id === instrumentId &&
      booking.startDate <= date &&
      booking.endDate >= date &&
      booking.status === 'confirmed' &&
      !(endTime <= booking.startTime || startTime >= booking.endTime)
    );

    return conflictingBookings.length === 0;
  };

  // Get instruments needing maintenance
  const getMaintenanceRequired = () => {
    const today = new Date();
    return instruments.filter(instrument => 
      instrument.nextMaintenance && instrument.nextMaintenance <= today
    );
  };

  const handleCreateBooking = () => {
    const instrument = instruments.find(i => i.id === bookingForm.instrumentId);
    if (!instrument) return;

    const newBooking: InstrumentBooking = {
      id: Date.now().toString(),
      instrument,
      borrower: {
        id: Date.now().toString(),
        name: bookingForm.borrowerName,
        email: bookingForm.borrowerEmail,
        phone: bookingForm.borrowerPhone
      },
      startDate: new Date(bookingForm.startDate),
      endDate: new Date(bookingForm.endDate),
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      purpose: bookingForm.purpose,
      status: 'pending',
      notes: bookingForm.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    if (onBookingUpdate) onBookingUpdate(updatedBookings);
    
    setShowBookingModal(false);
    resetBookingForm();
  };

  const handleCreateInstrument = () => {
    const category = mockCategories.find(c => c.id === instrumentForm.categoryId);
    if (!category) return;

    const newInstrument: Instrument = {
      id: Date.now().toString(),
      name: instrumentForm.name,
      category,
      description: instrumentForm.description,
      condition: instrumentForm.condition,
      location: instrumentForm.location,
      isAvailable: true,
      serialNumber: instrumentForm.serialNumber,
      purchaseDate: new Date(instrumentForm.purchaseDate),
      lastMaintenance: new Date(),
      nextMaintenance: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months from now
      maintenanceNotes: instrumentForm.maintenanceNotes,
      restrictions: instrumentForm.restrictions.split('\n').filter(r => r.trim()),
      accessories: instrumentForm.accessories.split('\n').filter(a => a.trim())
    };

    setInstruments([...instruments, newInstrument]);
    setShowInstrumentModal(false);
    resetInstrumentForm();
  };

  const updateBookingStatus = (bookingId: string, status: InstrumentBooking['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status, updatedAt: new Date() } : booking
    );
    setBookings(updatedBookings);
    if (onBookingUpdate) onBookingUpdate(updatedBookings);
  };

  const resetBookingForm = () => {
    setBookingForm({
      instrumentId: '',
      borrowerName: '',
      borrowerEmail: '',
      borrowerPhone: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      purpose: '',
      notes: ''
    });
  };

  const resetInstrumentForm = () => {
    setInstrumentForm({
      name: '',
      categoryId: '',
      description: '',
      condition: 'good',
      location: '',
      serialNumber: '',
      purchaseDate: '',
      restrictions: '',
      accessories: '',
      maintenanceNotes: ''
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600/20 text-green-300 border-green-500/50';
      case 'pending': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50';
      case 'cancelled': return 'bg-red-600/20 text-red-300 border-red-500/50';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500/50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Guitar className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">Instrument Booking</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Music Equipment</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Reserve instruments and audio equipment for worship services, practices, and special events.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {instruments.filter(i => i.isAvailable).length}
              </div>
              <div className="text-slate-300">Available Instruments</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-slate-300">Active Bookings</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {getMaintenanceRequired().length}
              </div>
              <div className="text-slate-300">Need Maintenance</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{mockCategories.length}</div>
              <div className="text-slate-300">Categories</div>
            </GlassCard>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex gap-3">
              <SpectacularButton
                variant={viewMode === 'grid' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('grid')}
              >
                <Guitar className="w-4 h-4 mr-2" />
                Grid
              </SpectacularButton>
              <SpectacularButton
                variant={viewMode === 'list' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('list')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                List
              </SpectacularButton>
              <SpectacularButton
                variant={viewMode === 'calendar' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('calendar')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </SpectacularButton>
              <SpectacularButton
                variant={showMaintenanceView ? "primary" : "outline"}
                size="md"
                onClick={() => setShowMaintenanceView(!showMaintenanceView)}
              >
                <Tool className="w-4 h-4 mr-2" />
                Maintenance
              </SpectacularButton>
            </div>

            <div className="flex gap-3">
              <SpectacularButton
                variant="primary"
                size="md"
                onClick={() => setShowBookingModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </SpectacularButton>
              <SpectacularButton
                variant="outline"
                size="md"
                onClick={() => setShowInstrumentModal(true)}
              >
                <Music className="w-4 h-4 mr-2" />
                Add Instrument
              </SpectacularButton>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white"
            >
              <option value="">All Categories</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Categories */}
      {!showMaintenanceView && (
        <section className="px-4 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {instruments.filter(i => i.category.id === category.id).length} items
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Maintenance View */}
          {showMaintenanceView && (
            <GlassCard className="p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Tool className="w-6 h-6 text-yellow-400" />
                Maintenance Overview
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Instruments Needing Maintenance */}
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Maintenance Required ({getMaintenanceRequired().length})
                  </h3>
                  <div className="space-y-4">
                    {getMaintenanceRequired().map(instrument => (
                      <div key={instrument.id} className="p-4 bg-red-600/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">{instrument.name}</h4>
                          <span className="text-xs text-red-400">
                            Due: {instrument.nextMaintenance?.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{instrument.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">{instrument.location}</span>
                        </div>
                      </div>
                    ))}
                    {getMaintenanceRequired().length === 0 && (
                      <div className="text-center py-8 text-slate-400">
                        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400" />
                        <p>All instruments are up to date with maintenance!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Maintenance */}
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recently Maintained
                  </h3>
                  <div className="space-y-4">
                    {instruments
                      .filter(i => i.lastMaintenance && 
                        (new Date().getTime() - i.lastMaintenance.getTime()) < 30 * 24 * 60 * 60 * 1000)
                      .map(instrument => (
                        <div key={instrument.id} className="p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-white">{instrument.name}</h4>
                            <span className="text-xs text-green-400">
                              {instrument.lastMaintenance?.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mb-2">{instrument.maintenanceNotes}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-400">{instrument.location}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Instruments Grid */}
          {!showMaintenanceView && viewMode === 'grid' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {filteredInstruments.length} Instruments
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredInstruments.map((instrument) => (
                  <motion.div
                    key={instrument.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`text-2xl ${instrument.category.color} bg-gradient-to-r bg-clip-text text-transparent`}>
                              {instrument.category.icon}
                            </div>
                            <div className={`w-3 h-3 rounded-full ${
                              instrument.isAvailable ? 'bg-green-400' : 'bg-red-400'
                            }`} />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                            {instrument.name}
                          </h3>
                          <p className="text-sm text-slate-400 mb-2">{instrument.category.name}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 mb-4">{instrument.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Condition:</span>
                          <span className={`font-medium ${getConditionColor(instrument.condition)}`}>
                            {instrument.condition}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {instrument.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Calendar className="w-3 h-3" />
                          Next maintenance: {instrument.nextMaintenance?.toLocaleDateString()}
                        </div>
                      </div>

                      {instrument.accessories && instrument.accessories.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-slate-400 mb-1">Includes:</div>
                          <div className="flex flex-wrap gap-1">
                            {instrument.accessories.slice(0, 2).map((accessory, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                              >
                                {accessory}
                              </span>
                            ))}
                            {instrument.accessories.length > 2 && (
                              <span className="px-2 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full">
                                +{instrument.accessories.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <SpectacularButton
                          variant={instrument.isAvailable ? "primary" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (instrument.isAvailable) {
                              setBookingForm(prev => ({ ...prev, instrumentId: instrument.id }));
                              setShowBookingModal(true);
                            }
                          }}
                          disabled={!instrument.isAvailable}
                          className="flex-1"
                        >
                          {instrument.isAvailable ? 'Book' : 'Unavailable'}
                        </SpectacularButton>
                        <SpectacularButton
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInstrument(instrument)}
                          className="flex-1"
                        >
                          Details
                        </SpectacularButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Calendar */}
          {!showMaintenanceView && viewMode === 'calendar' && (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Booking Calendar</h2>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  Bookings for {formatDate(selectedDate)}
                </h3>
                
                <div className="space-y-4">
                  {bookings
                    .filter(booking => 
                      booking.startDate <= selectedDate && 
                      booking.endDate >= selectedDate
                    )
                    .map(booking => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-white">{booking.instrument.name}</h4>
                            <p className="text-sm text-slate-400">{booking.purpose}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400">
                              <User className="w-4 h-4" />
                              {booking.borrower.name}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Mail className="w-4 h-4" />
                              {booking.borrower.email}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Clock className="w-4 h-4" />
                              {booking.startTime} - {booking.endTime}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin className="w-4 h-4" />
                              {booking.instrument.location}
                            </div>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-sm text-slate-300">{booking.notes}</p>
                          </div>
                        )}

                        {booking.status === 'pending' && (
                          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                            <SpectacularButton
                              variant="primary"
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Confirm
                            </SpectacularButton>
                            <SpectacularButton
                              variant="outline"
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </SpectacularButton>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  
                  {bookings.filter(booking => 
                    booking.startDate <= selectedDate && 
                    booking.endDate >= selectedDate
                  ).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Calendar className="w-12 h-12 mx-auto mb-3" />
                      <p>No bookings for this date</p>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Create Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Create Booking</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Instrument</label>
                    <select
                      value={bookingForm.instrumentId}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, instrumentId: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                      <option value="">Select an instrument</option>
                      {instruments.filter(i => i.isAvailable).map(instrument => (
                        <option key={instrument.id} value={instrument.id} className="text-black">
                          {instrument.name} - {instrument.location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Borrower Name</label>
                      <input
                        type="text"
                        value={bookingForm.borrowerName}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, borrowerName: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="Full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={bookingForm.borrowerEmail}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, borrowerEmail: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={bookingForm.borrowerPhone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, borrowerPhone: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={bookingForm.startDate}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                      <input
                        type="date"
                        value={bookingForm.endDate}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={bookingForm.startTime}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">End Time</label>
                      <input
                        type="time"
                        value={bookingForm.endTime}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Purpose</label>
                    <input
                      type="text"
                      value={bookingForm.purpose}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, purpose: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="e.g., Sunday service, band practice"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Any special requirements or notes"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <SpectacularButton
                      variant="primary"
                      size="md"
                      onClick={handleCreateBooking}
                      disabled={!bookingForm.instrumentId || !bookingForm.borrowerName || !bookingForm.startDate}
                      className="flex-1"
                    >
                      Create Booking
                    </SpectacularButton>
                    <SpectacularButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setShowBookingModal(false);
                        resetBookingForm();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </SpectacularButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Instrument Modal */}
      <AnimatePresence>
        {showInstrumentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInstrumentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Add New Instrument</h2>
                  <button
                    onClick={() => setShowInstrumentModal(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Instrument Name</label>
                      <input
                        type="text"
                        value={instrumentForm.name}
                        onChange={(e) => setInstrumentForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="e.g., Taylor 814ce Acoustic Guitar"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <select
                        value={instrumentForm.categoryId}
                        onChange={(e) => setInstrumentForm(prev => ({ ...prev, categoryId: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      >
                        <option value="">Select category</option>
                        {mockCategories.map(cat => (
                          <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={instrumentForm.description}
                      onChange={(e) => setInstrumentForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Brief description of the instrument"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Condition</label>
                      <select
                        value={instrumentForm.condition}
                        onChange={(e) => setInstrumentForm(prev => ({ ...prev, condition: e.target.value as any }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      >
                        <option value="excellent" className="text-black">Excellent</option>
                        <option value="good" className="text-black">Good</option>
                        <option value="fair" className="text-black">Fair</option>
                        <option value="poor" className="text-black">Poor</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={instrumentForm.location}
                        onChange={(e) => setInstrumentForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="e.g., Main Sanctuary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Purchase Date</label>
                      <input
                        type="date"
                        value={instrumentForm.purchaseDate}
                        onChange={(e) => setInstrumentForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Serial Number</label>
                    <input
                      type="text"
                      value={instrumentForm.serialNumber}
                      onChange={(e) => setInstrumentForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Instrument serial number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Restrictions (one per line)</label>
                    <textarea
                      value={instrumentForm.restrictions}
                      onChange={(e) => setInstrumentForm(prev => ({ ...prev, restrictions: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Must be used with provided case&#10;No drinks near instrument"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Included Accessories (one per line)</label>
                    <textarea
                      value={instrumentForm.accessories}
                      onChange={(e) => setInstrumentForm(prev => ({ ...prev, accessories: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Hardshell case&#10;Guitar strap&#10;Pick set"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <SpectacularButton
                      variant="primary"
                      size="md"
                      onClick={handleCreateInstrument}
                      disabled={!instrumentForm.name || !instrumentForm.categoryId}
                      className="flex-1"
                    >
                      Add Instrument
                    </SpectacularButton>
                    <SpectacularButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setShowInstrumentModal(false);
                        resetInstrumentForm();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </SpectacularButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstrumentBookingPlatform;
