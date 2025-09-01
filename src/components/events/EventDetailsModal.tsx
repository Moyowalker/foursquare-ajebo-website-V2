'use client';

import React, { useState } from 'react';
import { Event } from '@/types/events';
import { eventCategories, formatDate, formatDateRange, formatPrice } from '@/data/events';
import { SpectacularButton, SpectacularCard, GradientText } from '@/components/ui/spectacular';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (event: Event) => void;
}

export function EventDetailsModal({ event, isOpen, onClose, onRegister }: EventDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'register'>('details');

  if (!isOpen || !event) return null;

  const categoryInfo = eventCategories.find(c => c.value === event.category);
  const isRegistrationOpen = new Date() <= event.registrationDeadline && event.status === 'upcoming';
  const spotsRemaining = event.capacity - event.registeredCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl mx-auto">
          <SpectacularCard className="p-0 overflow-hidden">
            {/* Header Image */}
            <div className="relative h-64 bg-gradient-to-br from-foursquare-blue-500 to-foursquare-purple-600">
              <div className="absolute inset-0 bg-black/20" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: categoryInfo?.color }}
                  >
                    {categoryInfo?.label}
                  </span>
                  {event.featured && (
                    <span className="bg-foursquare-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <p className="text-white/90 text-lg">
                  {event.shortDescription}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foursquare-blue-600">
                    {formatPrice(event.price, event.currency)}
                  </div>
                  <div className="text-sm text-gray-600">Price</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-foursquare-purple-600">
                    {formatDateRange(event.startDate, event.endDate)}
                  </div>
                  <div className="text-sm text-gray-600">Date</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-foursquare-orange-600">
                    {spotsRemaining}
                  </div>
                  <div className="text-sm text-gray-600">Spots Left</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-foursquare-red-600">
                    {event.ageGroup.replace('-', ' ')}
                  </div>
                  <div className="text-sm text-gray-600">Age Group</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-foursquare-blue-500 text-foursquare-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'register'
                      ? 'border-foursquare-blue-500 text-foursquare-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Registration
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'details' && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">About This Event</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Schedule */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">📅 Schedule</h4>
                      <div className="space-y-2 text-gray-600">
                        <div>
                          <span className="font-medium">Start:</span> {formatDate(event.startDate)} at {event.startTime}
                        </div>
                        <div>
                          <span className="font-medium">End:</span> {formatDate(event.endDate)} at {event.endTime}
                        </div>
                        <div>
                          <span className="font-medium">Registration Deadline:</span> {formatDate(event.registrationDeadline)}
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">📍 Location</h4>
                      <div className="space-y-2 text-gray-600">
                        <div>{event.venue}</div>
                        <div>{event.location}</div>
                        <div>
                          <span className="font-medium">Capacity:</span> {event.capacity} people
                        </div>
                      </div>
                    </div>

                    {/* What's Included */}
                    {event.included.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">✅ What's Included</h4>
                        <ul className="space-y-1 text-gray-600">
                          {event.included.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-green-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Requirements */}
                    {event.requirements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">📋 Requirements</h4>
                        <ul className="space-y-1 text-gray-600">
                          {event.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-blue-500">•</span>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📞 Contact Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-gray-600">
                        <div><span className="font-medium">Organizer:</span> {event.organizer}</div>
                        <div><span className="font-medium">Contact Person:</span> {event.contact.name}</div>
                        <div><span className="font-medium">Email:</span> 
                          <a href={`mailto:${event.contact.email}`} className="text-foursquare-blue-600 hover:underline ml-1">
                            {event.contact.email}
                          </a>
                        </div>
                        <div><span className="font-medium">Phone:</span> 
                          <a href={`tel:${event.contact.phone}`} className="text-foursquare-blue-600 hover:underline ml-1">
                            {event.contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📄 Cancellation Policy</h4>
                    <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
                      {event.cancellationPolicy}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'register' && (
                <div className="space-y-6">
                  {isRegistrationOpen ? (
                    <>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          Ready to Register?
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Join {event.registeredCount} others who have already registered for this amazing event!
                        </p>
                        
                        {/* Registration Stats */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                          <div className="flex justify-center items-center gap-8">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-foursquare-blue-600">
                                {event.registeredCount}
                              </div>
                              <div className="text-sm text-gray-600">Registered</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-foursquare-orange-600">
                                {spotsRemaining}
                              </div>
                              <div className="text-sm text-gray-600">Available</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-foursquare-purple-600">
                                {Math.round((event.registeredCount / event.capacity) * 100)}%
                              </div>
                              <div className="text-sm text-gray-600">Full</div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-foursquare-blue-500 to-foursquare-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <SpectacularButton
                          variant="foursquare-blue"
                          size="lg"
                          onClick={() => onRegister?.(event)}
                          className="px-12"
                        >
                          Register Now - {formatPrice(event.price, event.currency)}
                        </SpectacularButton>
                        
                        <p className="text-sm text-gray-500 mt-4">
                          Registration deadline: {formatDate(event.registrationDeadline)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🚫</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Registration Closed
                      </h3>
                      <p className="text-gray-500">
                        {event.status === 'full' 
                          ? 'This event is fully booked.'
                          : event.status === 'completed'
                          ? 'This event has already taken place.'
                          : 'Registration deadline has passed.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                <SpectacularButton
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </SpectacularButton>
                
                {isRegistrationOpen && activeTab === 'details' && (
                  <SpectacularButton
                    variant="foursquare-blue"
                    onClick={() => setActiveTab('register')}
                    className="flex-1"
                  >
                    Register for Event
                  </SpectacularButton>
                )}
                
                <SpectacularButton
                  variant="ghost"
                  onClick={() => {
                    const subject = encodeURIComponent(`Inquiry about ${event.title}`);
                    const body = encodeURIComponent(`Hi,\n\nI'm interested in learning more about the ${event.title} event scheduled for ${formatDate(event.startDate)}.\n\nBest regards`);
                    window.open(`mailto:${event.contact.email}?subject=${subject}&body=${body}`);
                  }}
                  className="flex-1"
                >
                  Contact Organizer
                </SpectacularButton>
              </div>
            </div>
          </SpectacularCard>
        </div>
      </div>
    </div>
  );
}
