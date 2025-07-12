import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY must be set. Did you forget to configure Supabase?",
  );
}

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Create database connection for Drizzle using Supabase connection string
const connectionString = process.env.DATABASE_URL || 
  `postgresql://postgres:UR8mIV7amEbsS8oG@db.glqkmqucggccnxxlbjzq.supabase.co:5432/postgres?pgbouncer=true`;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });