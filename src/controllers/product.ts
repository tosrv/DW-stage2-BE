import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import AppError from "../utils/app-error";
import { productSchema } from "../validation/product";

// Display All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ message: "Display all products", data: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to get all products" });
  }
};

export const supplierProducts = async (req: Request, res: Response) => {
  try {
    const supplierId = (req as any).user.id;
    const products = await prisma.product.findMany({
      where: { supplierId: supplierId },
    });
    res.status(200).json({ message: "Supplier products", data: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to get products" });
  }
};

// Filter Products
export const getProducts = async (req: Request, res: Response) => {
  const {
    sortBy = "price",
    order = "asc",
    minPrice,
    maxPrice,
    limit = 10,
    offset,
  } = req.query;

  const filters: any = {};

  if (minPrice) filters.price = { gte: parseFloat(minPrice as string) };
  if (maxPrice) {
    filters.price = {
      ...(filters.price || {}),
      lte: parseFloat(maxPrice as string),
    };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });
    const filteredProducts = await prisma.product.count({ where: filters });
    res.status(200).json({
      message: "Display filtered products",
      data: products,
      total: filteredProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to filter products" });
  }
};

// Create New Product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate input
    const { value, error } = productSchema.validate(req.body);
    if (error) throw new AppError(400, error.message);

    const supplierId = (req as any).user.id;
    const { name, price } = value;

    // Create new product
    const newProduct = await prisma.product.create({
      data: { name, price, supplierId },
    });
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (err) {
    next(err);
  }
};

// Update Product Data
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.id);
  const { name, price, supplierId } = req.body;

  try {
    // Validate id
    if (Number.isNaN(productId)) throw new AppError(400, "Invalid product ID");

    // Validate input
    if (!name) throw new AppError(400, "Product name is required");
    if (price === undefined || price === null)
      throw new AppError(400, "Product price is required");
    if (supplierId === undefined || supplierId === null)
      throw new AppError(400, "Supplier ID is required");

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, price, supplierId },
    });
    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err: any) {
    // Prisma record not found
    if (err.code === "P2025")
      return next(new AppError(404, "Product not found"));

    next(err);
  }
};

// Delete Product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.id);

  try {
    // Validate id
    if (Number.isNaN(productId)) throw new AppError(400, "Invalid product ID");

    await prisma.product.delete({ where: { id: productId } });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err: any) {
    // Prisma record not found
    if (err.code === "P2025")
      return next(new AppError(404, "Product not found"));

    next(err);
  }
};
