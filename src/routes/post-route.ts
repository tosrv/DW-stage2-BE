import { Router } from "express";
import { getPosts, createPost } from "../controllers/post-controller";

const router = Router();

// Router
router.get("/posts", getPosts);
router.post("/posts", createPost);

export default router;
