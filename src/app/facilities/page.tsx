'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal, Parallax, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, SpectacularCard, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function FacilitiesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const facilitySections = [
    {
      title: "Accommodation",
      description: "Comfortable lodging options for all group sizes and budgets",
      icon: "🏨",
      href: "/facilities/accommodation",
      color: "from-blue-400 to-purple-600",
      preview: "From executive suites to family chalets and youth hostels, we provide comfortable accommodation for every need...",
      highlights: ["Executive Suites", "Family Chalets", "Youth Hostels", "Standard Dormitories"]
    },
    {
      title: "Conference Halls",
      description: "State-of-the-art venues for conferences, workshops, and events",
      icon: "🎭",
      href: "/facilities/conference-halls",
      color: "from-purple-400 to-pink-600",
      preview: "Professional conference facilities with modern audiovisual equipment and flexible seating arrangements...",
      highlights: ["Main Auditorium", "Chapel", "Conference Rooms", "Outdoor Amphitheater"]
    },
    {
      title: "Recreation Facilities",
      description: "Sports, entertainment, and leisure facilities for all ages",
      icon: "⚽",
      href: "/facilities/recreation",
      color: "from-green-400 to-teal-600",
      preview: "Comprehensive recreational facilities including sports complex, swimming pool, and nature trails...",
      highlights: ["Sports Complex", "Swimming Pool", "Game Center", "Nature Trails"]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <PulsingOrb size="xl" color="purple" intensity="low" className="absolute top-[15%] left-[15%]" />
        <PulsingOrb size="lg" color="blue" intensity="medium" className="absolute top-[60%] left-[85%]" />
        <PulsingOrb size="md" color="orange" intensity="high" className="absolute top-[80%] left-[20%]" />
      </div>

      {/* Mouse Follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Architectural Facilities Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Professional Facilities Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-blue-900 to-slate-700"></div>
        
        {/* Clean Architectural Grid */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Subtle Professional Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-24 w-16 h-24 bg-blue-400/8 rounded-lg blur-sm"></div>
          <div className="absolute top-32 right-32 w-20 h-32 bg-slate-400/8 rounded-lg blur-sm"></div>
          <div className="absolute bottom-32 left-16 w-24 h-16 bg-blue-500/8 rounded-lg blur-sm"></div>
          <div className="absolute top-1/2 right-16 w-12 h-20 bg-slate-500/8 rounded-lg blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Our <span className="bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">Facilities</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-6">
                World-class facilities designed to create the perfect environment for 
                spiritual growth, learning, and fellowship.
              </p>
              <div className="inline-flex items-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-slate-200 font-medium">🏨 Accommodation • 🎭 Conference • ⚽ Recreation • 🏛️ Excellence</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Modern Architectural Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,20 L200,60 L400,30 L600,70 L800,40 L1000,65 L1200,25 L1200,120 L0,120 Z" fill="rgb(15 23 42)" />
          </svg>
        </div>
      </section>

      {/* Facility Sections Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Our Facility Categories
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Explore our comprehensive facilities designed for every aspect of your visit
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {facilitySections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 100}>
                <FloatingElement>
                  <Link href={section.href} className="block group">
                    <GlassCard className="p-8 h-full group-hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                      <div className="text-center">
                        <div className="text-6xl mb-6">{section.icon}</div>
                        <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                          {section.title}
                        </h3>
                        <p className="text-slate-400 mb-6 font-medium">{section.description}</p>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">{section.preview}</p>
                        
                        {/* Facility Highlights */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {section.highlights.map((highlight, i) => (
                            <div key={i} className="text-xs text-slate-400 bg-slate-800/50 rounded-lg px-2 py-1 text-center">
                              {highlight}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors">
                          Explore Facilities <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Additional Amenities
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Everything you need for a comfortable and memorable stay
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🚗",
                title: "Ample Parking",
                description: "Secure parking spaces for all guests",
                color: "from-blue-400 to-cyan-600"
              },
              {
                icon: "📶",
                title: "Free Wi-Fi",
                description: "High-speed internet throughout the facility",
                color: "from-purple-400 to-pink-600"
              },
              {
                icon: "🏥",
                title: "Medical Center",
                description: "On-site medical facility with qualified staff",
                color: "from-red-400 to-pink-600"
              },
              {
                icon: "🛡️",
                title: "24/7 Security",
                description: "Round-the-clock security for your safety",
                color: "from-green-400 to-teal-600"
              },
              {
                icon: "🧺",
                title: "Laundry Service",
                description: "Professional laundry and dry cleaning",
                color: "from-yellow-400 to-orange-600"
              },
              {
                icon: "🛒",
                title: "Gift Shop",
                description: "Souvenirs, books, and camp merchandise",
                color: "from-indigo-400 to-purple-600"
              }
            ].map((amenity, index) => (
              <ScrollReveal key={amenity.title} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center group hover:scale-105 transition-all duration-500">
                    <div className="text-4xl mb-4">{amenity.icon}</div>
                    <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${amenity.color} bg-clip-text text-transparent`}>
                      {amenity.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {amenity.description}
                    </p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Facility Capacity
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                We can accommodate groups of all sizes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1,200", label: "Total Sleeping Capacity", icon: "🛏️" },
              { number: "1,000", label: "Conference Seating", icon: "🪑" },
              { number: "800", label: "Dining Capacity", icon: "🍽️" },
              { number: "50+", label: "Meeting Rooms", icon: "🏛️" }
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center group hover:scale-105 transition-all duration-500">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-slate-300 font-semibold">{stat.label}</div>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-12">
              <div className="text-6xl mb-6">🎥</div>
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Experience Our Facilities
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Explore our beautiful facilities and see why Foursquare Camp Ajebo is the perfect venue 
                for your next retreat, conference, or special event.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  href="/gallery" 
                  variant="primary"
                  className="px-8 py-3 text-lg"
                >
                  View Gallery 📸
                </SpectacularButton>
                <SpectacularButton 
                  href="/contact" 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Book a Visit 🗓️
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
