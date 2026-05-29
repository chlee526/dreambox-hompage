export const portfolioKeys = {
  all: ['portfolios'] as const,
  lists: () => [...portfolioKeys.all, 'list'] as const,
  previews: () => [...portfolioKeys.all, 'preview'] as const,
  details: () => [...portfolioKeys.all, 'detail'] as const,
  detail: (seq: number) => [...portfolioKeys.details(), seq] as const,
  create: () => [...portfolioKeys.all, 'create'] as const,
  update: (seq: number) => [...portfolioKeys.all, 'update', seq] as const,
  delete: (seq: number) => [...portfolioKeys.all, 'delete', seq] as const,
} as const;
