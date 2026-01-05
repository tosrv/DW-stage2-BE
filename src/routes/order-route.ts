import { Router } from "express";
import { getOrder, newOrder } from "../controllers/order-controller";

const router = Router();

// Order Routes
router.get("/order", getOrder);
router.post("/order", newOrder);

export default router;
