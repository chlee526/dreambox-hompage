'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ContactResponse, ContactFormData } from '@/types/contactTypes';
import { contactKeys } from './contactKeys';

/**
 * 이메일 전송 API 함수
 */
async function sendContactEmail(data: ContactFormData): Promise<ContactResponse> {
  const response = await fetch('/api/contactEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '메일 전송에 실패했습니다.');
  }

  return result;
}

/**
 * 이메일 전송 React Query Hook
 * @param options - useMutation 옵션 (onSuccess, onError 등)
 * @returns mutation 객체
 *
 * @example
 * ```tsx
 * const { mutate, isPending } = useContactMutation({
 *   onSuccess: (data) => {
 *     console.log('전송 성공:', data);
 *   },
 *   onError: (error) => {
 *     console.error('전송 실패:', error);
 *   }
 * });
 *
 * mutate({ name, phone, email, subject, content });
 * ```
 */
export function useContactMutation(options?: UseMutationOptions<ContactResponse, Error, ContactFormData>) {
  return useMutation<ContactResponse, Error, ContactFormData>({
    mutationKey: contactKeys.sendEmail(),
    mutationFn: sendContactEmail,
    ...options,
  });
}
