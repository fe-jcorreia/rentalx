import { Request, Response, NextFunction } from "express";

import "express-async-errors";
import { AppError } from "@shared/errors/AppError";

export function errorTreatment(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ error: err.message });
  }

  return response
    .status(500)
    .json({ status: "error", error: `internal server error - ${err.message}` });

  next();
}
