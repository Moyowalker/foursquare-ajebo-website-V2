import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Book, Heart, Lightbulb, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Values | Foursquare Gospel Church Ajebo',
  description: 'Discover the core values that guide our church community: integrity, love, unity, biblical foundation, innovation, and service.',
  keywords: ['values', 'principles', 'integrity', 'love', 'unity', 'foursquare ajebo'],
};

export default function ValuesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/about" 
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            The principles that shape our character and guide our actions
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
              Our values are not just words on a page—they are the living principles 
              that guide every decision, action, and relationship in our church community. 
              These values reflect the character of Christ and shape who we are as His followers.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-12">
            {/* Integrity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    We commit to honesty, transparency, and ethical conduct in all our dealings. 
                    Our words and actions align with biblical principles, and we take responsibility 
                    for our commitments.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Transparent financial stewardship</li>
                        <li>• Honest communication and feedback</li>
                        <li>• Keeping our promises and commitments</li>
                        <li>• Admitting mistakes and seeking forgiveness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "The integrity of the upright guides them"
                        <span className="block text-sm mt-1">- Proverbs 11:3</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Love */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Love</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Love is our highest value and greatest commandment. We love God with all our heart, 
                    soul, mind, and strength, and we love our neighbors as ourselves, showing compassion 
                    to all people regardless of their background.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Caring for the vulnerable and needy</li>
                        <li>• Showing kindness and patience</li>
                        <li>• Forgiving and reconciling relationships</li>
                        <li>• Welcoming everyone with open arms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "Love the Lord your God... and love your neighbor as yourself"
                        <span className="block text-sm mt-1">- Matthew 22:37-39</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Unity</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    We believe in the power of unity in diversity. Despite our different backgrounds, 
                    cultures, and experiences, we are one body in Christ, working together towards 
                    common goals and supporting one another.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Celebrating diversity and inclusion</li>
                        <li>• Resolving conflicts with grace</li>
                        <li>• Supporting one another's growth</li>
                        <li>• Working together as a team</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "How good and pleasant it is when God's people live together in unity"
                        <span className="block text-sm mt-1">- Psalm 133:1</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biblical Foundation */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Book className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Biblical Foundation</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    The Word of God is our ultimate authority and guide for life and ministry. 
                    We believe in the inspiration, inerrancy, and sufficiency of Scripture for 
                    all matters of faith and practice.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Expository biblical preaching</li>
                        <li>• Regular Bible study and meditation</li>
                        <li>• Decision-making based on Scripture</li>
                        <li>• Teaching sound doctrine</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "All Scripture is God-breathed and is useful for teaching"
                        <span className="block text-sm mt-1">- 2 Timothy 3:16</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Excellence & Innovation */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence & Innovation</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    We strive for excellence in all we do as an offering to God and service to others. 
                    We embrace innovation and creativity while maintaining our biblical foundation, 
                    always seeking better ways to fulfill our mission.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Continuous learning and improvement</li>
                        <li>• Creative worship and ministry approaches</li>
                        <li>• Professional development and training</li>
                        <li>• Embracing helpful technology</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "Whatever you do, work at it with all your heart, as working for the Lord"
                        <span className="block text-sm mt-1">- Colossians 3:23</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Service</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    Following Christ's example, we are called to serve others with humility and joy. 
                    We believe that everyone has gifts and talents to contribute to God's kingdom, 
                    and we encourage all to find their place in ministry and service.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">In Practice:</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Volunteering in church ministries</li>
                        <li>• Community outreach and missions</li>
                        <li>• Mentoring and discipleship</li>
                        <li>• Using gifts to serve others</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scripture:</h4>
                      <blockquote className="text-gray-600 italic">
                        "Whoever wants to become great among you must be your servant"
                        <span className="block text-sm mt-1">- Matthew 20:26</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Our Values */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 mt-16 mb-12">
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
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Our Journey
              </Link>
              <Link 
                href="/contact" 
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
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