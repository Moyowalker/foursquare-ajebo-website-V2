'use client';

import React, { useState, useMemo } from 'react';
import { Event, EventCategory, CalendarEvent } from '@/types/events';
import { mockEvents, eventCategories } from '@/data/events';

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
            <h2 className="text-3xl font-semibold text-stone-900">Event Calendar</h2>
            <p className="text-stone-600 mt-2">
              {formatMonthYear(currentDate)} • {monthEvents.length} events
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'month'
                  ? 'bg-emerald-700 text-white'
                  : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-emerald-700 text-white'
                  : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              List
            </button>
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
                    ? 'text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
              <div
                key={event.id}
                className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-xl flex flex-col items-center justify-center text-white">
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
                        <h3 className="text-xl font-semibold text-stone-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-stone-600 mb-3">
                          {event.shortDescription}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-stone-500">
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
                        <div className="text-lg font-bold text-emerald-700">
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
              </div>
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
          <h2 className="text-3xl font-semibold text-stone-900">Event Calendar</h2>
          <p className="text-stone-600 mt-2">
            {monthEvents.length} events in {formatMonthYear(currentDate)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              viewMode === 'month'
                ? 'bg-emerald-700 text-white'
                : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              viewMode === 'list'
                ? 'bg-emerald-700 text-white'
                : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={navigateToToday}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => navigateMonth('next')}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Next →
          </button>
        </div>
        
        <h2 className="text-2xl font-semibold text-stone-800">
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
                  ? 'text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
      <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-stone-600 py-2">
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
                className={`min-h-[100px] p-2 border border-stone-100 rounded-lg transition-colors duration-200 ${
                  isCurrentMonthDay 
                    ? 'bg-white hover:bg-stone-50' 
                    : 'bg-stone-50 text-stone-400'
                } ${isTodayDate ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDate ? 'text-emerald-700' : 
                  isCurrentMonthDay ? 'text-stone-800' : 'text-stone-400'
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
                    <div className="text-xs text-stone-500 text-center">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
export { EventCalendar };
