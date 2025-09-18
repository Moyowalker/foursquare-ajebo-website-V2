import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Music, Heart, Users, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Worship Services | Foursquare Gospel Church Ajebo',
  description: 'Join us for uplifting worship services every Sunday and throughout the week. Experience powerful praise, biblical teaching, and fellowship.',
  keywords: ['worship', 'services', 'sunday service', 'praise', 'music', 'Foursquare Camp Ajebo'],
};

export default function WorshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Worship Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Come and worship with us as we celebrate God's goodness together
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Service Schedule */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Schedule</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Join us every week for inspiring worship, biblical teaching, and meaningful fellowship. 
              All are welcome regardless of background or experience.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sunday Service */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sunday Service</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">9:00 AM</p>
                <p className="text-gray-600 mb-4">
                  Our main worship service featuring praise, worship, biblical teaching, and communion.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 mr-2" />
                    All ages welcome
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    90 minutes
                  </div>
                </div>
              </div>

              {/* Wednesday Bible Study */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bible Study</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">6:00 PM</p>
                <p className="text-gray-600 mb-4">
                  Midweek Bible study and prayer meeting for deeper spiritual growth and fellowship.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Wednesdays
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    60 minutes
                  </div>
                </div>
              </div>

              {/* Friday Night Vigil */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Night Vigil</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">10:00 PM</p>
                <p className="text-gray-600 mb-4">
                  Monthly all-night prayer and worship vigil for breakthrough and spiritual warfare.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    First Friday monthly
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    All night
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Music className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Worship & Praise</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Experience uplifting contemporary and traditional worship music led by our 
                  talented worship team. Sing along to familiar hymns and modern praise songs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Contemporary and traditional music</li>
                  <li>• Live worship band and choir</li>
                  <li>• Congregational singing</li>
                  <li>• Special musical presentations</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Biblical Teaching</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Receive practical, life-changing messages from God's Word delivered with 
                  clarity and relevance for modern living.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expository Bible preaching</li>
                  <li>• Practical life application</li>
                  <li>• Relevant to current issues</li>
                  <li>• Easy to understand</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Fellowship</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Connect with a warm, welcoming community of believers who will support 
                  you on your spiritual journey.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Friendly, welcoming atmosphere</li>
                  <li>• Post-service fellowship</li>
                  <li>• Opportunity to meet new people</li>
                  <li>• Connection with life groups</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Prayer & Ministry</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Receive prayer and ministry for personal needs, healing, and spiritual 
                  breakthrough in a supportive environment.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personal prayer ministry</li>
                  <li>• Altar calls for salvation</li>
                  <li>• Healing and breakthrough prayer</li>
                  <li>• Counseling and support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Services */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Special Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easter Celebration</h3>
                <p className="text-sm text-gray-600">
                  Special Easter services celebrating the resurrection of Jesus Christ
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Christmas Services</h3>
                <p className="text-sm text-gray-600">
                  Festive Christmas services with special music and celebration
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Baptism Services</h3>
                <p className="text-sm text-gray-600">
                  Special baptism services for new believers and dedications
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Revival Meetings</h3>
                <p className="text-sm text-gray-600">
                  Special revival and evangelistic crusades throughout the year
                </p>
              </div>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Location & Directions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Find Us</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Address:</strong> Foursquare Gospel Church, Ajebo, Ogun State, Nigeria</p>
                  <p><strong>Landmarks:</strong> Near Ajebo Market, opposite the Primary School</p>
                  <p><strong>Public Transport:</strong> Regular buses and taxis available to Ajebo</p>
                  <p><strong>Parking:</strong> Free parking available on church premises</p>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Service Times</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Sunday Service:</strong> 9:00 AM - 10:30 AM</p>
                  <p><strong>Wednesday Bible Study:</strong> 6:00 PM - 7:00 PM</p>
                  <p><strong>Friday Vigil:</strong> 10:00 PM - 5:00 AM (First Friday monthly)</p>
                  <p><strong>Doors Open:</strong> 30 minutes before each service</p>
                </div>
              </div>
            </div>
          </div>

          {/* First Time Visitors */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">First Time Visitor?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We'd love to welcome you to our church family! Here are a few things to know 
              for your first visit to make you feel comfortable and at home.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">What to Wear</h3>
                <p className="text-sm text-blue-100">
                  Come as you are! Dress comfortably - casual or formal, whatever makes you feel comfortable.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What to Bring</h3>
                <p className="text-sm text-blue-100">
                  Just yourself! We provide Bibles, bulletins, and everything you need for the service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What to Expect</h3>
                <p className="text-sm text-blue-100">
                  A warm welcome, inspiring music, practical teaching, and genuine fellowship.
                </p>
              </div>
            </div>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium inline-block"
            >
              Plan Your Visit
            </Link>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Us This Sunday</h2>
            <p className="text-gray-600 mb-6">
              Experience the joy of worship and fellowship in our vibrant church community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/streaming" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Watch Online
              </Link>
              <Link 
                href="/contact" 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}