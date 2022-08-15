import { Router } from "express";
import { transactionsController } from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.get("/balance", transactionsController.balance);
transactionsRouter.post("/buy", transactionsController.buy);

export default transactionsRouter;
