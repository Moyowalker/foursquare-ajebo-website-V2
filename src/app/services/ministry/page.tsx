import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Baby, Book, Briefcase, Globe, Heart, Mic, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ministry | Foursquare Gospel Church Ajebo',
  description: 'Discover our various ministries serving different age groups and interests. Find your place to serve and grow in our church community.',
  keywords: ['ministry', 'youth', 'children', 'women', 'men', 'outreach', 'foursquare ajebo'],
};

export default function MinistryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ministry Departments</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Find your place to serve, grow, and make a difference in our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Serving Together</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Every believer has been gifted by God to serve and build up the body of Christ. 
              Our ministry departments provide opportunities for spiritual growth, fellowship, 
              and meaningful service to God and our community.
            </p>
          </div>

          {/* Age-Based Ministries */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Age-Based Ministries</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Children's Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Baby className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Children's Ministry</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Nurturing young hearts to know and love Jesus through age-appropriate 
                  programs and activities.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Age Range:</strong> 2-12 years</p>
                  <p><strong>Meeting Time:</strong> Sundays 9:00 AM</p>
                  <p><strong>Activities:</strong> Bible stories, crafts, games, songs</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Programs Include:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sunday School</li>
                    <li>• Children's Church</li>
                    <li>• Vacation Bible School</li>
                    <li>• Children's Choir</li>
                  </ul>
                </div>
                <Link 
                  href="/contact" 
                  className="block text-center bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                >
                  Join Children's Ministry
                </Link>
              </div>

              {/* Youth Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Youth Ministry</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Empowering young people to live boldly for Christ and impact their 
                  generation with the Gospel.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Age Range:</strong> 13-30 years</p>
                  <p><strong>Meeting Time:</strong> Fridays 5:00 PM</p>
                  <p><strong>Focus:</strong> Discipleship, leadership, evangelism</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Activities Include:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Youth fellowship</li>
                    <li>• Leadership training</li>
                    <li>• Evangelism outreach</li>
                    <li>• Youth conferences</li>
                  </ul>
                </div>
                <Link 
                  href="/contact" 
                  className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Join Youth Ministry
                </Link>
              </div>

              {/* Young Adults */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Young Adults</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Supporting young professionals and adults in their career, relationships, 
                  and spiritual growth journey.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Age Range:</strong> 25-40 years</p>
                  <p><strong>Meeting Time:</strong> Saturdays 4:00 PM</p>
                  <p><strong>Focus:</strong> Career, marriage, family, ministry</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Programs Include:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Career development</li>
                    <li>• Marriage preparation</li>
                    <li>• Financial planning</li>
                    <li>• Leadership roles</li>
                  </ul>
                </div>
                <Link 
                  href="/contact" 
                  className="block text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Join Young Adults
                </Link>
              </div>
            </div>
          </div>

          {/* Gender-Based Ministries */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Gender-Based Ministries</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Women's Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Women's Ministry</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Empowering women to walk in their God-given purpose and support each other 
                  through all seasons of life.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Programs:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Women's Fellowship</li>
                      <li>• Bible Study Groups</li>
                      <li>• Marriage Enrichment</li>
                      <li>• Mother's Support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Monthly meetings</li>
                      <li>• Prayer retreats</li>
                      <li>• Community outreach</li>
                      <li>• Skill development</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-pink-700">
                    <strong>Meeting Time:</strong> First Saturday of every month, 10:00 AM - 2:00 PM
                  </p>
                </div>
                <Link 
                  href="/contact" 
                  className="block text-center bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                >
                  Join Women's Ministry
                </Link>
              </div>

              {/* Men's Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Men's Ministry</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Building godly men who lead with integrity in their homes, workplaces, 
                  and communities.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Programs:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Men's Fellowship</li>
                      <li>• Leadership Training</li>
                      <li>• Father's Support</li>
                      <li>• Mentorship Program</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Monthly gatherings</li>
                      <li>• Sports events</li>
                      <li>• Community service</li>
                      <li>• Prayer meetings</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-indigo-700">
                    <strong>Meeting Time:</strong> Second Saturday of every month, 7:00 AM - 11:00 AM
                  </p>
                </div>
                <Link 
                  href="/contact" 
                  className="block text-center bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Join Men's Ministry
                </Link>
              </div>
            </div>
          </div>

          {/* Service Ministries */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Service Ministries</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Worship Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Worship Ministry</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Leading the congregation in praise and worship through music and song.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  <p><strong>Teams:</strong> Choir, Band, Vocals</p>
                  <p><strong>Rehearsal:</strong> Thursdays 6:00 PM</p>
                </div>
                <Link 
                  href="/contact" 
                  className="text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  Join Worship Team
                </Link>
              </div>

              {/* Ushering Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ushering Ministry</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Welcoming guests and ensuring orderly, comfortable worship services.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  <p><strong>Duties:</strong> Welcome, Seating, Order</p>
                  <p><strong>Training:</strong> Monthly workshops</p>
                </div>
                <Link 
                  href="/contact" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Become an Usher
                </Link>
              </div>

              {/* Media Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Media Ministry</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Managing sound, video, live streaming, and digital content creation.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  <p><strong>Skills:</strong> Audio, Video, Streaming</p>
                  <p><strong>Training:</strong> Technical workshops</p>
                </div>
                <Link 
                  href="/contact" 
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Join Media Team
                </Link>
              </div>

              {/* Outreach Ministry */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Outreach Ministry</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Reaching out to the community with love, care, and the Gospel message.
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  <p><strong>Activities:</strong> Evangelism, Care, Support</p>
                  <p><strong>Outreach:</strong> Weekly programs</p>
                </div>
                <Link 
                  href="/contact" 
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  Join Outreach
                </Link>
              </div>
            </div>
          </div>

          {/* Ministry Leadership */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ministry Leadership Opportunities</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              God has called every believer to leadership in some capacity. We provide training 
              and mentorship opportunities for those called to lead in ministry.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Book className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Leadership Training</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive training programs for emerging and existing ministry leaders.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mentorship Program</h3>
                <p className="text-sm text-gray-600">
                  Pairing new leaders with experienced mentors for guidance and support.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ministry Development</h3>
                <p className="text-sm text-gray-600">
                  Support for starting new ministries and expanding existing ones.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Find Your Ministry</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              God has given you unique gifts and talents to serve His kingdom. Discover 
              your place in ministry and make a lasting impact in the lives of others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Get Involved
              </Link>
              <Link 
                href="/about/values" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium"
              >
                Learn Our Values
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}