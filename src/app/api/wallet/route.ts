import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { ensureWallet, listLedger } from '@/lib/wallet';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    if (!userId || !email || !name) {
      return NextResponse.json({ success: false, message: 'userId, email and name are required' }, { status: 400 });
    }

    const wallet = await ensureWallet(userId, email, name);
    const ledger = await listLedger(userId, 50);

    return NextResponse.json({ success: true, wallet, ledger });
  } catch (error) {
    console.error('Wallet fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load wallet' }, { status: 500 });
  }
}
