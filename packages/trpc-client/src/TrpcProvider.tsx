import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import { transformer } from "./transformer"
import { trpc } from "./trpc"

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
            if (token)
              return {
                authorization: `Bearer ${token}`,
              }
            return {}
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
