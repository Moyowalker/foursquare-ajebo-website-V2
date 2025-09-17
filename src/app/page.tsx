"use client";

import { useEffect, useState } from 'react';
import SupremeHeroSection from '@/components/hero/DazzlingHeroSection';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Dazzling Spiritual Hero */}
      <SupremeHeroSection />

      {/* About Us Section */}
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-indigo-600">Foursquare Ajebo</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A sacred sanctuary nestled in the heart of Nigeria, where hearts find healing, 
                souls discover purpose, and community becomes family. For over two decades, 
                we've been a beacon of hope, transforming lives through God's unwavering love.
              </p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Our Mission</h3>
                <p className="text-gray-600 mb-4">
                  To create a welcoming space where every person encounters God's grace, 
                  grows in faith, and serves others with compassion.
                </p>
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A thriving spiritual community that transforms lives, strengthens families, 
                  and impacts our world through the power of Christ's love.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <span>🤝</span> Join Our Community
                </button>
                <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                  Learn More About Us
                </button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Ajebo Retreat Center</h4>
                    <p className="text-gray-600 text-sm">
                      Sacred grounds where spiritual transformation meets natural beauty
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-1">🙏</div>
                        <div className="font-semibold">500+</div>
                        <div className="text-gray-500">Lives Transformed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1">⛪</div>
                        <div className="font-semibold">25+</div>
                        <div className="text-gray-500">Years of Ministry</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries & Programs Section */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Our <span className="text-indigo-600">Ministries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Discover your calling through our diverse ministry programs designed to nurture 
              spiritual growth and community connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Youth Ministry',
                description: 'Empowering the next generation through faith-based activities, mentorship, and leadership development.',
                color: 'from-blue-500 to-cyan-500',
                features: ['Weekly Youth Service', 'Leadership Training', 'Mission Trips']
              },
              {
                icon: '👩‍💼',
                title: 'Women\'s Ministry',
                description: 'Supporting women in their spiritual journey through fellowship, prayer, and life-enriching programs.',
                color: 'from-pink-500 to-rose-500',
                features: ['Bible Study Groups', 'Prayer Circles', 'Life Skills Workshops']
              },
              {
                icon: '👨‍💼',
                title: 'Men\'s Ministry',
                description: 'Building strong Christian men through discipleship, accountability, and community service.',
                color: 'from-green-500 to-emerald-500',
                features: ['Men\'s Fellowship', 'Community Outreach', 'Mentorship Program']
              },
              {
                icon: '🎵',
                title: 'Worship & Choir',
                description: 'Lifting hearts and voices in praise through music ministry and worship experiences.',
                color: 'from-purple-500 to-indigo-500',
                features: ['Adult Choir', 'Youth Band', 'Worship Training']
              },
              {
                icon: '🤝',
                title: 'Outreach Ministry',
                description: 'Serving our community through compassionate action and spreading God\'s love beyond our walls.',
                color: 'from-orange-500 to-red-500',
                features: ['Community Service', 'Food Ministry', 'Prison Outreach']
              },
              {
                icon: '👶',
                title: 'Children\'s Ministry',
                description: 'Nurturing young hearts with age-appropriate biblical teaching and fun learning experiences.',
                color: 'from-yellow-500 to-amber-500',
                features: ['Sunday School', 'Kids Activities', 'Family Events']
              }
            ].map((ministry, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${ministry.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {ministry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {ministry.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {ministry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="text-indigo-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  Join Ministry
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-indigo-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Upcoming <span className="text-indigo-600">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Join us for these special gatherings that strengthen our faith and community bonds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                date: 'Oct 15, 2025',
                time: '10:00 AM',
                title: 'Annual Harvest Festival',
                description: 'A celebration of God\'s blessings with worship, testimonies, and community feast.',
                image: '🌾',
                category: 'Community Event',
                attendees: '200+ Expected'
              },
              {
                date: 'Oct 22, 2025',
                time: '6:00 PM',
                title: 'Youth Revival Night',
                description: 'An evening of powerful worship, inspiring messages, and spiritual breakthrough for young hearts.',
                image: '🔥',
                category: 'Youth Ministry',
                attendees: '150+ Expected'
              },
              {
                date: 'Nov 5, 2025',
                time: '9:00 AM',
                title: 'Women\'s Retreat Weekend',
                description: 'A transformative weekend of fellowship, prayer, and spiritual renewal in our beautiful retreat grounds.',
                image: '🌸',
                category: 'Women\'s Ministry',
                attendees: '100+ Expected'
              },
              {
                date: 'Nov 12, 2025',
                time: '7:00 AM',
                title: 'Community Outreach Day',
                description: 'Serving our local community through practical acts of love, care packages, and prayer ministry.',
                image: '🤲',
                category: 'Outreach',
                attendees: 'All Welcome'
              }
            ].map((event, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-indigo-600 font-semibold mb-1">{event.category}</div>
                      <div className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </div>
                    </div>
                    <div className="text-4xl">{event.image}</div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">📅</span>
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">⏰</span>
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">👥</span>
                      {event.attendees}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Learn More
                    </button>
                    <button className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons & Resources Section */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Recent <span className="text-indigo-600">Sermons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Be inspired by powerful messages that transform hearts and strengthen faith
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Walking in Divine Purpose',
                speaker: 'Pastor Emmanuel Ojo',
                date: 'September 10, 2025',
                duration: '45 min',
                thumbnail: '🎤',
                type: 'Video',
                views: '1.2K',
                description: 'Discover God\'s unique calling for your life and learn to walk confidently in His divine purpose.'
              },
              {
                title: 'The Power of Persistent Prayer',
                speaker: 'Pastor Grace Adebayo',
                date: 'September 3, 2025',
                duration: '38 min',
                thumbnail: '🙏',
                type: 'Audio',
                views: '890',
                description: 'Understanding how consistent prayer transforms our relationship with God and changes circumstances.'
              },
              {
                title: 'Building Strong Families',
                speaker: 'Pastor Emmanuel Ojo',
                date: 'August 27, 2025',
                duration: '52 min',
                thumbnail: '👨‍👩‍👧‍👦',
                type: 'Video',
                views: '2.1K',
                description: 'Biblical principles for creating loving, Christ-centered homes that honor God and bless generations.'
              }
            ].map((sermon, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
                  <div className="text-6xl mb-4 opacity-80">{sermon.thumbnail}</div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {sermon.type}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/30 transition-colors group-hover:scale-110">
                      <span className="text-xl">▶️</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {sermon.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{sermon.speaker}</span>
                    <span>{sermon.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-4">
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        {sermon.duration}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">👁️</span>
                        {sermon.views} views
                      </span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
              <span>📚</span>
              View All Sermons
            </button>
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Community <span className="text-indigo-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Real testimonies of transformation, hope, and God's faithfulness in our community
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                name: 'Sister Blessing Okafor',
                role: 'Mother of 3, Business Owner',
                story: 'After losing my husband, I thought my world had ended. But this community became my family. Through prayer, support, and God\'s grace, I not only found healing but also started a successful business that now employs 15 people. God truly works all things for good.',
                image: '👩‍💼',
                years: '5 years member',
                highlight: 'From Grief to Growth'
              },
              {
                name: 'Brother David Adebayo',
                role: 'Youth Leader, Engineering Student',
                story: 'I was heading down the wrong path as a teenager - drugs, bad friends, failing grades. The youth ministry here didn\'t just talk to me, they walked with me. Today, I\'m graduating with honors and leading other young people to find their purpose in Christ.',
                image: '👨‍🎓',
                years: '8 years member',
                highlight: 'Transformed Life'
              },
              {
                name: 'Mama Grace Ogundimu',
                role: 'Grandmother, Prayer Warrior',
                story: 'For 30 years, I prayed for my prodigal son. This church never gave up praying with me. Last Christmas, he walked through those doors, gave his life to Christ, and brought his children to be dedicated. God\'s timing is perfect.',
                image: '👵',
                years: '12 years member',
                highlight: 'Persistent Prayer Answered'
              },
              {
                name: 'The Adebola Family',
                role: 'Family of 6, Community Volunteers',
                story: 'We came here as strangers in a new city. This church didn\'t just welcome us - they embraced us. We found not just a place to worship, but a community that supports our dreams and celebrates our joys. Our children are growing in faith and character.',
                image: '👨‍👩‍👧‍👦',
                years: '3 years members',
                highlight: 'Found Family'
              }
            ].map((story, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{story.image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                    <p className="text-indigo-600 font-medium">{story.role}</p>
                    <p className="text-sm text-gray-500">{story.years}</p>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-3 mb-4">
                  <span className="text-indigo-700 font-semibold text-sm">{story.highlight}</span>
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed italic mb-4">
                  "{story.story}"
                </blockquote>
                
                <div className="flex items-center gap-2 text-yellow-500">
                  {'★'.repeat(5)}
                  <span className="text-gray-500 text-sm ml-2">Verified Member</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
              <span>✍️</span>
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section-padding bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Spiritual Journey <span className="text-yellow-300">Starts Here</span>
            </h2>
            <p className="text-xl lg:text-2xl text-indigo-100 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Don't wait for tomorrow to begin the life God has planned for you. 
              Take the next step in faith and join our loving community today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '⛪',
                title: 'Join Us This Sunday',
                description: 'Experience worship, fellowship, and powerful messages that transform lives',
                time: 'Every Sunday • 9:00 AM & 11:30 AM',
                action: 'Plan Your Visit',
                primary: true
              },
              {
                icon: '🏞️',
                title: 'Book a Retreat',
                description: 'Escape to our peaceful grounds for spiritual renewal and divine encounter',
                time: 'Weekends Available • Call to Reserve',
                action: 'Book Now',
                primary: false
              },
              {
                icon: '💝',
                title: 'Give Online',
                description: 'Support God\'s work and be part of transforming lives in our community',
                time: 'Secure & Convenient • Multiple Options',
                action: 'Give Today',
                primary: false
              }
            ].map((cta, index) => (
              <div 
                key={index} 
                className={`${cta.primary ? 'bg-white text-gray-800' : 'bg-white/10 backdrop-blur-sm border border-white/20'} rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300 animate-slide-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-6xl mb-4 ${cta.primary ? '' : 'opacity-80'}`}>{cta.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 ${cta.primary ? 'text-gray-800' : 'text-white'}`}>
                  {cta.title}
                </h3>
                <p className={`${cta.primary ? 'text-gray-600' : 'text-indigo-100'} mb-4 leading-relaxed`}>
                  {cta.description}
                </p>
                <p className={`text-sm ${cta.primary ? 'text-indigo-600' : 'text-yellow-300'} font-medium mb-6`}>
                  {cta.time}
                </p>
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  cta.primary 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}>
                  {cta.action}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-indigo-200 mb-4">Questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors inline-flex items-center gap-2">
                <span>📞</span>
                Call Us: +234 813 456 7890
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors inline-flex items-center gap-2">
                <span>✉️</span>
                Email: hello@foursquareajebo.org
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            
            {/* Church Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">⛪</div>
                <div>
                  <h3 className="text-xl font-bold">Foursquare Ajebo</h3>
                  <p className="text-gray-400 text-sm">Spiritual Retreat Center</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                A sacred sanctuary where hearts find healing, souls discover purpose, 
                and community becomes family. Come as you are, leave transformed.
              </p>
              <div className="flex gap-4">
                {['📘', '📷', '🐦', '📺'].map((icon, index) => (
                  <button 
                    key={index}
                    className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Times */}
            <div>
              <h3 className="text-xl font-bold mb-6">Service Times</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <div className="font-semibold text-white">Sunday Worship</div>
                  <div>First Service: 9:00 AM</div>
                  <div>Second Service: 11:30 AM</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Midweek Service</div>
                  <div>Wednesday: 6:30 PM</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Prayer Meetings</div>
                  <div>Friday: 6:00 AM</div>
                  <div>Saturday: 6:00 PM</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  'About Us', 'Ministries', 'Events', 'Sermons', 
                  'Give Online', 'Contact', 'Prayer Request', 'Facilities'
                ].map((link, index) => (
                  <div key={index}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Location */}
            <div>
              <h3 className="text-xl font-bold mb-6">Contact & Location</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">📍</span>
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div>Ajebo Spiritual Retreat Center<br />Ogun State, Nigeria</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">📞</span>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div>+234 813 456 7890</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✉️</span>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div>hello@foursquareajebo.org</div>
                  </div>
                </div>
              </div>
              
              {/* Mini Map Placeholder */}
              <div className="mt-6 bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm text-gray-400">Interactive Map</p>
                <button className="text-indigo-400 text-sm hover:text-indigo-300 mt-2">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2025 Foursquare Ajebo Spiritual Retreat Center. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="btn-floating group" aria-label="Contact us">
        <span className="text-2xl group-hover:animate-wiggle" aria-hidden>📞</span>
      </button>
    </div>
  );
}
