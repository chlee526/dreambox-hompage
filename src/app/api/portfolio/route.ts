import { createClient } from '@/utils/supabase/server';
import { Tables } from 'root/types_db';
import { NextRequest, NextResponse } from 'next/server';

// 포트폴리오 타입
export type PortfolioType = Tables<'portfolioList'>;

// Supabase에서 포트폴리오 데이터 가져오기
// GET /api/portfolio - 전체 목록
// GET /api/portfolio?id=1 - 특정 아이템
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // id가 있으면 특정 아이템만 조회
    if (id) {
      const { data, error } = await supabase.from('portfolioList').select('*').eq('seq', Number(id)).single();

      if (error) {
        console.error('포트폴리오 아이템 가져오기 실패:', error);
        return NextResponse.json({ error: error.message }, { status: 404 });
      }

      console.log('portfolio item', data);
      return NextResponse.json({ data }, { status: 200 });
    }

    // id가 없으면 전체 목록 조회
    const { data, error } = await supabase.from('portfolioList').select('*');

    if (error) {
      console.error('포트폴리오 목록 가져오기 실패:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('portfolio list', data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API 라우트 에러:', error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
};
