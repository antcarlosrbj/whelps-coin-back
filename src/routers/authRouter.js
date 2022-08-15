import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);
authRouter.get("/verify-token", authController.verifyToken);

export default authRouter;
