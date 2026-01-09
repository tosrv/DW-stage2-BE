import express, { json } from "express";
import { errorHandler } from "./middleware/error-handler";

import userRouter from "./routes/user";
import supplierRouter from "./routes/supplier";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(json());

// Routes
app.use("/api", userRouter, supplierRouter, productRouter, authRouter);

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
