import { Router } from "express";
import validate from "../../middlewares/validate";
import { WalletSchema } from "./wallet.schema";
import * as walletHandlers from "./wallet.controller";
import requireAuth from "../../middlewares/requireAuth";

const router = Router();

router.get("/", requireAuth, walletHandlers.getWalletsHandler);
router.get("/:id", requireAuth, walletHandlers.getOneWalletHandler);

router.post("/", requireAuth, validate(WalletSchema), walletHandlers.createWalletHandler);

router.patch("/:id", requireAuth, validate(WalletSchema), walletHandlers.updateWalletHandler);

router.delete("/:id", requireAuth, walletHandlers.deleteWalletHandler);

export default router;
