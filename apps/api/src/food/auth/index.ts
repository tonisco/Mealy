import { TRPCError } from "@trpc/server"
import { comparePasswords } from "db/src/encrypt"

import {
  changePasswordSchema,
  confirmOTPSchema,
  emailExistSchema,
  loginSchema,
  signUpSchema,
} from "../../schema/auth"
import { procedure, router } from "../../trpc"
import { signJwt } from "../../utils/jwt"

export const authRouter = router({
  changePassword: procedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input

      try {
        await ctx.prisma.user.update({
          where: { email },
          data: { userAuth: { update: { password } } },
        })

        return { message: "Your password has been changed" }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Your new password was not saved",
        })
      }
    }),
  confirmOTP: procedure
    .input(confirmOTPSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, otp } = input

      const user = await ctx.prisma.user.findUnique({
        where: { email },
        include: { userAuth: true },
      })

      if (!user)
        throw new TRPCError({ code: "BAD_REQUEST", message: "OTP Error" })

      console.log(user)

      const userAuth = await ctx.prisma.userAuth.findUnique({
        where: { userId: user.id },
      })

      if (!userAuth)
        throw new TRPCError({ code: "BAD_REQUEST", message: "OTP Error" })

      return userAuth.OTP?.toString() === otp
    }),
  emailExist: procedure
    .input(emailExistSchema)
    .query(async ({ ctx, input }) => {
      const emailUsed = await ctx.prisma.user.findUnique({
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

    const userAuth = await ctx.prisma.userAuth.findUnique({
      where: { userId: user.id },
    })

    const passwordMatches = await comparePasswords(
      input.password,
      userAuth?.password ?? "",
    )

    if (!passwordMatches)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wrong Email or Password",
      })

    const token = signJwt({ id: user.id })

    console.log(user)

    return { ...user, token }
  }),
  signUp: procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { city, country, email, fullName, password, phone, state, street } =
      input

    const user = await ctx.prisma.user.create({
      data: {
        city,
        country,
        email,
        fullName,
        phone,
        state,
        street,
        userAuth: { create: { password } },
      },
    })

    const token = signJwt({ id: user.id })
    console.log(user)
    return { ...user, token }
  }),
  // sendOTP,
})
