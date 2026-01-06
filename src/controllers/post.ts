import { Request, Response } from "express";
import { prisma } from "../connection/client";

// Display All Posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ message: "Display all posts", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Create Post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const newPost = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json({ message: "New post created", data: newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Update Post Data
export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content, authorId } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content, authorId: parseInt(authorId) },
    });
    res.status(200).json({ message: "Post updated", data: updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete Post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const deletedPost = await prisma.post.delete({ where: { id: postId } });
    res.status(200).json({ message: "Post deleted", data: deletedPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
