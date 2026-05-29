'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const uploadKeys = {
  all: ['upload'] as const,
  image: () => [...uploadKeys.all, 'image'] as const,
} as const;

export interface UploadImageResponse {
  url: string;
  path: string;
}

export interface UploadImageInput {
  file: File;
  folder?: 'thumbnails' | 'images';
}

async function uploadImageAPI(input: UploadImageInput): Promise<UploadImageResponse> {
  const { file, folder = 'images' } = input;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '파일 업로드 실패' }));
    throw new Error(error.error || '파일 업로드에 실패했습니다.');
  }
  return response.json();
}

export function useUploadImage(options?: UseMutationOptions<UploadImageResponse, Error, UploadImageInput>) {
  return useMutation<UploadImageResponse, Error, UploadImageInput>({
    mutationKey: uploadKeys.image(),
    mutationFn: uploadImageAPI,
    ...options,
  });
}
