import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Crown, Award, Calendar, Phone, Mail } from 'lucide-react';
import { boardMembers, boardPageData } from '@/data/board';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Board of Trustees | Foursquare Gospel Church Ajebo',
  description: 'Meet our dedicated board of trustees providing spiritual guidance, strategic direction, and administrative oversight.',
  keywords: ['board', 'trustees', 'leadership', 'pastors', 'elders', 'deacons', 'foursquare ajebo'],
};

export default function BoardPage() {
  const executiveMembers = boardPageData.sections[0].members;
  const coordinators = boardPageData.sections[1].members;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/leadership" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leadership
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{boardPageData.hero.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-6">
            {boardPageData.hero.subtitle}
          </p>
          <p className="text-blue-100 max-w-4xl">
            {boardPageData.hero.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Overview Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{boardPageData.totalMembers}</div>
                <p className="text-gray-700 font-medium">Board Members</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <p className="text-gray-700 font-medium">Years Combined Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <p className="text-gray-700 font-medium">Ministry Departments</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <p className="text-gray-700 font-medium">Commitment to Service</p>
              </div>
            </div>
          </div>

          {/* Executive Leadership */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{boardPageData.sections[0].title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {boardPageData.sections[0].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {executiveMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    {(member.isChairperson || member.isViceChairperson) && (
                      <div className="absolute top-4 right-4">
                        <Crown className="w-6 h-6 text-yellow-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-1">{member.title}</p>
                      <p className="text-gray-600 text-sm">{member.position} • {member.department}</p>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Years of Service</span>
                        </div>
                        <p className="font-medium text-gray-900">{member.yearsOfService} years</p>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <Award className="w-4 h-4 mr-2" />
                          <span>Specialization</span>
                        </div>
                        <p className="font-medium text-gray-900">{member.specialization[0]}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="truncate">{member.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="truncate">{member.email.split('@')[0]}@...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ministry Coordinators */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{boardPageData.sections[1].title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {boardPageData.sections[1].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coordinators.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm mb-1">{member.title}</p>
                      <p className="text-gray-600 text-xs">{member.position}</p>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{member.bio}</p>

                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <p className="text-xs text-gray-600 mb-1">Department:</p>
                      <p className="text-sm font-medium text-gray-900">{member.department}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{member.yearsOfService} years service</span>
                      <span>{member.specialization.length} specializations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Principles */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Leadership Principles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Servant Leadership</h3>
                <p className="text-sm text-gray-600">
                  Following Christ's example of humble service to others
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Integrity</h3>
                <p className="text-sm text-gray-600">
                  Maintaining honesty and transparency in all decisions
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accountability</h3>
                <p className="text-sm text-gray-600">
                  Being responsible stewards of God's resources and trust
                </p>
              </div>
            </div>
          </div>

          {/* Board Structure */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Board Structure & Governance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meetings & Decisions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monthly board meetings for strategic planning</li>
                  <li>• Quarterly financial reviews and budget assessments</li>
                  <li>• Annual leadership retreat and planning session</li>
                  <li>• Emergency meetings as needed for urgent matters</li>
                  <li>• Consensus-based decision making process</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Spiritual oversight and pastoral care</li>
                  <li>• Financial stewardship and accountability</li>
                  <li>• Strategic planning and vision casting</li>
                  <li>• Ministry coordination and development</li>
                  <li>• Community outreach and missions support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join Leadership */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Called to Leadership?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              God may be calling you to serve in leadership within our church family. 
              We provide training, mentorship, and opportunities for spiritual growth 
              for those with a heart to serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services/ministry" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Explore Ministry
              </Link>
              <Link 
                href="/contact" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
              >
                Contact Leadership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}