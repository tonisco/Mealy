import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import * as trpcExpress from "@trpc/server/adapters/express"

import { procedure, router } from "./trpc"
import { foodRouter } from "./food"

dotenv.config()

export const appRouter = router({
  home: procedure.query((req) => {
    console.log(req.ctx)
    return { message: "Welcome to Mealy" }
  }),
  food: foodRouter,
})

export type AppRouter = typeof appRouter

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"))

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Mealy" })
})

app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }))

app.listen(process.env.PORT, () => {
  console.log(`api is listening on port ${process.env.PORT}`)
})
