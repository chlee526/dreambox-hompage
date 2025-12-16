import { createClient } from '@/utils/supabase/server';

/**
 * 파일 스토리지 서버 서비스
 * Supabase Storage를 통한 파일 업로드/삭제 관리
 *
 * 이 서비스는 다음 위치에서 재사용됩니다:
 * - API Routes (/api/admin/upload)
 * - Server Actions (필요시)
 */

/**
 * 허용된 이미지 확장자
 */
const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'] as const;

/**
 * 파일 업로드 결과 타입
 */
export interface UploadResult {
  url: string;
  path: string;
}

/**
 * 파일 업로드 에러 타입
 */
export interface UploadError {
  error: string;
  code?: 'NO_FILE' | 'INVALID_EXTENSION' | 'UPLOAD_FAILED';
}

/**
 * 파일 확장자 검증
 * @param fileName - 파일명
 * @returns 검증 성공 여부
 */
function validateImageExtension(fileName: string): boolean {
  const fileExt = fileName.split('.').pop()?.toLowerCase();
  if (!fileExt) return false;
  return (ALLOWED_IMAGE_EXTENSIONS as readonly string[]).includes(fileExt);
}

/**
 * 고유한 파일명 생성
 * @param originalFileName - 원본 파일명
 * @returns 생성된 파일명 (타임스탬프-랜덤문자열.확장자)
 */
function generateUniqueFileName(originalFileName: string): string {
  const fileExt = originalFileName.split('.').pop();
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomString}.${fileExt}`;
}

/**
 * 이미지 파일 업로드
 * @param file - 업로드할 파일 (File 객체)
 * @param bucket - Supabase Storage 버킷 이름 (기본값: 'portfolioList')
 * @param folder - 업로드할 폴더 경로 (기본값: 'images')
 * @returns 업로드 성공 시 { url, path }, 실패 시 null
 */
export async function uploadImage(file: File, bucket: string = 'portfolioList', folder: string = 'images'): Promise<UploadResult | null> {
  try {
    // 파일 존재 확인
    if (!file) {
      console.error('파일이 없습니다.');
      return null;
    }

    // 파일 확장자 검증
    if (!validateImageExtension(file.name)) {
      console.error('지원하지 않는 파일 형식:', file.name);
      return null;
    }

    // 고유한 파일명 생성
    const fileName = generateUniqueFileName(file.name);
    const filePath = `${folder}/${fileName}`;

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Supabase Storage에 업로드
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      console.error('파일 업로드 실패:', error);
      return null;
    }

    // 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('서버에서 이미지 업로드 에러:', error);
    return null;
  }
}

/**
 * 파일 삭제
 * @param filePath - 삭제할 파일 경로 (예: 'images/1234567890-abc.jpg')
 * @param bucket - Supabase Storage 버킷 이름 (기본값: 'portfolioList')
 * @returns 삭제 성공 여부
 */
export async function deleteFile(filePath: string, bucket: string = 'portfolioList'): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error('파일 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('서버에서 파일 삭제 에러:', error);
    return false;
  }
}

/**
 * 여러 파일 삭제
 * @param filePaths - 삭제할 파일 경로 배열
 * @param bucket - Supabase Storage 버킷 이름 (기본값: 'portfolioList')
 * @returns 삭제 성공 여부
 */
export async function deleteFiles(filePaths: string[], bucket: string = 'portfolioList'): Promise<boolean> {
  try {
    if (!filePaths || filePaths.length === 0) {
      return true; // 삭제할 파일이 없으면 성공으로 처리
    }

    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove(filePaths);

    if (error) {
      console.error('파일들 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('서버에서 파일들 삭제 에러:', error);
    return false;
  }
}

/**
 * URL에서 파일 경로 추출
 * @param url - Supabase Storage 공개 URL
 * @returns 파일 경로 (예: 'images/1234567890-abc.jpg')
 */
export function extractFilePathFromUrl(url: string): string | null {
  try {
    // URL 예시: https://[project].supabase.co/storage/v1/object/public/portfolioList/images/123.jpg
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.indexOf('public');

    if (bucketIndex !== -1 && bucketIndex + 2 < pathParts.length) {
      // public/[bucket]/[path] 형태에서 [path] 부분 추출
      return pathParts.slice(bucketIndex + 2).join('/');
    }

    return null;
  } catch (error) {
    console.error('URL에서 파일 경로 추출 실패:', error);
    return null;
  }
}
