export type WalletLedgerType = 'credit' | 'debit';
export type WalletLedgerSource = 'paystack' | 'manual' | 'admin' | 'auto';
export type WalletLedgerStatus = 'completed' | 'failed';

export interface Wallet {
  userId: string;
  email: string;
  name: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletLedgerEntry {
  reference: string;
  userId: string;
  type: WalletLedgerType;
  source: WalletLedgerSource;
  amount: number;
  status: WalletLedgerStatus;
  description?: string;
  metadata?: Record<string, unknown>;
  balanceAfter?: number;
  createdBy?: string;
  createdAt: string;
}

export type WalletRuleSchedule = 'daily' | 'weekly' | 'monthly';

export interface WalletRule {
  id: string;
  userId: string;
  amount: number;
  schedule: WalletRuleSchedule;
  description: string;
  nextRunAt: string;
  active: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
