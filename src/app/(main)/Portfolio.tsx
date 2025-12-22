'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/ui';
import './style.scss';
import { usePreviewPortfolios } from 'root/src/lib/queries/portfolios/usePortfolios';

export default function Portfolio() {
  const { data: portfolios = [], isLoading } = usePreviewPortfolios();

  if (isLoading) {
    return (
      <section className="portfolio-section">
        <div className="l-inner">
          <h2 className="section-title">Portfolio</h2>
          <div className="flex justify-center items-center py-20">
            <p>로딩 중...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section">
      <div className="l-inner">
        <h2 className="section-title">Portfolio</h2>

        {portfolios.length > 0 && (
          <ul className="portfolio-list">
            {portfolios.map((item) => (
              <li key={item.seq} className="w-full">
                <Link href={`/portfolio/${item.seq}`} prefetch={true}>
                  <ProductCard product={item} />
                </Link>
              </li>
            ))}
            <li className="view-all-button">
              <Link href="/portfolio" className="view-all-link">
                <span>전체보기</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
