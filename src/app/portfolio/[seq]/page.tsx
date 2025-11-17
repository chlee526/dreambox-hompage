'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useGetPortfolio } from '../../hooks/usePortfolio';

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = Number(params.seq);

  const { data: detailData, isLoading, error } = useGetPortfolio(id);

  useEffect(() => {
    console.log('Portfolio ID:', id);
    console.log('Portfolio Data:', detailData);
  }, [id, detailData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">에러: {error.message}</p>
      </div>
    );
  }

  if (!detailData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">포트폴리오를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <section className="h-full px-[6rem] py-[4rem] bg-[#fff]">
      <div className="max-w-[120rem] mx-auto">
        <h1 className="text-2xl font-bold text-primary-dark mb-[2rem]">{detailData.name}</h1>
        <p className="text-lg text-gray-700 mb-[4rem]">{detailData.description}</p>

        {/* 여기에 추가 상세 정보나 이미지 등을 표시 */}
        <div className="bg-gray-100 p-[4rem] rounded-lg">
          <p className="text-md text-gray-600">ID: {detailData.seq}</p>
        </div>
      </div>
    </section>
  );
}
