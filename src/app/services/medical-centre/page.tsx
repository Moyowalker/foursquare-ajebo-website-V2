import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Stethoscope, HeartPulse, ShieldCheck, Clock, Phone, MapPin, Activity, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Centre | Foursquare Camp Ajebo',
  description: 'Standard medical centre providing primary care, first aid, and wellness support for guests, residents, and staff.',
  keywords: ['medical centre', 'healthcare', 'clinic', 'first aid', 'camp ajebo'],
};

export default function MedicalCentrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-rose-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Medical Centre</h1>
          <p className="text-xl text-rose-100 max-w-3xl">
            Reliable healthcare services for guests, residents, and camp staff.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Compassionate Care On-Site</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our medical centre delivers standard healthcare, first aid, and wellness support to keep everyone safe and healthy during their stay at Camp Ajebo.
            </p>
          </div>

          {/* Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Primary Care',
                icon: Stethoscope,
                color: 'bg-rose-100 text-rose-600',
                description: 'General consultations, basic treatments, and health guidance.'
              },
              {
                title: 'First Aid & Emergencies',
                icon: HeartPulse,
                color: 'bg-orange-100 text-orange-600',
                description: 'Immediate response for minor injuries and urgent health needs.'
              },
              {
                title: 'Health Screening',
                icon: Activity,
                color: 'bg-amber-100 text-amber-600',
                description: 'Routine checks for blood pressure, temperature, and general wellness.'
              },
              {
                title: 'Guest & Staff Support',
                icon: Users,
                color: 'bg-blue-100 text-blue-600',
                description: 'Dedicated care for residents, visitors, and event participants.'
              },
              {
                title: 'Medication Support',
                icon: ShieldCheck,
                color: 'bg-emerald-100 text-emerald-600',
                description: 'Guidance on prescribed medications and care plans.'
              },
              {
                title: 'Health Education',
                icon: ShieldCheck,
                color: 'bg-purple-100 text-purple-600',
                description: 'Preventive care tips and wellness awareness for the camp community.'
              }
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Operational Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Operational Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-rose-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Clinic Hours</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  The medical centre is open daily with extended support during major events and retreats.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Daily: 8:00 AM – 6:00 PM</li>
                  <li>• Event days: On-call support</li>
                  <li>• 24/7 emergency response</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Safety Protocols</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We maintain strict hygiene and safety standards to protect every guest and staff member.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Routine sanitation and sterilization</li>
                  <li>• Emergency response coordination</li>
                  <li>• Confidential patient care</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl shadow-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Visit the Medical Centre</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-rose-100 text-sm">Foursquare Camp Ajebo, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Hotline</p>
                      <p className="text-rose-100 text-sm">Contact the medical desk for assistance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Need Medical Support?</h2>
                <p className="text-rose-100 mb-6">
                  Reach out to our team for health consultations, emergency support, or wellness guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-rose-700 px-6 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-center"
                  >
                    Contact Medical Team
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-rose-600 transition-colors font-medium text-center"
                  >
                    Request Assistance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
