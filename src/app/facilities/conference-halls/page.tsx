import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Mic, Monitor, Coffee, Car, Wifi, Star, Calendar, Phone } from 'lucide-react';
import { getFacilitiesByCategory } from '@/lib/image-config';
import FacilityCard from '@/components/ui/FacilityCard';

export const metadata: Metadata = {
  title: 'Conference Facilities | Foursquare Camp Ajebo',
  description: 'Modern auditorium and conference facilities equipped with professional audio-visual systems for events, seminars, workshops, and corporate functions.',
  keywords: ['auditorium', 'conference', 'events', 'seminars', 'corporate', 'Foursquare Camp Ajebo'],
};

export default function ConferenceHallsPage() {
  const conferenceFacilities = getFacilitiesByCategory('conference');

  const services = [
    {
      icon: Mic,
      name: 'Professional Audio System',
      description: 'High-quality sound system with wireless microphones and mixing board',
      included: true
    },
    {
      icon: Monitor,
      name: 'Video Projection',
      description: 'Large screens and modern projectors for presentations and videos',
      included: true
    },
    {
      icon: Coffee,
      name: 'Catering Services',
      description: 'Full catering services through our Delish Fingers restaurant',
      included: false
    },
    {
      icon: Car,
      name: 'Ample Parking',
      description: 'Free parking spaces available for all event attendees',
      included: true
    },
    {
      icon: Wifi,
      name: 'High-Speed Internet',
      description: 'Complimentary high-speed Wi-Fi throughout the facility',
      included: true
    },
    {
      icon: Users,
      name: 'Event Support',
      description: 'Professional event coordination and technical support',
      included: true
    }
  ];

  const eventTypes = [
    {
      name: 'Corporate Conferences',
      description: 'Large-scale business conferences, product launches, and company meetings',
      capacity: '500+ attendees',
      features: ['Professional staging', 'Live streaming', 'Break-out areas']
    },
    {
      name: 'Religious Gatherings',
      description: 'Church conferences, revival meetings, and spiritual events',
      capacity: 'Up to 800 attendees',
      features: ['Worship-friendly setup', 'Altar space', 'Prayer areas']
    },
    {
      name: 'Educational Seminars',
      description: 'Training sessions, workshops, and educational conferences',
      capacity: '200-500 attendees',
      features: ['Interactive setup', 'Workshop spaces', 'Resource centers']
    },
    {
      name: 'Cultural Events',
      description: 'Community events, celebrations, and cultural gatherings',
      capacity: 'Flexible arrangements',
      features: ['Cultural staging', 'Performance area', 'Exhibition space']
    }
  ];

  const packages = [
    {
      name: 'Basic Package',
      price: 'Starting from ₦50,000',
      duration: 'Half Day (4 hours)',
      features: [
        'Auditorium rental',
        'Basic sound system',
        'Standard lighting',
        'Wi-Fi access',
        'Parking included'
      ],
      popular: false
    },
    {
      name: 'Standard Package',
      price: 'Starting from ₦100,000',
      duration: 'Full Day (8 hours)',
      features: [
        'Auditorium rental',
        'Full audio-visual system',
        'Professional lighting',
        'Wi-Fi access',
        'Parking included',
        'Technical support',
        'Basic refreshments'
      ],
      popular: true
    },
    {
      name: 'Premium Package',
      price: 'Starting from ₦200,000',
      duration: 'Full Day + Extended',
      features: [
        'Auditorium rental',
        'Premium AV equipment',
        'Stage lighting design',
        'Wi-Fi access',
        'Parking included',
        'Full technical support',
        'Complete catering',
        'Event coordination',
        'Live streaming setup'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/facilities" 
            className="inline-flex items-center text-indigo-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Facilities
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conference Facilities</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            State-of-the-art auditorium and conference facilities for your events, seminars, and gatherings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Event Venue</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our modern auditorium provides the perfect setting for conferences, seminars, 
              religious gatherings, and corporate events. With professional audio-visual equipment 
              and comfortable seating, we ensure your event is memorable and successful.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">800</div>
                <p className="text-gray-700 font-medium">Seating Capacity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                <p className="text-gray-700 font-medium">Main Auditorium</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-700 font-medium">Events Hosted</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-gray-700 font-medium">Modern Equipment</p>
              </div>
            </div>
          </div>

          {/* Main Auditorium */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Conference Venue</h2>
            <div className="grid lg:grid-cols-1 gap-6">
              {conferenceFacilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} showLink={false} className="lg:max-w-4xl mx-auto" />
              ))}
            </div>
          </div>

          {/* Event Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Perfect for Various Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eventTypes.map((eventType, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{eventType.name}</h3>
                  <p className="text-gray-600 mb-4">{eventType.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-indigo-600">{eventType.capacity}</span>
                  </div>
                  <div className="space-y-2">
                    {eventType.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Services & Amenities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      service.included 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {service.included ? 'Included' : 'Available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packages */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Event Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-indigo-500' : ''
                }`}>
                  {pkg.popular && (
                    <div className="bg-indigo-600 text-white text-center py-2">
                      <span className="text-sm font-medium">Most Popular</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{pkg.price}</div>
                      <p className="text-sm text-gray-600">{pkg.duration}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-xs">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link 
                      href="/contact" 
                      className={`block text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                        pkg.popular 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      Select Package
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Process */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Book</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Availability</h3>
                <p className="text-sm text-gray-600">Contact us with your preferred dates and event requirements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Quote</h3>
                <p className="text-sm text-gray-600">Receive a detailed quote based on your specific needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirm Booking</h3>
                <p className="text-sm text-gray-600">Sign agreement and make deposit to secure your booking</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Event Day</h3>
                <p className="text-sm text-gray-600">Enjoy your event with our professional support team</p>
              </div>
            </div>
          </div>

          {/* Contact & Booking */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Book Your Event?</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Our experienced events team is ready to help you plan and execute a successful event. 
              Contact us today to check availability and discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Book Now
              </Link>
              <Link 
                href="/contact" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-medium"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}