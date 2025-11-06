import React from 'react';
import './styles';

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
      <div className="thumbnail"></div>
      <span className="title text-primary-dark">{product.title}</span>
    </div>
  );
}
