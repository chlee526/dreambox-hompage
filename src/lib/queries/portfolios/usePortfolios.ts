'use client';

import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { PortfolioType } from '@/types/portfolio';
import { portfolioKeys } from './portfolioKeys';

/**
 * 클라이언트에서 포트폴리오 API 호출 함수들
 *
 * 주의: 이 함수들은 서버에서 HydrationBoundary로 캐시를 전달받은 후,
 * staleTime이 지나거나 수동 리페치 시에만 호출됩니다.
 */

// 전체 포트폴리오 목록 가져오기
async function fetchPortfolios(): Promise<PortfolioType[]> {
  console.log('[Client] fetchPortfolios 호출 - API 요청 시작');
  const res = await fetch('/api/portfolios');
  if (!res.ok) throw new Error('Failed to fetch portfolios');
  const data = await res.json();
  console.log('[Client] fetchPortfolios 완료:', data.length, '개');
  return data;
}

// 미리보기 포트폴리오 가져오기
async function fetchPreviewPortfolios(): Promise<PortfolioType[]> {
  console.log('[Client] fetchPreviewPortfolios 호출 - API 요청 시작');
  const res = await fetch('/api/portfolios?preview=true');
  if (!res.ok) throw new Error('Failed to fetch preview portfolios');
  const data = await res.json();
  console.log('[Client] fetchPreviewPortfolios 완료:', data.length, '개');
  return data;
}

// 개별 포트폴리오 가져오기
async function fetchPortfolio(seq: number): Promise<PortfolioType | null> {
  console.log('[Client] fetchPortfolio 호출 - seq:', seq);
  const res = await fetch(`/api/portfolios/${seq}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch portfolio');
  }
  const data = await res.json();
  console.log('[Client] fetchPortfolio 완료:', data.name);
  return data;
}

/**
 * React Query Hooks
 */

// 전체 포트폴리오 목록 훅
export function usePortfolios(initialData?: PortfolioType[]) {
  return useQuery({
    queryKey: portfolioKeys.lists(),
    queryFn: fetchPortfolios,
    initialData,
    staleTime: 1000 * 60 * 60, // 1시간 (ISR과 동일)
  });
}

// 미리보기 포트폴리오 훅
export function usePreviewPortfolios(initialData?: PortfolioType[]) {
  return useQuery({
    queryKey: portfolioKeys.previews(),
    queryFn: fetchPreviewPortfolios,
    initialData,
    staleTime: 1000 * 60 * 60,
  });
}

// 개별 포트폴리오 훅
export function usePortfolio(seq: number, initialData?: PortfolioType | null) {
  return useQuery({
    queryKey: portfolioKeys.detail(seq),
    queryFn: () => fetchPortfolio(seq),
    initialData,
    staleTime: 1000 * 60 * 60,
    enabled: !!seq, // seq가 있을 때만 실행
  });
}

/**
 * ========================================
 * MUTATION (CUD 작업)
 * ========================================
 */

/**
 * 포트폴리오 생성/수정 데이터 타입
 */
export interface PortfolioFormData {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

/**
 * 포트폴리오 생성 API
 */
async function createPortfolioAPI(data: PortfolioFormData): Promise<PortfolioType> {
  const response = await fetch('/api/admin/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 생성 실패' }));
    throw new Error(error.error || '포트폴리오 생성에 실패했습니다.');
  }

  const result = await response.json();
  return result.data;
}

/**
 * 포트폴리오 수정 API
 */
async function updatePortfolioAPI(seq: number, data: PortfolioFormData): Promise<PortfolioType> {
  const response = await fetch(`/api/admin/portfolio/${seq}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 수정 실패' }));
    throw new Error(error.error || '포트폴리오 수정에 실패했습니다.');
  }

  const result = await response.json();
  return result.data;
}

/**
 * 포트폴리오 삭제 API
 */
async function deletePortfolioAPI(seq: number): Promise<void> {
  const response = await fetch(`/api/admin/portfolio/${seq}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 삭제 실패' }));
    throw new Error(error.error || '포트폴리오 삭제에 실패했습니다.');
  }
}

/**
 * 포트폴리오 생성 Mutation Hook
 * @param options - useMutation 옵션
 *
 * @example
 * ```tsx
 * const { mutateAsync, isPending } = useCreatePortfolio({
 *   onSuccess: (data) => {
 *     console.log('생성 성공:', data);
 *     router.push('/admin/portfolio');
 *   },
 *   onError: (error) => {
 *     alert('생성 실패: ' + error.message);
 *   }
 * });
 *
 * await mutateAsync({ name, category, ... });
 * ```
 */
export function useCreatePortfolio(
  options?: Omit<UseMutationOptions<PortfolioType, Error, PortfolioFormData>, 'mutationFn' | 'onSuccess'> & {
    onSuccess?: (data: PortfolioType) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<PortfolioType, Error, PortfolioFormData>({
    mutationKey: portfolioKeys.create(),
    mutationFn: createPortfolioAPI,
    onSuccess: (data) => {
      // 캐시 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });

      // 사용자 정의 onSuccess 호출
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * 포트폴리오 수정 Mutation Hook
 * @param options - useMutation 옵션
 *
 * @example
 * ```tsx
 * const { mutateAsync, isPending } = useUpdatePortfolio({
 *   onSuccess: (data) => {
 *     console.log('수정 성공:', data);
 *     router.push('/admin/portfolio');
 *   }
 * });
 *
 * await mutateAsync({ seq: 1, data: { name, category, ... } });
 * ```
 */
export function useUpdatePortfolio(
  options?: Omit<UseMutationOptions<PortfolioType, Error, { seq: number; data: PortfolioFormData }>, 'mutationFn' | 'onSuccess'> & {
    onSuccess?: (data: PortfolioType) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<PortfolioType, Error, { seq: number; data: PortfolioFormData }>({
    mutationKey: portfolioKeys.update(0), // seq는 런타임에 결정
    mutationFn: ({ seq, data }) => updatePortfolioAPI(seq, data),
    onSuccess: (data, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(variables.seq) });

      // 사용자 정의 onSuccess 호출
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * 포트폴리오 삭제 Mutation Hook
 * @param options - useMutation 옵션
 *
 * @example
 * ```tsx
 * const { mutateAsync, isPending } = useDeletePortfolio({
 *   onSuccess: () => {
 *     console.log('삭제 성공');
 *   }
 * });
 *
 * await mutateAsync(1); // seq
 * ```
 */
export function useDeletePortfolio(
  options?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn' | 'onSuccess'> & {
    onSuccess?: () => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationKey: portfolioKeys.delete(0), // seq는 런타임에 결정
    mutationFn: deletePortfolioAPI,
    onSuccess: (_data, seq) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(seq) });

      // 사용자 정의 onSuccess 호출
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
}
