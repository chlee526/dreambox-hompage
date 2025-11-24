'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useContactModalStore } from '@/stores/useContactModalStore';
import './style.scss';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  content: string;
}

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModalStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<ContactFormData>({
    mode: 'onChange', // 실시간 검증으로 버튼 상태 업데이트
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflowY = 'hidden';
      reset(); // 모달 열릴 때 폼 초기화
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflowY = 'unset';
    };
  }, [isOpen, closeModal, reset]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      console.log('제출 데이터:', data);
      // TODO: API 호출 또는 Supabase에 저장
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션
      alert('문의가 접수되었습니다.');
      reset();
      closeModal();
    } catch (error) {
      console.error('제출 실패:', error);
      alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="contact-modal-backdrop" onClick={handleBackdropClick}>
      <div className="contact-modal">
        <div className="modal-wrap">
          <button className="close-btn" onClick={closeModal} aria-label="닫기">
            <IoClose size={28} />
          </button>

          <div className="modal-header">
            <h3>Contact us</h3>
            <span>궁금하신 점이 있다면 언제든 문의해주세요.</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modal-name">이름 *</label>
                <input
                  type="text"
                  id="modal-name"
                  {...register('name', {
                    required: true,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-phone">연락처(휴대폰) *</label>
                <input
                  type="tel"
                  id="modal-phone"
                  {...register('phone', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-email">이메일 *</label>
              <input
                type="email"
                id="modal-email"
                {...register('email', {
                  required: true,
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-content">내용 *</label>
              <textarea
                id="modal-content"
                {...register('content', {
                  required: true,
                })}
                rows={6}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={!isValid || isSubmitting}>
              {isSubmitting ? '전송 중...' : '보내기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
