import { Request, Response } from "express";
import { db } from "../utils/prisma";

// getAllProduct
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const { name, category, price, color, size, count } = req.query;
        console.log(
            "name",
            name,
            "category",
            category,
            "price",
            price as string,
            "color",
            color,
            "size",
            size
        );
        const allProduct = await db.product.findMany({
            include: {
                Sizes: true,
                colors: true,
            },
            where: {
                title: {
                    contains: name as string,
                },
                category: {
                    equals: category as string,
                },
                price: {
                    // lte: Number(maxPrice),
                    // gte: Number(minPrice),
                    equals: price ? Number(price) : undefined,
                },
                color: {
                    equals: color as string,
                },
                size: {
                    equals: size as string,
                },
            },
            take: Number(count),
        });

        res.status(200).json({ data: allProduct });
    } catch (e) {
        console.log(e);
    }
};

// getProductById
export const getProductById = async (req: Request, res: Response) => {
    try {
        const ProductId = req.params.id;
        const Product = await db.product.findUnique({
            where: {
                id: ProductId,
            },
            include: {
                Sizes: true,
                colors: true,
            },
        });
        res.status(200).json({ data: Product });
    } catch (e) {
        console.log(e);
    }
};
