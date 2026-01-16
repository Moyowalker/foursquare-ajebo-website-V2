import { NextRequest, NextResponse } from 'next/server';
import { runDueWalletRules } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const results = await runDueWalletRules();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Wallet rules run error:', error);
    return NextResponse.json({ success: false, message: 'Failed' }, { status: 500 });
  }
}
