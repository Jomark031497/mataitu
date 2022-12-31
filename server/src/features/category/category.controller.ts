import { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import * as categoryService from "./category.service";

export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));
    const wallet = await categoryService.createCategory(req.session.userId, req.body);

    return res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};

export const getOneCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));
    const wallet = await categoryService.getOneCategory(req.session.userId, req.params.id);

    return res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));
    const wallets = await categoryService.getCategories(req.session.userId);

    return res.status(200).json(wallets);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const wallet = await categoryService.updateCategory(
      req.session.userId,
      req.params.id,
      req.body
    );

    return res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const wallet = await categoryService.deleteCategory(req.session.userId, req.params.id);

    return res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};
