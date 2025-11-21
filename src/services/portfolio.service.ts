import { createClient } from '@/utils/supabase/server';
import { PortfolioType } from '@/types/portfolio';

/**
 * 포트폴리오 서비스
 * Supabase에서 포트폴리오 데이터를 가져오는 로직을 모듈화
 */

/**
 * 전체 포트폴리오 목록 조회
 * @returns 포트폴리오 배열
 */
export async function getPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').order('seq', { ascending: false });

    if (error) {
      console.error('포트폴리오 목록 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 포트폴리오 목록 가져오기 에러:', error);
    return [];
  }
}

/**
 * 특정 포트폴리오 조회
 * @param seq - 포트폴리오 시퀀스 번호
 * @returns 포트폴리오 객체 또는 null
 */
export async function getPortfolio(seq: number): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('seq', seq).single();

    if (error) {
      console.error('포트폴리오 가져오기 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('서버에서 포트폴리오 가져오기 에러:', error);
    return null;
  }
}

/**
 * 미리보기 포트폴리오 목록 조회 (isPreview: true)
 * @returns 미리보기 포트폴리오 배열
 */
export async function getPreviewPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('isPreview', true).order('seq', { ascending: false });

    if (error) {
      console.error('미리보기 포트폴리오 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 미리보기 포트폴리오 가져오기 에러:', error);
    return [];
  }
}

/**
 * 카테고리별 포트폴리오 조회
 * @param category - 카테고리 ('package' | 'bag' | 'etc')
 * @returns 필터링된 포트폴리오 배열
 */
export async function getPortfoliosByCategory(category: string): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('category', category).order('seq', { ascending: false });

    if (error) {
      console.error('카테고리별 포트폴리오 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 카테고리별 포트폴리오 가져오기 에러:', error);
    return [];
  }
}
