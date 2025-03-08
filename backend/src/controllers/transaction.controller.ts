import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return
        }

        const cartItems = req.body.items;

        if (!Array.isArray(cartItems)) {
            res.status(400).json({ message: "Invalid cart items format" });
            return
        }

        const transaction = await prisma.$transaction(async (tx) => {
            const dbUser = await tx.user.findUnique({
                where: { user_id: user.user_id },
                select: { balance: true }
            });

            if (!dbUser) {
                throw new Error("User not found");
            }

            const productIds = cartItems.map(item => item.product_id);
            const products = await tx.product.findMany({
                where: { product_id: { in: productIds } }
            });

            if (products.length !== cartItems.length) {
                throw new Error("One or more products not found");
            }

            let total = 0;
            for (const item of cartItems) {
                const product = products.find(p => p.product_id === item.product_id);
                if (!product) throw new Error(`Product ${item.product_id} not found`);
                if (item.quantity <= 0) throw new Error(`Invalid quantity for product ${item.product_id}`);

                total += Number(product.price) * item.quantity;
            }

            const userBalance = Number(dbUser.balance || 0);
            if (userBalance < total) {
                throw new Error("Insufficient balance");
            }

            const newTransaction = await tx.transaction.create({
                data: {
                    user_id: user.user_id,
                    total_price: total,
                    transaction_product: {
                        create: cartItems.map(item => ({
                            product: {
                                connect: { product_id: item.product_id }
                            },
                            quantity: item.quantity
                        }))
                    }
                },
                include: {
                    transaction_product: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            await tx.user.update({
                where: { user_id: user.user_id },
                data: { balance: userBalance - total }
            });

            return newTransaction;
        });

        res.status(201).json(transaction);
    } catch (error: any) {
        console.error("Transaction error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return
        }

        const transactions = await prisma.transaction.findMany({
            where: { user_id: user.user_id },
            include: {
                transaction_product: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};