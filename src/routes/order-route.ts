import { Router } from "express";
import {
  getOrder,
  newOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order-controller";

const router = Router();

// Order Routes
router.get("/order", getOrder);
router.post("/order", newOrder);
router.patch("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;
