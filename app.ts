import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { booksRouter } from "./books.controller";
dotenv.config();

const app = express();
app.use(bodyParser.json());

if (!process.env.PORT) throw new Error("Add PORT");

const port = process.env.PORT;

app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
