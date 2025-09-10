export interface StreamingService {
  id: string;
  title: string;
  description: string;
  isLive: boolean;
  startTime: string;
  endTime?: string;
  streamUrl?: string;
  chatEnabled: boolean;
  maxViewers: number;
  currentViewers: number;
  cameras: Camera[];
  sermonNotes: SermonNote[];
}

export interface Camera {
  id: string;
  name: string;
  position: 'pulpit' | 'choir' | 'congregation' | 'wide' | 'close';
  isActive: boolean;
  streamUrl: string;
  quality: 'HD' | 'FHD' | '4K';
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'message' | 'prayer_request' | 'system';
  isModerated?: boolean;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  request: string;
  isAnonymous: boolean;
  timestamp: string;
  prayerCount: number;
  isApproved: boolean;
  category: 'healing' | 'spiritual' | 'family' | 'financial' | 'general';
}

export interface SermonNote {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  bibleVerse?: string;
  isHighlight: boolean;
  attachments?: string[];
}

export interface StreamingStats {
  viewerCount: number;
  chatMessages: number;
  prayerRequests: number;
  duration: number;
  peakViewers: number;
  engagement: number;
}

export interface StreamingUser {
  id: string;
  name: string;
  role: 'admin' | 'moderator' | 'member' | 'guest';
  isOnline: boolean;
  joinedAt: string;
}
