import { getMongoDb } from '@/lib/mongodb';
import type { PaymentCategory } from '@/types/payments';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentTransactionRecord {
  reference: string;
  category: PaymentCategory;
  amount: number;
  status: PaymentStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details?: string | null;
  vencoTransactionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = 'payment_transactions';

export async function upsertPaymentTransaction(record: PaymentTransactionRecord) {
  const db = await getMongoDb();
  const now = new Date();

  return db.collection(COLLECTION).updateOne(
    { reference: record.reference },
    {
      $set: {
        category: record.category,
        amount: record.amount,
        status: record.status,
        customerName: record.customerName,
        customerEmail: record.customerEmail,
        customerPhone: record.customerPhone,
        details: record.details || null,
        vencoTransactionId: record.vencoTransactionId || null,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: record.createdAt || now,
      },
    },
    { upsert: true }
  );
}

export async function updatePaymentStatus(reference: string, status: PaymentStatus, vencoTransactionId?: string | null) {
  const db = await getMongoDb();
  return db.collection(COLLECTION).updateOne(
    { reference },
    {
      $set: {
        status,
        vencoTransactionId: vencoTransactionId || null,
        updatedAt: new Date(),
      },
    }
  );
}

export async function findPaymentByReference(reference: string) {
  const db = await getMongoDb();
  return db.collection(COLLECTION).findOne({ reference });
}

export async function listPayments(limit = 50, status?: PaymentStatus) {
  const db = await getMongoDb();
  const query = status ? { status } : {};
  return db.collection(COLLECTION).find(query).sort({ createdAt: -1 }).limit(limit).toArray();
}
