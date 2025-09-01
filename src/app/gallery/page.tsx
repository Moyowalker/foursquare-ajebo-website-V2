'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal, Parallax, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, SpectacularCard, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function GalleryPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
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

  const categories = [
    { id: 'all', label: 'All Photos', icon: '🌟' },
    { id: 'facilities', label: 'Facilities', icon: '🏢' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'activities', label: 'Activities', icon: '⚽' },
    { id: 'worship', label: 'Worship', icon: '🙏' },
    { id: 'nature', label: 'Nature', icon: '🌿' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Main Auditorium",
      category: "facilities",
      description: "Our state-of-the-art main auditorium with seating for 1,000 guests",
      image: "🎭",
      color: "from-purple-400 to-indigo-600",
      size: "large"
    },
    {
      id: 2,
      title: "Youth Worship Session",
      category: "worship",
      description: "Powerful worship moments during our summer youth camp",
      image: "🙌",
      color: "from-blue-400 to-purple-600",
      size: "medium"
    },
    {
      id: 3,
      title: "Swimming Pool",
      category: "facilities",
      description: "Olympic-size swimming pool with safety equipment",
      image: "🏊",
      color: "from-cyan-400 to-blue-600",
      size: "medium"
    },
    {
      id: 4,
      title: "Leadership Conference",
      category: "events",
      description: "Annual leadership excellence conference with 300+ participants",
      image: "👑",
      color: "from-yellow-400 to-orange-600",
      size: "large"
    },
    {
      id: 5,
      title: "Sports Activities",
      category: "activities",
      description: "Football match during our summer camp program",
      image: "⚽",
      color: "from-green-400 to-teal-600",
      size: "small"
    },
    {
      id: 6,
      title: "Dining Hall",
      category: "facilities",
      description: "Spacious dining hall accommodating 800 guests",
      image: "🍽️",
      color: "from-orange-400 to-red-600",
      size: "medium"
    },
    {
      id: 7,
      title: "Mountain View",
      category: "nature",
      description: "Breathtaking sunrise view from our hilltop location",
      image: "🌄",
      color: "from-pink-400 to-purple-600",
      size: "large"
    },
    {
      id: 8,
      title: "Prayer Session",
      category: "worship",
      description: "Early morning prayer session in our chapel",
      image: "🙏",
      color: "from-indigo-400 to-purple-600",
      size: "small"
    },
    {
      id: 9,
      title: "Family Retreat",
      category: "events",
      description: "Families bonding during our annual family retreat",
      image: "👨‍👩‍👧‍👦",
      color: "from-green-400 to-emerald-600",
      size: "medium"
    },
    {
      id: 10,
      title: "Basketball Court",
      category: "activities",
      description: "Modern basketball court with professional standards",
      image: "🏀",
      color: "from-orange-400 to-yellow-600",
      size: "small"
    },
    {
      id: 11,
      title: "Garden Walkway",
      category: "nature",
      description: "Beautiful landscaped gardens perfect for meditation",
      image: "🌺",
      color: "from-pink-400 to-rose-600",
      size: "medium"
    },
    {
      id: 12,
      title: "Conference Workshop",
      category: "events",
      description: "Interactive workshop session with industry experts",
      image: "👥",
      color: "from-blue-400 to-indigo-600",
      size: "large"
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-1';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Youth Leader",
      text: "The facilities at Foursquare Ajebo are absolutely amazing! The spiritual atmosphere combined with modern amenities creates the perfect environment for transformation.",
      image: "👩‍💼",
      rating: 5
    },
    {
      name: "Pastor David Okon",
      role: "Conference Speaker",
      text: "I've spoken at many venues, but Foursquare Ajebo stands out. The technical setup, acoustics, and hospitality are world-class.",
      image: "👨‍💼",
      rating: 5
    },
    {
      name: "Grace Adebayo",
      role: "Camp Participant",
      text: "My time at Ajebo changed my life forever. The beautiful environment and caring staff made it an unforgettable experience.",
      image: "👩",
      rating: 5
    }
  ];

  const openLightbox = (item: any) => {
    setSelectedImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <PulsingOrb size={200} color="rgba(139, 92, 246, 0.1)" top="25%" left="5%" duration={7} />
        <PulsingOrb size={150} color="rgba(59, 130, 246, 0.1)" top="75%" left="85%" duration={9} />
        <PulsingOrb size={120} color="rgba(16, 185, 129, 0.1)" top="10%" left="70%" duration={6} />
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
              Photo Gallery
            </GradientText>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Explore the beauty of Foursquare Ajebo through captivating images of our 
              facilities, events, and the transformative moments we create together.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 50}>
                <div 
                  className={`${getSizeClass(item.size)} cursor-pointer group`}
                  onClick={() => openLightbox(item)}
                >
                  <FloatingElement>
                    <GlassCard className="w-full h-full p-0 overflow-hidden group-hover:scale-105 transition-all duration-500">
                      <div className="relative w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-slate-800 to-slate-900">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}></div>
                        <div className="relative z-10">{item.image}</div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-slate-300 text-sm line-clamp-2">{item.description}</p>
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="text-white text-sm">🔍</span>
                        </div>
                      </div>
                    </GlassCard>
                  </FloatingElement>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Virtual Tour
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Take an immersive 360° virtual tour of our facilities
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-500">
                <div className="text-6xl mb-6">🎥</div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  360° Facility Tour
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Explore every corner of our beautiful campus with our interactive virtual tour. 
                  See our accommodation, conference halls, recreational facilities, and more.
                </p>
                <SpectacularButton variant="primary" className="px-8 py-3">
                  Start Virtual Tour 🎮
                </SpectacularButton>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-500">
                <div className="text-6xl mb-6">📹</div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                  Video Testimonials
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Watch heartfelt testimonials from past participants sharing their 
                  transformative experiences at Foursquare Ajebo.
                </p>
                <SpectacularButton variant="outline" className="px-8 py-3">
                  Watch Videos ▶️
                </SpectacularButton>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                What People Say
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Real experiences from our amazing community
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 150}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center group hover:scale-105 transition-all duration-500">
                    <div className="text-5xl mb-4">{testimonial.image}</div>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Contest */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-12">
              <div className="text-6xl mb-6">📸</div>
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Share Your Moments
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Have amazing photos from your time at Ajebo? Share them with us! 
                The best photos will be featured in our gallery and social media.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton 
                  variant="primary"
                  className="px-8 py-3 text-lg"
                >
                  Submit Photos 📤
                </SpectacularButton>
                <SpectacularButton 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Photo Contest Rules 📋
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl w-full">
            <GlassCard className="p-8 text-center" onClick={(e) => e.stopPropagation()}>
              <div className="text-8xl mb-6">{selectedImage.image}</div>
              <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${selectedImage.color} bg-clip-text text-transparent`}>
                {selectedImage.title}
              </h2>
              <p className="text-xl text-slate-300 mb-8">{selectedImage.description}</p>
              <SpectacularButton 
                onClick={closeLightbox}
                variant="outline"
                className="px-8 py-3"
              >
                Close ✕
              </SpectacularButton>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
