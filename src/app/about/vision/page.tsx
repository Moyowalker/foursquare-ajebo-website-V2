import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Eye, Target, Star, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Vision | Foursquare Gospel Church Ajebo',
  description: 'To provide a serene, comfortable, and secured spiritual retreat centre for worship, fellowship, and community building.',
  keywords: ['vision', 'future', 'retreat centre', 'spiritual growth', 'Foursquare Camp Ajebo'],
};

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/about" 
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to About Us
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vision</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            A serene spiritual retreat centre fostering growth and community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Vision Statement */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision Statement</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                To provide a serene, comfortable, and secured spiritual retreat centre for worship, fellowship, and community building, fostering spiritual growth and deepening faith among its visitors and stakeholders.
              </p>
              <p className="text-lg text-gray-600">
                We envision a place where people from all walks of life can come to experience God's presence in a peaceful and secure environment, building lasting relationships and growing in their spiritual journey.
              </p>
            </div>
          </div>

          {/* Vision Pillars */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Spiritual Transformation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Seeing lives radically changed by the power of the Gospel, with believers 
                growing in spiritual maturity and Christlike character.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Deep personal relationship with Jesus</li>
                <li>• Biblical literacy and spiritual growth</li>
                <li>• Active prayer and worship life</li>
                <li>• Character development and integrity</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Community Impact</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Creating positive change in our local community through compassionate 
                service, social justice, and practical support.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Educational and skill development programs</li>
                <li>• Healthcare and social services</li>
                <li>• Economic empowerment initiatives</li>
                <li>• Environmental stewardship</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Innovation & Excellence</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Embracing innovative approaches to ministry while maintaining excellence 
                in all aspects of church life and service.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Modern worship and teaching methods</li>
                <li>• Technology-enhanced ministries</li>
                <li>• Creative outreach strategies</li>
                <li>• Continuous learning and development</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Global Expansion</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Extending our reach beyond local boundaries to plant churches, 
                support missions, and partner with global ministry efforts.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Church planting across Nigeria</li>
                <li>• International missions support</li>
                <li>• Cross-cultural ministry training</li>
                <li>• Global partnership networks</li>
              </ul>
            </div>
          </div>

          {/* Future Goals */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our 2030 Vision Goals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
                <p className="text-gray-700 font-medium">Active Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
                <p className="text-gray-700 font-medium">Church Plants</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <p className="text-gray-700 font-medium">Community Programs</p>
              </div>
            </div>
          </div>

          {/* Vision in Action */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Vision in Action</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transformed Lives</h3>
                <p className="text-gray-600">
                  We see individuals discovering their identity in Christ, overcoming 
                  challenges, and becoming agents of positive change in their families and communities.
                </p>
              </div>
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strong Families</h3>
                <p className="text-gray-600">
                  Families built on biblical foundations, experiencing love, unity, and 
                  purpose while raising the next generation of godly leaders.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthy Communities</h3>
                <p className="text-gray-600">
                  Communities marked by justice, compassion, and prosperity where 
                  everyone has the opportunity to thrive and reach their full potential.
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Foundation */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision Scripture</h2>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              "For I know the plans I have for you, declares the Lord, plans for welfare 
              and not for evil, to give you a future and a hope."
            </blockquote>
            <p className="text-gray-600 font-medium">- Jeremiah 29:11</p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Be Part of the Vision</h2>
            <p className="text-gray-600 mb-6">
              Join us in building this vision for our community and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about/values" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Our Values
              </Link>
              <Link 
                href="/contact" 
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
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