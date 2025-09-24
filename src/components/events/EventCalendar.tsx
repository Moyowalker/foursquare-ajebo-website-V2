'use client';

import React, { useState, useMemo } from 'react';
import { Event, EventCategory, CalendarEvent } from '@/types/events';
import { mockEvents, eventCategories } from '@/data/events';
import { SpectacularButton, SpectacularCard, GradientText } from '@/components/ui/spectacular';

interface EventCalendarProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
  showFilters?: boolean;
  className?: string;
}

function EventCalendar({ 
  events = mockEvents, 
  onEventClick, 
  showFilters = true,
  className = '' 
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');

  // Calculate calendar data
  const { calendarDays, monthEvents } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and last day
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Generate calendar grid
    const days = [];
    
    // Add previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - i - 1);
      days.push(date);
    }
    
    // Add current month's days
    for (let date = 1; date <= lastDayOfMonth.getDate(); date++) {
      days.push(new Date(year, month, date));
    }
    
    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let date = 1; date <= remainingDays; date++) {
      days.push(new Date(year, month + 1, date));
    }

    // Filter events for the current month
    const filteredEvents = events.filter(event => {
      const eventMonth = event.startDate.getMonth();
      const eventYear = event.startDate.getFullYear();
      const matchesMonth = eventMonth === month && eventYear === year;
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(event.category);
      return matchesMonth && matchesCategory;
    });

    return { calendarDays: days, monthEvents: filteredEvents };
  }, [currentDate, events, selectedCategories]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return monthEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  // Category filter toggle
  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  if (viewMode === 'list') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Header with view controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <GradientText className="text-3xl font-bold">
              Event Calendar
            </GradientText>
            <p className="text-gray-600 mt-2">
              {formatMonthYear(currentDate)} • {monthEvents.length} events
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <SpectacularButton
              variant={viewMode === 'month' ? 'foursquare-blue' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </SpectacularButton>
            <SpectacularButton
              variant={viewMode === 'list' ? 'foursquare-blue' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </SpectacularButton>
          </div>
        </div>

        {/* Category filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {eventCategories.map(category => (
              <button
                key={category.value}
                onClick={() => toggleCategory(category.value as EventCategory)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(category.value as EventCategory)
                    ? 'text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategories.includes(category.value as EventCategory) 
                    ? category.color 
                    : undefined
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Event list */}
        <div className="space-y-4">
          {monthEvents.length > 0 ? (
            monthEvents.map(event => (
              <SpectacularCard 
                key={event.id}
                className="p-6 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-foursquare-blue-500 to-foursquare-purple-500 rounded-xl flex flex-col items-center justify-center text-white">
                      <div className="text-xs font-medium">
                        {event.startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-lg font-bold">
                        {event.startDate.getDate()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {event.shortDescription}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>📅</span>
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📍</span>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>👥</span>
                            {event.registeredCount}/{event.capacity} registered
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-foursquare-blue-600">
                          {event.price === 0 ? 'Free' : `₦${event.price.toLocaleString()}`}
                        </div>
                        <span 
                          className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: eventCategories.find(c => c.value === event.category)?.color }}
                        >
                          {eventCategories.find(c => c.value === event.category)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpectacularCard>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">
                {selectedCategories.length > 0 
                  ? 'Try adjusting your filters or check other months.' 
                  : 'No events scheduled for this month.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <GradientText className="text-3xl font-bold">
            Event Calendar
          </GradientText>
          <p className="text-gray-600 mt-2">
            {monthEvents.length} events in {formatMonthYear(currentDate)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <SpectacularButton
            variant={viewMode === 'month' ? 'foursquare-blue' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </SpectacularButton>
          <SpectacularButton
            variant={viewMode === 'list' ? 'foursquare-blue' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </SpectacularButton>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SpectacularButton
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            ← Previous
          </SpectacularButton>
          <SpectacularButton
            variant="ghost"
            size="sm"
            onClick={navigateToToday}
          >
            Today
          </SpectacularButton>
          <SpectacularButton
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            Next →
          </SpectacularButton>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {formatMonthYear(currentDate)}
        </h2>
      </div>

      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {eventCategories.map(category => (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value as EventCategory)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategories.includes(category.value as EventCategory)
                  ? 'text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategories.includes(category.value as EventCategory) 
                  ? category.color 
                  : undefined
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Calendar Grid */}
      <SpectacularCard className="p-6">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-100 rounded-lg transition-colors duration-200 ${
                  isCurrentMonthDay 
                    ? 'bg-white hover:bg-gray-50' 
                    : 'bg-gray-50 text-gray-400'
                } ${isTodayDate ? 'ring-2 ring-foursquare-blue-500 bg-foursquare-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDate ? 'text-foursquare-blue-700' : 
                  isCurrentMonthDay ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </div>
                
                {/* Event indicators */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                      style={{ 
                        backgroundColor: eventCategories.find(c => c.value === event.category)?.color + '20',
                        color: eventCategories.find(c => c.value === event.category)?.color,
                        borderLeft: `3px solid ${eventCategories.find(c => c.value === event.category)?.color}`
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SpectacularCard>
    </div>
  );
}

export default EventCalendar;
export { EventCalendar };
