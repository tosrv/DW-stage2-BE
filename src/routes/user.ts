import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { getUsers } from "../controllers/user";
import { transferPoints } from "../controllers/transfer-points";

const router = Router();

// Routes
router.get("/users", getUsers);
router.post("/transfer-points", asyncHandler(transferPoints));

export default router;
