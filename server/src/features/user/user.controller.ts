import { NextFunction, Request, Response } from "express";
import envs from "../../config/envs";
import AppError from "../../error/AppError";
import * as service from "./user.service";

export const signUpUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.signUpUser(req.body);
    req.session.userId = user.id;
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.loginUser(req.body);

    req.session.userId = user.id;

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const meHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const user = await service.me(req.session.userId);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    return req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      return res
        .status(200)
        .clearCookie(<string>envs.COOKIE_NAME)
        .json({ message: "logout success" });
    });
  } catch (error) {
    return next(error);
  }
};
