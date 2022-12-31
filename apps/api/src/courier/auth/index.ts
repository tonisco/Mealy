import { TRPCError } from "@trpc/server"
import { comparePasswords, encryptPassword } from "db/src/encrypt"
import {
  changePasswordSchema,
  confirmOTPSchema,
  emailExistSchema,
  loginSchema,
  sendOTPSchema,
  signUpSchema,
} from "schema"

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
        await ctx.prisma.courier.update({
          where: { email },
          data: { courierAuth: { update: { password } } },
        })

        return { message: "Your password has been changed" }
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Your new password was not saved",
        })
      }
    }),
  confirmOTP: procedure
    .input(confirmOTPSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, otp } = input

      const courier = await ctx.prisma.courier.findUnique({
        where: { email },
        include: { courierAuth: true },
      })

      if (
        !courier ||
        !courier.courierAuth?.OTP ||
        !courier.courierAuth.OTPExpires
      )
        throw new TRPCError({ code: "BAD_REQUEST", message: "OTP Error" })

      const hasExpired = hasOtpExpired(courier.courierAuth.OTPExpires)

      if (hasExpired)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "OTP has expired please generate a new one",
        })

      const otpMatches = courier.courierAuth.OTP.toString() === otp

      if (!otpMatches)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "OTP does not match, please check the values provided",
        })

      return true
    }),
  emailExist: procedure
    .input(emailExistSchema)
    .mutation(async ({ ctx, input }) => {
      const { email } = input

      const emailUsed = await ctx.prisma.courier.findUnique({
        where: { email },
      })

      return { emailUsed: !!emailUsed }
    }),

  login: procedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input

    const courier = await ctx.prisma.courier.findUnique({ where: { email } })

    if (!courier)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Wrong username or password",
      })

    const courierAuth = await ctx.prisma.courierAuth.findUnique({
      where: { courierId: courier.id },
    })

    if (!courierAuth || !courierAuth.password)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Wrong username or password",
      })

    const passwordMatches = await comparePasswords(
      password,
      courierAuth.password,
    )

    if (!passwordMatches)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Wrong username or password",
      })

    const token = signJwt({ id: courier.id })

    return { ...courier, token }
  }),
  sendOtp: procedure.input(sendOTPSchema).mutation(async ({ ctx, input }) => {
    const { email } = input

    const courier = await ctx.prisma.courier.findUnique({ where: { email } })

    if (courier) {
      const otp = generateOTP()

      try {
        await ctx.prisma.courierAuth.update({
          where: { courierId: courier.id },
          data: {
            OTP: otp,
            OTPExpires: otpExpires(),
          },
        })

        await recoverPasswordMail({ from: "Mealy Driver", to: email, otp })
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OTP ERROR",
        })
      }
    }
  }),
  signup: procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    const { city, country, email, fullName, phone, state, street } = input

    let { password } = input

    try {
      password = await encryptPassword(password)

      const courier = await ctx.prisma.courier.create({
        data: {
          city,
          country,
          email,
          fullName,
          phone,
          state,
          street,
          courierAuth: { create: { password } },
        },
      })

      const token = signJwt({ id: courier.id })

      return { ...courier, token }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Sign Up Failed",
      })
    }
  }),
})
