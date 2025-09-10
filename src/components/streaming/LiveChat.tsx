'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Flag, Crown, Shield, User } from 'lucide-react';
import { SpectacularButton } from '@/components/ui/spectacular';
import { ChatMessage, PrayerRequest } from '@/types/streaming';

interface LiveChatProps {
  streamId: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'moderator' | 'member' | 'guest';
  isLive: boolean;
}

export const LiveChat: React.FC<LiveChatProps> = ({
  streamId,
  userId,
  userName,
  userRole,
  isLive
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPrayerMode, setIsPrayerMode] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock real-time functionality (replace with actual Socket.io)
  useEffect(() => {
    if (isLive) {
      // Simulate incoming messages
      const interval = setInterval(() => {
        const mockMessages = [
          'Amen! Blessed message',
          'Praying with you all',
          'Glory to God!',
          'Thank you Pastor',
          'Powerful word today',
          'God bless everyone'
        ];
        
        const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          userId: `user-${Math.random()}`,
          userName: `Member ${Math.floor(Math.random() * 100)}`,
          message: randomMessage,
          timestamp: new Date().toISOString(),
          type: 'message'
        };
        
        setMessages(prev => [...prev.slice(-49), newMessage]); // Keep last 50 messages
        setConnectedUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      }, 5000 + Math.random() * 10000); // Random interval

      return () => clearInterval(interval);
    }
  }, [isLive]);

  // Send message
  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageType = isPrayerMode ? 'prayer_request' : 'message';
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId,
      userName,
      message: inputMessage,
      timestamp: new Date().toISOString(),
      type: messageType
    };

    setMessages(prev => [...prev, newMessage]);
    
    if (isPrayerMode) {
      const prayerRequest: PrayerRequest = {
        id: Date.now().toString(),
        userId,
        userName,
        request: inputMessage,
        isAnonymous: false,
        timestamp: new Date().toISOString(),
        prayerCount: 0,
        isApproved: true,
        category: 'general'
      };
      setPrayerRequests(prev => [...prev, prayerRequest]);
    }

    setInputMessage('');
    setIsPrayerMode(false);
  };

  // Handle prayer support
  const supportPrayer = (prayerId: string) => {
    setPrayerRequests(prev => 
      prev.map(prayer => 
        prayer.id === prayerId 
          ? { ...prayer, prayerCount: prayer.prayerCount + 1 }
          : prayer
      )
    );
  };

  // Get user role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'moderator': return <Shield className="w-3 h-3 text-blue-400" />;
      default: return <User className="w-3 h-3 text-gray-400" />;
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-800/50 backdrop-blur-sm rounded-lg border border-white/10">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Live Chat</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{connectedUsers} online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 rounded-lg ${
                message.type === 'prayer_request' 
                  ? 'bg-pink-500/10 border border-pink-500/30' 
                  : message.userId === userId
                    ? 'bg-purple-500/20 border border-purple-500/30 ml-8'
                    : 'bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getRoleIcon(userRole)}
                <span className={`text-sm font-medium ${
                  message.type === 'prayer_request' ? 'text-pink-300' : 'text-purple-300'
                }`}>
                  {message.userName}
                </span>
                <span className="text-xs text-gray-400">
                  {formatTime(message.timestamp)}
                </span>
                {message.type === 'prayer_request' && (
                  <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">
                    Prayer Request
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 text-sm mb-2">{message.message}</p>
              
              {message.type === 'prayer_request' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => supportPrayer(message.id)}
                    className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <Heart className="w-3 h-3" />
                    <span>Pray</span>
                  </button>
                  {userRole === 'admin' && (
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                      <Flag className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setIsPrayerMode(!isPrayerMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-colors ${
              isPrayerMode 
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <Heart className="w-3 h-3" />
            Prayer Request
          </button>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isPrayerMode ? "Share your prayer request..." : "Type a message..."}
            disabled={!isLive}
            className="flex-1 px-3 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <SpectacularButton 
            size="sm" 
            onClick={sendMessage}
            disabled={!isLive || !inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </SpectacularButton>
        </div>
        
        {!isLive && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            Chat will be available when the stream goes live
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
