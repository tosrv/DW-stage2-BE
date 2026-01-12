import { Router } from "express";
import { upload } from "../middlewares/multer";
import { productUpload } from "../controllers/product";
import { limiter } from "../middlewares/rate-limit";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post(
  "/products/upload-image",
  [authenticate, limiter, upload.single("products")],
  productUpload
);

export default router;
