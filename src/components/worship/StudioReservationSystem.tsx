'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Mic,
  Camera,
  Monitor,
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
  User,
  Phone,
  Mail,
  Music,
  Video,
  Wifi,
  Volume2,
  Zap,
  Layers,
  Star,
  BookOpen,
  Building,
  Timer,
  DollarSign
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { StudioReservation, StudioRoom, StudioEquipment } from '@/types/worship';

// Mock data for studio rooms and equipment
const mockEquipment: StudioEquipment[] = [
  { id: '1', name: 'Audio Interface', category: 'Audio', isAvailable: true, specifications: '8-channel USB interface' },
  { id: '2', name: 'Studio Monitors', category: 'Audio', isAvailable: true, specifications: 'Pair of 8" powered monitors' },
  { id: '3', name: 'Condenser Microphone', category: 'Audio', isAvailable: true, specifications: 'Large diaphragm condenser' },
  { id: '4', name: 'MIDI Keyboard', category: 'Instruments', isAvailable: true, specifications: '88-key weighted action' },
  { id: '5', name: 'HD Camera', category: 'Video', isAvailable: true, specifications: '4K recording capability' },
  { id: '6', name: 'Lighting Kit', category: 'Video', isAvailable: true, specifications: '3-point LED lighting setup' },
  { id: '7', name: 'Acoustic Panels', category: 'Acoustics', isAvailable: true, specifications: 'Sound treatment for vocals' },
  { id: '8', name: 'Mixing Console', category: 'Audio', isAvailable: true, specifications: '16-channel digital mixer' }
];

const mockRooms: StudioRoom[] = [
  {
    id: '1',
    name: 'Studio A - Recording Suite',
    description: 'Professional recording studio with vocal booth',
    capacity: 6,
    hourlyRate: 75,
    amenities: ['Air Conditioning', 'Sound Isolation', 'Control Room'],
    equipment: [mockEquipment[0], mockEquipment[1], mockEquipment[2], mockEquipment[7]],
    policies: ['No food or drinks in vocal booth', 'Maximum 3-hour sessions', 'Clean up after use'],
    isAvailable: true,
    bookingAdvanceLimit: 30,
    minimumBookingHours: 2
  },
  {
    id: '2',
    name: 'Studio B - Rehearsal Room',
    description: 'Large rehearsal space for bands and ensembles',
    capacity: 12,
    hourlyRate: 50,
    amenities: ['Piano', 'Drum Kit', 'Amplifiers', 'PA System'],
    equipment: [mockEquipment[3], mockEquipment[7]],
    policies: ['Respect noise levels', 'Return equipment to designated areas'],
    isAvailable: true,
    bookingAdvanceLimit: 14,
    minimumBookingHours: 1
  },
  {
    id: '3',
    name: 'Video Production Suite',
    description: 'Multi-camera video recording and streaming setup',
    capacity: 8,
    hourlyRate: 100,
    amenities: ['Green Screen', 'Teleprompter', 'Live Streaming Setup'],
    equipment: [mockEquipment[4], mockEquipment[5], mockEquipment[6]],
    policies: ['Equipment training required', 'Advance booking mandatory'],
    isAvailable: true,
    bookingAdvanceLimit: 21,
    minimumBookingHours: 2
  },
  {
    id: '4',
    name: 'Practice Room 1',
    description: 'Small practice room for individual or duo sessions',
    capacity: 3,
    hourlyRate: 25,
    amenities: ['Piano', 'Music Stand', 'Mirror'],
    equipment: [],
    policies: ['Maximum 2-hour sessions', 'Clean up after use'],
    isAvailable: false,
    bookingAdvanceLimit: 7,
    minimumBookingHours: 1
  }
];

