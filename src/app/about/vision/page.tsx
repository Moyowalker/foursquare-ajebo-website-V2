import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Eye, Target, Star, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Vision | Foursquare Camp Ajebo',
  description: 'We envision Foursquare Camp Ajebo as Nigeria’s most trusted retreat and events campus—serene, secure, and fully equipped for gatherings of all sizes.',
  keywords: ['vision', 'camp vision', 'retreat campus', 'events campus', 'Foursquare Camp Ajebo'],
};

export default function VisionPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vision</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            A premier retreat and events campus where guests feel safe, rested, and ready for impactful gatherings.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Vision Statement */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision Statement</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Become the most trusted destination for retreats, conventions, trainings, and family stays—offering serene grounds, dependable infrastructure, and thoughtful hospitality.
              </p>
              <p className="text-lg text-gray-600">
                We see a campus where ministries, organizations, and families gather with confidence, knowing the halls, lodging, power, water, and support teams are ready so they can focus on their purpose.
              </p>
            </div>
          </div>

          {/* Vision Pillars */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Guest-Centered Hosting</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Every stay and event feels guided, peaceful, and ready—rooms, halls, dining, and support aligned to each program.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Thoughtful room blocks and hall setup</li>
                <li>• Clear arrival, parking, and wayfinding</li>
                <li>• On-call support during events</li>
                <li>• Quiet, restful environments</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Infrastructure Reliability</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Power, water, connectivity, and security are planned with redundancy so large gatherings run without disruption.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 24/7 utilities with backups</li>
                <li>• Proactive maintenance culture</li>
                <li>• Safety-first campus operations</li>
                <li>• Health and medical support proximity</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Innovation & Sustainability</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Modernize facilities and adopt sustainable practices to keep the campus future-ready and environmentally responsible.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Smart lighting and energy efficiency</li>
                <li>• Water stewardship across the grounds</li>
                <li>• Tech-enabled bookings and check-ins</li>
                <li>• Continuous upgrades to halls and rooms</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Reach & Partnerships</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Serve national conventions, regional retreats, and global guests through partnerships that expand capacity and impact.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hosting multi-thousand conventions</li>
                <li>• Collaborative events with ministries and NGOs</li>
                <li>• Hybrid-ready halls for wider audiences</li>
                <li>• Training teams for best-in-class hosting</li>
              </ul>
            </div>
          </div>

          {/* Vision in Action */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Vision in Action</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Effortless Guest Experience</h3>
                <p className="text-gray-600">
                  Clear itineraries, wayfinding, and onsite help desks keep guests relaxed and focused on why they came.
                </p>
              </div>
              <div className="border-l-4 border-slate-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable Operations</h3>
                <p className="text-gray-600">
                  Planned maintenance, trained teams, and safety protocols prevent disruptions during peak events.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Impact</h3>
                <p className="text-gray-600">
                  Ministries, organizations, and families leave with lasting outcomes because the campus amplified their program goals.
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Foundation */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision Scripture</h2>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "You will be blessed when you come in and blessed when you go out. The Lord will command the blessing on your barns and in all that you undertake."
            </blockquote>
            <p className="text-gray-600 font-medium">- Deuteronomy 28:6,8</p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Be Part of the Vision</h2>
            <p className="text-gray-600 mb-6">
              Partner with us to host your next retreat, conference, or training at Ajebo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about/values" 
                className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Our Values
              </Link>
              <Link 
                href="/contact" 
                className="border border-slate-600 text-slate-600 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}