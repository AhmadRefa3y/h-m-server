import { Router } from "express";

import {
    addOrder,
    getCart,
    getOrders,
    getUser,
    getWishList,
    Login,
    register,
    updateCart,
    updateWishList,
} from "../../controllers/user.controller";
import verfiyToken from "../../middlewares/verifyToken";

const userRouter = Router();

userRouter.get("/", verfiyToken, getUser);
userRouter.post("/register", register);
userRouter.post("/login", Login);
userRouter.get("/cart", verfiyToken, getCart);
userRouter.put("/cart", verfiyToken, updateCart);
userRouter.get("/whishlist", verfiyToken, getWishList);
userRouter.put("/whishlist", verfiyToken, updateWishList);
userRouter.get("/orders", verfiyToken, getOrders);
userRouter.post("/add-order", verfiyToken, addOrder);

export default userRouter;
