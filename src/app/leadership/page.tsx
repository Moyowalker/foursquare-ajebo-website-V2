'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function LeadershipPage() {
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

  const leadershipSections = [
    {
      title: "Board of Directors",
      description: "Meet our dedicated board members who provide governance and strategic direction",
      icon: "👔",
      href: "/leadership/board",
      color: "from-blue-400 to-purple-600",
      preview: "For more than 70 years, our board has guided the ministry with wisdom, integrity, and a clear vision for Camp Ajebo's future...",
      highlights: ["70-Year Legacy", "Strategic Leadership", "Global Ministry Vision", "Millions of Lives Touched"]
    }
  ];

  const leadershipPrinciples = [
    {
      icon: "🙏",
      title: "Servant Leadership",
      description: "We lead by serving others, following Christ's example of humble service and sacrificial love."
    },
    {
      icon: "💡",
      title: "Visionary Thinking",
      description: "Our leaders cast vision for the future while remaining grounded in biblical principles and values."
    },
    {
      icon: "🤝",
      title: "Collaborative Spirit",
      description: "We believe in teamwork and shared leadership, recognizing that we accomplish more together."
    },
    {
      icon: "🌱",
      title: "Development Focus",
      description: "We are committed to developing the next generation of leaders through mentorship and training."
    },
    {
      icon: "🎯",
      title: "Purpose-Driven",
      description: "Every leadership decision is made with our mission and vision in mind, staying true to our calling."
    },
    {
      icon: "💎",
      title: "Integrity-Based",
      description: "We maintain the highest standards of integrity, transparency, and accountability in all we do."
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

      {/* Professional Leadership Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Professional Leadership Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Professional Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/8 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-16 w-40 h-40 bg-slate-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-blue-500/8 rounded-full blur-2xl"></div>
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
                Our <span className="bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">Leadership</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-6">
                Meet the visionary leaders who have guided Foursquare Camp Ajebo for over 70 years, 
                welcoming more than 50,000 annual guests and touching millions of lives with the Gospel.
              </p>
              <div className="inline-flex items-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-blue-100 font-medium">👔 Board of Directors • �️ 70 Years of Ministry • 🌍 Millions Reached</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Professional Bottom Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,40 Q300,100 600,40 T1200,40 L1200,120 L0,120 Z" fill="rgb(15 23 42)" />
          </svg>
        </div>
      </section>

      {/* Leadership Sections Overview */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Leadership Structure
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover the dedicated leaders who make our ministry possible
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {leadershipSections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 200}>
                <FloatingElement>
                  <Link href={section.href} className="block group">
                    <GlassCard className="p-8 h-full group-hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                      <div className="text-center">
                        <div className="text-6xl mb-6">{section.icon}</div>
                        <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                          {section.title}
                        </h3>
                        <p className="text-slate-400 mb-6 font-medium text-lg">{section.description}</p>
                        <p className="text-slate-300 leading-relaxed mb-8">{section.preview}</p>
                        
                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {section.highlights.map((highlight, i) => (
                            <div key={i} className="text-sm text-slate-400 bg-slate-800/50 rounded-lg px-3 py-2 text-center">
                              {highlight}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors">
                          Meet the Team <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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

      {/* Leadership Principles */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Our Leadership Principles
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                The foundational values that guide how we lead and serve
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipPrinciples.map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 h-full group hover:scale-105 transition-all duration-500">
                    <div className="text-4xl mb-4">{principle.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {principle.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {principle.description}
                    </p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Development */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <GlassCard className="p-12 text-center">
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Developing Future Leaders
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                We believe in raising up the next generation of leaders. Through mentorship, 
                training, and hands-on experience, we're preparing young people to lead with 
                excellence in their communities and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  href="/services/ministry" 
                  variant="primary"
                  className="px-8 py-3 text-lg"
                >
                  Leadership Programs ✨
                </SpectacularButton>
                <SpectacularButton 
                  href="/contact" 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Join Our Team 🤝
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}