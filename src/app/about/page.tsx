'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ScrollReveal, Parallax, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, SpectacularCard, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function AboutPage() {
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

  const aboutSections = [
    {
      title: "Our Mission",
      description: "Discover our purpose in empowering spiritual growth",
      icon: "🎯",
      href: "/about/mission",
      color: "from-blue-400 to-purple-600",
      preview: "Empowering spiritual growth and community through worship, prayer, and fellowship..."
    },
    {
      title: "Our Vision",
      description: "Creating a serene spiritual retreat centre",
      icon: "👁️",
      href: "/about/vision",
      color: "from-green-400 to-teal-600",
      preview: "To provide a serene, comfortable, and secured spiritual retreat centre for worship, fellowship, and community building..."
    },
    {
      title: "Our Values",
      description: "The principles that guide everything we do",
      icon: "💎",
      href: "/about/values",
      color: "from-yellow-400 to-orange-600",
      preview: "Faith, Community, Excellence, Love, Purpose, and Growth - the core values that shape our ministry..."
    },
    {
      title: "Our Journey",
      description: "The story of our ministry from beginning to now",
      icon: "🛤️",
      href: "/about/journey",
      color: "from-purple-400 to-pink-600",
      preview: "From humble beginnings in 2003 to becoming a transformative force in youth ministry across Nigeria..."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <PulsingOrb size="xl" color="purple" intensity="low" className="absolute top-[10%] left-[10%]" />
        <PulsingOrb size="lg" color="blue" intensity="medium" className="absolute top-[70%] left-[80%]" />
        <PulsingOrb size="md" color="orange" intensity="high" className="absolute top-[40%] left-[60%]" />
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
              About Us
            </GradientText>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              For over two decades, Foursquare Ajebo has been a beacon of hope, 
              transformation, and spiritual growth for thousands of young people across Nigeria.
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Explore our story, mission, and the values that drive our ministry forward.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Sections Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Learn About Us
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Dive deeper into what makes Foursquare Ajebo special
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {aboutSections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 100}>
                <FloatingElement>
                  <Link href={section.href} className="block group">
                    <GlassCard className="p-8 h-full group-hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                      <div className="flex items-start gap-6">
                        <div className="text-4xl">{section.icon}</div>
                        <div className="flex-1">
                          <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${section.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                            {section.title}
                          </h3>
                          <p className="text-slate-400 mb-4 font-medium">{section.description}</p>
                          <p className="text-slate-300 text-sm leading-relaxed mb-4">{section.preview}</p>
                          <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors">
                            Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                          </div>
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

      {/* Quick Stats Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Our Impact at a Glance
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Numbers that tell the story of transformation
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Years of Ministry", icon: "🎂" },
              { number: "10,000+", label: "Lives Impacted", icon: "💝" },
              { number: "500+", label: "Annual Campers", icon: "🏕️" },
              { number: "50+", label: "Leadership Programs", icon: "👑" }
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

      {/* Call to Action */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-12">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Be Part of Our Story
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join thousands of young people who have discovered their purpose and 
                deepened their faith at Foursquare Ajebo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  href="/events" 
                  variant="primary"
                  className="px-8 py-3 text-lg"
                >
                  Upcoming Events ✨
                </SpectacularButton>
                <SpectacularButton 
                  href="/contact" 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Contact Us 📞
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
