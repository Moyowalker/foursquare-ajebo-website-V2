'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Users, 
  MessageCircle, 
  Heart, 
  Settings, 
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Maximize,
  Volume2,
  VolumeX,
  Circle,
  Square,
  Eye,
  Send,
  Filter,
  Star
} from 'lucide-react';
import { SpectacularButton, GlassCard } from '@/components/ui/spectacular';
import { StreamingService, Camera as CameraType, ChatMessage, PrayerRequest, SermonNote } from '@/types/streaming';

interface StreamingDashboardProps {
  isAdmin?: boolean;
  userId?: string;
  userName?: string;
}

export const StreamingDashboard: React.FC<StreamingDashboardProps> = ({
  isAdmin = false,
  userId = 'guest',
  userName = 'Guest User'
}) => {
  // State Management
  const [isLive, setIsLive] = useState(false);
  const [activeCamera, setActiveCamera] = useState<string>('pulpit');
  const [viewerCount, setViewerCount] = useState(245);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [sermonNotes, setSermonNotes] = useState<SermonNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'prayers' | 'notes'>('chat');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Mock camera data
  const cameras: CameraType[] = [
    { id: 'pulpit', name: 'Pulpit View', position: 'pulpit', isActive: true, streamUrl: '/streams/pulpit', quality: 'FHD' },
    { id: 'choir', name: 'Choir Stand', position: 'choir', isActive: true, streamUrl: '/streams/choir', quality: 'HD' },
    { id: 'congregation', name: 'Congregation', position: 'congregation', isActive: true, streamUrl: '/streams/congregation', quality: 'HD' },
    { id: 'wide', name: 'Wide Angle', position: 'wide', isActive: true, streamUrl: '/streams/wide', quality: 'FHD' },
  ];

  // Mock chat messages
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      { id: '1', userId: 'user1', userName: 'Sister Mary', message: 'Blessed to be here!', timestamp: new Date().toISOString(), type: 'message' },
      { id: '2', userId: 'user2', userName: 'Brother John', message: 'Amen! Powerful message today', timestamp: new Date().toISOString(), type: 'message' },
      { id: '3', userId: 'user3', userName: 'Grace Adebayo', message: 'Please pray for my family', timestamp: new Date().toISOString(), type: 'prayer_request' },
    ];
    setChatMessages(mockMessages);
  }, []);

  // Toggle streaming
  const toggleStreaming = () => {
    setIsLive(!isLive);
    if (!isLive) {
      setViewerCount(prev => prev + Math.floor(Math.random() * 50));
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId,
        userName,
        message: chatInput,
        timestamp: new Date().toISOString(),
        type: 'message'
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
    }
  };

  // Handle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Live Streaming Dashboard</h1>
              <p className="text-gray-300">Sunday Morning Service - Foursquare Ajebo</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-full">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-sm font-medium">{isLive ? 'LIVE' : 'OFFLINE'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                <span>{viewerCount.toLocaleString()} viewers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Video Player */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/images/church-service.jpg"
                  controls={false}
                >
                  <source src="/streams/main.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
                  
                  {/* Top Controls */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {isLive && (
                        <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </div>
                      )}
                      <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {cameras.find(c => c.id === activeCamera)?.name}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Center Play Button */}
                  {!isLive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={toggleStreaming}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </button>
                    </div>
                  )}

                  {/* Bottom Controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isAdmin && (
                          <>
                            <SpectacularButton
                              variant={isLive ? "secondary" : "primary"}
                              size="sm"
                              onClick={toggleStreaming}
                            >
                              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              {isLive ? 'Stop' : 'Go Live'}
                            </SpectacularButton>
                            
                            <button
                              onClick={toggleRecording}
                              className={`p-2 rounded-full transition-colors ${
                                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                              }`}
                            >
                              {isRecording ? <Square className="w-4 h-4" /> :                     <Circle className="w-4 h-4" />}
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{viewerCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Camera Selection */}
            {isAdmin && (
              <GlassCard className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Camera Controls
                </h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {cameras.map((camera) => (
                    <button
                      key={camera.id}
                      onClick={() => setActiveCamera(camera.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        activeCamera === camera.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="aspect-video bg-gray-800 rounded mb-2 flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="text-sm font-medium">{camera.name}</div>
                      <div className="text-xs text-gray-400">{camera.quality}</div>
                    </button>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Sermon Notes */}
            <GlassCard className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Live Sermon Notes
              </h3>
              
              <div className="space-y-3">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="text-sm text-yellow-400 mb-1">10:15 AM</div>
                  <h4 className="font-semibold mb-2">Opening Scripture</h4>
                  <p className="text-gray-300 text-sm">"For I know the plans I have for you," declares the Lord...</p>
                  <div className="text-xs text-purple-300 mt-1">Jeremiah 29:11</div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-sm text-blue-400 mb-1">10:22 AM</div>
                  <h4 className="font-semibold mb-2">Key Point: God's Faithfulness</h4>
                  <p className="text-gray-300 text-sm">Even in uncertain times, God remains faithful to His promises...</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tab Navigation */}
            <GlassCard className="p-1">
              <div className="grid grid-cols-3 gap-1">
                {(['chat', 'prayers', 'notes'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {tab === 'chat' && <MessageCircle className="w-4 h-4 mx-auto mb-1" />}
                    {tab === 'prayers' && <Heart className="w-4 h-4 mx-auto mb-1" />}
                    {tab === 'notes' && <Star className="w-4 h-4 mx-auto mb-1" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Chat Section */}
            {activeTab === 'chat' && (
              <GlassCard className="p-4 h-96 flex flex-col">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat
                </h3>
                
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-purple-300">{message.userName}</span>
                        <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-gray-300">{message.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                  <SpectacularButton size="sm" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </SpectacularButton>
                </div>
              </GlassCard>
            )}

            {/* Prayer Requests Section */}
            {activeTab === 'prayers' && (
              <GlassCard className="p-4 h-96">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Prayer Requests
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-pink-300">Sister Grace</span>
                      <span className="text-xs text-gray-400">5 min ago</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Please pray for healing for my mother</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Heart className="w-3 h-3 text-pink-400" />
                      <span className="text-pink-400">23 praying</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-300">Brother John</span>
                      <span className="text-xs text-gray-400">12 min ago</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Job interview tomorrow</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Heart className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400">15 praying</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingDashboard;
