'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FoursquareLogo } from '@/components/ui/logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Rich Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Beautiful Multi-layered Background */}
        <div className="absolute inset-0 z-0">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
          
          {/* Secondary overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/50 via-transparent to-purple-800/50"></div>
          
          {/* Animated floating elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <FoursquareLogo size="xl" showText={false} className="brightness-0 invert" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Foursquare Camp Ajebo
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-xl md:text-2xl text-yellow-100 font-medium">
                Where Faith Meets Fellowship
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Experience world-class spiritual retreat facilities in the heart of Nigeria. 
              Our peaceful campus offers everything you need for worship, fellowship, 
              conferences, and meaningful community gatherings.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/contact" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Visit
              </Link>
              <Link href="/facilities" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300">
                Explore Facilities
              </Link>
            </div>

            {/* Enhanced Stats with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
                <div className="text-gray-200 font-medium">Years of Service</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
                <div className="text-gray-200 font-medium">Happy Guests</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-gray-200 font-medium">Events Hosted</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-200 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Facilities Section - Image Rich */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              World-Class Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive range of modern facilities designed to support 
              your spiritual journey, conferences, retreats, and community gatherings.
            </p>
          </div>

          {/* Main Featured Facilities Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* International Guest House */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/accommodation/guest-house-interior.jpg"
                  alt="International Guest House Interior"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/accommodation/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">International Guest House</h3>
                  <p className="text-gray-200">Premium accommodation with modern amenities and peaceful surroundings</p>
                </div>
              </div>
            </div>

            {/* Grand Auditorium */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/conference/auditorium-main.jpg"
                  alt="Grand Auditorium"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/conference/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Grand Auditorium</h3>
                  <p className="text-gray-200">State-of-the-art venue for large conferences and worship services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Delish Fingers Restaurant */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/facilities/dining/restaurant-interior.jpg"
                  alt="Delish Fingers Restaurant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/dining/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Delish Fingers</h4>
                <p className="text-sm text-gray-200">Fine Dining Restaurant</p>
              </div>
            </div>

            {/* Sports & Recreation */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/facilities/recreation/sports-complex.jpg"
                  alt="Sports & Recreation Center"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/recreation/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Sports Centre</h4>
                <p className="text-sm text-gray-200">Recreation & Wellness</p>
              </div>
            </div>

            {/* Conference Rooms */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/facilities/conference/meeting-room.jpg"
                  alt="Conference Meeting Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/conference/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Meeting Rooms</h4>
                <p className="text-sm text-gray-200">Private Conferences</p>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/facilities/infrastructure/campus-grounds.jpg"
                  alt="Campus Infrastructure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/infrastructure/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-bold text-lg">Campus Grounds</h4>
                <p className="text-sm text-gray-200">Beautiful Infrastructure</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link 
              href="/facilities" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore All Facilities
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Gallery & Experience Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Experience Our Beautiful Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Step into a serene environment designed for spiritual growth, fellowship, 
              and meaningful connections in the heart of Nigeria.
            </p>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/images/facilities/infrastructure/main-gate.jpg"
                  alt="Foursquare Camp Ajebo Main Entrance"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/facilities/infrastructure/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">Welcome to Camp Ajebo</h4>
                </div>
              </div>
            </div>

            {/* Gallery images */}
            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/accommodation/guest-rooms.jpg"
                alt="Comfortable Guest Rooms"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/facilities/accommodation/placeholder.jpg";
                }}
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/dining/outdoor-dining.jpg"
                alt="Outdoor Dining Area"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/facilities/dining/placeholder.jpg";
                }}
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/recreation/garden-area.jpg"
                alt="Beautiful Garden Areas"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/facilities/recreation/placeholder.jpg";
                }}
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/conference/worship-hall.jpg"
                alt="Worship Hall"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/facilities/conference/placeholder.jpg";
                }}
              />
            </div>
          </div>

          {/* Statistics Row */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-12 px-8 text-white mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Guest Capacity</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-blue-100">Facility Types</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Hospitality Service</div>
              </div>
            </div>
          </div>

          {/* Experience Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🙏',
                title: 'Worship Services',
                description: 'Join our uplifting worship services in our beautiful auditorium'
              },
              {
                icon: '🏨',
                title: 'Comfortable Stay',
                description: 'Experience peaceful rest in our well-appointed guest facilities'
              },
              {
                icon: '🍽️',
                title: 'Fine Dining',
                description: 'Enjoy delicious meals at our Delish Fingers restaurant'
              },
              {
                icon: '�',
                title: 'Peaceful Grounds',
                description: 'Find tranquility in our beautifully landscaped campus'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link 
              href="/gallery" 
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Full Gallery
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual CTA Section with Contact */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/facilities/infrastructure/sunset-campus.jpg"
            alt="Beautiful Campus at Sunset"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Experience Camp Ajebo?
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Whether you're planning a spiritual retreat, conference, wedding, or family gathering, 
              we're here to make your event unforgettable. Contact us today to begin your journey.
            </p>

            {/* Contact Options Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-blue-100 mb-4">Quick inquiries & bookings</p>
                <a 
                  href="https://wa.me/2347036555871" 
                  className="text-green-400 hover:text-green-300 font-semibold"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  +234 703 655 5871
                </a>
              </div>

              {/* Phone Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-blue-100 mb-4">Reception & reservations</p>
                <a 
                  href="tel:+2347032192546" 
                  className="text-blue-300 hover:text-blue-200 font-semibold"
                >
                  +234 703 219 2546
                </a>
              </div>

              {/* Email Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-blue-100 mb-4">Detailed inquiries</p>
                <a 
                  href="mailto:info@foursquarecampajebo.org" 
                  className="text-purple-300 hover:text-purple-200 font-semibold"
                >
                  info@foursquarecampajebo.org
                </a>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold px-12 py-5 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Book Your Stay Now
              </Link>
              <Link 
                href="/facilities" 
                className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 font-semibold px-12 py-5 rounded-full text-xl transition-all duration-300"
              >
                Explore Our Facilities
              </Link>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-blue-200">
              <Link href="/giving" className="hover:text-white transition-colors duration-200">
                Support Our Mission
              </Link>
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link href="/events" className="hover:text-white transition-colors duration-200">
                Upcoming Events
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors duration-200">
                Photo Gallery
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      </section>
    </div>
  );
}