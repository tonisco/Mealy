import { TRPCError } from "@trpc/server"
import { comparePasswords } from "db/src/encrypt"

import { emailExistSchema, loginSchema, signUpSchema } from "../../schema/auth"
import { procedure, router } from "../../trpc"
import { signJwt } from "../../utils/jwt"

export const authRouter = router({
  emailExist: procedure
    .input(emailExistSchema)
    .query(async ({ ctx, input }) => {
      const emailUsed = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      })
      return !!emailUsed
    }),
  login: procedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { email: input.email },
    })

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wrong Email or Password",
      })

    const passwordMatches = await comparePasswords(
      input.password,
      user.password,
    )

    if (!passwordMatches)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wrong Email or Password",
      })

    const token = signJwt({ id: user.id })

    return { ...user, token }
  }),
  signUp: procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.create({
      data: { ...input },
    })

    const token = signJwt({ id: user.id })
    return { ...user, token }
  }),
})
