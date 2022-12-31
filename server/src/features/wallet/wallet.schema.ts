import { z } from "zod";

export const WalletSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Please enter your wallet's name" }).max(100),
    balance: z
      .number({ invalid_type_error: "Invalid type. Balance should be a number" })
      .default(0),
    color: z.string().max(7, "Color only accepts Hex code (#XXXXXX)").optional(),
  }),
});

export type WalletInputs = z.infer<typeof WalletSchema>;
