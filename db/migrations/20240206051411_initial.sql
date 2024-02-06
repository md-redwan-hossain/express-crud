-- migrate:up
CREATE TABLE books (
  id INTEGER NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  price REAL NOT NULL,
  UNIQUE (title, author, genre, price)
);

-- migrate:down
DROP TABLE books;