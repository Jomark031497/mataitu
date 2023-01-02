import { CategoryType } from "@/features/category/category.schema";
import { WalletType } from "@/features/wallet/schema/wallet.schema";

export type TransactionType = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  walletId: string;
  categoryId: string;
  userId: string;
  category: CategoryType;
  wallet: WalletType;
};
