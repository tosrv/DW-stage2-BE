import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

interface UserInput {
  email: string;
  password: string;
}

export async function registerSup({ email, password }: UserInput) {
  const hashPass = await bcrypt.hash(password, 10);

  const supplier = await prisma.supplier.create({
    data: {
      email,
      password: hashPass,
    },
  });

  return { id: supplier.id, email: supplier.email };
}

export async function loginSup({ email, password }: UserInput) {
  const supplier = await prisma.supplier.findUnique({
    where: { email: email },
  });
  if (!supplier) throw new Error("User not found");

  const match = await bcrypt.compare(password, supplier.password);
  if (!match) throw new Error("Wrong password");

  const token = signToken({ id: supplier.id, role: supplier.role });
  return { token };
}
