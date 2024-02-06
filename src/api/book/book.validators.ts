import { body, query, param } from "express-validator";

export function createBookValidationRules() {
  return [
    body("id").isInt().notEmpty(),
    body("title").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("author").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("genre").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("price").isDecimal({ force_decimal: false }).notEmpty()
  ];
}

export function updateBookValidationRules() {
  return [
    param("id").isInt().notEmpty(),
    body("title").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("author").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("genre").trim().isString().notEmpty().isLength({ min: 2, max: 256 }),
    body("price").isDecimal({ force_decimal: false }).notEmpty()
  ];
}

export function queryBookValidationRules() {
  return [
    query("title").trim().isString().isLength({ min: 2, max: 256 }).optional(),
    query("author").trim().isString().isLength({ min: 2, max: 256 }).optional(),
    query("genre").trim().isString().isLength({ min: 2, max: 256 }).optional(),
    query("sort").trim().isIn(["title", "author", "genre", "price"]).optional(),
    query("order").trim().isIn(["ASC", "DESC"]).optional()
  ];
}
