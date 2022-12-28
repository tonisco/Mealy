import { TRPCError } from "@trpc/server"
import { comparePasswords, encryptPassword } from "db/src/encrypt"

import {
  changePasswordSchema,
  confirmOTPSchema,
  emailExistSchema,
  loginSchema,
  sendOTPSchema,
  signUpSchema,
} from "../../schema/auth"
import { procedure, router } from "../../trpc"
import { signJwt } from "../../utils/jwt"
import { recoverPasswordMail } from "../../utils/mail"
import { generateOTP, hasOtpExpired, otpExpires } from "../../utils/otp"

export const authRouter = router({
  changePassword: procedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input
      let { password } = input

      password = await encryptPassword(password)

      try {
        await ctx.prisma.user.update({
          where: { email },
          data: {
            userAuth: { update: { password, OTP: null, OTPExpires: null } },
          },
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

      if (!user || !user.userAuth?.OTP || !user.userAuth.OTPExpires)
        throw new TRPCError({ code: "BAD_REQUEST", message: "OTP Error" })

      const otpMatches = user.userAuth.OTP.toString() === otp

      if (!otpMatches)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "OTP does not match, please check the values provided",
        })

      const hasExpired = hasOtpExpired(user.userAuth.OTPExpires)

      if (hasExpired)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "OTP has expired, please generate a new one",
        })

      return true
    }),
  emailExist: procedure
    .input(emailExistSchema)
    .mutation(async ({ ctx, input }) => {
      const emailUsed = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      })
      return { emailUsed: !!emailUsed }
    }),
  login: procedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { email: input.email },
    })

    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Wrong Email or Password",
      })

    const userAuth = await ctx.prisma.userAuth.findUnique({
      where: { userId: user.id },
    })

    if (!userAuth || !userAuth.password)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wrong Email or Password",
      })

    const passwordMatches = await comparePasswords(
      input.password,
      userAuth.password,
    )

    if (!passwordMatches)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wrong Email or Password",
      })

    const token = signJwt({ id: user.id })

    return { ...user, token }
  }),
  sendOTP: procedure.input(sendOTPSchema).mutation(async ({ ctx, input }) => {
    const { email } = input
    const user = await ctx.prisma.user.findUnique({ where: { email } })
    if (user) {
      const OTP = generateOTP()
      try {
        await ctx.prisma.userAuth.update({
          where: {
            userId: user.id,
          },
          data: {
            OTP,
            OTPExpires: otpExpires(),
          },
        })
        await recoverPasswordMail({
          from: "Mealy Food",
          to: user.email,
          otp: OTP,
        })
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to generate OTP",
        })
      }
    }
  }),
  signUp: procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    let { password } = input
    const { city, country, email, fullName, phone, state, street } = input

    password = await encryptPassword(password)

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

    return { ...user, token }
  }),
})
