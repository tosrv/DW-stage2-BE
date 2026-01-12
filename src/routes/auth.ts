import { Router } from "express";
import { supplierLogin, supplierRegister } from "../controllers/auth";

const router = Router();

router.post("/suppliers/register", supplierRegister);
router.post("/suppliers/login", supplierLogin);

export default router;
