import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// 포트폴리오 수정
export async function PUT(request: NextRequest, { params }: { params: Promise<{ seq: string }> }) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { seq } = await params;
    const id = Number(seq);
    const body = await request.json();
    const { name, category, description, thumbnail, images, infoData, isPreview } = body;

    // 데이터 검증
    if (!name || !category) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
    }

    // 포트폴리오 수정
    const { data, error } = await supabase
      .from('portfolioList')
      .update({
        name,
        category,
        description: description || '',
        thumbnail: thumbnail || '',
        images: images || [],
        infoData: infoData || [],
        isPreview: isPreview || false,
      })
      .eq('seq', id)
      .select()
      .single();

    if (error) {
      console.error('포트폴리오 수정 실패:', error);
      return NextResponse.json({ error: '포트폴리오 수정에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data, message: '포트폴리오가 수정되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('포트폴리오 수정 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 포트폴리오 삭제
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ seq: string }> }) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { seq } = await params;
    const id = Number(seq);

    // 포트폴리오 삭제 (실제 삭제 여부 확인을 위해 select 추가)
    const { data, error } = await supabase.from('portfolioList').delete().eq('seq', id).select();

    if (error) {
      console.error('포트폴리오 삭제 실패:', error);
      return NextResponse.json({ error: '포트폴리오 삭제에 실패했습니다.' }, { status: 500 });
    }

    // 실제로 삭제된 데이터가 없는 경우 (RLS 정책 등으로 인한 삭제 실패)
    if (!data || data.length === 0) {
      console.error('포트폴리오 삭제 권한 없음 또는 데이터 없음');
      return NextResponse.json({ error: '포트폴리오를 삭제할 수 없습니다. 권한을 확인해주세요.' }, { status: 403 });
    }

    return NextResponse.json({ message: '포트폴리오가 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('포트폴리오 삭제 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
