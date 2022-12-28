import jwt from "jsonwebtoken"

import { env } from "../env"

export const signJwt = (payload: { id: string }) =>
  jwt.sign(payload, env.JWT_SECRET)

export const verifyJwt = (token: string): { id: string } =>
  jwt.verify(token, env.JWT_SECRET) as { id: string }
