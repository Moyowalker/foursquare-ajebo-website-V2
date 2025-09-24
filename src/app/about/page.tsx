import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, Eye, Heart, Map } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Foursquare Camp Ajebo',
  description: 'Learn about Foursquare Camp Ajebo, our mission, vision, values, and journey in empowering spiritual growth and community.',
  keywords: ['about', 'mission', 'vision', 'values', 'journey', 'Foursquare Camp Ajebo'],
};

export default function AboutPage() {
  const aboutSections = [
    {
      title: "Our Mission",
      description: "Discover our purpose in empowering spiritual growth",
      icon: Target,
      href: "/about/mission",
      color: "bg-blue-600",
      preview: "Empowering spiritual growth and community through worship, prayer, and fellowship..."
    },
    {
      title: "Our Vision",
      description: "Creating a serene spiritual retreat centre",
      icon: Eye,
      href: "/about/vision",
      color: "bg-slate-600",
      preview: "To provide a serene, comfortable, and secured spiritual retreat centre for worship, fellowship, and community building..."
    },
    {
      title: "Our Values",
      description: "The principles that guide everything we do",
      icon: Heart,
      href: "/about/values",
      color: "bg-gray-700",
      preview: "Faith, Community, Excellence, Love, Purpose, and Growth - the core values that shape our ministry..."
    },
    {
      title: "Our Journey",
      description: "The story of our ministry from beginning to now",
      icon: Map,
      href: "/about/journey",
      color: "bg-indigo-600",
      preview: "From humble beginnings in 2003 to becoming a transformative force in youth ministry across Nigeria..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-800 text-white py-20">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-blue-400">Our Story</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              For over five decades, Foursquare Camp Ajebo has been a beacon of hope, 
              transformation, and spiritual growth for thousands of young people across Nigeria.
            </p>
            
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-slate-200 font-medium">📖 Discover Our Journey • ⭐ Our Mission • 💎 Our Values</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Sections Overview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Learn About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into what makes Foursquare Camp Ajebo special
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aboutSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.title} href={section.href} className="block group">
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 mb-4 font-medium">{section.description}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{section.preview}</p>
                        <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                          Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 px-4 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Impact at a Glance
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Numbers that tell the story of transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Years of Ministry", icon: "🎂" },
              { number: "10,000+", label: "Lives Impacted", icon: "💝" },
              { number: "500+", label: "Annual Campers", icon: "🏕️" },
              { number: "50+", label: "Leadership Programs", icon: "👑" }
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-200 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of young people who have discovered their purpose and 
              deepened their faith at Foursquare Camp Ajebo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/events" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Upcoming Events ✨
              </Link>
              <Link 
                href="/contact" 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-lg"
              >
                Contact Us 📞
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
