import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Building, Award, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Journey | Foursquare Gospel Church Ajebo',
  description: 'Discover the inspiring story of our church journey from humble beginnings to a thriving community impacting lives across Nigeria.',
  keywords: ['history', 'journey', 'story', 'growth', 'milestones', 'Foursquare Camp Ajebo'],
};

export default function JourneyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Celebrating 70 years of faithful ministry and community impact across Nigeria
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Story of Faith and Growth</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our journey began with a simple vision: to create a place where people could 
              experience God's love, grow in their faith, and make a positive impact in their 
              community. Today, we celebrate seven decades of God's faithfulness, millions of 
              lives transformed, and the vibrant legacy that continues to grow.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Milestones</h2>
            
            {/* Early Years */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                      1990s
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">The Beginning</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Started as a small fellowship group meeting in homes, with a handful of 
                    committed believers sharing the vision of establishing a strong Foursquare 
                    presence in the Ajebo community.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Home fellowship meetings
                  </div>
                </div>
              </div>
            </div>

            {/* Establishment */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                      Early 2000s
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">First Church Building</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Acquired our first church property and constructed a modest building that 
                    could accommodate our growing congregation. This marked the beginning of 
                    our formal ministry in the Ajebo community.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      50+ regular members
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      First dedicated building
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Phase */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="bg-slate-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                      2010s
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">Rapid Growth & Expansion</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Experienced significant growth in membership and ministry impact. Launched 
                    multiple ministries including youth programs, women's fellowship, men's 
                    ministry, and community outreach initiatives.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      500+ active members
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      10+ active ministries
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Era */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                      2020s
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">Digital Innovation & Modern Ministry</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Embraced digital ministry during the pandemic, launched online services, 
                    and developed modern facilities. Recently celebrated our 70th anniversary 
                    convention as more than 50,000 annual guests gather and millions are reached 
                    through hybrid experiences.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Millions reached worldwide
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      50,000+ annual guests
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,000,000+</div>
                <p className="text-gray-700 font-medium">Lives Transformed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600 mb-2">50+</div>
                <p className="text-gray-700 font-medium">Years of Ministry Legacy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">50000+</div>
                <p className="text-gray-700 font-medium">Annual Guests Welcomed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-2">25+</div>
                <p className="text-gray-700 font-medium">Community Programs</p>
              </div>
            </div>
          </div>

          {/* Our Impact */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Community Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spiritual Impact</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Millions of people brought to faith in Christ</li>
                  <li>• Hundreds of baptisms and dedications</li>
                  <li>• Strong discipleship and leadership development</li>
                  <li>• Active prayer and worship community</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Impact</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Educational scholarships and support</li>
                  <li>• Healthcare and wellness programs</li>
                  <li>• Annual conventions welcoming 50,000+ guests</li>
                  <li>• Community development initiatives</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership Through the Years */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Leadership Through the Years</h2>
            <p className="text-gray-600 text-center mb-8">
              For seventy years, our church has been blessed with dedicated pastoral leadership 
              that has guided us through seasons of growth, challenges, and triumph. Each leader 
              has brought unique gifts and vision that have shaped who we are today.
            </p>
            <div className="text-center">
              <Link 
                href="/board" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Meet Our Current Leadership Team
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Looking Forward */}
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Fresh from our 70th anniversary convention, we are excited about the opportunities ahead. 
              We are planning new facilities, expanding our community outreach, 
              and preparing for the next chapter of our journey together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about/vision" 
                className="bg-white text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                Our Vision
              </Link>
              <Link 
                href="/contact" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-slate-800 transition-colors font-medium"
              >
                Be Part of Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}