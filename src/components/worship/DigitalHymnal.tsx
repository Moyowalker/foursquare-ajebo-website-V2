'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  Music, 
  Filter,
  Download,
  Share2,
  Book,
  Clock,
  User,
  Tag,
  List,
  Grid,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { Hymn, HymnCategory, HymnSearchFilters } from '@/types/worship';

// Mock data for demonstration
const mockCategories: HymnCategory[] = [
  { id: '1', name: 'Praise & Worship', description: 'Songs of praise and adoration', color: 'from-yellow-400 to-orange-600', icon: '🙌' },
  { id: '2', name: 'Traditional Hymns', description: 'Classic church hymns', color: 'from-blue-400 to-indigo-600', icon: '⛪' },
  { id: '3', name: 'Contemporary', description: 'Modern worship songs', color: 'from-purple-400 to-pink-600', icon: '🎵' },
  { id: '4', name: 'Gospel', description: 'Gospel and spiritual songs', color: 'from-green-400 to-teal-600', icon: '✨' },
  { id: '5', name: 'Christmas', description: 'Christmas and holiday songs', color: 'from-red-400 to-pink-600', icon: '🎄' },
  { id: '6', name: 'Easter', description: 'Easter and resurrection songs', color: 'from-purple-400 to-blue-600', icon: '🌅' }
];

