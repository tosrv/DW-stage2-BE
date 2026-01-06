import { Router } from "express";
import { getProduts, createProduct, updateProduct, deleteProduct } from "../controllers/product";

const router = Router();

// Routes
router.get("/", getProduts)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router
