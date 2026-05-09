import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const uploads = pgTable('uploads', {
   id: text('id').primaryKey().$defaultFn(() => uuidv7()),
   originalLink: text('original_link').notNull(),
   shortLink: text('short_link').notNull().unique(),
   accessNumber: integer('access_number').notNull().default(0),
   createdAt: timestamp('created_at').defaultNow().notNull(),
})