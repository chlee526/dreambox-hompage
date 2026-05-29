import React from 'react';
import './style.scss';
import PortfolioList from '@/features/portfolio/PortfolioList';
import { getPortfolios } from '@/lib/portfolio';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { portfolioKeys } from '@/hooks/queries/portfolioKeys';

// ISR: 1시간마다 재생성
export const revalidate = 3600; // 3600초 = 1시간

export default async function PortfolioPage() {
  const queryClient = getQueryClient();

  // 서버에서 데이터 프리페치
  const portfolios = await getPortfolios();

  // React Query 캐시에 저장
  queryClient.setQueryData(portfolioKeys.lists(), portfolios);

  return (
    <section className="l-page page-portfolio">
      <div className="l-inner">
        <div className="l-page-header">
          <h3>Portfolio</h3>
          <span>드림박스가 제작한 다양한 패키지를 소개합니다.</span>
        </div>

        {/* 클라이언트 컴포넌트로 필터링 및 인터랙션 처리 */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PortfolioList />
        </HydrationBoundary>
      </div>
    </section>
  );
}
