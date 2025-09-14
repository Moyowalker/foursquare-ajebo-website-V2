"use client";
import Link from 'next/link';

/**
 * Simple visible hero for debugging - guaranteed to show content
 */
export const SimpleHeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6">
          Foursquare Ajebo
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light italic text-amber-200 mb-8">
          Where Heaven Meets Earth
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
          Experience Nigeria's premier spiritual retreat destination with world-class facilities 
          and transformative worship experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/facilities"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Sacred Retreat 🏛️
          </Link>
          <Link
            href="/streaming"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
          >
            Join Live Worship 🎥
          </Link>
          <Link
            href="/giving"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
          >
            Give with Joy 💝
          </Link>
        </div>

        <div className="mt-16 text-sm text-blue-200">
          🙏 24/7 Prayer | 🏨 Luxury Suites | 📡 HD Streaming | 🌟 Group Rates
        </div>
      </div>
    </section>
  );
};

export default SimpleHeroSection;