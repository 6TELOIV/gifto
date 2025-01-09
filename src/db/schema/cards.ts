import { pgTable, text, integer, boolean, unique } from "drizzle-orm/pg-core";
import { users } from "./authjs";
import { events } from "./events";
import { relations } from "drizzle-orm";

export const cells = pgTable(
  "cell",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    columnId: integer()
      .notNull()
      .references(() => columns.id, { onDelete: "cascade" }),
    columnIndex: integer().notNull(),
    title: text().default("").notNull(),
    showTitle: boolean().default(true).notNull(),
    description: text().default("").notNull(),
    font: text().default("Arial").notNull(),
    image: text(),
    locked: boolean().default(false).notNull(),
    claim: text(),
    claimedById: text().references(() => users.id),
  },
  (cell) => [
    {
      cell_ak: unique().on(cell.columnId, cell.columnIndex),
    },
  ]
);

export const columns = pgTable(
  "column",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    cardId: text()
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
    cardIndex: integer().notNull(),
  },
  (column) => [
    {
      cell_ak: unique().on(column.id, column.cardIndex),
    },
  ]
);

export const cards = pgTable(
  "card",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventId: text()
      .notNull()
      .references(() => events.id),
    userId: text()
      .notNull()
      .references(() => users.id),
  },
  (card) => [
    {
      card_ak: unique().on(card.eventId, card.userId),
    },
  ]
);
