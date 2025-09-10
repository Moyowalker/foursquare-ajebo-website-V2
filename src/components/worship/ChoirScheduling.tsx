'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Users,
  User,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Music,
  Phone,
  Mail,
  MapPin,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  BookOpen,
  Mic
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { ChoirPractice, ChoirMember, ChoirAvailability, VoicePart } from '@/types/worship';

// Mock data
const mockVoiceParts: VoicePart[] = [
  { id: '1', name: 'Soprano', description: 'Highest female voice part', color: 'from-pink-400 to-rose-600' },
  { id: '2', name: 'Alto', description: 'Lower female voice part', color: 'from-purple-400 to-violet-600' },
  { id: '3', name: 'Tenor', description: 'Higher male voice part', color: 'from-blue-400 to-cyan-600' },
  { id: '4', name: 'Bass', description: 'Lowest male voice part', color: 'from-green-400 to-emerald-600' }
];

const mockMembers: ChoirMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    voicePart: mockVoiceParts[0],
    joinDate: new Date('2023-01-15'),
    isActive: true,
    skills: ['Sight Reading', 'Solo Performance'],
    notes: 'Strong soprano with excellent range',
    availability: [
      { dayOfWeek: 0, isAvailable: true, timeSlots: ['morning', 'evening'] },
      { dayOfWeek: 3, isAvailable: true, timeSlots: ['evening'] },
      { dayOfWeek: 6, isAvailable: true, timeSlots: ['morning', 'afternoon'] }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    voicePart: mockVoiceParts[2],
    joinDate: new Date('2022-09-20'),
    isActive: true,
    skills: ['Piano', 'Music Direction'],
    notes: 'Experienced tenor and pianist',
    availability: [
      { dayOfWeek: 0, isAvailable: true, timeSlots: ['morning', 'afternoon'] },
      { dayOfWeek: 2, isAvailable: true, timeSlots: ['evening'] },
      { dayOfWeek: 4, isAvailable: true, timeSlots: ['evening'] },
      { dayOfWeek: 6, isAvailable: true, timeSlots: ['morning'] }
    ]
  },
  {
    id: '3',
    name: 'Grace Williams',
    email: 'grace.williams@email.com',
    phone: '+1 (555) 345-6789',
    voicePart: mockVoiceParts[1],
    joinDate: new Date('2023-03-10'),
    isActive: true,
    skills: ['Harmony', 'Vocal Arrangement'],
    notes: 'Excellent alto with harmony skills',
    availability: [
      { dayOfWeek: 0, isAvailable: true, timeSlots: ['afternoon', 'evening'] },
      { dayOfWeek: 3, isAvailable: true, timeSlots: ['evening'] },
      { dayOfWeek: 5, isAvailable: true, timeSlots: ['evening'] }
    ]
  }
];

