import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { product_category } from '@prisma/client';

interface QueryParams {
    page?: string;
    limit?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    name?: string;
    category?: string;
    price?: string;
}

export const getPaginatedProducts: RequestHandler<{}, {}, {}, QueryParams> = async (req, res) => {
    const {
        page,
        limit,
        sort = "price",
        order = "asc",
        name,
        category,
        price
    } = req.query;

    try {
        let categoryFilter: product_category | undefined;
        if (category) {
            categoryFilter = category as product_category;
        }

        const where: Prisma.productWhereInput = {
            ...(name && { name: { contains: name } }),
            ...(categoryFilter && { category: categoryFilter }),
            ...(price && {
                price: {
                    equals: parseFloat(price)
                }
            }),
        };

        if (page && limit) {
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;

            const [totalCount, products] = await prisma.$transaction([
                prisma.product.count({ where }),
                prisma.product.findMany({
                    where,
                    skip,
                    take: limitNumber,
                    orderBy: {
                        [sort]: order
                    }
                })
            ]);

            const totalPages = Math.ceil(totalCount / limitNumber);

            res.status(200).json({
                data: products,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage: limitNumber,
                    hasNextPage: pageNumber < totalPages,
                    hasPreviousPage: pageNumber > 1
                }
            });
        } else {
            const products = await prisma.product.findMany({
                where,
                orderBy: {
                    [sort]: order
                }
            });

            res.status(200).json({
                data: products,
                pagination: null
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            error: "An error occurred while fetching products",
        });
    }
};

export const getProductById: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params

    try {
        const product = await prisma.product.findUnique({
            where: { product_id: parseInt(id) }
        })

        if (!product) {
            res.status(404).json({ message: `Product with id: ${id} not found` });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsByCategory: RequestHandler<{ category: string }> = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: { category: category as product_category }
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createProduct: RequestHandler<{}, {}, Prisma.productCreateInput> = async (req, res) => {
    const { name, price, category, description, image_url } = req.body

    try {
        if (!name || !price || !category || !description) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const product = await prisma.product.create({
            data: {
                name,
                category,
                price,
                description,
                image_url
            }
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct: RequestHandler<{ id: string }, {}, Prisma.productUpdateInput> = async (req, res) => {
    const { id } = req.params
    const { name, price, description, image_url } = req.body

    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id: parseInt(id) },
            data: {
                name,
                price,
                description,
                image_url
            }
        })

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}