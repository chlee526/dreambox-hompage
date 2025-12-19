'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { PortfolioType } from '@/types/portfolio';
import { usePortfolios } from 'root/src/lib/queries/portfolios/usePortfolios';

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState('all');
  const [displayData, setDisplayData] = useState<PortfolioType[]>([]);
  const router = useRouter();

  // React Query로 데이터 가져오기 (캐시 사용)
  const { data: portfolios = [], isLoading } = usePortfolios();

  const allSubTabs = [
    { label: '전체', value: 'all' },
    { label: '패키지', value: 'package' },
    { label: '쇼핑백', value: 'bag' },
    { label: '기타', value: 'etc' },
  ];

  // 아이템이 1개 이상 있는 카테고리만 필터링
  const subTabList = allSubTabs.filter((tab) => {
    if (tab.value === 'all') {
      return portfolios.length > 0; // 전체는 포트폴리오가 1개 이상 있으면 표시
    }
    return portfolios.some((item) => item.category === tab.value); // 해당 카테고리에 아이템이 있으면 표시
  });

  useEffect(() => {
    const filteredData = activeTab === 'all' ? portfolios : portfolios.filter((item) => item.category === activeTab);

    setDisplayData(filteredData);

    // 현재 선택된 탭에 아이템이 없으면 '전체' 탭으로 이동
    if (activeTab !== 'all' && filteredData.length === 0 && portfolios.length > 0) {
      setActiveTab('all');
    }
  }, [portfolios, activeTab]);

  const handleCardClick = (item: PortfolioType) => {
    router.push(`/portfolio/${item.seq}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      {/* 서브 탭 - 탭이 2개 이상일 때만 표시 (전체만 있으면 의미없음) */}
      {subTabList.length > 1 && (
        <div className="sub-tab">
          <ul className="sub-tab-list">
            {subTabList.map((item) => (
              <li key={item.value} className="sub-tab-item" style={{ '--borderColor': activeTab === item.value ? '#3b1112' : 'transparent' } as React.CSSProperties}>
                <button onClick={() => setActiveTab(item.value)}>{item.label}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 포트폴리오 리스트 */}
      <div className="section-portfolios">
        {displayData.length > 0 && (
          <ul className="list">
            {displayData.map((item) => (
              <li key={item.seq} className="item">
                <ProductCard product={item} onClick={() => handleCardClick(item)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
