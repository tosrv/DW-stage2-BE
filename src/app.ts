import express, { json } from "express";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import { errorHandler } from "./middlewares/error-handler";
import { allowedOrigins } from "./middlewares/cors";

const app = express();
const port = process.env.PORT;

app.use(json());

app.use(allowedOrigins);

app.use("/api", productRouter, authRouter);

app.get('/test', (req, res) =>{
    res.json({message: 'Success!'});
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
