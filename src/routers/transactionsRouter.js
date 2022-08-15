import { Router } from "express";
import { transactionsController } from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.get("/balance", transactionsController.balance);
transactionsRouter.post("/buy", transactionsController.buy);
transactionsRouter.post("/sell", transactionsController.sell);

export default transactionsRouter;
