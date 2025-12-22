import Banner from './(main)/Banner';
import Portfolio from './(main)/Portfolio';
import { getPortfolios, getPreviewPortfolios } from '@/lib/services/portfolio';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { portfolioKeys } from 'root/src/lib/queries/portfolios/portfolioKeys';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

export default async function Home() {
  const queryClient = getQueryClient();

  // 서버에서 포트폴리오 데이터 프리페치
  const previewPortfolios = await getPreviewPortfolios();
  const allPortfolios = await getPortfolios();

  // React Query 캐시에 데이터 저장
  queryClient.setQueryData(portfolioKeys.previews(), previewPortfolios);
  queryClient.setQueryData(portfolioKeys.lists(), allPortfolios);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* 메인 배너 */}
      <Banner />
      {/* 포트폴리오 */}
      <Portfolio />
    </HydrationBoundary>
  );
}
