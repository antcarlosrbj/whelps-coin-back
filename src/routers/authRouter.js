import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);

export default authRouter;
