import { Request, Response } from "express";
import { Post, posts } from "../models/post-model";

// Display Data
export const getPosts = (req: Request, res: Response) => {
  res.json(posts);
};

// Input Data
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
