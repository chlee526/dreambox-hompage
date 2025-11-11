import React from 'react';

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
    <div className="card" onClick={onClick}>
      <div className="thumbnail">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <span className="title text-primary-dark">{product.title}</span>
    </div>
  );
}
