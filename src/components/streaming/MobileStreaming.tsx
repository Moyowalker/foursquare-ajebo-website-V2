'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  BookOpen, 
  Users, 
  Maximize2, 
  Minimize2,
  Settings,
  Volume2,
  VolumeX,
  Share2
} from 'lucide-react';
import { SpectacularButton } from '@/components/ui/spectacular';
import LiveChat from './LiveChat';
import SermonNotes from './SermonNotes';

interface MobileStreamingProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  userId: string;
  userName: string;
  userRole: 'admin' | 'moderator' | 'member' | 'guest';
}

export const MobileStreaming: React.FC<MobileStreamingProps> = ({
  streamId,
  isLive,
  viewerCount,
  userId,
  userName,
  userRole
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState<'none' | 'chat' | 'notes'>('none');
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const panels = [
    { id: 'chat', icon: MessageCircle, label: 'Chat', count: 42 },
    { id: 'notes', icon: BookOpen, label: 'Notes', count: 8 },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      
      {/* Video Player */}
      <div className="relative flex-1 bg-black">
        <video
          className="w-full h-full object-cover"
          poster="/images/church-service.jpg"
          controls={false}
          onClick={() => setShowControls(!showControls)}
        >
          <source src="/streams/main.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
          >
            
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
                  Pulpit View
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Users className="w-4 h-4" />
                  <span>{viewerCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Panel Toggle Buttons */}
      {activePanel === 'none' && (
        <div className="absolute bottom-20 right-4 flex flex-col gap-2">
          {panels.map((panel) => (
            <motion.button
              key={panel.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActivePanel(panel.id as any)}
              className="relative p-3 bg-purple-600 rounded-full shadow-lg"
            >
              <panel.icon className="w-6 h-6 text-white" />
              {panel.count > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {panel.count > 99 ? '99+' : panel.count}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Sliding Panels */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: activePanel !== 'none' ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-900 border-t border-white/10 flex flex-col"
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white capitalize">
            {activePanel}
          </h3>
          <button
            onClick={() => setActivePanel('none')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-hidden">
          {activePanel === 'chat' && (
            <LiveChat
              streamId={streamId}
              userId={userId}
              userName={userName}
              userRole={userRole}
              isLive={isLive}
            />
          )}
          
          {activePanel === 'notes' && (
            <SermonNotes
              streamId={streamId}
              isLive={isLive}
              userId={userId}
              userRole={userRole}
            />
          )}
        </div>
      </motion.div>

      {/* Quick Action Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <div className="flex items-center gap-4 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => setActivePanel(activePanel === panel.id ? 'none' : panel.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
                activePanel === panel.id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <panel.icon className="w-4 h-4" />
              <span className="text-sm">{panel.label}</span>
              {panel.count > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {panel.count > 99 ? '99+' : panel.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileStreaming;
