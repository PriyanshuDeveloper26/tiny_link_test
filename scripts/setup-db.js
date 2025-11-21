const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  let client;
  
  try {
    console.log('Setting up MongoDB database...');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in .env.local');
    }

    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('tinylink');
    const collection = db.collection('links');

    // Create unique index on code field
    await collection.createIndex({ code: 1 }, { unique: true });
    console.log('✅ Created unique index on "code" field');

    // Create index on created_at for sorting
    await collection.createIndex({ created_at: -1 });
    console.log('✅ Created index on "created_at" field');

    console.log('✅ Database setup complete!');
    console.log('Collection "links" is ready to use.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

setupDatabase();
