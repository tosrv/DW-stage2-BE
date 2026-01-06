import express, { json } from "express";
import productRoutes from "./routes/product";

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/api/v1/products", productRoutes);

// Run Server
app.listen(process.env.PORT, () => {
  console.log("server running");
});
