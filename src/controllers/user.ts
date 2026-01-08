import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Display all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Display all users", data: users });
  } catch (error) {
    res.status(500).json({ erros: "Failed to get users" });
  }
};