import Image from 'next/image';
import Link from 'next/link';

export default function JohnOnwughaiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-4">
            <Link href="/leadership/executives" className="text-emerald-700">← Back to Executive Team</Link>
            <h1 className="text-4xl font-semibold text-slate-900">Pastor John Onwughai</h1>
            <p className="text-lg text-slate-600">Chief Security Officer</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative h-96 rounded-3xl overflow-hidden border border-slate-200 bg-white">
            <Image
              src="/images/leadership/executives/john-onwughai.jpg"
              alt="Pastor John Onwughai"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-900">Role overview</h2>
              <p className="mt-3 text-slate-600">
                Pastor John Onwughai oversees security operations and safety protocols, ensuring a secure
                environment for guests, staff, and visitors across the camp.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-semibold text-slate-900">Focus areas</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Safety planning and emergency readiness</li>
                <li>• Security team coordination and training</li>
                <li>• Guest access and facility monitoring</li>
                <li>• Event and conference security support</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Contact leadership team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
