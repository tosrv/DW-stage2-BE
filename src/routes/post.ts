import { Router } from "express";
import {
  getAllPosts,
  getPosts,
  detailPost,
  postComments,
  commentsSummary,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";

const router = Router();

// Routes
router.get("/all-posts", getAllPosts);
router.get("/posts", getPosts);
router.get("/post/:id", detailPost);
router.get("/post/:id/comments", postComments);
router.get("/posts/comments-summary", commentsSummary);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
