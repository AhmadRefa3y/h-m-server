import express from "express";
import cors from "cors";
import productRouter from "../src/routes/productRouter";
import userRouter from "./routes/user.router";

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

app.use("/api/user", userRouter);
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});

export default app;
