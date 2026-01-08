import express, { json } from "express";
import { errorHandler } from "./middleware/error-handler";
import userRouter from "./routes/user";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(json());

// Routes
app.use("/api", userRouter);

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
