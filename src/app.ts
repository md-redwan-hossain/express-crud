import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { booksRouter } from "./api/book/routes";

dotenv.config();

const app = express();
app.use(bodyParser.json());

if (!process.env.PORT) throw new Error("Add PORT");

const port = process.env.PORT;

app.use("/api/books", booksRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
