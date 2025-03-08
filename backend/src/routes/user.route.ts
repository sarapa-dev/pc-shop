import { Router } from "express";

import {
    login,
    logout,
    register,
    getCurrentUser,
    editProfile
} from "../controllers/user.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser);
router.put("/:id", protectRoute, editProfile);

export default router;