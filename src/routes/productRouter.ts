import { Router } from "express";

import {
    getAllProduct,
    getProductById,
} from "../controllers/products.controller";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);

export default productRouter;
