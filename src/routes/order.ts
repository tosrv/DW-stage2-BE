import { Router } from "express";
import {
  getAllOrders,
  orderSummary,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order";

const router = Router();

// Routes
router.get("/orders", getAllOrders);
router.get("/orders/summary", orderSummary);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;
