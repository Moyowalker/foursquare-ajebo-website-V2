'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal, Parallax, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, SpectacularCard, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function FacilitiesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('accommodation');
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

  const facilities = {
    accommodation: [
      {
        name: "Executive Suites",
        capacity: "2-4 guests",
        features: ["Air conditioning", "Private bathroom", "Wi-Fi", "Flat screen TV", "Mini fridge"],
        icon: "🏨",
        color: "from-purple-400 to-pink-600",
        description: "Luxurious suites perfect for leaders and VIP guests"
      },
      {
        name: "Standard Dormitories",
        capacity: "8-12 guests",
        features: ["Bunk beds", "Shared bathrooms", "Ceiling fans", "Storage lockers", "Reading lights"],
        icon: "🏠",
        color: "from-blue-400 to-cyan-600",
        description: "Comfortable shared accommodation for campers"
      },
      {
        name: "Family Chalets",
        capacity: "4-6 guests",
        features: ["Private bathroom", "Living area", "Kitchenette", "Balcony", "Garden view"],
        icon: "🏡",
        color: "from-green-400 to-teal-600",
        description: "Perfect for families attending camp together"
      },
      {
        name: "Youth Hostels",
        capacity: "16-20 guests",
        features: ["Large dormitory", "Common area", "Study space", "Recreation corner", "24/7 security"],
        icon: "🏢",
        color: "from-orange-400 to-red-600",
        description: "Budget-friendly option for large youth groups"
      }
    ],
    conference: [
      {
        name: "Main Auditorium",
        capacity: "1,000 seats",
        features: ["Professional sound system", "LED screens", "Stage lighting", "AC", "Live streaming setup"],
        icon: "🎭",
        color: "from-purple-400 to-indigo-600",
        description: "State-of-the-art venue for main sessions and conferences"
      },
      {
        name: "Chapel",
        capacity: "300 seats",
        features: ["Intimate setting", "Prayer altar", "Piano", "Natural lighting", "Peaceful ambiance"],
        icon: "⛪",
        color: "from-blue-400 to-purple-600",
        description: "Sacred space for worship and meditation"
      },
      {
        name: "Conference Rooms",
        capacity: "50-100 guests",
        features: ["Projectors", "Whiteboards", "AC", "Flexible seating", "Breakout spaces"],
        icon: "🏛️",
        color: "from-green-400 to-blue-600",
        description: "Perfect for workshops and small group sessions"
      },
      {
        name: "Outdoor Amphitheater",
        capacity: "500 guests",
        features: ["Natural setting", "Covered stage", "Hillside seating", "Scenic backdrop", "Evening events"],
        icon: "🌳",
        color: "from-yellow-400 to-green-600",
        description: "Beautiful outdoor venue under the stars"
      }
    ],
    recreation: [
      {
        name: "Sports Complex",
        capacity: "Multiple fields",
        features: ["Football field", "Basketball court", "Volleyball court", "Tennis court", "Equipment provided"],
        icon: "⚽",
        color: "from-orange-400 to-red-600",
        description: "Complete sports facilities for active recreation"
      },
      {
        name: "Swimming Pool",
        capacity: "50 swimmers",
        features: ["Olympic size", "Lifeguard on duty", "Pool deck", "Changing rooms", "Safety equipment"],
        icon: "🏊",
        color: "from-cyan-400 to-blue-600",
        description: "Refreshing pool for recreation and water activities"
      },
      {
        name: "Game Center",
        capacity: "Indoor activities",
        features: ["Board games", "Video games", "Pool table", "Table tennis", "Chess sets"],
        icon: "🎮",
        color: "from-purple-400 to-pink-600",
        description: "Indoor entertainment for all ages"
      },
      {
        name: "Nature Trails",
        capacity: "Unlimited",
        features: ["Hiking paths", "Bird watching", "Photography spots", "Meditation areas", "Guided tours"],
        icon: "🥾",
        color: "from-green-400 to-emerald-600",
        description: "Explore the beautiful natural surroundings"
      }
    ],
    dining: [
      {
        name: "Main Dining Hall",
        capacity: "800 guests",
        features: ["Buffet service", "Local & international cuisine", "Dietary accommodations", "AC", "Scenic views"],
        icon: "🍽️",
        color: "from-yellow-400 to-orange-600",
        description: "Spacious dining facility serving delicious meals"
      },
      {
        name: "Café & Snack Bar",
        capacity: "100 guests",
        features: ["Light meals", "Beverages", "Snacks", "Wi-Fi", "Casual atmosphere"],
        icon: "☕",
        color: "from-brown-400 to-orange-600",
        description: "Perfect spot for coffee breaks and casual meals"
      },
      {
        name: "Outdoor Barbecue Area",
        capacity: "200 guests",
        features: ["Grilling stations", "Picnic tables", "Garden setting", "Group cooking", "Evening gatherings"],
        icon: "🔥",
        color: "from-red-400 to-pink-600",
        description: "Enjoy outdoor cooking and dining experiences"
      },
      {
        name: "Private Dining Rooms",
        capacity: "20-50 guests",
        features: ["Intimate setting", "Custom menus", "Service staff", "Special occasions", "Group bookings"],
        icon: "🥂",
        color: "from-purple-400 to-indigo-600",
        description: "Exclusive dining for special events and VIP groups"
      }
    ]
  };

  const tabs = [
    { id: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { id: 'conference', label: 'Conference', icon: '🎭' },
    { id: 'recreation', label: 'Recreation', icon: '⚽' },
    { id: 'dining', label: 'Dining', icon: '🍽️' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <PulsingOrb size={250} color="rgba(139, 92, 246, 0.1)" top="15%" left="15%" duration={5} />
        <PulsingOrb size={180} color="rgba(59, 130, 246, 0.1)" top="60%" left="85%" duration={7} />
        <PulsingOrb size={120} color="rgba(16, 185, 129, 0.1)" top="80%" left="20%" duration={4} />
      </div>

      {/* Mouse Follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <GradientText className="text-6xl md:text-8xl font-bold mb-8">
              Our Facilities
            </GradientText>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              World-class facilities designed to create the perfect environment for 
              spiritual growth, learning, and fellowship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Facility Tabs */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {facilities[activeTab as keyof typeof facilities].map((facility, index) => (
              <ScrollReveal key={facility.name} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-8 h-full group hover:scale-105 transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${facility.color} bg-clip-text text-transparent`}>
                          {facility.name}
                        </h3>
                        <p className="text-purple-400 font-semibold mb-3">
                          Capacity: {facility.capacity}
                        </p>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                          {facility.description}
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-yellow-400 mb-3">Features:</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {facility.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                                <span className="text-sm text-slate-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
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
                Take a Virtual Tour
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Explore our beautiful facilities from the comfort of your home. 
                See why Foursquare Ajebo is the perfect venue for your next event.
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
