import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const uploads = pgTable('uploads', {
   id: text('id').primaryKey().$defaultFn(() => uuidv7()),
   originalLink: text('original_link').notNull(),
   shortLink: text('short_link').notNull().unique(),
   createdAt: timestamp('created_at').defaultNow().notNull(),
})