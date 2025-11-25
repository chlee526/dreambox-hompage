export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  content: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = async (data: ContactFormData): Promise<SendEmailResponse> => {
  try {
    const response = await fetch('/api/send-email', {
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
