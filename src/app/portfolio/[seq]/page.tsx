import React from 'react';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/features/portfolio/portfolioData';
import PortfolioDetail from '@/features/portfolio/PortfolioDetail';

interface PortfolioDetailPageProps {
    params: Promise<{ seq: string }>;
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
    const { seq } = await params;

    const detailData = portfolioData.find((item) => item.seq === seq);

    if (!detailData) {
        notFound();
    }

    return <PortfolioDetail seq={seq} />;
}
