import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v4 as uuid4 } from "uuid";
import { person } from "./person.model";

export const splitType = pgEnum("split_type", ["equal", "custom"]);

export const expenses = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("expense_title").notNull(),
  amount: integer().notNull(),
  paidBy: varchar({ length: 50 }).notNull(),
  splitType: splitType("split_types").default("equal").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  settled: boolean("is_settled").default(false).notNull(),
  settledAt: timestamp("settled_at").defaultNow(),
});

export const expenseSplit = pgTable("expense_splits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  expenseId: integer("expense_id")
    .references(() => expenses.id, ({ onDelete: "cascade" }))
    .notNull(),
  personId: uuid()
    .$defaultFn(() => uuid4())
    .references(() => person.id, ({ onDelete: "cascade" }))
    .notNull(),
  amount: doublePrecision().notNull(),
});