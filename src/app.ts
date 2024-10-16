import express from "express";
import cors from "cors";
import productRouter from "./routes/api/productRouter";
import userRouter from "./routes/api/user.router";
import refreshTokenRouter from "./routes/api/refreshTokenRouter";
import cookieParser from "cookie-parser";
import logOutRouter from "./routes/api/logoutRouter";

const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: ["http://localhost:5173", "https://h-m-xi.vercel.app"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRouter);

app.use("/api/user", userRouter);
app.use("/api/refresh-token", refreshTokenRouter);
app.use("/api/logout", logOutRouter);
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});

export default app;
