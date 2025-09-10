'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Heart,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Eye,
  UserCheck,
  Building,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronDown,
  Settings,
  Info
} from 'lucide-react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { 
  DashboardMetric, 
  AnalyticsPeriod, 
  MemberEngagement,
  AttendanceAnalytics,
  GivingAnalytics,
  PrayerAnalytics,
  MinistryEffectivenessAnalytics,
  AnalyticsFilter
} from '@/types/ministry';

// Mock data for demonstration
const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: 'total-members',
    title: 'Total Members',
    value: 1247,
    change: 8.2,
    changeDirection: 'up',
    color: 'from-blue-500 to-purple-600',
    icon: 'Users',
    trend: [1150, 1180, 1210, 1235, 1247]
  },
  {
    id: 'avg-attendance',
    title: 'Avg Attendance',
    value: 892,
    change: 5.7,
    changeDirection: 'up',
    color: 'from-green-500 to-teal-600',
    icon: 'Calendar',
    trend: [820, 840, 865, 880, 892]
  },
  {
    id: 'monthly-giving',
    title: 'Monthly Giving',
    value: '$47,350',
    change: 12.3,
    changeDirection: 'up',
    color: 'from-yellow-500 to-orange-600',
    icon: 'DollarSign',
    trend: [38000, 41000, 43500, 45200, 47350]
  },
  {
    id: 'engagement-score',
    title: 'Engagement Score',
    value: '87%',
    change: 3.1,
    changeDirection: 'up',
    color: 'from-purple-500 to-pink-600',
    icon: 'Activity',
    trend: [82, 84, 85, 86, 87]
  },
  {
    id: 'prayer-requests',
    title: 'Prayer Requests',
    value: 156,
    change: -2.4,
    changeDirection: 'down',
    color: 'from-red-500 to-pink-600',
    icon: 'Heart',
    trend: [180, 175, 165, 160, 156]
  },
  {
    id: 'ministry-effectiveness',
    title: 'Ministry Effectiveness',
    value: '92%',
    change: 4.8,
    changeDirection: 'up',
    color: 'from-indigo-500 to-blue-600',
    icon: 'Target',
    trend: [85, 87, 89, 91, 92]
  }
];

const mockMemberEngagement: MemberEngagement[] = [
  {
    memberId: '1',
    memberName: 'Sarah Johnson',
    engagementScore: 95,
    lastActivity: new Date('2025-09-08'),
    monthlyActivities: [
      {
        month: 'Aug 2025',
        serviceAttendance: 4,
        ministryParticipation: 8,
        smallGroupAttendance: 3,
        volunteerHours: 12,
        donationCount: 2,
        prayerRequestsSubmitted: 1,
        eventsAttended: 2
      }
    ],
    trends: {
      period: 'month',
      change: 8.5,
      direction: 'up'
    },
    riskLevel: 'low'
  },
  {
    memberId: '2',
    memberName: 'Michael Chen',
    engagementScore: 72,
    lastActivity: new Date('2025-09-05'),
    monthlyActivities: [
      {
        month: 'Aug 2025',
        serviceAttendance: 3,
        ministryParticipation: 2,
        smallGroupAttendance: 2,
        volunteerHours: 4,
        donationCount: 1,
        prayerRequestsSubmitted: 0,
        eventsAttended: 1
      }
    ],
    trends: {
      period: 'month',
      change: -5.2,
      direction: 'down'
    },
    riskLevel: 'medium'
  },
  {
    memberId: '3',
    memberName: 'Jennifer Davis',
    engagementScore: 45,
    lastActivity: new Date('2025-08-15'),
    monthlyActivities: [
      {
        month: 'Aug 2025',
        serviceAttendance: 1,
        ministryParticipation: 0,
        smallGroupAttendance: 1,
        volunteerHours: 0,
        donationCount: 0,
        prayerRequestsSubmitted: 0,
        eventsAttended: 0
      }
    ],
    trends: {
      period: 'month',
      change: -15.8,
      direction: 'down'
    },
    riskLevel: 'high'
  }
];

