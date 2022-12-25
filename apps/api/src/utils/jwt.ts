import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "thisisasecret"

export const signJwt = (payload: { id: string }) =>
  jwt.sign(payload, JWT_SECRET)

export const verifyJwt = (token: string): { id: string } =>
  jwt.verify(token, JWT_SECRET) as { id: string }
