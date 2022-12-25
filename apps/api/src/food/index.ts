import { router } from "../trpc"
import { authRouter } from "./auth"

export const foodRouter = router({
  auth: authRouter,
})
