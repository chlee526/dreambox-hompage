'use client';

import React, { useState } from 'react';
import { ProductCard } from 'app/_components/ui';
import { useRouter } from 'next/navigation';
import { useGetPortfolios } from 'app/hooks/usePortfolio';
import { Portfolio } from '../api/portfolio/route';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  // React Query로 API에서 데이터 가져오기
  const { data: portfolios, isLoading, error } = useGetPortfolios();

  const subTabList = [
    {
      label: '전체',
      value: 'all',
    },
    {
      label: '패키지',
      value: 'package',
    },
    {
      label: '쇼핑백',
      value: 'bag',
    },
    {
      label: '기타',
      value: 'etc',
    },
  ];

  const handleCardClick = (item: Portfolio) => {
    router.push(`/portfolio/${item.seq}`);
  };

  return (
    <section className="h-full px-[6rem] py-[4rem] bg-[#fff]">
      <div className="flex items-center gap-[1.6rem] before:content-[''] before:block before:w-[0.4rem] before:h-[3.6rem] before:bg-primary-dark text-primary-dark">
        <h3 className="text-lg font-bold">Portfolio</h3>

        <span>드림박스가 제작한 다양한 패키지를 소개합니다.</span>
      </div>

      {/* 서브 탭 */}
      <div className="pt-[4rem]">
        <ul className="flex justify-center items-center gap-[2rem] h-[3.6rem] text-md font-medium  ">
          {subTabList.map((item) => (
            <li key={item.value} className={`border-b-2  text-primary-dark opacity-[0.8] hover:opacity-[1] ${activeTab === item.value ? 'border-primary-dark opacity-[1]' : 'border-transparent'}`}>
              <button className="px-[2rem] whitespace-nowrap" onClick={() => setActiveTab(item.value)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 포트폴리오 리스트 */}
      <div className="py-[4rem]">
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
        {!isLoading && portfolios && portfolios.length > 0 && (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[2rem]">
            {portfolios?.map((item) => (
              <li key={item.seq} className="w-full h-auto max-h-[38rem]">
                <ProductCard product={item} onClick={() => handleCardClick(item)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
