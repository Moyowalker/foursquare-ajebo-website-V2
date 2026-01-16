import { NextRequest, NextResponse } from 'next/server';
import { createWalletRule, listWalletRules, setWalletRuleActive } from '@/lib/wallet';

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get('key');
    const userId = request.nextUrl.searchParams.get('userId') || undefined;

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const rules = await listWalletRules(userId);
    return NextResponse.json({ success: true, rules });
  } catch (error) {
    console.error('Wallet rules fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, userId, amount, schedule, description } = body;

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!userId || !amount || !schedule || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const rule = await createWalletRule({
      userId,
      amount: Number(amount),
      schedule,
      description,
      createdBy: 'admin',
    });

    return NextResponse.json({ success: true, rule });
  } catch (error) {
    console.error('Wallet rules create error:', error);
    return NextResponse.json({ success: false, message: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, ruleId, active } = body;

    if (!key || key !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!ruleId || typeof active !== 'boolean') {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    await setWalletRuleActive(ruleId, active);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Wallet rules update error:', error);
    return NextResponse.json({ success: false, message: 'Failed' }, { status: 500 });
  }
}
