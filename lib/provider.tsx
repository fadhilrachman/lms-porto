"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
declare module "clsx" {
  export type ClassValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | { [key: string]: boolean };
}
function Provider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // useErrorBoundary: false,
          refetchOnWindowFocus: false,
          retry(failureCount, error: any) {
            if (error.status === 404) return false;
            if (error.status === 403) return false;
            if (failureCount < 2) return true;

            return false;
          },
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Provider;
