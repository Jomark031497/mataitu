import { hash, verify } from "argon2";
import AppError from "../../error/AppError";
import prisma from "../../utils/client";
import { exclude } from "./user.helpers";
import { LoginType, UserType } from "./user.schema";

export const signUpUser = async (payload: UserType["body"]) => {
  try {
    const emailExists = await prisma.user.findUnique({ where: { email: payload.email } });
    if (emailExists) throw new AppError(404, "Email is already taken");

    const usernameExists = await prisma.user.findUnique({ where: { username: payload.username } });
    if (usernameExists) throw new AppError(404, "Username is already taken");

    const hashPassword = await hash(payload.password);
    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashPassword,
      },
    });

    return exclude(user, ["password"]);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const loginUser = async (payload: LoginType["body"]) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: payload.username } });
    if (!user) throw new AppError(404, "Invalid username/password");

    const passwordMatched = await verify(user.password, payload.password);
    if (!passwordMatched) throw new AppError(404, "Invalid username/password");

    return exclude(user, ["password"]);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const me = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, "User not found");

    return exclude(user, ["password"]);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};