const mockAttendanceAnalytics: AttendanceAnalytics = {
  averageAttendance: 892,
  growthRate: 5.7,
  seasonalTrends: [
    { month: 'Mar', attendance: 820, change: 2.1 },
    { month: 'Apr', attendance: 840, change: 2.4 },
    { month: 'May', attendance: 865, change: 3.0 },
    { month: 'Jun', attendance: 880, change: 1.7 },
    { month: 'Jul', attendance: 895, change: 1.7 },
    { month: 'Aug', attendance: 892, change: -0.3 }
  ],
  serviceComparison: [
    { serviceType: 'Sunday Morning', averageAttendance: 650, trend: 'up' },
    { serviceType: 'Sunday Evening', averageAttendance: 320, trend: 'stable' },
    { serviceType: 'Wednesday', averageAttendance: 180, trend: 'up' },
    { serviceType: 'Special Events', averageAttendance: 450, trend: 'up' }
  ],
  retentionRate: 68.5,
  peakAttendancePeriods: ['Easter Season', 'Christmas Season', 'Back to School']
};

const mockGivingAnalytics: GivingAnalytics = {
  totalGiving: 568200,
  averageGift: 125.50,
  donorCount: 387,
  givingGrowth: 12.3,
  monthlyTrends: [
    { month: 'Mar', amount: 45200, donorCount: 350, change: 5.2 },
    { month: 'Apr', amount: 47800, donorCount: 365, change: 5.8 },
    { month: 'May', amount: 52300, donorCount: 380, change: 9.4 },
    { month: 'Jun', amount: 49600, donorCount: 375, change: -5.2 },
    { month: 'Jul', amount: 51200, donorCount: 382, change: 3.2 },
    { month: 'Aug', amount: 47350, donorCount: 387, change: -7.5 }
  ],
  donorSegmentation: [
    { segment: 'major_donors', count: 12, totalAmount: 156800, percentage: 27.6 },
    { segment: 'regular_givers', count: 145, totalAmount: 284100, percentage: 50.0 },
    { segment: 'occasional_givers', count: 180, totalAmount: 98500, percentage: 17.3 },
    { segment: 'first_time_givers', count: 50, totalAmount: 28800, percentage: 5.1 }
  ],
  givingMethods: [
    { method: 'Online', amount: 341000, percentage: 60.0 },
    { method: 'Cash', amount: 125300, percentage: 22.1 },
    { method: 'Check', amount: 78600, percentage: 13.8 },
    { method: 'Bank Transfer', amount: 23300, percentage: 4.1 }
  ],
  projectFunding: [
    { 
      projectName: 'New Building Fund', 
      targetAmount: 500000, 
      currentAmount: 285000, 
      donorCount: 156, 
      progressPercentage: 57.0 
    },
    { 
      projectName: 'Missions Support', 
      targetAmount: 75000, 
      currentAmount: 68200, 
      donorCount: 89, 
      progressPercentage: 90.9 
    }
  ]
};

const mockPrayerAnalytics: PrayerAnalytics = {
  totalRequests: 156,
  answeredRequests: 98,
  responseRate: 62.8,
  averageResponseTime: 12.5,
  categoryDistribution: [
    { category: 'Health', count: 45, percentage: 28.8, averageResolutionTime: 18.2 },
    { category: 'Family', count: 32, percentage: 20.5, averageResolutionTime: 15.6 },
    { category: 'Finances', count: 28, percentage: 17.9, averageResolutionTime: 22.1 },
    { category: 'Spiritual', count: 24, percentage: 15.4, averageResolutionTime: 8.3 },
    { category: 'Career', count: 18, percentage: 11.5, averageResolutionTime: 25.7 },
    { category: 'Relationships', count: 9, percentage: 5.8, averageResolutionTime: 12.4 }
  ],
  monthlyTrends: [
    { month: 'Mar', submitted: 42, answered: 28, responseRate: 66.7 },
    { month: 'Apr', submitted: 38, answered: 25, responseRate: 65.8 },
    { month: 'May', submitted: 45, answered: 31, responseRate: 68.9 },
    { month: 'Jun', submitted: 52, answered: 30, responseRate: 57.7 },
    { month: 'Jul', submitted: 39, answered: 26, responseRate: 66.7 },
    { month: 'Aug', submitted: 35, answered: 23, responseRate: 65.7 }
  ],
  testimoniesShared: 42,
  mostActiveRequesters: [
    { memberId: '1', memberName: 'Mary Thompson', requestCount: 8, answeredCount: 6 },
    { memberId: '2', memberName: 'David Wilson', requestCount: 6, answeredCount: 4 },
    { memberId: '3', memberName: 'Lisa Garcia', requestCount: 5, answeredCount: 3 }
  ]
};

