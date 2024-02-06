import express, { Router } from "express";
import { asyncHandler } from "node-async-handler";
import { createBook, getAllBooks, getOneBook, updateBook } from "./book.middlewares";
import {
  createBookValidationRules,
  queryBookValidationRules,
  updateBookValidationRules
} from "./book.validators";

export const booksRouter: Router = express.Router();

booksRouter.get("/:id", asyncHandler(getOneBook));
booksRouter.get("/", queryBookValidationRules(), asyncHandler(getAllBooks));
booksRouter.post("/", createBookValidationRules(), asyncHandler(createBook));
booksRouter.put("/:id", updateBookValidationRules(), asyncHandler(updateBook));
