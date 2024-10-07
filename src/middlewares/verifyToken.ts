import jwt from "jsonwebtoken";
const verfiyToken = (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        if (!authHeader || !token) return res.sendStatus(401);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        if (!decodedToken) {
            return res.sendStatus(401).json({ message: "Invalid token" });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};

export default verfiyToken;
