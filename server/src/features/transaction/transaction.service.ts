import AppError from "../../error/AppError";
import prisma from "../../utils/client";
import { getOneWallet, updateBalance } from "../wallet/wallet.service";
import { TransactionInputs } from "./transaction.schema";

export const createTransaction = async (userId: string, payload: TransactionInputs["body"]) => {
  try {
    const wallet = await getOneWallet(userId, payload.walletId);

    const transaction = await prisma.transaction.create({
      data: {
        ...payload,
        userId,
        walletId: wallet.id,
      },
    });

    await updateBalance(payload.walletId, wallet.balance + payload.amount);

    return transaction;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getAllTransactions = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        wallet: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getOneTransaction = async (userId: string, id: string) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!transaction) throw new AppError(404, "Transaction not found");

    return transaction;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const updateTransaction = async (
  userId: string,
  id: string,
  payload: TransactionInputs["body"]
) => {
  try {
    const transaction = await getOneTransaction(userId, id);

    const updatedTransaction = await prisma.transaction.update({
      data: {
        ...transaction,
        ...payload,
      },
      where: {
        id,
      },
    });

    const wallet = await getOneWallet(userId, payload.walletId);

    await updateBalance(wallet.id, wallet.balance - transaction.amount + payload.amount);

    return updatedTransaction;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const deleteTransaction = async (userId: string, id: string) => {
  try {
    const transaction = await getOneTransaction(userId, id);

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    const wallet = await getOneWallet(userId, transaction.walletId);

    if (transaction.type === "INCOME") {
      await updateBalance(wallet.id, wallet.balance - transaction.amount);
    } else if (transaction.type === "EXPENSE") {
      await updateBalance(wallet.id, wallet.balance + transaction.amount);
    }

    return deletedTransaction;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};
