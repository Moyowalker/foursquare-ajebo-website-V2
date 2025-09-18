import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Play, Monitor, Smartphone, Wifi, Clock, Calendar, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Streaming | Foursquare Gospel Church Ajebo',
  description: 'Join our live worship services online from anywhere in the world. Stream on any device and be part of our global church family.',
  keywords: ['live streaming', 'online church', 'watch live', 'virtual service', 'Foursquare Camp Ajebo'],
};

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-indigo-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Streaming</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Join us online for powerful worship services from anywhere in the world
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Live Stream Status */}
          <div className="text-center mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Currently Live</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-red-600 font-medium">LIVE NOW</span>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Sunday Morning Service - "Walking in God's Purpose"
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Started at 9:00 AM
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  247 viewers
                </div>
              </div>
              <Link 
                href="/streaming" 
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium inline-block"
              >
                Watch Live Now
              </Link>
            </div>
          </div>

          {/* Streaming Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Streaming Schedule</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Sunday Service */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sunday Service</h3>
                </div>
                <div className="space-y-2 text-gray-600 mb-4">
                  <p><strong>Time:</strong> 9:00 AM - 10:30 AM (WAT)</p>
                  <p><strong>Type:</strong> Main worship service</p>
                  <p><strong>Language:</strong> English & Yoruba</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Features sermon, worship, prayer, and special ministry segments
                  </p>
                </div>
              </div>

              {/* Wednesday Bible Study */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Bible Study</h3>
                </div>
                <div className="space-y-2 text-gray-600 mb-4">
                  <p><strong>Time:</strong> 6:00 PM - 7:00 PM (WAT)</p>
                  <p><strong>Type:</strong> Interactive Bible study</p>
                  <p><strong>Language:</strong> English primarily</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    In-depth Bible study with Q&A and discussion segments
                  </p>
                </div>
              </div>

              {/* Special Events */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Special Events</h3>
                </div>
                <div className="space-y-2 text-gray-600 mb-4">
                  <p><strong>Frequency:</strong> As announced</p>
                  <p><strong>Type:</strong> Conferences, revivals</p>
                  <p><strong>Duration:</strong> Varies by event</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-700">
                    Follow our social media for special event streaming announcements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Viewing Options */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Watch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Website</h3>
                <p className="text-gray-600 mb-4">
                  Watch directly on our website with high-quality streaming and interactive features.
                </p>
                <Link 
                  href="/streaming" 
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  Go to Stream Page
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile App</h3>
                <p className="text-gray-600 mb-4">
                  Download our mobile app for convenient streaming on your phone or tablet.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Get App Info
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media</h3>
                <p className="text-gray-600 mb-4">
                  Follow us on Facebook and YouTube for live streams and archived services.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  Follow Us
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Streaming Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Features</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span>High-definition video quality (1080p)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span>Crystal clear audio with professional sound engineering</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span>Multiple camera angles for best viewing experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span>Adaptive streaming for various internet speeds</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span>Mobile-optimized for smartphones and tablets</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Features</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span>Live chat for prayer requests and fellowship</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span>Digital offering and donation capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span>Downloadable sermon notes and resources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span>Service replay available for 30 days</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span>Virtual connect cards for first-time visitors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Global Reach */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connecting Globally</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our live streaming ministry has connected us with believers around the world, 
                creating a global church family that worships together across time zones and continents.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-700 font-medium">Countries Reached</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2000+</div>
                <p className="text-gray-700 font-medium">Online Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-gray-700 font-medium">Weekly Viewers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <p className="text-gray-700 font-medium">Access Available</p>
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimum Requirements</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Internet Speed:</strong> 5 Mbps for HD streaming</p>
                  <p><strong>Device:</strong> Computer, smartphone, tablet, or smart TV</p>
                  <p><strong>Browser:</strong> Chrome, Firefox, Safari, or Edge (latest versions)</p>
                  <p><strong>Audio:</strong> Speakers or headphones for best experience</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Setup</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Internet Speed:</strong> 10+ Mbps for best quality</p>
                  <p><strong>Display:</strong> Large screen or computer monitor</p>
                  <p><strong>Audio:</strong> Quality speakers or sound system</p>
                  <p><strong>Environment:</strong> Quiet space for focused worship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Streaming?</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Our technical support team is available to help you with any streaming issues 
              or questions. Don't let technical difficulties keep you from joining us online!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Get Technical Support
              </Link>
              <Link 
                href="/streaming" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-medium"
              >
                Test Your Connection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}