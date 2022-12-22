import { procedure, router } from "../trpc"

export const foodRouter = router({
  test: procedure.query(({ ctx }) => {
    console.log(ctx)
    return { message: "this is the food place" }
  }),
})
