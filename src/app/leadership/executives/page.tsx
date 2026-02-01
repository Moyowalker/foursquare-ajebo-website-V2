import Image from 'next/image';
import Link from 'next/link';

const EXECUTIVES = [
  {
    name: 'Mr Samuel Adenekan',
    role: 'Camp Manager',
    image: '/images/leadership/executives/sameul-adenekan.jpeg',
    summary: 'Coordinates daily camp operations, guest services, and cross-team execution.',
    focus: [
      'Daily operational planning and oversight',
      'Guest services coordination',
      'Facilities readiness and logistics',
      'Team communication and execution',
    ],
  },
  {
    name: 'Mr Anthony Etioloja',
    role: 'Finance Manager',
    image: '/images/leadership/executives/anthony-etioloja.jpeg',
    summary: 'Manages financial stewardship, budgeting, and resource accountability.',
    focus: [
      'Budget planning and financial oversight',
      'Payment reconciliation and reporting',
      'Resource allocation for camp operations',
      'Compliance and financial documentation',
    ],
  },
  {
    name: 'Pastor John Onwughai',
    role: 'Chief Security Officer',
    image: '/images/leadership/executives/john-onwughai.jpeg',
    summary: 'Oversees security operations, guest safety, and emergency preparedness.',
    focus: [
      'Safety planning and emergency readiness',
      'Security team coordination and training',
      'Guest access and facility monitoring',
      'Event and conference security support',
    ],
  },
  {
    name: 'Mr Femi Olapade',
    role: 'HOD, Electricals',
    image: '/images/leadership/executives/femi-olapade.jpeg',
    summary: 'Supervises electrical systems, maintenance planning, and power reliability.',
    focus: [
      'Power reliability and maintenance planning',
      'Electrical safety inspections',
      'Event support and equipment readiness',
      'Energy efficiency and system upgrades',
    ],
  },
  {
    name: 'Mrs Blessing Igberaese',
    role: 'HOD, Sanitation',
    image: '/images/leadership/executives/blessing-igberaese.jpeg',
    summary: 'Leads sanitation standards, hygiene protocols, and cleanliness across the camp grounds.',
    focus: [
      'Hygiene protocols for guest rooms and facilities',
      'Sanitation team coordination and scheduling',
      'Daily inspections and cleanliness assurance',
      'Support for event and retreat readiness',
    ],
  },
];

export default function ExecutiveLeadershipPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <Link href="/leadership" className="inline-flex items-center text-emerald-100 hover:text-white">
            ← Back to Leadership
          </Link>
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold">Camp Executive Team</h1>
            <p className="mt-3 text-lg text-emerald-100">
              Meet the leadership team that keeps the camp running smoothly and ensures every guest feels welcomed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {EXECUTIVES.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-emerald-600">{leader.role}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{leader.name}</h2>
                    <p className="mt-3 text-slate-600">{leader.summary}</p>
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-semibold text-slate-900">Focus areas</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {leader.focus.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
