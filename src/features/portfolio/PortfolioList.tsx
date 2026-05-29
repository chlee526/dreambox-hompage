'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ui';
import { PortfolioType } from '@/types/portfolio';
import { usePortfolios } from '@/hooks/queries/usePortfolios';
import Link from 'next/link';

export default function PortfolioList() {
  const [activeTab, setActiveTab] = useState('all');
  const [displayData, setDisplayData] = useState<PortfolioType[]>([]);

  const { data: portfolios = [], isLoading } = usePortfolios();

  const allSubTabs = [
    { label: '전체', value: 'all' },
    { label: '패키지', value: 'package' },
    { label: '쇼핑백', value: 'bag' },
    { label: '기타', value: 'etc' },
  ];

  const subTabList = allSubTabs.filter((tab) => {
    if (tab.value === 'all') return portfolios.length > 0;
    return portfolios.some((item) => item.category === tab.value);
  });

  useEffect(() => {
    const filteredData = activeTab === 'all' ? portfolios : portfolios.filter((item) => item.category === activeTab);
    setDisplayData(filteredData);
    if (activeTab !== 'all' && filteredData.length === 0 && portfolios.length > 0) {
      setActiveTab('all');
    }
  }, [portfolios, activeTab]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <>
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

      <div className="section-portfolios">
        {displayData.length > 0 && (
          <ul className="list">
            {displayData.map((item) => (
              <li key={item.seq} className="item">
                <Link href={`/portfolio/${item.seq}`} prefetch={true}>
                  <ProductCard product={item} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
