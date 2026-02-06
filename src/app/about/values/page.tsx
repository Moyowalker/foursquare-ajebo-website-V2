import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Book, Heart, Lightbulb, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Values | Foursquare Camp Ajebo',
  description: 'The hosting values that shape Foursquare Camp Ajebo: hospitality, safety, stewardship, excellence, community care, and sustainability.',
  keywords: ['values', 'hospitality', 'safety', 'camp values', 'Foursquare Camp Ajebo'],
};

export default function ValuesPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            The hosting principles that shape every stay, event, and interaction on the campground
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values guide how we host guests, protect the grounds, steward resources, and partner with ministries so every retreat or event can succeed.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-12">
            {/* Hospitality */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Hospitality</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Welcome every guest with warmth, clarity, and care so they can focus on why they are here.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Clear pre-arrival guidance and wayfinding</li>
                        <li>• Attentive check-in and hall support</li>
                        <li>• Warm, respectful service for all groups</li>
                        <li>• Quiet, clean, restful spaces</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "Offer hospitality to one another"
                        <span className="block text-sm mt-1">- 1 Peter 4:9</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Reliability */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety & Reliability</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Keep the campground secure and dependable with prepared teams and maintained utilities.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• 24/7 security presence and protocols</li>
                        <li>• Backup power and water readiness</li>
                        <li>• Safety briefings for large events</li>
                        <li>• Coordinated response with medical support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "The Lord will watch over your coming and going"
                        <span className="block text-sm mt-1">- Psalm 121:8</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stewardship */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Book className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Stewardship</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Care for facilities, finances, and the land responsibly so they remain ready for future guests.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Transparent maintenance and upgrades</li>
                        <li>• Thoughtful budgeting for reliability</li>
                        <li>• Preventive care for rooms and halls</li>
                        <li>• Protecting green spaces and water</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "It is required that those who have been given a trust must prove faithful"
                        <span className="block text-sm mt-1">- 1 Corinthians 4:2</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Excellence & Care */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence & Care</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Deliver quality in cleanliness, setup, and responsiveness for every size of gathering.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Pre-event checklists and walkthroughs</li>
                        <li>• Timely room turns and hall resets</li>
                        <li>• Feedback loops after events</li>
                        <li>• Training teams for consistency</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "Whatever you do, work at it with all your heart"
                        <span className="block text-sm mt-1">- Colossians 3:23</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community & Sustainability */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Community & Sustainability</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Serve guests and neighbors while protecting the environment that makes Ajebo serene.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Partner with local services and vendors</li>
                        <li>• Waste reduction and recycling where possible</li>
                        <li>• Quiet-hour respect for retreat rhythms</li>
                        <li>• Supporting community events on the campground</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "The earth is the Lord's, and everything in it"
                        <span className="block text-sm mt-1">- Psalm 24:1</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Our Values */}
          <div className="bg-blue-50 rounded-2xl p-8 mt-16 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Living Our Values Daily</h2>
            <p className="text-gray-600 text-center mb-8">
              Our values come alive through practical everyday actions and decisions:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">In Relationships</h3>
                <p className="text-sm text-gray-600">
                  Building authentic connections based on love, trust, and mutual respect
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">In Ministry</h3>
                <p className="text-sm text-gray-600">
                  Serving with excellence while staying true to our biblical foundation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">In Community</h3>
                <p className="text-sm text-gray-600">
                  Creating an inclusive environment where everyone can grow and thrive
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Value-Driven Community</h2>
            <p className="text-gray-600 mb-6">
              Experience what it means to be part of a community that lives by these principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about/journey" 
                className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Our Journey
              </Link>
              <Link 
                href="/contact" 
                className="border border-slate-600 text-slate-600 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}