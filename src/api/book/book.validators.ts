import { body, param, query } from "express-validator";

export function createBookValidationRules() {
  return [
    body("id").isInt().notEmpty(),
    body("title").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("author").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("genre").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("price").isDecimal({ force_decimal: false }).notEmpty()
  ];
}

export function updateBookValidationRules() {
  return [
    param("id").isInt().notEmpty(),
    body("title").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("author").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("genre").trim().isString().notEmpty().isLength({ min: 1, max: 256 }),
    body("price").isDecimal({ force_decimal: false }).notEmpty()
  ];
}

export function queryBookValidationRules() {
  return [
    query("title").optional().trim().isString().isLength({ min: 1, max: 256 }),
    query("author").optional().trim().isString().isLength({ min: 1, max: 256 }),
    query("genre").optional().trim().isString().isLength({ min: 1, max: 256 }),
    query("sort").optional().trim().isIn(["title", "author", "genre", "price"]),
    query("order").optional().trim().isIn(["ASC", "DESC"])
  ];
}

export function bookIdValidationRule() {
  return [param("id").isInt().notEmpty()];
}
