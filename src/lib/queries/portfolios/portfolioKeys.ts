/**
 * 포트폴리오 Query/Mutation Key 정의
 * React Query 캐시 키를 중앙에서 관리
 */

export const portfolioKeys = {
  all: ['portfolios'] as const,
  lists: () => [...portfolioKeys.all, 'list'] as const,
  list: (filters?: string) => [...portfolioKeys.lists(), filters] as const,
  previews: () => [...portfolioKeys.all, 'preview'] as const,
  details: () => [...portfolioKeys.all, 'detail'] as const,
  detail: (seq: number) => [...portfolioKeys.details(), seq] as const,

  // Mutation Keys
  create: () => [...portfolioKeys.all, 'create'] as const,
  update: (seq: number) => [...portfolioKeys.all, 'update', seq] as const,
  delete: (seq: number) => [...portfolioKeys.all, 'delete', seq] as const,
} as const;
