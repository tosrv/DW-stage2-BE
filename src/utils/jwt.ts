import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_SECRET as string;

export interface UserPayload {
  id: number;
  role: string;
}

// Generate JWT token
export function signToken(payload: UserPayload) {
  return jwt.sign(payload, jwtKey, { expiresIn: "1d" });
}

// Validate and decode JWT token
export function verifyToken(token: string) {
  return jwt.verify(token, jwtKey) as UserPayload;
}
