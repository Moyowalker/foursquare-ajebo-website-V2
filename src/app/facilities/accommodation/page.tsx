import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bed, Wifi, Car, Coffee, Shield, Users, Phone, MapPin, Star } from 'lucide-react';
import { getFacilitiesByCategory, getAccommodationBySubcategory } from '@/lib/image-config';
import FacilityCard from '@/components/ui/FacilityCard';
import AccommodationBookingExperience from '@/components/facilities/AccommodationBookingExperience';

export const metadata: Metadata = {
  title: 'Accommodation | Foursquare Camp Ajebo',
  description: 'Comfortable accommodation facilities including premium guest houses, leadership quarters, and standard lodging for church guests and retreat attendees.',
  keywords: ['accommodation', 'guest house', 'lodging', 'International Guest House', 'Diamond Estate', 'Foursquare Camp Ajebo'],
};

export default function AccommodationPage() {
  const accommodationFacilities = getFacilitiesByCategory('accommodation');
  const premiumFacilities = getAccommodationBySubcategory('premium');
  const leadershipFacilities = getAccommodationBySubcategory('leadership');
  const standardFacilities = getAccommodationBySubcategory('standard');
  const commerciallyAvailableFacilities = accommodationFacilities.filter((facility) => facility.commerciallyAvailable);
  const generalMailto =
    'mailto:bookings@foursquarecamp.com?subject=Accommodation%20Booking%20Request&body=Please%20include%20your%20check-in%20date%2C%20check-out%20date%2C%20number%20of%20guests%2C%20and%20phone%20number.';

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
      name: 'Restaurant Access',
      description: 'Delish Fingers restaurant on-site for meals'
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
            Comfortable lodging facilities from premium guest houses to standard accommodation for all visitors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Foursquare Camp Ajebo</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
              Our accommodation facilities provide comfortable, safe, and peaceful lodging 
              for church visitors, conference attendees, ministry guests, and retreat participants. 
              Experience Christian hospitality in our beautiful camp setting.
            </p>

            <div className="grid md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{accommodationFacilities.length}</div>
                <p className="text-gray-700 font-medium">Buildings</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <p className="text-gray-700 font-medium">Guest Capacity</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                <p className="text-gray-700 font-medium">Service Levels</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-700 font-medium">Security & Support</p>
              </div>
            </div>
          </div>

          {/* Commercial Availability with booking */}
          <AccommodationBookingExperience facilities={commerciallyAvailableFacilities} />

          {/* Our Accommodation Buildings */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Accommodation Buildings</h2>
            
            {/* Premium Accommodation */}
            {premiumFacilities.length > 0 && (
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
            )}

            {/* Leadership Accommodation */}
            {leadershipFacilities.length > 0 && (
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
            )}

            {/* Standard Accommodation */}
            {standardFacilities.length > 0 && (
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
            )}
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
                      <p className="text-blue-100 text-sm">Foursquare Camp Ajebo, Ogun State, Nigeria</p>
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
                    href={generalMailto} 
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