const mockReservations: StudioReservation[] = [
  {
    id: '1',
    room: mockRooms[0],
    user: {
      id: '1',
      name: 'Emily Carter',
      email: 'emily.carter@email.com',
      phone: '+1 (555) 123-4567'
    },
    date: new Date('2024-01-15'),
    startTime: '14:00',
    endTime: '17:00',
    purpose: 'Album recording session',
    status: 'confirmed',
    totalCost: 225,
    specialRequests: 'Need extra microphone stands',
    equipmentRequested: [mockEquipment[2]],
    notes: 'Recording original worship songs',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    room: mockRooms[1],
    user: {
      id: '2',
      name: 'David Johnson',
      email: 'david.johnson@email.com',
      phone: '+1 (555) 234-5678'
    },
    date: new Date('2024-01-16'),
    startTime: '19:00',
    endTime: '22:00',
    purpose: 'Youth band practice',
    status: 'confirmed',
    totalCost: 150,
    specialRequests: '',
    equipmentRequested: [],
    notes: 'Preparing for Sunday service',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    room: mockRooms[3],
    user: {
      id: '3',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 345-6789'
    },
    date: new Date('2024-01-14'),
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Vocal practice',
    status: 'confirmed',
    totalCost: 50,
    specialRequests: '',
    equipmentRequested: [],
    notes: 'Solo practice for upcoming performance',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface StudioReservationSystemProps {
  onReservationUpdate?: (reservations: StudioReservation[]) => void;
}

export const StudioReservationSystem: React.FC<StudioReservationSystemProps> = ({
  onReservationUpdate
}) => {
  const [rooms, setRooms] = useState<StudioRoom[]>(mockRooms);
  const [reservations, setReservations] = useState<StudioReservation[]>(mockReservations);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'rooms' | 'calendar' | 'reservations'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<StudioRoom | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState<StudioReservation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const [reservationForm, setReservationForm] = useState({
    roomId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    specialRequests: '',
    equipmentIds: [] as string[],
    notes: ''
  });

  const [roomForm, setRoomForm] = useState({
    name: '',
    description: '',
    capacity: 1,
    hourlyRate: 0,
    amenities: '',
    policies: '',
    bookingAdvanceLimit: 7,
    minimumBookingHours: 1
  });

  // Calculate total cost for a reservation
  const calculateCost = (roomId: string, startTime: string, endTime: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return 0;

    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return Math.max(hours, room.minimumBookingHours) * room.hourlyRate;
  };

  // Check room availability for a specific time slot
  const isRoomAvailable = (roomId: string, date: Date, startTime: string, endTime: string, excludeReservationId?: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room?.isAvailable) return false;

    const conflictingReservations = reservations.filter(reservation => 
      reservation.room.id === roomId &&
      reservation.date.toDateString() === date.toDateString() &&
      reservation.status !== 'cancelled' &&
      reservation.id !== excludeReservationId &&
      !(endTime <= reservation.startTime || startTime >= reservation.endTime)
    );

    return conflictingReservations.length === 0;
  };

  // Get reservations for a specific date
  const getReservationsForDate = (date: Date) => {
    return reservations.filter(reservation => 
      reservation.date.toDateString() === date.toDateString() &&
      reservation.status !== 'cancelled'
    );
  };

  // Get upcoming reservations for a room
  const getUpcomingReservations = (roomId: string) => {
    const today = new Date();
    return reservations.filter(reservation =>
      reservation.room.id === roomId &&
      reservation.date >= today &&
      reservation.status === 'confirmed'
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const handleCreateReservation = () => {
    const room = rooms.find(r => r.id === reservationForm.roomId);
    if (!room) return;

    const totalCost = calculateCost(reservationForm.roomId, reservationForm.startTime, reservationForm.endTime);
    const equipmentRequested = mockEquipment.filter(eq => reservationForm.equipmentIds.includes(eq.id));

    const newReservation: StudioReservation = {
      id: Date.now().toString(),
      room,
      user: {
        id: Date.now().toString(),
        name: reservationForm.userName,
        email: reservationForm.userEmail,
        phone: reservationForm.userPhone
      },
      date: new Date(reservationForm.date),
      startTime: reservationForm.startTime,
      endTime: reservationForm.endTime,
      purpose: reservationForm.purpose,
      status: 'pending',
      totalCost,
      specialRequests: reservationForm.specialRequests,
      equipmentRequested,
      notes: reservationForm.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    if (onReservationUpdate) onReservationUpdate(updatedReservations);
    
    setShowReservationModal(false);
    resetReservationForm();
  };

  const updateReservationStatus = (reservationId: string, status: StudioReservation['status']) => {
    const updatedReservations = reservations.map(reservation =>
      reservation.id === reservationId ? { ...reservation, status, updatedAt: new Date() } : reservation
    );
    setReservations(updatedReservations);
    if (onReservationUpdate) onReservationUpdate(updatedReservations);
  };

  const resetReservationForm = () => {
    setReservationForm({
      roomId: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      date: '',
      startTime: '',
      endTime: '',
      purpose: '',
      specialRequests: '',
      equipmentIds: [],
      notes: ''
    });
  };

  const resetRoomForm = () => {
    setRoomForm({
      name: '',
      description: '',
      capacity: 1,
      hourlyRate: 0,
      amenities: '',
      policies: '',
      bookingAdvanceLimit: 7,
      minimumBookingHours: 1
    });
  };

  // Filter reservations based on search and status
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reservation.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reservation.room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600/20 text-green-300 border-green-500/50';
      case 'pending': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50';
      case 'cancelled': return 'bg-red-600/20 text-red-300 border-red-500/50';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500/50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
              <Building className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">Studio Reservations</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Recording Studios</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Book professional recording studios, rehearsal rooms, and video production facilities for your ministry needs.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {rooms.filter(r => r.isAvailable).length}
              </div>
              <div className="text-slate-300">Available Rooms</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {reservations.filter(r => r.status === 'confirmed').length}
              </div>
              <div className="text-slate-300">Active Bookings</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {reservations.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-slate-300">Pending Requests</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {formatCurrency(reservations.reduce((sum, r) => sum + r.totalCost, 0))}
              </div>
              <div className="text-slate-300">Total Revenue</div>
            </GlassCard>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex gap-3">
              <SpectacularButton
                variant={viewMode === 'rooms' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('rooms')}
              >
                <Building className="w-4 h-4 mr-2" />
                Rooms
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
                variant={viewMode === 'reservations' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('reservations')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Reservations
              </SpectacularButton>
            </div>

            <div className="flex gap-3">
              <SpectacularButton
                variant="primary"
                size="md"
                onClick={() => setShowReservationModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Reservation
              </SpectacularButton>
              <SpectacularButton
                variant="outline"
                size="md"
                onClick={() => setShowRoomModal(true)}
              >
                <Building className="w-4 h-4 mr-2" />
                Add Room
              </SpectacularButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Rooms View */}
          {viewMode === 'rooms' && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            {room.name}
                          </h3>
                          <div className={`w-3 h-3 rounded-full ${
                            room.isAvailable ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{room.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Capacity:</span>
                        <span className="text-white font-medium">{room.capacity} people</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Hourly Rate:</span>
                        <span className="text-green-400 font-bold">{formatCurrency(room.hourlyRate)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Min. Booking:</span>
                        <span className="text-white">{room.minimumBookingHours}h</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Amenities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="px-2 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Equipment */}
                    {room.equipment.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Equipment:</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.equipment.slice(0, 2).map((equipment) => (
                            <span
                              key={equipment.id}
                              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                            >
                              {equipment.name}
                            </span>
                          ))}
                          {room.equipment.length > 2 && (
                            <span className="px-2 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full">
                              +{room.equipment.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Upcoming Reservations */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Next Booking:</h4>
                      {(() => {
                        const nextReservation = getUpcomingReservations(room.id)[0];
                        return nextReservation ? (
                          <div className="text-xs text-slate-300">
                            {formatDate(nextReservation.date)} at {nextReservation.startTime}
                          </div>
                        ) : (
                          <div className="text-xs text-green-400">Available</div>
                        );
                      })()}
                    </div>

                    <div className="flex gap-2">
                      <SpectacularButton
                        variant={room.isAvailable ? "primary" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (room.isAvailable) {
                            setReservationForm(prev => ({ ...prev, roomId: room.id }));
                            setShowReservationModal(true);
                          }
                        }}
                        disabled={!room.isAvailable}
                        className="flex-1"
                      >
                        {room.isAvailable ? 'Book Now' : 'Unavailable'}
                      </SpectacularButton>
                      <SpectacularButton
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRoom(room)}
                        className="flex-1"
                      >
                        Details
                      </SpectacularButton>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Reservation Calendar</h2>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  Reservations for {formatDate(selectedDate)}
                </h3>
                
                <div className="grid gap-4">
                  {getReservationsForDate(selectedDate).map(reservation => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-white">{reservation.room.name}</h4>
                          <p className="text-sm text-slate-400">{reservation.purpose}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400">
                            <User className="w-4 h-4" />
                            {reservation.user.name}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Mail className="w-4 h-4" />
                            {reservation.user.email}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4" />
                            {reservation.startTime} - {reservation.endTime}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4" />
                            {reservation.room.capacity} capacity
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400">
                            <DollarSign className="w-4 h-4" />
                            {formatCurrency(reservation.totalCost)}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Settings className="w-4 h-4" />
                            {reservation.equipmentRequested.length} equipment
                          </div>
                        </div>
                      </div>

                      {reservation.specialRequests && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-sm text-slate-300">
                            <strong>Special Requests:</strong> {reservation.specialRequests}
                          </p>
                        </div>
                      )}

                      {reservation.status === 'pending' && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                          <SpectacularButton
                            variant="primary"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirm
                          </SpectacularButton>
                          <SpectacularButton
                            variant="outline"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </SpectacularButton>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {getReservationsForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Calendar className="w-12 h-12 mx-auto mb-3" />
                      <p>No reservations for this date</p>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Reservations List */}
          {viewMode === 'reservations' && (
            <GlassCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">All Reservations</h2>
                
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search reservations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">All Status</option>
                    <option value="pending" className="text-black">Pending</option>
                    <option value="confirmed" className="text-black">Confirmed</option>
                    <option value="cancelled" className="text-black">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredReservations
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map(reservation => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{reservation.room.name}</h3>
                          <p className="text-slate-300 mb-2">{reservation.purpose}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(reservation.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {reservation.startTime} - {reservation.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {formatCurrency(reservation.totalCost)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                          </span>
                          <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-slate-400 mb-2">Contact Information</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-300">
                              <User className="w-4 h-4" />
                              {reservation.user.name}
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Mail className="w-4 h-4" />
                              {reservation.user.email}
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Phone className="w-4 h-4" />
                              {reservation.user.phone}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-slate-400 mb-2">Room Details</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Users className="w-4 h-4" />
                              Capacity: {reservation.room.capacity}
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Timer className="w-4 h-4" />
                              Duration: {(() => {
                                const start = new Date(`2024-01-01T${reservation.startTime}`);
                                const end = new Date(`2024-01-01T${reservation.endTime}`);
                                const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                                return `${hours}h`;
                              })()}
                            </div>
                          </div>
                        </div>

                        {reservation.equipmentRequested.length > 0 && (
                          <div>
                            <h4 className="font-medium text-slate-400 mb-2">Equipment Requested</h4>
                            <div className="flex flex-wrap gap-1">
                              {reservation.equipmentRequested.map((equipment) => (
                                <span
                                  key={equipment.id}
                                  className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                                >
                                  {equipment.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {(reservation.specialRequests || reservation.notes) && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                          {reservation.specialRequests && (
                            <div>
                              <span className="text-sm font-medium text-slate-400">Special Requests: </span>
                              <span className="text-sm text-slate-300">{reservation.specialRequests}</span>
                            </div>
                          )}
                          {reservation.notes && (
                            <div>
                              <span className="text-sm font-medium text-slate-400">Notes: </span>
                              <span className="text-sm text-slate-300">{reservation.notes}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {reservation.status === 'pending' && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                          <SpectacularButton
                            variant="primary"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Confirm Reservation
                          </SpectacularButton>
                          <SpectacularButton
                            variant="outline"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </SpectacularButton>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Create Reservation Modal */}
      <AnimatePresence>
        {showReservationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReservationModal(false)}
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
                  <h2 className="text-2xl font-bold text-white">Create Reservation</h2>
                  <button
                    onClick={() => setShowReservationModal(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Room</label>
                    <select
                      value={reservationForm.roomId}
                      onChange={(e) => setReservationForm(prev => ({ ...prev, roomId: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                      <option value="">Select a room</option>
                      {rooms.filter(r => r.isAvailable).map(room => (
                        <option key={room.id} value={room.id} className="text-black">
                          {room.name} - {formatCurrency(room.hourlyRate)}/hour
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={reservationForm.userName}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, userName: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={reservationForm.userEmail}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, userEmail: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={reservationForm.userPhone}
                      onChange={(e) => setReservationForm(prev => ({ ...prev, userPhone: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={reservationForm.date}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={reservationForm.startTime}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">End Time</label>
                      <input
                        type="time"
                        value={reservationForm.endTime}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Purpose</label>
                    <input
                      type="text"
                      value={reservationForm.purpose}
                      onChange={(e) => setReservationForm(prev => ({ ...prev, purpose: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="e.g., Album recording, worship practice"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Additional Equipment</label>
                    <div className="grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-lg border border-white/20 max-h-32 overflow-y-auto">
                      {mockEquipment.filter(eq => eq.isAvailable).map(equipment => (
                        <label key={equipment.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={reservationForm.equipmentIds.includes(equipment.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setReservationForm(prev => ({ 
                                  ...prev, 
                                  equipmentIds: [...prev.equipmentIds, equipment.id] 
                                }));
                              } else {
                                setReservationForm(prev => ({ 
                                  ...prev, 
                                  equipmentIds: prev.equipmentIds.filter(id => id !== equipment.id) 
                                }));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-slate-300">{equipment.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Special Requests</label>
                    <textarea
                      value={reservationForm.specialRequests}
                      onChange={(e) => setReservationForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Any special requirements or requests"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                    <textarea
                      value={reservationForm.notes}
                      onChange={(e) => setReservationForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Additional notes"
                    />
                  </div>

                  {/* Cost Calculation */}
                  {reservationForm.roomId && reservationForm.startTime && reservationForm.endTime && (
                    <div className="p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-300 font-medium">Estimated Total Cost:</span>
                        <span className="text-green-400 font-bold text-lg">
                          {formatCurrency(calculateCost(reservationForm.roomId, reservationForm.startTime, reservationForm.endTime))}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <SpectacularButton
                      variant="primary"
                      size="md"
                      onClick={handleCreateReservation}
                      disabled={!reservationForm.roomId || !reservationForm.userName || !reservationForm.date}
                      className="flex-1"
                    >
                      Create Reservation
                    </SpectacularButton>
                    <SpectacularButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setShowReservationModal(false);
                        resetReservationForm();
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

export default StudioReservationSystem;