const mockPractices: ChoirPractice[] = [
  {
    id: '1',
    title: 'Sunday Morning Rehearsal',
    description: 'Preparation for Sunday service',
    date: new Date('2024-01-14'),
    startTime: '09:00',
    endTime: '11:00',
    location: 'Main Sanctuary',
    type: 'rehearsal',
    status: 'scheduled',
    attendees: mockMembers.slice(0, 2),
    repertoire: ['Amazing Grace', 'How Great Thou Art'],
    notes: 'Focus on harmonies for verse 2',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Christmas Concert Practice',
    description: 'Special Christmas performance preparation',
    date: new Date('2024-01-21'),
    startTime: '14:00',
    endTime: '17:00',
    location: 'Fellowship Hall',
    type: 'performance',
    status: 'scheduled',
    attendees: mockMembers,
    repertoire: ['Silent Night', 'O Holy Night', 'Joy to the World'],
    notes: 'Full dress rehearsal with accompanist',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface ChoirSchedulingProps {
  onScheduleUpdate?: (practices: ChoirPractice[]) => void;
}

export const ChoirScheduling: React.FC<ChoirSchedulingProps> = ({
  onScheduleUpdate
}) => {
  const [practices, setPractices] = useState<ChoirPractice[]>(mockPractices);
  const [members, setMembers] = useState<ChoirMember[]>(mockMembers);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'members'>('calendar');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingPractice, setEditingPractice] = useState<ChoirPractice | null>(null);
  const [editingMember, setEditingMember] = useState<ChoirMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVoicePart, setFilterVoicePart] = useState('');
  const [showAvailability, setShowAvailability] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'rehearsal' as ChoirPractice['type'],
    attendees: [] as string[],
    repertoire: '',
    notes: ''
  });

  const [memberFormData, setMemberFormData] = useState({
    name: '',
    email: '',
    phone: '',
    voicePartId: '',
    skills: '',
    notes: ''
  });

  // Filter and search logic
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVoicePart = !filterVoicePart || member.voicePart.id === filterVoicePart;
    return matchesSearch && matchesVoicePart && member.isActive;
  });

  const getDayPractices = (date: Date) => {
    return practices.filter(practice => 
      practice.date.toDateString() === date.toDateString()
    );
  };

  const getAvailableMembers = (date: Date, startTime: string) => {
    const dayOfWeek = date.getDay();
    const timeSlot = getTimeSlot(startTime);
    
    return members.filter(member => {
      const availability = member.availability.find(a => a.dayOfWeek === dayOfWeek);
      return availability?.isAvailable && availability.timeSlots.includes(timeSlot);
    });
  };

  const getTimeSlot = (time: string): string => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const handleCreatePractice = () => {
    const newPractice: ChoirPractice = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      type: formData.type,
      status: 'scheduled',
      attendees: members.filter(m => formData.attendees.includes(m.id)),
      repertoire: formData.repertoire.split('\n').filter(r => r.trim()),
      notes: formData.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedPractices = [...practices, newPractice];
    setPractices(updatedPractices);
    if (onScheduleUpdate) onScheduleUpdate(updatedPractices);
    
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditPractice = () => {
    if (!editingPractice) return;

    const updatedPractice: ChoirPractice = {
      ...editingPractice,
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      type: formData.type,
      attendees: members.filter(m => formData.attendees.includes(m.id)),
      repertoire: formData.repertoire.split('\n').filter(r => r.trim()),
      notes: formData.notes,
      updatedAt: new Date()
    };

    const updatedPractices = practices.map(p => 
      p.id === editingPractice.id ? updatedPractice : p
    );
    setPractices(updatedPractices);
    if (onScheduleUpdate) onScheduleUpdate(updatedPractices);
    
    setEditingPractice(null);
    resetForm();
  };

  const handleCreateMember = () => {
    const voicePart = mockVoiceParts.find(vp => vp.id === memberFormData.voicePartId);
    if (!voicePart) return;

    const newMember: ChoirMember = {
      id: Date.now().toString(),
      name: memberFormData.name,
      email: memberFormData.email,
      phone: memberFormData.phone,
      voicePart,
      joinDate: new Date(),
      isActive: true,
      skills: memberFormData.skills.split(',').map(s => s.trim()).filter(s => s),
      notes: memberFormData.notes,
      availability: []
    };

    setMembers([...members, newMember]);
    setShowMemberModal(false);
    resetMemberForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      type: 'rehearsal',
      attendees: [],
      repertoire: '',
      notes: ''
    });
  };

  const resetMemberForm = () => {
    setMemberFormData({
      name: '',
      email: '',
      phone: '',
      voicePartId: '',
      skills: '',
      notes: ''
    });
  };

  const loadPracticeToForm = (practice: ChoirPractice) => {
    setFormData({
      title: practice.title,
      description: practice.description,
      date: practice.date.toISOString().split('T')[0],
      startTime: practice.startTime,
      endTime: practice.endTime,
      location: practice.location,
      type: practice.type,
      attendees: practice.attendees.map(a => a.id),
      repertoire: practice.repertoire.join('\n'),
      notes: practice.notes || ''
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 font-medium">Choir Scheduling</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Practice Management</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Coordinate choir practices, manage member availability, and organize your worship music ministry.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{practices.length}</div>
              <div className="text-slate-300">Scheduled Practices</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{members.filter(m => m.isActive).length}</div>
              <div className="text-slate-300">Active Members</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{mockVoiceParts.length}</div>
              <div className="text-slate-300">Voice Parts</div>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {practices.filter(p => p.date >= new Date()).length}
              </div>
              <div className="text-slate-300">Upcoming Events</div>
            </GlassCard>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex gap-3">
              <SpectacularButton
                variant={viewMode === 'calendar' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('calendar')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </SpectacularButton>
              <SpectacularButton
                variant={viewMode === 'list' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('list')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </SpectacularButton>
              <SpectacularButton
                variant={viewMode === 'members' ? "primary" : "outline"}
                size="md"
                onClick={() => setViewMode('members')}
              >
                <Users className="w-4 h-4 mr-2" />
                Members
              </SpectacularButton>
            </div>

            <div className="flex gap-3">
              <SpectacularButton
                variant="primary"
                size="md"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Practice
              </SpectacularButton>
              <SpectacularButton
                variant="outline"
                size="md"
                onClick={() => setShowMemberModal(true)}
              >
                <User className="w-4 h-4 mr-2" />
                Add Member
              </SpectacularButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Practice Calendar</h2>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center font-bold text-slate-400 border-b border-white/20">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid - Simplified for demo */}
              <div className="space-y-4">
                {practices.map(practice => (
                  <motion.div
                    key={practice.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-white mb-1">{practice.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{formatDate(practice.date)}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {practice.startTime} - {practice.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {practice.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {practice.attendees.length} members
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPractice(practice);
                            loadPracticeToForm(practice);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setPractices(practices.filter(p => p.id !== practice.id));
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {practice.repertoire.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-sm text-slate-400 mb-1">Repertoire:</div>
                        <div className="flex flex-wrap gap-2">
                          {practice.repertoire.map((song, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                            >
                              {song}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Practice Schedule</h2>
              
              <div className="space-y-4">
                {practices.sort((a, b) => a.date.getTime() - b.date.getTime()).map(practice => (
                  <motion.div
                    key={practice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{practice.title}</h3>
                        <p className="text-slate-300 mb-3">{practice.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Calendar className="w-4 h-4" />
                              {formatDate(practice.date)}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Clock className="w-4 h-4" />
                              {practice.startTime} - {practice.endTime}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin className="w-4 h-4" />
                              {practice.location}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Music className="w-4 h-4" />
                              {practice.type === 'rehearsal' ? 'Rehearsal' : 'Performance'}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Users className="w-4 h-4" />
                              {practice.attendees.length} attendees
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPractice(practice);
                            loadPracticeToForm(practice);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setPractices(practices.filter(p => p.id !== practice.id));
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {practice.attendees.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Attendees:</h4>
                        <div className="flex flex-wrap gap-2">
                          {practice.attendees.map(member => (
                            <span 
                              key={member.id}
                              className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${member.voicePart.color} bg-opacity-20 text-white border border-white/20`}
                            >
                              {member.name} ({member.voicePart.name})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {practice.repertoire.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Repertoire:</h4>
                        <div className="flex flex-wrap gap-2">
                          {practice.repertoire.map((song, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full"
                            >
                              {song}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Members View */}
          {viewMode === 'members' && (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Choir Members</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <select
                    value={filterVoicePart}
                    onChange={(e) => setFilterVoicePart(e.target.value)}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">All Voice Parts</option>
                    {mockVoiceParts.map(vp => (
                      <option key={vp.id} value={vp.id} className="text-black">{vp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {filteredMembers.map(member => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${member.voicePart.color} flex items-center justify-center text-white font-bold`}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{member.name}</h3>
                          <p className="text-sm text-slate-400">{member.voicePart.name}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        Joined {member.joinDate.toLocaleDateString()}
                      </div>
                    </div>

                    {member.skills.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Availability</span>
                        <span className="text-xs text-green-400">
                          {member.availability.length} days available
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Create Practice Modal */}
      <AnimatePresence>
        {(showCreateModal || editingPractice) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowCreateModal(false);
              setEditingPractice(null);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingPractice ? 'Edit Practice' : 'Create New Practice'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingPractice(null);
                      resetForm();
                    }}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                        placeholder="Practice title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      >
                        <option value="rehearsal" className="text-black">Rehearsal</option>
                        <option value="performance" className="text-black">Performance</option>
                        <option value="audition" className="text-black">Audition</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Practice description"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">End Time</label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Practice location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Attendees</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 bg-white/5 rounded-lg border border-white/20">
                      {members.filter(m => m.isActive).map(member => (
                        <label key={member.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.attendees.includes(member.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ 
                                  ...prev, 
                                  attendees: [...prev.attendees, member.id] 
                                }));
                              } else {
                                setFormData(prev => ({ 
                                  ...prev, 
                                  attendees: prev.attendees.filter(id => id !== member.id) 
                                }));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-slate-300">{member.name}</span>
                          <span className="text-xs text-slate-500">({member.voicePart.name})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Repertoire (one per line)</label>
                    <textarea
                      value={formData.repertoire}
                      onChange={(e) => setFormData(prev => ({ ...prev, repertoire: e.target.value }))}
                      rows={4}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Amazing Grace&#10;How Great Thou Art&#10;..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Additional notes or instructions"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <SpectacularButton
                      variant="primary"
                      size="md"
                      onClick={editingPractice ? handleEditPractice : handleCreatePractice}
                      disabled={!formData.title || !formData.date || !formData.startTime}
                      className="flex-1"
                    >
                      {editingPractice ? 'Update Practice' : 'Create Practice'}
                    </SpectacularButton>
                    <SpectacularButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setShowCreateModal(false);
                        setEditingPractice(null);
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </SpectacularButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Add New Member</h2>
                  <button
                    onClick={() => setShowMemberModal(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={memberFormData.name}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Member name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={memberFormData.email}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="member@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={memberFormData.phone}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Voice Part</label>
                    <select
                      value={memberFormData.voicePartId}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, voicePartId: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                      <option value="">Select voice part</option>
                      {mockVoiceParts.map(vp => (
                        <option key={vp.id} value={vp.id} className="text-black">{vp.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={memberFormData.skills}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, skills: e.target.value }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Piano, Sight Reading, Solo Performance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                    <textarea
                      value={memberFormData.notes}
                      onChange={(e) => setMemberFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      placeholder="Additional notes about the member"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <SpectacularButton
                      variant="primary"
                      size="md"
                      onClick={handleCreateMember}
                      disabled={!memberFormData.name || !memberFormData.email || !memberFormData.voicePartId}
                      className="flex-1"
                    >
                      Add Member
                    </SpectacularButton>
                    <SpectacularButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setShowMemberModal(false);
                        resetMemberForm();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </SpectacularButton>
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

export default ChoirScheduling;
