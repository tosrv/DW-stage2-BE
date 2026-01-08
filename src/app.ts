import express, { json } from "express";
import { errorHandler } from "./middleware/error-handler";

import userRouter from "./routes/user";
import supplierRouter from "./routes/supplier";
import productRouter from "./routes/product";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(json());

// Routes
app.use("/api", userRouter);
app.use("/api", supplierRouter);
app.use("/api", productRouter);

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
