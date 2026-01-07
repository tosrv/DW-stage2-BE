import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Display All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ message: "Display all products", data: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Filter Products
export const getProducts = async (req: Request, res: Response) => {
  const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query;

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
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Create New Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, price, stock },
    });
    res.status(201).json({ message: "New product created", data: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update Product Data
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, price, stock },
    });
    res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: "Product deleted", data: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
