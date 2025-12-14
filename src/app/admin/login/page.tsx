'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import './style.scss';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (formData: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        return;
      }

      if (data.session) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="wrap">
        <div className="login-header">
          <h1 className="title">관리자 로그인</h1>
          <p className="subtitle">DREAMBOX 관리자 페이지</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              disabled={loading}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="login-form-group" style={{ marginTop: '10px' }}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              disabled={loading}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
