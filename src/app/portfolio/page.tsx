import React from 'react';
import PortfolioList from '@/features/portfolio/PortfolioList';
// import { getPortfolios } from '@/lib/portfolio';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { portfolioKeys } from '@/hooks/queries/portfolioKeys';

// ISR: 1시간마다 재생성
export const revalidate = 3600; // 3600초 = 1시간

export default async function PortfolioPage() {
    const queryClient = getQueryClient();

    // 서버에서 데이터 프리페치
    // const portfolios = await getPortfolios();

    // React Query 캐시에 저장
    // queryClient.setQueryData(portfolioKeys.lists(), portfolios);

    return (
        <section className="l-page page-portfolio">
            <div className="l-inner">
                <div className="page-header">
                    <strong className="page-title">OUR WORK</strong>
                </div>

                {/* 클라이언트 컴포넌트로 필터링 및 인터랙션 처리 */}
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <PortfolioList />
                </HydrationBoundary>
            </div>
        </section>
    );
}
