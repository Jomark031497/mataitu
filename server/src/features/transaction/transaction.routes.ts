import { Router } from "express";
import requireAuth from "../../middlewares/requireAuth";
import validate from "../../middlewares/validate";
import { TransactionSchema } from "./transaction.schema";
import * as transactionHandlers from "./transaction.controller";

const router = Router();

router.get("/", requireAuth, transactionHandlers.getTransactionsHandler);
router.get("/:id", requireAuth, transactionHandlers.getOneTransactionHandler);

router.post(
  "/",
  requireAuth,
  validate(TransactionSchema),
  transactionHandlers.createTransactionHandler
);

router.patch(
  "/:id",
  requireAuth,
  validate(TransactionSchema),
  transactionHandlers.updateTransactionHandler
);

router.delete("/:id", requireAuth, transactionHandlers.deleteTransactionHandler);

export default router;
