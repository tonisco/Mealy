import { router } from "../trpc"
import { authRouter } from "./auth"

export const courierRouter = router({
  auth: authRouter,
})
