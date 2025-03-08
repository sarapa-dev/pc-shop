import { Router } from "express";

import { getPaginatedProducts, getProductById, getProductsByCategory, createProduct, updateProduct } from "../controllers/product.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router()

router.get("/", getPaginatedProducts)
router.get("/:id", getProductById)
router.get('/category/:category', getProductsByCategory);

router.post("/", protectRoute, isAdmin, createProduct)
router.put("/:id", protectRoute, isAdmin, updateProduct)

export default router