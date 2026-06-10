'use client';

import Link from 'next/link';
import { usePortfolios } from '@/hooks/queries/usePortfolios';
import { PortfolioType } from '@/types/portfolio';

function PortfolioItem({ portfolio }: { portfolio: PortfolioType }) {
    const defaultImage = portfolio.thumbnail ?? '';
    // 등록된 이미지 중 첫 번째를 hover 이미지로 사용, 없으면 thumbnail 재사용
    const hoverImage = (portfolio.images as string[] | null)?.[0] ?? defaultImage;

    return (
        <Link href={`/portfolio/${portfolio.seq}`} className="portfolio-list-item">
            <div className="image-wrap">
                <img className="img-default" src={defaultImage} alt={portfolio.name ?? ''} />
                <img className="img-hover" src={hoverImage} alt={portfolio.name ?? ''} />
            </div>
            <div className="name-wrap">
                <span>{portfolio.name}</span>
            </div>
        </Link>
    );
}

export default function PortfolioList() {
    const { data: portfolios = [], isLoading } = usePortfolios();

    if (isLoading) return null;

    return (
        <div className="portfolio-list">
            {portfolios.map((portfolio) => (
                <PortfolioItem key={portfolio.seq} portfolio={portfolio} />
            ))}
        </div>
    );
}
