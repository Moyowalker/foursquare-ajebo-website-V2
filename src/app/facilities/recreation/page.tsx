import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TreePine, Waves, Zap, Users, Calendar, Clock, Star, MapPin, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recreation Facilities | Foursquare Gospel Church Ajebo',
  description: 'Enjoy our recreational facilities including gardens, sports courts, playground, and retreat spaces for relaxation and fellowship.',
  keywords: ['recreation', 'sports', 'playground', 'gardens', 'fellowship', 'retreat', 'foursquare ajebo'],
};

export default function RecreationPage() {
  const facilities = [
    {
      id: 1,
      name: 'Church Gardens',
      icon: TreePine,
      color: 'green',
      description: 'Beautiful landscaped gardens with walking paths, seating areas, and peaceful meditation spots.',
      features: [
        'Walking and jogging paths',
        'Meditation gazebos',
        'Outdoor seating areas',
        'Prayer gardens',
        'Event lawn space',
        'Children\'s nature trail'
      ],
      activities: [
        'Morning walks and exercise',
        'Outdoor prayer sessions',
        'Photography sessions',
        'Nature meditation',
        'Small group meetings',
        'Garden parties'
      ],
      capacity: 'Open access',
      hours: '6:00 AM - 8:00 PM daily',
      availability: 'Always Open'
    },
    {
      id: 2,
      name: 'Sports Complex',
      icon: Zap,
      color: 'blue',
      description: 'Multi-purpose sports facilities for various athletic activities and youth programs.',
      features: [
        'Basketball court',
        'Volleyball court',
        'Football field',
        'Tennis court',
        'Equipment storage',
        'Spectator seating'
      ],
      activities: [
        'Basketball tournaments',
        'Volleyball matches',
        'Football games',
        'Tennis coaching',
        'Youth sports programs',
        'Community competitions'
      ],
      capacity: '200+ participants',
      hours: '7:00 AM - 7:00 PM',
      availability: 'Booking Required'
    },
    {
      id: 3,
      name: 'Children\'s Playground',
      icon: Users,
      color: 'yellow',
      description: 'Safe and fun playground equipment designed for children of different age groups.',
      features: [
        'Age-appropriate equipment',
        'Safety surfacing',
        'Shade structures',
        'Benches for parents',
        'Fenced perimeter',
        'Water fountain'
      ],
      activities: [
        'Children\'s playtime',
        'Family recreation',
        'Birthday parties',
        'Sunday school outdoor activities',
        'Children\'s events',
        'Parent fellowship'
      ],
      capacity: '50+ children',
      hours: '8:00 AM - 6:00 PM',
      availability: 'Open Access'
    },
    {
      id: 4,
      name: 'Fellowship Pavilion',
      icon: Waves,
      color: 'purple',
      description: 'Covered outdoor space perfect for fellowship gatherings, picnics, and social events.',
      features: [
        'Weather protection',
        'Picnic tables',
        'BBQ/cooking area',
        'Electrical outlets',
        'Sound system hookup',
        'Storage cabinets'
      ],
      activities: [
        'Church picnics',
        'Fellowship meals',
        'Birthday celebrations',
        'Group gatherings',
        'Outdoor services',
        'Community events'
      ],
      capacity: '100-150 people',
      hours: '8:00 AM - 10:00 PM',
      availability: 'Booking Required'
    }
  ];

  const programs = [
    {
      name: 'Morning Exercise Group',
      schedule: 'Mon, Wed, Fri - 6:30 AM',
      description: 'Join our morning exercise group for fitness and fellowship in the gardens.',
      coordinator: 'Mrs. Adunni Salami',
      participants: '25+ regular members'
    },
    {
      name: 'Youth Sports League',
      schedule: 'Saturdays - 4:00 PM',
      description: 'Competitive sports leagues for youth including basketball, volleyball, and football.',
      coordinator: 'Deacon Chinedu Okwu',
      participants: '80+ youth members'
    },
    {
      name: 'Family Fun Days',
      schedule: 'First Saturday monthly',
      description: 'Monthly family recreation days with games, activities, and fellowship.',
      coordinator: 'Elder Tunde Fashola',
      participants: '150+ families'
    },
    {
      name: 'Garden Prayer Walks',
      schedule: 'Sundays - 7:00 AM',
      description: 'Peaceful prayer walks through our gardens before morning service.',
      coordinator: 'Pastor Grace Adebayo',
      participants: '40+ prayer warriors'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-100',
      blue: 'text-blue-600 bg-blue-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getBorderColor = (color: string) => {
    const colors = {
      green: 'border-green-200',
      blue: 'border-blue-200',
      yellow: 'border-yellow-200',
      purple: 'border-purple-200'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/facilities" 
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Facilities
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Recreation Facilities</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Enjoy fellowship, fitness, and fun in our beautiful recreational spaces designed for all ages
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recreation & Fellowship Spaces</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our recreational facilities provide wonderful opportunities for fellowship, fitness, 
              and fun for all ages. Whether you're looking for peaceful reflection, active sports, 
              or family entertainment, we have something for everyone.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <p className="text-gray-700 font-medium">Recreation Areas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-700 font-medium">Weekly Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                <p className="text-gray-700 font-medium">Programs & Activities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <p className="text-gray-700 font-medium">Family Friendly</p>
              </div>
            </div>
          </div>

          {/* Recreation Facilities */}
          <div className="space-y-12 mb-16">
            {facilities.map((facility) => {
              const IconComponent = facility.icon;
              return (
                <div key={facility.id} className={`bg-white rounded-2xl shadow-lg border-l-4 ${getBorderColor(facility.color)} overflow-hidden`}>
                  <div className="p-8">
                    {/* Facility Header */}
                    <div className="flex items-start space-x-6 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getIconColor(facility.color)}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                            <p className="text-gray-600 mb-2">{facility.description}</p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            facility.availability === 'Always Open' 
                              ? 'bg-green-100 text-green-700'
                              : facility.availability === 'Open Access'
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {facility.availability}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                          <div>
                            <div className="flex items-center text-gray-500 mb-1">
                              <Users className="w-4 h-4 mr-2" />
                              <span>Capacity</span>
                            </div>
                            <p className="font-medium text-gray-900">{facility.capacity}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-500 mb-1">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Operating Hours</span>
                            </div>
                            <p className="font-medium text-gray-900">{facility.hours}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-500 mb-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>Access</span>
                            </div>
                            <p className="font-medium text-gray-900">{facility.availability}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {facility.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Activities</h4>
                        <div className="space-y-2">
                          {facility.activities.map((activity, index) => (
                            <div key={index} className="flex items-start text-sm text-gray-600">
                              <Star className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Regular Programs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Regular Recreation Programs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{program.schedule}</p>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Coordinator:</p>
                      <p className="font-medium text-gray-900">{program.coordinator}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Participants:</p>
                      <p className="font-medium text-gray-900">{program.participants}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Guidelines */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safety & Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Measures</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>24/7 security surveillance and regular patrols</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>First aid stations and trained personnel available</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Regular equipment maintenance and safety inspections</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Emergency procedures and evacuation plans in place</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Guidelines</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Children under 12 must be supervised by adults</li>
                  <li>• No smoking or alcohol consumption on premises</li>
                  <li>• Clean up after use and dispose of trash properly</li>
                  <li>• Respect other users and maintain peaceful atmosphere</li>
                  <li>• Report any damage or safety concerns immediately</li>
                  <li>• Follow specific facility rules and posted guidelines</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking & Access */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Access & Booking Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Access</h3>
                <p className="text-gray-600 mb-4">
                  Gardens and playground are open to all church members and visitors during operating hours.
                </p>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  No Booking Required
                </div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advance Booking</h3>
                <p className="text-gray-600 mb-4">
                  Sports complex and pavilion require advance booking for exclusive use and events.
                </p>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Booking Required
                </div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Events</h3>
                <p className="text-gray-600 mb-4">
                  Special arrangements for large groups, parties, and organized events.
                </p>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Contact Required
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Come & Enjoy Fellowship</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Our recreation facilities are designed to bring people together in fun, fellowship, 
              and fitness. Join us for regular programs or book a facility for your special event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Book a Facility
              </Link>
              <Link 
                href="/services/ministry" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium"
              >
                Join a Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}