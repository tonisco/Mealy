import { TRPCError } from "@trpc/server"
import { encryptPassword } from "db/src/encrypt"

import { changePasswordSchema } from "../../schema/auth"
import { procedure, router } from "../../trpc"

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
})
