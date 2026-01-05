import { Request, Response } from "express";
import { Order, cart } from "../models/order-model";
import { products } from "../models/product-model";

// Display Order Data
export const getOrder = (req: Request, res: Response) => {
  res.json(
    cart.map((order) => ({
      id: order.id,
      quantity: order.quantity,
      product: products.find((p) => p.id === order.productId),
    }))
  );
};

// Add Order Data
export const newOrder = (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const newCart: Order = {
    id: cart.length + 1,
    quantity,
    productId,
  };
  cart.push(newCart);
  res.status(201).json(newCart);
};
