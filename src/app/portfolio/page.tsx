'use client';

import React, { useState } from 'react';
import ProductCard from '../components/ui/product-card/ProductCard';
import { useRouter } from 'next/navigation';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
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

  const sampleData = [
    {
      seq: 1,
      title: 'Sample Title 1',
      desc: 'Sample Description 1',
      thumbnail: '/assets/image/portfolio/sample1.jpg',
    },
    {
      seq: 2,
      title: 'Sample Title 2',
      desc: 'Sample Description 2',
      thumbnail: '/assets/image/portfolio/sample2.jpg',
    },
    {
      seq: 3,
      title: 'Sample Title 3',
      desc: 'Sample Description 3',
      thumbnail: '/assets/image/portfolio/sample3.jpg',
    },
    {
      seq: 4,
      title: 'Sample Title 4',
      desc: 'Sample Description 4',
      thumbnail: '/assets/image/portfolio/sample4.jpg',
    },
    {
      seq: 5,
      title: 'Sample Title 5',
      desc: 'Sample Description 5',
      thumbnail: '/assets/image/portfolio/sample5.jpg',
    },
    {
      seq: 6,
      title: 'Sample Title 6',
      desc: 'Sample Description 6',
      thumbnail: '/assets/image/portfolio/sample6.jpg',
    },
    {
      seq: 7,
      title: 'Sample Title 7',
      desc: 'Sample Description 7',
      thumbnail: '/assets/image/portfolio/sample7.jpg',
    },
    {
      seq: 8,
      title: 'Sample Title 8',
      desc: 'Sample Description 8',
      thumbnail: '/assets/image/portfolio/sample8.jpg',
    },
  ];

  const handleCardClick = (item: { seq: number; title: string; desc: string; thumbnail: string }) => {
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
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[2rem]">
          {sampleData.map((item) => (
            <li key={item.seq} className="w-full h-auto max-h-[38rem]">
              <ProductCard product={item} onClick={() => handleCardClick(item)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
