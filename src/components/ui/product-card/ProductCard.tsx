import React from 'react';
import { PortfolioType } from '@/types/portfolio';

interface ProductCardProps {
  product: PortfolioType;
  onClick?: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, onClick } = props;

  const thumbnailUrl = product.thumbnail || '/assets/image/portfolio/sample1.jpg';

  return (
    <div className="card" onClick={onClick}>
      <div className="thumbnail">
        <img src={thumbnailUrl} alt={product.name} />

        <div className="title">
          <span>{product.name}</span>
        </div>
      </div>
    </div>
  );
}

