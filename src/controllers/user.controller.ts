import { db } from "../utils/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../utils/types/userTypes";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.format(),
            });
        }
        const { name, email, password } = result.data;

        const isUserExist = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        res.status(201).json({ data: user });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.format(),
            });
        }
        const { email, password } = result.data;
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: refreshToken,
            },
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "10d",
            }
        );
        res.status(200).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const Cart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                items: true,
            },
        });

        if (!Cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ data: Cart });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};
export const updateCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const UpdatedCart = req.body.cart;

        const Cart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!Cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        await db.cartItem.deleteMany({
            where: {
                cartId: Cart.id,
            },
        });

        const newCart = await db.cart.update({
            where: {
                id: Cart.id,
            },
            data: {
                items: {
                    create: UpdatedCart,
                },
            },
        });

        res.status(200).json({ data: newCart });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};

export const getWishList = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const WishList = await db.wishlist.findUnique({
            where: {
                userId: userId,
            },
            include: {
                items: true,
            },
        });

        if (!WishList) {
            return res.status(404).json({ message: "WishList not found" });
        }
        res.status(200).json({ data: WishList });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};

export const updateWishList = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const UpdatedWishList = req.body.wishlist;

        const WishList = await db.wishlist.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!WishList) {
            db.wishlist.create({
                data: {
                    userId: userId,
                    items: {
                        create: UpdatedWishList,
                    },
                },
            });
        } else {
            await db.wishlistItem.deleteMany({
                where: {
                    wishlistId: WishList.id,
                },
            });
            const newWishList = await db.wishlist.update({
                where: {
                    id: WishList.id,
                },
                data: {
                    items: {
                        create: UpdatedWishList,
                    },
                },
            });
            res.status(200).json({ data: newWishList });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Somthing went wrong" });
    }
};
