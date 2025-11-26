'use client';

import { useMutation } from '@tanstack/react-query';
import { sendContactEmail } from '@/lib/api/contactApi';
import { ContactResponse, ContactFormData } from 'root/src/types/contactTypes';

/**
 * 이메일 전송 React Query Hook
 * @returns mutation 객체
 */
export const useContact = () => {
  return useMutation<ContactResponse, Error, ContactFormData>({
    mutationFn: (data: ContactFormData) => sendContactEmail(data),
    onSuccess: (data) => {
      console.log('이메일 전송 성공:', data);
    },
    onError: (error) => {
      console.error('이메일 전송 실패:', error);
    },
  });
};
