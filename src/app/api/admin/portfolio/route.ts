import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// 포트폴리오 생성
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

    // 현재 최대 seq 값 가져오기
    const { data: portfolios, error: fetchError } = await supabase.from('portfolioList').select('seq').order('seq', { ascending: false }).limit(1);

    if (fetchError) {
      console.error('포트폴리오 조회 실패:', fetchError);
    }

    // 새로운 seq 계산 (최대값 + 1, 없으면 1부터 시작)
    const newSeq = portfolios && portfolios.length > 0 ? portfolios[0].seq + 1 : 1;

    // 포트폴리오 생성
    const { data, error } = await supabase
      .from('portfolioList')
      .insert({
        seq: newSeq,
        name,
        category,
        description: description || '',
        thumbnail: thumbnail || '',
        images: images || [],
        infoData: infoData || [],
        isPreview: isPreview || false,
      })
      .select()
      .single();

    if (error) {
      console.error('포트폴리오 생성 실패:', error);
      return NextResponse.json({ error: '포트폴리오 생성에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data, message: '포트폴리오가 생성되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error('포트폴리오 생성 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
