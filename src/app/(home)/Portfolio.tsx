'use client';

import Link from 'next/link';
import { ProductCard } from '../_components/ui';
import { useGetPortfolios } from '../hooks/usePortfolio';
import './style.scss';
import { useEffect, useState } from 'react';
import { PortfolioType } from '../api/portfolio/route';

export default function Portfolio() {
  const { data: portfolios, isLoading, error } = useGetPortfolios();
  const [previewData, setPreviewData] = useState<PortfolioType[]>([]);

  useEffect(() => {
    const filteredData = portfolios?.filter((item) => item.isPreview) || [];
    setPreviewData(filteredData);
  }, [portfolios]);

  return (
    <section className="portfolio-section">
      <div className="l-inner">
        <h2 className="section-title">Portfolio</h2>

        {!isLoading && previewData.length > 0 && (
          <ul className="portfolio-list">
            {previewData.map((item) => (
              <li key={item.seq} className="w-full">
                <ProductCard product={item} />
              </li>
            ))}
            <li className="view-all-button">
              <Link href="/portfolio" className="view-all-link">
                전체보기
              </Link>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
