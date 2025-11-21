import React from 'react';
import './style.scss';
import PortfolioClient from './PortfolioClient';
import { getPortfolios } from '@/services/portfolio.service';

// ISR: 1시간마다 재생성
export const revalidate = 3600; // 3600초 = 1시간

export default async function PortfolioPage() {
  // 서버에서 데이터 가져오기 (빌드 시 또는 ISR 시)
  const portfolios = await getPortfolios();

  return (
    <section className="page-portfolio">
      <div className="l-inner">
        <div className="page-portfolio-header">
          <h3>Portfolio</h3>
          <span>드림박스가 제작한 다양한 패키지를 소개합니다.</span>
        </div>

        {/* 클라이언트 컴포넌트로 필터링 및 인터랙션 처리 */}
        <PortfolioClient portfolios={portfolios} />
      </div>
    </section>
  );
}
