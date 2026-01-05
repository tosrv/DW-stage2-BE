import { Request, Response } from "express";
import { Order, orders } from "../models/order-model";
import { products } from "../models/product-model";

// Display Order Data
export const getOrder = (req: Request, res: Response) => {
  res.json(
    orders.map((order) => ({
      id: order.id,
      quantity: order.quantity,
      product: products.find((p) => p.id === order.productId),
    }))
  );
};

// Add Order Data
export const newOrder = (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const newOrder: Order = {
    id: orders.length + 1,
    quantity,
    productId,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// Update Order Data
export const updateOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { quantity, productId } = req.body;
  const order = orders.find((o) => o.id === id);

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (quantity !== undefined) order.quantity = quantity;
  if (productId !== undefined) order.productId = productId;

  res.status(200).json(order);
};

// Delete Order
export const deleteOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = orders.findIndex((o) => o.id === id);

  if (index === -1) return res.status(404).json({ message: "Order not found" });

  orders.splice(index, 1);
  res.status(204).send();
};
