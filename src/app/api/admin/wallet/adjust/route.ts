import { NextRequest, NextResponse } from 'next/server';
import { creditWallet, debitWallet, ensureWallet } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, userId, email, name, amount, type, description } = body;

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!userId || !email || !name || !amount || !type) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    await ensureWallet(userId, email, name);

    const reference = `ADMIN-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    if (type === 'credit') {
      const wallet = await creditWallet({
        userId,
        email,
        name,
        amount: Number(amount),
        reference,
        source: 'manual',
        description: description || 'Admin credit',
        createdBy: 'admin',
      });

      return NextResponse.json({ success: true, wallet });
    }

    const wallet = await debitWallet({
      userId,
      amount: Number(amount),
      reference,
      source: 'admin',
      description: description || 'Admin debit',
      createdBy: 'admin',
    });

    return NextResponse.json({ success: true, wallet });
  } catch (error) {
    console.error('Wallet adjust error:', error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Failed' }, { status: 500 });
  }
}
