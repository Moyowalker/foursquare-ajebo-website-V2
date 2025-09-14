"use client";
import { useEffect, useState } from 'react';

export const LiveServiceCounter = () => {
  const [timeUntilService, setTimeUntilService] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [donationProgress, setDonationProgress] = useState(67); // Example: 67% of monthly goal

  useEffect(() => {
    // Mock next service time (Sunday 10 AM)
    const calculateTimeUntilService = () => {
      const now = new Date();
      const nextSunday = new Date();
      const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(10, 0, 0, 0);

      const timeDiff = nextSunday.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setIsLive(true);
        return 'LIVE NOW';
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) return `${days}d ${hours}h`;
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    };

    const updateTimer = () => {
      setTimeUntilService(calculateTimeUntilService());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Live Service Status */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass-divine">
        <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
        <div>
          <p className="text-xs text-slate-300 font-medium">Next Service</p>
          <p className={`text-sm font-bold ${isLive ? 'text-red-400' : 'text-white'}`}>
            {isLive ? 'LIVE NOW' : timeUntilService}
          </p>
        </div>
      </div>

      {/* Donation Progress */}
      <div className="px-4 py-3 rounded-xl glass-divine">
        <p className="text-xs text-slate-300 font-medium mb-1">Monthly Goal</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${donationProgress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-amber-300">{donationProgress}%</span>
        </div>
      </div>
    </div>
  );
};