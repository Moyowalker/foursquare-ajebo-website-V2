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

const galleryImages = [
  { src: '/images/medical-centre/front-desk.jpeg', alt: 'Reception and waiting area' },
  { src: '/images/medical-centre/triage.jpeg', alt: 'Triage and first aid station' },
  { src: '/images/medical-centre/team.jpeg', alt: 'Medical team on duty' },
];

const careStats = [
  { title: '24/7 On-call', description: 'Medical response for urgent needs day or night.', icon: Ambulance },
  { title: 'Under 10 mins', description: 'Average triage time during camp events.', icon: AlertTriangle },
  { title: 'Qualified team', description: 'Clinicians, nurses, and first responders on site.', icon: ShieldCheck },
];

const serviceCards = [
  { title: 'Primary Care', icon: Stethoscope, color: 'bg-rose-100 text-rose-600', description: 'General consultations, basic treatments, and health guidance.' },
  { title: 'First Aid & Emergencies', icon: HeartPulse, color: 'bg-orange-100 text-orange-600', description: 'Immediate response for minor injuries and urgent health needs.' },
  { title: 'Health Screening', icon: Activity, color: 'bg-amber-100 text-amber-600', description: 'Routine checks for blood pressure, temperature, and general wellness.' },
  { title: 'Guest & Staff Support', icon: Users, color: 'bg-blue-100 text-blue-600', description: 'Dedicated care for residents, visitors, and event participants.' },
  { title: 'Medication Support', icon: ShieldCheck, color: 'bg-emerald-100 text-emerald-600', description: 'Guidance on prescribed medications and care plans.' },
  { title: 'Health Education', icon: ShieldCheck, color: 'bg-purple-100 text-purple-600', description: 'Preventive care tips and wellness awareness for the camp community.' },
];

const careJourney = [
  { title: 'Arrive & Triage', detail: 'Vitals checked, symptoms logged, and reassurance provided immediately.', icon: Thermometer },
  { title: 'Care Plan', detail: 'Clinician reviews symptoms and sets the right path: treatment, monitoring, or referral.', icon: Stethoscope },
  { title: 'Stabilize & Support', detail: 'First aid, medication support, or short observation depending on need.', icon: Bandage },
  { title: 'Follow-up', detail: 'Clear next steps, referrals, and guidance to stay well for the rest of your stay.', icon: HeartHandshake },
];

export default function MedicalCentrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-sky-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-700 to-sky-700 text-white py-16">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-4 relative">
          <Link href="/services" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-sm text-emerald-50">
                <HeartHandshake className="w-4 h-4" />
                On-site healthcare you can trust
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Medical Centre</h1>
                <p className="text-lg md:text-xl text-emerald-50/90 mt-3">
                  Reliable healthcare for guests, residents, and staff with round-the-clock emergency response and warm bedside care.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {careStats.map((item) => (
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
                  className="inline-flex items-center gap-2 bg-white text-emerald-800 px-5 py-3 rounded-lg font-semibold shadow-md hover:-translate-y-0.5 transition-transform"
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

            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-white/10 border border-white/15">
                  <Image src="/images/facilities/real/residential-building.jpg" alt="Medical centre exterior" fill className="object-cover" priority />
                </div>
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-white/10 border border-white/15">
                  <Image src="/images/facilities/real/IMG_6592.JPG" alt="Care team working" fill className="object-cover" />
                </div>
                <div className="relative sm:col-span-2 h-56 rounded-2xl overflow-hidden bg-white/10 border border-white/15">
                  <Image src="/images/facilities/real/modern-guest-rooms.JPG" alt="Consultation and observation" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 space-y-16">
        <section className="max-w-6xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Compassionate Care On-Site</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our medical centre delivers primary care, first aid, and wellness support to keep everyone safe and healthy during their stay at Camp Ajebo.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[{ title: 'Rapid triage', description: 'Walk-ins evaluated quickly with clear next steps.', icon: AlertTriangle }, { title: 'Comfort-first care', description: 'Gentle, reassuring approach for kids, teens, and adults.', icon: HeartHandshake }, { title: 'Coordinated support', description: 'Seamless referrals when advanced care is needed.', icon: Ambulance }].map((item) => (
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
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service) => (
              <div key={service.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Photo gallery</p>
              <h2 className="text-2xl font-bold text-gray-900">See the spaces before you arrive</h2>
            </div>
            <p className="text-sm text-gray-500">Drop your best shots into /public/images/medical-centre and reuse the filenames below.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((photo) => (
              <div key={photo.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition-shadow">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold drop-shadow">{photo.alt}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="bg-white rounded-2xl shadow-lg p-8" id="operational-details">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Operational Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Clock className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Clinic Hours</h3>
                </div>
                <p className="text-gray-600 mb-4">Open daily with extended support during major events and retreats.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Daily: 8:00 AM – 6:00 PM</li>
                  <li>• Event days: On-call support</li>
                  <li>• 24/7 emergency response</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Safety Protocols</h3>
                </div>
                <p className="text-gray-600 mb-4">Strict hygiene and safety standards protect every guest and staff member.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Routine sanitation and sterilization</li>
                  <li>• Emergency response coordination</li>
                  <li>• Confidential patient care</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-sky-500 rounded-2xl shadow-lg p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              Emergency-ready
            </div>
            <h3 className="text-2xl font-bold mb-2">Need urgent attention?</h3>
            <p className="text-emerald-50/90 mb-4">We respond swiftly with stabilization, first aid, and referrals when needed. Let us know what you need and we will guide you to care.</p>
            <div className="space-y-3 text-sm text-emerald-50/90">
              <div className="flex items-start gap-2">
                <HeartPulse className="w-4 h-4 mt-1" />
                <span>Vital checks, first aid, and reassurance.</span>
              </div>
              <div className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 mt-1" />
                <span>Symptom relief while next steps are arranged.</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Clear directions to the clinic or partner hospital.</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-3 rounded-lg font-semibold shadow hover:-translate-y-0.5 transition-transform">
                <Phone className="w-5 h-5" />
                Call for assistance
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-3 border border-white/50 rounded-lg text-sm">
                <Clock className="w-5 h-5" />
                Fast triage & next steps
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-4 gap-6">
            {careJourney.map((stage, index) => (
              <div key={stage.title} className="relative bg-emerald-50 rounded-xl p-5 h-full">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold shadow">{index + 1}</div>
                <div className="mb-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <stage.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto bg-gradient-to-r from-emerald-700 to-sky-600 rounded-xl shadow-lg p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-3">Visit the Medical Centre</h2>
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
                    <p className="text-emerald-100 text-sm">Call the medical desk for assistance</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Need Medical Support?</h2>
              <p className="text-emerald-100 mb-6">Reach out for health consultations, emergency support, or wellness guidance.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-emerald-700 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium text-center">Contact Medical Team</Link>
                <Link href="/contact" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors font-medium text-center">Request Assistance</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
