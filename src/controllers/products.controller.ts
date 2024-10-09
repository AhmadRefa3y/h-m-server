import { Request, Response } from "express";
import { db } from "../utils/prisma";

// getAllProduct
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const allProduct = await db.product.findMany({
            include: {
                Sizes: true,
                colors: true,
            },
        });

        res.status(200).json({ data: allProduct });
    } catch (e) {
        console.log(e);
    }
};

// getBookById
export const getProductById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const book = await db.product.findUnique({
            where: {
                id: bookId,
            },
            include: {
                Sizes: true,
                colors: true,
            },
        });
        res.status(200).json({ data: book });
    } catch (e) {
        console.log(e);
    }
};
