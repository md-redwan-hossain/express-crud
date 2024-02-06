import { sqliteTable, AnySQLiteColumn, numeric, integer, text, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const schema_migrations = sqliteTable("schema_migrations", {
	version: numeric("version").primaryKey(),
});

export const books = sqliteTable("books", {
	id: integer("id").primaryKey().notNull(),
	title: text("title").notNull(),
	author: text("author").notNull(),
	genre: text("genre").notNull(),
	price: real("price").notNull(),
});