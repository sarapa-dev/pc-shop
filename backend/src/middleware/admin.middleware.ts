import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({ message: "Unauthorized - No user found" });
            return
        }

        const dbUser = await prisma.user.findUnique({
            where: { user_id: user.user_id },
            select: { role: true },
        });

        if (!dbUser || dbUser.role !== "admin") {
            res.status(403).json({ message: "Forbidden - Admin access required" });
            return
        }

        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};