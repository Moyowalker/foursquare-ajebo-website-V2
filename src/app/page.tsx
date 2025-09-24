import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dynamic and Engaging */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-teal-700 to-sky-800">
            <Image
              src="/images/facilities/real/main-conference-hall.jpeg"
              alt="Rev. Gabriel Adome Building - Foursquare Camp Ajebo Main Conference Center"
              fill
              className="object-cover mix-blend-overlay animate-pulse"
              priority
            />
          </div>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/80 to-sky-900/90 animate-pulse"></div>
          
          {/* Floating particles/elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-2 h-2 bg-amber-200 rounded-full animate-bounce opacity-70"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-white/30 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-32 left-20 w-1 h-1 bg-teal-200 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute top-60 left-1/3 w-2 h-2 bg-sky-200 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center space-y-8 max-w-6xl mx-auto">
            {/* Animated Church Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30 shadow-2xl transform hover:scale-110 transition-all duration-500 hover:bg-white/30">
                <Image
                  src="/images/church-logo.jpg"
                  alt="Foursquare Logo"
                  width={80}
                  height={80}
                  className="rounded-full animate-pulse"
                />
              </div>
            </div>

            {/* Dynamic Main Heading with Gradient Text */}
            <div className="space-y-6 transform translate-y-0 animate-fadeInUp">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-teal-200 leading-tight tracking-wide animate-pulse">
                Foursquare Camp <span className="font-medium bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Ajebo</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-teal-300 mx-auto rounded-full animate-pulse"></div>
              <p className="text-2xl md:text-4xl bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent font-light tracking-wider animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                Where Faith Meets Fellowship
              </p>
            </div>

            {/* Enhanced Subtitle with Typewriter Effect Feel */}
            <div className="transform translate-y-0 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-light shadow-lg">
                Discover serenity and spiritual growth in our peaceful retreat center. 
                <span className="text-amber-200 font-medium"> Nestled in natural beauty</span>, we offer world-class facilities for worship, 
                conferences, and meaningful community gatherings.
              </p>
            </div>

            {/* Enhanced CTA Buttons with Animations */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12 transform translate-y-0 animate-fadeInUp" style={{animationDelay: '0.9s'}}>
              <Link 
                href="/contact" 
                className="group relative bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold px-16 py-5 rounded-full text-xl transition-all duration-500 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-110 overflow-hidden"
              >
                <span className="relative z-10">Plan Your Visit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              </Link>
              <Link 
                href="/facilities" 
                className="group relative bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 font-semibold px-16 py-5 rounded-full text-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <span className="relative z-10">Explore Our Campus</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              </Link>
            </div>

            {/* Interactive Stats with Hover Effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-20 transform translate-y-0 animate-fadeInUp" style={{animationDelay: '1.2s'}}>
              <div className="group text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover:bg-white/20 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="text-5xl font-light bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">20+</div>
                <div className="text-white/90 font-medium text-lg group-hover:text-white transition-colors duration-300">Years Serving</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-amber-300 to-teal-300 mx-auto mt-2 transition-all duration-500"></div>
              </div>
              <div className="group text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover:bg-white/20 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer" style={{animationDelay: '0.1s'}}>
                <div className="text-5xl font-light bg-gradient-to-r from-teal-200 to-sky-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">10,000+</div>
                <div className="text-white/90 font-medium text-lg group-hover:text-white transition-colors duration-300">Lives Touched</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-300 to-sky-300 mx-auto mt-2 transition-all duration-500"></div>
              </div>
              <div className="group text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover:bg-white/20 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer" style={{animationDelay: '0.2s'}}>
                <div className="text-5xl font-light bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-white/90 font-medium text-lg group-hover:text-white transition-colors duration-300">Annual Guests</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 mx-auto mt-2 transition-all duration-500"></div>
              </div>
              <div className="group text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl hover:bg-white/20 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer" style={{animationDelay: '0.3s'}}>
                <div className="text-5xl font-light bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-white/90 font-medium text-lg group-hover:text-white transition-colors duration-300">Hospitality</div>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto mt-2 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About the Camp & Mission Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 leading-tight">
                    A Sacred Space for <span className="text-teal-700">Spiritual Growth</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-teal-600 mb-8"></div>
                </div>
                
                <p className="text-xl text-stone-600 leading-relaxed font-light">
                  For over two decades, Foursquare Camp Ajebo has been a sanctuary where faith deepens, 
                  community flourishes, and hearts are transformed. Nestled in the serene landscape of 
                  Nigeria, our camp offers a peaceful retreat from the world's distractions.
                </p>
                
                <p className="text-lg text-stone-600 leading-relaxed">
                  Whether you're seeking personal renewal, planning a spiritual retreat, or organizing 
                  a conference, our facilities and community provide the perfect environment for 
                  meaningful encounters with God and one another.
                </p>

                {/* Mission Pillars */}
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Worship</h3>
                    <p className="text-sm text-stone-600">Authentic spiritual experiences</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Fellowship</h3>
                    <p className="text-sm text-stone-600">Genuine Christian community</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📖</span>
                    </div>
                    <h3 className="font-medium text-stone-800 mb-2">Learning</h3>
                    <p className="text-sm text-stone-600">Biblical teaching and growth</p>
                  </div>
                </div>

                <div className="pt-8">
                  <Link 
                    href="/about" 
                    className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium transition-colors"
                  >
                    Learn more about our story
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
                  <Image
                    src="/images/facilities/real/international-guest-house.jpeg"
                    alt="International Guest House - Premium Accommodation at Camp Ajebo"
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-100 rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Programs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Activities & Faith-Based Programs
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Experience diverse programs designed to strengthen your faith, build community, 
              and create lasting spiritual memories.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Spiritual Retreats */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-emerald-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/jehovah-shammah-house.jpg"
                  alt="Jehovah Shammah House - Peaceful Retreat Accommodation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Spiritual Retreats</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Escape from daily distractions and focus on deepening your relationship with God 
                  through prayer, meditation, and biblical study.
                </p>
                <div className="flex items-center text-teal-700 font-medium">
                  <span className="text-sm">Learn more</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Worship Services */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-sky-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/main-conference-hall.jpg"
                  alt="Rev. Gabriel Adome Building - Main Worship and Conference Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Worship Services</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Join us for uplifting worship experiences with contemporary music, 
                  inspiring messages, and heartfelt communion with God.
                </p>
                <div className="flex items-center text-sky-700 font-medium">
                  <span className="text-sm">Service times</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Conferences & Events */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-amber-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/accommodation/executive-guest-house.jpg"
                  alt="Executive Guest House - Premium Conference Accommodation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Conferences & Events</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Host your spiritual conferences, leadership training, and special events 
                  in our well-equipped facilities.
                </p>
                <div className="flex items-center text-amber-700 font-medium">
                  <span className="text-sm">Plan event</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Youth Programs */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-rose-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/outdoor-stadium.jpg"
                  alt="Sports Stadium - Youth Recreation and Activities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Youth Programs</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Dynamic programs designed to engage young people in faith, leadership, 
                  and community service through fun and meaningful activities.
                </p>
                <div className="flex items-center text-rose-700 font-medium">
                  <span className="text-sm">Join youth</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Community Outreach */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-teal-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/dining-restaurant.jpg"
                  alt="Delishringers Restaurant - Community Dining and Fellowship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Community Outreach</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Serve the local community through charitable works, educational programs, 
                  and initiatives that demonstrate God's love in action.
                </p>
                <div className="flex items-center text-teal-700 font-medium">
                  <span className="text-sm">Get involved</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Prayer & Meditation */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-indigo-100 overflow-hidden">
                <Image
                  src="/images/facilities/real/modern-guest-rooms.jpg"
                  alt="Modern Guest Houses - Peaceful Accommodation for Prayer and Reflection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Prayer & Meditation</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Find quiet spaces for personal prayer and meditation in our peaceful 
                  garden areas and dedicated prayer rooms.
                </p>
                <div className="flex items-center text-indigo-700 font-medium">
                  <span className="text-sm">Find peace</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Facilities Showcase */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Premium Facilities & Accommodations
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Experience comfort and tranquility in our thoughtfully designed facilities, 
              crafted to support your spiritual journey and community gatherings.
            </p>
          </div>

          {/* Featured Facilities */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Guest House */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/real/accommodation/international-guest-house.jpg"
                  alt="International Guest House - Premium Accommodation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-light mb-3">Guest Accommodations</h3>
                  <p className="text-stone-200 font-light">Comfortable rooms designed for rest and reflection</p>
                </div>
              </div>
            </div>

            {/* Conference Center */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/images/facilities/real/conference/gabriel-adombe-building.jpg"
                  alt="Gabriel Adombe Building - Main Conference Center"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-light mb-3">Conference Center</h3>
                  <p className="text-stone-200 font-light">Modern venues for worship and gatherings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Delish Fingers Restaurant</h4>
              <p className="text-sm text-stone-600">Fine dining with local and international cuisine</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Recreation Center</h4>
              <p className="text-sm text-stone-600">Sports facilities and wellness activities</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Beautiful Grounds</h4>
              <p className="text-sm text-stone-600">Landscaped gardens perfect for reflection</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="font-medium text-stone-800 mb-2">Meeting Rooms</h4>
              <p className="text-sm text-stone-600">Intimate spaces for prayer and discussion</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/facilities" 
              className="inline-flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              Explore All Facilities
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Gallery & Experience Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Experience Our Beautiful Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Step into a serene environment designed for spiritual growth, fellowship, 
              and meaningful connections in the heart of Nigeria.
            </p>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/images/facilities/infrastructure/main-gate.jpg"
                  alt="Foursquare Camp Ajebo Main Entrance"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">Welcome to Camp Ajebo</h4>
                </div>
              </div>
            </div>

            {/* Gallery images */}
            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/real/modern-guest-rooms.jpg"
                alt="Modern Guest Rooms - Premium Accommodation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/real/dining-restaurant.jpg"
                alt="Delishringers Restaurant - Quality Dining Experience"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/real/jehovah-shammah-house.jpg"
                alt="Jehovah Shammah House - Spiritual Retreat Center"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="/images/facilities/real/outdoor-stadium.jpg"
                alt="Outdoor Stadium - Recreation and Events"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Statistics Row */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-12 px-8 text-white mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Guest Capacity</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-blue-100">Facility Types</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Hospitality Service</div>
              </div>
            </div>
          </div>

          {/* Experience Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🙏',
                title: 'Worship Services',
                description: 'Join our uplifting worship services in our beautiful auditorium'
              },
              {
                icon: '🏨',
                title: 'Comfortable Stay',
                description: 'Experience peaceful rest in our well-appointed guest facilities'
              },
              {
                icon: '🍽️',
                title: 'Fine Dining',
                description: 'Enjoy delicious meals at our Delish Fingers restaurant'
              },
              {
                icon: '�',
                title: 'Peaceful Grounds',
                description: 'Find tranquility in our beautifully landscaped campus'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link 
              href="/gallery" 
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Full Gallery
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery & Campus Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Campus Highlights & Gallery
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Discover the beauty and serenity of our campus through these glimpses 
              of life at Foursquare Camp Ajebo.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {/* Featured large image */}
            <div className="col-span-2 row-span-2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div style={{background: 'linear-gradient(135deg, #065f46 0%, #0891b2 100%)'}} className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-6xl block mb-4">⛪</span>
                    <h4 className="font-light text-xl">Welcome to Our Sacred Space</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery thumbnails */}
            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: '#0891b2'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🏨</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: '#059669'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🍽️</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🌿</span>
              </div>
            </div>

            <div className="relative h-36 lg:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
              <div style={{background: 'linear-gradient(135deg, #0891b2 0%, #7c2d12 100%)'}} className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-white">🏃</span>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="bg-teal-700 rounded-2xl py-16 px-8 text-white mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-light mb-4">Our Community Impact</h3>
                <div className="w-12 h-0.5 bg-amber-200 mx-auto"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">500+</div>
                  <div className="text-teal-100 font-light">Guest Capacity</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">12</div>
                  <div className="text-teal-100 font-light">Facility Types</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">1000+</div>
                  <div className="text-teal-100 font-light">Lives Touched</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-amber-200 mb-2">24/7</div>
                  <div className="text-teal-100 font-light">Care & Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/gallery" 
              className="inline-flex items-center bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              View Full Gallery
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials & Impact Stories */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Stories of <span className="text-teal-700">Transformation</span>
            </h2>
            <div className="w-16 h-0.5 bg-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              Hear from those whose lives have been touched by their experience at Camp Ajebo, 
              where faith deepens and community flourishes.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Pastor Sarah O.</h4>
                  <p className="text-sm text-stone-500">Youth Leader</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "Camp Ajebo provided the perfect environment for our youth retreat. The peaceful 
                atmosphere and excellent facilities allowed our young people to truly connect 
                with God and each other."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Rev. Michael A.</h4>
                  <p className="text-sm text-stone-500">Conference Organizer</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "The conference facilities exceeded our expectations. Professional setup, 
                comfortable accommodations, and the spiritual atmosphere made our leadership 
                conference truly impactful."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Mrs. Grace N.</h4>
                  <p className="text-sm text-stone-500">Retreat Participant</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "My personal retreat at Camp Ajebo was life-changing. The quiet spaces for 
                prayer and meditation, combined with the warm fellowship, renewed my spirit 
                and strengthened my faith."
              </p>
              <div className="flex text-amber-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-light text-stone-800 mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              Join the thousands who have experienced spiritual growth and community at Camp Ajebo.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
            >
              Share Your Story
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action - Conversion Focused */}
      <section className="relative py-24 overflow-hidden">
        {/* Natural background with earth tones */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #065f46 0%, #0891b2 50%, #7c2d12 100%)'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              Begin Your <span className="text-amber-200">Spiritual Journey</span>
            </h2>
            <div className="w-20 h-0.5 bg-amber-200 mx-auto mb-8"></div>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Whether you're seeking personal renewal, planning a retreat, organizing a conference, 
              or celebrating a special occasion, Camp Ajebo provides the perfect sanctuary for 
              meaningful spiritual encounters.
            </p>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">WhatsApp</h3>
                <p className="text-white/70 mb-4 text-sm">Quick responses</p>
                <a 
                  href="https://wa.me/2347036555871" 
                  className="text-green-300 hover:text-green-200 font-medium"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  +234 703 655 5871
                </a>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Call Direct</h3>
                <p className="text-white/70 mb-4 text-sm">Personal assistance</p>
                <a 
                  href="tel:+2347032192546" 
                  className="text-sky-300 hover:text-sky-200 font-medium"
                >
                  +234 703 219 2546
                </a>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Email Us</h3>
                <p className="text-white/70 mb-4 text-sm">Detailed planning</p>
                <a 
                  href="mailto:info@foursquarecampajebo.org" 
                  className="text-amber-300 hover:text-amber-200 font-medium"
                >
                  info@foursquarecampajebo.org
                </a>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                href="/contact" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-12 py-4 rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Plan Your Visit Today
              </Link>
              <Link 
                href="/facilities" 
                className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 font-medium px-12 py-4 rounded-lg text-xl transition-all duration-300"
              >
                Tour Our Facilities
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              <Link href="/about" className="hover:text-white transition-colors duration-200 font-light">
                Our Story
              </Link>
              <Link href="/giving" className="hover:text-white transition-colors duration-200 font-light">
                Support Our Mission
              </Link>
              <Link href="/events" className="hover:text-white transition-colors duration-200 font-light">
                Upcoming Events
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors duration-200 font-light">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}