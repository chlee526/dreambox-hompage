'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * React Query Provider
 * 클라이언트 컴포넌트에서 QueryClient를 제공
 */
export default function ReactQueryClientProvider({ children }: React.PropsWithChildren) {
    // useState로 QueryClient를 한 번만 생성하도록 보장
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1분
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                    mutations: {
                        retry: 0,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* 개발 환경에서만 DevTools 표시 */}
            {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
        </QueryClientProvider>
    );
}
