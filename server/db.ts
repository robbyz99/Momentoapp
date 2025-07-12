import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "../shared/schema.js";

// Check for required environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const databaseUrl = process.env.DATABASE_URL;

// Log environment variable status for debugging
console.log('Environment variables check:');
console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
console.log('DATABASE_URL:', databaseUrl ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required Supabase environment variables');
  // Don't throw immediately - let the app start and handle errors gracefully
}

// Create Supabase client (will be undefined if env vars are missing)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Create database connection for Drizzle
let db: any = null;

try {
  if (databaseUrl) {
    const client = postgres(databaseUrl, { prepare: false });
    db = drizzle(client, { schema });
    console.log('Database connection established successfully');
  } else {
    console.log('No DATABASE_URL provided, using in-memory storage');
  }
} catch (error) {
  console.error('Failed to establish database connection:', error);
  // Don't throw - let the app continue with in-memory storage
}

export { db };