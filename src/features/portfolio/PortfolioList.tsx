'use client';

import Link from 'next/link';
import { useState } from 'react';
import { portfolioData } from '@/features/portfolio/portfolioData';
import { PortfolioType, PortfolioCategory, CATEGORY_LABELS } from '@/types/portfolio';

const ALL = 'all';
type FilterValue = PortfolioCategory | typeof ALL;

const FILTER_TABS: { value: FilterValue; label: string }[] = [
    { value: ALL, label: '전체' },
    ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
        value: value as PortfolioCategory,
        label,
    })),
];

function PortfolioItem({ portfolio }: { portfolio: PortfolioType }) {
    const defaultImage = portfolio.thumbnailList[0]?.url ?? '';
    const hoverImage = portfolio.thumbnailList[1]?.url ?? defaultImage;

    return (
        <Link href={`/portfolio/${portfolio.seq}`} className="portfolio-list-item">
            <div className="image-wrap">
                <img className="img-default" src={defaultImage} alt={portfolio.name} />
                <img className="img-hover" src={hoverImage} alt={portfolio.name} />
            </div>
            <div className="name-wrap">
                <span>{portfolio.name}</span>
            </div>
        </Link>
    );
}

export default function PortfolioList() {
    const [activeCategory, setActiveCategory] = useState<FilterValue>(ALL);

    const typedData = portfolioData as PortfolioType[];
    const filtered = activeCategory === ALL ? typedData : typedData.filter((item) => item.category.includes(activeCategory as PortfolioCategory));

    return (
        <div className="portfolio-content">
            <ul className="category-tab-list">
                {FILTER_TABS.map(({ value, label }) => (
                    <li key={value} className={`category-tab-item${activeCategory === value ? ' is-active' : ''}`}>
                        <button onClick={() => setActiveCategory(value)}>{label}</button>
                    </li>
                ))}
            </ul>
            <div className="portfolio-list">
                {filtered.map((portfolio) => (
                    <PortfolioItem key={portfolio.seq} portfolio={portfolio} />
                ))}
            </div>
        </div>
    );
}
