import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Gift, Baby, Briefcase, Heart, Mic, Globe, Book } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Ministry Programs | Foursquare Gospel Church Ajebo',
  description: 'Discover upcoming events, camps, retreats, and ministry programs designed for spiritual growth and community impact.',
  keywords: ['events', 'ministry programs', 'retreats', 'church activities', 'community', 'Foursquare Camp Ajebo'],
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Ministry Programs</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Join our events, camps, retreats, and ministry programs designed to help you grow and serve.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Upcoming Events */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Don't miss these exciting upcoming events! Mark your calendar and join us 
              for powerful times of worship, learning, and fellowship.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Annual Conference */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Annual Conference 2024</h3>
                  <p className="text-gray-600 mb-4">
                    "Walking in Divine Purpose" - Three days of powerful ministry, worship, and fellowship.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Dec 15-17, 2024
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      6:00 PM - 10:00 PM daily
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Main Auditorium
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">
                      <strong>Special Guest:</strong> Rev. Dr. Emmanuel Adebayo
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Register Now
                  </Link>
                </div>
              </div>

              {/* Youth Conference */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      Youth
                    </span>
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Youth Fire Conference</h3>
                  <p className="text-gray-600 mb-4">
                    "Ignite Your Generation" - Special conference for young people ages 13-30.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Jan 20-21, 2025
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      4:00 PM - 8:00 PM
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Youth ages 13-30
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-green-700">
                      <strong>Activities:</strong> Worship, Games, Ministry
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Join Youth Event
                  </Link>
                </div>
              </div>

              {/* Women's Conference */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      Women
                    </span>
                    <Gift className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Women of Virtue Conference</h3>
                  <p className="text-gray-600 mb-4">
                    "Beautiful in His Time" - Empowering women to walk in their divine calling.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Feb 14-15, 2025
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      10:00 AM - 4:00 PM
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      All women welcome
                    </div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-pink-700">
                      <strong>Includes:</strong> Lunch, Gifts, Ministry
                    </p>
                  </div>
                  <Link 
                    href="/contact" 
                    className="block text-center bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    Register Today
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Event Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Types of Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Conferences</h3>
                <p className="text-gray-600 text-sm">
                  Annual and special conferences with renowned speakers and powerful ministry.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Revivals</h3>
                <p className="text-gray-600 text-sm">
                  Spirit-filled revival meetings for spiritual renewal and breakthrough.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Celebrations</h3>
                <p className="text-gray-600 text-sm">
                  Holiday celebrations, church anniversaries, and special milestone events.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
                <p className="text-gray-600 text-sm">
                  Educational workshops and seminars for personal and spiritual development.
                </p>
              </div>
            </div>
          </div>

          {/* Annual Event Calendar */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Annual Event Calendar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">January - March</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• New Year Covenant Service</li>
                  <li>• Youth Fire Conference</li>
                  <li>• Women's Conference</li>
                  <li>• Easter Celebration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">April - June</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Children's Day Celebration</li>
                  <li>• Father's Day Service</li>
                  <li>• Marriage Enrichment Seminar</li>
                  <li>• Mid-year Revival</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">July - September</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Summer Youth Camp</li>
                  <li>• Leadership Conference</li>
                  <li>• Back to School Blessing</li>
                  <li>• Harvest Thanksgiving</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">October - December</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Church Anniversary</li>
                  <li>• Annual Conference</li>
                  <li>• Christmas Celebration</li>
                  <li>• Year-end Thanksgiving</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Features */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Event Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">World-Class Speakers</h3>
                </div>
                <p className="text-gray-600">
                  Our events feature renowned speakers, pastors, and ministry leaders 
                  from across Nigeria and beyond, bringing fresh insights and powerful ministry.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Fellowship & Networking</h3>
                </div>
                <p className="text-gray-600">
                  Connect with like-minded believers, build lasting friendships, and expand 
                  your spiritual network through our carefully planned fellowship activities.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Gift className="w-6 h-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Life-Changing Ministry</h3>
                </div>
                <p className="text-gray-600">
                  Experience powerful worship, healing ministry, prophetic words, and 
                  breakthrough moments that will transform your spiritual journey.
                </p>
              </div>
            </div>
          </div>

          {/* Event Guidelines */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Event Guidelines</h2>
                      {/* Ministry Programs Overview */}
                      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ministry Programs</h2>
                        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                          Find your place to serve, grow, and build community through our ministry departments.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Baby className="w-7 h-7 text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Children's Ministry</h3>
                            <p className="text-sm text-gray-600">Nurturing young hearts through age-appropriate teaching.</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Users className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Youth Ministry</h3>
                            <p className="text-sm text-gray-600">Empowering young people to live boldly for Christ.</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Briefcase className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Young Adults</h3>
                            <p className="text-sm text-gray-600">Support for career, relationships, and spiritual growth.</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Heart className="w-7 h-7 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Women's Ministry</h3>
                            <p className="text-sm text-gray-600">Empowering women to walk in purpose together.</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Users className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Men's Ministry</h3>
                            <p className="text-sm text-gray-600">Building men who lead with integrity and faith.</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-6 text-center">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Mic className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Worship & Media</h3>
                            <p className="text-sm text-gray-600">Serve through music, media, and creative support.</p>
                          </div>
                        </div>
                      </div>

                      {/* Ministry Leadership */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Serve & Lead</h2>
                        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                          We provide mentorship, training, and leadership development for ministry teams.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-white rounded-lg p-6 text-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                              <Book className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Leadership Training</h3>
                            <p className="text-sm text-gray-600">Training programs for emerging leaders.</p>
                          </div>
                          <div className="bg-white rounded-lg p-6 text-center">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                              <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Mentorship</h3>
                            <p className="text-sm text-gray-600">Guidance from experienced ministry leaders.</p>
                          </div>
                          <div className="bg-white rounded-lg p-6 text-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                              <Heart className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Ministry Development</h3>
                            <p className="text-sm text-gray-600">Support for new and growing ministry teams.</p>
                          </div>
                        </div>
                      </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration & Attendance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Early registration recommended for all events</li>
                  <li>• Some events may have limited seating</li>
                  <li>• Registration confirmation will be sent via email</li>
                  <li>• Walk-ins welcome where space permits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional event organization and management</li>
                  <li>• Quality sound and visual equipment</li>
                  <li>• Refreshments and meals for multi-day events</li>
                  <li>• Childcare available for selected events</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Events */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated on Events & Programs</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Reach out to join upcoming events, retreats, or ministry teams. We would love to help you get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                Contact for Events
              </Link>
              <Link 
                href="/giving" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-medium"
              >
                Support Our Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}