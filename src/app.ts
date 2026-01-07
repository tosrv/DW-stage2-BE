import express, { json } from "express";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);

// Run Server
app.listen(process.env.PORT, () => {
  console.log("server running");
});
