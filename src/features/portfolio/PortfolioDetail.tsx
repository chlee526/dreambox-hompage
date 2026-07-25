'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/features/portfolio/portfolioData';
import Image from 'next/image';
import Link from 'next/link';

interface PortfolioDetailProps {
  seq: string;
}

export default function PortfolioDetail({ seq }: PortfolioDetailProps) {
  const detailData = portfolioData.find((item) => item.seq === seq);
  const images = detailData?.imgList.filter(Boolean) ?? [];
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = images.length === 0 || loadedCount >= images.length;
  const handleImageSettled = () => setLoadedCount((c) => c + 1);

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
    <section className="l-page page-portfolio-detail">
      <div className="l-inner">
        <div className="wrap">
          <div className="image-area">
            {!allLoaded && (
              <div className="image-loader">
                <span className="spinner" />
              </div>
            )}
            <div className={`image-list${allLoaded ? '' : ' is-loading'}`}>
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image!.url}
                    alt={`${detailData.name} - ${index + 1}`}
                    className="w-full h-auto"
                    width={3000}
                    height={3000}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={index === 0}
                    loading={index === 0 ? undefined : 'eager'}
                    onLoad={handleImageSettled}
                    onError={handleImageSettled}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="desc-area">
            <div className="title">
              <strong>{detailData.name}</strong>
            </div>
            <div className="wrap">
              <ul className="info-data-list">
                {detailData.infos?.map((data) => (
                  <li key={data.topic}>
                    <strong>{data.topic}</strong>
                    <span>{data.info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="list-link-wrap">
              <Link href="/portfolio" className="list-link">
                <span className="arrow">←</span>list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
