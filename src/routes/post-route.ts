import { Router } from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post-controller";

const router = Router();

// Blog Routes
router.get("/posts", getPosts);
router.post("/posts", createPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
