'use client';

import { useEffect, useRef, useState } from 'react';
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

  const leadership = [
    {
      name: "Pastor Samuel Adeyemi",
      role: "Senior Pastor & Founder",
      bio: "With over 20 years of ministry experience, Pastor Samuel has led Foursquare Ajebo with vision and passion for youth development.",
      image: "👨‍💼",
      achievements: ["Founded Ajebo Camp in 2003", "Led 50+ youth retreats", "Mentored 1000+ young people"]
    },
    {
      name: "Pastor Mary Adeyemi",
      role: "Co-Pastor & Youth Coordinator",
      bio: "Pastor Mary oversees all youth programs and coordinates camp activities with exceptional care and attention to detail.",
      image: "👩‍💼",
      achievements: ["Youth Ministry Leader", "Camp Activities Coordinator", "Counseling Specialist"]
    },
    {
      name: "Deacon John Okafor",
      role: "Camp Director",
      bio: "Deacon John manages daily operations and ensures every camper has a transformative experience at Ajebo.",
      image: "👨‍🏫",
      achievements: ["Operations Management", "Safety Coordinator", "Facilities Oversight"]
    }
  ];

  const values = [
    {
      icon: "🙏",
      title: "Faith",
      description: "Centered on Christian values and spiritual growth",
      color: "from-blue-400 to-purple-600"
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building lasting friendships and connections",
      color: "from-green-400 to-teal-600"
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Pursuing the highest standards in all we do",
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: "💖",
      title: "Love",
      description: "Demonstrating Christ's love in every interaction",
      color: "from-pink-400 to-red-600"
    },
    {
      icon: "🎯",
      title: "Purpose",
      description: "Helping young people discover their calling",
      color: "from-purple-400 to-indigo-600"
    },
    {
      icon: "🌱",
      title: "Growth",
      description: "Nurturing spiritual and personal development",
      color: "from-emerald-400 to-green-600"
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
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              For over two decades, Foursquare Ajebo has been a beacon of hope, 
              transformation, and spiritual growth for thousands of young people across Nigeria.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <GlassCard className="p-8 h-full">
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Our Mission
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  To provide a transformative spiritual experience for young people, 
                  fostering their relationship with God while developing leadership skills, 
                  character, and purpose in a beautiful, serene environment.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 h-full">
                <div className="text-4xl mb-6">👁️</div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                  Our Vision
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  To be the premier Christian youth retreat center in Nigeria, 
                  known for excellence in spiritual formation, character development, 
                  and creating lasting impact in the lives of young believers.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Our Journey
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                From humble beginnings to becoming a transformative force in youth ministry
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            <ScrollReveal delay={200}>
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-6xl">📅</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">2003 - The Beginning</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      Pastor Samuel and Mary Adeyemi, inspired by a divine vision, established 
                      Foursquare Ajebo as a small retreat center with the dream of creating 
                      a safe haven for young people to encounter God and discover their purpose.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-6xl">🏗️</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">2010 - Expansion</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      As God blessed our ministry, we expanded our facilities to include 
                      modern dormitories, a conference hall, recreational facilities, and 
                      improved dining areas to accommodate our growing community.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-6xl">🌟</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">2020 - Recognition</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      Foursquare Ajebo gained national recognition as one of Nigeria's 
                      premier Christian retreat centers, hosting international conferences 
                      and impacting thousands of lives annually.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Our Core Values
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                The principles that guide everything we do at Foursquare Ajebo
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 h-full group hover:scale-105 transition-all duration-500">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                      {value.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Our Leadership
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Passionate leaders committed to nurturing the next generation
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <ScrollReveal key={leader.name} delay={index * 200}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center group hover:scale-105 transition-all duration-500">
                    <div className="text-6xl mb-4">{leader.image}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{leader.name}</h3>
                    <p className="text-purple-400 font-semibold mb-4">{leader.role}</p>
                    <p className="text-slate-300 mb-6 text-sm leading-relaxed">{leader.bio}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">Key Achievements:</h4>
                      {leader.achievements.map((achievement, i) => (
                        <div key={i} className="text-xs text-slate-400 bg-slate-800/50 rounded-full px-3 py-1">
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Our Impact
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
