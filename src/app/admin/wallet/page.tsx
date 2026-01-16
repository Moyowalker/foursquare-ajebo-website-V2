'use client';

import { useState } from 'react';
import type { Wallet } from '@/types/wallet';

export default function AdminWalletPage() {
  const [adminKey, setAdminKey] = useState('');
  const [query, setQuery] = useState('');
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [ruleAmount, setRuleAmount] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [ruleSchedule, setRuleSchedule] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setMessage('');
    const response = await fetch(`/api/admin/wallet/search?key=${encodeURIComponent(adminKey)}&q=${encodeURIComponent(query)}`);
    const result = await response.json();
    if (!result.success) {
      setError(result.message || 'Search failed');
      return;
    }
    setWallets(result.wallets || []);
  };

  const handleAdjust = async (type: 'credit' | 'debit') => {
    if (!selectedWallet) return;
    setError('');
    setMessage('');

    const response = await fetch('/api/admin/wallet/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: adminKey,
        userId: selectedWallet.userId,
        email: selectedWallet.email,
        name: selectedWallet.name,
        amount: Number(amount),
        type,
        description,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      setError(result.message || 'Update failed');
      return;
    }

    setMessage('Wallet updated successfully');
  };

  const handleCreateRule = async () => {
    if (!selectedWallet) return;
    setError('');
    setMessage('');

    const response = await fetch('/api/admin/wallet/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: adminKey,
        userId: selectedWallet.userId,
        amount: Number(ruleAmount),
        schedule: ruleSchedule,
        description: ruleDescription,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      setError(result.message || 'Rule creation failed');
      return;
    }

    setMessage('Auto-debit rule created');
  };

  const handleRunRules = async () => {
    setError('');
    setMessage('');

    const response = await fetch('/api/admin/wallet/rules/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey }),
    });

    const result = await response.json();
    if (!result.success) {
      setError(result.message || 'Failed to run rules');
      return;
    }

    setMessage('Auto-debit rules executed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Wallet Admin</h1>
        <p className="text-gray-500">Search users, credit/debit wallets, and manage auto-debit rules.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Admin Access</h2>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin key"
              className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-2"
            />

            <div className="mt-6">
              <label className="text-sm text-gray-500">Search user</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Email, name, or user ID"
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2"
              />
              <button
                onClick={handleSearch}
                className="mt-3 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Search
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.userId}
                  onClick={() => setSelectedWallet(wallet)}
                  className={`w-full rounded-lg border px-4 py-3 text-left ${selectedWallet?.userId === wallet.userId ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}
                >
                  <p className="font-semibold text-gray-800">{wallet.name}</p>
                  <p className="text-xs text-gray-500">{wallet.email}</p>
                  <p className="text-xs text-gray-500">Balance: ₦{Number(wallet.balance).toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Adjust Wallet</h2>
            {selectedWallet ? (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600">Selected: {selectedWallet.name}</p>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2"
                />
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Reason"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAdjust('credit')}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                  >
                    Credit
                  </button>
                  <button
                    onClick={() => handleAdjust('debit')}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Debit
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Select a wallet to adjust.</p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Auto-debit Rules</h2>
            {selectedWallet ? (
              <div className="mt-4 space-y-3">
                <input
                  type="number"
                  value={ruleAmount}
                  onChange={(e) => setRuleAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2"
                />
                <select
                  value={ruleSchedule}
                  onChange={(e) => setRuleSchedule(e.target.value as 'daily' | 'weekly' | 'monthly')}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <input
                  value={ruleDescription}
                  onChange={(e) => setRuleDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2"
                />
                <button
                  onClick={handleCreateRule}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Create Rule
                </button>
                <button
                  onClick={handleRunRules}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Run Due Rules Now
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Select a wallet to add rules.</p>
            )}
          </div>
        </div>

        {(error || message) && (
          <div className={`mt-6 rounded-lg border px-4 py-3 ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
            {error || message}
          </div>
        )}
      </div>
    </div>
  );
}
