import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import AppError from "../utils/app-error";

// Display all suppliers
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json({ message: "Display all suppliers", data: suppliers });
  } catch (error) {
    res.status(500).json({ error: "Failed to get suppliers" });
  }
};

// Display all stocks
export const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await prisma.stock.findMany();
    res.status(200).json({ message: "Display all stocks", data: stocks });
  } catch (error) {
    res.status(500).json({ error: "Failed to get stocks" });
  }
};

// Update products stock
export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stocks } = req.body;

  // Validate stocks is not empty
  if (!Array.isArray(stocks) || stocks.length === 0)
    return next(new AppError(400, "Stocks must be non-empty array"));

  const success: any[] = [];
  const failed: any[] = [];

  for (const item of stocks) {
    try {
      if (
        typeof item.productId !== "number" ||
        typeof item.supplierId !== "number" ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      )
        throw new Error("Invalid stock payload");

      // Validate product ownership
      const product = await prisma.product.findFirst({
        where: {
          id: item.productId,
          supplierId: item.supplierId,
        },
      });

      if (!product) throw Error("Product not owned by supplier");

      // Batch update
      await prisma.stock.updateMany({
        where: {
          productId: item.productId,
          supplierId: item.supplierId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      });

      success.push(item);
    } catch (err: any) {
      failed.push({
        item,
        failed: err.message,
      });
    }
  }
  res.status(200).json({
    message: "Batch stock update finished",
    success: success.length,
    failed: failed.length,
  });
};
