import React from 'react';
import { notFound } from 'next/navigation';
import './style.scss';
import { getPortfolio } from '@/services/portfolio.service';

// 빌드 시 모든 포트폴리오 상세 페이지를 정적으로 생성
// export async function generateStaticParams() {
//   const portfolios = await getPortfolios();

//   return portfolios.map((portfolio) => ({
//     seq: portfolio.seq.toString(),
//   }));
// }

// // ISR: 1시간마다 재생성
// export const revalidate = 3600; // 3600초 = 1시간

// 동적 세그먼트를 정적으로 생성하되, 없는 경로는 404 처리
// export const dynamicParams = true;

interface PortfolioDetailPageProps {
  params: Promise<{ seq: string }>;
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { seq } = await params;
  const id = Number(seq);

  // 서버에서 데이터 가져오기
  const detailData = await getPortfolio(id);

  // 데이터가 없으면 404 페이지 표시
  if (!detailData) {
    notFound();
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
                  <img src={image as string} alt={`${detailData.name} - ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="desc-area">
            <ul className="info-data-list">
              {detailData?.infoData.map((sort) => (
                <li key={sort.code}>
                  <strong>{sort.name}</strong>
                  <span>{sort.value}</span>
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
