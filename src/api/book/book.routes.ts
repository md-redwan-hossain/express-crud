import express, { Router } from "express";
import { asyncHandler } from "node-async-handler";
import { scaffoldValidation } from "../../shared/scaffold-validation";
import { createBook, getAllBooks, getOneBook, updateBook } from "./book.middlewares";
import {
  bookIdValidationRule,
  createBookValidationRules,
  queryBookValidationRules,
  updateBookValidationRules
} from "./book.validators";

export const booksRouter: Router = express.Router();

booksRouter.get("/:id", bookIdValidationRule(), scaffoldValidation, asyncHandler(getOneBook));
booksRouter.get("/", queryBookValidationRules(), scaffoldValidation, asyncHandler(getAllBooks));
booksRouter.post("/", createBookValidationRules(), scaffoldValidation, asyncHandler(createBook));
booksRouter.put("/:id", updateBookValidationRules(), asyncHandler(updateBook));
