import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import { trpc } from "."

export function TrpcProvider({
  children,
  port,
}: {
  children: React.ReactNode
  port: string
}) {
  console.log(port)
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${port}/api/trpc/`,
          // optional
          //   headers() {
          //     return {
          //       authorization: getAuthCookie(),
          //     }
          //   },
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
