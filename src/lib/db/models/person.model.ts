import {
  integer,
  pgTable,
  varchar
} from "drizzle-orm/pg-core";

export const personTable = pgTable("person", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
});