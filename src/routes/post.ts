import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";

const router = Router();

// Routes
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
