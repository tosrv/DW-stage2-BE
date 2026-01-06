import { Request, Response } from "express";
import { prisma } from "../connection/client";

// Display All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Display all users", data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const newUser = await prisma.user.create({ data: { email, name } });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update User Data
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, name } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });
    res.status(200).json({ message: "User data updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.post.deleteMany({ where: { authorId: userId } });
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    res
      .status(200)
      .json({ message: "Delete user data and post", data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
