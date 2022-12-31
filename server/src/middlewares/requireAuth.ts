import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";

const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session.userId) throw new AppError(401, "Unauthorized");

  next();
};

export default requireAuth;
