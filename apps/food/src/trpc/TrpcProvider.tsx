import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"
import superjson from "superjson"

import { trpc } from "./trpc"

const transformer = superjson

type Props = {
  children: React.ReactNode
  port: string
  token?: string
}

export function TrpcProvider({ children, port, token }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: `${port}/api/trpc/`,
          headers() {
            return {
              authorization: `Bearer ${token ?? ""}`,
            }
          },
        }),
      ],
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
