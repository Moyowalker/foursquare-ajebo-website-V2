'use client';

import Link from 'next/link';
import { FoursquareLogo } from '@/components/ui/logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Simplified */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <FoursquareLogo size="xl" showText={false} />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold gradient-text">
                Foursquare Camp Ajebo
              </h1>
              <div className="w-32 h-1 gradient-primary mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              A peaceful spiritual retreat center providing world-class facilities 
              for worship, fellowship, and community gatherings in Nigeria.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-lg">
                Visit Us Today
              </Link>
              <Link href="/about" className="btn-outline px-8 py-4 text-lg">
                Learn More
              </Link>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-gray-600">Years of Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">1000+</div>
                <div className="text-gray-600">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-gray-600">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a meaningful spiritual retreat
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏨',
                title: 'Comfortable Accommodation',
                description: 'Clean, comfortable rooms designed for rest and reflection during your stay.'
              },
              {
                icon: '🏛️',
                title: 'Convention Halls',
                description: 'Modern venues equipped for conferences, worship services, and gatherings.'
              },
              {
                icon: '🌿',
                title: 'Peaceful Grounds',
                description: 'Beautiful outdoor spaces perfect for prayer, meditation, and fellowship.'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-xl border border-gray-200 hover-lift"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Our Community
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Foursquare Camp Ajebo, we are dedicated to creating a welcoming space where 
              faith grows, community thrives, and lives are transformed through God's love.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: '🙏', label: 'Worship Services' },
                { icon: '📖', label: 'Bible Study' },
                { icon: '👨‍👩‍👧‍👦', label: 'Family Ministry' },
                { icon: '🌟', label: 'Youth Programs' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary px-8 py-4 text-lg">
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA - Simplified */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Visit?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We'd love to welcome you to our community. Get in touch to plan your visit 
              or book your retreat today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-lg">
                Contact Us
              </Link>
              <Link href="/giving" className="btn-outline px-8 py-4 text-lg">
                Support Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}