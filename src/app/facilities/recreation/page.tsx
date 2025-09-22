import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TreePine, Dumbbell, Users, Calendar, Clock, Star, MapPin, Shield } from 'lucide-react';
import { getFacilitiesByCategory } from '@/lib/image-config';
import FacilityCard from '@/components/ui/FacilityCard';

export const metadata: Metadata = {
  title: 'Recreation Facilities | Foursquare Camp Ajebo',
  description: 'Modern sports centre and gym facilities providing fitness, sports, and recreational activities for all ages at Foursquare Camp Ajebo.',
  keywords: ['recreation', 'sports centre', 'gym', 'fitness', 'sports', 'playground', 'Foursquare Camp Ajebo'],
};

export default function RecreationPage() {
  const recreationFacilities = getFacilitiesByCategory('recreation');

  const programs = [
    {
      name: 'Morning Fitness Group',
      schedule: 'Mon, Wed, Fri - 6:30 AM',
      description: 'Join our morning fitness group for exercise and fellowship in the gym.',
      coordinator: 'Deacon Samuel Adebayo',
      participants: '30+ regular members',
      location: 'Fitness Gym'
    },
    {
      name: 'Youth Sports League',
      schedule: 'Saturdays - 4:00 PM',
      description: 'Competitive sports leagues for youth including basketball, volleyball, and football.',
      coordinator: 'Elder Johnson Okoro',
      participants: '80+ youth members',
      location: 'Sports Centre'
    },
    {
      name: 'Family Sports Day',
      schedule: 'First Saturday monthly',
      description: 'Monthly family recreation days with games, activities, and fellowship.',
      coordinator: 'Elder Tunde Fashola',
      participants: '150+ families',
      location: 'Sports Centre'
    },
    {
      name: 'Fitness Training Sessions',
      schedule: 'Tuesdays & Thursdays - 5:00 PM',
      description: 'Personal training and group fitness sessions for all fitness levels.',
      coordinator: 'Deaconess Blessing Adegoke',
      participants: '25+ members per session',
      location: 'Fitness Gym'
    }
  ];

  const activities = [
    {
      category: 'Team Sports',
      items: ['Basketball', 'Volleyball', 'Football', 'Table Tennis', 'Badminton'],
      facility: 'Sports Centre'
    },
    {
      category: 'Individual Fitness',
      items: ['Weight Training', 'Cardio Workouts', 'Personal Training', 'Strength Building', 'Flexibility Training'],
      facility: 'Fitness Gym'
    },
    {
      category: 'Group Activities',
      items: ['Aerobics Classes', 'Yoga Sessions', 'Dance Fitness', 'Circuit Training', 'Outdoor Sports'],
      facility: 'Both Facilities'
    }
  ];

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
            Modern sports centre and fitness gym providing excellent recreational opportunities for all ages
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sports & Fitness Facilities</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our modern recreation facilities provide excellent opportunities for fitness, sports, 
              and fellowship. Whether you're looking for competitive sports, personal fitness, 
              or family fun, our Sports Centre and Fitness Gym have something for everyone.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{recreationFacilities.length}</div>
                <p className="text-gray-700 font-medium">Recreation Facilities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <p className="text-gray-700 font-medium">Weekly Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <p className="text-gray-700 font-medium">Sports & Activities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <p className="text-gray-700 font-medium">Modern Equipment</p>
              </div>
            </div>
          </div>

          {/* Recreation Facilities */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Recreation Facilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {recreationFacilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} showLink={false} />
              ))}
            </div>
          </div>

          {/* Activities by Category */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Activities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {activities.map((category, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-green-100' :
                    index === 1 ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {index === 0 ? (
                      <Users className="w-6 h-6 text-green-600" />
                    ) : index === 1 ? (
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Star className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h3>
                  <div className="space-y-2 mb-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-gray-600">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                    index === 0 ? 'bg-green-100 text-green-700' :
                    index === 1 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {category.facility}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Programs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Regular Recreation Programs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {program.location}
                    </span>
                  </div>
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
                  <li>• Proper sports attire required for all activities</li>
                  <li>• Clean up after use and return equipment properly</li>
                  <li>• Respect other users and facility rules</li>
                  <li>• No food or drinks on gym floor or sports courts</li>
                  <li>• Report any equipment damage immediately</li>
                  <li>• Follow specific facility rules and safety guidelines</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking & Access */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Access & Booking Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Operating Hours</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Weekdays:</strong> 6:00 AM - 9:00 PM
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Weekends:</strong> 7:00 AM - 8:00 PM
                </p>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Open Daily
                </div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Access</h3>
                <p className="text-gray-600 mb-4">
                  Open to all church members and camp visitors during operating hours for individual use.
                </p>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Walk-in Welcome
                </div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Booking</h3>
                <p className="text-gray-600 mb-4">
                  Advance booking required for group events, tournaments, and exclusive facility use.
                </p>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Booking Required
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Get Active & Stay Fit</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join us at our modern recreation facilities for fitness, sports, and fellowship. 
              Whether you're a beginner or an athlete, everyone is welcome to participate and grow stronger together.
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