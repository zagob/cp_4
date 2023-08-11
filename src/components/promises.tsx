"use client";

import { PointProvider } from "@/contexts/PointProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export function Promises({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PointProvider>
        <Toaster />
        {children}
      </PointProvider>
    </QueryClientProvider>
  );
}
