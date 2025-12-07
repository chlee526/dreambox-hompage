import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    // 파일 확장자 확인
    const fileExt = file.name.split('.').pop();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (!fileExt || !allowedExtensions.includes(fileExt.toLowerCase())) {
      return NextResponse.json({ error: '지원하지 않는 파일 형식입니다.' }, { status: 400 });
    }

    // 파일명 생성 (타임스탬프 + 랜덤 문자열)
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = `images/${fileName}`;

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage.from('portfolioList').upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      console.error('파일 업로드 실패:', error);
      return NextResponse.json({ error: '파일 업로드에 실패했습니다.' }, { status: 500 });
    }

    // 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from('portfolioList').getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('파일 업로드 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
