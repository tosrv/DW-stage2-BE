import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product-controller";

const router = Router();

// Product Routes
router.get("/product", getProducts);
router.post("/product", createProduct);

export default router;
