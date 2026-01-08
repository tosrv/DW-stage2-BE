import { Router } from "express";
import { getSuppliers, getStocks, updateStock } from "../controllers/supplier";

const router = Router();

// Routes
router.get("/suppliers", getSuppliers);
router.get("/stocks", getStocks);
router.post("/suppliers/stock", updateStock);

export default router;
