'use client';
import { ReactNode } from 'react';
import { Env } from '@/libs/Env';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default options for queries (ms)
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {Env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
