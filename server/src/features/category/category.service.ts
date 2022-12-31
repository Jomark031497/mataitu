import AppError from "../../error/AppError";
import prisma from "../../utils/client";
import { CategoryInputs, UpdateCategoryInputs } from "./category.schema";

export const createCategory = async (userId: string, payload: CategoryInputs["body"]) => {
  try {
    const category = await prisma.category.create({
      data: { ...payload, userId },
    });

    return category;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getOneCategory = async (userId: string, id: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) throw new AppError(404, "Category not found");

    return category;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const getCategories = async (userId: string) => {
  try {
    const category = await prisma.category.findMany({
      where: { userId },
    });

    return category;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const updateCategory = async (
  userId: string,
  id: string,
  payload: UpdateCategoryInputs["body"]
) => {
  try {
    const category = await getOneCategory(userId, id);

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...category,
        ...payload,
      },
    });

    return updatedCategory;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};

export const deleteCategory = async (userId: string, id: string) => {
  try {
    const category = await getOneCategory(userId, id);

    const deletedCategory = await prisma.category.delete({
      where: { id: category.id },
    });

    return deletedCategory;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error("Something went wrong", { cause: error });
  }
};
