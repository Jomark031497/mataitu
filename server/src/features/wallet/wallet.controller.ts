import { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import * as walletService from "./wallet.service";

export const createWalletHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: "unauthorized" });
    const wallet = await walletService.createWallet(req.session.userId, req.body);

    return res.status(200).json(wallet);
  } catch (error) {
    return next(error);
  }
};

export const getWalletsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) throw new AppError(401, "Unauthorized");
    const wallets = await walletService.getWallets(req.session.userId);

    return res.status(200).json(wallets);
  } catch (error) {
    return next(error);
  }
};

export const getOneWalletHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) throw new AppError(401, "Unauthorized");
    const wallet = await walletService.getOneWallet(req.session.userId, req.params.id);

    return res.status(200).json(wallet);
  } catch (error) {
    return next(error);
  }
};

export const updateWalletHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) throw new AppError(401, "Unauthorized");
    const wallet = await walletService.updateWallet(req.session.userId, req.params.id, req.body);

    return res.status(200).json(wallet);
  } catch (error) {
    return next(error);
  }
};

export const deleteWalletHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) throw new AppError(401, "Unauthorized");
    const wallet = await walletService.deleteWallet(req.session.userId, req.params.id);

    return res.status(200).json(wallet);
  } catch (error) {
    return next(error);
  }
};
