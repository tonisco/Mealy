import { initTRPC } from "@trpc/server"

const t = initTRPC.create()

export const { router } = t

export const { middleware } = t

export const { mergeRouters } = t

export const { procedure } = t
