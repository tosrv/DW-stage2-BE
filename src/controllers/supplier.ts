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

  try {
    // Validate stocks is not empty
    if (!Array.isArray(stocks) || stocks.length === 0)
      throw new AppError(400, "Stocks must be non-empty array");

    for (const s of stocks) {
      if (
        typeof s.productId !== "number" ||
        typeof s.supplierId !== "number" ||
        typeof s.quantity !== "number" ||
        s.quantity <= 0
      )
        throw new AppError(400, "Invalid stock payload");
    }

    // Validate product ownership
    const productSupplierPairs = stocks.map((s) => ({
      id: s.productId,
      supplierId: s.supplierId,
    }));

    const validProducts = await prisma.product.findMany({
      where: { OR: productSupplierPairs },
      select: { id: true, supplierId: true },
    });

    if (validProducts.length !== stocks.length)
      throw new AppError(
        400,
        "One or more products do not belong to the given supplier"
      );

    // Batch update
    await prisma.$transaction(
      stocks.map((item: any) =>
        prisma.stock.updateMany({
          where: {
            productId: item.productId,
            supplierId: item.supplierId,
          },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        })
      )
    );

    res.status(200).json({ message: "Batch stock update success" });
  } catch (err) {
    next(err);
  }
};
