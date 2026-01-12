import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Max size 1MB",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.message === "JPG/PNG") {
    return res.status(400).json({
      message: "Only JPG or PNG file are allowed",
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
