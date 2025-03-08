import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getReviewByProductId, createReview } from "../controllers/review.controller";

const router = Router()

router.get("/:id", protectRoute, getReviewByProductId)
router.post("/:id", protectRoute, createReview)

export default router