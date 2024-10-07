import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    Login,
    register,
} from "../controllers/user.controller";
import verfiyToken from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.get("/", verfiyToken, getAllUsers);
userRouter.get("/:id", verfiyToken, getUserById);
userRouter.post("/register", register);
userRouter.post("/login", Login);

export default userRouter;