const mockHymns: Hymn[] = [
  {
    id: '1',
    title: 'Amazing Grace',
    number: 101,
    lyrics: [
      { id: '1-1', type: 'verse', number: 1, text: "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.", startTime: 0, endTime: 20 },
      { id: '1-2', type: 'verse', number: 2, text: "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.", startTime: 20, endTime: 40 }
    ],
    audioUrl: '/audio/hymns/amazing-grace.mp3',
    category: mockCategories[1],
    author: 'John Newton',
    composer: 'Traditional',
    key: 'G',
    tempo: 90,
    difficulty: 'Easy',
    tags: ['grace', 'salvation', 'traditional'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'How Great Thou Art',
    number: 102,
    lyrics: [
      { id: '2-1', type: 'verse', number: 1, text: "O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made\nI see the stars, I hear the rolling thunder\nThy power throughout the universe displayed", startTime: 0, endTime: 25 },
      { id: '2-2', type: 'chorus', text: "Then sings my soul, my Saviour God, to Thee\nHow great Thou art! How great Thou art!\nThen sings my soul, my Saviour God, to Thee\nHow great Thou art! How great Thou art!", startTime: 25, endTime: 45 }
    ],
    audioUrl: '/audio/hymns/how-great-thou-art.mp3',
    category: mockCategories[0],
    author: 'Carl Boberg',
    composer: 'Traditional Swedish',
    key: 'C',
    tempo: 85,
    difficulty: 'Intermediate',
    tags: ['praise', 'nature', 'worship'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Blessed Assurance',
    number: 103,
    lyrics: [
      { id: '3-1', type: 'verse', number: 1, text: "Blessed assurance, Jesus is mine!\nO what a foretaste of glory divine!\nHeir of salvation, purchase of God,\nBorn of His Spirit, washed in His blood.", startTime: 0, endTime: 22 },
      { id: '3-2', type: 'chorus', text: "This is my story, this is my song,\nPraising my Savior all the day long;\nThis is my story, this is my song,\nPraising my Savior all the day long.", startTime: 22, endTime: 40 }
    ],
    audioUrl: '/audio/hymns/blessed-assurance.mp3',
    category: mockCategories[1],
    author: 'Fanny Crosby',
    composer: 'Phoebe Knapp',
    key: 'D',
    tempo: 95,
    difficulty: 'Easy',
    tags: ['assurance', 'testimony', 'joy'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface DigitalHymnalProps {
  onSelectHymn?: (hymn: Hymn) => void;
  showPlayer?: boolean;
}

export const DigitalHymnal: React.FC<DigitalHymnalProps> = ({
  onSelectHymn,
  showPlayer = true
}) => {
  const [hymns, setHymns] = useState<Hymn[]>(mockHymns);
  const [filteredHymns, setFilteredHymns] = useState<Hymn[]>(mockHymns);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<HymnSearchFilters>({
    query: '',
    category: '',
    difficulty: '',
    hasAudio: false
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  // Filter hymns based on search criteria
  useEffect(() => {
    let filtered = [...hymns];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(hymn => 
        hymn.title.toLowerCase().includes(query) ||
        hymn.author?.toLowerCase().includes(query) ||
        hymn.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(hymn => hymn.category.id === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(hymn => hymn.difficulty === filters.difficulty);
    }

    if (filters.hasAudio) {
      filtered = filtered.filter(hymn => hymn.audioUrl);
    }

    setFilteredHymns(filtered);
  }, [filters, hymns]);

  // Audio player controls
  const playHymn = (hymn: Hymn) => {
    setSelectedHymn(hymn);
    if (onSelectHymn) onSelectHymn(hymn);
    
    if (audioRef.current && hymn.audioUrl) {
      audioRef.current.src = hymn.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const nextHymn = () => {
    if (selectedHymn) {
      const currentIndex = filteredHymns.findIndex(h => h.id === selectedHymn.id);
      const nextIndex = (currentIndex + 1) % filteredHymns.length;
      playHymn(filteredHymns[nextIndex]);
    }
  };

  const previousHymn = () => {
    if (selectedHymn) {
      const currentIndex = filteredHymns.findIndex(h => h.id === selectedHymn.id);
      const prevIndex = currentIndex === 0 ? filteredHymns.length - 1 : currentIndex - 1;
      playHymn(filteredHymns[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Book className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">Digital Hymnal</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Worship Songs</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover and enjoy our collection of hymns and worship songs with audio playback, 
              lyrics, and chord progressions for musicians.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hymns, authors, or tags..."
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div className="flex gap-3">
                <SpectacularButton
                  variant={showFilters ? "primary" : "outline"}
                  size="md"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </SpectacularButton>
                
                <div className="flex bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <GlassCard className="p-6 mb-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <select
                          value={filters.category}
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        >
                          <option value="">All Categories</option>
                          {mockCategories.map(cat => (
                            <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                        <select
                          value={filters.difficulty}
                          onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        >
                          <option value="">All Levels</option>
                          <option value="Easy" className="text-black">Easy</option>
                          <option value="Intermediate" className="text-black">Intermediate</option>
                          <option value="Advanced" className="text-black">Advanced</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id="hasAudio"
                          checked={filters.hasAudio}
                          onChange={(e) => setFilters(prev => ({ ...prev, hasAudio: e.target.checked }))}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="hasAudio" className="text-sm text-slate-300">Has Audio</label>
                      </div>
                      
                      <div className="pt-6">
                        <SpectacularButton
                          variant="outline"
                          size="sm"
                          onClick={() => setFilters({ query: '', category: '', difficulty: '', hasAudio: false })}
                          className="w-full"
                        >
                          Clear Filters
                        </SpectacularButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                className={`p-4 rounded-xl text-center transition-all ${
                  filters.category === category.id
                    ? 'bg-gradient-to-r ' + category.color + ' text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Hymns Grid/List */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {filteredHymns.length} Songs Found
            </h2>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHymns.map((hymn) => (
                <motion.div
                  key={hymn.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                          {hymn.title}
                        </h3>
                        {hymn.number && (
                          <div className="text-sm text-slate-400 mb-2">#{hymn.number}</div>
                        )}
                      </div>
                      <div className={`text-2xl ${hymn.category.color} bg-gradient-to-r bg-clip-text text-transparent`}>
                        {hymn.category.icon}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {hymn.author && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <User className="w-3 h-3" />
                          {hymn.author}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Music className="w-3 h-3" />
                        Key: {hymn.key} • {hymn.difficulty}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-3 h-3" />
                        {hymn.tempo} BPM
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {hymn.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {hymn.audioUrl && (
                        <SpectacularButton
                          variant="primary"
                          size="sm"
                          onClick={() => playHymn(hymn)}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </SpectacularButton>
                      )}
                      <SpectacularButton
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedHymn(hymn)}
                        className="flex-1"
                      >
                        View Lyrics
                      </SpectacularButton>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHymns.map((hymn) => (
                <motion.div
                  key={hymn.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-4 hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${hymn.category.color} flex items-center justify-center text-white text-xl`}>
                          {hymn.category.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white truncate">{hymn.title}</h3>
                          {hymn.number && (
                            <span className="text-sm text-slate-400">#{hymn.number}</span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">{hymn.author} • Key: {hymn.key} • {hymn.difficulty}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hymn.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 flex gap-2">
                        {hymn.audioUrl && (
                          <SpectacularButton
                            variant="outline"
                            size="sm"
                            onClick={() => playHymn(hymn)}
                          >
                            <Play className="w-4 h-4" />
                          </SpectacularButton>
                        )}
                        <SpectacularButton
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedHymn(hymn)}
                        >
                          View
                        </SpectacularButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Audio Player */}
      {showPlayer && selectedHymn && selectedHymn.audioUrl && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <GlassCard className="mx-4 mb-4 p-4 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedHymn.category.color} flex items-center justify-center text-white text-xl`}>
                  {selectedHymn.category.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white truncate">{selectedHymn.title}</h4>
                <p className="text-sm text-slate-400 truncate">{selectedHymn.author}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={previousHymn}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                </button>
                
                <button
                  onClick={nextHymn}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-sm text-slate-400 whitespace-nowrap">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-slate-400 whitespace-nowrap">
                  {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default DigitalHymnal;
