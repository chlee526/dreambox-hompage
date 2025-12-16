import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * 서버 컴포넌트용 QueryClient
 * React cache를 사용하여 요청당 하나의 QueryClient만 생성
 * 이를 통해 서버에서 프리페치한 데이터를 클라이언트로 전달
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // 서버에서는 리페칭하지 않음
          staleTime: 60 * 1000, // 1분
          refetchOnWindowFocus: false,
        },
      },
    }),
);
