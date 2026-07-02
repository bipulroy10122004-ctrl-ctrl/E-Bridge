import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri || uri.includes('<db_username>') || uri.includes('<db_password>')) {
  // Return a rejected promise when credentials are missing or still templated.
  // The db.js layer catches this and falls back to in-memory data.
  clientPromise = Promise.reject(
    new Error(
      'MONGODB_URI is not configured with real credentials. ' +
      'The app will run with in-memory sample data. ' +
      'To use MongoDB, update .env.local with your actual connection string.'
    )
  );
  // Prevent Node from crashing on unhandled rejection
  clientPromise.catch(() => {});
} else {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
