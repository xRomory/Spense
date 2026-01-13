import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const groupDataTable = pgTable("groupData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  groupName: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groupMemberTable = pgTable("groupMember", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  groupId: integer("group_id")
    .references(() => groupDataTable.id, ({ onDelete: "cascade" }))
    .notNull(),
  name: varchar({ length: 100 }).notNull(),
  isCreator: boolean("is_creator").default(false).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});