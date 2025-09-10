export interface Hymn {
  id: string;
  title: string;
  number?: number; // Traditional hymn book number
  lyrics: HymnVerse[];
  audioUrl?: string;
  category: HymnCategory;
  author?: string;
  composer?: string;
  copyright?: string;
  key?: string; // Musical key
  tempo?: number; // BPM
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HymnVerse {
  id: string;
  type: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro';
  number?: number;
  text: string;
  startTime?: number; // For karaoke timing in seconds
  endTime?: number;
  chords?: string[]; // Guitar/piano chords
}

export interface HymnCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
}

export interface PlaylistItem {
  id: string;
  hymnId: string;
  order: number;
  key?: string; // Override hymn's default key
  notes?: string;
}

export interface WorshipPlaylist {
  id: string;
  name: string;
  description?: string;
  items: PlaylistItem[];
  createdBy: string;
  createdAt: Date;
  isPublic: boolean;
  tags: string[];
}

// Choir Practice Scheduling
export interface ChoirMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  voicePart: 'Soprano' | 'Alto' | 'Tenor' | 'Bass' | 'Accompanist' | 'Director';
  joinDate: Date;
  isActive: boolean;
  availability: WeeklyAvailability;
  notes?: string;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
}

export interface ChoirPractice {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location: string;
  type: 'Regular' | 'Special' | 'Rehearsal' | 'Performance';
  requiredMembers: string[]; // ChoirMember IDs
  attendees: ChoirAttendance[];
  playlist?: string; // WorshipPlaylist ID
  notes?: string;
  createdBy: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface ChoirAttendance {
  memberId: string;
  status: 'Attending' | 'Not Attending' | 'Maybe' | 'No Response';
  responseTime?: Date;
  notes?: string;
}

// Musical Instrument Booking
export interface MusicalInstrument {
  id: string;
  name: string;
  type: InstrumentType;
  brand?: string;
  model?: string;
  serialNumber?: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Repair';
  location: string;
  imageUrl?: string;
  description?: string;
  features: string[];
  maintenanceHistory: MaintenanceRecord[];
  isAvailable: boolean;
  requiresApproval: boolean;
  maxBookingDuration: number; // hours
  bookingRules?: string[];
}

export interface InstrumentType {
  id: string;
  name: string;
  category: 'String' | 'Wind' | 'Brass' | 'Percussion' | 'Keyboard' | 'Electronic' | 'Other';
  icon: string;
}

export interface InstrumentBooking {
  id: string;
  instrumentId: string;
  userId: string;
  userEmail: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Completed' | 'Cancelled';
  approvedBy?: string;
  approvalNotes?: string;
  checkoutTime?: Date;
  checkinTime?: Date;
  condition: 'Good' | 'Damaged' | 'Needs Attention';
  notes?: string;
  createdAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  date: Date;
  type: 'Routine' | 'Repair' | 'Cleaning' | 'Tuning' | 'Replacement';
  description: string;
  performedBy: string;
  cost?: number;
  nextDueDate?: Date;
}

// Recording Studio Reservation
export interface RecordingStudio {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  imageUrls: string[];
  features: StudioFeature[];
  equipment: StudioEquipment[];
  location: string;
  hourlyRate?: number;
  bookingRules: string[];
  availability: StudioAvailability;
  isActive: boolean;
}

export interface StudioFeature {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

export interface StudioEquipment {
  id: string;
  name: string;
  type: 'Microphone' | 'Monitor' | 'Interface' | 'Instrument' | 'Computer' | 'Software' | 'Accessory';
  brand?: string;
  model?: string;
  quantity: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Out of Order';
  notes?: string;
}

export interface StudioAvailability {
  monday: StudioTimeSlot[];
  tuesday: StudioTimeSlot[];
  wednesday: StudioTimeSlot[];
  thursday: StudioTimeSlot[];
  friday: StudioTimeSlot[];
  saturday: StudioTimeSlot[];
  sunday: StudioTimeSlot[];
}

export interface StudioTimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxCapacity?: number;
}

export interface StudioReservation {
  id: string;
  studioId: string;
  userId: string;
  userEmail: string;
  userName: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendeeCount: number;
  purpose: 'Recording' | 'Practice' | 'Meeting' | 'Rehearsal' | 'Other';
  equipmentRequests: string[];
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  totalCost?: number;
  paymentStatus: 'Pending' | 'Paid' | 'Waived';
  confirmedBy?: string;
  notes?: string;
  createdAt: Date;
}

// Live Lyrics Display
export interface LyricsSession {
  id: string;
  title: string;
  playlistId?: string;
  currentHymnId?: string;
  currentVerseId?: string;
  isPlaying: boolean;
  startTime?: Date;
  displaySettings: LyricsDisplaySettings;
  participants: string[]; // User IDs of connected users
  createdBy: string;
  isLive: boolean;
}

export interface LyricsDisplaySettings {
  fontSize: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  highlightColor: string;
  showChords: boolean;
  showVerseNumbers: boolean;
  transitionEffect: 'fade' | 'slide' | 'none';
  autoAdvance: boolean;
  verseDelay: number; // seconds
}

// Search and Filter
export interface HymnSearchFilters {
  query?: string;
  category?: string;
  difficulty?: string;
  key?: string;
  tags?: string[];
  hasAudio?: boolean;
  author?: string;
  composer?: string;
}

export interface BookingSearchFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  instrumentType?: string;
  status?: string;
  userId?: string;
}

// Analytics and Reporting
export interface WorshipAnalytics {
  hymnUsage: HymnUsageStats[];
  instrumentBookingStats: InstrumentBookingStats[];
  studioUsageStats: StudioUsageStats[];
  choirAttendanceStats: ChoirAttendanceStats[];
  popularSongs: PopularSongStats[];
}

export interface HymnUsageStats {
  hymnId: string;
  title: string;
  playCount: number;
  lastPlayed: Date;
  averageRating?: number;
}

export interface InstrumentBookingStats {
  instrumentId: string;
  name: string;
  totalBookings: number;
  totalHours: number;
  utilizationRate: number;
}

export interface StudioUsageStats {
  studioId: string;
  name: string;
  totalReservations: number;
  totalHours: number;
  revenue: number;
  utilizationRate: number;
}

export interface ChoirAttendanceStats {
  memberId: string;
  name: string;
  attendanceRate: number;
  totalPractices: number;
  attendedPractices: number;
}

export interface PopularSongStats {
  hymnId: string;
  title: string;
  category: string;
  playCount: number;
  trend: 'up' | 'down' | 'stable';
}
