'use client';

import Image from 'next/image';
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

// 그리드 컬럼 수(4/3/2/1)에 맞춰 브라우저가 필요한 만큼만 리사이즈된 이미지를 받도록 지정
const IMAGE_SIZES = '(max-width: 490px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';

function PortfolioItem({ portfolio, priority }: { portfolio: PortfolioType; priority: boolean }) {
    const defaultImage = portfolio.thumbnailList[0]?.url ?? '';
    const hoverImage = portfolio.thumbnailList[1]?.url ?? defaultImage;

    return (
        <Link href={`/portfolio/${portfolio.seq}`} className="portfolio-list-item">
            <div className="image-wrap">
                <Image className="img-default" src={defaultImage} alt={portfolio.name} fill sizes={IMAGE_SIZES} priority={priority} loading={priority ? undefined : 'lazy'} />
                <Image className="img-hover" src={hoverImage} alt={portfolio.name} fill sizes={IMAGE_SIZES} loading="lazy" />
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
                {filtered.map((portfolio, index) => (
                    <PortfolioItem key={portfolio.seq} portfolio={portfolio} priority={index < 4} />
                ))}
            </div>
        </div>
    );
}
