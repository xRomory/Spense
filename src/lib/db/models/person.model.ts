import {
  integer,
  pgTable,
  varchar
} from "drizzle-orm/pg-core";

export const person = pgTable("person", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
});