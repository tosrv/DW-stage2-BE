import jwt from "jsonwebtoken";
const jwtKey = process.env.JWT_SECRET as string;

interface UserPayload {
  id: number;
  role: string;
}

export function signToken(payload: UserPayload) {
  return jwt.sign(payload, jwtKey, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtKey) as UserPayload;
}
