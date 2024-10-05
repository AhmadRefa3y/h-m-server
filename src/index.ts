import express from "express";

import bookRouter from "./routes/book.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/product", bookRouter);

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});
