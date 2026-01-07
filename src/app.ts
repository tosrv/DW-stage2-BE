import express, { json } from "express";
import postRoutes from "./routes/post";
import usersRoutes from "./routes/user";

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/api/v1", postRoutes);
app.use("/api/v1", usersRoutes);

// Run Server
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
