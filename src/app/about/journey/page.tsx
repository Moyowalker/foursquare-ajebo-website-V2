import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Building, Award, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Journey | Foursquare Camp Ajebo',
  description: 'See how Foursquare Camp Ajebo grew from open grounds to a full retreat and events campground with lodging, halls, and year-round hosting.',
  keywords: ['camp history', 'journey', 'campground development', 'retreat center', 'Foursquare Camp Ajebo'],
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
            From open grounds to a trusted retreat campground welcoming tens of thousands each year
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Story of Building a Campground</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We began with simple camp meetings and open fields. Over time, we invested in roads, power, water, accommodation, and halls so guests could gather safely and comfortably. Today the campground runs year-round for retreats, conventions, trainings, and family stays.
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
                    <h3 className="text-xl font-bold text-gray-900">Campfire Gatherings</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Early youth and family camp meetings on open grounds with temporary tents and basic lighting, building desire for a dedicated retreat site.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Temporary camp grounds
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
                    <h3 className="text-xl font-bold text-gray-900">Securing the Camp Grounds</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Land was secured and basic infrastructure (access roads, water points, perimeter definition) began so annual conventions could be hosted safely on-site.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Thousands in annual camps
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      First permanent structures
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
                    <h3 className="text-xl font-bold text-gray-900">Infrastructure Build-Out</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Built guest houses, conference halls, dining facilities, and improved utilities to support multiple simultaneous retreats and trainings.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      20k+ annual guests
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Multiple halls and lodging blocks
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
                    <h3 className="text-xl font-bold text-gray-900">Modern Campground & Hybrid Hosting</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Added upgraded lodging, improved roads, signage, reliable backups, and hybrid-ready halls. Annual conventions now welcome over 50,000 guests with coordinated logistics and safety.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      50,000+ guests annually
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Hybrid and in-person ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Campground Today</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <p className="text-gray-700 font-medium">Beds & rooms</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600 mb-2">7+</div>
                <p className="text-gray-700 font-medium">Halls & meeting spaces</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">50000+</div>
                <p className="text-gray-700 font-medium">Convention guests yearly</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-2">24/7</div>
                <p className="text-gray-700 font-medium">Power, water, security</p>
              </div>
            </div>
          </div>

          {/* Our Impact */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How the Campground Serves</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guests & Programs</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Retreats, conferences, and leadership trainings</li>
                  <li>• Youth camps, family camps, and conventions</li>
                  <li>• Hybrid-ready halls for wider audiences</li>
                  <li>• Prayer-friendly, serene environments</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Community & Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Local jobs and vendor partnerships</li>
                  <li>• Dining, recreation, and medical centre access</li>
                  <li>• Grounds upkeep that preserves the environment</li>
                  <li>• Event logistics that keep guests and hosts safe</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership Through the Years */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Leadership Through the Years</h2>
            <p className="text-gray-600 text-center mb-8">
              Over the decades, teams have led campground development, operations, and guest services to keep Ajebo ready for every season of gatherings.
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
              We are adding more accommodation, refreshing halls, improving roads and signage, and investing in sustainable power and water so every future guest enjoys a seamless stay.
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
                Plan your next stay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}