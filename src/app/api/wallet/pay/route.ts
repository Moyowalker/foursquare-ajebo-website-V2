import { NextRequest, NextResponse } from 'next/server';
import { debitWallet } from '@/lib/wallet';
import { upsertPaymentTransaction } from '@/lib/payment-transactions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, name, amount, category, description } = body;

    if (!userId || !email || !name || !amount || !category) {
      return NextResponse.json({ success: false, message: 'userId, email, name, amount, category are required' }, { status: 400 });
    }

    const reference = `WALPAY-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    await debitWallet({
      userId,
      amount: Number(amount),
      reference,
      source: 'admin',
      description: description || 'Wallet payment',
      metadata: { category },
      createdBy: 'user',
    });

    await upsertPaymentTransaction({
      reference,
      gateway: 'wallet',
      category,
      amount: Number(amount),
      status: 'completed',
      customerName: name,
      customerEmail: email,
      customerPhone: '',
      details: description || 'Wallet payment',
      gatewayReference: reference,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, reference });
  } catch (error) {
    console.error('Wallet pay error:', error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Wallet payment failed' }, { status: 500 });
  }
}
