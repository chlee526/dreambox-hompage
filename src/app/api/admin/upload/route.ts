import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { uploadImage } from '@/lib/services/storage';

/**
 * 이미지 파일 업로드 API
 * POST /api/admin/upload
 *
 * FormData:
 * - file: 업로드할 파일
 * - folder: 저장할 폴더 ('thumbnails' | 'images', 기본값: 'images')
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

    // FormData에서 파일과 폴더 정보 추출
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'images';

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    // 폴더 유효성 검사
    if (!['thumbnails', 'images'].includes(folder)) {
      return NextResponse.json({ error: '잘못된 폴더 경로입니다.' }, { status: 400 });
    }

    // Services 레이어를 통한 이미지 업로드
    const result = await uploadImage(file, 'portfolioList', folder);

    if (!result) {
      return NextResponse.json({ error: '파일 업로드에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ url: result.url, path: result.path }, { status: 200 });
  } catch (error) {
    console.error('파일 업로드 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
