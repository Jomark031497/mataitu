import { z } from "zod";

export const CategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Please enter the category's name" })
      .max(100, "Category name cannot exceed to 100 characters"),
    icon: z.string().optional(),
  }),
});

export const UpdateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Please enter the category's name" })
      .max(100, "Category name cannot exceed to 100 characters")
      .optional(),
    icon: z.string().optional(),
  }),
});

export type UpdateCategoryInputs = z.infer<typeof UpdateCategorySchema>;
export type CategoryInputs = z.infer<typeof CategorySchema>;
