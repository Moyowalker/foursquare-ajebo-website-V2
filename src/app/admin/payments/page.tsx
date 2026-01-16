import { listPayments } from '@/lib/payment-transactions';

export const dynamic = 'force-dynamic';

interface PaymentsPageProps {
  searchParams: { status?: 'pending' | 'completed' | 'failed'; key?: string; limit?: string };
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;
  const providedKey = searchParams.key;

  if (adminKey && providedKey !== adminKey) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1>
        <p className="mt-2 text-gray-600">Provide a valid access key to view payments.</p>
      </main>
    );
  }

  const limit = Number(searchParams.limit || 50);
  const status = searchParams.status;
  const payments = await listPayments(Number.isFinite(limit) ? limit : 50, status);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Reconciliation</h1>
          <p className="text-sm text-gray-500">Most recent transactions from Venco.</p>
        </div>
        <div className="flex gap-2">
          {(['pending', 'completed', 'failed'] as const).map((statusOption) => (
            <a
              key={statusOption}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${status === statusOption ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              href={`/admin/payments?status=${statusOption}${providedKey ? `&key=${providedKey}` : ''}`}
            >
              {statusOption}
            </a>
          ))}
          <a
            className={`rounded-full px-4 py-2 text-sm font-semibold ${!status ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            href={`/admin/payments${providedKey ? `?key=${providedKey}` : ''}`}
          >
            all
          </a>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Reference</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No payments found.
                </td>
              </tr>
            )}
            {payments.map((payment) => (
              <tr key={String(payment._id)}>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{payment.reference}</td>
                <td className="px-4 py-3 text-gray-700">{payment.category}</td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="font-semibold">{payment.customerName}</div>
                  <div className="text-xs text-gray-500">{payment.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">₦{Number(payment.amount).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {payment.updatedAt ? new Date(payment.updatedAt).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
