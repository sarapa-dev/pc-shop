import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const getReviewByProductId = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const reviews = await prisma.review.findMany({
            where: { product_id: parseInt(id) },
            include: {
                user: true
            }
        })

        res.json(reviews)
    } catch (error: any) {
        console.error("Review error:", error);
        res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
}

export const createReview = async (req: Request<{ id: string }, {}, Prisma.reviewCreateInput>, res: Response) => {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;

    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return
        }

        const purchase = await prisma.transaction_product.findFirst({
            where: {
                product_id: parseInt(productId),
                transaction: {
                    user_id: user.user_id
                }
            }
        });

        if (!purchase) {
            res.status(400).json({
                message: "You must purchase this product before reviewing it"
            });
            return
        }

        const existingReview = await prisma.review.findFirst({
            where: {
                user_id: user.user_id,
                product_id: parseInt(productId)
            }
        });

        if (existingReview) {
            res.status(400).json({ message: "You've already reviewed this product" });
            return
        }

        const newReview = await prisma.review.create({
            data: {
                rating,
                comment,
                user: { connect: { user_id: user.user_id } },
                product: { connect: { product_id: parseInt(productId) } }
            },
            include: {
                user: true,
                product: true
            }
        });

        res.status(201).json({
            message: "Review created successfully",
            review: {
                id: newReview.review_id,
                rating: newReview.rating,
                comment: newReview.comment,
                createdAt: newReview.created_at
            }
        });

    } catch (error: any) {
        console.error("Review error:", error);
        res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};