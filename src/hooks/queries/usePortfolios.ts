'use client';

import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { PortfolioType } from '@/types/portfolio';
import { portfolioKeys } from './portfolioKeys';
export { portfolioKeys };

async function fetchPortfolios(): Promise<PortfolioType[]> {
  const res = await fetch('/api/portfolios');
  if (!res.ok) throw new Error('Failed to fetch portfolios');
  return res.json();
}

async function fetchPreviewPortfolios(): Promise<PortfolioType[]> {
  const res = await fetch('/api/portfolios?preview=true');
  if (!res.ok) throw new Error('Failed to fetch preview portfolios');
  return res.json();
}

async function fetchPortfolio(seq: number): Promise<PortfolioType | null> {
  const res = await fetch(`/api/portfolios/${seq}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch portfolio');
  }
  return res.json();
}

export function usePortfolios(initialData?: PortfolioType[]) {
  return useQuery({
    queryKey: portfolioKeys.lists(),
    queryFn: fetchPortfolios,
    initialData,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePreviewPortfolios(initialData?: PortfolioType[]) {
  return useQuery({
    queryKey: portfolioKeys.previews(),
    queryFn: fetchPreviewPortfolios,
    initialData,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePortfolio(seq: number, initialData?: PortfolioType | null) {
  return useQuery({
    queryKey: portfolioKeys.detail(seq),
    queryFn: () => fetchPortfolio(seq),
    initialData,
    staleTime: 1000 * 60 * 60,
    enabled: !!seq,
  });
}

export interface PortfolioFormData {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

async function createPortfolioAPI(data: PortfolioFormData): Promise<PortfolioType> {
  const response = await fetch('/api/admin/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 생성 실패' }));
    throw new Error(error.error || '포트폴리오 생성에 실패했습니다.');
  }
  const result = await response.json();
  return result.data;
}

async function updatePortfolioAPI(seq: number, data: PortfolioFormData): Promise<PortfolioType> {
  const response = await fetch(`/api/admin/portfolio/${seq}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 수정 실패' }));
    throw new Error(error.error || '포트폴리오 수정에 실패했습니다.');
  }
  const result = await response.json();
  return result.data;
}

async function deletePortfolioAPI(seq: number): Promise<void> {
  const response = await fetch(`/api/admin/portfolio/${seq}`, { method: 'DELETE' });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '포트폴리오 삭제 실패' }));
    throw new Error(error.error || '포트폴리오 삭제에 실패했습니다.');
  }
}

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
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useUpdatePortfolio(
  options?: Omit<UseMutationOptions<PortfolioType, Error, { seq: number; data: PortfolioFormData }>, 'mutationFn' | 'onSuccess'> & {
    onSuccess?: (data: PortfolioType) => void;
  },
) {
  const queryClient = useQueryClient();
  return useMutation<PortfolioType, Error, { seq: number; data: PortfolioFormData }>({
    mutationKey: portfolioKeys.update(0),
    mutationFn: ({ seq, data }) => updatePortfolioAPI(seq, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(variables.seq) });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

export function useDeletePortfolio(
  options?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn' | 'onSuccess'> & {
    onSuccess?: () => void;
  },
) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationKey: portfolioKeys.delete(0),
    mutationFn: deletePortfolioAPI,
    onSuccess: (_data, seq) => {
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.previews() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(seq) });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
}
