'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ui';
import './style.scss';
import { PortfolioType } from '@/types/portfolio';

interface PortfolioProps {
  portfolios: PortfolioType[];
}

export default function Portfolio({ portfolios }: PortfolioProps) {
  const router = useRouter();

  const handleCardClick = (item: PortfolioType) => {
    router.push(`/portfolio/${item.seq}`);
  };
  return (
    <section className="portfolio-section">
      <div className="l-inner">
        <h2 className="section-title">Portfolio</h2>

        {portfolios.length > 0 && (
          <ul className="portfolio-list">
            {portfolios.map((item) => (
              <li key={item.seq} className="w-full">
                <ProductCard product={item} onClick={() => handleCardClick(item)} />
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
