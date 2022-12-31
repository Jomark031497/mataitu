import { z } from "zod";

export const UserSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Please enter your username" }).min(4),
    password: z.string({ required_error: "Please enter your password" }).min(6),
    email: z
      .string({ required_error: "Please enter your email address" })
      .email("Please enter a valid email address"),
  }),
});

export type UserType = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Please enter your username" }).min(4),
    password: z.string({ required_error: "Please enter your password" }).min(6),
  }),
});

export type LoginType = z.infer<typeof LoginSchema>;
