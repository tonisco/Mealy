import { initTRPC } from "@trpc/server"
import superjson from "superjson"

import { Context } from "./context"

const transformer = superjson

const t = initTRPC.context<Context>().create({ transformer })

export const { router } = t

export const { middleware } = t

export const { mergeRouters } = t

export const { procedure } = t
