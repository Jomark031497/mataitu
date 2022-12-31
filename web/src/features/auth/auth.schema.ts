import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(4, "Username must be atleast 4 characters"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export const SignUpSchema = z.object({
  username: z.string().min(4, "Username must be atleast 4 characters"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export type LoginInputs = z.infer<typeof LoginSchema>;
export type SignUpInputs = z.infer<typeof SignUpSchema>;

export type UserType = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
