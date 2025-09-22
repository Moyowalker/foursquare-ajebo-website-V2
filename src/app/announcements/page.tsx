import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ExternalLink, Bell, AlertCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Announcements | Foursquare Camp Ajebo',
  description: 'Stay updated with the latest announcements, events, and important information from Foursquare Camp Ajebo.',
  keywords: ['announcements', 'news', 'updates', 'events', 'church news', 'Foursquare Camp Ajebo'],
};

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      type: 'urgent',
      title: 'Upcoming Youth Camp Registration Open',
      content: 'Registration is now open for our annual Youth Camp 2025. Early bird discount available until October 31st. Limited spaces available!',
      date: '2025-09-20',
      time: '10:00 AM',
      category: 'Events',
      location: 'Foursquare Camp Ajebo',
      actionText: 'Register Now',
      actionLink: '/contact',
      featured: true
    },
    {
      id: 2,
      type: 'info',
      title: 'New Conference Hall Booking System',
      content: 'We have updated our conference hall booking system. Please use the new online form for all future bookings to ensure faster processing.',
      date: '2025-09-18',
      time: '2:00 PM',
      category: 'Facility Updates',
      actionText: 'Learn More',
      actionLink: '/facilities/conference-halls',
      featured: false
    },
    {
      id: 3,
      type: 'important',
      title: 'Accommodation Rate Updates',
      content: 'New accommodation rates effective October 1st, 2025. Church members continue to enjoy 20% discount. Contact reception for details.',
      date: '2025-09-15',
      time: '9:00 AM',
      category: 'Accommodation',
      actionText: 'View Rates',
      actionLink: '/facilities/accommodation',
      featured: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Sports Centre Maintenance Schedule',
      content: 'The sports centre will be closed for maintenance from October 10-12, 2025. Alternative recreation activities will be available.',
      date: '2025-09-14',
      time: '11:30 AM',
      category: 'Facilities',
      location: 'Sports Centre',
      featured: false
    },
    {
      id: 5,
      type: 'general',
      title: 'New Banking Details for Donations',
      content: 'We have updated our donation account information. Please use the new account details available on our giving page for all donations.',
      date: '2025-09-12',
      time: '3:00 PM',
      category: 'Financial',
      actionText: 'View Details',
      actionLink: '/giving/donate',
      featured: false
    },
    {
      id: 6,
      type: 'important',
      title: 'Weekend Retreat Bookings Available',
      content: 'Book your weekend spiritual retreat with special group discounts. Perfect for church groups, families, and personal spiritual growth.',
      date: '2025-09-10',
      time: '1:00 PM',
      category: 'Retreats',
      actionText: 'Book Now',
      actionLink: '/contact',
      featured: true
    }
  ];

  const getAnnouncementStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          border: 'border-l-4 border-red-500',
          bg: 'bg-red-50',
          icon: AlertCircle,
          iconColor: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        };
      case 'important':
        return {
          border: 'border-l-4 border-orange-500',
          bg: 'bg-orange-50',
          icon: Bell,
          iconColor: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-800'
        };
      case 'info':
        return {
          border: 'border-l-4 border-blue-500',
          bg: 'bg-blue-50',
          icon: Info,
          iconColor: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          border: 'border-l-4 border-gray-500',
          bg: 'bg-gray-50',
          icon: Bell,
          iconColor: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredAnnouncements = announcements.filter(announcement => announcement.featured);
  const regularAnnouncements = announcements.filter(announcement => !announcement.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Announcements</h1>
            <p className="text-xl text-blue-100 mb-6">
              Stay updated with the latest news, events, and important information from Foursquare Camp Ajebo
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Last updated: {formatDate('2025-09-20')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Featured Announcements */}
          {featuredAnnouncements.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Bell className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Announcements</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAnnouncements.map((announcement) => {
                  const style = getAnnouncementStyle(announcement.type);
                  const IconComponent = style.icon;
                  
                  return (
                    <div key={announcement.id} className={`bg-white rounded-xl shadow-lg overflow-hidden ${style.border}`}>
                      <div className={`${style.bg} p-4`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                              {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{announcement.category}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {announcement.title}
                        </h3>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {announcement.content}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{formatDate(announcement.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{announcement.time}</span>
                          </div>
                        </div>
                        
                        {announcement.location && (
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{announcement.location}</span>
                          </div>
                        )}
                        
                        {announcement.actionText && announcement.actionLink && (
                          <Link
                            href={announcement.actionLink}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {announcement.actionText}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Announcements */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">All Announcements</h2>
              <div className="text-sm text-gray-500">
                Showing {announcements.length} announcements
              </div>
            </div>

            <div className="space-y-6">
              {regularAnnouncements.map((announcement) => {
                const style = getAnnouncementStyle(announcement.type);
                const IconComponent = style.icon;
                
                return (
                  <div key={announcement.id} className={`bg-white rounded-xl shadow-md p-6 ${style.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                          {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{announcement.category}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(announcement.date)} • {announcement.time}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {announcement.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {announcement.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {announcement.location && (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{announcement.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {announcement.actionText && announcement.actionLink && (
                        <Link
                          href={announcement.actionLink}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {announcement.actionText}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Don't miss important announcements and updates. Contact us to join our notification list 
              and get the latest news directly to your phone or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                📧 Subscribe to Updates
              </Link>
              <Link
                href="https://wa.me/2347036555871"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                💬 WhatsApp Notifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}