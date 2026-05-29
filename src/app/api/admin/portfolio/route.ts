import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createPortfolio } from '@/lib/portfolio';

/**
 * 포트폴리오 생성 API
 * POST /api/admin/portfolio
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, description, thumbnail, images, infoData, isPreview } = body;

    // 데이터 검증
    if (!name || !category) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
    }

    // Services 레이어를 통한 포트폴리오 생성
    const data = await createPortfolio({
      name,
      category,
      description,
      thumbnail,
      images,
      infoData,
      isPreview,
    });

    if (!data) {
      return NextResponse.json({ error: '포트폴리오 생성에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data, message: '포트폴리오가 생성되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error('포트폴리오 생성 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
