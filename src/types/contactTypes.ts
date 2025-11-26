interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  content: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export type { ContactFormData, ContactResponse };
