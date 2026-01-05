import express, { json, urlencoded} from "express";
import postRoutes from "./routes/post-route";

const app = express();
const port = 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api/v1", postRoutes);

// Run Server
app.listen(port, () => {
  console.log("server running");
});
