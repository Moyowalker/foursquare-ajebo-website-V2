import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Heart, Music, Baby, Briefcase, Globe, Award, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ministry Team | Foursquare Gospel Church Ajebo',
  description: 'Meet our dedicated ministry team leaders and coordinators serving in various departments and programs.',
  keywords: ['ministry team', 'leaders', 'coordinators', 'departments', 'volunteers', 'foursquare ajebo'],
};

export default function MinistryTeamPage() {
  const ministryTeams = [
    {
      id: 1,
      name: 'Worship Ministry Team',
      coordinator: 'Elder (Mrs.) Patience Nwosu',
      icon: Music,
      color: 'red',
      description: 'Leading the congregation in praise and worship through music, song, and creative arts.',
      members: [
        { name: 'John Adebayo', role: 'Worship Leader', specialization: 'Vocals & Guitar' },
        { name: 'Sarah Okafor', role: 'Choir Director', specialization: 'Vocal Training' },
        { name: 'David Okonkwo', role: 'Music Director', specialization: 'Keyboard & Arrangements' },
        { name: 'Grace Alabi', role: 'Youth Choir Leader', specialization: 'Youth Music' },
        { name: 'Michael Eze', role: 'Instrumentalist', specialization: 'Drums & Percussion' },
        { name: 'Ruth Oyenuga', role: 'Dance Coordinator', specialization: 'Liturgical Dance' }
      ],
      activities: [
        'Sunday worship services',
        'Special event performances',
        'Music training and workshops',
        'Youth and children\'s choir',
        'Recording and media production'
      ],
      meeting: 'Thursdays 6:00 PM - 8:00 PM'
    },
    {
      id: 2,
      name: 'Children Ministry Team',
      coordinator: 'Deaconess Blessing Umeh',
      icon: Baby,
      color: 'yellow',
      description: 'Nurturing young hearts and minds through age-appropriate Christian education and activities.',
      members: [
        { name: 'Mrs. Folake Adeyemi', role: 'Sunday School Superintendent', specialization: 'Early Childhood Education' },
        { name: 'Miss Tope Ajayi', role: 'Nursery Coordinator', specialization: 'Toddler Care' },
        { name: 'Mr. Kehinde Balogun', role: 'Children\'s Pastor', specialization: 'Bible Teaching' },
        { name: 'Mrs. Nneka Okwu', role: 'Craft Coordinator', specialization: 'Creative Arts' },
        { name: 'Miss Joy Adeleke', role: 'Games Coordinator', specialization: 'Recreation & Fun' },
        { name: 'Mrs. Comfort Agu', role: 'Special Needs Coordinator', specialization: 'Inclusive Care' }
      ],
      activities: [
        'Sunday School classes',
        'Children\'s church services',
        'Vacation Bible School',
        'Holiday programs and plays',
        'Parent-child activities'
      ],
      meeting: 'Saturdays 4:00 PM - 6:00 PM'
    },
    {
      id: 3,
      name: 'Youth Ministry Team',
      coordinator: 'Deacon Chinedu Okwu',
      icon: Users,
      color: 'blue',
      description: 'Empowering young people to live boldly for Christ and impact their generation.',
      members: [
        { name: 'Pastor Emeka Obi', role: 'Youth Pastor', specialization: 'Youth Leadership' },
        { name: 'Sister Chioma Uche', role: 'Girls\' Ministry Leader', specialization: 'Female Mentorship' },
        { name: 'Brother Kemi Adebola', role: 'Boys\' Ministry Leader', specialization: 'Male Mentorship' },
        { name: 'Evangelist Tolu Babatunde', role: 'Outreach Coordinator', specialization: 'Evangelism' },
        { name: 'Sis. Favour Mba', role: 'Events Coordinator', specialization: 'Program Planning' },
        { name: 'Bro. Joshua Ekpo', role: 'Tech Coordinator', specialization: 'Digital Ministry' }
      ],
      activities: [
        'Friday youth fellowships',
        'Leadership training programs',
        'Evangelism and outreach',
        'Youth conferences and camps',
        'Skill development workshops'
      ],
      meeting: 'Wednesdays 5:00 PM - 7:00 PM'
    },
    {
      id: 4,
      name: 'Women Ministry Team',
      coordinator: 'Pastor (Mrs.) Grace Adebayo',
      icon: Heart,
      color: 'pink',
      description: 'Empowering women to walk in their God-given purpose and support one another.',
      members: [
        { name: 'Mrs. Funmi Adeoye', role: 'Fellowship Coordinator', specialization: 'Women\'s Programs' },
        { name: 'Mrs. Bisi Ogundipe', role: 'Prayer Coordinator', specialization: 'Intercessory Prayer' },
        { name: 'Mrs. Nike Olumide', role: 'Welfare Coordinator', specialization: 'Care & Support' },
        { name: 'Mrs. Joke Adelaja', role: 'Skills Coordinator', specialization: 'Vocational Training' },
        { name: 'Mrs. Sola Martins', role: 'Outreach Coordinator', specialization: 'Community Service' },
        { name: 'Mrs. Peace Nwankwo', role: 'Counseling Coordinator', specialization: 'Marriage & Family' }
      ],
      activities: [
        'Monthly women\'s meetings',
        'Prayer and fasting programs',
        'Skills training workshops',
        'Community outreach projects',
        'Marriage and family seminars'
      ],
      meeting: 'First Saturday monthly 10:00 AM - 2:00 PM'
    },
    {
      id: 5,
      name: 'Men Ministry Team',
      coordinator: 'Elder Adejare Johnson',
      icon: Briefcase,
      color: 'indigo',
      description: 'Building godly men who lead with integrity in their homes and communities.',
      members: [
        { name: 'Mr. Femi Adesanya', role: 'Fellowship Coordinator', specialization: 'Men\'s Programs' },
        { name: 'Mr. Bode Fashola', role: 'Mentorship Coordinator', specialization: 'Leadership Development' },
        { name: 'Mr. Segun Oyedele', role: 'Sports Coordinator', specialization: 'Recreation & Fitness' },
        { name: 'Mr. Paul Okorie', role: 'Business Coordinator', specialization: 'Entrepreneurship' },
        { name: 'Mr. Tony Ezeh', role: 'Prayer Coordinator', specialization: 'Men\'s Prayer' },
        { name: 'Mr. Ahmed Lawal', role: 'Outreach Coordinator', specialization: 'Community Engagement' }
      ],
      activities: [
        'Monthly men\'s gatherings',
        'Leadership development',
        'Business and career seminars',
        'Sports and recreation',
        'Community service projects'
      ],
      meeting: 'Second Saturday monthly 7:00 AM - 11:00 AM'
    },
    {
      id: 6,
      name: 'Media & Communications Team',
      coordinator: 'Deacon Samuel Ogundimu',
      icon: Globe,
      color: 'green',
      description: 'Managing all media production, live streaming, and digital communications.',
      members: [
        { name: 'Mr. Uche Okafor', role: 'Video Production Manager', specialization: 'Video & Editing' },
        { name: 'Miss Funke Alabi', role: 'Graphics Designer', specialization: 'Visual Design' },
        { name: 'Mr. Dele Akinwale', role: 'Sound Engineer', specialization: 'Audio Production' },
        { name: 'Sis. Adunni Salami', role: 'Social Media Manager', specialization: 'Digital Marketing' },
        { name: 'Bro. Victor Asika', role: 'Live Stream Coordinator', specialization: 'Broadcasting' },
        { name: 'Miss Kemi Ogunseye', role: 'Content Creator', specialization: 'Creative Writing' }
      ],
      activities: [
        'Live service streaming',
        'Video and audio recording',
        'Social media management',
        'Church website maintenance',
        'Digital content creation'
      ],
      meeting: 'Saturdays 2:00 PM - 5:00 PM'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600 bg-red-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      blue: 'text-blue-600 bg-blue-100',
      pink: 'text-pink-600 bg-pink-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      green: 'text-green-600 bg-green-100'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getBorderColor = (color: string) => {
    const colors = {
      red: 'border-red-200',
      yellow: 'border-yellow-200',
      blue: 'border-blue-200',
      pink: 'border-pink-200',
      indigo: 'border-indigo-200',
      green: 'border-green-200'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/leadership" 
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leadership
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ministry Team</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Meet our dedicated team of ministry leaders and volunteers serving across various departments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Ministry Teams</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our church operates through the dedicated service of ministry teams led by passionate 
              coordinators and supported by committed volunteers. Each team plays a vital role in 
              fulfilling our mission and serving our community.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
                <p className="text-gray-700 font-medium">Ministry Teams</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">36+</div>
                <p className="text-gray-700 font-medium">Team Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <p className="text-gray-700 font-medium">Programs & Activities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
                <p className="text-gray-700 font-medium">Volunteers Engaged</p>
              </div>
            </div>
          </div>

          {/* Ministry Teams */}
          <div className="space-y-12">
            {ministryTeams.map((team) => {
              const IconComponent = team.icon;
              return (
                <div key={team.id} className={`bg-white rounded-2xl shadow-lg border-l-4 ${getBorderColor(team.color)} overflow-hidden`}>
                  <div className="p-8">
                    {/* Team Header */}
                    <div className="flex items-start space-x-6 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getIconColor(team.color)}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{team.name}</h3>
                        <p className="text-blue-600 font-medium mb-2">Coordinator: {team.coordinator}</p>
                        <p className="text-gray-600">{team.description}</p>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Team Members */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {team.members.map((member, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 mb-1">{member.name}</h5>
                              <p className="text-sm text-blue-600 font-medium mb-1">{member.role}</p>
                              <p className="text-xs text-gray-600">{member.specialization}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Team Info */}
                      <div>
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Activities & Programs</h4>
                          <ul className="space-y-2">
                            {team.activities.map((activity, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`bg-gradient-to-r from-${team.color}-50 to-${team.color}-100 rounded-lg p-4`}>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Team Meeting</h4>
                          <p className="text-sm text-gray-700">{team.meeting}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leadership Development */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mt-16 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Ministry Leadership Development</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Training Programs</h3>
                <p className="text-sm text-gray-600">
                  Regular training sessions to develop ministry skills and leadership capabilities
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mentorship</h3>
                <p className="text-sm text-gray-600">
                  Experienced leaders mentor new team members for personal and ministry growth
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Recognition</h3>
                <p className="text-sm text-gray-600">
                  Annual appreciation and recognition for outstanding service and dedication
                </p>
              </div>
            </div>
          </div>

          {/* Join Ministry Team */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Join a Ministry Team</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              God has given you unique gifts and talents to serve His kingdom. Find your place 
              in one of our ministry teams and make a lasting impact in the lives of others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services/ministry" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                Explore Ministries
              </Link>
              <Link 
                href="/contact" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}