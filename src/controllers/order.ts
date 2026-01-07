import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Display All Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();    
    res.status(200).json({ message: "Display all orders", data: orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Order Summary
export const orderSummary = async (req: Request, res: Response) => {
  const { order, limit, offset } = req.query;
  try {
    const orders = await prisma.order.groupBy({
      by: ["userId"],
      _count: { id: true },
      orderBy: { _count: { id: order as "asc" | "desc" } },
      take: Number(limit),
      skip: Number(offset),
    });
    res.status(200).json({message: "Order summary", data: orders})
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Create New Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const newOrder = await prisma.order.create({
      data: { userId, productId, quantity },
    });
    res.status(201).json({ message: "New order created", data: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Update Order Data
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const { userId, productId, quantity } = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { userId, productId, quantity },
    });
    res.status(200).json({ message: "Order updated", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });
    res.status(200).json({ message: "Order deleted", data: deletedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};