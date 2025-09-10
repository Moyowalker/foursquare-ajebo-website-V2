'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Monitor,
  Settings,
  Type,
  Palette,
  Maximize,
  Minimize,
  Volume2,
  ChevronUp,
  ChevronDown,
  Search,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { LyricsSession, LyricsDisplaySettings, Hymn, HymnVerse } from '@/types/worship';

interface LiveLyricsDisplayProps {
  session?: LyricsSession;
  onSessionUpdate?: (session: LyricsSession) => void;
  hymns?: Hymn[];
  fullscreen?: boolean;
}

export const LiveLyricsDisplay: React.FC<LiveLyricsDisplayProps> = ({
  session,
  onSessionUpdate,
  hymns = [],
  fullscreen = false
}) => {
  const [currentSession, setCurrentSession] = useState<LyricsSession>(
    session || {
      id: '1',
      name: 'Sunday Morning Service',
      hymns: [],
      currentHymnIndex: 0,
      currentVerseIndex: 0,
      isPlaying: false,
      displaySettings: {
        fontSize: 48,
        fontFamily: 'Inter',
        textColor: '#ffffff',
        backgroundColor: '#000000',
        backgroundOpacity: 0.8,
        textAlign: 'center',
        lineHeight: 1.5,
        highlightColor: '#fbbf24',
        showChords: false,
        showTranslation: false,
        autoScroll: true,
        scrollSpeed: 3
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableHymns, setAvailableHymns] = useState<Hymn[]>(hymns);
  const [currentVerse, setCurrentVerse] = useState<HymnVerse | null>(null);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout>();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);

  // Mock hymns data if none provided
  useEffect(() => {
    if (availableHymns.length === 0) {
      setAvailableHymns([
        {
          id: '1',
          title: 'Amazing Grace',
          number: 101,
          lyrics: [
            { 
              id: '1-1', 
              type: 'verse', 
              number: 1, 
              text: "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.", 
              startTime: 0, 
              endTime: 20 
            },
            { 
              id: '1-2', 
              type: 'verse', 
              number: 2, 
              text: "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.", 
              startTime: 20, 
              endTime: 40 
            }
          ],
          category: { id: '1', name: 'Traditional', description: '', color: 'from-blue-400 to-indigo-600', icon: '⛪' },
          author: 'John Newton',
          key: 'G',
          tempo: 90,
          difficulty: 'Easy',
          tags: ['grace', 'salvation'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
  }, [availableHymns.length]);

  // Update current verse when session changes
  useEffect(() => {
    if (currentSession.hymns.length > 0) {
      const currentHymn = currentSession.hymns[currentSession.currentHymnIndex];
      if (currentHymn && currentHymn.lyrics.length > 0) {
        const verse = currentHymn.lyrics[currentSession.currentVerseIndex];
        setCurrentVerse(verse || null);
      }
    }
  }, [currentSession.currentHymnIndex, currentSession.currentVerseIndex, currentSession.hymns]);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
      
      return () => {
        if (controlsTimeout) clearTimeout(controlsTimeout);
      };
    }
  }, [isFullscreen, showControls]);

  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    if (isFullscreen) {
      setShowControls(true);
      if (controlsTimeout) clearTimeout(controlsTimeout);
      
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
  };

  // Session management functions
  const updateSession = (updates: Partial<LyricsSession>) => {
    const updated = { ...currentSession, ...updates, updatedAt: new Date() };
    setCurrentSession(updated);
    if (onSessionUpdate) onSessionUpdate(updated);
  };

  const addHymnToSession = (hymn: Hymn) => {
    const updatedHymns = [...currentSession.hymns, hymn];
    updateSession({ hymns: updatedHymns });
  };

  const removeHymnFromSession = (hymnId: string) => {
    const updatedHymns = currentSession.hymns.filter(h => h.id !== hymnId);
    const newIndex = Math.min(currentSession.currentHymnIndex, updatedHymns.length - 1);
    updateSession({ 
      hymns: updatedHymns, 
      currentHymnIndex: Math.max(0, newIndex),
      currentVerseIndex: 0
    });
  };

  const nextVerse = () => {
    const currentHymn = currentSession.hymns[currentSession.currentHymnIndex];
    if (currentHymn) {
      if (currentSession.currentVerseIndex < currentHymn.lyrics.length - 1) {
        updateSession({ currentVerseIndex: currentSession.currentVerseIndex + 1 });
      } else {
        nextHymn();
      }
    }
  };

  const previousVerse = () => {
    if (currentSession.currentVerseIndex > 0) {
      updateSession({ currentVerseIndex: currentSession.currentVerseIndex - 1 });
    } else {
      previousHymn();
    }
  };

  const nextHymn = () => {
    if (currentSession.currentHymnIndex < currentSession.hymns.length - 1) {
      updateSession({ 
        currentHymnIndex: currentSession.currentHymnIndex + 1,
        currentVerseIndex: 0
      });
    }
  };

  const previousHymn = () => {
    if (currentSession.currentHymnIndex > 0) {
      updateSession({ 
        currentHymnIndex: currentSession.currentHymnIndex - 1,
        currentVerseIndex: 0
      });
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const updateDisplaySettings = (settings: Partial<LyricsDisplaySettings>) => {
    const updatedSettings = { ...currentSession.displaySettings, ...settings };
    updateSession({ displaySettings: updatedSettings });
  };

  const formatLyricsText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="block">
        {line}
      </div>
    ));
  };

  const currentHymn = currentSession.hymns[currentSession.currentHymnIndex];
  const filteredHymns = availableHymns.filter(hymn =>
    hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hymn.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} overflow-hidden`}
      style={{
        backgroundColor: currentSession.displaySettings.backgroundColor,
        opacity: currentSession.displaySettings.backgroundOpacity
      }}
      onMouseMove={handleMouseMove}
    >
      
      {/* Main Lyrics Display */}
      <div 
        ref={lyricsRef}
        className="flex items-center justify-center min-h-screen p-8"
        style={{ paddingBottom: isFullscreen ? '120px' : '8rem' }}
      >
        <AnimatePresence mode="wait">
          {currentVerse ? (
            <motion.div
              key={`${currentSession.currentHymnIndex}-${currentSession.currentVerseIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-6xl mx-auto"
              style={{
                fontSize: `${currentSession.displaySettings.fontSize}px`,
                fontFamily: currentSession.displaySettings.fontFamily,
                color: currentSession.displaySettings.textColor,
                textAlign: currentSession.displaySettings.textAlign as any,
                lineHeight: currentSession.displaySettings.lineHeight
              }}
            >
              {/* Hymn Title */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 font-bold opacity-80"
                style={{ fontSize: `${currentSession.displaySettings.fontSize * 0.6}px` }}
              >
                {currentHymn?.title}
              </motion.h1>

              {/* Verse Number/Type */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 opacity-60 uppercase tracking-wider font-medium"
                style={{ fontSize: `${currentSession.displaySettings.fontSize * 0.4}px` }}
              >
                {currentVerse.type === 'verse' && currentVerse.number 
                  ? `Verse ${currentVerse.number}`
                  : currentVerse.type === 'chorus' 
                    ? 'Chorus' 
                    : currentVerse.type === 'bridge'
                      ? 'Bridge'
                      : ''
                }
              </motion.div>

              {/* Lyrics Text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="leading-relaxed font-medium"
              >
                {formatLyricsText(currentVerse.text)}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60"
            >
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-3xl font-bold mb-2">Ready to Display Lyrics</h2>
              <p className="text-xl">Add hymns to your session to begin</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {(!isFullscreen || showControls) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`${isFullscreen ? 'fixed' : 'sticky'} bottom-0 left-0 right-0 z-50`}
          >
            <GlassCard className="mx-4 mb-4 p-4 border border-white/20">
              
              {/* Primary Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {currentHymn && (
                    <div className="text-white">
                      <div className="font-bold">{currentHymn.title}</div>
                      <div className="text-sm text-slate-400">
                        {currentVerse?.type === 'verse' && currentVerse.number 
                          ? `Verse ${currentVerse.number}`
                          : currentVerse?.type || ''
                        } • {currentSession.currentVerseIndex + 1} of {currentHymn.lyrics.length}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={previousVerse}
                    disabled={currentSession.currentHymnIndex === 0 && currentSession.currentVerseIndex === 0}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => updateSession({ isPlaying: !currentSession.isPlaying })}
                    className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors"
                  >
                    {currentSession.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>

                  <button
                    onClick={nextVerse}
                    disabled={currentSession.currentHymnIndex === currentSession.hymns.length - 1 && 
                             currentSession.currentVerseIndex === (currentHymn?.lyrics.length || 1) - 1}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <SpectacularButton
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </SpectacularButton>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Hymn Navigation */}
              {currentSession.hymns.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-slate-400 whitespace-nowrap">Hymns:</span>
                  <div className="flex gap-2 overflow-x-auto flex-1">
                    {currentSession.hymns.map((hymn, index) => (
                      <button
                        key={hymn.id}
                        onClick={() => updateSession({ currentHymnIndex: index, currentVerseIndex: 0 })}
                        className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors ${
                          index === currentSession.currentHymnIndex
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {hymn.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Display Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Typography Settings */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Typography
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Font Size</label>
                        <input
                          type="range"
                          min="24"
                          max="96"
                          step="4"
                          value={currentSession.displaySettings.fontSize}
                          onChange={(e) => updateDisplaySettings({ fontSize: parseInt(e.target.value) })}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-sm text-slate-400 mt-1">{currentSession.displaySettings.fontSize}px</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Font Family</label>
                        <select
                          value={currentSession.displaySettings.fontFamily}
                          onChange={(e) => updateDisplaySettings({ fontFamily: e.target.value })}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        >
                          <option value="Inter" className="text-black">Inter</option>
                          <option value="Georgia" className="text-black">Georgia</option>
                          <option value="Times New Roman" className="text-black">Times New Roman</option>
                          <option value="Arial" className="text-black">Arial</option>
                          <option value="Helvetica" className="text-black">Helvetica</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Line Height</label>
                        <input
                          type="range"
                          min="1"
                          max="2.5"
                          step="0.1"
                          value={currentSession.displaySettings.lineHeight}
                          onChange={(e) => updateDisplaySettings({ lineHeight: parseFloat(e.target.value) })}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-sm text-slate-400 mt-1">{currentSession.displaySettings.lineHeight}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Text Alignment</label>
                        <select
                          value={currentSession.displaySettings.textAlign}
                          onChange={(e) => updateDisplaySettings({ textAlign: e.target.value })}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        >
                          <option value="left" className="text-black">Left</option>
                          <option value="center" className="text-black">Center</option>
                          <option value="right" className="text-black">Right</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Color Settings */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Colors
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Text Color</label>
                        <input
                          type="color"
                          value={currentSession.displaySettings.textColor}
                          onChange={(e) => updateDisplaySettings({ textColor: e.target.value })}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Background Color</label>
                        <input
                          type="color"
                          value={currentSession.displaySettings.backgroundColor}
                          onChange={(e) => updateDisplaySettings({ backgroundColor: e.target.value })}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Background Opacity</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={currentSession.displaySettings.backgroundOpacity}
                          onChange={(e) => updateDisplaySettings({ backgroundOpacity: parseFloat(e.target.value) })}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-sm text-slate-400 mt-1">{Math.round(currentSession.displaySettings.backgroundOpacity * 100)}%</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Highlight Color</label>
                        <input
                          type="color"
                          value={currentSession.displaySettings.highlightColor}
                          onChange={(e) => updateDisplaySettings({ highlightColor: e.target.value })}
                          className="w-full h-10 rounded-lg border border-white/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hymn Management */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Add Hymns to Session
                    </h3>
                    
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search hymns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {filteredHymns.map((hymn) => (
                        <div
                          key={hymn.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div>
                            <div className="font-medium text-white">{hymn.title}</div>
                            <div className="text-sm text-slate-400">{hymn.author} • {hymn.lyrics.length} verses</div>
                          </div>
                          <SpectacularButton
                            variant="outline"
                            size="sm"
                            onClick={() => addHymnToSession(hymn)}
                            disabled={currentSession.hymns.some(h => h.id === hymn.id)}
                          >
                            {currentSession.hymns.some(h => h.id === hymn.id) ? 'Added' : 'Add'}
                          </SpectacularButton>
                        </div>
                      ))}
                    </div>

                    {/* Current Session Hymns */}
                    {currentSession.hymns.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-white mb-3">Session Hymns ({currentSession.hymns.length})</h4>
                        <div className="space-y-2">
                          {currentSession.hymns.map((hymn, index) => (
                            <div
                              key={hymn.id}
                              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                index === currentSession.currentHymnIndex 
                                  ? 'bg-purple-600/20 border border-purple-500/50' 
                                  : 'bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-sm text-slate-400 w-6">{index + 1}</div>
                                <div>
                                  <div className="font-medium text-white">{hymn.title}</div>
                                  <div className="text-sm text-slate-400">{hymn.lyrics.length} verses</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateSession({ currentHymnIndex: index, currentVerseIndex: 0 })}
                                  className="p-1 text-slate-400 hover:text-white transition-colors"
                                  title="Go to hymn"
                                >
                                  <Play className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => removeHymnFromSession(hymn.id)}
                                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                  title="Remove from session"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default LiveLyricsDisplay;
