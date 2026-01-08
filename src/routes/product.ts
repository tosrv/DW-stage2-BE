import { Router } from "express";
import {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

// Routes
router.get("/all-products", getAllProducts);
router.get("/products", getProducts);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
