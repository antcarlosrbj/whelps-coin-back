import { Router } from "express";
import { transactionsController } from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.get("/balance", transactionsController.balance);

export default transactionsRouter;
