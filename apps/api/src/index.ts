import * as trpcExpress from "@trpc/server/adapters/express"
import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import path from "path"

import { foodRouter } from "./food"
import { procedure, router } from "./trpc"

dotenv.config({ path: path.join(__dirname, "../../../.env") })

const app = express()

app.use(express.json())
app.use(cors())

export const appRouter = router({
  home: procedure.query((req) => {
    console.log(req.ctx)
    return { message: "Welcome to Mealy" }
  }),
  food: foodRouter,
})

export type AppRouter = typeof appRouter

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"))

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Mealy" })
})

app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }))

app.listen(process.env.PORT, () => {
  console.log(`api is listening on port ${process.env.PORT}`)
})
