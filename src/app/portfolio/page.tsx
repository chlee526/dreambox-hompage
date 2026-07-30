import React from 'react';
import type { Metadata } from 'next';
import PortfolioList from '@/features/portfolio/PortfolioList';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';

// ISR: 1시간마다 재생성
export const revalidate = 3600; // 3600초 = 1시간

export const metadata: Metadata = {
  title: { absolute: '박스제작 포트폴리오 | 시딩박스·화장품박스·싸바리박스·단상자·커스텀박스·쇼핑백·인쇄물 제작사례 - 드림박스' },
  description: '드림박스가 진행한 시딩박스, 화장품박스, 베이커리박스, 약상자, 크라프트상자, 싸바리박스, 단상자, 커스텀박스, 쇼핑백, 종이쇼핑백, 답례품포장, 인쇄물 등 다양한 패키지 제작사례를 확인해 보세요.',
  keywords: ['박스제작 사례', '패키지제작 사례', '베이커리박스', '약상자', '약케이스', '화장품박스', '크라프트상자', '선물포장박스', '종이쇼핑백', '답례품포장', '커스텀박스제작', '쇼핑백제작', '인쇄물제작', '시딩박스 제작사례', '싸바리박스 제작사례', '단상자 제작사례'],
};

export default async function PortfolioPage() {
  const queryClient = getQueryClient();

  return (
    <section className="l-page page-portfolio">
      <div className="l-inner">
        <div className="page-header">
          <h1 className="page-title">OUR WORK</h1>
          <p className="page-desc">싸바리박스, 단상자부터 시딩박스 같은 특이한 구조, 인쇄물까지. 드림박스 제작 사례를 아래에서 확인하세요</p>
        </div>

        {/* 클라이언트 컴포넌트로 필터링 및 인터랙션 처리 */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PortfolioList />
        </HydrationBoundary>
      </div>
    </section>
  );
}
