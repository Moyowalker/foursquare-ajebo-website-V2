import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, BookOpen, ShieldCheck, Users, Clock, MapPin, ClipboardList, Heart, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nursery & Primary School | Foursquare Camp Ajebo',
  description: 'Faith-centered nursery and primary education with qualified teachers, safe classrooms, and holistic development for children.',
  keywords: ['nursery', 'primary school', 'education', 'camp ajebo', 'foursquare', 'children'],
};

export default function NurseryPrimarySchoolPage() {
  const schoolStats = [
    { value: '200+', label: 'Students', detail: 'Nursery to Primary' },
    { value: '15:1', label: 'Student–teacher', detail: 'Small class focus' },
    { value: '10+', label: 'Clubs & activities', detail: 'STEM, arts, music' },
  ];

  const studentHighlights = [
    { name: 'Ayo', grade: 'Primary 3', activity: 'Reading circle', color: 'from-emerald-200 to-emerald-50', badge: 'Literacy' },
    { name: 'Kemi', grade: 'Nursery 2', activity: 'Art & craft', color: 'from-amber-200 to-amber-50', badge: 'Creativity' },
    { name: 'David', grade: 'Primary 5', activity: 'STEM club', color: 'from-sky-200 to-sky-50', badge: 'STEM' },
    { name: 'Tolu', grade: 'Kindergarten', activity: 'Outdoor play', color: 'from-rose-200 to-rose-50', badge: 'Play' },
    { name: 'Ife', grade: 'Primary 2', activity: 'Music time', color: 'from-purple-200 to-purple-50', badge: 'Music' },
    { name: 'Musa', grade: 'Primary 4', activity: 'Science fair', color: 'from-lime-200 to-lime-50', badge: 'Discovery' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Link 
                href="/services" 
                className="inline-flex items-center text-emerald-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white mb-4 border border-white/20">
                Safe, joyful, Christ-centered learning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Nursery & Primary School</h1>
              <p className="text-lg md:text-xl text-emerald-50 max-w-3xl leading-relaxed">
                A nurturing learning environment that blends academic excellence with strong Christian values.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-emerald-700 font-semibold shadow-lg hover:bg-emerald-50 transition-colors"
                >
                  Contact admissions
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-lg border border-white/50 px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Book a school tour
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" aria-hidden />
              <div className="relative rounded-3xl bg-white/10 border border-white/20 backdrop-blur-lg p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {schoolStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/15 border border-white/10 p-4 text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-emerald-50 font-semibold">{stat.label}</div>
                      <div className="text-xs text-emerald-100 mt-1">{stat.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-white/90 p-5 text-emerald-900 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl">😊</div>
                    <div>
                      <div className="text-sm font-semibold text-emerald-700">Student spotlight</div>
                      <div className="text-lg font-bold text-emerald-900">Reading circle & STEM clubs</div>
                      <p className="text-sm text-emerald-700 mt-1">Joyful learners across nursery and primary levels with arts, music, and discovery time.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['STEM club', 'Reading circle', 'Music & arts', 'Outdoor play'].map((tag) => (
                      <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        {tag}
                      </span>
                    ))}
                  </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Growing in Wisdom & Character</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our nursery and primary school provides a safe, faith-centered space where children learn, play, and grow. 
              We focus on academic foundations, spiritual development, and positive character formation.
            </p>
          </div>

          {/* Program Levels */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Nursery (Ages 2-4)',
                icon: Heart,
                color: 'bg-rose-100 text-rose-600',
                description: 'Play-based learning that builds social, emotional, and early literacy skills.'
              },
              {
                title: 'Kindergarten (Ages 4-5)',
                icon: BookOpen,
                color: 'bg-amber-100 text-amber-600',
                description: 'Structured early learning with phonics, numeracy, and creative exploration.'
              },
              {
                title: 'Primary (Ages 6-11)',
                icon: GraduationCap,
                color: 'bg-emerald-100 text-emerald-600',
                description: 'Strong academic foundations with a balanced curriculum and value-based teaching.'
              }
            ].map((program) => (
              <div key={program.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${program.color}`}>
                  <program.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Parents Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Safe & Secure Campus</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Child-friendly classrooms, secure access, and attentive staff ensure a safe learning environment.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Supervised play areas</li>
                  <li>• Safe drop-off and pick-up</li>
                  <li>• Health and hygiene protocols</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-teal-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Qualified Teachers</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our teachers are trained educators committed to academic excellence and child development.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Experienced educators</li>
                  <li>• Small class sizes</li>
                  <li>• Individual learning support</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Balanced Curriculum</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Strong academics alongside creativity, character development, and spiritual growth.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Literacy & numeracy focus</li>
                  <li>• Creative arts and music</li>
                  <li>• Bible-based values</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Flexible School Hours</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Structured school hours with after-school care options and parent engagement.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monday–Friday classes</li>
                  <li>• Morning assembly & devotions</li>
                  <li>• Parent-teacher updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Student Moments */}
          <div className="bg-gradient-to-r from-emerald-100 via-white to-sky-100 rounded-2xl shadow-lg p-8 mb-12 border border-emerald-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Student moments</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Snapshots from our classrooms</h2>
                <p className="text-gray-600 mt-2 max-w-2xl">Joyful learning, creativity, and play across nursery, kindergarten, and primary levels.</p>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
              >
                View more photos
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentHighlights.map((item, index) => (
                <div
                  key={item.name + index}
                  className="rounded-2xl bg-white shadow-sm border border-emerald-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-36 bg-gradient-to-br ${item.color} relative`}> 
                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-100 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {item.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 text-3xl" aria-hidden>
                      😊
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-emerald-700 font-semibold">{item.grade}</div>
                    <div className="text-lg font-bold text-gray-900">{item.name}</div>
                    <p className="text-sm text-gray-600 mt-1">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Steps */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Admission Steps</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                'Make an inquiry and book a school tour',
                'Complete the admission form and submit documents',
                'Meet with our admissions team for assessment',
                'Receive confirmation and start date'
              ].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Visit Our School</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Campus Location</p>
                      <p className="text-emerald-100 text-sm">Foursquare Camp Ajebo, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClipboardList className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">School Hours</p>
                      <p className="text-emerald-100 text-sm">Monday–Friday • 8:00 AM – 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Admissions Desk</p>
                      <p className="text-emerald-100 text-sm">Contact us for enrolment and school tours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Enrol Your Child</h2>
                <p className="text-emerald-100 mb-6">
                  Ready to get started? Reach out for admissions, fees, and a guided campus tour.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-emerald-700 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium text-center"
                  >
                    Contact Admissions
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors font-medium text-center"
                  >
                    Book a Tour
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
