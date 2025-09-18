import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Mic, Monitor, Coffee, Car, Wifi, Star, Calendar, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conference Halls | Foursquare Gospel Church Ajebo',
  description: 'Modern conference halls and meeting spaces available for events, seminars, workshops, and corporate functions.',
  keywords: ['conference halls', 'meeting rooms', 'events', 'seminars', 'corporate', 'Foursquare Camp Ajebo'],
};

export default function ConferenceHallsPage() {
  const conferenceHalls = [
    {
      id: 1,
      name: 'Main Auditorium',
      capacity: '500-800 persons',
      seating: ['Theater style: 800', 'Banquet style: 500', 'Classroom style: 400'],
      price: '₦100,000/day',
      features: [
        'Professional sound system',
        'LED screens and projectors',
        'Stage lighting',
        'Air conditioning',
        'Wheelchair accessible',
        'Live streaming capability'
      ],
      description: 'Our largest venue perfect for conferences, conventions, and major events.',
      image: '/images/facilities/main-auditorium.jpg',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Fellowship Hall',
      capacity: '200-300 persons',
      seating: ['Theater style: 300', 'Banquet style: 200', 'U-shape: 80'],
      price: '₦50,000/day',
      features: [
        'Built-in audio system',
        'Projection screen',
        'Natural lighting',
        'Air conditioning',
        'Kitchen access',
        'Flexible seating'
      ],
      description: 'Versatile space ideal for seminars, workshops, and medium-sized gatherings.',
      image: '/images/facilities/fellowship-hall.jpg',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Board Room',
      capacity: '20-30 persons',
      seating: ['Boardroom style: 30', 'U-shape: 25', 'Conference: 20'],
      price: '₦15,000/day',
      features: [
        'Conference table setup',
        'Video conferencing',
        'Whiteboard and flipcharts',
        'High-speed internet',
        'Coffee station',
        'Private entrance'
      ],
      description: 'Executive meeting space for board meetings, planning sessions, and small groups.',
      image: '/images/facilities/board-room.jpg',
      availability: 'Limited'
    },
    {
      id: 4,
      name: 'Training Rooms (3)',
      capacity: '30-50 persons each',
      seating: ['Classroom style: 50', 'Workshop style: 40', 'Circle: 30'],
      price: '₦25,000/day per room',
      features: [
        'Interactive whiteboards',
        'Breakout capabilities',
        'Individual lighting',
        'Moveable furniture',
        'Storage space',
        'Sound isolation'
      ],
      description: 'Perfect for training sessions, workshops, and breakout meetings.',
      image: '/images/facilities/training-rooms.jpg',
      availability: 'Available'
    }
  ];

  const services = [
    {
      icon: Mic,
      name: 'Audio/Visual Equipment',
      description: 'Professional sound systems, microphones, projectors, and screens',
      included: true
    },
    {
      icon: Monitor,
      name: 'Technical Support',
      description: 'On-site technical support for all equipment and systems',
      included: true
    },
    {
      icon: Coffee,
      name: 'Catering Services',
      description: 'Full catering services for meals, refreshments, and coffee breaks',
      included: false
    },
    {
      icon: Car,
      name: 'Parking',
      description: 'Ample free parking spaces for all attendees',
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
      name: 'Event Coordination',
      description: 'Professional event coordination and setup services',
      included: false
    }
  ];

  const packages = [
    {
      name: 'Basic Package',
      price: 'Starting from ₦15,000',
      duration: 'Half Day (4 hours)',
      features: [
        'Room rental',
        'Basic AV equipment',
        'Wi-Fi access',
        'Basic setup',
        'Parking'
      ],
      popular: false
    },
    {
      name: 'Standard Package',
      price: 'Starting from ₦25,000',
      duration: 'Full Day (8 hours)',
      features: [
        'Room rental',
        'Full AV equipment',
        'Wi-Fi access',
        'Professional setup',
        'Parking',
        'Coffee breaks (2)'
      ],
      popular: true
    },
    {
      name: 'Premium Package',
      price: 'Starting from ₦50,000',
      duration: 'Full Day + Extended',
      features: [
        'Room rental',
        'Premium AV equipment',
        'Wi-Fi access',
        'Event coordination',
        'Parking',
        'Full catering',
        'Technical support'
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conference Halls</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Modern, well-equipped spaces for conferences, seminars, workshops, and corporate events
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Event Spaces</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our state-of-the-art conference facilities provide the perfect environment for your 
              corporate events, seminars, workshops, and special gatherings. With modern technology 
              and professional support, we ensure your event is a success.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">7</div>
                <p className="text-gray-700 font-medium">Event Spaces</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1,200+</div>
                <p className="text-gray-700 font-medium">Total Capacity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <p className="text-gray-700 font-medium">Events Hosted</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-gray-700 font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Conference Halls */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Venues</h2>
            <div className="space-y-8">
              {conferenceHalls.map((hall) => (
                <div key={hall.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{hall.name}</h3>
                          <p className="text-indigo-600 font-medium mb-1">{hall.capacity}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            hall.availability === 'Available' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {hall.availability}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{hall.price}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{hall.description}</p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Seating Arrangements</h4>
                        <div className="space-y-1">
                          {hall.seating.map((arrangement, index) => (
                            <p key={index} className="text-sm text-gray-600">• {arrangement}</p>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Features & Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {hall.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
                      <div className="text-center">
                        <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Hall Image</p>
                        <p className="text-sm text-gray-400">{hall.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-8 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Starting from {hall.price}</span>
                        <span>•</span>
                        <span>{hall.capacity}</span>
                      </div>
                      <Link 
                        href="/contact" 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Book Now
                      </Link>
                    </div>
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
                  <div key={index} className="relative">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
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
                <p className="text-sm text-gray-600">Contact us with your preferred dates and requirements</p>
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