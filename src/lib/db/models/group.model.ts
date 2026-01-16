import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupName: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groupMembers = pgTable("group_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("group_id")
    .references(() => groups.id, ({ onDelete: "cascade" }))
    .notNull(),
  name: varchar({ length: 100 }).notNull(),
  isCreator: boolean("is_creator").default(false).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});