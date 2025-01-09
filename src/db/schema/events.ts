import { timestamp, pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./authjs";
import { relations } from "drizzle-orm";
// TODO relations for graphql and drizzle

export const events = pgTable("event", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  description: text(),
  ownerUserId: text()
    .notNull()
    .references(() => users.id),
  timestamp: timestamp({ mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const usersToEvents = pgTable(
  "users_to_events",
  {
    eventId: text()
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  ({ eventId, userId }) => [
    {
      pk: primaryKey({ columns: [eventId, userId] }),
    },
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToEvents: many(usersToEvents),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  usersToEvents: many(usersToEvents),
}));

export const usersToEventsRelations = relations(usersToEvents, ({ one }) => ({
  event: one(events, {
    fields: [usersToEvents.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [usersToEvents.userId],
    references: [users.id],
  }),
}));
