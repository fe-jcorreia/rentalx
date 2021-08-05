import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { user_id } = request.user;
  const usersRepository = container.resolve(UsersRepository);
  const user = await usersRepository.findById(user_id);

  if (!user.is_admin) {
    throw new AppError("user unauthorized", 403);
  }

  next();
}
