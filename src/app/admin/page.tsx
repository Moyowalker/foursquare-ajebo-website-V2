import Link from 'next/link';

type StatCard = {
  label: string;
  value: string;
  change: string;
};

type Module = {
  title: string;
  description: string;
  status: 'Live' | 'In review' | 'Planned';
  href?: string;
};

const STAT_CARDS: StatCard[] = [
  { label: 'Total Members', value: '2,418', change: '+8% this month' },
  { label: 'Active Bookings', value: '38', change: '12 awaiting approval' },
  { label: 'Payments Processed', value: '₦12.4M', change: '+14% this month' },
  { label: 'Support Requests', value: '24', change: '6 require action' },
];

const MODULES: Module[] = [
  { title: 'Payments', description: 'Monitor and reconcile all transactions.', status: 'Live', href: '/admin/payments' },
  { title: 'Wallet Operations', description: 'Review funding activity and balances.', status: 'Live', href: '/admin/wallet' },
  { title: 'Bookings & Retreats', description: 'Approve guest room and facility reservations.', status: 'Planned' },
  { title: 'Members & Roles', description: 'Manage member access, profiles, and roles.', status: 'Planned' },
  { title: 'Events & Programs', description: 'Create schedules, register attendees, and track hosts.', status: 'Planned' },
  { title: 'Facilities', description: 'Manage halls, accommodations, and maintenance updates.', status: 'Planned' },
  { title: 'Announcements', description: 'Publish updates for members and guests.', status: 'Planned' },
  { title: 'Content & Blog', description: 'Review posts, media, and community stories.', status: 'Planned' },
];

const ACTIVITY = [
  'New booking request submitted for Conference Hall A.',
  'Wallet top-up completed by member ID 2045.',
  'Payment confirmation pending for guest house reservation.',
  'New announcement draft created for Easter retreat.',
];

const PRIORITY_QUEUE = [
  { title: 'Verify large payment', detail: 'Guest house reservation • ₦450,000', status: 'Urgent' },
  { title: 'Approve retreat booking', detail: 'Youth retreat • 54 attendees', status: 'High' },
  { title: 'Review member profile update', detail: 'New ID documents submitted', status: 'Medium' },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col gap-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm text-slate-500">Admin Command Center</p>
                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">God-eye dashboard overview</h1>
                <p className="mt-2 text-slate-600 max-w-2xl">
                  Full operational visibility across members, bookings, payments, facilities, and content.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/admin/payments" className="inline-flex items-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
                  Review payments
                </Link>
                <Link href="/admin/wallet" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Wallet operations
                </Link>
                <Link href="/member/dashboard" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Member view
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STAT_CARDS.map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{card.change}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-semibold text-slate-900">Operations modules</h2>
              <p className="mt-2 text-slate-600">Control every workflow across the camp and member portal.</p>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {MODULES.map((module) => (
                  <div key={module.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        module.status === 'Live'
                          ? 'bg-emerald-100 text-emerald-700'
                          : module.status === 'In review'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-200 text-slate-700'
                      }`}>
                        {module.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                    {module.href ? (
                      <Link href={module.href} className="mt-3 inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800">
                        Open module →
                      </Link>
                    ) : (
                      <p className="mt-3 text-xs text-slate-500">Module setup in progress</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Priority queue</h2>
              <p className="mt-2 text-slate-600">Items that need immediate admin attention.</p>
              <div className="mt-4 space-y-3">
                {PRIORITY_QUEUE.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <span className="text-xs font-semibold text-rose-600">{item.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Recent activity</h2>
              <p className="mt-2 text-slate-600">Latest changes across payments, bookings, and members.</p>
              <div className="mt-4 space-y-3">
                {ACTIVITY.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">System health</h2>
              <p className="mt-2 text-slate-600">Operational readiness for the portal and public site.</p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: 'Payment gateway', status: 'Connected' },
                  { label: 'Member auth', status: 'Stable' },
                  { label: 'Booking workflow', status: 'Monitoring' },
                  { label: 'Content publishing', status: 'Stable' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-xs font-semibold text-emerald-700">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
