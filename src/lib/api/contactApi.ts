/**
 * 이메일 전송 클라이언트 API
 * API Route를 통해 이메일을 전송하는 클라이언트 함수
 */

import { ContactFormData, ContactResponse } from 'root/src/types/contactTypes';

/**
 * 이메일 전송
 * @param data - 연락처 폼 데이터
 * @returns 전송 결과
 */
export const sendContactEmail = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
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
  } catch (error) {
    console.error('메일 전송 에러:', error);
    throw error;
  }
};
