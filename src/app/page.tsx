import type { Metadata } from 'next';
import HomeSwiper from '@/features/home/HomeSwiper';
// import { getPortfolios, getPreviewPortfolios } from '@/lib/portfolio';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
// import { portfolioKeys } from '@/hooks/queries/portfolioKeys';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

export const metadata: Metadata = {
    title: { absolute: '박스제작 패키지제작 전문업체 드림박스 | 싸바리박스·단상자·접이식박스·골판지박스 OEM' },
    description: '구조 설계부터 무료 샘플 제작, OEM 생산, 납품까지 원스톱으로 진행하는 패키지 제작 전문업체 드림박스입니다. 주문 전 구조설계 샘플을 무료로 확인하실 수 있으며, 소량부터 대량까지 맞춤 박스제작이 가능합니다.',
    keywords: ['박스제작', '패키지제작', '박스제작업체', '패키지제작업체', '맞춤박스제작', '싸바리', '단상자', '접이식박스', '골판지박스', 'OEM 박스제작', '소량박스제작', '대량박스제작', '박스 무료샘플', '샘플제작 무료', '패키지 샘플 무료제공'],
};

export default async function Home() {
    const queryClient = getQueryClient();

    // 서버에서 포트폴리오 데이터 프리페치
    // const previewPortfolios = await getPreviewPortfolios();
    // const allPortfolios = await getPortfolios();

    // React Query 캐시에 데이터 저장
    // queryClient.setQueryData(portfolioKeys.previews(), previewPortfolios);
    // queryClient.setQueryData(portfolioKeys.lists(), allPortfolios);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HomeSwiper />
        </HydrationBoundary>
    );
}
