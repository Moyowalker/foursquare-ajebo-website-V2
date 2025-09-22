import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bed, Wifi, Car, Coffee, Shield, Users, Phone, MapPin, Star } from 'lucide-react';
import { getFacilitiesByCategory, getAccommodationBySubcategory } from '@/lib/image-config';
import FacilityCard from '@/components/ui/FacilityCard';

export const metadata: Metadata = {
  title: 'Accommodation | Foursquare Gospel Church Ajebo',
  description: 'Comfortable and affordable accommodation facilities for church guests, visitors, and event attendees.',
  keywords: ['accommodation', 'guest house', 'lodging', 'visitors', 'church facilities', 'Foursquare Camp Ajebo'],
};

export default function AccommodationPage() {
  const accommodationFacilities = getFacilitiesByCategory('accommodation');
  const premiumFacilities = getAccommodationBySubcategory('premium');
  const leadershipFacilities = getAccommodationBySubcategory('leadership');
  const standardFacilities = getAccommodationBySubcategory('standard');
  const accommodationTypes = [
    {
      id: 1,
      name: 'Standard Rooms',
      capacity: '1-2 persons',
      price: '₦8,000/night',
      features: [
        'Air conditioning',
        'Private bathroom',
        'Free Wi-Fi',
        'Television',
        'Study desk',
        'Wardrobe'
      ],
      description: 'Comfortable and affordable rooms perfect for individual travelers or couples.',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Family Suites',
      capacity: '4-6 persons',
      price: '₦15,000/night',
      features: [
        'Separate living area',
        'Kitchenette',
        'Two bathrooms',
        'Air conditioning',
        'Free Wi-Fi',
        'Dining area'
      ],
      description: 'Spacious suites ideal for families or small groups attending church events.',
      availability: 'Limited'
    },
    {
      id: 3,
      name: 'Dormitory Beds',
      capacity: '8-12 persons',
      price: '₦3,000/night per bed',
      features: [
        'Shared facilities',
        'Bunk beds',
        'Lockers provided',
        'Common room',
        'Shared kitchen',
        'Security'
      ],
      description: 'Budget-friendly option for youth groups, conference attendees, and retreats.',
      availability: 'Available'
    },
    {
      id: 4,
      name: 'VIP Suites',
      capacity: '2-4 persons',
      price: '₦25,000/night',
      features: [
        'Executive furnishing',
        'Full kitchen',
        'Living and dining area',
        'Premium amenities',
        'Balcony/terrace',
        'Premium bedding'
      ],
      description: 'Premium accommodation for special guests, pastors, and ministry leaders.',
      availability: 'Available'
    }
  ];

  const amenities = [
    {
      icon: Wifi,
      name: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the facility'
    },
    {
      icon: Car,
      name: 'Free Parking',
      description: 'Secure parking spaces available for all guests'
    },
    {
      icon: Coffee,
      name: 'Breakfast',
      description: 'Complimentary continental breakfast included'
    },
    {
      icon: Shield,
      name: '24/7 Security',
      description: 'Round-the-clock security and surveillance'
    },
    {
      icon: Users,
      name: 'Common Areas',
      description: 'Comfortable lounges and meeting spaces'
    },
    {
      icon: Phone,
      name: 'Reception Services',
      description: 'Friendly staff available to assist guests'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/facilities" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Facilities
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Accommodation</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comfortable and affordable lodging for church guests, visitors, and event attendees
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Our Guest House</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our accommodation facility provides a comfortable, safe, and affordable place to stay 
              for church visitors, conference attendees, ministry guests, and travelers. Experience 
              Christian hospitality in a peaceful environment.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                <p className="text-gray-700 font-medium">Total Rooms</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">60+</div>
                <p className="text-gray-700 font-medium">Guest Capacity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <p className="text-gray-700 font-medium">Guest Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-700 font-medium">Security & Support</p>
              </div>
            </div>
          </div>

          {/* Our Accommodation Buildings */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Accommodation Buildings</h2>
            
            {/* Premium Accommodation */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Premium Facilities</h3>
                <Star className="w-6 h-6 text-yellow-500 ml-2" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumFacilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} showLink={false} />
                ))}
              </div>
            </div>

            {/* Leadership Accommodation */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Leadership & Ministry</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {leadershipFacilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} showLink={false} />
                ))}
              </div>
            </div>

            {/* Standard Accommodation */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Bed className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Standard Accommodation</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {standardFacilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} showLink={false} />
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Facility Amenities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{amenity.name}</h3>
                    <p className="text-sm text-gray-600">{amenity.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Booking Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Process</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                    <span>Contact our reception or fill out the online booking form</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                    <span>Provide your preferred dates and accommodation type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                    <span>Receive confirmation and payment instructions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                    <span>Complete payment to secure your reservation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies & Guidelines</h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Check-in/Check-out</h4>
                    <p className="text-sm">Check-in: 2:00 PM | Check-out: 12:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Payment</h4>
                    <p className="text-sm">50% advance payment required to confirm booking</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Cancellation</h4>
                    <p className="text-sm">Free cancellation up to 48 hours before arrival</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">House Rules</h4>
                    <p className="text-sm">No smoking, no alcohol, quiet hours 10 PM - 6 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Rates */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Special Rates & Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Church Members</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">20% Off</div>
                <p className="text-sm text-gray-600">Special discount for church members and their families</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Conference Groups</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">Group Rates</div>
                <p className="text-sm text-gray-600">Special pricing for conference attendees and groups of 10+</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Extended Stays</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">Weekly Rates</div>
                <p className="text-sm text-gray-600">Discounted rates for stays of 7 days or longer</p>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Location & Access</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-blue-100 text-sm">Church Compound, Ajebo, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Car className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Transportation</p>
                      <p className="text-blue-100 text-sm">Free pickup available from nearby bus stops</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
                <p className="text-blue-100 mb-6">
                  Ready to book your stay? Contact us today to check availability and make your reservation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
                  >
                    Book Now
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}