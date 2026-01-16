import { getMongoDb } from '@/lib/mongodb';
import type { WalletLedgerEntry, WalletLedgerSource, WalletLedgerStatus, WalletLedgerType, WalletRule, WalletRuleSchedule } from '@/types/wallet';

const WALLET_COLLECTION = 'wallets';
const LEDGER_COLLECTION = 'wallet_ledger';
const RULE_COLLECTION = 'wallet_rules';

function getNextRunAt(schedule: WalletRuleSchedule, fromDate = new Date()) {
  const next = new Date(fromDate);
  if (schedule === 'daily') {
    next.setDate(next.getDate() + 1);
  } else if (schedule === 'weekly') {
    next.setDate(next.getDate() + 7);
  } else {
    next.setMonth(next.getMonth() + 1);
  }
  return next;
}

export async function ensureWallet(userId: string, email: string, name: string) {
  const db = await getMongoDb();
  const now = new Date();
  await db.collection(WALLET_COLLECTION).updateOne(
    { userId },
    {
      $setOnInsert: {
        userId,
        email,
        name,
        balance: 0,
        createdAt: now,
      },
      $set: {
        email,
        name,
        updatedAt: now,
      },
    },
    { upsert: true }
  );

  return db.collection(WALLET_COLLECTION).findOne({ userId });
}

export async function getWallet(userId: string) {
  const db = await getMongoDb();
  return db.collection(WALLET_COLLECTION).findOne({ userId });
}

export async function searchWallets(query: string) {
  const db = await getMongoDb();
  const regex = new RegExp(query, 'i');
  return db
    .collection(WALLET_COLLECTION)
    .find({ $or: [{ email: regex }, { name: regex }, { userId: regex }] })
    .limit(20)
    .toArray();
}

export async function listLedger(userId: string, limit = 50) {
  const db = await getMongoDb();
  return db.collection(LEDGER_COLLECTION).find({ userId }).sort({ createdAt: -1 }).limit(limit).toArray();
}

async function addLedgerEntry(entry: WalletLedgerEntry) {
  const db = await getMongoDb();
  return db.collection(LEDGER_COLLECTION).insertOne(entry);
}

async function ledgerEntryExists(reference: string) {
  const db = await getMongoDb();
  return db.collection(LEDGER_COLLECTION).findOne({ reference });
}

export async function creditWallet(params: {
  userId: string;
  email: string;
  name: string;
  amount: number;
  reference: string;
  source: WalletLedgerSource;
  description?: string;
  metadata?: Record<string, unknown>;
  createdBy?: string;
}) {
  const wallet = await ensureWallet(params.userId, params.email, params.name);

  if (await ledgerEntryExists(params.reference)) {
    return wallet;
  }

  const db = await getMongoDb();
  const now = new Date();

  const updated = await db.collection(WALLET_COLLECTION).findOneAndUpdate(
    { userId: params.userId },
    { $inc: { balance: params.amount }, $set: { updatedAt: now } },
    { returnDocument: 'after' }
  );

  const balanceAfter = updated.value?.balance ?? wallet?.balance ?? 0;

  await addLedgerEntry({
    reference: params.reference,
    userId: params.userId,
    type: 'credit',
    source: params.source,
    amount: params.amount,
    status: 'completed',
    description: params.description,
    metadata: params.metadata,
    balanceAfter,
    createdBy: params.createdBy,
    createdAt: now.toISOString(),
  });

  return updated.value;
}

export async function debitWallet(params: {
  userId: string;
  amount: number;
  reference: string;
  source: WalletLedgerSource;
  description?: string;
  metadata?: Record<string, unknown>;
  createdBy?: string;
}) {
  const db = await getMongoDb();
  const wallet = await db.collection(WALLET_COLLECTION).findOne({ userId: params.userId });
  const now = new Date();

  if (!wallet || wallet.balance < params.amount) {
    await addLedgerEntry({
      reference: params.reference,
      userId: params.userId,
      type: 'debit',
      source: params.source,
      amount: params.amount,
      status: 'failed',
      description: params.description || 'Insufficient balance',
      metadata: params.metadata,
      balanceAfter: wallet?.balance ?? 0,
      createdBy: params.createdBy,
      createdAt: now.toISOString(),
    });

    throw new Error('Insufficient wallet balance');
  }

  const updated = await db.collection(WALLET_COLLECTION).findOneAndUpdate(
    { userId: params.userId },
    { $inc: { balance: -params.amount }, $set: { updatedAt: now } },
    { returnDocument: 'after' }
  );

  const balanceAfter = updated.value?.balance ?? wallet.balance;

  await addLedgerEntry({
    reference: params.reference,
    userId: params.userId,
    type: 'debit',
    source: params.source,
    amount: params.amount,
    status: 'completed',
    description: params.description,
    metadata: params.metadata,
    balanceAfter,
    createdBy: params.createdBy,
    createdAt: now.toISOString(),
  });

  return updated.value;
}

export async function createWalletRule(params: {
  userId: string;
  amount: number;
  schedule: WalletRuleSchedule;
  description: string;
  createdBy: string;
}) {
  const db = await getMongoDb();
  const now = new Date();
  const rule: WalletRule = {
    id: `rule-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    userId: params.userId,
    amount: params.amount,
    schedule: params.schedule,
    description: params.description,
    nextRunAt: getNextRunAt(params.schedule, now).toISOString(),
    active: true,
    createdBy: params.createdBy,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  await db.collection(RULE_COLLECTION).insertOne(rule);
  return rule;
}

export async function listWalletRules(userId?: string) {
  const db = await getMongoDb();
  const query = userId ? { userId } : {};
  return db.collection(RULE_COLLECTION).find(query).sort({ createdAt: -1 }).toArray();
}

export async function setWalletRuleActive(ruleId: string, active: boolean) {
  const db = await getMongoDb();
  return db.collection(RULE_COLLECTION).updateOne(
    { id: ruleId },
    { $set: { active, updatedAt: new Date().toISOString() } }
  );
}

export async function runDueWalletRules() {
  const db = await getMongoDb();
  const now = new Date();
  const dueRules = await db
    .collection(RULE_COLLECTION)
    .find({ active: true, nextRunAt: { $lte: now.toISOString() } })
    .toArray();

  const results: Array<{ ruleId: string; status: WalletLedgerStatus; message?: string }> = [];

  for (const rule of dueRules) {
    const reference = `AUTO-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    try {
      await debitWallet({
        userId: rule.userId,
        amount: rule.amount,
        reference,
        source: 'auto',
        description: rule.description,
        createdBy: 'system',
      });

      results.push({ ruleId: rule.id, status: 'completed' });
    } catch (error) {
      results.push({ ruleId: rule.id, status: 'failed', message: error instanceof Error ? error.message : 'Failed' });
    }

    const nextRunAt = getNextRunAt(rule.schedule, now).toISOString();
    await db.collection(RULE_COLLECTION).updateOne(
      { id: rule.id },
      { $set: { nextRunAt, updatedAt: new Date().toISOString() } }
    );
  }

  return results;
}
