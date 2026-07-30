import { MetadataRoute } from 'next';
import { portfolioData } from '@/features/portfolio/portfolioData';
import { SITE_URL } from '@/lib/site';

// 정적 페이지 실제 내용이 바뀔 때만 이 날짜를 갱신할 것
const STATIC_LAST_MODIFIED = new Date('2026-07-30');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
        { url: `${SITE_URL}/portfolio`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE_URL}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE_URL}/faq`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.5 },
        // /guide는 콘텐츠가 채워지고 noindex가 해제되기 전까지 제외
    ];

    const portfolioRoutes: MetadataRoute.Sitemap = portfolioData.map((item) => ({
        url: `${SITE_URL}/portfolio/${item.seq}`,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...portfolioRoutes];
}
