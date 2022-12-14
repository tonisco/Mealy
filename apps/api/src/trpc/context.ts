/* eslint-disable @typescript-eslint/no-unused-vars */
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import { prisma, User } from "db/src"

import { verifyJwt } from "../utils/jwt"

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  let token

  const getUser = () => {
    const hasToken = req.headers.authorization

    if (hasToken && hasToken.startsWith("Bearer")) {
      try {
        token = hasToken.split(" ")

        const decodedToken = verifyJwt(token[1])

        return decodedToken.id
      } catch (error) {
        req.headers.authorization = ""
        return null
      }
    }
    return null
  }

  let user: User | undefined

  return {
    prisma,
    req,
    res,
    user,
    userId: getUser(),
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
