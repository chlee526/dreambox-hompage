import React from 'react';
import './productCard.css';

interface ProductCardProps {
  product: {
    seq: number;
    title: string;
    desc: string;
    thumbnail: string;
  };
  onClick?: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, onClick } = props;
  return (
    <div className="relative flex flex-col gap-[1.8rem] items-center w-full h-full cursor-pointer hover:scale-[1.01] transition-all duration-300" onClick={onClick}>
      <div className="portfolio-thumbnail">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <span className="flex-shrink-0 text-primary-dark text-center line-clamp-1">{product.title}</span>
    </div>
  );
}
