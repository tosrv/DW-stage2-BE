import { Router } from "express";
import { userLogin, userRegister, profile, adminRegister } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/admin", authenticate, adminRegister)
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", authenticate, profile);


export default router;
