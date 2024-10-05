import { Router } from "express";

import { getAllProduct, getProductById } from "../controllers/book.controller";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
// bookRouter.post("/", createBook);
// bookRouter.put("/:id", updateBook);
// bookRouter.delete("/:id", deleteBook);

export default productRouter;
