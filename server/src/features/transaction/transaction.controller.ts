import { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import * as transactionServices from "./transaction.service";

export const createTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const transaction = await transactionServices.createTransaction(req.session.userId, req.body);

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getOneTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const transaction = await transactionServices.getOneTransaction(
      req.session.userId,
      req.params.id
    );

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));

    const transaction = await transactionServices.getAllTransactions(req.session.userId);

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const updateTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));
    const transaction = await transactionServices.updateTransaction(
      req.session.userId,
      req.params.id,
      req.body
    );

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return next(new AppError(401, "Unauthorized"));
    const transaction = await transactionServices.deleteTransaction(
      req.session.userId,
      req.params.id
    );

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};
