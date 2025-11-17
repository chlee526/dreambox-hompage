'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PortfolioType } from '../api/portfolio/route';

// 포트폴리오 목록 조회
export const useGetPortfolios = () => {
  const getPortfolios = async () => {
    const response = await axios.get('/api/portfolio');
    return (response.data.data as PortfolioType[]) || [];
  };

  return useQuery({
    queryKey: ['portfolios'],
    queryFn: getPortfolios,
    // staleTime: 1000 * 60 * 5, // 5분
  });
};

// 포트폴리오 상세 조회
export const useGetPortfolio = (id: number) => {
  const getPortfolio = async (id: number) => {
    const response = await axios.get(`/api/portfolio?id=${id}`);
    return (response.data.data as PortfolioType) || null;
  };

  return useQuery({
    queryKey: ['portfolio', id],
    queryFn: () => getPortfolio(id),
    // staleTime: 1000 * 60 * 5, // 5분
    enabled: !!id, // id가 있을 때만 실행
  });
};