const mockMinistryEffectiveness: MinistryEffectivenessAnalytics = {
  overallScore: 92,
  ministryPerformance: [
    {
      ministryId: '1',
      ministryName: 'Youth Ministry',
      score: 95,
      memberGrowth: 18.5,
      engagement: 92,
      goalCompletion: 88,
      budgetEfficiency: 96
    },
    {
      ministryId: '2',
      ministryName: 'Children\'s Ministry',
      score: 91,
      memberGrowth: 12.3,
      engagement: 89,
      goalCompletion: 95,
      budgetEfficiency: 87
    },
    {
      ministryId: '3',
      ministryName: 'Worship Ministry',
      score: 88,
      memberGrowth: 8.7,
      engagement: 94,
      goalCompletion: 82,
      budgetEfficiency: 89
    }
  ],
  leadershipEffectiveness: [
    {
      leaderId: '1',
      leaderName: 'Pastor Johnson',
      ministriesLed: 3,
      averageMinistryScore: 91.3,
      memberSatisfaction: 94,
      goalAchievementRate: 88
    },
    {
      leaderId: '2',
      leaderName: 'Sarah Miller',
      ministriesLed: 2,
      averageMinistryScore: 89.5,
      memberSatisfaction: 92,
      goalAchievementRate: 85
    }
  ],
  resourceAllocation: [
    {
      ministry: 'Youth Ministry',
      budgetUtilization: 94,
      memberToLeaderRatio: 12.5,
      costPerMember: 45.20,
      roi: 3.8
    },
    {
      ministry: 'Children\'s Ministry',
      budgetUtilization: 87,
      memberToLeaderRatio: 15.2,
      costPerMember: 38.50,
      roi: 4.2
    }
  ],
  growthOpportunities: [
    {
      area: 'Digital Engagement',
      priority: 'high',
      potentialImpact: 85,
      requiredInvestment: 15000
    },
    {
      area: 'Small Groups Expansion',
      priority: 'high',
      potentialImpact: 78,
      requiredInvestment: 8500
    }
  ]
};

