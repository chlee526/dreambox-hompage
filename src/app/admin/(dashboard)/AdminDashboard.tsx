'use client';

import { useRouter } from 'next/navigation';
import './style.scss';

export default function AdminDashboard() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="admin-dashboard">
      <div className="wrap">
        <div className="dashboard-card" onClick={() => handleNavigate('/admin/portfolio')}>
          <div>
            <span className="icon">🖼️</span>
            <strong className="title">포트폴리오 관리</strong>
          </div>
          <p className="desc">포트폴리오 추가/수정/삭제</p>
        </div>
      </div>
    </div>
  );
}
