import { NextRequest, NextResponse } from 'next/server';
import { searchWallets } from '@/lib/wallet';

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get('key');
    const query = request.nextUrl.searchParams.get('q') || '';

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const wallets = await searchWallets(query);
    return NextResponse.json({ success: true, wallets });
  } catch (error) {
    console.error('Wallet search error:', error);
    return NextResponse.json({ success: false, message: 'Search failed' }, { status: 500 });
  }
}
