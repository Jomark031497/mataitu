import { Router } from "express";
import requireAuth from "../../middlewares/requireAuth";
import validate from "../../middlewares/validate";
import { CategorySchema, UpdateCategorySchema } from "./category.schema";
import * as categoryHandlers from "./category.controller";

const router = Router();

router.get("/", requireAuth, categoryHandlers.getCategoriesHandler);
router.get("/:id", requireAuth, categoryHandlers.getOneCategoryHandler);

router.post("/", requireAuth, validate(CategorySchema), categoryHandlers.createCategoryHandler);

router.patch(
  "/:id",
  requireAuth,
  validate(UpdateCategorySchema),
  categoryHandlers.updateCategoryHandler
);

router.delete("/:id", requireAuth, categoryHandlers.deleteCategoryHandler);

export default router;
