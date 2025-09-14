"use client";
import React, { useEffect, useState } from 'react';
import { useStreamingSocket } from '@/services/streamingSocket';
import { givingGoals } from '@/data/donations';

interface RealTimeStatsProps {
  streamId?: string;
  showDonationProgress?: boolean;
}

interface ServiceTime {
  day: number; // 0 Sunday ... 6 Saturday
  hour: number; // 24h
  minute: number;
  durationMinutes: number;
  label: string;
}

interface ServiceWindow {
  start: Date;
  end: Date;
  service: ServiceTime;
}

const SERVICE_SCHEDULE: ServiceTime[] = [
  { day: 0, hour: 9, minute: 0, durationMinutes: 150, label: 'Sunday Worship' }, // 9:00 - 11:30
  { day: 3, hour: 18, minute: 0, durationMinutes: 120, label: 'Midweek Service' }, // Wednesday 6pm - 8pm
];

const formatDuration = (ms: number) => {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const getNextService = (now: Date = new Date()): ServiceWindow | null => {
  let soonest: ServiceWindow | null = null;
  for (let i = 0; i < 14; i++) { // look ahead two weeks
    const probe = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const day = probe.getDay();
    SERVICE_SCHEDULE.filter(s => s.day === day).forEach(service => {
      const start = new Date(probe);
      start.setHours(service.hour, service.minute, 0, 0);
      const end = new Date(start.getTime() + service.durationMinutes * 60000);
      if (end < now) return; // past
      if (!soonest || start < soonest.start) {
        soonest = { start, end, service };
      }
    });
  }
  return soonest;
};

export const RealTimeStats: React.FC<RealTimeStatsProps> = ({ streamId = 'main', showDonationProgress = true }) => {
  const { viewerCount, isConnected } = useStreamingSocket(streamId);
  const [now, setNow] = useState<Date>(new Date());
  const [countDisplay, setCountDisplay] = useState(0);

  // Donation goal (choose the first featured goal with target/current)
  const donationGoal = givingGoals.find(g => g.target_amount && g.current_amount) || givingGoals[0];
  const donationPercent = donationGoal ? Math.min(100, (donationGoal.current_amount / donationGoal.target_amount) * 100) : 0;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth viewer count animation
  useEffect(() => {
    const diff = viewerCount - countDisplay;
    if (diff === 0) return;
    const step = diff / Math.max(8, Math.abs(diff));
    const raf = requestAnimationFrame(() => {
      setCountDisplay(prev => prev + step);
    });
    return () => cancelAnimationFrame(raf);
  }, [viewerCount, countDisplay]);

  // Determine current / next service status
  const serviceInfo = getNextService(now);
  let serviceStatus: 'live' | 'upcoming' | 'idle' = 'idle';
  let countdown = '';
  let statusLabel = 'No Upcoming Service';

  if (serviceInfo) {
    const { start: startTime, end: endTime, service: svc } = serviceInfo;
    if (now >= startTime && now <= endTime) {
      serviceStatus = 'live';
      statusLabel = `${svc.label} Live`;
      countdown = formatDuration(endTime.getTime() - now.getTime());
    } else if (now < startTime) {
      serviceStatus = 'upcoming';
      statusLabel = svc.label;
      countdown = formatDuration(startTime.getTime() - now.getTime());
    }
  }

  return (
    <div
      role="region"
      aria-label="Real time ministry statistics"
      className="relative w-full max-w-6xl mx-auto rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 px-6 sm:px-10 py-5 flex flex-col md:flex-row gap-6 md:items-center md:justify-between shadow-[0_8px_40px_-10px_rgba(0,0,0,0.4)]"
    >
      {/* Live / Upcoming Service */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <div
          className={`relative w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold tracking-wide shadow-inner border ${
            serviceStatus === 'live'
              ? 'bg-red-600/90 border-red-300/30 text-white animate-pulse'
              : serviceStatus === 'upcoming'
              ? 'bg-amber-500/80 border-amber-300/30 text-slate-900'
              : 'bg-slate-600/40 border-slate-400/20 text-slate-100'
          }`}
          aria-label={serviceStatus === 'live' ? 'Service is live' : serviceStatus === 'upcoming' ? 'Upcoming service' : 'No service in progress'}
        >
          {serviceStatus === 'live' ? 'LIVE' : serviceStatus === 'upcoming' ? 'NEXT' : 'IDLE'}
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-slate-200/80">Service</span>
          <span className="text-sm font-semibold text-white/90 leading-tight">{statusLabel}</span>
          {countdown && (
            <span className="text-[11px] mt-0.5 font-mono text-amber-200/90 tracking-widest">
              {serviceStatus === 'live' ? 'Ends in ' : 'Starts in '}{countdown}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" aria-hidden />

      {/* Viewer Count */}
      <div className="flex items-center gap-4 min-w-[170px]">
        <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/20 border border-blue-300/30 text-blue-100 font-semibold shadow-inner">
          <span className="text-lg">👥</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-slate-200/70">Live Viewers</span>
          <span className="text-xl font-bold text-white tabular-nums drop-shadow">
            {Math.max(0, Math.round(countDisplay))}
          </span>
          <span className="text-[11px] font-medium tracking-wide text-blue-200/70">{isConnected ? 'Connected' : 'Connecting...'}</span>
        </div>
      </div>

      {/* Divider */}
      {showDonationProgress && (
        <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" aria-hidden />
      )}

      {/* Donation Progress */}
      {showDonationProgress && donationGoal && (
        <div className="flex items-center gap-4 grow min-w-[240px]">
          <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center bg-purple-500/20 border border-purple-300/30 text-purple-100 font-semibold shadow-inner">
            <span className="text-lg">💝</span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-xs uppercase tracking-wider text-slate-200/70">{donationGoal.title}</span>
            <div className="flex items-end gap-2">
              <span className="text-sm font-semibold text-white/90 leading-none">{donationPercent.toFixed(1)}%</span>
              <span className="text-[11px] text-purple-200/70 leading-none">funded</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 shadow-[0_0_12px_-2px_rgba(192,132,252,0.8)] transition-[width] duration-700 ease-out"
                style={{ width: `${donationPercent}%` }}
                aria-label={`Donation progress ${donationPercent.toFixed(1)} percent`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Decorative subtle glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-40" aria-hidden />
    </div>
  );
};

export default RealTimeStats;
