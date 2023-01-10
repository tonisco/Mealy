import { TRPCError } from "@trpc/server"

import { middleware, procedure } from "."

const isLoggedIn = middleware(async ({ ctx, next }) => {
  const { prisma, userId } = ctx

  if (!userId)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized, please login",
    })

  const user = await prisma.user.findFirst({ where: { id: userId } })

  if (!user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorised, please login",
    })

  return next({
    ctx: { ...ctx, user },
  })
})

export const loggedInProcedure = procedure.use(isLoggedIn)
