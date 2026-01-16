import {
  pgTable,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const person = pgTable("person", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
});