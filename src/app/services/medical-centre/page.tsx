import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  Ambulance,
  ArrowLeft,
  Bandage,
  Clock,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Centre | Foursquare Camp Ajebo',
  description: 'Standard medical centre providing primary care, first aid, and wellness support for guests, residents, and staff.',
  keywords: ['medical centre', 'healthcare', 'clinic', 'first aid', 'camp ajebo'],
};

export default function MedicalCentrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 text-white py-16">
        <div className="absolute -left-32 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-4 relative">
          <Link
            href="/services"
            className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-sm text-emerald-50 mb-3">
            <HeartHandshake className="w-4 h-4" />
            On-site healthcare you can trust
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Medical Centre</h1>
                <p className="text-lg md:text-xl text-emerald-50/90 mt-3">
                  Reliable healthcare for guests, residents, and camp staff with round-the-clock emergency response and warm bedside care.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[{
                  title: '24/7 On-call',
                  description: 'Medical response for urgent needs day or night.',
                  icon: Ambulance,
                }, {
                  title: 'Under 10 mins',
                  description: 'Average triage time during camp events.',
                  icon: AlertTriangle,
                }, {
                  title: 'Qualified team',
                  description: 'Clinicians, nurses, and first responders on site.',
                  icon: ShieldCheck,
                }].map((item) => (
                  <div key={item.title} className="bg-white/10 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5" />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                    <p className="text-sm text-emerald-50/80">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-3 rounded-lg font-semibold shadow-md hover:-translate-y-0.5 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                  Call medical team
                </Link>
                <Link
                  href="#operational-details"
                  className="inline-flex items-center gap-2 border border-white/60 text-white px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  See hours & location
                </Link>
                <span className="inline-flex items-center gap-2 text-sm text-emerald-50/90 bg-white/10 border border-white/10 rounded-full px-4 py-2">
                  <Stethoscope className="w-4 h-4" />
                  Daily checks • Emergency support
                </span>
              </div>
            </div>

            <div className="lg:w-96">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <HeartPulse className="w-6 h-6" />
                  <p className="font-semibold">Care readiness</p>
                </div>
                <ul className="space-y-3 text-sm text-emerald-50/85">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Vital signs, first aid, and stabilization handled on-site before escalation.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Routine checks during retreats and children&apos;s camps to keep everyone well.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Ambulance className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Referral coordination with nearby hospitals when additional care is required.</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 rounded-xl bg-black/15 border border-white/10 text-sm">
                  <div className="flex items-center gap-2 font-semibold">
                    <Bandage className="w-4 h-4" />
                    Rapid help within the first 10 minutes.
                  </div>
                  <p className="text-emerald-50/80 mt-1">Walk in or call ahead—our team is ready to assist.</p>
                </div>
              </div>
            </div>
          </div>
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

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { src: '/images/facilities/real/residential-building.jpg', caption: 'Medical centre exterior' },
              { src: '/images/facilities/real/modern-guest-rooms.JPG', caption: 'Consultation & care rooms' },
              { src: '/images/facilities/real/IMG_6592.JPG', caption: 'On-site support infrastructure' },
            ].map((photo) => (
              <div key={photo.src} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image src={photo.src} alt={photo.caption} fill className="object-cover" />
                </div>
                <div className="p-4 text-sm text-gray-600">{photo.caption}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[{
              title: 'Rapid triage',
              description: 'Walk-ins evaluated quickly with clear next steps.',
              icon: AlertTriangle,
            }, {
              title: 'Comfort-first care',
              description: 'Gentle, reassuring approach for kids, teens, and adults.',
              icon: HeartHandshake,
            }, {
              title: 'Coordinated support',
              description: 'Seamless referrals when advanced care is needed.',
              icon: Ambulance,
            }].map((item) => (
              <div key={item.title} className="bg-white rounded-xl shadow-lg p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
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
          <div id="operational-details" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Operational Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-emerald-600 mr-3" />
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

          {/* Emergency Ready Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-sky-500 rounded-2xl shadow-lg p-8 text-white mb-12">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-3">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Emergency-ready
                </div>
                <h3 className="text-2xl font-bold">Need urgent attention?</h3>
                <p className="text-emerald-50/90">Our team responds swiftly with stabilization, first aid, and referrals when needed. Let us know what&apos;s wrong and we&apos;ll guide you straight to care.</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-3 rounded-lg font-semibold shadow hover:-translate-y-0.5 transition-transform"
                  >
                    <Phone className="w-5 h-5" />
                    Call for assistance
                  </Link>
                  <div className="inline-flex items-center gap-2 px-4 py-3 border border-white/50 rounded-lg">
                    <Clock className="w-5 h-5" />
                    Fast triage & clear next steps
                  </div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-xl p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                  <Bandage className="w-4 h-4" />
                  What to expect
                </div>
                <ul className="text-sm text-emerald-50/85 space-y-2">
                  <li className="flex items-start gap-2">
                    <HeartPulse className="w-4 h-4 mt-1" />
                    Vital checks, first aid, and reassurance.
                  </li>
                  <li className="flex items-start gap-2">
                    <Thermometer className="w-4 h-4 mt-1" />
                    Symptom relief while next steps are arranged.
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1" />
                    Clear directions to the clinic or partner hospital.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-xl shadow-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Visit the Medical Centre</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-emerald-100 text-sm">Foursquare Camp Ajebo, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Hotline</p>
                      <p className="text-emerald-100 text-sm">Contact the medical desk for assistance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Need Medical Support?</h2>
                <p className="text-emerald-100 mb-6">
                  Reach out to our team for health consultations, emergency support, or wellness guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-emerald-700 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium text-center"
                  >
                    Contact Medical Team
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors font-medium text-center"
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
