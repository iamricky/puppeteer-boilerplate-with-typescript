import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});
pgClient;

export const db = drizzle(pgClient);
