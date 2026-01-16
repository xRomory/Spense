import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { person } from "./person.model";

export const splitType = pgEnum("split_type", ["equal", "custom"]);

export const expenses = pgTable("expenses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("expense_title").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  paidBy: uuid("paid_by")
    .references(() => person.id)
    .notNull(),
  splitType: splitType("split_type").default("equal").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  settled: boolean("is_settled").default(false).notNull(),
  settledAt: timestamp("settled_at"),
});

export const expenseSplit = pgTable(
  "expense_splits", 
  {
    id: uuid("id").primaryKey().defaultRandom(),
    expenseId: uuid("expense_id")
      .references(() => expenses.id, ({ onDelete: "cascade" }))
      .notNull(),
    personId: uuid("person_id")
      .references(() => person.id, ({ onDelete: "cascade" }))
      .notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  },
  (table) => [
    uniqueIndex("expense_person_unique").on(
      table.personId,
      table.expenseId
    ),
  ]
);