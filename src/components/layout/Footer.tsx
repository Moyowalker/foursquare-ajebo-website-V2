import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { footerNav } from '@/lib/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = {
    phone: {
      whatsapp: '+234 703 655 5871',
      reception: '+234 703 219 2546',
    },
    email: {
      info: 'info@foursquarecamp.org.ng',
      general: 'foursquarecampngr@gmail.com',
    },
    address: 'Km 75, Lagos-Ibadan Exp. Way, Foursquare Camp Ajebo, Ogun State, Nigeria',
    hours: 'Mon-Fri: 8AM-6PM',
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Camp info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Foursquare Camp Ajebo</h3>
            <p className="text-slate-300 leading-relaxed">
              A place of transformation, fellowship, and spiritual growth. Experience God&apos;s presence in our beautiful camp setting.
            </p>
            <div className="flex space-x-3 text-xl">
              <span aria-hidden>📘</span>
              <span aria-hidden>📷</span>
              <span aria-hidden>📺</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              {footerNav[0]?.items.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Our Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/facilities/accommodation" className="hover:text-white transition-colors">Accommodation</Link></li>
              <li><Link href="/facilities/conference-halls" className="hover:text-white transition-colors">Conference Facilities</Link></li>
              <li><Link href="/facilities/recreation" className="hover:text-white transition-colors">Recreation</Link></li>
              <li><Link href="/services/events" className="hover:text-white transition-colors">Events &amp; Retreats</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-3 text-slate-300 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <p>{contactInfo.address}</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p>WhatsApp: {contactInfo.phone.whatsapp}</p>
                  <p>Reception: {contactInfo.phone.reception}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p>{contactInfo.email.info}</p>
                  <p>{contactInfo.email.general}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <p>{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick contact actions */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`https://wa.me/${contactInfo.phone.whatsapp.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              💬 WhatsApp
            </Link>
            <Link
              href={`tel:${contactInfo.phone.reception}`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              📞 Call Reception
            </Link>
            <Link
              href={`mailto:${contactInfo.email.info}`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors"
            >
              ✉️ Email Us
            </Link>
          </div>
          <div className="text-sm text-slate-400">Emergency: Available 24/7 during events</div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-slate-400 gap-3">
          <p>© {currentYear} Foursquare Camp Ajebo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}