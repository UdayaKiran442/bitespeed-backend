import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const contacts = pgTable('contacts', {
    id: serial('id').primaryKey(),
    email: varchar('email'),
    phone: varchar('phone'),
    linkedId: integer('linked_id'),
    linkPrecedence: varchar('link_precedence'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Contact = typeof contacts;