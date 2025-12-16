/**
 * Upload Mutation Key 정의
 * React Query mutation 키를 중앙에서 관리
 */

export const uploadKeys = {
  all: ['upload'] as const,
  image: () => [...uploadKeys.all, 'image'] as const,
} as const;
