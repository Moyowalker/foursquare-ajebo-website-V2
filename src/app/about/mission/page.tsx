import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Heart, Users, Globe, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Mission | Foursquare Camp Ajebo',
  description: 'Our mission is to host restful retreats and impactful gatherings with safe facilities, attentive hospitality, and spiritual support at Foursquare Camp Ajebo.',
  keywords: ['mission', 'camp mission', 'retreat hosting', 'hospitality', 'Foursquare Camp Ajebo'],
};

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/about" 
            className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Host every guest and program with safety, serenity, and attentive hospitality so retreats and gatherings thrive.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission Statement</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Provide a reliable retreat campus where guests can rest, connect, and encounter God through well-run facilities, caring teams, and secure grounds.
              </p>
              <p className="text-lg text-gray-600">
                We ensure accommodation, halls, and on-site services work seamlessly so ministries, churches, families, and organizations can focus on their purpose while we handle the environment, safety, and hospitality.
              </p>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hospitality</h3>
              <p className="text-gray-600">
                Warm, attentive hosting that helps every guest feel welcomed, cared for, and ready to focus on their retreat purpose.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety & Reliability</h3>
              <p className="text-gray-600">
                Secure grounds, dependable utilities, and prepared teams so programs run smoothly day and night.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Supportive Service</h3>
              <p className="text-gray-600">
                Coordinated booking, setup, and on-site support for retreats, conferences, camps, and family stays.
              </p>
            </div>
          </div>

          {/* Our Calling */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Calling</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Providing safe, serene lodging for nearby churches and families</li>
                  <li>• Hosting trainings, conferences, and community programs</li>
                  <li>• Offering recreation and dining that keeps groups on-site</li>
                  <li>• Maintaining grounds that encourage rest and reflection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Broader Reach</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Welcoming national conventions and international guests</li>
                  <li>• Enabling hybrid and in-person events with reliable halls</li>
                  <li>• Partnering with ministries to deliver impactful retreats</li>
                  <li>• Sharing best practices for safe, guest-ready campuses</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scripture Foundation */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Foundation</h2>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "Offer hospitality to one another without grumbling. Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace."
            </blockquote>
            <p className="text-gray-600 font-medium">- 1 Peter 4:9-10</p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan with Our Team</h2>
            <p className="text-gray-600 mb-6">
              Tell us your dates and goals. We will pair you with the right rooms, halls, and on-site services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start a booking
              </Link>
              <Link 
                href="/about/vision" 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                See our vision
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}