
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../shared/schema.js";

let db: any = null;

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set. Database functionality will be disabled.");
} else {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql, { schema });
}

export { db };
