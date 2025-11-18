'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';

import { ProductCard } from 'app/_components/ui';
import { useRouter } from 'next/navigation';
import { useGetPortfolios } from 'app/hooks/usePortfolio';
import { PortfolioType } from '../api/portfolio/route';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  // React Query로 API에서 데이터 가져오기
  const { data: portfolios, isLoading, error } = useGetPortfolios();
  const [displayData, setDisplayData] = useState<PortfolioType[]>([]);

  const subTabList = [
    { label: '전체', value: 'all' },
    { label: '패키지', value: 'package' },
    { label: '쇼핑백', value: 'bag' },
    { label: '기타', value: 'etc' },
  ];

  useEffect(() => {
    if (!portfolios) {
      setDisplayData([]);
      return;
    }

    const filteredData = activeTab === 'all' ? portfolios : portfolios.filter((item) => item.category === activeTab);

    setDisplayData(filteredData);
  }, [portfolios, activeTab]);

  const handleCardClick = (item: PortfolioType) => {
    router.push(`/portfolio/${item.seq}`);
  };

  return (
    <section className="page-portfolio">
      <div className="l-inner">
        <div className="page-portfolio-header">
          <h3>Portfolio</h3>

          <span>드림박스가 제작한 다양한 패키지를 소개합니다.</span>
        </div>

        {/* 서브 탭 */}
        <div className="sub-tab">
          <ul className="sub-tab-list">
            {subTabList.map((item) => (
              <li key={item.value} className="sub-tab-item" style={{ '--borderColor': activeTab === item.value ? '#3b1112' : 'transparent' } as React.CSSProperties}>
                <button onClick={() => setActiveTab(item.value)}>{item.label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* 포트폴리오 리스트 */}
        <div className="section-portfolios">
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="flex justify-center items-center py-[10rem]">
              <p className="text-primary-dark text-lg">로딩 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {error && (
            <div className="flex justify-center items-center py-[10rem]">
              <p className="text-red-500 text-lg">데이터를 불러오는데 실패했습니다. 샘플 데이터를 표시합니다.</p>
            </div>
          )}

          {/* 데이터가 없을 때 */}
          {!isLoading && !error && portfolios && portfolios.length === 0 && (
            <div className="flex justify-center items-center py-[10rem]">
              <p className="text-primary-dark text-lg">포트폴리오가 없습니다.</p>
            </div>
          )}

          {/* 포트폴리오 리스트 */}
          {!isLoading && displayData.length > 0 && (
            <ul className="list">
              {displayData?.map((item) => (
                <li key={item.seq} className="item">
                  <ProductCard product={item} onClick={() => handleCardClick(item)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
