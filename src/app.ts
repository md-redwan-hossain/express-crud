import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { booksRouter } from "./api/book/book.routes";

dotenv.config();
if (!process.env.PORT) throw new Error("Add PORT");
const port = process.env.PORT;

const app: Application = express();

app.use(bodyParser.json());
app.use("/api/books", booksRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
