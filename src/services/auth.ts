import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

interface UserInput {
  email: string;
  password: string;
  role?: string;
}

export async function registerUser({email, password, role}: UserInput) {
  const hashPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashPass, role: role ?? "user" },
  });

  return { id: user.id, email: user.email, role: user.role };
}

export async function loginUser({email, password}: UserInput) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Wrong password");

  const token = signToken({ id: user.id, role: user.role });
  return { token };
}
