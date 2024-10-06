import express from "express";
import cors from "cors";
import productRouter from "../src/routes/productRouter";

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use("/", productRouter);

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});

export default app;
