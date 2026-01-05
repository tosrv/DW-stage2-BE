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
