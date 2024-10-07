import { db } from "../utils/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allAuthors = await db.user.findMany({});
        res.status(200).json({ data: allAuthors });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
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
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

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
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        );
        console.log(token);
        res.status(201).json({ data: user });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        );
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({ data: user, token });
    } catch (e) {
        console.log(e);
    }
};
