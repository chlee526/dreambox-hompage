/**
 * Contact Mutation Key 정의
 * React Query mutation 키를 중앙에서 관리
 */

export const contactKeys = {
  all: ['contact'] as const,
  sendEmail: () => [...contactKeys.all, 'sendEmail'] as const,
} as const;
