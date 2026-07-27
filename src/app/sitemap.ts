import { MetadataRoute } from 'next';
import { portfolioData } from '@/features/portfolio/portfolioData';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE_URL}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    const portfolioRoutes: MetadataRoute.Sitemap = portfolioData.map((item) => ({
        url: `${SITE_URL}/portfolio/${item.seq}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...portfolioRoutes];
}
