/* eslint-disable import/first */
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../../.env") })

import * as trpcExpress from "@trpc/server/adapters/express"
import cors from "cors"
import express from "express"
import morgan from "morgan"

import { env } from "./env"
import { foodRouter } from "./food"
import { procedure, router } from "./trpc"
import { createContext } from "./trpc/context"

const app = express()

app.use(express.json())
app.use(cors())

export const appRouter = router({
  home: procedure.query(() => ({ message: "Welcome to Mealy" })),
  food: foodRouter,
})

export type AppRouter = typeof appRouter

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"))

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Mealy" })
})

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext }),
)

app.listen(env.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`api is listening on port ${env.PORT}`)
})
