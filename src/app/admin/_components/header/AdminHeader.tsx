'use client';

import { useRouter, usePathname } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import './style.scss';

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
      <div className="wrap">
        <div className="header-left">
          <h1 className="header-title" onClick={() => handleNavigate('/admin')}>
            DREAMBOX 관리자
          </h1>
          <nav className="header-nav">
            <ul>
              <li>
                <Link href="/admin/portfolio" className={`nav-btn ${pathname.includes('/admin/portfolio') ? 'active' : ''}`}>
                  포트폴리오 관리
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-util">
          <span className="user-email">{user.email}</span>
          <button onClick={() => window.open('/', '_blank')} className="util-btn is-site">
            사이트 바로가기
          </button>
          <button onClick={handleLogout} className="util-btn is-logout">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
