import React from 'react';
import { notFound } from 'next/navigation';
import { getPortfolio } from '@/lib/portfolio';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { portfolioKeys } from '@/hooks/queries/portfolioKeys';
import PortfolioDetail from '@/features/portfolio/PortfolioDetail';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

// 빌드 시 모든 포트폴리오 상세 페이지를 정적으로 생성
// export async function generateStaticParams() {
//   const portfolios = await getPortfolios();
//   return portfolios.map((portfolio) => ({
//     seq: portfolio.seq.toString(),
//   }));
// }

interface PortfolioDetailPageProps {
    params: Promise<{ seq: string }>;
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
    const { seq } = await params;
    const id = Number(seq);

    const queryClient = getQueryClient();

    // 서버에서 데이터 프리페치
    const detailData = await getPortfolio(id);

    // 데이터가 없으면 404 페이지 표시
    if (!detailData) {
        notFound();
    }

    // React Query 캐시에 저장
    queryClient.setQueryData(portfolioKeys.detail(id), detailData);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PortfolioDetail seq={id} />
        </HydrationBoundary>
    );
}
