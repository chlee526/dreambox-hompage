'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useGetPortfolio } from '../../hooks/usePortfolio';
import './style.scss';

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
    <section className="page-portfolio-detail">
      <div className="wrap">
        <div className="desc-area">
          <p>{detailData.description}</p>
        </div>
        <div className="image-area">
          <div className="image-list">
            {detailData.images.map((image, index) => (
              <img key={index} src={image as string} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
