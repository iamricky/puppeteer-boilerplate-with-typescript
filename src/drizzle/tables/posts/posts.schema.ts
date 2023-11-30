import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: text("brand_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});
