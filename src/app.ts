import express from "express";
import postRoutes from "./routes/post-route";

const app = express();
const port = 3000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", postRoutes);

// Run Server
app.listen(port, () => {
  console.log("server running");
});
