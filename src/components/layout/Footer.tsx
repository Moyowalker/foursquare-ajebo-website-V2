import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { footerNav } from '@/lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = {
    phone: {
      whatsapp: '+234 703 655 5871',
      reception: '+234 703 219 2546'
    },
    email: {
      info: 'info@foursquarecamp.org.ng',
      general: 'foursquarecampngr@gmail.com'
    },
    address: 'Foursquare Camp Ajebo, Ogun State, Nigeria'
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Foursquare Camp Ajebo</h3>
            <p className="text-gray-300 leading-relaxed">
              A place of transformation, fellowship, and spiritual growth. 
              Experience God's presence in our beautiful camp setting.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                📘
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                📷
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                📺
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerNav[0]?.items.map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/facilities/accommodation" className="text-gray-300 hover:text-white transition-colors">
                  Accommodation
                </Link>
              </li>
              <li>
                <Link href="/facilities/conference-halls" className="text-gray-300 hover:text-white transition-colors">
                  Conference Facilities
                </Link>
              </li>
              <li>
                <Link href="/facilities/recreation" className="text-gray-300 hover:text-white transition-colors">
                  Recreation
                </Link>
              </li>
              <li>
                <Link href="/services/events" className="text-gray-300 hover:text-white transition-colors">
                  Events & Retreats
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{contactInfo.address}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>WhatsApp: {contactInfo.phone.whatsapp}</p>
                  <p>Reception: {contactInfo.phone.reception}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>{contactInfo.email.info}</p>
                  <p>{contactInfo.email.general}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Mon-Fri: 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Link
                href={`https://wa.me/${contactInfo.phone.whatsapp.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                💬 WhatsApp
              </Link>
              <Link
                href={`tel:${contactInfo.phone.reception}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                📞 Call Reception
              </Link>
              <Link
                href={`mailto:${contactInfo.email.info}`}
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                ✉️ Email Us
              </Link>
            </div>
            
            <div className="text-sm text-gray-400">
              Emergency: Available 24/7 during events
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} Foursquare Camp Ajebo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}