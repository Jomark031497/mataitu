import AppError from "../../error/AppError";
import prisma from "../../utils/client";
import { WalletInputs } from "./wallet.schema";

export const createWallet = async (userId: string, payload: WalletInputs["body"]) => {
  try {
    const wallet = await prisma.wallet.create({
      data: {
        ...payload,
        userId,
      },
    });

    return wallet;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getWallets = async (userId: string) => {
  try {
    const [wallets, balance] = await prisma.$transaction([
      prisma.wallet.findMany({
        where: {
          userId,
        },
      }),
      prisma.wallet.aggregate({
        _sum: {
          balance: true,
        },
        where: {
          userId,
        },
      }),
    ]);

    return {
      balance: balance._sum.balance,
      wallets,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getOneWallet = async (userId: string, walletId: string) => {
  try {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: walletId,
        userId,
      },
    });

    if (!wallet) throw new AppError(404, "Wallet not found");

    return wallet;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const updateWallet = async (
  userId: string,
  walletId: string,
  payload: WalletInputs["body"]
) => {
  try {
    const wallet = await getOneWallet(userId, walletId);

    const updateWallet = await prisma.wallet.update({
      data: {
        ...wallet,
        ...payload,
      },
      where: {
        id: wallet.id,
      },
    });

    return updateWallet;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const updateBalance = async (id: string, balance: number) => {
  try {
    const updateBalance = await prisma.wallet.update({
      data: {
        balance,
      },
      where: {
        id,
      },
    });

    return updateBalance;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const deleteWallet = async (userId: string, walletId: string) => {
  try {
    const wallet = await getOneWallet(userId, walletId);

    const deleteWallet = await prisma.wallet.delete({
      where: {
        id: wallet.id,
      },
    });

    return deleteWallet;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};
