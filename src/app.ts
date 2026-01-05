import express, { json, urlencoded } from "express";
import productRoutes from "./routes/product-route";
import orderRoutes from "./routes/order-route";

const app = express();
const port = 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);

// Run Server
app.listen(port, () => {
  console.log("server running");
});
