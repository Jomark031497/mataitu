import { Router } from "express";
import validate from "../../middlewares/validate";
import * as handler from "./user.controller";
import * as userSchema from "./user.schema";

const router = Router();

router.get("/me", handler.meHandler);
router.get("/logout", handler.logoutHandler);

router.post("/signup", validate(userSchema.UserSchema), handler.signUpUserHandler);
router.post("/login", validate(userSchema.LoginSchema), handler.loginUserHandler);

export default router;
