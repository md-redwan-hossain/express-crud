import Database from "better-sqlite3";
import { SQL, and, asc, desc, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import express, { Request, Response, Router } from "express";
import { books } from "./drizzle/schema";
import { HttpStatus } from "./http-status";
const sqlite = new Database("db.sqlite3");
const db = drizzle(sqlite);

export const booksRouter: Router = express.Router();

export enum SortField {
  title = "title",
  author = "author",
  genre = "genre",
  price = "price"
}

booksRouter.post("", async (req: Request, res: Response) => {
  const dataForInsert: typeof books.$inferInsert = {
    id: req.body["id"],
    title: req.body["title"],
    author: req.body["author"],
    genre: req.body["genre"],
    price: req.body["price"]
  };

  const [data] = await db.insert(books).values(dataForInsert).returning();

  if (!data?.id) return res.status(HttpStatus.BAD_REQUEST).end();
  res.status(HttpStatus.CREATED).send(data).end();
});

booksRouter.get("/:id", async (req: Request, res: Response) => {
  const uniqueIdentifier = req.params["id"];
  const [data] = await db
    .select()
    .from(books)
    .where(eq(books.id, parseInt(uniqueIdentifier)));

  if (!data?.id) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `book with id: ${uniqueIdentifier} was not found` })
      .end();
  }

  res.status(HttpStatus.OK).send(data).end();
});

booksRouter.get("", async (req: Request, res: Response) => {
  const where: SQL[] = [];

  if (req.query["author"]) {
    where.push(like(books.author, req.query["author"].toString()));
  } else if (req.query["title"]) {
    where.push(like(books.title, req.query["title"].toString()));
  } else if (req.query["genre"]) {
    where.push(like(books.genre, req.query["genre"].toString()));
  }

  const result = db
    .select()
    .from(books)
    .where(and(...where));

  let data;

  if (req.query["order"] === "DESC") {
    data = req.query["sort"]
      ? await result.orderBy(desc(books[req.query["sort"] as SortField]))
      : await result.orderBy(desc(books.id));
  } else {
    data = req.query["sort"]
      ? await result.orderBy(asc(books[req.query["sort"] as SortField]))
      : await result.orderBy(asc(books.id));
  }

  res.status(HttpStatus.OK).json({ books: data }).end();
});

booksRouter.put("/:id", async (req: Request, res: Response) => {
  const uniqueIdentifier = req.params["id"];

  const [existingData] = await db
    .select()
    .from(books)
    .where(eq(books.id, parseInt(uniqueIdentifier)));

  if (!existingData?.id) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `book with id: ${uniqueIdentifier} was not found` })
      .end();
  }

  const dataForUpdate: typeof books.$inferInsert = {
    title: req.body["title"],
    author: req.body["author"],
    genre: req.body["genre"],
    price: req.body["price"]
  };

  const [data] = await db
    .update(books)
    .set(dataForUpdate)
    .where(eq(books.id, parseInt(uniqueIdentifier)))
    .returning();

  res.status(HttpStatus.OK).send(data).end();
});
