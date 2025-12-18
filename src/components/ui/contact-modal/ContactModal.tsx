'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useContactModalStore } from '@/stores/useContactModalStore';
import { useContactMutation } from 'root/src/lib/queries/contact/useContact';
import { ContactFormData } from '@/types/contactTypes';
import './style.scss';

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModalStore();
  const { mutate, isPending } = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
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

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    mutate(data, {
      onSuccess: (result) => {
        if (result.success) {
          alert('문의가 성공적으로 접수되었습니다.\n빠른 시일 내에 답변 드리겠습니다.');
          reset();
          closeModal();
        } else {
          alert(result.message || '문의 접수에 실패했습니다. 다시 시도해주세요.');
        }
      },
      onError: (error) => {
        console.error('제출 실패:', error);
        alert('문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="contact-modal-backdrop">
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
              <label htmlFor="modal-email">이메일 * {errors.email && <span className="error-message">{errors.email.message}</span>}</label>
              <input
                type="email"
                id="modal-email"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '올바른 이메일 형식이 아닙니다',
                  },
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-subject">제목 *</label>
              <input
                type="text"
                id="modal-subject"
                {...register('subject', {
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

            <button type="submit" className="submit-btn" disabled={!isValid || isPending}>
              {isPending ? '전송 중...' : '보내기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
