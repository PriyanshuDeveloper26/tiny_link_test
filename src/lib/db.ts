import { MongoClient, Db, Collection } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not defined. Please create a .env.local file with your MongoDB connection string. See .env.example for reference.'
    );
  }

  try {
    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    db = client.db('tinylink');
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function getLinksCollection(): Promise<Collection> {
  const database = await connectToDatabase();
  return database.collection('links');
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
