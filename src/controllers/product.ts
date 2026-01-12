import { Request, Response } from "express";

export const productUpload = (req: Request, res: Response) => {
  try {
    const uploadedImage = req.file;

    if (!uploadedImage) {
      return res.status(400).json({ message: "Product image is required" });
    }
    const image = uploadedImage.filename;

    res.status(200).json({ message: "Product image uploaded", data: image });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};
