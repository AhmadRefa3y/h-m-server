import { Router } from "express";

import { getUser, Login, register } from "../controllers/user.controller";
import verfiyToken from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.get("/", verfiyToken, getUser);
userRouter.post("/register", register);
userRouter.post("/login", Login);

export default userRouter;
