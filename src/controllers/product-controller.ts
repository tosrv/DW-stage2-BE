import { Request, Response } from "express";
import { Product, products } from "../models/product-model";

// Display Product Data
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

// Add Product
export const createProduct = (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const newProduct: Product = {
    id: products.length + 1,
    name,
    description,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update Product Data
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description, price } = req.body;
  const product = products.find((p) => p.id === id);

  if (!product) return res.status(404).json({ message: "Product not found" });
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;

  res.status(200).json(product);
};

// Delete Product
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
};
