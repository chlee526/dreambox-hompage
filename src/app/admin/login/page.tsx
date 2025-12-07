'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import './style.scss';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
      <div className="admin-login__container">
        <div className="admin-login__card">
          <h1 className="admin-login__title">관리자 로그인</h1>
          <p className="admin-login__subtitle">DREAMBOX 관리자 페이지</p>

          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="admin-login__form-group">
              <label htmlFor="email" className="admin-login__label">
                이메일
              </label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" className="admin-login__input" required disabled={loading} />
            </div>

            <div className="admin-login__form-group">
              <label htmlFor="password" className="admin-login__label">
                비밀번호
              </label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="admin-login__input" required disabled={loading} />
            </div>

            {error && <div className="admin-login__error">{error}</div>}

            <button type="submit" className="admin-login__button" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
