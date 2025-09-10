'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Star, 
  Clock, 
  Quote, 
  Download, 
  Share2,
  Bookmark,
  Edit,
  Type,
  Mic
} from 'lucide-react';
import { SpectacularButton, GlassCard } from '@/components/ui/spectacular';
import { SermonNote } from '@/types/streaming';

interface SermonNotesProps {
  streamId: string;
  isLive: boolean;
  userId: string;
  userRole: 'admin' | 'moderator' | 'member' | 'guest';
}

export const SermonNotes: React.FC<SermonNotesProps> = ({
  streamId,
  isLive,
  userId,
  userRole
}) => {
  const [notes, setNotes] = useState<SermonNote[]>([]);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [currentNote, setCurrentNote] = useState<string>('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [streamTime, setStreamTime] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Mock sermon data
  const sermonInfo = {
    title: "Walking in Faith Through Uncertain Times",
    speaker: "Pastor Emmanuel Adebayo",
    date: new Date().toISOString(),
    mainScripture: "Jeremiah 29:11",
    series: "Trust in the Lord"
  };

  // Initialize with some notes if admin/moderator
  useEffect(() => {
    if (userRole === 'admin' || userRole === 'moderator') {
      const initialNotes: SermonNote[] = [
        {
          id: '1',
          timestamp: '00:05:30',
          title: 'Opening Prayer',
          content: 'Lord, open our hearts to receive Your word today. Help us to understand Your will for our lives.',
          bibleVerse: 'Psalm 119:18',
          isHighlight: true,
          attachments: []
        },
        {
          id: '2',
          timestamp: '00:12:15',
          title: 'Key Point: God\'s Faithfulness',
          content: 'Even when we cannot see the path ahead, God remains faithful to His promises. He has plans for our welfare, not for harm.',
          bibleVerse: 'Jeremiah 29:11',
          isHighlight: true,
          attachments: []
        },
        {
          id: '3',
          timestamp: '00:18:45',
          title: 'Personal Application',
          content: 'How can we apply this in our daily lives? 1. Trust in God\'s timing 2. Pray without ceasing 3. Seek His will in all decisions',
          isHighlight: false,
          attachments: []
        }
      ];
      setNotes(initialNotes);
    }
  }, [userRole]);

  // Simulate live time updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setStreamTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  // Add new note (admin/moderator only)
  const addNote = () => {
    if (!currentNote.trim() || (userRole !== 'admin' && userRole !== 'moderator')) return;

    const newNote: SermonNote = {
      id: Date.now().toString(),
      timestamp: formatStreamTime(streamTime),
      title: `Note at ${formatStreamTime(streamTime)}`,
      content: currentNote,
      isHighlight: false,
      attachments: []
    };

    setNotes(prev => [...prev, newNote]);
    setCurrentNote('');
    setIsAddingNote(false);
  };

  // Format stream time
  const formatStreamTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle highlight
  const toggleHighlight = (noteId: string) => {
    if (userRole !== 'admin' && userRole !== 'moderator') return;
    
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, isHighlight: !note.isHighlight }
          : note
      )
    );
  };

  // Download notes
  const downloadNotes = () => {
    const notesText = notes.map(note => 
      `[${note.timestamp}] ${note.title}\n${note.content}${note.bibleVerse ? `\nScripture: ${note.bibleVerse}` : ''}\n\n`
    ).join('');
    
    const personalSection = personalNotes ? `\n\nPersonal Notes:\n${personalNotes}` : '';
    
    const fullText = `${sermonInfo.title}\nSpeaker: ${sermonInfo.speaker}\nDate: ${new Date(sermonInfo.date).toLocaleDateString()}\nMain Scripture: ${sermonInfo.mainScripture}\n\n${notesText}${personalSection}`;
    
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sermon-notes-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-sm rounded-lg border border-white/10">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Sermon Notes
          </h3>
          
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{formatStreamTime(streamTime)}</span>
              </div>
            )}
            
            <SpectacularButton size="sm" onClick={downloadNotes}>
              <Download className="w-4 h-4" />
            </SpectacularButton>
          </div>
        </div>
        
        {/* Sermon Info */}
        <GlassCard className="p-3">
          <h4 className="font-semibold text-purple-300 mb-1">{sermonInfo.title}</h4>
          <p className="text-sm text-gray-300 mb-1">by {sermonInfo.speaker}</p>
          <p className="text-xs text-gray-400">
            Main Scripture: <span className="text-purple-300">{sermonInfo.mainScripture}</span>
          </p>
        </GlassCard>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all ${
                note.isHighlight 
                  ? 'bg-yellow-500/10 border-yellow-500/30' 
                  : 'bg-slate-700/50 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-purple-300">{note.timestamp}</span>
                  {note.isHighlight && <Star className="w-4 h-4 text-yellow-400" />}
                </div>
                
                {(userRole === 'admin' || userRole === 'moderator') && (
                  <button
                    onClick={() => toggleHighlight(note.id)}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h4 className="font-semibold text-white mb-2">{note.title}</h4>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">{note.content}</p>
              
              {note.bibleVerse && (
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Quote className="w-4 h-4" />
                  <span>{note.bibleVerse}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Note Form (Admin/Moderator) */}
        {(userRole === 'admin' || userRole === 'moderator') && (
          <div className="space-y-3">
            {isAddingNote ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-slate-700/50 rounded-lg border border-white/10"
              >
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Add a note about this moment in the service..."
                  className="w-full h-24 px-3 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <SpectacularButton 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </SpectacularButton>
                  <SpectacularButton 
                    size="sm"
                    onClick={addNote}
                    disabled={!currentNote.trim()}
                  >
                    Add Note
                  </SpectacularButton>
                </div>
              </motion.div>
            ) : (
              <SpectacularButton
                variant="outline"
                onClick={() => setIsAddingNote(true)}
                disabled={!isLive}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Live Note
              </SpectacularButton>
            )}
          </div>
        )}
      </div>

      {/* Personal Notes Section */}
      <div className="p-4 border-t border-white/10">
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Personal Notes
        </h4>
        <textarea
          value={personalNotes}
          onChange={(e) => setPersonalNotes(e.target.value)}
          placeholder="Write your personal thoughts and reflections..."
          className="w-full h-20 px-3 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none text-sm"
        />
      </div>
    </div>
  );
};

export default SermonNotes;
