CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE books (
  id INTEGER NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  price REAL NOT NULL,
  UNIQUE (title, author, genre, price)
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20240206051411');
