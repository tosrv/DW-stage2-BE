import { Request, Response } from "express";
import { prisma } from "../connection/client";

// Display All Products
export const getProduts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ message: "Display all products", data: products });
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
