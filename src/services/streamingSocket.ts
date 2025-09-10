import { io, Socket } from 'socket.io-client';
import { ChatMessage, PrayerRequest, SermonNote } from '@/types/streaming';

export class StreamingSocketService {
  private socket: Socket | null = null;
  private currentStreamId: string | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    const serverUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://your-streaming-server.com' 
      : 'http://localhost:3004';

    this.socket = io(serverUrl, {
      auth: {
        token: 'user-token', // In production, use actual JWT token
        userId: this.getUserId(),
        userName: this.getUserName(),
        userRole: this.getUserRole()
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to streaming server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from streaming server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  private getUserId(): string {
    // In production, get from authentication context
    return localStorage.getItem('userId') || `user_${Date.now()}`;
  }

  private getUserName(): string {
    // In production, get from authentication context
    return localStorage.getItem('userName') || 'Guest User';
  }

  private getUserRole(): string {
    // In production, get from authentication context
    return localStorage.getItem('userRole') || 'guest';
  }

  // Stream Management
  joinStream(streamId: string): Promise<any> {
    return new Promise((resolve) => {
      if (!this.socket) return resolve(null);

      this.currentStreamId = streamId;
      this.socket.emit('join-stream', streamId);

      this.socket.once('stream-data', (data) => {
        resolve(data);
      });
    });
  }

  leaveStream() {
    if (this.socket && this.currentStreamId) {
      this.socket.leave(this.currentStreamId);
      this.currentStreamId = null;
    }
  }

  // Chat Functions
  sendMessage(message: string) {
    if (!this.socket || !this.currentStreamId) return;

    this.socket.emit('send-message', {
      streamId: this.currentStreamId,
      message,
      timestamp: new Date()
    });
  }

  onNewMessage(callback: (message: ChatMessage) => void) {
    if (!this.socket) return;
    this.socket.on('new-message', callback);
  }

  offNewMessage() {
    if (!this.socket) return;
    this.socket.off('new-message');
  }

  // Prayer Request Functions
  sendPrayerRequest(request: string, isAnonymous = false) {
    if (!this.socket || !this.currentStreamId) return;

    this.socket.emit('send-prayer-request', {
      streamId: this.currentStreamId,
      request,
      isAnonymous
    });
  }

  prayForRequest(requestId: string) {
    if (!this.socket || !this.currentStreamId) return;

    this.socket.emit('pray-for-request', {
      streamId: this.currentStreamId,
      requestId
    });
  }

  onNewPrayerRequest(callback: (request: PrayerRequest) => void) {
    if (!this.socket) return;
    this.socket.on('new-prayer-request', callback);
  }

  onPrayerUpdated(callback: (data: { requestId: string; prayerCount: number }) => void) {
    if (!this.socket) return;
    this.socket.on('prayer-updated', callback);
  }

  // Sermon Notes Functions
  addSermonNote(note: string) {
    if (!this.socket || !this.currentStreamId) return;

    this.socket.emit('add-sermon-note', {
      streamId: this.currentStreamId,
      note,
      timestamp: new Date()
    });
  }

  onNewSermonNote(callback: (note: SermonNote) => void) {
    if (!this.socket) return;
    this.socket.on('new-sermon-note', callback);
  }

  // Viewer Count
  onViewerCountUpdated(callback: (count: number) => void) {
    if (!this.socket) return;
    this.socket.on('viewer-count-updated', callback);
  }

  // Moderation Functions
  moderateMessage(messageId: string, action: 'delete' | 'warn') {
    if (!this.socket || !this.currentStreamId) return;

    this.socket.emit('moderate-message', {
      streamId: this.currentStreamId,
      messageId,
      action
    });
  }

  onMessageModerated(callback: (data: { messageId: string; action: string; moderatedBy: string }) => void) {
    if (!this.socket) return;
    this.socket.on('message-moderated', callback);
  }

  // Cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Connection Status
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Reconnection
  reconnect() {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connect();
    }
  }
}

// Singleton instance
export const streamingSocket = new StreamingSocketService();

// Hook for React components
import { useEffect, useState } from 'react';

export const useStreamingSocket = (streamId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [sermonNotes, setSermonNotes] = useState<SermonNote[]>([]);

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(streamingSocket.isConnected());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!streamId) return;

    // Join stream and get initial data
    streamingSocket.joinStream(streamId).then((data) => {
      if (data) {
        setMessages(data.messages || []);
        setPrayerRequests(data.prayerRequests || []);
        setSermonNotes(data.sermonNotes || []);
        setViewerCount(data.viewerCount || 0);
      }
    });

    // Set up event listeners
    streamingSocket.onNewMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    streamingSocket.onNewPrayerRequest((request) => {
      setPrayerRequests(prev => [...prev, request]);
    });

    streamingSocket.onNewSermonNote((note) => {
      setSermonNotes(prev => [...prev, note]);
    });

    streamingSocket.onViewerCountUpdated((count) => {
      setViewerCount(count);
    });

    streamingSocket.onPrayerUpdated(({ requestId, prayerCount }) => {
      setPrayerRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, prayerCount }
            : req
        )
      );
    });

    return () => {
      streamingSocket.leaveStream();
      streamingSocket.offNewMessage();
    };
  }, [streamId]);

  return {
    isConnected,
    viewerCount,
    messages,
    prayerRequests,
    sermonNotes,
    sendMessage: streamingSocket.sendMessage.bind(streamingSocket),
    sendPrayerRequest: streamingSocket.sendPrayerRequest.bind(streamingSocket),
    prayForRequest: streamingSocket.prayForRequest.bind(streamingSocket),
    addSermonNote: streamingSocket.addSermonNote.bind(streamingSocket),
    moderateMessage: streamingSocket.moderateMessage.bind(streamingSocket)
  };
};
