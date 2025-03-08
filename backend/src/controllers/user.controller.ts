import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { Prisma, user } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie";

type LoginBody = Pick<Prisma.userCreateInput, "email" | "password">;

export const register: RequestHandler<{}, {}, Prisma.userCreateInput> = async (req, res) => {
    try {
        const { username, full_name, email, password } = req.body;

        if (!username || !full_name || !email || !password) {
            res.status(400).json({ message: "You must fill all fields" });
            return
        }

        const existingEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingEmail) {
            res.status(400).json({ message: "Email already exists" });
            return
        }

        if (password.length < 8) {
            res.status(400).json({ message: "Password must contain at least 8 characters" });
            return
        }

        const hashedPassowrd = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                full_name,
                email,
                password: hashedPassowrd
            }
        })

        generateTokenAndSetCookie(user, res);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        console.log("Error in register: ", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login: RequestHandler<{}, {}, LoginBody> = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(400).json({ message: "Invalid password" });
            return
        }

        generateTokenAndSetCookie(user, res);

        res.json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("shop");
    res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editProfile = async (req: Request<{ id: string }, {}, user>, res: Response) => {
    const { id } = req.params
    const { username, email, full_name } = req.body

    try {
        const existingEmail = await prisma.user.findFirst({
            where: {
                email,
                user_id: { not: parseInt(id) }
            }
        });

        if (existingEmail) {
            res.status(400).json({ message: "Email is already taken" });
            return
        }

        const existingUsername = await prisma.user.findFirst({
            where: {
                username,
                user_id: { not: parseInt(id) }
            }
        });

        if (existingUsername) {
            res.status(400).json({ message: "Username is already taken" });
            return
        }

        const updated = await prisma.user.update({
            where: { user_id: parseInt(id) },
            data: {
                username,
                email,
                full_name
            },
            omit: { password: true }
        })

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};