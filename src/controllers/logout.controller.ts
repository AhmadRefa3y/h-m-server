import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { db } from "../utils/prisma";

const logoutHandler = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);
        const refreshToken = cookies.jwt;

        const decodedJwt = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        );

        const user = await db.user.findUnique({
            where: {
                id: (decodedJwt as any).id,
            },
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.sendStatus(403);
        }

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: null,
            },
        });

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.sendStatus(204);
    } catch (error) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        if (error instanceof jwt.TokenExpiredError) {
            return res.sendStatus(204);
        }

        return res.sendStatus(403);
    }
};

export default logoutHandler;
