import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transaction.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protectRoute, createTransaction);
router.get("/", protectRoute, getTransactions);

export default router;