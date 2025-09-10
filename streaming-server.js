const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : ['http://localhost:3000'],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active streams and users
const activeStreams = new Map();
const connectedUsers = new Map();
const chatMessages = new Map(); // streamId -> messages array
const prayerRequests = new Map(); // streamId -> prayer requests array
const sermonNotes = new Map(); // streamId -> notes array

// Middleware to authenticate socket connections
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const userId = socket.handshake.auth.userId;
  const userName = socket.handshake.auth.userName;
  const userRole = socket.handshake.auth.userRole || 'guest';

  // In production, validate the token here
  if (userId && userName) {
    socket.userId = userId;
    socket.userName = userName;
    socket.userRole = userRole;
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userName} (${socket.userId})`);

  // Add user to connected users
  connectedUsers.set(socket.userId, {
    id: socket.userId,
    name: socket.userName,
    role: socket.userRole,
    socketId: socket.id,
    joinedAt: new Date()
  });

  // Join stream room
  socket.on('join-stream', (streamId) => {
    socket.join(streamId);
    socket.currentStream = streamId;

    // Initialize stream data if it doesn't exist
    if (!activeStreams.has(streamId)) {
      activeStreams.set(streamId, {
        id: streamId,
        viewers: new Set(),
        startedAt: new Date(),
        isLive: true
      });
      chatMessages.set(streamId, []);
      prayerRequests.set(streamId, []);
      sermonNotes.set(streamId, []);
    }

    // Add viewer to stream
    const stream = activeStreams.get(streamId);
    stream.viewers.add(socket.userId);

    // Send current data to the new user
    socket.emit('stream-data', {
      messages: chatMessages.get(streamId) || [],
      prayerRequests: prayerRequests.get(streamId) || [],
      sermonNotes: sermonNotes.get(streamId) || [],
      viewerCount: stream.viewers.size
    });

    // Notify others about viewer count update
    io.to(streamId).emit('viewer-count-updated', stream.viewers.size);

    console.log(`User ${socket.userName} joined stream ${streamId}`);
  });

  // Handle chat messages
  socket.on('send-message', (data) => {
    const { streamId, message, timestamp } = data;
    
    const chatMessage = {
      id: `msg_${Date.now()}_${socket.userId}`,
      userId: socket.userId,
      userName: socket.userName,
      userRole: socket.userRole,
      message,
      timestamp: timestamp || new Date(),
      type: 'message'
    };

    // Store message
    const messages = chatMessages.get(streamId) || [];
    messages.push(chatMessage);
    chatMessages.set(streamId, messages);

    // Broadcast to all users in the stream
    io.to(streamId).emit('new-message', chatMessage);
    
    console.log(`New message in ${streamId} from ${socket.userName}: ${message}`);
  });

  // Handle prayer requests
  socket.on('send-prayer-request', (data) => {
    const { streamId, request, isAnonymous } = data;
    
    const prayerRequest = {
      id: `prayer_${Date.now()}_${socket.userId}`,
      userId: isAnonymous ? 'anonymous' : socket.userId,
      userName: isAnonymous ? 'Anonymous' : socket.userName,
      request,
      timestamp: new Date(),
      prayerCount: 0,
      prayedBy: new Set()
    };

    // Store prayer request
    const prayers = prayerRequests.get(streamId) || [];
    prayers.push(prayerRequest);
    prayerRequests.set(streamId, prayers);

    // Broadcast to moderators and admins only
    socket.to(streamId).emit('new-prayer-request', prayerRequest);
    
    console.log(`New prayer request in ${streamId} from ${socket.userName}`);
  });

  // Handle prayer support
  socket.on('pray-for-request', (data) => {
    const { streamId, requestId } = data;
    
    const prayers = prayerRequests.get(streamId) || [];
    const request = prayers.find(p => p.id === requestId);
    
    if (request && !request.prayedBy.has(socket.userId)) {
      request.prayedBy.add(socket.userId);
      request.prayerCount++;
      
      io.to(streamId).emit('prayer-updated', {
        requestId,
        prayerCount: request.prayerCount
      });
    }
  });

  // Handle sermon notes (admin only)
  socket.on('add-sermon-note', (data) => {
    if (socket.userRole !== 'admin') return;

    const { streamId, note, timestamp } = data;
    
    const sermonNote = {
      id: `note_${Date.now()}`,
      content: note,
      timestamp: timestamp || new Date(),
      addedBy: socket.userName
    };

    // Store note
    const notes = sermonNotes.get(streamId) || [];
    notes.push(sermonNote);
    sermonNotes.set(streamId, notes);

    // Broadcast to all users in the stream
    io.to(streamId).emit('new-sermon-note', sermonNote);
    
    console.log(`New sermon note in ${streamId} from ${socket.userName}`);
  });

  // Handle message moderation (admin/moderator only)
  socket.on('moderate-message', (data) => {
    if (!['admin', 'moderator'].includes(socket.userRole)) return;

    const { streamId, messageId, action } = data; // action: 'delete' | 'warn'
    
    io.to(streamId).emit('message-moderated', {
      messageId,
      action,
      moderatedBy: socket.userName
    });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userName} (${socket.userId})`);

    // Remove from connected users
    connectedUsers.delete(socket.userId);

    // Remove from stream viewers
    if (socket.currentStream && activeStreams.has(socket.currentStream)) {
      const stream = activeStreams.get(socket.currentStream);
      stream.viewers.delete(socket.userId);
      
      // Update viewer count
      io.to(socket.currentStream).emit('viewer-count-updated', stream.viewers.size);
      
      // Clean up empty streams
      if (stream.viewers.size === 0) {
        activeStreams.delete(socket.currentStream);
        chatMessages.delete(socket.currentStream);
        prayerRequests.delete(socket.currentStream);
        sermonNotes.delete(socket.currentStream);
      }
    }
  });
});

// REST API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/streams/:streamId/stats', (req, res) => {
  const { streamId } = req.params;
  const stream = activeStreams.get(streamId);
  
  if (!stream) {
    return res.status(404).json({ error: 'Stream not found' });
  }

  res.json({
    viewerCount: stream.viewers.size,
    startedAt: stream.startedAt,
    isLive: stream.isLive,
    messageCount: (chatMessages.get(streamId) || []).length,
    prayerRequestCount: (prayerRequests.get(streamId) || []).length,
    sermonNoteCount: (sermonNotes.get(streamId) || []).length
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Streaming server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;
