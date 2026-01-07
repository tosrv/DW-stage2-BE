import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Display All Posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ message: "Display all posts", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Filter Posts
export const getPosts = async (req: Request, res: Response) => {
  const { categoryId } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        categories: {
          some: {
            id: Number(categoryId),
          },
        },
      },
      include: {
        author: { select: { name: true } },
        categories: { select: { name: true } },
      },
    });
    res.status(200).json({ message: "Display filtered posts", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Detail Post
export const detailPost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findMany({
      where: { id: postId },
      include: {
        author: { select: { name: true } },
        categories: { select: { name: true } },
        comments: { select: { content: true } },
      },
    });
    res.status(200).json({ message: "Display detail post", data: post });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Comments Page
export const postComments = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { limit, offset } = req.query;
  try {
    const post = await prisma.post.findMany({
      where: { id: postId },
      include: {
        comments: {
          select: { content: true },
          take: Number(limit),
          skip: Number(offset),
        },
      },
    });
    res.status(200).json({ message: "Display post comments", data: post });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Comments Summary
export const commentsSummary = async (req: Request, res: Response) => {
  const { commentCount, order, limit, offset } = req.query;
  try {
    const comments = await prisma.comment.groupBy({
      by: ["postId"],
      _count: { id: true },
      having: { id: { _count: { gte: Number(commentCount) } } },
      orderBy: { _count: { id: order as "asc" | "desc" } },
      take: Number(limit),
      skip: Number(offset),
    });
    res
      .status(200)
      .json({ message: "Display comments summary", data: comments });
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
