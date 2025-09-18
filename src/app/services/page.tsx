'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ScrollReveal, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function ServicesPage() {
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

  const services = [
    {
      title: "Worship Services",
      description: "Powerful worship experiences that draw hearts to God",
      icon: "🙏",
      href: "/services/worship",
      color: "from-purple-400 to-pink-600",
      preview: "Join us for inspiring worship services where lives are transformed through the power of God's presence...",
      features: ["Sunday Services", "Midweek Services", "Special Celebrations", "Prayer Meetings"]
    },
    {
      title: "Events & Programs",
      description: "Life-changing camps, retreats, and special programs",
      icon: "🎪",
      href: "/services/events",
      color: "from-blue-400 to-purple-600",
      preview: "Experience transformation through our carefully designed camps, retreats, and special events...",
      features: ["Youth Camps", "Leadership Retreats", "Family Programs", "Special Events"]
    },
    {
      title: "Ministry Programs",
      description: "Discipleship and leadership development opportunities",
      icon: "👥",
      href: "/services/ministry",
      color: "from-green-400 to-teal-600",
      preview: "Grow in your faith and leadership abilities through our comprehensive ministry programs...",
      features: ["Discipleship Training", "Leadership Development", "Mentorship", "Skills Training"]
    },
    {
      title: "Live Streaming",
      description: "Connect with us online from anywhere in the world",
      icon: "📺",
      href: "/services/streaming",
      color: "from-yellow-400 to-orange-600",
      preview: "Never miss a service or event with our high-quality live streaming platform...",
      features: ["Live Services", "Event Broadcasts", "On-Demand Content", "Interactive Features"]
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
              Our Services
            </GradientText>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the many ways we serve our community and help young people 
              grow in faith, character, and purpose.
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              From powerful worship experiences to transformative programs, we offer comprehensive services 
              designed to meet you wherever you are on your spiritual journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                What We Offer
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Comprehensive services designed to nurture spiritual growth and community connection
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 100}>
                <FloatingElement>
                  <Link href={service.href} className="block group">
                    <GlassCard className="p-8 h-full group-hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                      <div className="flex items-start gap-6">
                        <div className="text-5xl">{service.icon}</div>
                        <div className="flex-1">
                          <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                            {service.title}
                          </h3>
                          <p className="text-slate-400 mb-4 font-medium">{service.description}</p>
                          <p className="text-slate-300 text-sm leading-relaxed mb-6">{service.preview}</p>
                          
                          {/* Service Features */}
                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {service.features.map((feature, i) => (
                              <div key={i} className="text-xs text-slate-400 bg-slate-800/50 rounded-full px-3 py-1 text-center">
                                {feature}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors">
                            Explore Service <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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

      {/* Service Highlights */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our Services?
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Every service is designed with excellence, love, and transformation in mind
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Purpose-Driven",
                description: "Every program is designed with clear objectives to help you grow spiritually and personally"
              },
              {
                icon: "👥",
                title: "Community-Centered",
                description: "Build lasting relationships and connections with fellow believers in a supportive environment"
              },
              {
                icon: "🌟",
                title: "Excellence in Delivery",
                description: "We maintain the highest standards in all our services, ensuring quality experiences every time"
              },
              {
                icon: "🙏",
                title: "Spirit-Led",
                description: "All our services are guided by prayer and the leading of the Holy Spirit for authentic encounters"
              },
              {
                icon: "💡",
                title: "Innovative Approach",
                description: "We use creative and modern methods while maintaining biblical foundations and values"
              },
              {
                icon: "🌱",
                title: "Growth-Focused",
                description: "Every service is designed to help you take the next step in your spiritual journey"
              }
            ].map((highlight, index) => (
              <ScrollReveal key={highlight.title} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center h-full group hover:scale-105 transition-all duration-500">
                    <div className="text-4xl mb-4">{highlight.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {highlight.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {highlight.description}
                    </p>
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
                Ready to Get Involved?
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Take the next step in your spiritual journey. Join us for any of our services 
                and experience the transformation that comes from being part of our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  href="/events" 
                  variant="primary"
                  className="px-8 py-3 text-lg"
                >
                  View Upcoming Events ✨
                </SpectacularButton>
                <SpectacularButton 
                  href="/contact" 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Get in Touch 📞
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}