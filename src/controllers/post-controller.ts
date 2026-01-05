import { Request, Response } from "express";
import { Post, posts } from "../models/post-model";

// Display Blog Data
export const getPosts = (req: Request, res: Response) => {
  res.json(posts);
};

// Add New Post
export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newPost: Post = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

// Update Blog Post
export const updatePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === id);

  if (!post) return res.status(404).json({ message: "Post not found" });
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  res.status(200).json(post);
};

// Delete Blog Post
export const deletePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);
  res.status(204).send();
};
