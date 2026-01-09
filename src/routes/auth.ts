import { Router } from "express";
import { supplierLogin, supplierRegister } from "../controllers/auth";
import { createProduct, supplierProducts } from "../controllers/product";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/suppliers/register", supplierRegister);
router.post("/suppliers/login", supplierLogin);

router.get("/suppliers/products", authenticate, supplierProducts);
router.post("/products/add", authenticate, createProduct);

export default router;
