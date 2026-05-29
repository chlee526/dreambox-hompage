import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updatePortfolio, deletePortfolio } from '@/lib/portfolio';

/**
 * 포트폴리오 수정 API
 * PUT /api/admin/portfolio/[seq]
 */
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

    // Services 레이어를 통한 포트폴리오 수정
    const data = await updatePortfolio(id, {
      name,
      category,
      description,
      thumbnail,
      images,
      infoData,
      isPreview,
    });

    if (!data) {
      return NextResponse.json({ error: '포트폴리오 수정에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data, message: '포트폴리오가 수정되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('포트폴리오 수정 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

/**
 * 포트폴리오 삭제 API
 * DELETE /api/admin/portfolio/[seq]
 */
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

    // Services 레이어를 통한 포트폴리오 삭제
    const success = await deletePortfolio(id);

    if (!success) {
      return NextResponse.json({ error: '포트폴리오 삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '포트폴리오가 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('포트폴리오 삭제 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
