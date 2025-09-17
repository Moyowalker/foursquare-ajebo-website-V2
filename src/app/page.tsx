"use client";

import { useEffect, useState } from 'react';
import SupremeHeroSection from '@/components/hero/DazzlingHeroSection';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Dazzling Spiritual Hero */}
            <SupremeHeroSection />

      {/* Features Section */}
      <section className="section-padding relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="heading-2 mb-6 animate-slide-up">
              Experience Divine Hospitality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Every detail crafted for your spiritual journey and comfort
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏨',
                title: 'Luxury Accommodation',
                description: 'Premium rooms and suites designed for comfort and tranquility, featuring modern amenities and serene views.',
                gradient: 'from-blue-500 to-cyan-500',
                delay: '0s'
              },
              {
                icon: '🏛️',
                title: 'Grand Convention Halls',
                description: 'State-of-the-art venues equipped with cutting-edge technology for unforgettable events and gatherings.',
                gradient: 'from-purple-500 to-pink-500',
                delay: '0.2s'
              },
              {
                icon: '🌿',
                title: 'Peaceful Gardens',
                description: 'Beautifully landscaped grounds perfect for meditation, reflection, and connecting with nature.',
                gradient: 'from-green-500 to-emerald-500',
                delay: '0.4s'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="card-floating hover-lift group cursor-pointer animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="card-header text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300 shadow-glow-blue`}>
                    {feature.icon}
                  </div>
                  <h3 className="heading-4 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <div className="card-content">
                  <p className="text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-grid opacity-5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Happy Guests', icon: '👥' },
              { number: '50+', label: 'Events Hosted', icon: '🎉' },
              { number: '15+', label: 'Years of Service', icon: '⭐' },
              { number: '24/7', label: 'Support Available', icon: '🛡️' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2 group-hover:animate-bounce-gentle">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card-glow p-12 animate-fade-in">
              <div className="text-6xl mb-8 animate-pulse-soft">✨</div>
              <blockquote className="text-2xl lg:text-3xl font-light text-gray-700 mb-8 leading-relaxed">
                "An absolutely transformative experience. The peace, beauty, and hospitality at Foursquare Ajebo 
                exceeded all our expectations. This is where miracles happen."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  JA
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">Rev. Johnson Adebayo</div>
                  <div className="text-gray-500">Senior Pastor, Grace Cathedral</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ministry Mission */}
      <section className="section-padding bg-gradient-to-br from-foursquare-blue-50 via-white to-foursquare-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="card-glass p-12 text-center animate-scale-in">
              <h2 className="heading-3 mb-6 bg-gradient-to-r from-foursquare-blue-600 to-foursquare-purple-600 bg-clip-text text-transparent">
                ✝️ Transforming Lives Through God's Love
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Foursquare Ajebo, we are dedicated to building a community where faith flourishes. Our mission is to 
                <span className="bg-gradient-to-r from-foursquare-blue-600 to-foursquare-purple-600 bg-clip-text text-transparent font-semibold"> spread the Gospel</span> and 
                nurture spiritual growth through fellowship, worship, and service.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { status: '🙏', label: 'Worship & Prayer', color: 'text-foursquare-red-500' },
                  { status: '�', label: 'Bible Study', color: 'text-foursquare-blue-500' },
                  { status: '👨‍👩‍👧‍👦', label: 'Family Ministry', color: 'text-foursquare-purple-500' },
                  { status: '🌟', label: 'Youth Camps', color: 'text-foursquare-orange-500' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover-lift animate-slide-up border border-white/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`text-2xl mb-2 ${item.color}`}>{item.status}</div>
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-foursquare-blue-600 to-foursquare-purple-600 text-white px-8 py-4 rounded-xl inline-block">
                <span className="font-semibold">Join Our Community?</span>
                <span className="ml-2 opacity-90">Come experience God's love with us.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (Optional) Floating Action Button retained; can be repositioned later if needed */}
      <button className="btn-floating group" aria-label="Contact us">
        <span className="text-2xl group-hover:animate-wiggle" aria-hidden>📞</span>
      </button>
    </div>
  );
}
