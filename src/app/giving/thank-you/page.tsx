'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SpectacularCard } from '@/components/ui/spectacular';

type PaymentStatus = 'pending' | 'success' | 'failed';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const referenceFromQuery = useMemo(
    () =>
      searchParams.get('reference') ||
      searchParams.get('trxref') ||
      searchParams.get('ref') ||
      '',
    [searchParams]
  );

  const explicitStatus = useMemo(() => {
    const raw = (searchParams.get('status') || '').toLowerCase();
    if (raw === 'success' || raw === 'completed') return 'success' as PaymentStatus;
    if (raw === 'failed') return 'failed' as PaymentStatus;
    return null;
  }, [searchParams]);

  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [message, setMessage] = useState('Verifying your payment...');
  const [isVerifying, setIsVerifying] = useState(false);
  const [displayReference, setDisplayReference] = useState(() =>
    referenceFromQuery || `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  );

  const verify = async (ref: string) => {
    setIsVerifying(true);
    setDisplayReference(ref);

    try {
      const response = await fetch(`/api/payments/paystack?reference=${encodeURIComponent(ref)}`);
      const result = await response.json();

      const normalizedStatus: PaymentStatus =
        result.status === 'success' || result.status === 'completed' || result.success === true
          ? 'success'
          : result.status === 'failed' || result.success === false
            ? 'failed'
            : 'pending';

      setStatus(normalizedStatus);
      setMessage(result.message || 'Verification complete.');

      try {
        localStorage.setItem(
          'payment:status',
          JSON.stringify({ reference: ref, status: normalizedStatus, ts: Date.now() })
        );
      } catch {
        /* best effort signal */
      }
    } catch {
      setStatus((prev) => (prev === 'success' ? prev : 'pending'));
      setMessage('We could not confirm right away. Your payment will be reconciled shortly.');
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (!referenceFromQuery) {
      setMessage('Payment completed.');
      setStatus(explicitStatus || 'success');
      return;
    }

    if (explicitStatus) {
      setStatus(explicitStatus);
      setMessage(explicitStatus === 'success' ? 'Payment confirmed.' : 'Payment could not be confirmed.');
    }

    void verify(referenceFromQuery);
  }, [referenceFromQuery, explicitStatus]);

  const statusCopy = status === 'success'
    ? 'Your payment was confirmed successfully.'
    : status === 'failed'
      ? 'We could not confirm this payment. Please contact support or retry.'
      : 'Still checking with the payment gateway. This usually takes a moment.';

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SpectacularCard className="bg-white border border-slate-200 shadow-xl p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Payment received</p>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">We are processing your payment</h1>
                <p className="text-slate-600">We are confirming your payment now. A confirmation will arrive shortly.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Reference: {displayReference}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">
                <span className={`h-2 w-2 rounded-full ${status === 'success' ? 'bg-emerald-500' : status === 'failed' ? 'bg-red-500' : 'bg-amber-400'}`} />
                {isVerifying ? 'Verifying with Paystack...' : status === 'success' ? 'Payment confirmed' : status === 'failed' ? 'Needs attention' : 'Awaiting confirmation'}
              </span>
              <button
                type="button"
                onClick={() => referenceFromQuery && verify(referenceFromQuery)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                disabled={isVerifying || !referenceFromQuery}
              >
                {isVerifying ? 'Checking…' : 'Refresh status'}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-emerald-600">Status</p>
              <p className="text-slate-700">{statusCopy}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-emerald-600">Security</p>
              <p className="text-slate-700">Payments are encrypted with Paystack.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-emerald-600">Support</p>
              <p className="text-slate-700">Questions? Contact our team any time.</p>
            </div>
          </div>
        </SpectacularCard>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SpectacularCard className="lg:col-span-2 bg-white border border-slate-200 shadow-xl p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">What happens next</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">We are wrapping things up</h2>
                <p className="mt-2 text-slate-600">{statusCopy}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Safe & secure
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Confirmation in your inbox',
                  desc: 'A confirmation email or SMS will arrive shortly.',
                },
                {
                  title: 'Reference saved',
                  desc: 'Keep this reference for support or follow‑up.',
                },
                {
                  title: 'Secure processing',
                  desc: 'Your payment is encrypted end‑to‑end with Paystack.',
                },
                {
                  title: 'Need help?',
                  desc: 'Reach out to our team if anything looks off.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item.title}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/member/dashboard" className="flex-1">
                <span className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold shadow hover:bg-emerald-700 transition">View Payment History</span>
              </Link>
              <Link href="/giving" className="flex-1">
                <span className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-200 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 transition">Make Another Payment</span>
              </Link>
              <Link href="/contact" className="flex-1">
                <span className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-6 py-3 text-slate-800 font-semibold hover:bg-slate-50 transition">Contact Support</span>
              </Link>
            </div>
          </SpectacularCard>

          <div className="space-y-4">
            <SpectacularCard className="bg-white/95 border border-slate-200 shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900">Stay connected</h3>
              <p className="mt-2 text-sm text-slate-600">Be part of what God is doing through our community.</p>
              <div className="mt-4 space-y-3">
                <Link href="/events" className="block rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50">
                  <div className="font-semibold text-slate-900">Upcoming Events</div>
                  <p className="text-sm text-slate-600">Join us for worship and fellowship.</p>
                </Link>
                <Link href="/ministry" className="block rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50">
                  <div className="font-semibold text-slate-900">Serve with us</div>
                  <p className="text-sm text-slate-600">Volunteer opportunities across ministries.</p>
                </Link>
                <Link href="/member/prayer-requests" className="block rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50">
                  <div className="font-semibold text-slate-900">Prayer Requests</div>
                  <p className="text-sm text-slate-600">Share your needs with our prayer team.</p>
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="https://facebook.com" className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition">Share on Facebook</Link>
                <Link href="https://twitter.com" className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition">Share on Twitter</Link>
              </div>
            </SpectacularCard>

            <SpectacularCard className="bg-slate-900 text-white shadow-lg p-6">
              <p className="text-sm uppercase tracking-wide text-emerald-200">Scripture</p>
              <h3 className="mt-2 text-xl font-semibold">Give, and it will be given to you.</h3>
              <p className="mt-2 text-sm text-slate-200">A good measure, pressed down, shaken together and running over, will be poured into your lap.</p>
              <p className="mt-3 text-sm font-semibold text-emerald-200">Luke 6:38</p>
            </SpectacularCard>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-slate-500">
          Need help? Contact us at{' '}
          <a href="mailto:giving@foursquareajebo.org" className="text-emerald-600 hover:text-emerald-700">giving@foursquareajebo.org</a>
          {' '}or{' '}
          <a href="tel:+2348012345678" className="text-emerald-600 hover:text-emerald-700">+234 801 234 5678</a>.
        </div>
      </div>
    </div>
  );
}
