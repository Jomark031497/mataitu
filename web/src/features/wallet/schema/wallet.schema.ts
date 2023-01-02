import { z } from "zod";

export type WalletType = {
  id: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  userId: string;
};

export type WalletsTypeRes = {
  wallets: WalletType[];
  balance: number;
};

export const CreateWalletSchema = z.object({
  name: z.string().min(1, "Wallet name must be atleast 3 characters"),
  color: z.string().min(1).optional(),
});

export type CreateWalletInputs = z.infer<typeof CreateWalletSchema>;