const periods: AnalyticsPeriod[] = [
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Quarter', value: 'quarter' },
  { label: 'This Year', value: 'year' }
];

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<AnalyticsPeriod>(periods[1]);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Users, DollarSign, Calendar, Activity, Heart, Target, TrendingUp, TrendingDown
    };
    const Icon = icons[iconName] || Activity;
    return <Icon className="w-5 h-5" />;
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: BarChart3 },
    { id: 'engagement', title: 'Member Engagement', icon: Users },
    { id: 'attendance', title: 'Attendance Analytics', icon: Calendar },
    { id: 'giving', title: 'Giving Insights', icon: DollarSign },
    { id: 'prayer', title: 'Prayer Analytics', icon: Heart },
    { id: 'ministry', title: 'Ministry Effectiveness', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <GradientText 
              text="Advanced Analytics Dashboard" 
              className="text-4xl font-bold"
            />
            <p className="text-gray-300 mt-2">
              Comprehensive insights into church growth, engagement, and ministry effectiveness
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Period Selector */}
            <div className="relative">
              <select 
                value={selectedPeriod.value}
                onChange={(e) => {
                  const period = periods.find(p => p.value === e.target.value);
                  if (period) setSelectedPeriod(period);
                }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value} className="bg-gray-800">
                    {period.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Action Buttons */}
            <SpectacularButton
              variant="outline"
              size="md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </SpectacularButton>

            <SpectacularButton
              variant="outline"
              size="md"
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </SpectacularButton>

            <SpectacularButton variant="primary" size="md">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </SpectacularButton>
          </div>
        </div>

        {/* Section Navigation */}
        <GlassCard className="p-6">
          <div className="flex flex-wrap gap-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDashboardMetrics.map(metric => (
                <GlassCard key={metric.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                      {getIconComponent(metric.icon)}
                    </div>
                    {getTrendIcon(metric.changeDirection)}
                  </div>

                  <h3 className="text-sm font-medium text-gray-400 mb-1">{metric.title}</h3>
                  <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
                  
                  <div className="flex items-center gap-1">
                    <span className={`text-sm ${
                      metric.changeDirection === 'up' ? 'text-green-400' : 
                      metric.changeDirection === 'down' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {metric.changeDirection === 'up' ? '+' : metric.changeDirection === 'down' ? '-' : ''}{Math.abs(metric.change)}%
                    </span>
                    <span className="text-sm text-gray-400">vs last period</span>
                  </div>

                  {/* Mini Trend Chart */}
                  {metric.trend && (
                    <div className="mt-4">
                      <div className="flex items-end gap-1 h-8">
                        {metric.trend.map((value, index) => (
                          <div
                            key={index}
                            className={`bg-gradient-to-t ${metric.color} rounded-sm flex-1 opacity-60`}
                            style={{ 
                              height: `${(value / Math.max(...metric.trend)) * 100}%` 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>

            {/* Quick Insights */}
            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Growth Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Member Growth</span>
                    <span className="text-green-400 font-semibold">+8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Giving Increase</span>
                    <span className="text-green-400 font-semibold">+12.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Engagement Score</span>
                    <span className="text-green-400 font-semibold">+3.1%</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  Areas for Attention
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Prayer Requests</span>
                    <span className="text-red-400 font-semibold">-2.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">At-Risk Members</span>
                    <span className="text-yellow-400 font-semibold">23 people</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Volunteer Gaps</span>
                    <span className="text-yellow-400 font-semibold">5 positions</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Member Engagement Section */}
        {activeSection === 'engagement' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Member Engagement Overview
              </h3>

              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">87%</div>
                  <div className="text-sm text-gray-400">Average Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">892</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">23</div>
                  <div className="text-sm text-gray-400">At Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">156</div>
                  <div className="text-sm text-gray-400">Highly Engaged</div>
                </div>
              </div>

              {/* Individual Member Engagement */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Recent Member Activity</h4>
                {mockMemberEngagement.map(member => (
                  <div key={member.memberId} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{member.memberName}</div>
                          <div className="text-sm text-gray-400">
                            Last active: {member.lastActivity.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{member.engagementScore}%</div>
                        <div className={`text-sm ${getRiskColor(member.riskLevel)}`}>
                          {member.riskLevel.toUpperCase()} RISK
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Service Attendance</div>
                        <div className="text-white font-semibold">
                          {member.monthlyActivities[0]?.serviceAttendance || 0}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Ministry Hours</div>
                        <div className="text-white font-semibold">
                          {member.monthlyActivities[0]?.volunteerHours || 0}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Small Group</div>
                        <div className="text-white font-semibold">
                          {member.monthlyActivities[0]?.smallGroupAttendance || 0}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Trend</div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(member.trends.direction)}
                          <span className="text-white font-semibold">
                            {Math.abs(member.trends.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Additional sections will be implemented similarly... */}

        {/* Attendance Analytics Section */}
        {activeSection === 'attendance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  Attendance Trends
                </h3>
                <div className="space-y-4">
                  {mockAttendanceAnalytics.seasonalTrends.map(trend => (
                    <div key={trend.month} className="flex items-center justify-between">
                      <span className="text-gray-300">{trend.month} 2025</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{trend.attendance}</span>
                        <span className={`text-sm ${trend.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {trend.change >= 0 ? '+' : ''}{trend.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Service Comparison
                </h3>
                <div className="space-y-4">
                  {mockAttendanceAnalytics.serviceComparison.map(service => (
                    <div key={service.serviceType} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">{service.serviceType}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{service.averageAttendance}</span>
                          {getTrendIcon(service.trend)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${(service.averageAttendance / 650) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{mockAttendanceAnalytics.averageAttendance}</div>
                  <div className="text-sm text-gray-400">Average Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{mockAttendanceAnalytics.growthRate}%</div>
                  <div className="text-sm text-gray-400">Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{mockAttendanceAnalytics.retentionRate}%</div>
                  <div className="text-sm text-gray-400">Visitor Retention</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Giving Analytics Section */}
        {activeSection === 'giving' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  Giving Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Giving</span>
                    <span className="text-white font-bold text-xl">${mockGivingAnalytics.totalGiving.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Gift</span>
                    <span className="text-white font-semibold">${mockGivingAnalytics.averageGift}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Active Donors</span>
                    <span className="text-white font-semibold">{mockGivingAnalytics.donorCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Growth Rate</span>
                    <span className="text-green-400 font-semibold">+{mockGivingAnalytics.givingGrowth}%</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Donor Segmentation
                </h3>
                <div className="space-y-3">
                  {mockGivingAnalytics.donorSegmentation.map(segment => (
                    <div key={segment.segment} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 capitalize">
                          {segment.segment.replace('_', ' ')}
                        </span>
                        <span className="text-white font-semibold">{segment.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full"
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Project Funding Progress
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {mockGivingAnalytics.projectFunding.map(project => (
                  <div key={project.projectName} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-white">{project.projectName}</h4>
                      <span className="text-sm text-gray-400">{project.donorCount} donors</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        ${project.currentAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                      </span>
                      <span className="text-white font-semibold">{project.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Prayer Analytics Section */}
        {activeSection === 'prayer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-3 gap-6">
              <GlassCard className="p-6 text-center">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{mockPrayerAnalytics.totalRequests}</div>
                <div className="text-sm text-gray-400">Total Requests</div>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{mockPrayerAnalytics.answeredRequests}</div>
                <div className="text-sm text-gray-400">Answered Prayers</div>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{mockPrayerAnalytics.averageResponseTime}</div>
                <div className="text-sm text-gray-400">Avg Response Days</div>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Prayer Categories
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {mockPrayerAnalytics.categoryDistribution.map(category => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{category.category}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">{category.count}</div>
                        <div className="text-sm text-gray-400">{category.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400">
                      Avg resolution: {category.averageResolutionTime} days
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Ministry Effectiveness Section */}
        {activeSection === 'ministry' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Ministry Performance Overview
              </h3>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">{mockMinistryEffectiveness.overallScore}%</div>
                <div className="text-gray-400">Overall Ministry Effectiveness</div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {mockMinistryEffectiveness.ministryPerformance.map(ministry => (
                  <div key={ministry.ministryId} className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">{ministry.ministryName}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Overall Score</span>
                        <span className="text-white font-semibold">{ministry.score}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Member Growth</span>
                        <span className="text-green-400 font-semibold">+{ministry.memberGrowth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Engagement</span>
                        <span className="text-blue-400 font-semibold">{ministry.engagement}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Goals Completed</span>
                        <span className="text-purple-400 font-semibold">{ministry.goalCompletion}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Leadership Effectiveness
                </h3>
                <div className="space-y-4">
                  {mockMinistryEffectiveness.leadershipEffectiveness.map(leader => (
                    <div key={leader.leaderId} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{leader.leaderName}</h4>
                        <span className="text-sm text-gray-400">{leader.ministriesLed} ministries</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Avg Score</div>
                          <div className="text-white font-semibold">{leader.averageMinistryScore}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Goal Rate</div>
                          <div className="text-white font-semibold">{leader.goalAchievementRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Growth Opportunities
                </h3>
                <div className="space-y-4">
                  {mockMinistryEffectiveness.growthOpportunities.map((opportunity, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{opportunity.area}</h4>
                        <span className={`text-sm px-2 py-1 rounded ${
                          opportunity.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          opportunity.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {opportunity.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Impact Score</div>
                          <div className="text-white font-semibold">{opportunity.potentialImpact}/100</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Investment</div>
                          <div className="text-white font-semibold">${opportunity.requiredInvestment.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}}
        
      </div>
    </div>
  );
};
