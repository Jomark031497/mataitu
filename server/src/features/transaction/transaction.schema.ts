import { z } from "zod";

const TransactionType = ["EXPENSE", "INCOME", "TRANSFER"] as const;

export const TransactionSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Please enter transaction name" }).max(100),
    type: z.enum(TransactionType),
    amount: z.number({ invalid_type_error: "Amount should be a number" }),
    description: z.string().nullable().optional(),
    walletId: z.string().cuid(),
    categoryId: z.string().cuid(),
    receivingWalletId: z.string().cuid().optional(),
  }),
});

export type TransactionInputs = z.infer<typeof TransactionSchema>;
