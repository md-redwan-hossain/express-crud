import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpStatus } from "./http-status";

export function scaffoldValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() }).end();
  }
  next();
}
