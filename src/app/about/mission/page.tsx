import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Heart, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Mission | Foursquare Gospel Church Ajebo',
  description: 'Empowering spiritual growth and community through worship, prayer, and fellowship at Foursquare Gospel Church Ajebo.',
  keywords: ['mission', 'purpose', 'spiritual growth', 'community', 'foursquare ajebo'],
};

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/about" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Empowering spiritual growth and community through worship, prayer, and fellowship
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission Statement</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Empowering spiritual growth and community through worship, prayer, and fellowship.
              </p>
              <p className="text-lg text-gray-600">
                We are committed to building a vibrant spiritual community where every person can encounter 
                God's love, experience meaningful worship, engage in powerful prayer, and find authentic fellowship 
                that nurtures their spiritual journey and personal growth.
              </p>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Salvation</h3>
              <p className="text-gray-600">
                Proclaiming the Gospel and leading people to a personal relationship with Jesus Christ.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sanctification</h3>
              <p className="text-gray-600">
                Helping believers grow in holiness and spiritual maturity through discipleship.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Service</h3>
              <p className="text-gray-600">
                Equipping and empowering believers to serve God and impact their communities.
              </p>
            </div>
          </div>

          {/* Our Calling */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Calling</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Building strong families and communities</li>
                  <li>• Supporting the underprivileged and vulnerable</li>
                  <li>• Promoting education and youth development</li>
                  <li>• Caring for the sick and elderly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Reach</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Planting churches across Nigeria and beyond</li>
                  <li>• Supporting missions and evangelism</li>
                  <li>• Training and sending missionaries</li>
                  <li>• Partnering with global ministries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scripture Foundation */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Foundation</h2>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "Go therefore and make disciples of all nations, baptizing them in the name 
              of the Father and of the Son and of the Holy Spirit, teaching them to observe 
              all that I have commanded you."
            </blockquote>
            <p className="text-gray-600 font-medium">- Matthew 28:19-20</p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Be part of something greater. Discover how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Involved
              </Link>
              <Link 
                href="/about/vision" 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Read Our Vision
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}