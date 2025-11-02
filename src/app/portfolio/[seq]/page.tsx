'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function PortfolioDetailPage() {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div>
      PortfolioDetailPage
      {/* <p>{title}</p>
      <p>{seq}</p> */}
    </div>
  );
}
