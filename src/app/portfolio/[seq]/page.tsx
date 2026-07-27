import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/features/portfolio/portfolioData';
import PortfolioDetail from '@/features/portfolio/PortfolioDetail';

interface PortfolioDetailPageProps {
    params: Promise<{ seq: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
    const { seq } = await params;
    const item = portfolioData.find((p) => p.seq === seq);
    if (!item) return {};

    const title = `${item.name} 제작사례`;
    const description = (item.infos?.map((i) => `${i.topic} ${i.info}`).join(' · ') || `${item.name} 박스제작 포트폴리오`).slice(0, 150);
    const ogImage = item.thumbnailList?.[0]?.url;

    return {
        title,
        description,
        keywords: [item.name, ...item.category, '박스제작', '패키지제작', '드림박스'],
        openGraph: { title, description, images: ogImage ? [{ url: ogImage }] : undefined },
    };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
    const { seq } = await params;

    const detailData = portfolioData.find((item) => item.seq === seq);

    if (!detailData) {
        notFound();
    }

    return <PortfolioDetail seq={seq} />;
}
