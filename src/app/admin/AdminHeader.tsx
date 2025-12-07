'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AdminHeaderProps {
  user: User;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserSupabaseClient();

  // 로그인 페이지에서는 헤더 숨김
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="admin-header">
      <div className="admin-header__content">
        <h1 className="admin-header__title" onClick={() => handleNavigate('/admin')}>
          DREAMBOX 관리자
        </h1>
        <nav className="admin-header__nav">
          <button className={`admin-header__nav-btn ${pathname.startsWith('/admin/portfolio') ? 'active' : ''}`} onClick={() => handleNavigate('/admin/portfolio')}>
            포트폴리오 관리
          </button>
        </nav>
        <div className="admin-header__user-info">
          <span className="admin-header__user-email">{user.email}</span>
          <button onClick={handleLogout} className="admin-header__logout-btn">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
