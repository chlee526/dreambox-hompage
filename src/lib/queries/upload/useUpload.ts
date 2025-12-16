'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { uploadKeys } from './uploadKeys';

/**
 * 이미지 업로드 응답 타입
 */
export interface UploadImageResponse {
  url: string;
  path: string;
}

/**
 * 이미지 업로드 입력 타입
 */
export interface UploadImageInput {
  file: File;
  folder?: 'thumbnails' | 'images'; // 썸네일 또는 상세 이미지
}

/**
 * 이미지 업로드 API 함수
 */
async function uploadImageAPI(input: UploadImageInput): Promise<UploadImageResponse> {
  const { file, folder = 'images' } = input;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData, // FormData는 헤더 자동 설정
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '파일 업로드 실패' }));
    throw new Error(error.error || '파일 업로드에 실패했습니다.');
  }

  return response.json();
}

/**
 * 이미지 업로드 React Query Hook
 * @param options - useMutation 옵션 (onSuccess, onError 등)
 * @returns mutation 객체
 *
 * @example
 * ```tsx
 * const { mutateAsync, isPending } = useUploadImage({
 *   onSuccess: (data) => {
 *     console.log('업로드 성공:', data.url);
 *   },
 *   onError: (error) => {
 *     console.error('업로드 실패:', error);
 *   }
 * });
 *
 * // 썸네일 업로드
 * const result = await mutateAsync({
 *   file,
 *   folder: 'thumbnails'
 * });
 *
 * // 상세 이미지 업로드
 * const result = await mutateAsync({
 *   file,
 *   folder: 'images'
 * });
 * ```
 */
export function useUploadImage(options?: UseMutationOptions<UploadImageResponse, Error, UploadImageInput>) {
  return useMutation<UploadImageResponse, Error, UploadImageInput>({
    mutationKey: uploadKeys.image(),
    mutationFn: uploadImageAPI,
    ...options,
  });
}
