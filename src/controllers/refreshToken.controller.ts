import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { db } from "../utils/prisma";

const refreshTokenHandler = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const decodedJwt = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        );

        if (!decodedJwt) return res.sendStatus(403);

        const user = await db.user.findUnique({
            where: {
                id: (decodedJwt as any).id,
            },
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "10m" }
        );

        const newRefreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "7d" }
        );

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: newRefreshToken,
            },
        });
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });

        res.json({
            accessToken,
            user: {
                email: user.email,
                id: user.id,
            },
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({
                message: "Refresh token has expired. Please log in again.",
            });
        }
        console.log(error);
        return res.sendStatus(403);
    }
};

export default refreshTokenHandler;
