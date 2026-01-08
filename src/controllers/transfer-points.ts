import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import AppError from "../utils/app-error";

// Transfer points user-to-user
export const transferPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, senderId, recipientId } = req.body;

  try {
    // Validate input amount
    if (amount <= 0) throw new AppError(400, "Invalid amount");

    // Sender and recipient are same
    if (senderId === recipientId)
      throw new AppError(400, "Sender and recipient are same");

    // Check Users
    const [sender, recipient] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: recipientId } }),
    ]);

    // If not exist throw error
    if (!sender) throw new AppError(404, "Sender not found");
    if (!recipient) throw new AppError(404, "Recipient not found");

    // Validate sender points
    if (sender.points < amount) throw new AppError(400, "Amount not enough");

    // Points transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: recipientId },
        data: { points: { increment: amount } },
      });
    });

    res.status(200).json({ message: "Points transfer success" });
  } catch (err) {
    next(err);
  }
};

// Display user points
export const userPoints = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const points = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, points: true },
    });
    res.status(200).json({ message: "Display user points", data: points });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user points" });
  }
};
