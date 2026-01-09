import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validation/auth";
import { registerSup, loginSup } from "../services/auth";

export const supplierRegister = async (req: Request, res: Response) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = value;
    const supplier = await registerSup({ email, password });

    res
      .status(201)
      .json({ message: "Supplier registered successfully", data: supplier });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const supplierLogin = async (req: Request, res: Response) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = value;
    const supplier = await loginSup({ email, password });

    res.status(200).json({ message: "Login success", ...supplier });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};