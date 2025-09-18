'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ErrorBoundary, ContactFormErrorFallback } from '@/components/ui/error-boundary';
import { LoadingButton, LoadingOverlay } from '@/components/ui/loading';
import { Alert, SuccessMessage, ErrorMessage } from '@/components/ui/feedback';
import { useContactForm } from '@/hooks/useApi';

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventType: ''
  });

  const { submitForm, submissionStatus, errorMessage, reset, isSubmitting, isSuccess, isError } = useContactForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.eventType ? `${formData.subject} (${formData.eventType})` : formData.subject,
        message: formData.message,
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        eventType: ''
      });
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Send us a Message
      </h2>
      
      <LoadingOverlay isLoading={isSubmitting} message="Sending your message...">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select event type</option>
                <option value="youth-camp">Youth Camp</option>
                <option value="conference">Conference</option>
                <option value="retreat">Retreat</option>
                <option value="family-event">Family Event</option>
                <option value="private-booking">Private Booking</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="What is your message about?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
              placeholder="Tell us more about your inquiry, event requirements, or any questions you have..."
            />
          </div>

          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full btn-primary py-3 text-lg"
          >
            Send Message
          </LoadingButton>

          {/* Status Messages */}
          {isSuccess && (
            <SuccessMessage message="Thank you for your message! We will get back to you soon." />
          )}

          {isError && (
            <ContactFormErrorFallback onRetry={reset} />
          )}
        </form>
      </LoadingOverlay>
    </div>
  );
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: ["Foursquare Gospel Church Ajebo", "Ajebo Community", "Ogun State, Nigeria"]
    },
    {
      icon: "📞",
      title: "Phone Numbers",
      details: ["+234 xxx xxx xxxx", "WhatsApp: +234 xxx xxx xxxx", "Reception: +234 xxx xxx xxxx"]
    },
    {
      icon: "📧",
      title: "Email Addresses",
      details: ["info@foursquareajebo.org", "pastor@foursquareajebo.org", "events@foursquareajebo.org"]
    },
    {
      icon: "🌐",
      title: "Connect With Us",
      details: ["@FoursquareAjebo", "Sunday Service: 8:00 AM", "Wednesday: 6:00 PM"]
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "After Service - 5:00 PM" },
    { day: "Public Holidays", hours: "10:00 AM - 3:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Ready to embark on a life-changing journey? Get in touch with us to learn more 
            about our programs, book your stay, or ask any questions you may have.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ErrorBoundary fallback={<ContactFormErrorFallback />}>
              <ContactFormSection />
            </ErrorBoundary>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={info.title} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{info.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Office Hours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team is available to assist you during these hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {officeHours.map((schedule, index) => (
              <div key={schedule.day} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{schedule.day}</h3>
                <p className="text-gray-600 font-semibold">{schedule.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white border border-gray-200 rounded-xl p-12">
              <div className="text-6xl mb-6">🚨</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Emergency Contact
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                For urgent matters or emergencies during events, please contact our 24/7 emergency line.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Emergency Hotline</h3>
                <p className="text-3xl font-bold text-gray-900">+234 911 AJEBO (25326)</p>
                <p className="text-gray-600 mt-2">Available 24/7 during events</p>
              </div>

              <Link href="tel:+234911253236" className="btn-outline px-8 py-3 text-lg">
                Call Emergency Line
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}