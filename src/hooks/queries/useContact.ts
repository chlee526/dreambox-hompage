'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ContactResponse, ContactFormData } from '@/types/contactTypes';

export const contactKeys = {
  all: ['contact'] as const,
  sendEmail: () => [...contactKeys.all, 'sendEmail'] as const,
} as const;

async function sendContactEmail(data: ContactFormData): Promise<ContactResponse> {
  const response = await fetch('/api/contactEmail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || '메일 전송에 실패했습니다.');
  }
  return result;
}

export function useContactMutation(options?: UseMutationOptions<ContactResponse, Error, ContactFormData>) {
  return useMutation<ContactResponse, Error, ContactFormData>({
    mutationKey: contactKeys.sendEmail(),
    mutationFn: sendContactEmail,
    ...options,
  });
}
