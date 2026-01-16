import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'foursquare_ajebo';

if (!uri) {
  console.warn('MONGODB_URI is not set. Database operations will fail.');
}

type MongoCache = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

const globalForMongo = globalThis as unknown as { __mongoCache?: MongoCache };

const cache: MongoCache = globalForMongo.__mongoCache || { client: null, promise: null };

export async function getMongoClient(): Promise<MongoClient> {
  if (cache.client) {
    return cache.client;
  }

  if (!cache.promise) {
    if (!uri) {
      throw new Error('Missing MONGODB_URI');
    }

    cache.promise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    }).connect();
  }

  cache.client = await cache.promise;
  globalForMongo.__mongoCache = cache;

  return cache.client;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}
