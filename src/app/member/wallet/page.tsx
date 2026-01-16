'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SpectacularButton } from '@/components/ui/spectacular';
import type { User } from '@/types/auth';
import type { WalletLedgerEntry, Wallet } from '@/types/wallet';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void } | undefined;
    };
  }
}

export default function MemberWalletPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [ledger, setLedger] = useState<WalletLedgerEntry[]>([]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPaystackReady, setIsPaystackReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData) as User;
    setUser(parsedUser);
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const loadWallet = async () => {
      try {
        const response = await fetch(`/api/wallet?userId=${user.id}&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`);
        const result = await response.json();
        if (result.success) {
          setWallet(result.wallet);
          setLedger(result.ledger || []);
        }
      } catch {
        setError('Unable to load wallet.');
      } finally {
        setLoading(false);
      }
    };

    loadWallet();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    if (window.PaystackPop) {
      setIsPaystackReady(true);
      return;
    }

    const scriptId = 'paystack-inline';
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setIsPaystackReady(true);
    script.onerror = () => setError('Unable to load Paystack checkout.');
    document.body.appendChild(script);
  }, [user]);

  const refreshWallet = async () => {
    if (!user) return;
    const response = await fetch(`/api/wallet?userId=${user.id}&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`);
    const result = await response.json();
    if (result.success) {
      setWallet(result.wallet);
      setLedger(result.ledger || []);
    }
  };

  const handleTopup = async () => {
    if (!user) return;
    setError('');
    setStatusMessage('');

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError('Enter a valid amount.');
      return;
    }

    if (!isPaystackReady) {
      setError('Payment system is still loading.');
      return;
    }

    const response = await fetch('/api/wallet/topup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        amount: numericAmount,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      setError(result.message || 'Failed to start topup.');
      return;
    }

    const reference = result.reference as string;

    const handler = window.PaystackPop?.setup({
      key: result.publicKey,
      email: user.email,
      amount: Math.round(numericAmount * 100),
      ref: reference,
      callback: async () => {
        await verifyTopup(reference);
      },
      onClose: () => {
        setStatusMessage('Checkout closed. You can verify payment status.');
      },
    });

    handler?.openIframe();
  };

  const verifyTopup = async (reference: string) => {
    if (!user) return;
    setStatusMessage('Verifying payment...');

    const response = await fetch(`/api/wallet/verify?reference=${reference}&userId=${user.id}&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`);
    const result = await response.json();

    if (result.success) {
      setStatusMessage('Wallet funded successfully.');
      await refreshWallet();
      return;
    }

    setError(result.message || 'Payment not completed.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Loading wallet...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
            <p className="text-gray-500">Fund your wallet and pay for services.</p>
          </div>
          <Link href="/member/dashboard">
            <SpectacularButton variant="outline">← Back to Dashboard</SpectacularButton>
          </Link>
        </div>

        {error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}
        {statusMessage && <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700">{statusMessage}</div>}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Wallet Balance</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">₦{Number(wallet?.balance || 0).toLocaleString()}</h2>
            <div className="mt-6 space-y-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
              />
              <SpectacularButton onClick={handleTopup} className="w-full">
                Fund Wallet
              </SpectacularButton>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900">Wallet Ledger</h3>
            <div className="mt-4 space-y-4">
              {ledger.length === 0 && <p className="text-gray-500">No wallet transactions yet.</p>}
              {ledger.map((entry) => (
                <div key={entry.reference} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-gray-800">{entry.description || entry.source}</p>
                    <p className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
                  </div>
                  <div className={`text-sm font-semibold ${entry.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.type === 'credit' ? '+' : '-'}₦{Number(entry.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
