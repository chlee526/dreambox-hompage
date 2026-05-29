import { MetadataRoute } from 'next';
import { getPortfolios } from '@/lib/portfolio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.dreambox.kr';

  // 포트폴리오 목록 가져오기
  const portfolios = await getPortfolios();

  // 포트폴리오 상세 페이지 URL 생성
  const portfolioUrls = portfolios.map((portfolio) => ({
    url: `${baseUrl}/portfolio/${portfolio.seq}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...portfolioUrls, // 동적 포트폴리오 페이지들
  ];
}
