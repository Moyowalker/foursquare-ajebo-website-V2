'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Heart,
  Target,
  Settings,
  Bell,
  Download,
  Filter,
  TrendingUp,
  Activity,
  Building,
  UserPlus,
  MessageSquare,
  BookOpen,
  Award,
  Zap,
  Eye,
  PieChart,
  Clock
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import AdvancedAnalyticsDashboard from '@/components/ministry/AdvancedAnalyticsDashboard';

type MinistrySection = 'analytics' | 'management' | 'scheduling' | 'communications';

interface MinistryFeature {
  id: MinistrySection;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: {
    label: string;
    value: string | number;
    trend?: string;
  }[];
  isAvailable: boolean;
}

const ministryFeatures: MinistryFeature[] = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Comprehensive insights into church growth, engagement, and ministry effectiveness',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-600',
    stats: [
      { label: 'Member Engagement', value: '87%', trend: 'up' },
      { label: 'Service Attendance', value: 892, trend: 'up' },
      { label: 'Monthly Giving', value: '$47,350', trend: 'up' },
      { label: 'Ministry Effectiveness', value: '92%', trend: 'up' }
    ],
    isAvailable: true
  },
  {
    id: 'management',
    title: 'Ministry Management',
    description: 'Manage ministry teams, volunteers, and leadership development programs',
    icon: <Users className="w-6 h-6" />,
    color: 'from-green-500 to-teal-600',
    stats: [
      { label: 'Active Ministries', value: 18, trend: 'stable' },
      { label: 'Volunteers', value: 245, trend: 'up' },
      { label: 'Leaders', value: 42, trend: 'up' },
      { label: 'Training Hours', value: 156, trend: 'up' }
    ],
    isAvailable: false
  },
  {
    id: 'scheduling',
    title: 'Ministry Scheduling',
    description: 'Coordinate ministry activities, events, and volunteer schedules',
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-600',
    stats: [
      { label: 'Upcoming Events', value: 12, trend: 'stable' },
      { label: 'Scheduled Services', value: 28, trend: 'up' },
      { label: 'Volunteer Slots', value: 156, trend: 'up' },
      { label: 'Room Bookings', value: 34, trend: 'stable' }
    ],
    isAvailable: false
  },
  {
    id: 'communications',
    title: 'Ministry Communications',
    description: 'Manage announcements, newsletters, and member communications',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-600',
    stats: [
      { label: 'Messages Sent', value: 1247, trend: 'up' },
      { label: 'Open Rate', value: '68%', trend: 'up' },
      { label: 'Subscribers', value: 892, trend: 'up' },
      { label: 'Engagement', value: '74%', trend: 'stable' }
    ],
    isAvailable: false
  }
];

const quickActions = [
  { id: 'view-reports', title: 'View Reports', icon: Eye, color: 'blue' },
  { id: 'export-data', title: 'Export Data', icon: Download, color: 'green' },
  { id: 'set-alerts', title: 'Set Alerts', icon: Bell, color: 'yellow' },
  { id: 'configure', title: 'Configure', icon: Settings, color: 'purple' }
];

const recentActivity = [
  {
    id: '1',
    type: 'insight',
    title: 'Member engagement increased by 8.2%',
    description: 'Compared to last month',
    time: '2 hours ago',
    icon: TrendingUp,
    color: 'text-green-400'
  },
  {
    id: '2',
    type: 'alert',
    title: '23 members at risk of disengagement',
    description: 'Requires immediate attention',
    time: '4 hours ago',
    icon: Users,
    color: 'text-yellow-400'
  },
  {
    id: '3',
    type: 'milestone',
    title: 'Monthly giving goal achieved',
    description: '$47,350 received this month',
    time: '6 hours ago',
    icon: DollarSign,
    color: 'text-blue-400'
  },
  {
    id: '4',
    type: 'update',
    title: 'Youth ministry effectiveness score: 95%',
    description: 'Highest performing ministry this quarter',
    time: '1 day ago',
    icon: Award,
    color: 'text-purple-400'
  }
];

export default function MinistryPage() {
  const [activeSection, setActiveSection] = useState<MinistrySection>('analytics');

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getQuickActionColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <GradientText 
            text="Ministry Management Platform" 
            className="text-4xl lg:text-5xl font-bold"
          />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive ministry management with advanced analytics, team coordination, 
            and effectiveness tracking to empower your church's mission.
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {ministryFeatures.map(feature => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ministryFeatures.indexOf(feature) * 0.1 }}
            >
              <GlassCard 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  activeSection === feature.id 
                    ? 'ring-2 ring-blue-400/50 bg-blue-500/10' 
                    : 'hover:bg-white/5'
                } ${!feature.isAvailable ? 'opacity-60' : ''}`}
                onClick={() => feature.isAvailable && setActiveSection(feature.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                  {!feature.isAvailable && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                      COMING SOON
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>

                <div className="space-y-2">
                  {feature.stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{stat.label}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold">{stat.value}</span>
                        {getTrendIcon(stat.trend)}
                      </div>
                    </div>
                  ))}
                </div>

                {feature.isAvailable && (
                  <SpectacularButton
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => setActiveSection(feature.id)}
                  >
                    {activeSection === feature.id ? 'Currently Active' : 'Access Feature'}
                  </SpectacularButton>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        {activeSection === 'analytics' && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map(action => {
                    const Icon = action.icon;
                    return (
                      <SpectacularButton
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="flex-col h-16 text-xs"
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        {action.title}
                      </SpectacularButton>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentActivity.map(activity => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <div className={`p-2 rounded-full bg-gray-800 ${activity.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{activity.title}</p>
                          <p className="text-gray-400 text-xs">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="space-y-6">
          {activeSection === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedAnalyticsDashboard />
            </motion.div>
          )}

          {activeSection !== 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <GlassCard className="p-12 max-w-2xl mx-auto">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Feature Coming Soon</h3>
                <p className="text-gray-400 mb-6">
                  This feature is currently under development and will be available in a future update. 
                  Stay tuned for powerful ministry management capabilities!
                </p>
                <div className="flex justify-center gap-4">
                  <SpectacularButton
                    variant="outline"
                    size="md"
                    onClick={() => setActiveSection('analytics')}
                  >
                    View Analytics
                  </SpectacularButton>
                  <SpectacularButton variant="primary" size="md">
                    Get Notified
                  </SpectacularButton>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
