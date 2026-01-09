import express, { json } from "express";
import authRouter from "./routes/auth";

const app = express();
const port = process.env.PORT;

app.use(json());
app.use("/auth", authRouter)

app.listen(port, () => console.log("Server is running"));
