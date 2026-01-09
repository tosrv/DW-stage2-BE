import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth";
import { loginUser, registerUser } from "../services/auth";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = req.body;
    const user = await registerUser({ email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = req.body;
    const user = await loginUser({ email, password });

    res.status(200).json({ message: "Login success", ...user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const profile = (req: Request, res: Response) => {
  const role = (req as any).user.role;
  res.status(200).json({ message: "Authorized page", role: role });
};

export const adminRegister = async (req: Request, res: Response) => {
  const role = (req as any).user.role;
  if (role !== "admin")
    return res.status(400).json({ message: "Permission denied" });

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, role = "admin", password } = req.body;
    const user = await registerUser({ email, password, role });
    res
      .status(201)
      .json({ message: "Admin registered successfully", data: user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
