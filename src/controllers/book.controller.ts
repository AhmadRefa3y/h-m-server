import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { db } from "../utils/prisma";

// getAllProduct
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const allProduct = await db.product.findMany();

        res.status(200).json({ data: allProduct });
    } catch (e) {
        console.log(e);
    }
};

// getBookById
export const getProductById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await db.product.findUnique({
            where: {
                id: bookId,
            },
        });
        res.status(200).json({ data: book });
    } catch (e) {
        console.log(e);
    }
};

// // createBook
// export const createBook = async (req, res) => {
//     try {
//         const bookData = req.body;

//         const book = await bookClient.create({
//             data: {
//                 title: bookData.title,
//                 author: {
//                     connect: { id: bookData.authorId },
//                 },
//             },
//         });

//         res.status(201).json({ data: book });
//     } catch (e) {
//         console.log(e);
//     }
// };

// // updateBook
// export const updateBook = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//         const bookData = req.body;

//         const book = await bookClient.update({
//             where: {
//                 id: bookId,
//             },
//             data: bookData,
//         });

//         res.status(200).json({ data: book });
//     } catch (e) {
//         console.log(e);
//     }
// };

// // deleteBook
// export const deleteBook = async (req, res) => {
//     try {
//         const bookId = req.params.id;
//         const book = await bookClient.delete({
//             where: {
//                 id: bookId,
//             },
//         });

//         res.status(200).json({ data: {} });
//     } catch (e) {
//         console.log(e);
//     }
// };
