'use client';

import React from 'react';
import { usePortfolio } from '@/hooks/queries/usePortfolios';

interface PortfolioDetailProps {
  seq: number;
}

export default function PortfolioDetail({ seq }: PortfolioDetailProps) {
  const { data: detailData, isLoading } = usePortfolio(seq);

  if (isLoading) {
    return (
      <section className="page-portfolio-detail">
        <div className="l-inner">
          <div className="flex justify-center items-center py-20">
            <p>로딩 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!detailData) {
    return (
      <section className="page-portfolio-detail">
        <div className="l-inner">
          <div className="flex justify-center items-center py-20">
            <p>포트폴리오를 찾을 수 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-portfolio-detail">
      <div className="l-inner">
        <div className="header">
          <h3>{detailData.name}</h3>
        </div>
        <div className="wrap">
          <div className="image-area">
            <div className="image-list">
              {detailData.images.map((image, index) => (
                <div key={index}>
                  <img src={image as string} alt={`${detailData.name} - ${index + 1}`} width={800} height={600} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
          <div className="desc-area">
            <ul className="info-data-list">
              {detailData?.infoData.map((sort) => (
                <li key={sort.code}>
                  {sort.value && (
                    <>
                      <strong>{sort.name}</strong>
                      <span>{sort.value}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <hr />
            <div className="description">
              <p>{detailData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
