import { Router } from "express";
import { getUsers } from "../controllers/user";
import { transferPoints, userPoints } from "../controllers/transfer-points";

const router = Router();

// Routes
router.get("/users", getUsers);
router.get("/points/:id", userPoints);
router.post("/transfer-points", transferPoints);

export default router;
