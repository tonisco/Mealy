import { router } from "../trpc"
import { authRouter } from "./auth"
import { mainRouter } from "./main"

export const foodRouter = router({
  auth: authRouter,
  main: mainRouter,
})
