'use client';

import Link from 'next/link';
import { ProductCard } from '../_components/ui';
import { useGetPortfolios } from '../hooks/usePortfolio';
import './style.scss';

export default function Portfolio() {
  const { data: portfolios, isLoading, error } = useGetPortfolios();

  return (
    <section className="portfolio-section">
      <div className="l-inner">
        <h2 className="section-title">Portfolio</h2>

        {!isLoading && portfolios && portfolios.length > 0 && (
          <ul className="portfolio-list">
            {portfolios.map((item) => (
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
