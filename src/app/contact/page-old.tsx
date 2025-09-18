'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal, Parallax, FloatingElement } from '@/components/ui/animations';
import { SpectacularButton, SpectacularCard, GradientText, PulsingOrb, GlassCard } from '@/components/ui/spectacular';

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.eventType ? `${formData.subject} (${formData.eventType})` : formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          eventType: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: ["Foursquare Gospel Church Ajebo", "Ajebo Community", "Ogun State, Nigeria"],
      color: "from-blue-400 to-purple-600"
    },
    {
      icon: "📞",
      title: "Phone Numbers",
      details: ["+234 xxx xxx xxxx", "WhatsApp: +234 xxx xxx xxxx", "Reception: +234 xxx xxx xxxx"],
      color: "from-green-400 to-teal-600"
    },
    {
      icon: "📧",
      title: "Email Addresses",
      details: ["info@foursquareajebo.org", "pastor@foursquareajebo.org", "events@foursquareajebo.org"],
      color: "from-yellow-400 to-orange-600"
    },
    {
      icon: "🌐",
      title: "Connect With Us",
      details: ["@FoursquareAjebo", "Sunday Service: 8:00 AM", "Wednesday: 6:00 PM"],
      color: "from-purple-400 to-pink-600"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "After Service - 5:00 PM" },
    { day: "Public Holidays", hours: "10:00 AM - 3:00 PM" }
  ];

  const faqs = [
    {
      question: "How do I make a booking?",
      answer: "You can make a booking by calling us, sending an email, or filling out our online contact form. We'll respond within 24 hours to confirm your reservation."
    },
    {
      question: "What is included in the camp fee?",
      answer: "Camp fees typically include accommodation, all meals, program materials, recreational activities, and access to all facilities. Specific inclusions vary by event type."
    },
    {
      question: "Is transportation provided?",
      answer: "We can arrange transportation from major cities for large groups. Individual transportation arrangements can be made upon request with advance notice."
    },
    {
      question: "What should I bring to camp?",
      answer: "Bring personal items, comfortable clothing, Bible, notebook, toiletries, and any medications. A detailed packing list is provided upon registration."
    },
    {
      question: "Are there medical facilities on-site?",
      answer: "Yes, we have a fully equipped medical center with qualified medical staff available 24/7 during events."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <PulsingOrb size={180} color="rgba(139, 92, 246, 0.1)" top="10%" left="20%" duration={8} />
        <PulsingOrb size={140} color="rgba(59, 130, 246, 0.1)" top="80%" left="80%" duration={10} />
        <PulsingOrb size={160} color="rgba(16, 185, 129, 0.1)" top="60%" left="10%" duration={7} />
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
              Contact Us
            </GradientText>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Ready to embark on a life-changing journey? Get in touch with us to learn more 
              about our programs, book your stay, or ask any questions you may have.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      >
                        <option value="" className="bg-slate-800">Select event type</option>
                        <option value="youth-camp" className="bg-slate-800">Youth Camp</option>
                        <option value="conference" className="bg-slate-800">Conference</option>
                        <option value="retreat" className="bg-slate-800">Retreat</option>
                        <option value="family-event" className="bg-slate-800">Family Event</option>
                        <option value="private-booking" className="bg-slate-800">Private Booking</option>
                        <option value="other" className="bg-slate-800">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder="What is your message about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry, event requirements, or any questions you have..."
                    />
                  </div>

                  <SpectacularButton
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message... 📤' : 'Send Message ✨'}
                  </SpectacularButton>

                  {/* Status Message */}
                  {submitStatus !== 'idle' && (
                    <div className={`p-4 rounded-xl border ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                        : 'bg-red-500/20 border-red-500/50 text-red-300'
                    }`}>
                      <p className="text-center font-semibold">{statusMessage}</p>
                    </div>
                  )}
                </form>
              </GlassCard>
            </ScrollReveal>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <ScrollReveal key={info.title} delay={index * 100}>
                  <FloatingElement>
                    <GlassCard className="p-6 group hover:scale-105 transition-all duration-500">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{info.icon}</div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-slate-300">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </FloatingElement>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Office Hours
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our team is available to assist you during these hours
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeHours.map((schedule, index) => (
              <ScrollReveal key={schedule.day} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 text-center group hover:scale-105 transition-all duration-500">
                    <h3 className="text-lg font-bold mb-3 text-white">{schedule.day}</h3>
                    <p className="text-slate-300 font-semibold">{schedule.hours}</p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Find Us
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Located on the beautiful Ajebo Hill in Ogun State
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <GlassCard className="p-8 text-center">
              <div className="text-8xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                Interactive Map
              </h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Our camp is situated on a scenic hilltop location, approximately 2 hours drive from Lagos. 
                The serene environment provides the perfect backdrop for spiritual reflection and fellowship.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">From Lagos:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Take Lagos-Ibadan Expressway</li>
                    <li>• Exit at Mowe/Ibafo</li>
                    <li>• Follow signs to Ajebo Hill</li>
                    <li>• Journey time: ~2 hours</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">From Abuja:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Take A2 Highway South</li>
                    <li>• Connect to Lagos-Ibadan Expressway</li>
                    <li>• Exit at Mowe/Ibafo</li>
                    <li>• Journey time: ~4.5 hours</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SpectacularButton variant="primary" className="px-8 py-3">
                  Open in Google Maps 🗺️
                </SpectacularButton>
                <SpectacularButton variant="outline" className="px-8 py-3">
                  Download Directions 📱
                </SpectacularButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <GradientText className="text-4xl md:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </GradientText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Quick answers to common questions
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 100}>
                <FloatingElement>
                  <GlassCard className="p-6 group hover:scale-105 transition-all duration-500">
                    <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </GlassCard>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard className="p-12">
              <div className="text-6xl mb-6">🚨</div>
              <GradientText className="text-4xl md:text-5xl font-bold mb-6">
                Emergency Contact
              </GradientText>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                For urgent matters or emergencies during events, please contact our 24/7 emergency line.
              </p>
              
              <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-2">Emergency Hotline</h3>
                <p className="text-3xl font-bold text-white">+234 911 AJEBO (25326)</p>
                <p className="text-slate-300 mt-2">Available 24/7 during events</p>
              </div>

              <SpectacularButton 
                variant="outline"
                className="px-8 py-3 text-lg"
              >
                Save Emergency Contact 📞
              </SpectacularButton>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
