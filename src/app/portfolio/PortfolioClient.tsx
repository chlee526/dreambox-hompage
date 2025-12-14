'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { PortfolioType } from '@/types/portfolio';

interface PortfolioClientProps {
  portfolios: PortfolioType[];
}

export default function PortfolioClient({ portfolios }: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [displayData, setDisplayData] = useState<PortfolioType[]>([]);
  const router = useRouter();

  const subTabList = [
    { label: '전체', value: 'all' },
    { label: '패키지', value: 'package' },
    { label: '쇼핑백', value: 'bag' },
    { label: '기타', value: 'etc' },
  ];

  useEffect(() => {
    console.log('portfolios', portfolios);
  }, [portfolios]);

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
    <>
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
        {/* 데이터가 없을 때 */}
        {portfolios.length === 0 && (
          <div className="flex justify-center items-center py-[10rem]">
            <p className="text-primary-dark text-lg">포트폴리오가 없습니다.</p>
          </div>
        )}

        {/* 포트폴리오 리스트 */}
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
